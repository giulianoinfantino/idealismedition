/* Recherche des Portals: Querverweise zwischen den drei Editionen, gezeichnet auf der Suchseite.
 * Die Seite (recherche.html) reicht ihre Hilfsmittel als window.QuerCtx herein: esc, zahl, leserLink, edName,
 * sucheMit(anfrage, edition), sucheInBand(werk). Gerechnet wird im Worker (recherche-portal-worker.js). */
(function () {
  'use strict';
  var NAME = { fichte: 'Fichte', schelling: 'Schelling', hegel: 'Hegel' };
  var AUSGABE = { fichte: 'Sämmtliche und Nachgelassene Werke', schelling: 'Sämmtliche Werke', hegel: 'Gesammelte Werke' };
  function C() { return window.QuerCtx; }
  function komma(v) { return (v >= 10 ? v.toFixed(0) : v >= 1 ? v.toFixed(1) : v.toFixed(2)).replace('.', ','); }

  // ── Vergleich: die drei Editionen nebeneinander ──
  function vergleich(m, ziel) {
    var c = C(), esc = c.esc, zahl = c.zahl;
    var max = Math.max.apply(null, m.editionen.map(function (e) { return e.dichte; }).concat([0.0001]));
    ziel.innerHTML = '<div class="qv-kopf"><p>Wie oft und in welchem Umfeld die drei das Gesuchte gebrauchen. Die Häufigkeit ist an der Länge jeder Edition gemessen; das Begriffsumfeld sind die Wörter, die in der Nähe der Stellen deutlich öfter stehen als sonst bei diesem Autor.</p></div>' +
      '<div class="qv">' + m.editionen.map(function (e) {
        var leer = !e.stellen;
        return '<section class="qv-spalte' + (leer ? ' qv-leer' : '') + '">' +
          '<header><h3>' + NAME[e.ed] + '</h3><p>' + esc(AUSGABE[e.ed]) + '</p></header>' +
          '<div class="qv-zahl"><b>' + zahl(e.vorkommen) + '</b><span>' + (e.vorkommen === 1 ? 'Vorkommen' : 'Vorkommen') + ' auf ' + zahl(e.stellen) + ' ' + (e.stellen === 1 ? 'Stelle' : 'Stellen') + '</span></div>' +
          '<div class="qv-dichte" title="je 10 000 Wörter"><i style="width:' + (e.dichte / max * 100).toFixed(1) + '%"></i></div>' +
          '<p class="qv-dichte-zahl">' + komma(e.dichte) + ' je 10 000 Wörter</p>' +
          (leer ? '<p class="qv-nichts">Keine Stelle.</p>' :
          '<h4>Wo am häufigsten</h4><ol class="qv-baende">' + e.baende.map(function (b) {
            return '<li><button type="button" data-qv-band="' + esc(b.work) + '"><span class="s">' + esc(b.sig) + '</span><span class="t">' + esc(b.title) + '</span><span class="n">' + zahl(b.n) + '</span></button></li>';
          }).join('') + '</ol>' +
          (e.umfeld.length ? '<h4>Begriffsumfeld</h4><p class="qv-umfeld">' + e.umfeld.map(function (u) {
            return '<button type="button" data-qv-nah="' + esc(u.wort) + '" data-qv-ed="' + e.ed + '" title="' + zahl(u.n) + '-mal in der Nähe, ' + komma(u.faktor) + '-mal so oft wie sonst">' + esc(u.wort) + '</button>';
          }).join('') + '</p>' : '') +
          '<h4>Dichteste Stellen</h4>' + e.beste.map(function (s) {
            return '<div class="qv-stelle"><a href="' + esc(c.leserLink(s, true)) + '">' + esc(s.zitat) + '</a><p>' + s.html + '</p></div>';
          }).join('')) +
          '</section>';
      }).join('') + '</div>';
  }

  // ── Parallelstellen unter einer Stelle ──
  function parallel(m, ergebnis) {
    var c = C(), esc = c.esc;
    var art = ergebnis.querySelector('.rch-stelle[data-i="' + m.i + '"]');
    if (!art) return;
    var alt = art.querySelector('.qp');
    if (alt) alt.remove();
    var knopf = art.querySelector('[data-parallel]');
    if (knopf) { knopf.disabled = false; knopf.textContent = 'Parallelstellen ausblenden'; knopf.dataset.offen = '1'; }
    var gruppen = ['fichte', 'schelling', 'hegel'].map(function (ed) {
      var l = m.liste.filter(function (x) { return x.ed === ed; });
      return '<div class="qp-gruppe"><h4>' + NAME[ed] + '</h4>' + (l.length ? l.map(function (x) {
        return '<div class="qp-stelle"><a href="' + esc(c.leserLink(x, true)) + '">' + esc(x.zitat) + '</a> <span class="qp-titel">' + esc(x.title) + '</span>' +
          '<p>' + x.html + '</p><p class="qp-woerter">gemeinsam: ' + x.woerter.map(esc).join(', ') + '</p></div>';
      }).join('') : '<p class="qp-nichts">Keine ähnliche Stelle.</p>') + '</div>';
    }).join('');
    var div = document.createElement('div');
    div.className = 'qp';
    div.innerHTML = '<p class="qp-kopf">Parallelstellen, gefunden über die seltenen Begriffe dieser Stelle: <i>' + m.begriffe.map(esc).join(', ') + '</i></p>' + gruppen;
    art.appendChild(div);
  }

  // ── Wer nennt wen, gemeinsame Gewaehrsleute ──
  function bezuege(m) {
    var c = C(), feld = document.getElementById('qb');
    if (!feld || !c) return;
    var d = m.daten, zahl = c.zahl;
    function zelle(n, anfrage, ed, gleich) {
      if (gleich) return '<td class="qb-gleich" aria-label="dieselbe Edition">—</td>';
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
      '<p class="qb-unter">Wie oft einer den anderen beim Namen nennt, und wen alle drei anführen. Eine Zahl öffnet die Stellen.</p>' +
      '<div class="qb-tafeln"><table class="qb"><caption>Wer nennt wen</caption><thead>' + kopf + '</thead><tbody>' + namen + '</tbody></table>' +
      '<table class="qb"><caption>Gemeinsame Gewährsleute</caption><thead>' + kopf + '</thead><tbody>' + zeugen + '</tbody></table></div>';
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
  });

  window.Quer = { vergleich: vergleich, parallel: parallel, bezuege: bezuege };
})();
