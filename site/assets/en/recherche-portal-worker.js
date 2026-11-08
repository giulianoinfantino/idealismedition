/* Recherche des Portals: der Worker der Editionen (recherche-worker.js, unveraendert) und dazu die Querverweise
 * zwischen Fichte, Schelling und Hegel. Neue Nachrichten:
 *   vergleich {id}       -> vergleich  je Edition: Stellen, Vorkommen, Dichte, staerkste Baende, Begriffsumfeld, dichteste Stellen
 *   parallel  {id, i}    -> parallel   die aehnlichsten Stellen zur Stelle i, in jeder Edition (gemeinsame seltene Begriffe)
 *   bezuege   {}         -> bezuege    wer nennt wen, und die gemeinsamen Gewaehrsleute
 *   zeit      {id}       -> zeit       je Werk Jahr, Gattung, Woerter und Vorkommen (Begriffsgeschichte)
 * Dazu ein Filter der Suche nach Jahr und Gattung: suche {..., jahre: {von, bis}, gattung: 'dvne'}.
 * Jahr und Gattung je Werk stehen in suche/jahre.json (werkzeug/jahre.py).
 * Alles rechnet auf den Indizes, die der Kern ohnehin baut (Formen, Normalformen, Positionen, Ketten).
 */
'use strict';
importScripts('recherche-worker.js');
var GRUND = self.onmessage;
var EDS = ['fichte', 'schelling', 'hegel'];

// Fuellwoerter: sie stehen ueberall und sagen ueber ein Begriffsumfeld nichts
var STOPP = new Set(('aber alle allem allen aller alles also als andere anderen anderer anderes auch auf aus bei bey beim bis da dabei '
  + 'dadurch daher dahin damit dann daran darauf daraus darin darum das dass daß davon dazu dem den denen denn der deren des dessen '
  + 'desselben dieselbe dieselben derselbe dasselbe die dies diese diesem diesen dieser dieses diess doch dort durch eben ebenso ein eine '
  + 'einem einen einer eines einige einmal etwa etwas euch für gar gegen ganz gewiss hat haben habe hatte hier hingegen ich ihm ihn ihnen ihr '
  + 'ihre ihrem ihren ihrer immer indem insofern ist jede jedem jeden jeder jedes jedoch jene jenem jenen jener jenes kann kein keine keinem '
  + 'keinen keiner können konnte man mehr mein meine mich mir mit muss müssen nach nicht nichts noch nun nur ob oder ohne schon sehr sein '
  + 'seine seinem seinen seiner seyn sey sich sie sind so solche solchen soll sollen sollte sondern sowohl über um und uns unser unter '
  + 'viel vom von vor wäre war waren was weil welche welchem welchen welcher welches wenn wer werden wie wieder will wir wird wird wo wohl '
  + 'worden wurde würde zu zum zur zwar zwischen eines einem dieß daß wann denselben derselben welches jenen diesen dessen deren').split(' '));

function edVon(w) {
  var i = INFO[w];
  if (i && i.ed) return i.ed;
  return /^gw-/.test(w) ? 'hegel' : /^sw-/.test(w) ? 'schelling' : /^f[sn]w-/.test(w) ? 'fichte' : '';
}
function brauchbar(key) { return key.length >= 4 && !STOPP.has(key) && !/^\d/.test(key); }
function anzeigeVon(b, key) {
  // die haeufigste Form, nicht VERSAL (Ueberschriften) und nicht der Zufall des ersten Vorkommens
  var f = b.nachKey.get(key);
  if (!f || !f.length) return key;
  var best = null, n = -1;
  f.forEach(function (fid) {
    var a = b.anzeige[fid], versal = a.length > 1 && a === a.toUpperCase();
    var z = b.zahl[fid] * (versal ? 0.01 : 1);
    if (z > n) { n = z; best = a; }
  });
  if (best && best.length > 1 && best === best.toUpperCase()) best = best.charAt(0) + best.slice(1).toLowerCase();
  return best;
}

