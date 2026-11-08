/* Recherche des Portals: Querverweise zwischen den drei Editionen, gezeichnet auf der Suchseite.
 * Die Seite (search.html) reicht ihre Hilfsmittel als window.QuerCtx herein: esc, zahl, leserLink, edName,
 * sucheMit(anfrage, edition), sucheInBand(werk), sucheInWerk(werk, von, bis). Die Zeitkurve zeichnet zeitkurve.js. Gerechnet wird im Worker (recherche-portal-worker.js). */
(function () {
  'use strict';
  var NAME = { fichte: 'Fichte', schelling: 'Schelling', hegel: 'Hegel' };
  var AUSGABE = { fichte: 'Sämmtliche Werke and Nachgelassene Werke', schelling: 'Sämmtliche Werke', hegel: 'Gesammelte Werke' };
  function C() { return window.QuerCtx; }
  function komma(v) { return (v >= 10 ? v.toFixed(0) : v >= 1 ? v.toFixed(1) : v.toFixed(2)); }

  // ── Vergleich: die drei Editionen nebeneinander ──
  function vergleich(m, ziel) {
    var c = C(), esc = c.esc, zahl = c.zahl;
    var max = Math.max.apply(null, m.editionen.map(function (e) { return e.dichte; }).concat([0.0001]));
    ziel.innerHTML = '<div class="qv-kopf"><p>How often, and in what surroundings, the three use the search term. Frequency is measured against the length of each edition; the conceptual neighborhood consists of the words that occur markedly more often near the passages than elsewhere in this author.</p></div>' +
      '<div class="qv">' + m.editionen.map(function (e) {
        var leer = !e.stellen;
        return '<section class="qv-spalte' + (leer ? ' qv-leer' : '') + '">' +
          '<header><h3>' + NAME[e.ed] + '</h3><p>' + esc(AUSGABE[e.ed]) + '</p></header>' +
          '<div class="qv-zahl"><b>' + zahl(e.vorkommen) + '</b><span>' + (e.vorkommen === 1 ? 'occurrence' : 'occurrences') + ' on ' + zahl(e.stellen) + ' ' + (e.stellen === 1 ? 'passage' : 'passages') + '</span></div>' +
          '<div class="qv-dichte" title="per 10,000 words"><i style="width:' + (e.dichte / max * 100).toFixed(1) + '%"></i></div>' +
          '<p class="qv-dichte-zahl">' + komma(e.dichte) + ' per 10,000 words</p>' +
          (leer ? '<p class="qv-nichts">No passages.</p>' :
          '<h4>Where most frequent</h4><ol class="qv-baende">' + e.baende.map(function (b) {
            return '<li><button type="button" data-qv-band="' + esc(b.work) + '"><span class="s">' + esc(b.sig) + '</span><span class="t">' + esc(b.title) + '</span><span class="n">' + zahl(b.n) + '</span></button></li>';
          }).join('') + '</ol>' +
          (e.umfeld.length ? '<h4>Begriffsumfeld</h4><p class="qv-umfeld">' + e.umfeld.map(function (u) {
            return '<button type="button" data-qv-nah="' + esc(u.wort) + '" data-qv-ed="' + e.ed + '" title="' + zahl(u.n) + '× nearby, ' + komma(u.faktor) + '× as often as usual">' + esc(u.wort) + '</button>';
          }).join('') + '</p>' : '') +
          '<h4>Densest passages</h4>' + e.beste.map(function (s) {
            return '<div class="qv-stelle"><a href="' + esc(c.leserLink(s, true)) + '">' + esc(s.zitat) + '</a><p>' + s.html + '</p></div>';
          }).join('')) +
          '</section>';
      }).join('') + '</div>';
  }

  // ── Zeit: die Stellen über die Jahre, je Jahrfünft und Autor, darunter die Werke ──
  var GATTUNG = { d: 'Published work', v: 'Lecture', n: 'Manuscript', e: 'Excerpt' };
  var EDS = ['fichte', 'schelling', 'hegel'];
  function zeit(m, ziel) {
    var c = C(), esc = c.esc, zahl = c.zahl;
    var VON = 1785, SCHRITT = 5, NJ = 14, MIN = 20000;
    var reihen = EDS.map(function (ed) {
      var n = [], w = [];
      for (var j = 0; j < NJ; j++) { n.push(0); w.push(0); }
      return { id: ed, name: NAME[ed], n: n, w: w };
    });
    m.werke.forEach(function (x) {
      if (x.gattung === 'e' || x.jahr == null) return;   // Exzerpte geben fremde Texte wieder
      var j = Math.floor((x.jahr - VON) / SCHRITT), r = reihen[EDS.indexOf(x.ed)];
      if (!r || j < 0 || j >= NJ) return;
      r.n[j] += x.n; r.w[j] += x.woerter;
    });
    var liste = m.werke.filter(function (x) { return x.n; }).sort(function (a, b) {
      return (a.jahr == null ? 9999 : a.jahr) - (b.jahr == null ? 9999 : b.jahr) || EDS.indexOf(a.ed) - EDS.indexOf(b.ed);
    });
    ziel.innerHTML = '<div class="qv-kopf"><p>The passages by the year of the writings, per 10,000 words of each five-year period: for published works the year of publication, for lectures the year they were given, for manuscripts the year of writing. Excerpts are not counted in the chart.</p></div>' +
      '<figure class="zk qz-kurve" id="qz-kurve"></figure>' +
      '<h3 class="qz-titel">The works</h3>' +
      '<table class="qz-werke"><thead><tr><th scope="col">Year</th><th scope="col">Work</th><th scope="col">Genre</th>' +
      '<th scope="col" class="z">Occurrences</th><th scope="col" class="z">per 10,000 words</th></tr></thead><tbody>' +
      liste.map(function (x) {
        var d = x.woerter ? x.n / x.woerter * 1e4 : 0;
        return '<tr><td class="j">' + (x.jahr == null ? '–' : x.jahr) + '</td>' +
          '<td><button type="button" class="qz-werk" data-qz-werk="' + esc(x.work) + '"' + (x.von != null ? ' data-von="' + x.von + '" data-bis="' + x.bis + '"' : '') + '>' +
          '<span class="zk-feld zk-' + x.ed + '" aria-hidden="true"></span><span class="s">' + esc(NAME[x.ed]) + ', ' + esc(x.sig) + '</span> <span class="t">' + esc(x.titel) + '</span></button></td>' +
          '<td class="g">' + esc(GATTUNG[x.gattung] || '') + '</td><td class="z">' + zahl(x.n) + '</td><td class="z">' + Zeitkurve.dichte(d) + '</td></tr>';
      }).join('') + '</tbody></table>';
    var fig = document.getElementById('qz-kurve');
    if (!Zeitkurve.zeichne(fig, { von: VON, schritt: SCHRITT, n: NJ, min: MIN, reihen: reihen })) {
      fig.outerHTML = '<p class="qv-nichts">No passage in dated writings.</p>';
    }
  }

  // ── Parallelstellen unter einer Stelle ──
  function parallel(m, ergebnis) {
    var c = C(), esc = c.esc;
    var art = ergebnis.querySelector('.rch-stelle[data-i="' + m.i + '"]');
    if (!art) return;
    var alt = art.querySelector('.qp');
    if (alt) alt.remove();
    var knopf = art.querySelector('[data-parallel]');
    if (knopf) { knopf.disabled = false; knopf.textContent = 'Hide parallel passages'; knopf.dataset.offen = '1'; }
    var gruppen = ['fichte', 'schelling', 'hegel'].map(function (ed) {
      var l = m.liste.filter(function (x) { return x.ed === ed; });
      return '<div class="qp-gruppe"><h4>' + NAME[ed] + '</h4>' + (l.length ? l.map(function (x) {
        return '<div class="qp-stelle"><a href="' + esc(c.leserLink(x, true)) + '">' + esc(x.zitat) + '</a> <span class="qp-titel">' + esc(x.title) + '</span>' +
          '<p>' + x.html + '</p><p class="qp-woerter">gemeinsam: ' + x.woerter.map(esc).join(', ') + '</p></div>';
      }).join('') : '<p class="qp-nichts">No similar passage.</p>') + '</div>';
    }).join('');
    var div = document.createElement('div');
    div.className = 'qp';
    div.innerHTML = '<p class="qp-kopf">Parallel passages, found through the rare terms of this passage: <i>' + m.begriffe.map(esc).join(', ') + '</i></p>' + gruppen;
    art.appendChild(div);
  }

  // ── Wer nennt wen, gemeinsame Gewaehrsleute ──
  function bezuege(m) {
    var c = C(), feld = document.getElementById('qb');
    if (!feld || !c) return;
    var d = m.daten, zahl = c.zahl;
    function zelle(n, anfrage, ed, gleich) {
      if (gleich) return '<td class="qb-gleich" aria-label="same edition">—</td>';
      return '<td>' + (n ? '<button type="button" data-qb-q="' + anfrage + '" data-qb-ed="' + ed + '">' + zahl(n) + '</button>' : '<span class="qb-null">0</span>') + '</td>';
    }
    var kopf = '<tr><th></th>' + d.editionen.map(function (ed) { return '<th scope="col">bei ' + NAME[ed] + '</th>'; }).join('') + '</tr>';
    var namen = d.namen.map(function (n) {
      return '<tr><th scope="row">' + n.name + '</th>' + n.je.map(function (x, j) { return zelle(x, n.name + '*', d.editionen[j], n.id === d.editionen[j]); }).join('') + '</tr>';
    }).join('');
    var zeugen = d.zeugen.map(function (n) {
      return '<tr><th scope="row">' + n.name + '</th>' + n.je.map(function (x, j) { return zelle(x, n.name + '*', d.editionen[j], false); }).join('') + '</tr>';
    }).join('');
    feld.innerHTML = '<h2>Querverweise</h2>' +
      '<p class="qb-unter">How often each one names the others, and whom all three cite. A number opens the passages.</p>' +
      '<div class="qb-tafeln"><table class="qb"><caption>Wer nennt wen</caption><thead>' + kopf + '</thead><tbody>' + namen + '</tbody></table>' +
      '<table class="qb"><caption>Shared authorities cited</caption><thead>' + kopf + '</thead><tbody>' + zeugen + '</tbody></table></div>';
    feld.hidden = false;
  }

  // Klicks: Bezug, Band, Umfeldwort
  document.addEventListener('click', function (e) {
    var c = C();
    if (!c) return;
    var b = e.target.closest('[data-qb-q]');
    if (b) { e.preventDefault(); c.sucheMit(b.dataset.qbQ, b.dataset.qbEd); return; }
    var bd = e.target.closest('[data-qv-band]');
    if (bd) { e.preventDefault(); c.sucheInBand(bd.dataset.qvBand); return; }
    var n = e.target.closest('[data-qv-nah]');
    if (n) { e.preventDefault(); c.sucheNah(n.dataset.qvNah, n.dataset.qvEd); return; }
    var zw = e.target.closest('[data-qz-werk]');
    if (zw) { e.preventDefault(); c.sucheInWerk(zw.dataset.qzWerk, zw.dataset.von ? +zw.dataset.von : null, zw.dataset.bis ? +zw.dataset.bis : null); return; }
  });

  window.Quer = { vergleich: vergleich, parallel: parallel, bezuege: bezuege, zeit: zeit };
})();
