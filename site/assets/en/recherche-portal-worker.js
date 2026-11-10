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

/* ══ Pult: was die neue Suchseite des Portals (recherche-pult.js, seit 11/2026) vom Worker braucht ══
 *   suche    {…, ordnung: rang | jahr}   -> ergebnis   Rangfolge (beste Stellen zuerst) und Zeitfolge
 *   stellen                              -> stellen    je Stelle dazu: ed, werk, jahr, gattung
 *   seite    {id, i} | {work, pdf}       -> seite      die Druckseite in Zeilen, mit Zeilenzahlen und Marken
 *   pultvorschlag {id, wort, titel}      -> pultvorschlag  Wortanfang, aehnliche Woerter (Tippfehler), Werke
 *   ort      {id, work, buch, zeile}     -> ort        Seite im Leser zu einer Buchseite (Zitatsprung)
 *   pultwerke {id}                       -> pultwerke  die laufende Suche je Werk (Jahr, Gattung, Vorkommen)
 *   pultliste {id}                       -> pultliste  alle Werke der Ausgabe (fuer die Werkwahl)
 *   suche    {…, werke: [band|nr, …]}    -> ergebnis   nur in den gewaehlten Werken
 *   pultstart {id, beispiele, probe, stand} -> pultstart  Zahlen der Beispiele, Profil einer Probeanfrage
 *   begriffe {id, terme}                 -> begriffe   mehrere Anfragen ueber die Jahre, je Autor
 * Der Worker gibt nur Daten zurueck; alle Woerter der Bedienung stehen in recherche-pult.js.
 */
var POST_BASIS = post;
function mitFang(typ, f) {
  // Eine Meldung des Kerns abfangen, statt sie an die Seite zu schicken
  var fang = null;
  post = function (x) { if (x && x.typ === typ && !fang) fang = x; else POST_BASIS(x); };
  try { f(); } finally { post = POST_BASIS; }
  return fang;
}
function einheitVon(b, st) { return st.pos.length ? b.tU[st.pos[0]] : b.ketten[st.kette].units[0]; }
function werkVon(w, st) { return werkDaten(w, segVon(w)[einheitVon(BAND[w], st)]); }

// ── Rangfolge: beste Stellen zuerst ─────────────────────────────────────
// Je Stelle zaehlt, wie oft und wie dicht die gesuchten Woerter stehen (seltene Woerter mehr als haeufige),
// ob sie im Druck hervorgehoben sind, ob sie beieinander stehen, ob die Stelle den Begriff einfuehrt
// (nenne ich, heisst, verstehe ich in der Naehe) und ob es eine Ueberschrift ist. Bei Gleichstand Werkfolge.
var MITTEL = 0;
var EINFUEHREND = new Set(('nenne nennen nennt nennte genannt heisst heisse heissen verstehe verstehen versteht verstanden ' +
  'bedeutet bedeute definition bezeichne bezeichnen bezeichnet').split(' ').map(function (x) { return H.key(x); }));
