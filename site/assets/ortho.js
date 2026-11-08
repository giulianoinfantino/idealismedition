/* Schreibungsausgleich fuer die Suche — eine Quelle fuer alle Seiten.
 *
 * Die Edition bewahrt Hegels Orthographie: `Seyn`, `daß`, `Verhältniß`,
 * `Proceß`, `Princip`. Wer heute sucht, tippt `Sein`, `dass`, `Verhältnis`.
 * Ohne Ausgleich findet er nichts. Umgekehrt darf im Ergebnis nichts
 * modernisiert erscheinen — normalisiert wird nur der **Suchschluessel**,
 * angezeigt bleibt Hegels Wortlaut.
 *
 * Bis August 2026 stand diese Tabelle in VIER Kopien (zweimal in `search.html`,
 * zweimal in `text.html`). Genau daran ist in dieser Edition schon mehrfach
 * eine Korrektur haengengeblieben, weil sie nur an einer Stelle ankam.
 *
 * ## Zwei Arten von Abweichung
 *
 * `REGELN` fassen das **Regelhafte**: `ey→ei`, `ß→ss`, `th→t`, `c→k/z`. Sie
 * gelten auch fuer Woerter, die niemand vorher gesehen hat.
 *
 * `VARIANTEN` fassen das **Unregelmaessige**: `nemlich`/`nämlich`,
 * `itzt`/`jetzt`. Keine Zeichenregel verbindet die; es braucht eine Liste.
 *
 * ## Warum Varianten am Wortanfang verankert werden
 *
 * Die Suche arbeitet mit Teilzeichenketten, damit `concret` auch `concreten`
 * findet. Fuer Varianten waere das gefaehrlich: `izt` steckt in `besitzt`.
 * `variantenRegex` verankert darum mit `\b` — Flexionsendungen bleiben
 * erreichbar, Wortinneres nicht.
 *
 * ## Gemessen, nicht geraten
 *
 * Die `c`-Regeln fuehren 163 Wortgruppen zusaetzlich zusammen. Nachgesehen
 * wurde die ganze Liste; richtig sind darunter `verhältniß=verhältnis` (1364),
 * `proceß=process=prozeß` (793), `princip=prinzip` (648), `prädicat=prädikat`,
 * `continuität=kontinuität`, `construction=konstruktion`. Falsch sind zwei:
 * `ciel→ziel` und `comme→komme` — franzoesische Woerter in Hegels Text, vier
 * Vorkommen zusammen. Das ist der bewusst in Kauf genommene Preis.
 */
