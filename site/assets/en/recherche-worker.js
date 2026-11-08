/* Recherche — der Hintergrund-Worker.
 *
 * Laedt die Baende aus `assets/suche/`, baut je Band den Wortindex
 * (recherche-kern.js) und beantwortet Anfragen der Suchseite. Die Seite
 * selbst haelt keinen Text: sie fragt die Stellen, die sie gerade zeichnen
 * will, stueckweise ab. So bleibt das Tippen fluessig, auch wenn „und“
 * 11 819 Stellen findet.
 *
 * Nachrichten (alle mit `typ`):
 *   lade                         -> fortschritt …, bereit
 *   suche   {id, q, baende, arten, aus, seiten, ordnung}  -> ergebnis
 *   stellen {id, von, bis}       -> stellen
 *   kwic    {id, von, bis, ordnung} -> kwic
 *   export  {id, art}            -> export
 *   vorschlag {id, praefix}      -> vorschlag
 */
'use strict';
importScripts('ortho.js', 'recherche-kern.js');
var H = self.HegelRecherche;

var REIHE = [];          // Band-Kennungen in Werkfolge
var BAND = {};           // work -> Band
var INFO = {};           // work -> {sig, title}
var ladung = null;
var aktuell = null;      // das letzte Ergebnis

var BINS = 40;
var ALLE = { t: 1, h: 1, n: 1 };

function post(m) { self.postMessage(m); }

function lade() {
  if (ladung) return ladung;
  var basis = new URL('../suche/', self.location.href);
  ladung = fetch(new URL('index.json', basis)).then(function (r) {
    if (!r.ok) throw new Error('index.json: ' + r.status);
    return r.json();
  }).then(function (ix) {
    REIHE = ix.baende.map(function (b) { INFO[b.work] = b; return b.work; });
    var fertig = 0, gesamt = REIHE.length;
    post({ typ: 'fortschritt', fertig: 0, gesamt: gesamt });
    // Vier zugleich: genug fuer die Leitung, ohne den Worker mit
    // achtzehn gleichzeitigen Zerlegungen zu verstopfen.
    var warte = REIHE.slice();
    function naechster() {
      var w = warte.shift();
      if (!w) return Promise.resolve();
      return fetch(new URL(w + '.json?v=' + encodeURIComponent(ix.stand), basis))
        .then(function (r) { if (!r.ok) throw new Error(w + ': ' + r.status); return r.json(); })
        .then(function (d) {
          BAND[w] = H.baueBand(d);
          fertig++;
          post({ typ: 'fortschritt', fertig: fertig, gesamt: gesamt });
          return naechster();
        });
    }
    return Promise.all([naechster(), naechster(), naechster(), naechster()]).then(function () {
      var woerter = 0;
      REIHE.forEach(function (w) { woerter += BAND[w].woerter; });
      post({ typ: 'bereit', baende: REIHE.map(bandInfo), woerter: woerter });
    });
  }).catch(function (e) {
    ladung = null;
    post({ typ: 'fehler', text: String(e && e.message || e) });
  });
  return ladung;
}

function bandInfo(w) {
  var b = BAND[w];
  return { work: w, sig: b.sig, title: b.title, woerter: b.woerter, von: b.seiteVon, bis: b.seiteBis };
}

