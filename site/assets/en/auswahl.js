/* Auswahlfelder in der Gestalt der Seite — auch aufgeklappt.
   Jedes <select> (ohne data-nativ) wird in Knopf + Liste umgebaut; das native
   Feld bleibt unsichtbar als Zustandstraeger im Dokument: .value, change-
   Ereignisse, Formularversand und Pflichtfeld-Pruefung arbeiten unveraendert.
   Es ist nur fast unsichtbar (nicht display:none), damit der Browser eine
   Pflichtfeld-Meldung daran verankern kann. */
(function () {
  var schliesser = [];
  function schliesseAlle() { schliesser.forEach(function (zu) { zu(); }); }
  // Ein Klick auf die eigene Rollleiste liegt geometrisch im Feld, aber nicht
  // in seinem Inhalt — `contains` sagt dann nein, und die Liste schloss beim
  // Versuch zu rollen. Darum die Position nachmessen.
  document.addEventListener('click', function (e) {
    var offen = document.querySelector('.mehrwahl-liste:not([hidden])');
    if (offen) {
      if (offen.contains(e.target)) return;
      var r = offen.getBoundingClientRect();
      if (e.clientX >= r.left && e.clientX <= r.right &&
          e.clientY >= r.top && e.clientY <= r.bottom) return;
    }
    schliesseAlle();
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') schliesseAlle(); });

  function baue(sel) {
    var huelle = document.createElement('div');
    huelle.className = 'auswahl';
    sel.parentNode.insertBefore(huelle, sel);
    huelle.appendChild(sel);
    sel.classList.add('auswahl-quelle');
    sel.tabIndex = -1;

    var knopf = document.createElement('button');
    knopf.type = 'button';
    knopf.className = 'werkwahl-knopf auswahl-knopf';
    knopf.setAttribute('aria-haspopup', 'listbox');
    knopf.setAttribute('aria-expanded', 'false');
    if (sel.getAttribute('aria-label')) knopf.setAttribute('aria-label', sel.getAttribute('aria-label'));

    var liste = document.createElement('div');
    liste.className = 'auswahl-liste';
    liste.hidden = true;
    liste.setAttribute('role', 'listbox');

    function beschriftung() {
      var o = sel.options[sel.selectedIndex];
      return o ? o.textContent : '';
    }
    function auf() { liste.hidden = false; knopf.setAttribute('aria-expanded', 'true'); }
    function zu() { liste.hidden = true; knopf.setAttribute('aria-expanded', 'false'); }
    schliesser.push(zu);

    function malListe() {
      liste.innerHTML = '';
      [].forEach.call(sel.options, function (o, i) {
        var p = document.createElement('button');
        p.type = 'button';
        p.setAttribute('role', 'option');
        p.className = 'auswahl-punkt' + (i === sel.selectedIndex ? ' ist-gewaehlt' : '');
        p.setAttribute('aria-selected', i === sel.selectedIndex ? 'true' : 'false');
        p.textContent = o.textContent;
        p.onclick = function (ev) {
          ev.stopPropagation();
          sel.selectedIndex = i;
          sel.dispatchEvent(new Event('change', { bubbles: true }));
          zu();
        };
        liste.appendChild(p);
      });
    }

    knopf.onclick = function (ev) {
      ev.stopPropagation();
      if (liste.hidden) { schliesseAlle(); auf(); } else { zu(); }
    };
    // Pfeiltasten: vom Knopf in die Liste, in der Liste auf und ab.
    knopf.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
      e.preventDefault();
      schliesseAlle(); auf();
      var p = liste.querySelectorAll('.auswahl-punkt');
      if (p.length) (e.key === 'ArrowDown' ? p[0] : p[p.length - 1]).focus();
    });
    liste.addEventListener('keydown', function (e) {
      var p = [].slice.call(liste.querySelectorAll('.auswahl-punkt'));
      var i = p.indexOf(document.activeElement);
      if (e.key === 'ArrowDown') { e.preventDefault(); p[Math.min(i + 1, p.length - 1)].focus(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); p[Math.max(i - 1, 0)].focus(); }
      else if (e.key === 'Home') { e.preventDefault(); p[0].focus(); }
      else if (e.key === 'End') { e.preventDefault(); p[p.length - 1].focus(); }
      else if (e.key === 'Escape') { zu(); knopf.focus(); }
    });
    sel.addEventListener('change', function () { knopf.textContent = beschriftung(); malListe(); });

    knopf.textContent = beschriftung();
    malListe();
    huelle.appendChild(knopf);
    huelle.appendChild(liste);
  }

  function start() {
    [].forEach.call(document.querySelectorAll('select:not([data-nativ])'), baue);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