(function (global) {
  'use strict';

  // Reihenfolge ist bedeutsam: `ni(ß|ss)` muss vor `ß→ss` stehen, sonst wird
  // aus `Verhältniß` ein `verhältniss`, aus `Verhältnis` aber `verhältnis` —
  // die beiden fanden sich dann nur noch als Teilzeichenkette, und in einer
  // Richtung fielen acht Seiten heraus.
  var QUELLEN = [
    ['ni(?:ß|ss)(?![a-zäöü])', 'nis'],
    // `c` vor hellem Vokal wird `z` (Centrum, Cirkel), sonst `k` (Cultur,
    // Princip, Prädicat). Nicht nach `s` oder `c`, sonst zerfielen `sch`,
    // `ck` und `acc-`. Braucht Lookbehind; wo das fehlt, siehe unten.
    ['(?<![sc])c(?=[aou])', 'k'],
    ['(?<![sc])c(?=[ei])', 'z'],
    ['ey', 'ei'], ['ay', 'ai'],
    ['ß', 'ss'],
    ['th(?=[aeiouäöü])', 't'],
    ['ct', 'kt'],
    ['ph', 'f'],
    ['iren\\b', 'ieren'],
  ];

  // Aeltere Safari-Fassungen kennen kein Lookbehind, und `new RegExp` wirft
  // dann beim Auswerten — das naehme die ganze Seite mit. Also einmal prüfen
  // und die beiden Regeln notfalls weglassen: die Suche wird dadurch
  // schlechter, nicht kaputt.
  var kannLookbehind = true;
  try { new RegExp('(?<!x)y'); } catch (e) { kannLookbehind = false; }
  if (!kannLookbehind) {
    QUELLEN = QUELLEN.filter(function (r) { return r[0].indexOf('(?<') === -1; });
  }

  function regeln(flags) {
    return QUELLEN.map(function (r) { return [new RegExp(r[0], flags), r[1]]; });
  }

  var REGELN_G = regeln('g');

  function normalize(s) {
    var r = s;
    for (var i = 0; i < REGELN_G.length; i++) r = r.replace(REGELN_G[i][0], REGELN_G[i][1]);
    return r;
  }

  // Nur was keine Regel erreicht. Bewusst knapp: jede Zeile hier erzeugt
  // Treffer, die im Wortlaut nicht stehen, und muss sich lohnen. Die Zahl in
  // Klammern ist die gemessene Seitenzahl der historischen Form.
  var VARIANTEN = [
    ['jetzt', 'itzt', 'izt', 'jezt'],        // itzt (339), izt (21), jezt (9)
    ['nämlich', 'nemlich', 'nehmlich'],      // nemlich (772)
    ['gibt', 'giebt'],                       // giebt (86)
    ['andere', 'andre'],                     // andre (554)
    ['unsere', 'unsre'],                     // unsre (29)
    ['ungeachtet', 'ohngeachtet'],           // ohngeachtet (3)
    ['sowohl', 'sowol'],
  ];

  // Nachgeschlagen wird ueber die normalisierte Form, damit `Nemlich`,
  // `nemlich` und `nämlich` denselben Eintrag treffen.
  var TABELLE = {};
  VARIANTEN.forEach(function (gruppe) {
    gruppe.forEach(function (w) { TABELLE[normalize(w.toLowerCase())] = gruppe; });
  });

  /** Die uebrigen Formen der Gruppe — leer, wenn keine Gruppe oder wenn die
   *  Regeln sie ohnehin schon verbinden. */
  function varianten(wort) {
    var w = (wort || '').toLowerCase();
    var gruppe = TABELLE[normalize(w)];
    if (!gruppe) return [];
    var nw = normalize(w);
    return gruppe.filter(function (v) { return normalize(v) !== nw; });
  }

  function alleVarianten(woerter) {
    var alle = [];
    (woerter || []).forEach(function (w) {
      varianten(w).forEach(function (v) { if (alle.indexOf(v) === -1) alle.push(v); });
    });
    return alle;
  }

  // Verankert wird nur, was in fremden Woertern steckt: `itzt` in `besitzt`,
  // `izt` in `sitzt`, `andre` in `wandre`. Alles andere bleibt unverankert,
  // damit `giebt` auch `ergiebt` findet — sonst faende `gibt` zwar `ergibt`,
  // `giebt` aber nicht `ergiebt`, und dieselbe Frage haette je nach Schreibung
  // 142 Seiten Unterschied.
  var VERANKERT = { 'itzt': 1, 'izt': 1, 'jezt': 1, 'andre': 1, 'unsre': 1 };

  function maskiere(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

  /** Ein Ausdruck ueber alle Varianten — oder null. Ohne `g`, damit
   *  `lastIndex` zwischen Aufrufen nicht nachwirkt. */
  function variantenRegex(woerter, flags) {
    var alle = alleVarianten(woerter);
    if (!alle.length) return null;
    var teile = alle.map(function (v) {
      return (VERANKERT[v] ? '\\b' : '') + maskiere(v);
    });
    return new RegExp('(?:' + teile.join('|') + ')', flags || 'i');
  }

  global.HEGEL_ORTHO = {
    QUELLEN: QUELLEN,
    regeln: regeln,
    normalize: normalize,
    varianten: varianten,
    alleVarianten: alleVarianten,
    variantenRegex: variantenRegex,
    maskiere: maskiere,
  };
})(typeof window !== 'undefined' ? window : globalThis);