// ── Suche ───────────────────────────────────────────────────────────────
function suche(m) {
  var gelesen = H.lies(m.q || '');
  var antwort = { typ: 'ergebnis', id: m.id, fehler: gelesen.fehler, leer: !gelesen.ast };
  if (!gelesen.ast) { aktuell = null; post(antwort); return; }
  var arten = m.arten || { t: 1, h: 1, n: 1 };
  var wahl = m.baende && m.baende.length ? m.baende : null;
  var t0 = Date.now();

  var artZahl = { t: 0, h: 0, n: 0 };
  var treffer = [], jeBand = [], blattZahl = new Map(), stellenGesamt = 0, vorkommenGesamt = 0, seitenSet = new Set(), baendeMit = 0;
  REIHE.forEach(function (w) {
    var b = BAND[w];
    var seiten = m.seiten && m.seiten.work === w ? [m.seiten.von, m.seiten.bis] : null;
    // Mit allen Arten suchen und erst danach filtern: so kennt die Leiste
    // die Zahl jeder Art, auch der abgewaehlten.
    var r = H.suche(b, gelesen.ast, { arten: ALLE, aus: m.aus || [], seiten: seiten });
    var gewaehltB = !wahl || wahl.indexOf(w) >= 0;
    r.stellen = r.stellen.filter(function (st) {
      var a = b.ketten[st.kette].art;
      if (gewaehltB) artZahl[a]++;
      return arten[a];
    });
    var hist = new Array(BINS).fill(0), vork = 0;
    var spanne = Math.max(1, b.seiteBis - b.seiteVon + 1);
    r.stellen.forEach(function (st) {
      var l = H.laeufe(st.pos);
      st.laeufe = l;
      vork += l.length || 1;
      l.forEach(function (lauf) {
        var s = b.units[b.tU[lauf[0]]].buch;
        hist[Math.min(BINS - 1, Math.floor((s - b.seiteVon) / spanne * BINS))]++;
      });
    });
    jeBand.push({ work: w, sig: b.sig, title: b.title, stellen: r.stellen.length, vorkommen: vork, woerter: b.woerter,
                  von: b.seiteVon, bis: b.seiteBis, hist: hist });
    var gewaehlt = !wahl || wahl.indexOf(w) >= 0;
    if (!gewaehlt) return;
    if (r.stellen.length) baendeMit++;
    stellenGesamt += r.stellen.length; vorkommenGesamt += vork;
    // Formen der Blaetter zaehlen (nach Formtext, denn die Nummern gelten je Band)
    var zuBlatt = new Map();
    r.blaetter.forEach(function (bl) {
      var schl = bl.n.t + '|' + bl.n.v + '|' + (bl.n.exakt ? 1 : 0);
      if (!blattZahl.has(schl)) blattZahl.set(schl, { roh: bl.n.roh.replace(/^=/, ''), exakt: !!bl.n.exakt, formen: new Map(), knoten: bl.n });
      bl.ids.forEach(function (id) { zuBlatt.set(id, schl); });
    });
    r.stellen.forEach(function (st) {
      var u0 = b.units[st.pos.length ? b.tU[st.pos[0]] : b.ketten[st.kette].units[0]];
      seitenSet.add(w + '|' + u0.buch);
      st.pos.forEach(function (p) {
        var schl = zuBlatt.get(b.tF[p]);
        if (!schl) return;
        var fm = blattZahl.get(schl).formen, f = b.anzeige[b.tF[p]], fk = b.formen[b.tF[p]];
        var e = fm.get(fk); if (e) e.n++; else fm.set(fk, { form: f, n: 1 });
      });
      treffer.push({ w: w, st: st });
    });
  });

  // ausgeschlossene Formen mit ihrer Zahl im ganzen Bestand nachtragen
  var aus = m.aus || [];
  var formen = [];
  blattZahl.forEach(function (bl) {
    var liste = Array.from(bl.formen.entries()).map(function (e) { return { key: e[0], form: e[1].form, n: e[1].n, aus: false }; });
    aus.forEach(function (fk) {
      if (bl.formen.has(fk)) return;
      var n = 0, anz = fk, passt = false;
      REIHE.forEach(function (w) {
        var b = BAND[w], ids = H.formenVon(b, bl.knoten, null), id = b.formIx.get(fk);
        if (id !== undefined && ids.indexOf(id) >= 0) { passt = true; n += b.zahl[id]; anz = b.anzeige[id]; }
      });
      if (passt) liste.push({ key: fk, form: anz, n: n, aus: true });
    });
    liste.sort(function (a, b) { return b.n - a.n; });
    formen.push({ roh: bl.roh, exakt: bl.exakt, formen: liste.slice(0, 16), weitere: Math.max(0, liste.length - 16) });
  });

  if (m.ordnung === 'dichte') {
    treffer.forEach(function (t) {
      var k = BAND[t.w].ketten[t.st.kette];
      t.dichte = (t.st.laeufe.length || 0) / Math.max(8, k.t1 - k.t0);
    });
    treffer.sort(function (a, b) { return b.dichte - a.dichte; });
  }

  aktuell = { id: m.id, treffer: treffer, kwic: null, q: m.q };
  antwort.lesart = H.lesart(gelesen.ast);
  antwort.gesamt = { stellen: stellenGesamt, vorkommen: vorkommenGesamt, seiten: seitenSet.size, baende: baendeMit };
  antwort.jeBand = jeBand;
  antwort.arten = artZahl;
  antwort.formen = formen;
  antwort.gruppen = gruppen(treffer, m.ordnung === 'dichte');
  antwort.ms = Date.now() - t0;
  post(antwort);
}

