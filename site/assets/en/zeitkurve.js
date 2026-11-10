/* Begriffsgeschichte: wie oft ein Wort (oder eine Anfrage der Recherche) in den Schriften eines
   Jahrfünfts steht, je 10 000 Wörter, für Fichte, Schelling und Hegel nebeneinander.
   Gemeinsam für die Seite „Analysen“ (vorgerechnete Zeitreihen, assets/zeitreihen.json) und die
   Ansicht „Zeit“ der Recherche (vom Worker gezählt).

   Gezeichnet wird in SVG ohne Bibliothek. Farbe und Strichart je Autor kommen aus zeitkurve.css
   (Token --autor-fichte, --autor-schelling, --autor-hegel in style.css, je Modus gegen den Untergrund
   gemessen; Fichte durchgezogen, Schelling gestrichelt, Hegel gepunktet). Text trägt nie die
   Reihenfarbe; die Namen stehen in der Legende und am Ende jeder Linie. Ein Jahrfünft mit zu wenig
   Text (weniger als d.min Wörter) bekommt keinen Punkt: die Linie setzt dort aus, statt aus drei
   Seiten eine Spitze zu machen. Dieselben Zahlen stehen darunter als Tabelle. */
(function () {
  'use strict';
  var SVGNS = 'http://www.w3.org/2000/svg';
  var LOC = document.documentElement.lang === 'en' ? 'en-US' : 'de-DE';
  var L = 46, R = 92, T = 26, B = 30;   // Breite und Höhe je Zeichnung: so breit wie der Platz, Schrift bleibt 11 px

  function zahl(n) { return Number(n).toLocaleString(LOC); }
  function dichte(v) {
    var s = v >= 10 ? 0 : v >= 1 ? 1 : 2;
    return v.toLocaleString(LOC, { minimumFractionDigits: s, maximumFractionDigits: s });
  }
  function el(name, attrs, parent) {
    var e = document.createElementNS(SVGNS, name);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }
  function html(name, cls, text, parent) {
    var e = document.createElement(name);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    if (parent) parent.appendChild(e);
    return e;
  }
  /* Runde Achsenschritte: 1, 2, 5 × 10^n, so dass 3 bis 5 Linien entstehen. */
  function schritt(max) {
    if (max <= 0) return 1;
    var roh = max / 4, p = Math.pow(10, Math.floor(Math.log10(roh))), f = roh / p;
    return (f <= 1 ? 1 : f <= 2 ? 2 : f <= 5 ? 5 : 10) * p;
  }
  function jahrfuenft(d, j) { var a = d.von + j * d.schritt; return a + '–' + (a + d.schritt - 1); }

  /* d: { von, schritt, n, min, reihen: [{ id, name, n: [Vorkommen je Jahrfünft], w: [Wörter je Jahrfünft] }] }
     Gibt false zurück, wenn kein datiertes Vorkommen da ist (dann zeichnet der Aufrufer einen Hinweis). */
  function zeichne(fig, d) {
    fig.textContent = '';
    var W = Math.max(340, Math.min(720, Math.round(fig.clientWidth || 720))), H = W < 520 ? 260 : 310;
    var reihen = d.reihen.map(function (r) {
      var p = [], summe = 0, woerter = 0;
      for (var j = 0; j < d.n; j++) {
        var ok = r.w[j] >= d.min;
        p.push(ok ? r.n[j] / r.w[j] * 1e4 : null);
        if (ok) { summe += r.n[j]; woerter += r.w[j]; }
      }
      return { id: r.id, name: r.name, n: r.n, w: r.w, p: p, summe: summe, woerter: woerter };
    });
    if (!reihen.some(function (r) { return r.summe > 0; })) return false;

    // Legende: Name, Vorkommen in den datierten Schriften, Dichte insgesamt
    var leg = html('ul', 'zk-legende', null, fig);
    leg.setAttribute('aria-label', 'Series');
    reihen.forEach(function (r) {
      var li = html('li', 'zk-legende-eintrag', null, leg);
      html('span', 'zk-feld zk-' + r.id, null, li).setAttribute('aria-hidden', 'true');
      html('span', 'zk-legende-name', r.name, li);
      html('span', 'zk-legende-zahl', zahl(r.summe) + ' occurrences, ' + dichte(r.woerter ? r.summe / r.woerter * 1e4 : 0) + ' per 10,000 words', li);
    });

    var max = 0;
    reihen.forEach(function (r) { r.p.forEach(function (v) { if (v != null && v > max) max = v; }); });
    var st = schritt(max), oben = Math.max(st, Math.ceil(max / st) * st);
    var svg = el('svg', { viewBox: '0 0 ' + W + ' ' + H, class: 'zk-svg', role: 'group', 'aria-label': 'Occurrences per 10,000 words, by five-year period' }, fig);
    var pw = W - L - R, ph = H - T - B, bis = d.von + d.n * d.schritt;
    function x(jahr) { return L + (jahr - d.von) / (bis - d.von) * pw; }
    function xm(j) { return x(d.von + j * d.schritt + d.schritt / 2); }
    function y(v) { return T + ph - v / oben * ph; }

    var gitter = el('g', { class: 'zk-gitter', 'aria-hidden': 'true' }, svg);
    var stellen = st < 1 ? (st < 0.1 ? 2 : 1) : 0;
    for (var v = 0; v <= oben + 1e-9; v += st) {
      if (v > 0) el('line', { x1: L, x2: W - R, y1: y(v), y2: y(v) }, gitter);
      el('text', { x: L - 8, y: y(v) + 4, 'text-anchor': 'end' }, gitter).textContent =
        v.toLocaleString(LOC, { minimumFractionDigits: stellen, maximumFractionDigits: stellen });
    }
    el('text', { x: L - 8, y: 11, 'text-anchor': 'start', class: 'zk-einheit' }, gitter).textContent = 'per 10,000 words';
    var achse = el('g', { class: 'zk-achse', 'aria-hidden': 'true' }, svg);
    el('line', { x1: L, x2: W - R, y1: y(0), y2: y(0), class: 'zk-grundlinie' }, achse);
    var takt = pw < 320 ? 20 : 10;
    for (var a = Math.ceil(d.von / takt) * takt; a <= bis; a += takt) {
      el('text', { x: x(a), y: H - 8, 'text-anchor': 'middle' }, achse).textContent = a;
    }

    // Linien, je zusammenhängende Strecke besetzter Jahrfünfte eine
    reihen.forEach(function (r) {
      var g = el('g', { class: 'zk-reihe zk-' + r.id, 'aria-hidden': 'true' }, svg), pfad = '';
      for (var j = 0; j < d.n; j++) {
        if (r.p[j] == null) continue;
        pfad += (j > 0 && r.p[j - 1] != null ? 'L' : 'M') + xm(j).toFixed(1) + ' ' + y(r.p[j]).toFixed(1);
      }
      if (pfad) el('path', { d: pfad, class: 'zk-linie' }, g);
      for (var k = 0; k < d.n; k++) {
        if (r.p[k] != null) el('circle', { cx: xm(k), cy: y(r.p[k]), r: 4, class: 'zk-punkt' }, g);
      }
    });

    // Namen am Ende jeder Linie; liegen zwei zu dicht, rücken sie auseinander
    var marken = reihen.map(function (r) {
      for (var j = d.n - 1; j >= 0; j--) if (r.p[j] != null) return { r: r, x: xm(j), y: y(r.p[j]) };
      return null;
    }).filter(Boolean).sort(function (p, q) { return p.y - q.y; });
    for (var m = 1; m < marken.length; m++) {
      if (Math.abs(marken[m].x - marken[m - 1].x) < 60 && marken[m].y - marken[m - 1].y < 14) marken[m].y = marken[m - 1].y + 14;
    }
    marken.forEach(function (mk) {
      el('text', { x: mk.x + 9, y: mk.y + 4, class: 'zk-name' }, svg).textContent = mk.r.name;
    });

    // Einblendung: je Jahrfünft eine Spalte als Ziel für Zeiger und Tastatur
    var tip = html('div', 'zk-tip', null, fig);
    tip.hidden = true; tip.setAttribute('aria-live', 'polite');
    var faden = el('line', { class: 'zk-faden', y1: T, y2: T + ph, x1: 0, x2: 0, visibility: 'hidden' }, svg);
    function zeile(r, j) {
      if (!r.w[j]) return null;
      if (r.p[j] == null) return { r: r, text: 'too little text (' + zahl(r.w[j]) + ' words)' };
      return { r: r, wert: dichte(r.p[j]), text: zahl(r.n[j]) + ' in ' + zahl(r.w[j]) + ' words' };
    }
    function zeige(j) {
      var z = reihen.map(function (r) { return zeile(r, j); }).filter(Boolean);
      tip.textContent = '';
      html('div', 'zk-tip-kopf', jahrfuenft(d, j), tip);
      if (!z.length) html('div', 'zk-tip-leer', 'No dated writings', tip);
      z.forEach(function (e) {
        var row = html('div', 'zk-tip-zeile', null, tip);
        html('span', 'zk-feld zk-' + e.r.id, null, row).setAttribute('aria-hidden', 'true');
        html('span', 'zk-tip-name', e.r.name, row);
        if (e.wert != null) html('b', null, e.wert, row);
        html('span', 'zk-tip-text', e.text, row);
      });
      tip.hidden = false;
      faden.setAttribute('x1', xm(j)); faden.setAttribute('x2', xm(j)); faden.setAttribute('visibility', 'visible');
      // rechts neben dem Faden, am rechten Rand links davon; SVG kennt kein offsetTop, darum über die Rechtecke
      var rect = svg.getBoundingClientRect(), fr = fig.getBoundingClientRect(), f = rect.width / W;
      var links = rect.left - fr.left + xm(j) * f, breite = tip.offsetWidth;
      tip.style.left = (links + 12 + breite <= fr.width ? links + 12 : Math.max(0, links - 12 - breite)) + 'px';
      tip.style.top = (rect.top - fr.top + T * f) + 'px';
    }
    function verberge() { tip.hidden = true; faden.setAttribute('visibility', 'hidden'); }
    var ziele = el('g', { class: 'zk-ziele' }, svg);
    for (var s = 0; s < d.n; s++) {
      (function (j) {
        var t = el('rect', { x: x(d.von + j * d.schritt), y: T, width: pw / d.n, height: ph, tabindex: 0, role: 'img',
          'aria-label': jahrfuenft(d, j) + ': ' + reihen.map(function (r) {
            var e = zeile(r, j); return e ? r.name + ' ' + (e.wert != null ? e.wert + ' per 10,000 words, ' : '') + e.text : '';
          }).filter(Boolean).join('; ') }, ziele);
        t.addEventListener('mouseenter', function () { zeige(j); });
        t.addEventListener('focus', function () { zeige(j); });
        t.addEventListener('mouseleave', verberge);
        t.addEventListener('blur', verberge);
      })(s);
    }

    // Tabelle
    var det = html('details', 'zk-details', null, fig);
    html('summary', null, 'As a table', det);
    var tab = html('table', 'zk-tabelle', null, det);
    var kopf = html('tr', null, null, html('thead', null, null, tab));
    html('th', null, 'Years', kopf).setAttribute('scope', 'col');
    reihen.forEach(function (r) { html('th', null, r.name, kopf).setAttribute('scope', 'col'); });
    var rumpf = html('tbody', null, null, tab);
    for (var i = 0; i < d.n; i++) {
      if (!reihen.some(function (r) { return r.w[i]; })) continue;
      var tr = html('tr', null, null, rumpf);
      html('th', null, jahrfuenft(d, i), tr).setAttribute('scope', 'row');
      reihen.forEach(function (r) {
        html('td', null, !r.w[i] ? '' : r.p[i] == null ? '(' + zahl(r.n[i]) + ')' : dichte(r.p[i]) + ' (' + zahl(r.n[i]) + ')', tr);
      });
    }
    return true;
  }

  window.Zeitkurve = { zeichne: zeichne, dichte: dichte, zahl: zahl };
})();