// ── Dokumenthaeufigkeit je Normalform ueber alle Ketten (einmal, beim ersten Bedarf) ──
var DF = null, KETTEN = 0, HAEUFIG = null, HAEUFIG_UMFELD = null;
function dfBauen() {
  if (DF) return;
  DF = new Map();
  var CF = new Map();
  REIHE.forEach(function (w) {
    var b = BAND[w], nF = b.formen.length, letzte = new Int32Array(nF).fill(-1), df = new Int32Array(nF);
    for (var i = 0; i < b.woerter; i++) { var f = b.tF[i], k = b.tK[i]; if (letzte[f] !== k) { letzte[f] = k; df[f]++; } }
    for (var fi = 0; fi < nF; fi++) {
      var key = b.keys[fi];
      DF.set(key, (DF.get(key) || 0) + df[fi]); CF.set(key, (CF.get(key) || 0) + b.zahl[fi]);
    }
    KETTEN += b.ketten.length;
  });
  // Die haeufigsten Woerter des ganzen Bestands tragen keine Parallele (Fuellwoerter, Allerweltswoerter)
  var rang = Array.from(CF.entries()).sort(function (a, c) { return c[1] - a[1]; });
  HAEUFIG = new Set(rang.slice(0, 900).map(function (x) { return x[0]; }));
  HAEUFIG_UMFELD = new Set(rang.slice(0, 160).map(function (x) { return x[0]; }));
}
function idf(key) { return Math.log(KETTEN / (DF.get(key) || 1)); }

// ── Parallelstellen ─────────────────────────────────────────────────────
function parallel(m) {
  if (!aktuell || aktuell.id !== m.id) return;
  var t = aktuell.treffer[m.i];
  if (!t) return;
  dfBauen();
  var b = BAND[t.w], kix = t.st.kette, k = b.ketten[kix];
  // Das Umfeld der Fundstelle (nicht der ganze Absatz: lange Absaetze wechseln das Thema)
  var pos = t.st.pos.length ? t.st.pos : [k.t0];
  var von = Math.max(k.t0, pos[0] - 60), bis = Math.min(k.t1, pos[pos.length - 1] + 61);
  var anfrage = {};
  t.st.pos.forEach(function (p) { anfrage[b.keys[b.tF[p]]] = 1; });
  var hier = new Map();
  for (var i = von; i < bis; i++) {
    var key = b.keys[b.tF[i]];
    if (!brauchbar(key)) continue;
    hier.set(key, (hier.get(key) || 0) + 1);
  }
  // Tragende Begriffe: Substantive (im Druck gross), selten im ganzen Bestand, keine Allerweltswoerter
  var kand = [];
  hier.forEach(function (n, key) {
    if (HAEUFIG.has(key) && !anfrage[key]) return;
    var f = anzeigeVon(b, key), gross = f.charAt(0) !== f.charAt(0).toLowerCase();
    if (!gross && !anfrage[key]) return;
    var g = idf(key);
    if (g < 3.0 && !anfrage[key]) return;
    if ((DF.get(key) || 0) < 3) return;
    kand.push({ key: key, gew: (1 + Math.log(n)) * g * (anfrage[key] ? 1.3 : 1), idf: g });
  });
  kand.sort(function (a, c) { return c.gew - a.gew; });
  kand = kand.slice(0, 12);
  var punkte = new Map();
  kand.forEach(function (c) {
    REIHE.forEach(function (w2) {
      var b2 = BAND[w2], fids = b2.nachKey.get(c.key);
      if (!fids) return;
      var gesehen = new Set();
      fids.forEach(function (fid) {
        var P = b2.post[fid];
        for (var j = 0; j < P.length; j++) {
          var p = P[j], k2 = b2.tK[p];
          if (w2 === t.w && Math.abs(k2 - kix) <= 1) continue;   // die Stelle selbst und ihre Nachbarn
          var schl = w2 + '|' + k2, e = punkte.get(schl);
          if (!e) { e = { w: w2, k: k2, s: 0, keys: new Set(), pos: [] }; punkte.set(schl, e); }
          if (!gesehen.has(k2)) { gesehen.add(k2); e.s += c.idf; e.keys.add(c.key); }
          if (e.pos.length < 8 && e.pos.indexOf(p) < 0) e.pos.push(p);
        }
      });
    });
  });
  var liste = [];
  var stark = {};
  kand.forEach(function (c) { if (c.idf >= 4.2) stark[c.key] = 1; });
  punkte.forEach(function (e) {
    if (e.keys.size < 3) return;
    var nStark = 0; e.keys.forEach(function (k) { if (stark[k]) nStark++; });
    if (nStark < 2 && e.keys.size < 4) return;       // drei Allerweltsbegriffe machen noch keine Parallele
    var kk = BAND[e.w].ketten[e.k];
    e.wert = e.s / Math.sqrt(Math.max(40, kk.t1 - kk.t0) / 80);   // lange Absaetze treffen sonst zufaellig mehr
    liste.push(e);
  });
  var aus = [];
  EDS.forEach(function (ed) {
    liste.filter(function (e) { return edVon(e.w) === ed; })
      .sort(function (a, c) { return c.wert - a.wert; }).slice(0, 3).forEach(function (e) {
        var b2 = BAND[e.w];
        e.pos.sort(function (a, c) { return a - c; });
        var st = { kette: e.k, pos: e.pos.slice(0, 6) };
        aus.push({ ed: ed, work: e.w, sig: b2.sig, title: b2.title, zitat: H.zitatStelle(b2, st), html: H.ausschnitt(b2, st, 60),
                   ziel: H.leserZiel(b2, st), woerter: Array.from(e.keys).slice(0, 6).map(function (x) { return anzeigeVon(b2, x); }) });
      });
  });
  post({ typ: 'parallel', id: m.id, i: m.i, liste: aus, begriffe: kand.slice(0, 8).map(function (c) { return anzeigeVon(b, c.key); }) });
}

