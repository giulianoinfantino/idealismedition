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
    try { document.dispatchEvent(new CustomEvent('thema-gewechselt', { detail: { wahl: wahl, ist: ist } })); } catch (_) {}
    return ist;
  }

  // ── Einstellungen wandern mit über die vier Domains (Behebungsplan 09.11.2026, Nr. 2) ──────────
  // Farbschema, Schriftgrad, Ansicht, Hervorhebung, Kopier-Optionen, Sprache und der gesehene
  // Speicherhinweis liegen je Domain im lokalen Speicher; die Schlüssel heißen auf allen vier Seiten
  // gleich. Ein Link zu einer Schwesterseite bekommt sie beim Klick als Parameter e mit; die Zielseite
  // liest ihn hier, vor dem ersten Zeichnen, speichert die Werte und nimmt ihn aus der Adresse.
  var MITGABE = [SCHLUESSEL, 'hegel-font-step', 'hegel-reader-view', 'hegel-emphasis', 'hegel-cite', 'hegel-cite-zeilen',
                 'hegel-cite-italic', 'sprache', 'hegel-cookie-notice'];
  var EIGENE = /(^|\.)(hegel|fichte|schelling|idealism)edition\.com$/;
  try {
    var adresse = new URL(location.href), mit = adresse.searchParams.get('e');
    if (mit) {
      new URLSearchParams(mit).forEach(function (v, k) { if (MITGABE.indexOf(k) > -1) localStorage.setItem(k, v); });
      adresse.searchParams.delete('e');
      history.replaceState(null, '', adresse.href);
    }
  } catch (_) {}
  document.addEventListener('click', function (ev) {
    var a = ev.target && ev.target.closest ? ev.target.closest('a[href]') : null;
    if (!a || ev.defaultPrevented) return;
    var ziel; try { ziel = new URL(a.href); } catch (_) { return; }
    if (!EIGENE.test(ziel.hostname) || ziel.hostname === location.hostname) return;
    var p = new URLSearchParams();
    MITGABE.forEach(function (k) { var v = null; try { v = localStorage.getItem(k); } catch (_) {} if (v !== null) p.set(k, v); });
    if (p.toString()) { ziel.searchParams.set('e', p.toString()); a.href = ziel.href; }
  }, true);

  anwenden(gespeichert());

  // Folgt die Edition dem System, muss sie auch mitgehen, wenn es umschaltet.
  if (window.matchMedia) {
    var mq = window.matchMedia('(prefers-color-scheme: light)');
    var horcher = function () { if (gespeichert() === 'system') anwenden('system'); };
    if (mq.addEventListener) mq.addEventListener('change', horcher);
    else if (mq.addListener) mq.addListener(horcher);
  }

  // ── Darstellung und Menü in der Kopfleiste (Behebungsplan 09.11.2026, Nr. 3 und 13) ──
  // Ein Knopf „Aa“ für die Darstellung, auf jeder Seite an derselben Stelle rechts im Kopf. In der
  // Lektüre nimmt lesepult.js dafür den Einstellungsknopf des Lesers (Klasse darstellung-knopf) und
  // legt das Farbschema in dessen Feld; auf allen anderen Seiten baut dieses Skript ein kleines Feld
  // mit dem Farbschema (System · Hell · Dunkel). Dazu, für schmale Fenster, das Menü: alle Punkte der
  // Navigation und die drei Ausgaben, als <details>, also auch ohne Skript zu öffnen. Hier gebaut,
  // weil dieses Skript als einziges auf jeder Seite läuft.
  var EN = (document.documentElement.lang || 'de').slice(0, 2) === 'en';
  var T = EN ? { darstellung: 'Display', schema: 'Colour scheme', system: 'System', hell: 'Light', dunkel: 'Dark',
                 menue: 'Menu', familie: 'German Idealism Edition' }
             : { darstellung: 'Darstellung', schema: 'Farbschema', system: 'System', hell: 'Hell', dunkel: 'Dunkel',
                 menue: 'Menü', familie: 'Edition Deutscher Idealismus' };

  /** Drei Felder System · Hell · Dunkel; das gewählte ist gefüllt. Auch der Leser (lesepult.js) baut damit. */
  function baueWahl() {
    var g = document.createElement('div');
    g.className = 'lp-segment'; g.setAttribute('role', 'group'); g.setAttribute('aria-label', T.schema);
    ['system', 'hell', 'dunkel'].forEach(function (w) {
      var b = document.createElement('button'); b.type = 'button'; b.dataset.thema = w; b.textContent = T[w];
      b.addEventListener('click', function () { window.HEGEL_THEMA.setze(w); });
      g.appendChild(b);
    });
    function malen() {
      var w = gespeichert();
      g.querySelectorAll('[data-thema]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.thema === w)); });
    }
    malen();
    document.addEventListener('thema-gewechselt', malen);
    return g;
  }

  function baueDarstellung(kopf) {
    if (kopf.querySelector('.darstellung-knopf') || document.getElementById('thema-schalter')) return;
    var rechts = kopf.querySelector('.kopf-rechts');
    var knopf = document.createElement('button');
    knopf.type = 'button'; knopf.id = 'thema-schalter'; knopf.className = 'thema-schalter darstellung-knopf';
    knopf.textContent = 'Aa'; knopf.setAttribute('aria-label', T.darstellung); knopf.title = T.darstellung;
    knopf.setAttribute('aria-haspopup', 'true'); knopf.setAttribute('aria-expanded', 'false');
    var feld = document.createElement('div');
    feld.className = 'einstellungen-panel darstellung-panel'; feld.hidden = true;
    var gruppe = document.createElement('div'); gruppe.className = 'einstellungen-gruppe'; gruppe.textContent = T.darstellung;
    var zeile = document.createElement('div'); zeile.className = 'einstellungen-zeile lp-thema-zeile';
    var etikett = document.createElement('span'); etikett.className = 'lp-etikett'; etikett.textContent = T.schema;
    zeile.appendChild(etikett); zeile.appendChild(baueWahl());
    feld.appendChild(gruppe); feld.appendChild(zeile);
    function auf(an) {
      knopf.setAttribute('aria-expanded', an ? 'true' : 'false');
      if (an && window.nurEines) window.nurEines(feld);
      feld.hidden = !an;
      if (!an) return;
      // öffnet nach links unter dem Knopf, wie das Einstellungsfeld des Lesers
      var r = knopf.getBoundingClientRect();
      feld.style.top = (r.bottom + 6) + 'px';
      feld.style.left = '';
      feld.style.right = Math.max(8, document.documentElement.clientWidth - r.right) + 'px';
    }
    knopf.addEventListener('click', function (e) { e.stopPropagation(); auf(feld.hidden); });
    document.addEventListener('click', function (e) { if (!feld.hidden && !feld.contains(e.target)) auf(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !feld.hidden) { auf(false); knopf.focus(); } });
    (rechts || kopf).appendChild(knopf);
    document.body.appendChild(feld);
  }

  var LINIEN = '<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M1.5 3.5h13M1.5 8h13M1.5 12.5h13" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>';
  var AUSGABEN = [['idealism', 'https://www.idealismedition.com/', T.familie], ['fichte', 'https://www.fichteedition.com/', 'Fichte'],
                  ['schelling', 'https://www.schellingedition.com/', 'Schelling'], ['hegel', 'https://www.hegeledition.com/', 'Hegel']];
  function baueMenue(kopf) {
    var liste = kopf.querySelector('.sitenav ul'), rechts = kopf.querySelector('.kopf-rechts');
    if (!liste || !rechts || kopf.querySelector('.kopf-menue')) return;
    var d = document.createElement('details'); d.className = 'kopf-menue';
    var s = document.createElement('summary'); s.innerHTML = LINIEN + '<span>' + T.menue + '</span>';
    var feld = document.createElement('div'); feld.className = 'kopf-menue-feld';
    var n = document.createElement('nav'); n.className = 'kopf-menue-nav'; n.setAttribute('aria-label', T.menue);
    n.appendChild(liste.cloneNode(true));
    var fam = document.createElement('p'); fam.className = 'kopf-menue-familie';
    AUSGABEN.forEach(function (a) {
      var l = document.createElement('a'); l.href = a[1] + (EN ? '' : 'de/'); l.textContent = a[2];
      if (location.hostname.indexOf(a[0]) > -1) l.setAttribute('aria-current', 'true');
      fam.appendChild(l);
    });
    feld.appendChild(n); feld.appendChild(fam);
    d.appendChild(s); d.appendChild(feld);
    rechts.insertBefore(d, rechts.firstChild);
    document.addEventListener('click', function (e) { if (d.open && !d.contains(e.target)) d.open = false; });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && d.open) { d.open = false; s.focus(); } });
  }

  function baueKopf() {
    var kopf = document.querySelector('.site-header');
    if (!kopf) return;
    baueMenue(kopf);
    baueDarstellung(kopf);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', baueKopf);
  else baueKopf();

  window.HEGEL_THEMA = {
    wahl: gespeichert,
    baueWahl: baueWahl,
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

/* Rückmeldung (assets/rueckmeldung.js, seit 08.11.2026): Fußlink und Formular auf jeder Seite, die diese Datei lädt */
(function () { var s = document.createElement('script'); s.src = '/assets/rueckmeldung.js'; s.async = true; document.head.appendChild(s); })();