function rangfolge(treffer) {
  dfBauen();
  if (!MITTEL) { var wz = 0; REIHE.forEach(function (w) { wz += BAND[w].woerter; }); MITTEL = Math.max(20, wz / Math.max(1, KETTEN)); }
  var K1 = 1.2, BB = 0.6;
  treffer.forEach(function (t, nr) {
    var b = BAND[t.w], st = t.st, k = b.ketten[st.kette], pos = st.pos;
    var laenge = Math.max(25, k.t1 - k.t0), je = new Map(), betont = 0, frueh = pos.length && pos[0] - k.t0 < 14, fuehrt = false;
    for (var i = 0; i < pos.length; i++) {
      var p = pos[i], key = b.keys[b.tF[p]], e = je.get(key);
      if (e) e.n++; else je.set(key, { n: 1, erste: p });
      betont += b.tH[p];
    }
    var wert = 0;
    je.forEach(function (e, key) {
      var g = Math.max(0.6, idf(key));
      wert += g * e.n * (K1 + 1) / (e.n + K1 * (1 - BB + BB * laenge / MITTEL));
    });
    if (!pos.length) wert = 0.5;
    if (je.size > 1) {
      // Naehe: die kleinste Spanne, die jedes gesuchte Wort einmal enthaelt, grob ueber die ersten Vorkommen
      var min = Infinity, max = -Infinity;
      je.forEach(function (e) { if (e.erste < min) min = e.erste; if (e.erste > max) max = e.erste; });
      wert *= 1 + 0.5 / (1 + (max - min) / 8);
    }
    for (i = 0; i < pos.length && i < 6 && !fuehrt; i++) {
      for (var q = Math.max(k.t0, pos[i] - 5); q < Math.min(k.t1, pos[i] + 6); q++) {
        if (EINFUEHREND.has(b.keys[b.tF[q]])) { fuehrt = true; break; }
      }
    }
    if (pos.length) wert *= 1 + 0.3 * betont / pos.length;
    if (fuehrt) wert *= 1.3;
    if (frueh) wert *= 1.08;
    if (k.art === 'h') wert *= 1.15; else if (k.art === 'n') wert *= 0.9;
    t.rang = wert; t.nr = nr;
  });
  treffer.sort(function (a, c) { return c.rang - a.rang || a.nr - c.nr; });
}
function zeitfolge(treffer) {
  treffer.forEach(function (t, nr) { var e = werkVon(t.w, t.st); t.jahr = e[1] == null ? 9999 : e[1]; t.nr = nr; });
  treffer.sort(function (a, c) { return a.jahr - c.jahr || a.nr - c.nr; });
}
var SUCHE_GEFILTERT = suche;
suche = function (m) {
  if (m.ordnung !== 'rang' && m.ordnung !== 'jahr') { SUCHE_GEFILTERT(m); return; }
  var m2 = {}, k;
  for (k in m) m2[k] = m[k];
  m2.ordnung = 'werk';
  var antwort = mitFang('ergebnis', function () { SUCHE_GEFILTERT(m2); });
  if (!antwort) return;
  if (aktuell && aktuell.id === m.id && aktuell.treffer.length) {
    if (m.ordnung === 'rang') rangfolge(aktuell.treffer); else zeitfolge(aktuell.treffer);
    aktuell.umgeordnet = true;
    antwort.gruppen = [];
  }
  antwort.ordnung = m.ordnung;
  post(antwort);
};

// Die Konkordanz bleibt in der Folge der Werke, auch wenn die Stellen nach Rang oder Zeit geordnet sind
function kwicWerkfolge(a, c) { return aktuell.treffer[a.ti].nr - aktuell.treffer[c.ti].nr || a.l[0] - c.l[0]; }
var KWIC_ZEILEN_BASIS = kwicZeilen;
kwicZeilen = function () {
  if (aktuell.kwic) return aktuell.kwic;
  var z = KWIC_ZEILEN_BASIS();
  if (aktuell.umgeordnet) z.sort(kwicWerkfolge);
  return z;
};
var KWIC_BASIS = kwic;
kwic = function (m) {
  if (aktuell && aktuell.id === m.id && aktuell.umgeordnet && (!m.ordnung || m.ordnung === 'werk') && aktuell.kwic && aktuell.kwicOrdnung && aktuell.kwicOrdnung !== 'werk') {
    aktuell.kwic.sort(kwicWerkfolge);
    aktuell.kwicOrdnung = 'werk';
  }
  KWIC_BASIS(m);
};

// ── Stelle: Edition, Werk, Jahr, Gattung dazu ───────────────────────────
var STELLE_BASIS = stelleDaten;
stelleDaten = function (t, i) {
  var d = STELLE_BASIS(t, i), e = werkVon(t.w, t.st);
  d.ed = edVon(t.w); d.werk = e[3] || ''; d.jahr = e[1]; d.gattung = e[2] || '';
  return d;
};