// Bandgruppen fuer die Kopfzeilen: [ {work, ab, n} ]
function gruppen(treffer, gemischt) {
  if (gemischt) return [];
  var out = [];
  treffer.forEach(function (t, i) {
    var g = out[out.length - 1];
    if (!g || g.work !== t.w) out.push({ work: t.w, sig: BAND[t.w].sig, title: BAND[t.w].title, ab: i, n: 1 });
    else g.n++;
  });
  return out;
}

function stelleDaten(t, i) {
  var b = BAND[t.w], st = t.st, k = b.ketten[st.kette];
  var u0 = b.units[st.pos.length ? b.tU[st.pos[0]] : k.units[0]];
  var ziel = H.leserZiel(b, st);
  var woerter = [];
  st.pos.forEach(function (p) { var f = b.anzeige[b.tF[p]]; if (woerter.indexOf(f) < 0 && woerter.length < 6) woerter.push(f); });
  return {
    i: i, work: t.w, sig: b.sig, title: b.title, art: k.art,
    zitat: H.zitatStelle(b, st), abschnitt: b.secs[u0.sec] || '',
    html: H.ausschnitt(b, st), ziel: ziel, woerter: woerter, buch: u0.buch
  };
}

function stellen(m) {
  if (!aktuell || aktuell.id !== m.id) return;
  var out = [];
  for (var i = m.von; i < Math.min(m.bis, aktuell.treffer.length); i++) out.push(stelleDaten(aktuell.treffer[i], i));
  post({ typ: 'stellen', id: m.id, von: m.von, stellen: out, gesamt: aktuell.treffer.length });
}

// ── Konkordanz ──────────────────────────────────────────────────────────
var KWIC_SORT_GRENZE = 30000;

function kwicZeilen() {
  if (aktuell.kwic) return aktuell.kwic;
  var z = [];
  aktuell.treffer.forEach(function (t, ti) {
    (t.st.laeufe || []).forEach(function (l) { z.push({ ti: ti, l: l }); });
  });
  aktuell.kwic = z;
  return z;
}

function kwicDaten(r) {
  var t = aktuell.treffer[r.ti], b = BAND[t.w];
  if (!r.k) r.k = H.kwic(b, r.l);
  var o = H.ortVon(b, r.l[0]);
  return { zitat: H.zitat(b, r.l[0], r.l[1]), links: r.k.links, wort: r.k.wort, rechts: r.k.rechts,
           work: t.w, ziel: { pdf: o.pdf, von: o.zeile, bis: o.zeile }, woerter: [r.k.wort] };
}

function kwic(m) {
  if (!aktuell || aktuell.id !== m.id) return;
  var z = kwicZeilen();
  var sortierbar = z.length <= KWIC_SORT_GRENZE;
  if (m.ordnung && m.ordnung !== 'werk' && sortierbar && aktuell.kwicOrdnung !== m.ordnung) {
    z.forEach(function (r) { if (!r.k) r.k = H.kwic(BAND[aktuell.treffer[r.ti].w], r.l); });
    var coll = new Intl.Collator('de', { sensitivity: 'base' });
    var feld = m.ordnung === 'links' ? 'vorWort' : 'nachWort';
    z.sort(function (a, b) { return coll.compare(a.k[feld], b.k[feld]) || coll.compare(a.k.wort, b.k.wort) || a.ti - b.ti || a.l[0] - b.l[0]; });
    aktuell.kwicOrdnung = m.ordnung;
  } else if ((!m.ordnung || m.ordnung === 'werk') && aktuell.kwicOrdnung && aktuell.kwicOrdnung !== 'werk') {
    z.sort(function (a, b) { return a.ti - b.ti || a.l[0] - b.l[0]; });
    aktuell.kwicOrdnung = 'werk';
  }
  var out = [];
  for (var i = m.von; i < Math.min(m.bis, z.length); i++) out.push(kwicDaten(z[i]));
  post({ typ: 'kwic', id: m.id, von: m.von, zeilen: out, gesamt: z.length, sortierbar: sortierbar });
}

