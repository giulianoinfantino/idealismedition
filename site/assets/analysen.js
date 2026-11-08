/* Seite „Analysen“: Begriffsgeschichte, kennzeichnender Wortschatz, Hervorhebungen.
   Daten von werkzeug/analysen.mjs: assets/analysen.json (Wortschatz, Hervorhebungen) und
   assets/zeitreihen.json (Vorkommen je Jahrfünft und Autor, für Wörter ab 50 Vorkommen).
   Die Kurve zeichnet assets/zeitkurve.js; seltene Wörter und Wortfolgen zählt die Recherche. */
(function () {
  'use strict';
  var EN = document.documentElement.lang === 'en';
  var LOC = EN ? 'en-US' : 'de-DE';
  var SUCHE = EN ? '/search' : '/de/search';
  var AUTOREN = ['fichte', 'schelling', 'hegel'];
  var NAME = { fichte: 'Fichte', schelling: 'Schelling', hegel: 'Hegel' };
  var MIN_WOERTER = 20000;          // weniger Text in einem Jahrfünft trägt keinen Punkt
  var $ = function (id) { return document.getElementById(id); };
  function zahl(n) { return Number(n).toLocaleString(LOC); }
  function komma(v, s) { return v.toLocaleString(LOC, { minimumFractionDigits: s, maximumFractionDigits: s }); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  // Wortschlüssel wie in werkzeug/analysen.mjs: Schreibungsausgleich der Recherche, ſ als s
  function schluessel(w) { return window.HEGEL_ORTHO.normalize(w.toLowerCase().replace(/ſ/g, 's')); }
  var ENDUNG = ['ern', 'en', 'er', 'es', 'e', 'n', 's'];

  // ── Begriffsgeschichte ──────────────────────────────────────────────
  var ZR = null, zrLadung = null;
  function ladeZeit() {
    if (!zrLadung) zrLadung = fetch('/assets/zeitreihen.json').then(function (r) {
      if (!r.ok) throw new Error(r.status); return r.json();
    }).then(function (d) { ZR = d; });
    return zrLadung;
  }
  function finde(wort) {
    var k = schluessel(wort);
    if (ZR.reihen[k]) return k;
    for (var i = 0; i < ENDUNG.length; i++) {
      var e = ENDUNG[i];
      if (k.length - e.length >= 3 && k.slice(-e.length) === e && ZR.reihen[k.slice(0, -e.length)]) return k.slice(0, -e.length);
    }
    return null;
  }
  function zeigeWort(wort, merken) {
    wort = (wort || '').trim();
    if (!wort) return;
    $('an-wort').value = wort;
    var link = SUCHE + '?q=' + encodeURIComponent(wort) + '&ansicht=zeit';
    $('an-recherche').href = link;
    if (merken) history.replaceState(null, '', location.pathname + '?wort=' + encodeURIComponent(wort) + '#begriffsgeschichte');
    ladeZeit().then(function () {
      var k = finde(wort), fig = $('an-kurve'), hinweis = $('an-kurve-hinweis');
      hinweis.hidden = true;
      if (!k) {
        fig.textContent = '';
        hinweis.innerHTML = 'Für dieses Wort gibt es keine vorgerechnete Kurve: Es steht seltener als 50-mal im Bestand oder gar nicht. Die Recherche zählt jede Anfrage. <a href="' + esc(link) + '">In der Recherche zeigen</a>';
        hinweis.hidden = false;
        return;
      }
      var r = ZR.reihen[k];
      var reihen = AUTOREN.map(function (a, i) {
        var n = []; for (var j = 0; j < ZR.n; j++) n.push(0);
        (r[i + 1] || '').split(',').filter(Boolean).forEach(function (t) { var p = t.split(':'); n[+p[0]] = +p[1]; });
        return { id: a, name: NAME[a], n: n, w: ZR.woerter[a] };
      });
      $('an-kurve-wort').textContent = r[0];
      if (!Zeitkurve.zeichne(fig, { von: ZR.von, schritt: ZR.schritt, n: ZR.n, min: MIN_WOERTER, reihen: reihen })) {
        hinweis.textContent = 'Das Wort steht nur in Schriften ohne sichere Datierung.';
        hinweis.hidden = false;
      }
    }).catch(function () {
      $('an-kurve-hinweis').textContent = 'Die Zeitreihen konnten nicht geladen werden.';
      $('an-kurve-hinweis').hidden = false;
    });
  }
  $('an-form').addEventListener('submit', function (e) { e.preventDefault(); zeigeWort($('an-wort').value, true); });
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-wort]');
    if (!b) return;
    e.preventDefault();
    zeigeWort(b.dataset.wort, true);
    if (!b.closest('#begriffsgeschichte')) $('begriffsgeschichte').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // ── Wortschatz und Hervorhebungen ───────────────────────────────────
  var A = null;
  function wortschatz(art) {
    document.querySelectorAll('.an-umschalter button').forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.art === art ? 'true' : 'false'); });
    $('an-vokabular').innerHTML = AUTOREN.map(function (a) {
      var liste = A.vokabular[a][art].slice(0, 20);
      var max = Math.max.apply(null, liste.map(function (x) { return x.je10k; }).concat([0.01]));
      return '<section class="an-spalte"><h3>' + NAME[a] + '</h3><ol class="an-liste">' + liste.map(function (x) {
        var anderen = AUTOREN.filter(function (o) { return o !== a; });
        var titel = NAME[a] + ' ' + komma(x.je10k, 1) + ', ' + anderen.map(function (o) { return NAME[o] + ' ' + komma(x.bei[o], 1); }).join(', ');
        var faktor = x.rest10k ? x.je10k / x.rest10k : 0;
        return '<li><button type="button" class="an-wort" data-wort="' + esc(x.wort) + '" title="' + esc(titel) + '">' + esc(x.wort) + '</button>' +
          '<span class="an-balken" aria-hidden="true"><i class="zk-feld zk-' + a + '" style="width:' + (x.je10k / max * 100).toFixed(1) + '%"></i>' +
          '<b style="left:' + Math.min(100, x.rest10k / max * 100).toFixed(1) + '%"></b></span>' +
          '<span class="an-zahl">' + (faktor ? (faktor >= 10 ? komma(faktor, 0) : komma(faktor, 1)) + '×' : 'nur hier') + '</span></li>';
      }).join('') + '</ol></section>';
    }).join('');
  }
  function hervorhebungen() {
    var H = A.hervorhebungen;
    $('an-hv-zahlen').innerHTML = AUTOREN.map(function (a) {
      return '<div class="an-kachel"><span class="an-kachel-name">' + NAME[a] + '</span><b>' + komma(H[a].anteil * 100, 1) + '&#8239;%</b>' +
        '<span class="an-leise">eines von ' + zahl(Math.round(1 / H[a].anteil)) + ' Wörtern</span></div>';
    }).join('');
    $('an-hv-listen').innerHTML = AUTOREN.map(function (a) {
      return '<section class="an-spalte"><h3>' + NAME[a] + '</h3>' +
        '<h4>Am häufigsten hervorgehoben</h4><ol class="an-hv">' + H[a].haeufig.slice(0, 12).map(function (x) {
          return '<li><button type="button" class="an-wort" data-wort="' + esc(x.wort) + '">' + esc(x.wort) + '</button><span class="an-zahl">' + zahl(x.n) + '</span></li>';
        }).join('') + '</ol>' +
        '<h4>Fast immer hervorgehoben</h4><ol class="an-hv">' + H[a].verlaesslich.slice(0, 8).map(function (x) {
          return '<li><button type="button" class="an-wort" data-wort="' + esc(x.wort) + '" title="' + zahl(x.n) + ' von ' + zahl(x.gesamt) + '">' + esc(x.wort) + '</button><span class="an-zahl">' + komma(x.anteil * 100, 0) + '&#8239;%</span></li>';
        }).join('') + '</ol></section>';
    }).join('');
  }
  document.querySelectorAll('.an-umschalter button').forEach(function (b) {
    b.addEventListener('click', function () { wortschatz(b.dataset.art); });
  });

  fetch('/assets/analysen.json').then(function (r) { return r.json(); }).then(function (d) {
    A = d;
    wortschatz('begriffe');
    hervorhebungen();
    var st = $('an-stand');
    if (st) st.textContent = new Date(d.stand + 'T00:00:00Z').toLocaleDateString(LOC, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
  });
  var p = new URLSearchParams(location.search);
  zeigeWort(p.get('wort') || 'Freiheit', false);
})();