// ── Seitenbild: eine Druckseite in ihren Zeilen ─────────────────────────
function seitenVon(b) {
  if (b._seiten) return b._seiten;
  var m = new Map(), folge = [];
  for (var i = 0; i < b.units.length; i++) {
    var p = b.units[i].pdf, l = m.get(p);
    if (!l) { m.set(p, l = []); folge.push(p); }
    l.push(i);
  }
  folge.sort(function (a, c) { return a - c; });
  return (b._seiten = { nach: m, folge: folge });
}
function seitenbild(m) {
  var w, pdf, st = null, b;
  if (m.i != null) {
    if (!aktuell || aktuell.id !== m.id) return;
    var t = aktuell.treffer[m.i];
    if (!t) return;
    w = t.w; st = t.st; b = BAND[w];
    pdf = m.pdf != null ? m.pdf : b.units[einheitVon(b, st)].pdf;
  } else { w = m.work; b = BAND[w]; pdf = m.pdf; }
  if (!b) return;
  var S = seitenVon(b), units = S.nach.get(pdf);
  if (!units) return;
  // Marken: alle Treffer der laufenden Suche auf dieser Seite; die gewaehlte Stelle fuer sich
  var marken = new Map(), eigen = new Set();
  function merke(p, ist) {
    var u = b.tU[p];
    if (b.units[u].pdf !== pdf) return;
    var l = marken.get(u);
    if (!l) marken.set(u, l = []);
    l.push([b.tS[p], b.tE[p]]);
    if (ist) eigen.add(u + ':' + b.tS[p]);
  }
  if (aktuell && (m.i == null || aktuell.id === m.id)) {
    aktuell.treffer.forEach(function (t2) {
      if (t2.w !== w) return;
      var ist = t2.st === st;
      for (var j = 0; j < t2.st.pos.length; j++) merke(t2.st.pos[j], ist);
    });
  }
  var teile = units.map(function (ui) {
    var u = b.units[ui], T = u.text, Z = u.zeilen || [], mk = (marken.get(ui) || []).sort(function (a, c) { return a[0] - c[0]; });
    var zeilen = [], n = Z.length / 2 | 0;
    function zeile(von, bis, nr) {
      var hat = false, ist = false;
      for (var j = 0; j < mk.length; j++) if (mk[j][0] < bis && mk[j][1] > von) { hat = true; if (eigen.has(ui + ':' + mk[j][0])) ist = true; }
      var html = H.setze(T, von, bis, mk);
      // Der Text steht ohne Trennstriche im Index: bricht die Zeile im Wort, gehoert der Strich wieder hin
      if (bis < T.length && /[\p{L}]$/u.test(T.slice(0, bis)) && /^[\p{Ll}]/u.test(T.slice(bis))) html += '-';
      zeilen.push({ nr: nr, html: html, treffer: hat, hier: ist });
    }
    if (!n) zeile(0, T.length, null);
    else for (var j = 0; j < n; j++) zeile(j === 0 ? 0 : Z[2 * j], j + 1 < n ? Z[2 * j + 2] : T.length, Z[2 * j + 1]);
    return { art: u.art, weiter: !!u.weiter, zeilen: zeilen };
  });
  // Die Stelle reicht von ihrem ersten bis zu ihrem letzten Wort: auch die Zeilen dazwischen gehoeren dazu
  var flach = [], erste = -1, letzte = -1;
  teile.forEach(function (t2) { t2.zeilen.forEach(function (z) { if (z.hier) { if (erste < 0) erste = flach.length; letzte = flach.length; } flach.push([t2.art, z]); }); });
  for (var fi = erste + 1; fi < letzte; fi++) if (flach[fi][0] === flach[erste][0]) flach[fi][1].hier = true;
  var u0 = b.units[units[0]], ix = S.folge.indexOf(pdf), e = werkDaten(w, segVon(w)[st ? einheitVon(b, st) : units[0]]);
  var aus = { typ: 'seite', id: m.id, i: m.i == null ? null : m.i, work: w, sig: b.sig, ed: edVon(w), pdf: pdf, buch: u0.buch,
              werk: e[3] || '', jahr: e[1], gattung: e[2] || '', teile: teile,
              vor: ix > 0 ? S.folge[ix - 1] : null, nach: ix + 1 < S.folge.length ? S.folge[ix + 1] : null };
  if (aus.vor != null) aus.vorBuch = b.units[S.nach.get(aus.vor)[0]].buch;
  if (aus.nach != null) aus.nachBuch = b.units[S.nach.get(aus.nach)[0]].buch;
  if (st) {
    var d = stelleDaten(aktuell.treffer[m.i], m.i);
    aus.zitat = d.zitat; aus.ziel = d.ziel; aus.woerter = d.woerter; aus.eigeneSeite = b.units[einheitVon(b, st)].pdf === pdf;
    aus.gesamt = aktuell.treffer.length;
  }
  post(aus);
}

