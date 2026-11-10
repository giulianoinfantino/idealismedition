/* Startseite des Portals: eine echte Begriffskurve aus den vorgerechneten Zeitreihen (assets/zeitreihen.json,
   werkzeug/analysen.mjs), gezeichnet von assets/zeitkurve.js wie auf der Seite „Analysen“. Das Wort steht im
   HTML (data-wort am Figure-Element); ohne Daten bleibt der Block leer und die Seite ist trotzdem vollständig.
   Keine Beschriftungen in diesem Skript: Text steht im HTML, damit die englische Seite dieselbe Datei nutzt. */
(function () {
  'use strict';
  var fig = document.getElementById('p-kurve'), block = fig && fig.closest('.p-kurve');
  function weg() { if (block) block.hidden = true; }
  if (!fig || !window.Zeitkurve) { weg(); return; }
  var wort = fig.getAttribute('data-wort') || 'Freiheit';
  var AUTOREN = ['fichte', 'schelling', 'hegel'];
  var NAME = { fichte: 'Fichte', schelling: 'Schelling', hegel: 'Hegel' };
  var ENDUNG = ['ern', 'en', 'er', 'es', 'e', 'n', 's'];
  function schluessel(w) {
    w = w.toLowerCase().replace(/ſ/g, 's');
    return window.HEGEL_ORTHO && window.HEGEL_ORTHO.normalize ? window.HEGEL_ORTHO.normalize(w) : w;
  }
  fetch('/assets/zeitreihen.json').then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); }).then(function (ZR) {
    var k = schluessel(wort);
    if (!ZR.reihen[k]) {
      for (var i = 0; i < ENDUNG.length && !ZR.reihen[k]; i++) {
        var e = ENDUNG[i], kurz = k.slice(0, -e.length);
        if (k.length - e.length >= 3 && k.slice(-e.length) === e && ZR.reihen[kurz]) k = kurz;
      }
    }
    var r = ZR.reihen[k];
    if (!r) { weg(); return; }
    var reihen = AUTOREN.map(function (a, i) {
      var n = []; for (var j = 0; j < ZR.n; j++) n.push(0);
      (r[i + 1] || '').split(',').filter(Boolean).forEach(function (t) { var p = t.split(':'); n[+p[0]] = +p[1]; });
      return { id: a, name: NAME[a], n: n, w: ZR.woerter[a] };
    });
    if (!window.Zeitkurve.zeichne(fig, { von: ZR.von, schritt: ZR.schritt, n: ZR.n, min: 20000, reihen: reihen })) weg();
  }).catch(weg);
})();
