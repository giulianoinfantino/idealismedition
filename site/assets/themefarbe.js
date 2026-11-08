/* Darstellung: dunkel, hell oder nach Systemvorgabe.
 *
 * Der Hellmodus war einmal da und wurde entfernt. Diese Fassung ist nicht die
 * alte: sie ist **durchgerechnet**. Jede Farbe wurde gegen ihren Untergrund
 * nach WCAG gemessen, statt nach Augenmass gewaehlt:
 *
 *     Fliesstext   12,33 : 1   AAA
 *     gedaempft     5,42 : 1   AA
 *     Akzent (rot)  6,17 : 1   AA
 *     Gold/Bronze   5,41 : 1   AA
 *
 * Das Papier ist warm (#faf6ec), nicht weiss. Auf Weiss laege der Fliesstext
 * bei 13,31 : 1 — rechnerisch besser, aber fuer laengeres Lesen greller, und
 * die Serifenschrift dieser Edition steht auf getoentem Grund ruhiger.
 *
 * ## Warum das Skript im `head` steht und nicht `defer` traegt
 *
 * Es setzt `data-theme` auf `<html>`, bevor das Blatt gezeichnet wird. Lage es
 * am Ende der Seite, saehe der Leser fuer einen Wimpernschlag die dunkle
 * Fassung aufblitzen und dann umspringen.
 */
(function () {
  'use strict';

  var SCHLUESSEL = 'hegel-thema';       // 'system' | 'hell' | 'dunkel'
  var FARBE = { dunkel: '#232229', hell: '#faf6ec' };

  function gespeichert() {
    try { return localStorage.getItem(SCHLUESSEL) || 'system'; } catch (_) { return 'system'; }
  }

  function systemIstHell() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  }

  /** Was tatsaechlich gezeigt wird — die Wahl, oder was das System sagt. */
  function aufgeloest(wahl) {
    if (wahl === 'hell' || wahl === 'dunkel') return wahl;
    return systemIstHell() ? 'hell' : 'dunkel';
  }

  /* Der Kopf hinkte beim Umschalten hinterher, der Rest der Seite sprang
     sofort um. Grund ist keine Traegheit, sondern eine Animation, die fuer
     etwas ganz anderes gedacht war: `.site-header` blendet beim Rollen seinen
     Hintergrund weich um (`transition: background 0.4s`). Ein Themenwechsel
     tauscht genau diesen Hintergrund aus — und der Browser animiert ihn
     pflichtschuldig ueber 0,4 Sekunden mit.

     25 Regeln der Edition animieren Farbe oder Hintergrund; der Kopf faellt
     nur am staerksten auf, weil seine Flaeche die groesste und seine Dauer
     die laengste ist. Statt jede einzeln zu beschneiden — und damit die
     Uebergaenge zu verlieren, fuer die sie gedacht sind — werden sie fuer
     die Dauer des Wechsels stillgelegt.

     Das Lesen von `offsetHeight` dazwischen ist kein Zierat: es zwingt den
     Browser, den Umbruch sofort zu berechnen. Ohne diese Zeile faellt das
     Hinzufuegen und Entfernen der Klasse in denselben Arbeitsschritt, der
     Browser sieht am Ende gar keine Aenderung, und die Uebergaenge liefen
     wie zuvor. */
  function anwenden(wahl) {
    var ist = aufgeloest(wahl);
    var wurzel = document.documentElement;
    wurzel.classList.add('thema-wechselt');
    wurzel.setAttribute('data-theme', ist);
    void wurzel.offsetHeight;
    wurzel.classList.remove('thema-wechselt');
    var m = document.querySelector('meta[name="theme-color"]');
    if (!m) {
      m = document.createElement('meta');
      m.name = 'theme-color';
      document.head.appendChild(m);
    }
    m.content = FARBE[ist];
    return ist;
  }

  anwenden(gespeichert());

  // Folgt die Edition dem System, muss sie auch mitgehen, wenn es umschaltet.
  if (window.matchMedia) {
    var mq = window.matchMedia('(prefers-color-scheme: light)');
    var horcher = function () { if (gespeichert() === 'system') anwenden('system'); };
    if (mq.addEventListener) mq.addEventListener('change', horcher);
    else if (mq.addListener) mq.addListener(horcher);
  }

  // ── Schalter in der Kopfleiste ───────────────────────────────────────────
  // Er gehoert **nicht** ins Zahnrad des Lesers: die Darstellung gilt fuer die
  // ganze Website, das Zahnrad gibt es aber nur in der Lektuere. Hier gebaut,
  // weil dieses Skript als einziges auf jeder Seite laeuft.
  var ZEICHEN = { system: '◐', hell: '☀', dunkel: '☾' };
  var WORT = { system: 'Systemvorgabe', hell: 'Hell', dunkel: 'Dunkel' };
  var NAECHST = { system: 'Hell', hell: 'Dunkel', dunkel: 'Systemvorgabe' };

  function beschriften(knopf) {
    var w = gespeichert();
    knopf.textContent = ZEICHEN[w] || ZEICHEN.system;
    knopf.setAttribute('aria-label', 'Darstellung: ' + WORT[w] + ' — umschalten auf ' + NAECHST[w]);
    knopf.title = 'Darstellung: ' + WORT[w] + ' · klicken für ' + NAECHST[w];
  }

  function baueSchalter() {
    var kopf = document.querySelector('.site-header');
    if (!kopf || document.getElementById('thema-schalter')) return;
    var knopf = document.createElement('button');
    knopf.type = 'button';
    knopf.id = 'thema-schalter';
    knopf.className = 'thema-schalter';
    beschriften(knopf);
    knopf.addEventListener('click', function () {
      window.HEGEL_THEMA.weiter();
      beschriften(knopf);
    });
    var rechts = kopf.querySelector('.kopf-rechts');   // rechts neben dem Sprachumschalter
    var nav = kopf.querySelector('.sitenav');
    if (rechts) rechts.appendChild(knopf);
    else if (nav && nav.parentNode === kopf) kopf.insertBefore(knopf, nav.nextSibling);
    else kopf.appendChild(knopf);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', baueSchalter);
  } else {
    baueSchalter();
  }

  window.HEGEL_THEMA = {
    wahl: gespeichert,
    ist: function () { return aufgeloest(gespeichert()); },
    setze: function (wahl) {
      try { localStorage.setItem(SCHLUESSEL, wahl); } catch (_) {}
      return anwenden(wahl);
    },
    /** Reihum: System → hell → dunkel → System. */
    weiter: function () {
      var naechst = { system: 'hell', hell: 'dunkel', dunkel: 'system' };
      return this.setze(naechst[gespeichert()] || 'system');
    },
  };
})();