// ── Vorschlaege: Wortanfang, Tippfehler, Werke ──────────────────────────
var LEX = null;
function lexikon() {
  if (LEX) return LEX;
  LEX = new Map();
  REIHE.forEach(function (w) {
    var b = BAND[w];
    for (var i = 0; i < b.formen.length; i++) {
      var e = LEX.get(b.formen[i]);
      if (e) e.n += b.zahl[i]; else LEX.set(b.formen[i], { form: b.anzeige[i], n: b.zahl[i] });
    }
  });
  return LEX;
}
/** Abstand zweier Woerter (Einfuegen, Loeschen, Ersetzen, Vertauschen), abgebrochen ueber grenze. */
function abstand(a, c, grenze) {
  var la = a.length, lc = c.length;
  if (Math.abs(la - lc) > grenze) return grenze + 1;
  var vv = null, v = new Array(lc + 1), n, i, j;
  for (j = 0; j <= lc; j++) v[j] = j;
  for (i = 1; i <= la; i++) {
    n = new Array(lc + 1); n[0] = i;
    var klein = n[0];
    for (j = 1; j <= lc; j++) {
      var kost = a.charCodeAt(i - 1) === c.charCodeAt(j - 1) ? 0 : 1;
      n[j] = Math.min(v[j] + 1, n[j - 1] + 1, v[j - 1] + kost);
      if (vv && i > 1 && j > 1 && a.charCodeAt(i - 1) === c.charCodeAt(j - 2) && a.charCodeAt(i - 2) === c.charCodeAt(j - 1)) n[j] = Math.min(n[j], vv[j - 2] + 1);
      if (n[j] < klein) klein = n[j];
    }
    if (klein > grenze) return grenze + 1;
    vv = v; v = n;
  }
  return v[lc];
}
function aehnliche(wort, hoechstens) {
  var f = wort.toLowerCase(), kf = H.key(f), grenze = f.length < 6 ? 1 : 2, aus = [];
  if (f.length < 4) return aus;
  lexikon().forEach(function (e, form) {
    if (e.n < 3 || Math.abs(form.length - f.length) > grenze) return;
    // Der erste Buchstabe stimmt fast immer; ohne diese Schranke wuerde jede Eingabe alle Formen messen
    if (form.charCodeAt(0) !== f.charCodeAt(0) && form.charCodeAt(1) !== f.charCodeAt(1)) return;
    var d = Math.min(abstand(f, form, grenze), abstand(kf, H.key(form), grenze));
    if (d >= 1 && d <= grenze) aus.push({ form: e.form, n: e.n, d: d });
  });
  aus.sort(function (a, c) { return a.d - c.d || c.n - a.n; });
  // Die Schreibungen desselben Wortes (Seyn, Sein) nur einmal
  var gesehen = new Set();
  return aus.filter(function (x) { var k = H.key(x.form.toLowerCase()); if (gesehen.has(k)) return false; gesehen.add(k); return true; }).slice(0, hoechstens || 3);
}
function schlicht(s) { return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ß/g, 'ss').replace(/[^a-z0-9]+/g, ' ').trim(); }
var WERKE = null;
function werkliste() {
  if (WERKE) return WERKE;
  WERKE = [];
  REIHE.forEach(function (w) {
    var b = BAND[w], liste = (JAHRE && JAHRE.baende[w]) || [], sv = segVon(w);
    liste.forEach(function (e, s) {
      if (!e[3]) return;
      var u = b.units[e[0]], von = null, bis = null;
      for (var i = e[0]; i < b.units.length && sv[i] === s; i++) { var bu = b.units[i].buch; if (typeof bu === 'number') { if (von == null) von = bu; bis = bu; } }
      WERKE.push({ work: w, sig: b.sig, ed: edVon(w), titel: e[3], jahr: e[1], gattung: e[2], pdf: u ? u.pdf : null, von: von, bis: bis, s: schlicht(e[3]) });
    });
    WERKE.push({ work: w, sig: b.sig, ed: edVon(w), titel: b.title, band: true, pdf: b.units.length ? b.units[0].pdf : null, von: null, bis: null, s: schlicht(b.title) });
  });
  return WERKE;
}
function werkeZu(titel, hoechstens) {
  var q = schlicht(titel || '');
  if (q.length < 3) return [];
  var teile = q.split(' '), aus = [];
  werkliste().forEach(function (x) {
    var wert = 0;
    if (x.s.lastIndexOf(q, 0) === 0) wert = 3;
    else if ((' ' + x.s).indexOf(' ' + q) >= 0) wert = 2;
    else if (teile.length > 1 && teile.every(function (tl) { return (' ' + x.s).indexOf(' ' + tl) >= 0; })) wert = 1;
    if (!wert) return;
    if (x.band) wert -= 0.5;
    aus.push({ x: x, wert: wert });
  });
  aus.sort(function (a, c) { return c.wert - a.wert || a.x.s.length - c.x.s.length; });
  // Ein Werk, das einen Band allein fuellt, steht sonst doppelt da
  var gesehen = new Set();
  return aus.filter(function (a) { var k = a.x.work + '|' + a.x.s; if (gesehen.has(k)) return false; gesehen.add(k); return true; })
    .slice(0, hoechstens || 4).map(function (a) { var x = a.x; return { work: x.work, sig: x.sig, ed: x.ed, titel: x.titel, jahr: x.jahr == null ? null : x.jahr, pdf: x.pdf, von: x.von, bis: x.bis, band: !!x.band }; });
}
function pultvorschlag(m) {
  var aus = { typ: 'pultvorschlag', id: m.id, woerter: [], aehnlich: [], werke: [], zweck: m.zweck || '', wort: m.wort || '' };
  if (m.wort && m.wort.length >= 2) {
    var v = mitFang('vorschlag', function () { vorschlag({ id: 0, praefix: m.wort }); });
    aus.woerter = (v && v.liste) || [];
    var genau = aus.woerter.some(function (x) { return x.form.toLowerCase() === m.wort.toLowerCase(); }) || lexikon().has(m.wort.toLowerCase()) ||
      REIHE.some(function (w) { return BAND[w].nachKey.has(H.key(m.wort.toLowerCase())); });
    if (!genau && (m.zweck === 'leer' || !aus.woerter.length)) aus.aehnlich = aehnliche(m.wort, 3);
  }
  if (m.titel) aus.werke = werkeZu(m.titel, 4);
  post(aus);
}