// ── Vergleich der drei Editionen ────────────────────────────────────────
function zahlInEdition(ed, key) {
  var n = 0;
  REIHE.forEach(function (w) {
    if (edVon(w) !== ed) return;
    var b = BAND[w], fids = b.nachKey.get(key);
    if (fids) fids.forEach(function (f) { n += b.zahl[f]; });
  });
  return n;
}

function vergleich(m) {
  if (!aktuell || aktuell.id !== m.id) return;
  dfBauen();
  var anfrage = {};
  aktuell.treffer.forEach(function (t) { var b = BAND[t.w]; t.st.pos.forEach(function (p) { anfrage[b.keys[b.tF[p]]] = 1; }); });
  var je = {};
  EDS.forEach(function (ed) { je[ed] = { ed: ed, stellen: 0, vorkommen: 0, woerter: 0, baende: {}, umfeld: new Map(), fenster: 0, beste: [] }; });
  REIHE.forEach(function (w) { var e = je[edVon(w)]; if (e) e.woerter += BAND[w].woerter; });
  aktuell.treffer.forEach(function (t, i) {
    var e = je[edVon(t.w)];
    if (!e) return;
    var b = BAND[t.w], l = t.st.laeufe || [], v = l.length || 1;
    e.stellen++; e.vorkommen += v; e.baende[t.w] = (e.baende[t.w] || 0) + v;
    var kk = b.ketten[t.st.kette];
    e.beste.push({ i: i, d: v / Math.max(30, kk.t1 - kk.t0) });
    l.forEach(function (lauf) {
      var k = b.tK[lauf[0]];
      for (var p = lauf[0] - 8; p <= lauf[1] + 8; p++) {
        if (p < 0 || p >= b.woerter || (p >= lauf[0] && p <= lauf[1]) || b.tK[p] !== k) continue;
        var key = b.keys[b.tF[p]];
        if (!brauchbar(key) || anfrage[key] || HAEUFIG_UMFELD.has(key)) continue;
        var x = e.umfeld.get(key);
        if (x) x.n++; else e.umfeld.set(key, { n: 1, w: t.w });
        e.fenster++;
      }
    });
  });
  var aus = EDS.map(function (ed) {
    var e = je[ed];
    // Begriffsumfeld: beobachtet gegen erwartet (Haeufigkeit in der Edition mal Fensterlaenge)
    var umfeld = [];
    e.umfeld.forEach(function (x, key) {
      if (x.n < 3) return;
      var erw = Math.max(0.5, zahlInEdition(ed, key) / Math.max(1, e.woerter) * e.fenster);
      var faktor = x.n / erw;
      if (faktor < 2) return;
      umfeld.push({ wort: anzeigeVon(BAND[x.w], key), n: x.n, faktor: Math.round(faktor * 10) / 10, wert: x.n * Math.log(faktor) });
    });
    umfeld.sort(function (a, c) { return c.wert - a.wert; });
    var baende = Object.keys(e.baende).map(function (w) { return { work: w, sig: BAND[w].sig, title: BAND[w].title, n: e.baende[w] }; })
      .sort(function (a, c) { return c.n - a.n; }).slice(0, 3);
    e.beste.sort(function (a, c) { return c.d - a.d; });
    return { ed: ed, stellen: e.stellen, vorkommen: e.vorkommen, woerter: e.woerter,
             dichte: e.woerter ? e.vorkommen / e.woerter * 10000 : 0, baende: baende, umfeld: umfeld.slice(0, 12),
             beste: e.beste.slice(0, 2).map(function (x) { return stelleDaten(aktuell.treffer[x.i], x.i); }) };
  });
  post({ typ: 'vergleich', id: m.id, editionen: aus });
}

