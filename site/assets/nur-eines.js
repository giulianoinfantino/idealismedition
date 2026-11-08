/* Nur ein ausgeklapptes Feld auf einmal.
 *
 * Werkzeugleiste, Bandwahl, Syntaxhilfe, Werkfilter: jedes dieser Felder
 * schloss sich beim Klick ins Leere, aber keines wusste vom anderen. Wer das
 * Zahnrad oeffnete, waehrend die Bandwahl offen stand, hatte zwei Felder
 * uebereinander — und musste eines davon von Hand wegklicken.
 *
 * Diese Datei loest das an einer Stelle statt in jedem Oeffner. Wer ein Feld
 * aufklappt, ruft `nurEines(feld)` und schliesst damit alles andere.
 *
 * ## Warum eine Liste von Auswahlen und kein Merkregister
 *
 * Die Felder werden an verschiedenen Stellen und zu verschiedenen Zeiten
 * gebaut — manche erst beim ersten Klick. Ein Register, in das sich jedes
 * eintraegt, waere die sauberere Bauweise, verlangt aber, dass jeder Oeffner
 * daran denkt. Eine Auswahlliste findet auch, was jemand spaeter hinzufuegt,
 * solange es dieselben Klassen traegt.
 *
 * ## Was beim Schliessen zurueckgesetzt wird
 *
 * Nicht nur `hidden`. Der Knopf, der das Feld aufklappt, traegt
 * `aria-expanded` — bleibt das auf `true` stehen, meldet ein Screenreader ein
 * offenes Feld, das nicht mehr da ist. Und der Werkfilter der Suchseite hebt
 * beim Oeffnen ein `overflow:hidden` seines Umfelds auf; auch das muss
 * zurueck.
 */
(function () {
  'use strict';

  /* Feld und der Knopf, der es aufklappt. Die Felder tragen keine
     `aria-controls`-Verbindung — sie werden im Skript gebaut, nicht im
     Blatt —, darum steht die Zuordnung hier ausdruecklich. Was es auf einer
     Seite nicht gibt, wird uebersprungen. */
  var PAARE = [
    ['.werkwahl-liste',      'werkwahl-knopf'],
    ['.einstellungen-panel', 'einstellungen-knopf'],
    ['.syntax-panel',        'search-syntax-knopf'],
    ['#syntax-panel',        'search-syntax-knopf'],
    ['#filter-work-liste',   'filter-work-btn'],
    ['.mehrwahl-liste',      null],
    ['.auswahl-liste',       null],
  ];

  function schliesse(el, knopfId) {
    if (!el || el.hidden) return;
    el.hidden = true;
    if (knopfId) {
      var k = document.getElementById(knopfId);
      if (k) k.setAttribute('aria-expanded', 'false');
    }
    // Der Werkfilter der Suchseite hebt beim Oeffnen das `overflow:hidden`
    // seines Umfelds auf, sonst schneidet der Aufmacher die Liste ab.
    if (el.id === 'filter-work-liste') {
      var bereich = document.querySelector('.search-hero-area');
      if (bereich) bereich.classList.remove('feld-offen');
    }
  }

  /** Alles zuklappen ausser `ausser`. */
  window.nurEines = function (ausser) {
    PAARE.forEach(function (paar) {
      document.querySelectorAll(paar[0]).forEach(function (el) {
        if (el !== ausser) schliesse(el, paar[1]);
      });
    });
  };
})();
