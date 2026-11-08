/* Recherche — der Kern: Anfrage lesen, Band indexieren, auswerten, zitieren.
 *
 * Laeuft im Hintergrund-Worker der Suchseite (`recherche-worker.js`) und in
 * den Tests unter Node (`pruefung_recherche/`). Kein DOM, kein fetch.
 *
 * ## Der Band als Wortindex
 *
 * `baueBand` liest eine Datei aus `assets/suche/` (siehe `baue_suchindex.py`)
 * und zerlegt den Text in Woerter. Fortgesetzte Einheiten — ein Absatz ueber
 * den Seitenwechsel, die Teile einer Anmerkung — bilden eine **Kette**; ihre
 * Woerter liegen im Index hintereinander, darum finden Phrase und Naehe ueber
 * den Seitenwechsel, und eine Kette ist **eine** Stelle. Jede Wortform hat
 * ihre Positionsliste. Eine Anfrage schlaegt ihre Woerter nach, statt den Text
 * zu lesen.
 *
 * ## Woerter, nicht Teilzeichenketten
 *
 * `Seyn` findet das Wort „Seyn“ (und „Sein“, siehe ortho.js), nicht „Daseyn“.
 * Wer Fortsetzungen will, schreibt `*seyn`, `seyn*` oder `*seyn*`. Bis Oktober
 * 2026 suchte die Seite Teilzeichenketten: „Seyn“ traf 10 892 Einheiten, als
 * Wort steht es in 6 348.
 */