// ── Zitatsprung: die Seite im Leser zu einer Buchseite ──────────────────
function ort(m) {
  var b = BAND[m.work];
  if (!b) { post({ typ: 'ort', id: m.id, work: m.work, pdf: null }); return; }
  var ziel = String(m.buch).toLowerCase(), pdf = null, zeile = null, hatZeile = false;
  for (var i = 0; i < b.units.length; i++) {
    var u = b.units[i];
    if (String(u.buch).toLowerCase() !== ziel) continue;
    if (pdf == null) pdf = u.pdf;
    if (m.zeile != null && u.zeilen) for (var j = 1; j < u.zeilen.length; j += 2) if (u.zeilen[j] === m.zeile) hatZeile = true;
  }
  if (hatZeile) zeile = m.zeile;
  post({ typ: 'ort', id: m.id, work: m.work, buch: m.buch, pdf: pdf, zeile: zeile, von: b.seiteVon, bis: b.seiteBis });
}

// ── Die laufende Suche je Werk ──────────────────────────────────────────
function pultwerke(m) {
  if (!aktuell || aktuell.id !== m.id) return;
  var idx = {}, werke = [];
  aktuell.treffer.forEach(function (t) {
    var b = BAND[t.w], s = segVon(t.w)[einheitVon(b, t.st)], k = t.w + '|' + s, x = idx[k];
    if (!x) {
      var e = werkDaten(t.w, s);
      x = idx[k] = { k: k, ed: edVon(t.w), work: t.w, sig: b.sig, titel: e[3] || b.title, jahr: e[1], gattung: e[2] || '', n: 0, stellen: 0 };
      werke.push(x);
    }
    x.stellen++; x.n += (t.st.laeufe || []).length || 1;
  });
  post({ typ: 'pultwerke', id: m.id, werke: werke });
}
/** Alle Werke der Ausgabe fuer die Werkwahl: Schluessel ist Band und Nummer des Werks im Band. */
function pultliste(m) {
  var aus = [];
  REIHE.forEach(function (w) {
    var b = BAND[w], liste = (JAHRE && JAHRE.baende[w]) || [];
    liste.forEach(function (e, s) {
      if (e[3]) aus.push({ k: w + '|' + s, ed: edVon(w), work: w, sig: b.sig, titel: e[3], jahr: e[1], gattung: e[2] || '' });
    });
  });
  post({ typ: 'pultliste', id: m.id, werke: aus });
}