// ── Wer nennt wen ───────────────────────────────────────────────────────
var NAMEN = [
  { id: 'fichte', name: 'Fichte', re: /^fichte(s|'s|sche[mnrs]?|ianer\w*)?$/ },
  { id: 'schelling', name: 'Schelling', re: /^schelling(s|'s|sche[mnrs]?|ianer\w*)?$/ },
  { id: 'hegel', name: 'Hegel', re: /^hegel(s|'s|sche[mnrs]?|ianer\w*)?$/ }];
var ZEUGEN = [
  { name: 'Kant', re: /^kant(s|'s|ische[mnrs]?|ianer\w*)?$/ },
  { name: 'Spinoza', re: /^spino[zs]a(s|'s|ismus|istische[mnrs]?)?$/ },
  { name: 'Jacobi', re: /^jacobi(s|'s|sche[mnrs]?)?$/ },
  { name: 'Leibniz', re: /^leibni[tz]+(ens|s|'s|ische[mnrs]?|ianer\w*)?$/ },
  { name: 'Reinhold', re: /^reinhold(s|'s|sche[mnrs]?)?$/ },
  { name: 'Platon', re: /^plat(o|on|ons|os|o's|onische[mnrs]?|onismus)$/ },
  { name: 'Aristoteles', re: /^aristotel(es|is|ische[mnrs]?)$/ }];
var BEZUG = null;
function bezuege() {
  if (!BEZUG) {
    var alle = NAMEN.concat(ZEUGEN), zahl = {}, woerter = {};
    EDS.forEach(function (ed) { woerter[ed] = 0; zahl[ed] = alle.map(function () { return 0; }); });
    REIHE.forEach(function (w) {
      var b = BAND[w], ed = edVon(w);
      if (!zahl[ed]) return;
      woerter[ed] += b.woerter;
      for (var i = 0; i < b.formen.length; i++) {
        var f = b.formen[i], c = f.charAt(0);
        if ('fshkjlrpa'.indexOf(c) < 0) continue;
        for (var a = 0; a < alle.length; a++) if (alle[a].re.test(f)) zahl[ed][a] += b.zahl[i];
      }
    });
    BEZUG = { namen: NAMEN.map(function (n, a) { return { id: n.id, name: n.name, je: EDS.map(function (ed) { return zahl[ed][a]; }) }; }),
              zeugen: ZEUGEN.map(function (n, a) { return { name: n.name, je: EDS.map(function (ed) { return zahl[ed][NAMEN.length + a]; }) }; }),
              editionen: EDS, woerter: EDS.map(function (ed) { return woerter[ed]; }) };
  }
  post({ typ: 'bezuege', daten: BEZUG });
}

// ── Jahr und Gattung ────────────────────────────────────────────────────
var JAHRE = null, jahreLadung = null, SEG = {}, WSEG = {};
function ladeJahre() {
  if (!jahreLadung) jahreLadung = fetch(new URL('jahre.json', new URL('../suche/', self.location.href)))
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (d) { JAHRE = d; }, function () { JAHRE = null; });
  return jahreLadung;
}
/** Je Einheit des Bandes die Nummer des Werks in JAHRE.baende[w]. */
function segVon(w) {
  if (SEG[w]) return SEG[w];
  var b = BAND[w], liste = (JAHRE && JAHRE.baende[w]) || [[0, null, '', '']], a = new Int16Array(b.units.length), s = 0;
  for (var i = 0; i < a.length; i++) { while (s + 1 < liste.length && liste[s + 1][0] <= i) s++; a[i] = s; }
  return (SEG[w] = a);
}
/** Woerter je Werk, einmal gezaehlt. */
function woerterVon(w) {
  if (WSEG[w]) return WSEG[w];
  var b = BAND[w], sv = segVon(w), n = new Array(((JAHRE && JAHRE.baende[w]) || [0]).length).fill(0);
  for (var p = 0; p < b.woerter; p++) n[sv[b.tU[p]]]++;
  return (WSEG[w] = n);
}
function werkDaten(w, s) { var l = JAHRE && JAHRE.baende[w]; return l && l[s] || [0, null, '', '']; }
function erlaubt(f, e) {
  if (!f) return true;
  if (f.jahre && (e[1] == null || e[1] < f.jahre.von || e[1] > f.jahre.bis)) return false;
  return !f.gattung || f.gattung.indexOf(e[2]) >= 0;
}
// Der Filter gilt fuer die laufende Suche: der Kern fragt je Band H.suche, hier fallen die Stellen
// aus Werken ausserhalb des Zeitraums oder der Gattung weg (Zaehlung, Leiste und Verteilung folgen).
var FILTER = null;
var KERN_SUCHE = H.suche;
H.suche = function (b, ast, opts) {
  var r = KERN_SUCHE(b, ast, opts);
  if (!FILTER || !JAHRE || !JAHRE.baende[b.work]) return r;
  var sv = segVon(b.work), w = b.work;
  r.stellen = r.stellen.filter(function (st) {
    var u = st.pos.length ? b.tU[st.pos[0]] : b.ketten[st.kette].units[0];
    return erlaubt(FILTER, werkDaten(w, sv[u]));
  });
  return r;
};
var SUCHE_BASIS = suche;
suche = function (m) {
  var j = m.jahre && isFinite(m.jahre.von) && isFinite(m.jahre.bis) ? { von: +m.jahre.von, bis: +m.jahre.bis } : null;
  var g = typeof m.gattung === 'string' && /^[dvne]+$/.test(m.gattung) ? m.gattung : '';
  FILTER = j || g ? { jahre: j, gattung: g } : null;
  try { SUCHE_BASIS(m); if (aktuell) aktuell.filter = FILTER; } finally { FILTER = null; }
};

// ── Zeit: je Werk Jahr, Gattung, Woerter, Vorkommen ─────────────────────
function zeit(m) {
  if (!aktuell || aktuell.id !== m.id) return;
  var werke = [], idx = {}, f = aktuell.filter;
  REIHE.forEach(function (w) {
    var liste = JAHRE && JAHRE.baende[w];
    if (!liste) return;
    var b = BAND[w], wz = woerterVon(w), sv = segVon(w), ed = edVon(w);
    liste.forEach(function (e, s) {
      if (!erlaubt(f, e)) return;
      // gedruckte Seiten des Werks, fuer die Suche in diesem Werk
      var von = null, bis = null;
      for (var i = e[0]; i < b.units.length && sv[i] === s; i++) {
        var bu = b.units[i].buch;
        if (typeof bu === 'number') { if (von == null) von = bu; bis = bu; }
      }
      var x = { ed: ed, work: w, sig: b.sig, titel: e[3], jahr: e[1], gattung: e[2], woerter: wz[s], stellen: 0, n: 0, von: von, bis: bis };
      idx[w + '|' + s] = x; werke.push(x);
    });
  });
  aktuell.treffer.forEach(function (t) {
    var b = BAND[t.w], sv = segVon(t.w), l = t.st.laeufe || [];
    var u = t.st.pos.length ? b.tU[t.st.pos[0]] : b.ketten[t.st.kette].units[0];
    var x = idx[t.w + '|' + sv[u]];
    if (x) { x.stellen++; x.n += l.length || 1; }
  });
  post({ typ: 'zeit', id: m.id, werke: werke, filter: f || null });
}

self.onmessage = function (e) {
  // Erst die Jahre, dann alles in der Folge, in der es kam (die Jahre sind nach dem ersten Mal sofort da)
  ladeJahre().then(function () { verarbeite(e); });
};
function verarbeite(e) {
  var m = e.data;
  if (m.typ === 'zeit') {
    (ladung || lade()).then(function () {
      try { if (REIHE.length && BAND[REIHE[REIHE.length - 1]]) zeit(m); }
      catch (err) { post({ typ: 'fehler', text: String(err && err.message || err) }); }
    });
    return;
  }
  if (m.typ === 'parallel' || m.typ === 'vergleich' || m.typ === 'bezuege') {
    (ladung || lade()).then(function () {
      try {
        if (!REIHE.length || !BAND[REIHE[REIHE.length - 1]]) return;
        if (m.typ === 'parallel') parallel(m);
        else if (m.typ === 'vergleich') vergleich(m);
        else bezuege();
      } catch (err) { post({ typ: 'fehler', text: String(err && err.message || err) }); }
    });
    return;
  }
  GRUND(e);
}