// ── Export ──────────────────────────────────────────────────────────────
function csvFeld(s) { s = String(s == null ? '' : s); return /[";\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; }
function klartext(html) {
  return html.replace(/<span class="seitenwechsel"[^>]*>(\d+)<\/span>/g, '|$1|').replace(/<[^>]+>/g, '')
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
}

function exportiere(m) {
  if (!aktuell || aktuell.id !== m.id) return;
  var zeilen;
  if (m.art === 'zitate') {
    zeilen = aktuell.treffer.map(function (t, i) { return H.zitatStelle(BAND[t.w], t.st); });
    post({ typ: 'export', id: m.id, art: m.art, text: zeilen.join('\n') + '\n' });
    return;
  }
  if (m.art === 'kwic') {
    zeilen = [['passage', 'links', 'Word', 'rechts'].join(';')];
    kwicZeilen().forEach(function (r) {
      var d = kwicDaten(r);
      zeilen.push([d.zitat, d.links, d.wort, d.rechts].map(csvFeld).join(';'));
    });
  } else {
    zeilen = [['passage', 'volume', 'Abschnitt', 'Text'].join(';')];
    aktuell.treffer.forEach(function (t, i) {
      var d = stelleDaten(t, i);
      zeilen.push([d.zitat, d.title, d.abschnitt, klartext(d.html)].map(csvFeld).join(';'));
    });
  }
  post({ typ: 'export', id: m.id, art: m.art, text: '﻿' + zeilen.join('\r\n') + '\r\n' });
}

// ── Vorschlaege ─────────────────────────────────────────────────────────
function vorschlag(m) {
  var p = (m.praefix || '').toLowerCase();
  if (p.length < 2 || !REIHE.length || !BAND[REIHE[0]]) { post({ typ: 'vorschlag', id: m.id, liste: [] }); return; }
  var kp = H.key(p), sammel = new Map();
  REIHE.forEach(function (w) {
    var b = BAND[w];
    if (!b) return;
    for (var i = 0; i < b.formen.length; i++) {
      var f = b.formen[i];
      if (f.charCodeAt(0) !== p.charCodeAt(0) && b.keys[i].charCodeAt(0) !== kp.charCodeAt(0)) continue;
      if (f.lastIndexOf(p, 0) !== 0 && b.keys[i].lastIndexOf(kp, 0) !== 0) continue;
      var e = sammel.get(f);
      if (e) e.n += b.zahl[i]; else sammel.set(f, { form: b.anzeige[i], n: b.zahl[i] });
    }
  });
  var liste = Array.from(sammel.values()).sort(function (a, b) { return b.n - a.n; }).slice(0, 8);
  post({ typ: 'vorschlag', id: m.id, liste: liste });
}

self.onmessage = function (e) {
  var m = e.data;
  try {
    if (m.typ === 'lade') { lade(); return; }
    if (m.typ === 'vorschlag') { (ladung || lade()).then(function () { vorschlag(m); }); return; }
    (ladung || lade()).then(function () {
      if (!REIHE.length || !BAND[REIHE[REIHE.length - 1]]) return;
      if (m.typ === 'suche') suche(m);
      else if (m.typ === 'stellen') stellen(m);
      else if (m.typ === 'kwic') kwic(m);
      else if (m.typ === 'export') exportiere(m);
    }).catch(function (err) {
      post({ typ: 'fehler', id: m.id, text: String(err && err.message || err) });
    });
  } catch (err) {
    post({ typ: 'fehler', id: m.id, text: String(err && err.message || err) });
  }
};