(function (global) {
  'use strict';

  var O = global.HEGEL_ORTHO;
  var WORT = /[\p{L}\p{N}]+/gu;
  var BUCHSTABE = /\p{L}/u;
  var GROSS = /^\p{Lu}/u;
  var ROEM = /^[ivxlc]+$/;
  var WILD_ZEICHEN = '[\\p{L}\\p{N}]';

  function key(form) { return O.normalize(form); }

  // ═══════════════════════════════════════════════════════════════════
  //  Band
  // ═══════════════════════════════════════════════════════════════════

  function baueBand(d) {
    var U = d.u, nU = U.length;
    var units = new Array(nU);
    for (var i = 0; i < nU; i++) {
      var r = U[i];
      units[i] = { pdf: r[0], buch: r[1], art: r[2], weiter: r[3], sec: r[4], text: r[5], zeilen: r[6] };
    }
    // Ketten: eine fortgesetzte Einheit haengt an der letzten Kette ihrer Art.
    var ketten = [], offen = {};
    for (i = 0; i < nU; i++) {
      var u = units[i];
      if (u.weiter && offen[u.art]) { offen[u.art].units.push(i); u.kette = offen[u.art].ix; }
      else {
        var k = { ix: ketten.length, art: u.art, units: [i] };
        ketten.push(k); offen[u.art] = k; u.kette = k.ix;
      }
    }
    // Woerter, Kette fuer Kette — so liegen sie im Index hintereinander.
    var cap = 1 << 16, n = 0;
    var tS = new Int32Array(cap), tE = new Int32Array(cap), tU = new Int32Array(cap),
        tK = new Int32Array(cap), tF = new Int32Array(cap), tSatz = new Int32Array(cap);
    function wachse() {
      cap *= 2;
      function g(a) { var b = new Int32Array(cap); b.set(a); return b; }
      tS = g(tS); tE = g(tE); tU = g(tU); tK = g(tK); tF = g(tF); tSatz = g(tSatz);
    }
    var formIx = new Map(), formen = [], anzeige = [], zahl = [];
    var satz = 0;
    for (var ki = 0; ki < ketten.length; ki++) {
      var kt = ketten[ki];
      kt.t0 = n; satz++;
      var vorEnde = -1, vorText = null, vorWort = '';
      for (var j = 0; j < kt.units.length; j++) {
        var ui = kt.units[j], ut = units[ui].text;
        units[ui].t0 = n;
        WORT.lastIndex = 0;
        var m;
        while ((m = WORT.exec(ut)) !== null) {
          var w = m[0], s = m.index;
          // Satzgrenze: . ! ? zwischen zwei Woertern, danach ein Grossbuchstabe,
          // und das Wort davor keine Abkuerzung („d. h.“, „S. 5“, „§. 43“, „II.“).
          if (n > kt.t0) {
            var luecke = (vorText === ut) ? ut.slice(vorEnde, s) : (vorText.slice(vorEnde) + ' ' + ut.slice(0, s));
            if (/[.!?]/.test(luecke) && GROSS.test(w) && vorWort.length > 2 && !ROEM.test(vorWort) && BUCHSTABE.test(vorWort)) satz++;
          }
          if (n === cap) wachse();
          var f = w.toLowerCase(), id = formIx.get(f);
          if (id === undefined) { id = formen.length; formIx.set(f, id); formen.push(f); anzeige.push(w); zahl.push(0); }
          zahl[id]++;
          tS[n] = s; tE[n] = s + w.length; tU[n] = ui; tK[n] = ki; tF[n] = id; tSatz[n] = satz;
          n++;
          vorEnde = s + w.length; vorText = ut; vorWort = f;
        }
        units[ui].t1 = n;
      }
      kt.t1 = n;
    }
    // Positionslisten
    var post = new Array(formen.length), fill = new Int32Array(formen.length);
    for (i = 0; i < formen.length; i++) post[i] = new Int32Array(zahl[i]);
    for (i = 0; i < n; i++) { var fi = tF[i]; post[fi][fill[fi]++] = i; }
    // Normalform -> Formen
    var nachKey = new Map(), keys = new Array(formen.length);
    for (i = 0; i < formen.length; i++) {
      var kk = key(formen[i]); keys[i] = kk;
      var l = nachKey.get(kk); if (l) l.push(i); else nachKey.set(kk, [i]);
    }
    var bmin = Infinity, bmax = -Infinity;
    for (i = 0; i < nU; i++) { if (units[i].buch < bmin) bmin = units[i].buch; if (units[i].buch > bmax) bmax = units[i].buch; }
    return {
      work: d.work, sig: d.sig, title: d.title, secs: d.secs,
      units: units, ketten: ketten, woerter: n,
      tS: tS, tE: tE, tU: tU, tK: tK, tF: tF, tSatz: tSatz,
      formen: formen, anzeige: anzeige, zahl: zahl, post: post, keys: keys, nachKey: nachKey, formIx: formIx,
      seiteVon: bmin, seiteBis: bmax
    };
  }

  // ═══════════════════════════════════════════════════════════════════
  //  Anfrage lesen
  // ═══════════════════════════════════════════════════════════════════

  // Operatoren gelten nur in GROSSBUCHSTABEN — sonst waeren „und“, „oder“,
  // „nicht“ nicht mehr als Woerter suchbar. Ausnahme: das englische `and`/`or`
  // und `near/n`, die im Deutschen keine Woerter sind (so funktionierten sie
  // schon immer).
  var BINAER = { 'AND': 'and', 'UND': 'and', 'OR': 'or', 'ODER': 'or', 'SENTENCE': 'satz', 'SATZ': 'satz' };
  var KLEIN = { 'and': 'and', 'or': 'or' };

  function zerlege(q) {
    var out = [], re = /\s+|"[^"]*"?|[()]|[^\s()"]+/g, m;
    while ((m = re.exec(q)) !== null) {
      var t = m[0];
      if (/^\s+$/.test(t)) continue;
      out.push({ t: t, pos: m.index, end: m.index + t.length });
    }
    return out;
  }

  function opArt(t) {
    if (BINAER[t]) return { op: BINAER[t] };
    if (KLEIN[t]) return { op: KLEIN[t] };
    if (t === 'NOT' || t === 'NICHT') return { op: 'not' };
    var m = /^(NEAR|near|NAH|BEFORE|VOR)\/(\d{1,3})$/.exec(t);
    if (m) return { op: /^(BEFORE|VOR)$/.test(m[1]) ? 'vor' : 'nah', d: +m[2] };
    return null;
  }

  /** Liest die Anfrage. Gibt { ast, fehler: [{text, von, bis}], teile } zurueck.
   *  Bei einem Fehler wird die wahrscheinlichste Lesart trotzdem gebaut. */
  function lies(q) {
    var toks = zerlege(q || ''), pos = 0, fehler = [], teile = [];
    function peek() { return toks[pos]; }
    function fehl(text, t) { fehler.push({ text: text, von: t ? t.pos : q.length, bis: t ? t.end : q.length }); }

    toks.forEach(function (t) {
      var o = opArt(t.t);
      teile.push({ von: t.pos, bis: t.end, art: o ? 'op' : t.t === '(' || t.t === ')' ? 'klammer' :
        t.t.charAt(0) === '"' ? 'phrase' : t.t.charAt(0) === '=' ? 'exakt' : /[*?]/.test(t.t) ? 'muster' : 'wort' });
    });

    function istBinaer(t) { var o = t && opArt(t.t); return o && o.op !== 'not'; }

    function oder() {
      var l = und();
      while (peek() && (opArt(peek().t) || {}).op === 'or') {
        var op = peek(); pos++;
        var r = und();
        if (!r) { fehl('Nach „' + op.t + '“ fehlt ein Suchwort.', op); break; }
        l = l ? { t: 'or', l: l, r: r } : r;
      }
      return l;
    }
    function und() {
      var l = naehe();
      while (peek() && peek().t !== ')' && (opArt(peek().t) || {}).op !== 'or') {
        var o = opArt(peek().t), op = null;
        if (o && (o.op === 'and')) { op = peek(); pos++; }
        else if (o && (o.op === 'nah' || o.op === 'vor' || o.op === 'satz')) break;
        var r = naehe();
        if (!r) { if (op) fehl('Nach „' + op.t + '“ fehlt ein Suchwort.', op); break; }
        l = l ? { t: 'and', l: l, r: r } : r;
      }
      return l;
    }
    function naehe() {
      var l = nicht();
      while (peek()) {
        var o = opArt(peek().t);
        if (!o || (o.op !== 'nah' && o.op !== 'vor' && o.op !== 'satz')) break;
        var op = peek(); pos++;
        var r = nicht();
        if (!l) { fehl('Vor „' + op.t + '“ fehlt ein Suchwort.', op); l = r; continue; }
        if (!r) { fehl('Nach „' + op.t + '“ fehlt ein Suchwort.', op); break; }
        if (o.op === 'satz') l = { t: 'satz', l: l, r: r };
        else l = { t: o.op, d: o.d, l: l, r: r };
      }
      return l;
    }
    function nicht() {
      var t = peek();
      if (t && (opArt(t.t) || {}).op === 'not') {
        pos++;
        var c = nicht();
        if (!c) { fehl('Nach „' + t.t + '“ fehlt das Wort, das ausgeschlossen werden soll.', t); return null; }
        return { t: 'not', c: c };
      }
      return atom();
    }
    function atom() {
      var t = peek();
      if (!t) return null;
      if (t.t === ')') return null;
      if (istBinaer(t)) {
        // Operator am Anfang oder doppelt: ueberspringen
        fehl('„' + t.t + '“ steht ohne Suchwort davor.', t); pos++;
        return atom();
      }
      pos++;
      if (t.t === '(') {
        var n = oder();
        if (peek() && peek().t === ')') pos++;
        else fehl(naechstesWort(t) ? 'Die Klammer vor „' + naechstesWort(t) + '“ wird nicht geschlossen.' : 'Eine Klammer wird nicht geschlossen.', t);
        return n;
      }
      if (t.t.charAt(0) === '"') {
        if (t.t.length < 2 || t.t.charAt(t.t.length - 1) !== '"') fehl('Das Anführungszeichen vor „' + t.t.slice(1, 20) + '“ wird nicht geschlossen.', t);
        var inner = t.t.replace(/^"|"$/g, '').trim();
        var ws = inner.split(/\s+/).filter(Boolean).map(function (w) { return wortKnoten(w, t); }).filter(Boolean);
        if (!ws.length) { fehl('Die Anführungszeichen sind leer.', t); return null; }
        if (ws.length === 1) return ws[0];
        return { t: 'phrase', w: ws, roh: inner };
      }
      return wortKnoten(t.t, t);
    }
    function naechstesWort(t) {
      for (var i = toks.indexOf(t) + 1; i < toks.length; i++) if (!opArt(toks[i].t) && toks[i].t !== '(' && toks[i].t !== ')') return toks[i].t;
      return '';
    }
    function wortKnoten(roh, t) {
      var exakt = roh.charAt(0) === '=';
      var w = exakt ? roh.slice(1) : roh;
      // nur Buchstaben, Ziffern und die Platzhalter
      w = w.replace(/[^\p{L}\p{N}*?]/gu, '');
      if (!w) return null;
      if (/[*?]/.test(w)) {
        var buchst = w.replace(/[*?]/g, '');
        if (buchst.length < 2) { fehl('Das Muster „' + roh + '“ braucht mindestens zwei Buchstaben.', t); return null; }
        return { t: 'muster', v: w.toLowerCase(), exakt: exakt, roh: roh };
      }
      return { t: 'wort', v: w.toLowerCase(), exakt: exakt, roh: roh };
    }

    var ast = oder();
    while (pos < toks.length) {
      var rest = toks[pos];
      if (rest.t === ')') fehl('Zu dieser Klammer gibt es keine öffnende.', rest);
      pos++;
      var mehr = oder();
      if (mehr) ast = ast ? { t: 'and', l: ast, r: mehr } : mehr;
    }
    return { ast: ast, fehler: fehler, teile: teile };
  }

  // ── Die Anfrage in Worten ────────────────────────────────────────────
  function lesart(n, tief) {
    if (!n) return '';
    tief = tief || 0;
    function gruppe(x) { return lesart(x, tief + 1); }
    switch (n.t) {
      case 'wort': return '„' + n.roh.replace(/^=/, '') + '“' + (n.exakt ? ' in genau dieser Schreibung' : '');
      case 'muster':
        var v = n.roh.replace(/^=/, '');
        var a = v.charAt(0) === '*', e = v.charAt(v.length - 1) === '*', kern = v.replace(/^\*|\*$/g, '');
        if (!/[*?]/.test(kern)) {
          if (a && e) return 'ein Wort, das „' + kern + '“ enthält';
          if (e) return 'ein Wort, das mit „' + kern + '“ beginnt';
          if (a) return 'ein Wort, das auf „' + kern + '“ endet';
        }
        return 'ein Wort nach dem Muster „' + v + '“';
      case 'phrase': return 'die Wortfolge „' + n.roh + '“';
      case 'and':
        if (n.r.t === 'not') return gruppe(n.l) + ', aber nicht ' + lesart(n.r.c, tief + 1);
        return gruppe(n.l) + ' und ' + gruppe(n.r);
      case 'or': return gruppe(n.l) + ' oder ' + gruppe(n.r);
      case 'not': return 'jede Stelle ohne ' + lesart(n.c, tief + 1);
      case 'nah': return lesart(n.l, tief + 1) + ', höchstens ' + zahlwort(n.d) + ' von ' + lesart(n.r, tief + 1) + ' entfernt';
      case 'vor': return lesart(n.l, tief + 1) + ', danach innerhalb ' + (n.d === 1 ? 'des nächsten Worts' : 'von ' + n.d + ' Wörtern') + ' ' + lesart(n.r, tief + 1);
      case 'satz': return lesart(n.l, tief + 1) + ' und ' + lesart(n.r, tief + 1) + ' im selben Satz';
    }
    return '';
  }
  function zahlwort(d) { return d === 1 ? 'ein Wort' : d + ' Wörter'; }

  // ═══════════════════════════════════════════════════════════════════
  //  Auswerten
  // ═══════════════════════════════════════════════════════════════════

  function musterRegex(v) {
    var s = v.split('').map(function (c) {
      if (c === '*') return WILD_ZEICHEN + '*';
      if (c === '?') return WILD_ZEICHEN;
      return c.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }).join('');
    return new RegExp('^' + s + '$', 'u');
  }
  function musterNorm(v) {
    // Die Buchstabenstuecke zwischen den Platzhaltern normalisieren.
    var out = '', stueck = '';
    for (var i = 0; i < v.length; i++) {
      var c = v.charAt(i);
      if (c === '*' || c === '?') { out += key(stueck) + c; stueck = ''; } else stueck += c;
    }
    return out + key(stueck);
  }

  /** Die Formen-Nummern eines Wortknotens in einem Band (gemerkt je Band). */
  function formenVon(band, n, aus) {
    var merk = band._formen || (band._formen = new Map());
    var schl = n.t + '|' + n.v + '|' + (n.exakt ? 1 : 0) + '|' + (aus ? aus.join(',') : '');
    var hit = merk.get(schl);
    if (hit) return hit;
    var ids = [];
    if (n.t === 'wort') {
      if (n.exakt) { var id = band.formIx.get(n.v); if (id !== undefined) ids.push(id); }
      else {
        var ks = [key(n.v)];
        O.varianten(n.v).forEach(function (x) { var kx = key(x.toLowerCase()); if (ks.indexOf(kx) < 0) ks.push(kx); });
        ks.forEach(function (kx) { var l = band.nachKey.get(kx); if (l) ids = ids.concat(l); });
      }
    } else {
      var rx = musterRegex(n.v), rn = n.exakt ? null : musterRegex(musterNorm(n.v));
      for (var i = 0; i < band.formen.length; i++) {
        if (rx.test(band.formen[i]) || (rn && rn.test(band.keys[i]))) ids.push(i);
      }
    }
    if (aus && aus.length) ids = ids.filter(function (i) { return aus.indexOf(band.formen[i]) < 0; });
    ids.sort(function (a, b) { return a - b; });
    merk.set(schl, ids);
    if (merk.size > 400) merk.clear();
    return ids;
  }

  function positionen(band, ids) {
    if (ids.length === 1) return band.post[ids[0]];
    var gesamt = 0, i;
    for (i = 0; i < ids.length; i++) gesamt += band.post[ids[i]].length;
    var out = new Int32Array(gesamt), o = 0;
    for (i = 0; i < ids.length; i++) { out.set(band.post[ids[i]], o); o += band.post[ids[i]].length; }
    return out.sort();
  }

  // Ergebnis eines Knotens: Map kette -> sortierte Positionen (Array).
  function nachKetten(band, pos) {
    var m = new Map(), tK = band.tK;
    for (var i = 0; i < pos.length; i++) {
      var k = tK[pos[i]], l = m.get(k);
      if (l) l.push(pos[i]); else m.set(k, [pos[i]]);
    }
    return m;
  }
  function vereinige(a, b) {
    var out = [], i = 0, j = 0;
    while (i < a.length || j < b.length) {
      var x = i < a.length ? a[i] : Infinity, y = j < b.length ? b[j] : Infinity;
      if (x === y) { out.push(x); i++; j++; } else if (x < y) { out.push(x); i++; } else { out.push(y); j++; }
    }
    return out;
  }

  function werte(band, n, ctx) {
    switch (n.t) {
      case 'wort': case 'muster': {
        var ids = formenVon(band, n, ctx.aus);
        ctx.blaetter.push({ n: n, ids: ids });
        return nachKetten(band, positionen(band, ids));
      }
      case 'phrase': {
        var sets = n.w.map(function (w) {
          var ids = formenVon(band, w, ctx.aus);
          ctx.blaetter.push({ n: w, ids: ids, inPhrase: true });
          var f = new Uint8Array(band.formen.length);
          ids.forEach(function (i) { f[i] = 1; });
          return { ids: ids, f: f };
        });
        var erst = positionen(band, sets[0].ids), out = [], L = n.w.length;
        for (var i = 0; i < erst.length; i++) {
          var p = erst[i], k = band.tK[p], ok = true;
          for (var j = 1; j < L; j++) {
            var q = p + j;
            if (q >= band.woerter || band.tK[q] !== k || !sets[j].f[band.tF[q]]) { ok = false; break; }
          }
          if (ok) for (j = 0; j < L; j++) out.push(p + j);
        }
        return nachKetten(band, out);
      }
      case 'or': {
        var a = werte(band, n.l, ctx), b = werte(band, n.r, ctx), m = new Map(a);
        b.forEach(function (v, k) { var x = m.get(k); m.set(k, x ? vereinige(x, v) : v); });
        return m;
      }
      case 'and': {
        var l = werte(band, n.l, ctx), r = werte(band, n.r, ctx), m2 = new Map();
        var klein = l.size <= r.size ? l : r, gross = klein === l ? r : l;
        klein.forEach(function (v, k) { var w = gross.get(k); if (w !== undefined) m2.set(k, vereinige(v, w)); });
        return m2;
      }
      case 'not': {
        var c = werte(band, n.c, { aus: ctx.aus, blaetter: [] }), m3 = new Map();
        for (var ki = 0; ki < band.ketten.length; ki++) if (!c.has(ki) && ctx.arten[band.ketten[ki].art]) m3.set(ki, []);
        return m3;
      }
      case 'nah': case 'vor': case 'satz': {
        var L1 = werte(band, n.l, ctx), R1 = werte(band, n.r, ctx), m4 = new Map();
        L1.forEach(function (pl, k) {
          var pr = R1.get(k);
          if (!pr || !pl.length || !pr.length) return;
          var treffer = [];
          for (var i = 0; i < pl.length; i++) {
            for (var j = 0; j < pr.length; j++) {
              var a = pl[i], b = pr[j], ok;
              if (n.t === 'nah') ok = a !== b && Math.abs(a - b) <= n.d;
              else if (n.t === 'vor') ok = b > a && b - a <= n.d;
              else ok = a !== b && band.tSatz[a] === band.tSatz[b];
              if (ok) { treffer.push(a); treffer.push(b); }
            }
          }
          if (treffer.length) {
            treffer.sort(function (x, y) { return x - y; });
            m4.set(k, treffer.filter(function (x, i) { return i === 0 || treffer[i - 1] !== x; }));
          }
        });
        return m4;
      }
    }
    return new Map();
  }

  /** Wertet `ast` in einem Band aus.
   *  opt: { arten: {t,h,n}, aus: [formen], seiten: [von,bis] | null }
   *  -> { stellen: [{kette, pos:[...]}], blaetter } */
  function suche(band, ast, opt) {
    var ctx = { arten: opt.arten, aus: opt.aus || [], blaetter: [] };
    var m = werte(band, ast, ctx);
    var stellen = [];
    m.forEach(function (pos, k) {
      var kt = band.ketten[k];
      if (!opt.arten[kt.art]) return;
      if (opt.seiten) {
        var p0 = pos.length ? band.units[band.tU[pos[0]]].buch : band.units[kt.units[0]].buch;
        if (p0 < opt.seiten[0] || p0 > opt.seiten[1]) return;
      }
      stellen.push({ kette: k, pos: pos });
    });
    stellen.sort(function (a, b) { return a.kette - b.kette; });
    return { stellen: stellen, blaetter: ctx.blaetter };
  }

  /** Laeufe zusammenhaengender Trefferwoerter — je Lauf eine Zeile der Konkordanz. */
  function laeufe(pos) {
    var out = [];
    for (var i = 0; i < pos.length; i++) {
      if (out.length && pos[i] === out[out.length - 1][1] + 1) out[out.length - 1][1] = pos[i];
      else out.push([pos[i], pos[i]]);
    }
    return out;
  }

  // ═══════════════════════════════════════════════════════════════════
  //  Zitieren
  // ═══════════════════════════════════════════════════════════════════

  function zeileVon(unit, off) {
    var z = unit.zeilen;
    if (!z || !z.length) return null;
    var best = null;
    for (var i = 0; i < z.length; i += 2) { if (z[i] <= off) best = z[i + 1]; else break; }
    return best == null ? z[1] : best;
  }

  /** Ort eines Wortes: { unit, buch, pdf, zeile }. */
  function ortVon(band, p) {
    var u = band.units[band.tU[p]];
    return { unit: band.tU[p], buch: u.buch, pdf: u.pdf, zeile: zeileVon(u, band.tS[p]) };
  }

  /** „GW 12, 18,36–37“, „GW 12, 18,38–19,2“, „GW 12, 18“. */
  function zitat(band, von, bis) {
    var a = ortVon(band, von), b = ortVon(band, bis);
    var s = band.sig + ', ' + a.buch;
    if (a.zeile == null) return a.buch === b.buch ? s : s + '–' + b.buch;
    s += ',' + a.zeile;
    if (b.buch !== a.buch) s += '–' + b.buch + (b.zeile != null ? ',' + b.zeile : '');
    else if (b.zeile != null && b.zeile !== a.zeile) s += '–' + b.zeile;
    return s;
  }

  function zitatStelle(band, st) {
    var k = band.ketten[st.kette];
    if (!st.pos.length) {
      var u = band.units[k.units[0]];
      return band.sig + ', ' + u.buch + (u.zeilen && u.zeilen.length ? ',' + u.zeilen[1] : '');
    }
    return zitat(band, st.pos[0], st.pos[st.pos.length - 1]);
  }

  /** Die Druckzeilen der ersten Fundseite, fuer den Sprung in den Leser. */
  function leserZiel(band, st) {
    var k = band.ketten[st.kette];
    if (!st.pos.length) { var u0 = band.units[k.units[0]]; return { pdf: u0.pdf, von: null, bis: null }; }
    var a = ortVon(band, st.pos[0]), bis = a.zeile;
    for (var i = 1; i < st.pos.length; i++) {
      var o = ortVon(band, st.pos[i]);
      if (o.pdf !== a.pdf) break;
      if (o.zeile != null && o.zeile > bis) bis = o.zeile;
    }
    return { pdf: a.pdf, von: a.zeile, bis: bis };
  }

  // ═══════════════════════════════════════════════════════════════════
  //  Textausschnitt
  // ═══════════════════════════════════════════════════════════════════

  function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

  /** HTML fuer text[von, bis) mit Sperrsatz (`*…*` -> <em>) und Markierungen.
   *  `marken`: sortierte [s, e]-Paare innerhalb des Textes. */
  function setze(text, von, bis, marken) {
    var em = false;
    for (var i = 0; i < von; i++) if (text.charCodeAt(i) === 42) em = !em;
    var out = '', mk = false, mi = 0;
    function auf() { return (em ? '<em class="sperrsatz">' : '') + (mk ? '<mark>' : ''); }
    function zu() { return (mk ? '</mark>' : '') + (em ? '</em>' : ''); }
    while (mi < marken.length && marken[mi][1] <= von) mi++;
    if (mi < marken.length && marken[mi][0] < von) mk = true;
    out += auf();
    var puffer = '';
    for (i = von; i < bis; i++) {
      var neuMk = mk;
      if (mi < marken.length && i === marken[mi][0]) neuMk = true;
      if (mi < marken.length && i === marken[mi][1]) { neuMk = false; mi++; if (mi < marken.length && i === marken[mi][0]) neuMk = true; }
      var c = text.charAt(i);
      if (c === '*') {
        out += esc(puffer); puffer = '';
        out += zu(); em = !em; mk = neuMk; out += auf();
        continue;
      }
      if (neuMk !== mk) { out += esc(puffer); puffer = ''; out += zu(); mk = neuMk; out += auf(); }
      puffer += c;
    }
    out += esc(puffer) + zu();
    return out.replace(/<em class="sperrsatz"><\/em>|<mark><\/mark>/g, '');
  }

  function anWortgrenze(t, p, richtung) {
    if (richtung < 0) { while (p > 0 && !/\s/.test(t.charAt(p - 1))) p--; return p; }
    while (p < t.length && !/\s/.test(t.charAt(p))) p++;
    return p;
  }

  /** Ausschnitt einer Stelle: Fenster um die Treffer, Seitenwechsel markiert. */
  function ausschnitt(band, st, umfeld) {
    umfeld = umfeld || 110;
    var k = band.ketten[st.kette];
    var proUnit = new Map();
    st.pos.forEach(function (p) {
      var u = band.tU[p], l = proUnit.get(u);
      if (!l) proUnit.set(u, l = []);
      var last = l[l.length - 1];
      // benachbarte Trefferwoerter (Phrase) zu einer Marke verbinden
      if (last && band.tS[p] - last[1] <= 1 && /^\s?$/.test(band.units[u].text.slice(last[1], band.tS[p]))) last[1] = band.tE[p];
      else l.push([band.tS[p], band.tE[p]]);
    });
    var teile = [];
    var ohne = !st.pos.length;
    for (var j = 0; j < k.units.length; j++) {
      var ui = k.units[j], u = band.units[ui], t = u.text;
      var marken = proUnit.get(ui) || [];
      if (!marken.length && !(ohne && j === 0)) continue;
      if (ohne) { teile.push({ ui: ui, html: setze(t, 0, Math.min(t.length, anWortgrenze(t, 260, 1)), []) + (t.length > 260 ? ' […]' : ''), anfang: true }); break; }
      var fenster = [];
      marken.forEach(function (mk) {
        var a = anWortgrenze(t, Math.max(0, mk[0] - umfeld), -1), b = anWortgrenze(t, Math.min(t.length, mk[1] + umfeld), 1);
        var f = fenster[fenster.length - 1];
        if (f && a <= f[1] + 12) f[1] = Math.max(f[1], b); else fenster.push([a, b]);
      });
      var html = '';
      fenster.forEach(function (f, i) {
        html += (f[0] > 0 ? (i === 0 ? '[…] ' : ' […] ') : '') + setze(t, f[0], f[1], marken).trim();
        if (i === fenster.length - 1 && f[1] < t.length) html += ' […]';
      });
      teile.push({ ui: ui, html: html });
    }
    var out = '';
    teile.forEach(function (tl, i) {
      if (i > 0) {
        var u = band.units[tl.ui];
        out += ' <span class="seitenwechsel" title="Seite ' + u.buch + '">' + u.buch + '</span> ';
      }
      out += tl.html;
    });
    return out;
  }

  /** Eine Zeile der Konkordanz: links, Stichwort, rechts (Klartext ohne Sterne). */
  function kwic(band, lauf, breite) {
    breite = breite || 70;
    var u = band.units[band.tU[lauf[0]]], t = u.text;
    var s = band.tS[lauf[0]];
    var e = band.tU[lauf[1]] === band.tU[lauf[0]] ? band.tE[lauf[1]] : band.tE[lauf[0]];
    var links = t.slice(Math.max(0, s - breite - 40), s), rechts = t.slice(e, e + breite + 40);
    // ueber den Seitenwechsel hinaus weiterlesen, wenn die Einheit endet
    var k = band.ketten[u.kette], ix = k.units.indexOf(band.tU[lauf[0]]);
    if (rechts.length < breite && ix < k.units.length - 1) rechts += ' ' + band.units[k.units[ix + 1]].text.slice(0, breite);
    if (links.length < breite && ix > 0) { var vt = band.units[k.units[ix - 1]].text; links = vt.slice(Math.max(0, vt.length - breite)) + ' ' + links; }
    function sauber(x) { return x.replace(/\*/g, '').replace(/\s+/g, ' '); }
    links = sauber(links); rechts = sauber(rechts);
    if (links.length > breite) links = links.slice(links.indexOf(' ', links.length - breite) + 1);
    if (rechts.length > breite) rechts = rechts.slice(0, rechts.lastIndexOf(' ', breite));
    var vorWort = (links.match(/([\p{L}\p{N}]+)[^\p{L}\p{N}]*$/u) || [, ''])[1];
    var nachWort = (rechts.match(/^[^\p{L}\p{N}]*([\p{L}\p{N}]+)/u) || [, ''])[1];
    return { links: links, wort: sauber(t.slice(s, e)), rechts: rechts, vorWort: vorWort.toLowerCase(), nachWort: nachWort.toLowerCase() };
  }

  global.HegelRecherche = {
    baueBand: baueBand, lies: lies, lesart: lesart, suche: suche, laeufe: laeufe,
    zitat: zitat, zitatStelle: zitatStelle, leserZiel: leserZiel, ortVon: ortVon,
    ausschnitt: ausschnitt, kwic: kwic, setze: setze, formenVon: formenVon, key: key
  };
})(typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : globalThis);