// ── Werke als Filter: mehrere Werke, quer durch die Baende ──────────────
var WERKWAHL = null;
var H_SUCHE_VOR_WERKEN = H.suche;
H.suche = function (b, ast, opts) {
  var r = H_SUCHE_VOR_WERKEN(b, ast, opts);
  if (!WERKWAHL) return r;
  var sv = segVon(b.work), w = b.work;
  r.stellen = r.stellen.filter(function (st) { return WERKWAHL.has(w + '|' + sv[einheitVon(b, st)]); });
  return r;
};
var SUCHE_VOR_WERKEN = suche;
suche = function (m) {
  var wahl = Array.isArray(m.werke) && m.werke.length ? new Set(m.werke.map(String)) : null, m2 = m;
  if (wahl) {
    // nur die Baende durchsuchen, in denen die gewaehlten Werke stehen
    var baende = {}, k;
    wahl.forEach(function (x) { baende[x.slice(0, x.lastIndexOf('|'))] = 1; });
    m2 = {};
    for (k in m) m2[k] = m[k];
    m2.baende = Object.keys(baende).filter(function (w) { return BAND[w] && (!m.baende || !m.baende.length || m.baende.indexOf(w) >= 0); });
    m2.seiten = null;
    if (!m2.baende.length) m2.baende = Object.keys(baende).filter(function (w) { return BAND[w]; });
  }
  WERKWAHL = wahl;
  try { SUCHE_VOR_WERKEN(m2); } finally { WERKWAHL = null; }
};

