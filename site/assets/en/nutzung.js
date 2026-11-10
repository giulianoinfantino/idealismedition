/* Nutzung der letzten 30 Tage: ein gestapeltes Saeulendiagramm, je Tag die
   Besucher der vier Seiten (Hegel, Fichte, Schelling, Portal), je Seite ein
   Segment; die Saeule ist die Summe. Daten von /api/nutzung, das auch die
   Reihen nennt. Der Abschnitt (#nutzung) bleibt verborgen, bis Daten da sind
   -- ohne Daten oder bei Fehlern erscheint er gar nicht (gleiches Muster wie
   download-counter.js: nie ein Leer- oder Fehlerzustand sichtbar).

   Gezeichnet wird in SVG ohne Bibliothek. Farben kommen aus style.css: die
   Autorenfarben der Edition (--autor-hegel, -fichte, -schelling) und eine
   neutrale Tinte fuer das Portal (--autor-portal), dort fuer hell und dunkel
   getrennt gegen den Untergrund gemessen. Jede Saeule traegt eine Einblendung
   bei Zeiger und Tastatur; dieselben Zahlen stehen darunter als Tabelle. */
(function () {
  var abschnitt = document.getElementById('nutzung');
  if (!abschnitt) return;

  var MONATE = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June', 'July', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];
  var SVGNS = 'http://www.w3.org/2000/svg';

  function zahl(n) { return Number(n).toLocaleString('en-US'); }
  function datum(tag) {
    var t = tag.split('-');
    return MONATE[Number(t[1]) - 1] + ' ' + Number(t[2]);
  }
  function datumLang(tag) {
    var d = new Date(tag + 'T00:00:00Z');
    var wt = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][d.getUTCDay()];
    return wt + ', ' + datum(tag) + ', ' + tag.slice(0, 4);
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
    var roh = max / 4, p = Math.pow(10, Math.floor(Math.log10(roh)));
    var f = roh / p;
    return (f <= 1 ? 1 : f <= 2 ? 2 : f <= 5 ? 5 : 10) * p;
  }

  function zeichnen(daten) {
    var tage = daten.tage;
    var reihen = (daten.reihen || []).map(function (r) {
      return { key: r.key, name: r.name, klasse: 'nutzung-' + r.key };
    });
    if (!reihen.length) return false;

    var summen = {};
    reihen.forEach(function (r) {
      summen[r.key] = tage.reduce(function (s, t) { return s + (t[r.key] || 0); }, 0);
    });
    var max = 0;
    tage.forEach(function (t) {
      var s = reihen.reduce(function (a, r) { return a + (t[r.key] || 0); }, 0);
      if (s > max) max = s;
    });
    if (max === 0) return false;

    /* Legende mit den Summen -- die Zahlen im Textton, die Farbe nur im Feld.
       Vorn die Summe aller Seiten. */
    var legende = abschnitt.querySelector('.nutzung-legende');
    var gesamt = html('li', 'nutzung-legende-eintrag nutzung-legende-gesamt', null, legende);
    html('span', 'nutzung-legende-name', 'Total', gesamt);
    html('span', 'nutzung-legende-summe', zahl(reihen.reduce(function (a, r) { return a + summen[r.key]; }, 0)), gesamt);
    reihen.forEach(function (r) {
      var li = html('li', 'nutzung-legende-eintrag', null, legende);
      html('span', 'nutzung-feld ' + r.klasse, null, li);
      html('span', 'nutzung-legende-name', r.name, li);
      html('span', 'nutzung-legende-summe', zahl(summen[r.key]), li);
    });

    /* Geometrie. Breite fest im viewBox, Hoehe knapp; skaliert per CSS. */
    var W = 720, H = 240, oben = 12, unten = 30, links = 40, rechts = 8;
    var plotB = W - links - rechts, plotH = H - oben - unten;
    var n = tage.length;
    var band = plotB / n;
    var dicke = Math.min(16, band - 4);
    var s = schritt(max);
    var yMax = Math.ceil(max / s) * s;
    var y = function (v) { return oben + plotH - (v / yMax) * plotH; };

    var svg = abschnitt.querySelector('.nutzung-svg');
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);

    /* Gitter und Achsenwerte. */
    var gitter = el('g', { 'class': 'nutzung-gitter' }, svg);
    for (var v = 0; v <= yMax; v += s) {
      el('line', { x1: links, x2: W - rechts, y1: y(v), y2: y(v) }, gitter);
      var tx = el('text', { x: links - 8, y: y(v) + 3.5, 'text-anchor': 'end' }, gitter);
      tx.textContent = zahl(v);
    }

    /* Saeulen: von unten gestapelt, 2 px Luft in Untergrundfarbe zwischen
       den Segmenten, oberstes Segment oben 3 px gerundet. */
    var saeulen = el('g', { 'class': 'nutzung-saeulen' }, svg);
    var achse = el('g', { 'class': 'nutzung-achse' }, svg);
    var ausgabe = abschnitt.querySelector('.nutzung-tip');
    var aktiv = null;

    function zeige(i, x) {
      var t = tage[i];
      ausgabe.textContent = '';
      html('div', 'nutzung-tip-datum', datumLang(t.tag), ausgabe);
      reihen.forEach(function (r) {
        var z = html('div', 'nutzung-tip-zeile', null, ausgabe);
        html('span', 'nutzung-strich ' + r.klasse, null, z);
        html('span', 'nutzung-tip-wert', zahl(t[r.key] || 0), z);
        html('span', 'nutzung-tip-name', r.name, z);
      });
      if (reihen.length > 1) {
        var g = html('div', 'nutzung-tip-zeile nutzung-tip-gesamt', null, ausgabe);
        html('span', 'nutzung-strich', null, g);
        html('span', 'nutzung-tip-wert', zahl(reihen.reduce(function (a, r) { return a + (t[r.key] || 0); }, 0)), g);
        html('span', 'nutzung-tip-name', 'total', g);
      }
      ausgabe.hidden = false;
      /* Lage: ueber der Saeule, in Prozent der Zeichenbreite, damit es beim
         Skalieren sitzen bleibt; an den Raendern nach innen geschoben. */
      var anteil = x / W;
      ausgabe.style.left = (anteil * 100) + '%';
      ausgabe.style.transform = 'translateX(' + (anteil < 0.15 ? '0' : anteil > 0.85 ? '-100%' : '-50%') + ')';
      if (aktiv) aktiv.classList.remove('ist-aktiv');
      aktiv = saeulen.children[i];
      aktiv.classList.add('ist-aktiv');
    }
    function verberge() {
      ausgabe.hidden = true;
      if (aktiv) aktiv.classList.remove('ist-aktiv');
      aktiv = null;
    }

    tage.forEach(function (t, i) {
      var x0 = links + i * band + (band - dicke) / 2;
      var g = el('g', { 'class': 'nutzung-tag', tabindex: '0', role: 'img' }, saeulen);
      var beschreibung = datumLang(t.tag) + ': ' + reihen.map(function (r) {
        return zahl(t[r.key] || 0) + ' ' + r.name;
      }).join(', ');
      el('title', {}, g).textContent = beschreibung;
      /* Trefferflaeche: die ganze Spalte, nicht nur die bemalten Punkte. */
      el('rect', { 'class': 'nutzung-treffer', x: links + i * band, y: oben, width: band, height: plotH }, g);
      var grund = 0;
      var oberes = null;
      reihen.forEach(function (r) {
        var w = t[r.key] || 0;
        if (!w) return;
        var y1 = y(grund + w), y0 = y(grund);
        var h = y0 - y1;
        var luft = grund > 0 ? 2 : 0;          /* Luft zum Segment darunter */
        var rect = el('rect', {
          'class': 'nutzung-segment ' + r.klasse,
          x: x0, y: y1, width: dicke, height: Math.max(0, h - luft)
        }, g);
        grund += w;
        oberes = rect;
      });
      if (oberes) oberes.setAttribute('rx', '3');
      /* Datumsmarke: heute, vor 7, 14, 21, 28 Tagen. */
      if ((n - 1 - i) % 7 === 0) {
        var tx = el('text', { x: x0 + dicke / 2, y: H - 10, 'text-anchor': 'middle' }, achse);
        tx.textContent = datum(t.tag);
      }
      g.addEventListener('pointerenter', function () { zeige(i, x0 + dicke / 2); });
      g.addEventListener('focus', function () { zeige(i, x0 + dicke / 2); });
      g.addEventListener('blur', verberge);
    });
    svg.addEventListener('pointerleave', verberge);
    el('line', { 'class': 'nutzung-grundlinie', x1: links, x2: W - rechts, y1: y(0), y2: y(0) }, achse);

    /* Tabelle: dieselben Zahlen ohne Zeiger erreichbar. */
    var tabelle = abschnitt.querySelector('.nutzung-tabelle tbody');
    var kopf = abschnitt.querySelector('.nutzung-tabelle thead tr');
    reihen.forEach(function (r) { html('th', null, r.name, kopf); });
    if (reihen.length > 1) html('th', null, 'Total', kopf);
    tage.slice().reverse().forEach(function (t) {
      var tr = html('tr', null, null, tabelle);
      html('th', null, datum(t.tag) + ', ' + t.tag.slice(0, 4), tr);
      var summe = 0;
      reihen.forEach(function (r) { summe += t[r.key] || 0; html('td', null, zahl(t[r.key] || 0), tr); });
      if (reihen.length > 1) html('td', null, zahl(summe), tr);
    });
    return true;
  }

  fetch('/api/nutzung')
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (daten) {
      if (!daten || !daten.available || !daten.tage || !daten.tage.length) return;
      if (zeichnen(daten)) abschnitt.hidden = false;
    })
    .catch(function () {});
})();