// ── Profil einer Anfrage ohne die laufende Suche anzutasten ─────────────
var VON_JAHR = 1785, SCHRITT_JAHR = 5, N_JAHR = 14;
var WORT_JE = null;
function woerterJe() {
  // Woerter je Edition und Jahrfuenft (ohne Exzerpte), einmal gezaehlt
  if (WORT_JE) return WORT_JE;
  WORT_JE = {};
  EDS.forEach(function (ed) { WORT_JE[ed] = new Array(N_JAHR).fill(0); });
  REIHE.forEach(function (w) {
    var liste = JAHRE && JAHRE.baende[w], ed = edVon(w);
    if (!liste || !WORT_JE[ed]) return;
    var wz = woerterVon(w);
    liste.forEach(function (e, s) {
      if (e[2] === 'e' || e[1] == null) return;
      var j = Math.floor((e[1] - VON_JAHR) / SCHRITT_JAHR);
      if (j >= 0 && j < N_JAHR) WORT_JE[ed][j] += wz[s];
    });
  });
  return WORT_JE;
}
function profil(q, mitZeit, mitKwic) {
  var g = H.lies(q || '');
  if (!g.ast) return { q: q, leer: true };
  var aus = { q: q, stellen: 0, vorkommen: 0, jeBand: [], je: {}, kwic: [] };
  EDS.forEach(function (ed) { aus.je[ed] = { stellen: 0, vorkommen: 0, woerter: 0, n: new Array(N_JAHR).fill(0) }; });
  REIHE.forEach(function (w) {
    var b = BAND[w], ed = edVon(w), r = KERN_SUCHE(b, g.ast, { arten: ALLE, aus: [], seiten: null, hervor: false });
    var vork = 0, sv = mitZeit ? segVon(w) : null;
    r.stellen.forEach(function (st) {
      var l = H.laeufe(st.pos), n = l.length || 1;
      vork += n;
      if (mitZeit && aus.je[ed]) {
        var e = werkDaten(w, sv[einheitVon(b, st)]);
        if (e[2] !== 'e' && e[1] != null) { var j = Math.floor((e[1] - VON_JAHR) / SCHRITT_JAHR); if (j >= 0 && j < N_JAHR) aus.je[ed].n[j] += n; }
      }
      if (mitKwic && aus.kwic.length < 40 && l.length) aus.kwic.push({ b: b, l: l[0], n: st.pos.length });
    });
    aus.stellen += r.stellen.length; aus.vorkommen += vork;
    aus.jeBand.push({ work: w, sig: b.sig, ed: ed, n: vork, woerter: b.woerter });
    if (aus.je[ed]) { aus.je[ed].stellen += r.stellen.length; aus.je[ed].vorkommen += vork; aus.je[ed].woerter += b.woerter; }
  });
  if (mitZeit) { var wj = woerterJe(); EDS.forEach(function (ed) { aus.je[ed].w = wj[ed]; }); }
  if (mitKwic) {
    // vier Zeilen aus der Mitte des Bestands, nicht die ersten vier desselben Bandes
    var z = aus.kwic, schritt = Math.max(1, Math.floor(z.length / 4));
    aus.kwic = [z[0], z[schritt], z[2 * schritt], z[3 * schritt]].filter(Boolean).map(function (x) { var k = H.kwic(x.b, x.l, 34); return { links: k.links, wort: k.wort, rechts: k.rechts }; });
  }
  return aus;
}
var STAND = null;
function standLaden() {
  if (STAND) return Promise.resolve(STAND);
  return fetch(new URL('index.json', new URL('../suche/', self.location.href))).then(function (r) { return r.json(); })
    .then(function (ix) { STAND = ix.stand; return STAND; }, function () { return null; });
}
function pultstart(m) {
  standLaden().then(function (stand) {
    if (stand && m.stand === stand) { post({ typ: 'pultstart', id: m.id, stand: stand, gleich: true }); return; }
    var offen = (m.beispiele || []).slice(), zahlen = {};
    function weiter() {
      // Eine Anfrage je Runde, dazwischen kommt die Seite mit eigenen Anfragen zum Zug
      var q = offen.shift();
      if (q == null) {
        var p = m.probe ? profil(m.probe, true, true) : null;
        post({ typ: 'pultstart', id: m.id, stand: stand, zahlen: zahlen, probe: p });
        return;
      }
      var r = profil(q, false, false);
      zahlen[q] = r.leer ? null : { stellen: r.stellen, vorkommen: r.vorkommen };
      setTimeout(weiter, 30);
    }
    weiter();
  });
}
function begriffe(m) {
  var aus = (m.terme || []).slice(0, 4).map(function (q) {
    var p = profil(q, true, false);
    return p.leer ? { q: q, leer: true } : { q: q, stellen: p.stellen, vorkommen: p.vorkommen, je: p.je };
  });
  post({ typ: 'begriffe', id: m.id, terme: aus, von: VON_JAHR, schritt: SCHRITT_JAHR, n: N_JAHR });
}

var PULT = { seite: seitenbild, pultvorschlag: pultvorschlag, ort: ort, pultwerke: pultwerke, pultliste: pultliste, pultstart: pultstart, begriffe: begriffe };
var VERARBEITE_BASIS = verarbeite;
verarbeite = function (e) {
  var m = e.data, f = PULT[m.typ];
  if (!f) { VERARBEITE_BASIS(e); return; }
  (ladung || lade()).then(function () {
    try { if (REIHE.length && BAND[REIHE[REIHE.length - 1]]) f(m); }
    catch (err) { post({ typ: 'fehler', id: m.id, text: String(err && err.message || err) }); }
  });
};
