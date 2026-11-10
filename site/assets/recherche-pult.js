/* Recherche des Portals: das Pult (seit 11/2026).
 *
 * Die Suchseite der Editionen bleibt die Quelle (werkzeug/recherche_seite.py); dieses Skript legt darüber,
 * was nur das Portal hat: ein Feld, das Wörter, Zitate (GW 9, 23) und Werktitel versteht und Tippfehler
 * auffängt; ein Suchformular („Erweitert“), das die Anfrage schreibt; die drei Autoren als Schalter über
 * den Stellen; Filter links (Zeit mit den Stationen des gewählten Autors, Gattung, Textart, aufklappbar
 * Werke und Bände); die Druckseite einer Stelle, die unter ihr aufklappt; eine Merkliste mit Export; die
 * Ansicht „Begriffe“ (mehrere Anfragen auf einer Zeitachse); Filter als Marken.
 *
 * Die Seite ruft an wenigen Stellen herein (werkzeug/pult_einbau.py setzt die Haken):
 *   Pult.start(ctx)      einmal, vor dem ersten Zeichnen; ctx ist window.PultCtx
 *   Pult.vor(m)          vor jeder Meldung des Workers; true = hier erledigt
 *   Pult.nach(m)         nach jeder Meldung, die die Seite gezeichnet hat
 *   Pult.ruhe(an)        Wechsel zwischen erster Ansicht und Ergebnis
 *   Pult.frage(m)        die Suchanfrage an den Worker, bevor sie abgeht (Werkwahl)
 *   Pult.karte(s, art)   das HTML einer Stelle
 *   Pult.baende(jeBand)  nach dem Zeichnen der Bandliste
 *   Pult.adresse(p), Pult.lies(p)   eigene Angaben in der Adresse
 *   Pult.begriffe(ziel)  die Ansicht „Begriffe“
 * Gerechnet wird im Worker (recherche-portal-worker.js, Abschnitt „Pult“). Beide Sprachen stehen hier
 * (tx), darum läuft dieses Skript nicht durch englisch.py.
 */
(function () {
  'use strict';
  var EN = document.documentElement.lang === 'en';
  function tx(de, en) { return EN ? en : de; }
  var C = null;
  var EDS = ['fichte', 'schelling', 'hegel'];
  var EINE = false;   // auf der Seite einer einzelnen Ausgabe (werkzeug/ausgabe_suche.py): ein Autor, keine Schalter
  var NAME = { fichte: 'Fichte', schelling: 'Schelling', hegel: 'Hegel' };
  /** Der Autor vor einem Fundort: im Portal immer, auf der Seite einer einzelnen Ausgabe nie (dort ist er überall derselbe). */
  function wer(ed, trenner) { return EINE ? '' : NAME[ed] + (trenner || ', '); }
  var GATTUNG = { d: tx('Druckschrift', 'Published work'), v: tx('Vorlesung', 'Lecture'), n: tx('Nachlass', 'Manuscript'), e: tx('Exzerpt', 'Excerpt') };
  var GATTUNGEN = { d: tx('Druckschriften', 'Published works'), v: tx('Vorlesungen', 'Lectures'), n: tx('Nachlass', 'Manuscripts'), e: tx('Exzerpte', 'Excerpts') };
  // Lebensstationen je Autor als Zeitfilter nach dem Jahr der Schrift. Ein Grenzjahr gehört zu beiden
  // Stationen. Auf den Seiten der einzelnen Editionen gilt dieselbe Liste für den einen Autor.
  var PERIODEN = {
    fichte: [[tx('bis 1793', 'to 1793'), 1790, 1793], ['Jena', 1794, 1799], ['Berlin', 1799, 1814]],
    schelling: [['Tübingen, Leipzig', 1792, 1798], ['Jena', 1798, 1803], ['Würzburg', 1803, 1806], [tx('München', 'Munich'), 1806, 1820],
                ['Erlangen', 1820, 1827], [tx('München', 'Munich'), 1827, 1841], ['Berlin', 1841, 1854]],
    hegel: [[tx('bis Frankfurt', 'to Frankfurt'), 1785, 1800], ['Jena', 1801, 1807], [tx('Bamberg, Nürnberg', 'Bamberg, Nuremberg'), 1807, 1816],
            ['Heidelberg', 1816, 1818], ['Berlin', 1818, 1832]]
  };
  var Z = {
    stat: null, karten: {}, gewaehlt: null, seite: null, werke: null, leereAuf: false,
    liste: [], vid: 0, vliste: [], vwahl: -1, vzeit: 0, orte: {}, ortId: 0,
    mit: [], autor: 'alle', begriffe: null, bid: 0, startId: 0,
    werkwahl: [], alleWerke: null, werkSuche: '', werkAlle: false, formHinweis: ''
  };
  var dom = {};

  function el(name, cls, attrs, html) {
    var e = document.createElement(name);
    if (cls) e.className = cls;
    for (var k in (attrs || {})) e.setAttribute(k, attrs[k]);
    if (html != null) e.innerHTML = html;
    return e;
  }
  function esc(s) { return C.esc(s); }
  function zahl(n) { return C.zahl(n); }
  function dichte(v) {
    var s = v >= 10 ? 0 : v >= 1 ? 1 : 2;
    return v.toLocaleString(EN ? 'en-US' : 'de-DE', { minimumFractionDigits: s, maximumFractionDigits: s });
  }
  function schmal() { return window.matchMedia('(max-width: 900px)').matches; }
  function ruhig() { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; }
  function sende(m) { var w = C.worker(); if (w) w.postMessage(m); }
  function lager(k, v) {
    try {
      if (v === undefined) return JSON.parse(localStorage.getItem(k) || 'null');
      localStorage.setItem(k, JSON.stringify(v));
    } catch (_) {}
    return null;
  }
  function klartext(html) {
    var d = document.createElement('div');
    d.innerHTML = String(html).replace(/<span class="seitenwechsel"[^>]*>(\d+)<\/span>/g, '|$1|');
    return d.textContent.replace(/\s+/g, ' ').trim();
  }

  // ═════════════════════════════════════════════════════════════════════
  //  Aufbau
  // ═════════════════════════════════════════════════════════════════════
  function start(ctx) {
    C = ctx;
    var da = EDS.filter(function (ed) { return C.EDITIONEN && C.EDITIONEN[ed]; });
    if (da.length) EDS = da;
    EINE = EDS.length === 1;
    document.body.classList.toggle('pult-eine', EINE);
    var haupt = C.$('search-main'), kopf = haupt.querySelector('.rch-kopf'), koerper = haupt.querySelector('.rch-koerper');
    dom.leiste = haupt.querySelector('.rch-leiste');
    dom.arten = haupt.querySelector('.rch-arten');
    dom.facetten = C.$('rch-baende');
    dom.status = haupt.querySelector('.rch-status');
    // Status und Aktionen neben das Feld
    kopf.insertBefore(dom.status, C.$('rch-lesart'));
    // Mitte: Autoren, Filtermarken, Stellen
    dom.mitte = el('div', 'pult-mitte');
    koerper.insertBefore(dom.mitte, C.results);
    dom.autoren = el('div', 'pult-autoren', { id: 'pult-autoren', role: 'group', 'aria-label': tx('Autoren', 'Authors') });
    dom.filter = el('div', 'pult-filter', { id: 'pult-filter' });
    dom.filter.hidden = true;
    dom.mitte.appendChild(dom.autoren); dom.mitte.appendChild(dom.filter); dom.mitte.appendChild(C.results);
    // Die Druckseite einer Stelle: hängt nirgends, bis eine Stelle sie aufklappt
    dom.vorschau = el('aside', 'pult-seite', { id: 'pult-vorschau', 'aria-label': tx('Die Seite im Druckbild', 'The page in print layout') });
    // Ordnung und Filterknopf (Telefon) in die Zeile der Ansichten
    dom.rechts = el('div', 'pult-rechts');
    var ordnung = C.$('rch-ordnung');
    if (ordnung && ordnung.closest('label')) dom.rechts.appendChild(ordnung.closest('label'));
    dom.filterKnopf = el('button', 'pult-filter-knopf', { type: 'button', id: 'pult-filter-knopf', 'aria-expanded': 'false', 'aria-controls': 'rch-baende' }, tx('Filter', 'Filters'));
    dom.rechts.appendChild(dom.filterKnopf);
    dom.leiste.appendChild(dom.rechts);
    var link = el('button', null, { type: 'button', id: 'pult-link', title: tx('Adresse dieser Suche mit allen Einstellungen in die Zwischenablage', 'Copy the address of this search with all its settings') }, tx('Link kopieren', 'Copy link'));
    C.$('rch-aktionen').appendChild(link);
    link.addEventListener('click', function () { C.kopiere(location.href, tx('Link kopiert', 'Link copied')); });
    // Erste Ansicht: ein Knopf öffnet alle Filter (statt „Alle Bände“)
    dom.filterAuf = el('button', 'pult-filter-auf', { type: 'button', id: 'pult-filter-auf', 'aria-expanded': 'false', 'aria-controls': 'rch-baende' });
    dom.leiste.insertBefore(dom.filterAuf, C.$('rch-baende-knopf'));
    // Feld: „Erweitert“ öffnet das Suchformular
    dom.formKnopf = el('button', 'pult-form-knopf', { type: 'button', id: 'pult-form-knopf', 'aria-expanded': 'false', 'aria-controls': 'pult-formular',
      title: tx('Suchformular: die Anfrage aus Feldern zusammensetzen', 'Search form: build the query from fields') }, tx('Erweitert', 'Advanced'));
    var los = C.$('rch-form').querySelector('.rch-los');
    los.parentNode.insertBefore(dom.formKnopf, los);
    dom.formular = el('div', 'pult-formular', { id: 'pult-formular', role: 'group', 'aria-label': tx('Erweiterte Suche', 'Advanced search') });
    dom.formular.hidden = true;
    kopf.insertBefore(dom.formular, dom.status);
    // Filter: Zeit (mit den Stationen des gewählten Autors), Gattung, Textart; aufklappbar Werke und Bände
    var zeit = C.$('rch-zeit'), zj = zeit.querySelector('.rch-zeit-jahre');
    dom.hist = el('div', 'pult-hist', { id: 'pult-hist' });
    dom.perioden = el('div', 'pult-perioden', { id: 'pult-perioden', role: 'group', 'aria-label': tx('Stationen', 'Periods') });
    dom.perioden.hidden = true;
    zj.parentNode.insertBefore(dom.hist, zj);
    zj.parentNode.insertBefore(dom.perioden, zj);
    var bandKopf = C.$('rch-alle').closest('.kopf'), bandListe = C.$('rch-baende-liste');
    dom.artenGruppe = el('div', 'pult-gruppe pult-gruppe-arten', null, '<div class="kopf"><span>' + tx('Text', 'Text') + '</span></div>');
    dom.artenGruppe.appendChild(dom.arten);
    dom.facetten.insertBefore(dom.artenGruppe, bandKopf);
    dom.werkeFach = el('details', 'pult-fach', { id: 'pult-werke-fach' },
      '<summary><span>' + tx('Werke', 'Works') + '</span><span class="pf-n" id="pult-werke-n"></span></summary>' +
      '<div class="pult-werke"><input type="search" id="pult-werke-suche" spellcheck="false" autocomplete="off" placeholder="' + tx('Werk suchen, etwa Logik', 'Find a work, e.g. Logik') +
      '" aria-label="' + tx('Werk suchen', 'Find a work') + '"><div id="pult-werke-liste"></div></div>');
    dom.facetten.insertBefore(dom.werkeFach, bandKopf);
    dom.werkeListe = dom.werkeFach.querySelector('#pult-werke-liste');
    dom.baendeFach = el('details', 'pult-fach', { id: 'pult-baende-fach' }, '<summary><span>' + tx('Bände', 'Volumes') + '</span><span class="pf-n" id="pult-baende-n"></span></summary>');
    dom.facetten.insertBefore(dom.baendeFach, bandKopf);
    dom.baendeFach.appendChild(bandKopf); dom.baendeFach.appendChild(bandListe);
    dom.leere = el('button', 'pult-leere', { type: 'button', id: 'pult-leere' });
    dom.leere.hidden = true;
    dom.baendeFach.appendChild(dom.leere);
    dom.blattZu = el('button', 'pult-blatt-zu', { type: 'button' }, tx('Stellen zeigen', 'Show passages'));
    // Alles in einen Rahmen, damit die erste Ansicht die Fächer nebeneinander stellen kann
    dom.faecher = el('div', 'pult-faecher');
    [zeit, dom.artenGruppe, dom.werkeFach, dom.baendeFach, dom.blattZu].forEach(function (n) { dom.faecher.appendChild(n); });
    dom.facetten.appendChild(dom.faecher);
    var auf = lager('idealismus-pult-faecher') || {};
    [dom.werkeFach, dom.baendeFach].forEach(function (d) {
      d.open = !!auf[d.id];
      d.addEventListener('toggle', function () {
        var a = lager('idealismus-pult-faecher') || {};
        a[d.id] = d.open; lager('idealismus-pult-faecher', a);
        if (d === dom.werkeFach && d.open) malWerkwahl();
      });
    });
    // Vorschläge: eigene Liste; die alte bleibt leer (vor() schluckt ihre Meldungen)
    dom.vorschlag = el('ul', 'rch-vorschlag pult-vorschlag', { id: 'pult-vorschlag', role: 'listbox', 'aria-label': tx('Vorschläge', 'Suggestions') });
    dom.vorschlag.hidden = true;
    C.$('rch-form').appendChild(dom.vorschlag);
    C.input.setAttribute('aria-controls', 'pult-vorschlag');
    // Ablage der Merkliste
    dom.ablage = el('div', 'pult-ablage', { id: 'pult-ablage' });
    document.body.appendChild(dom.ablage);
    dom.export = el('div', 'pult-export', { id: 'pult-export', role: 'dialog', 'aria-label': tx('Merkliste', 'Working list') });
    dom.export.hidden = true;
    document.body.appendChild(dom.export);

    Z.liste = lager('idealismus-merkliste') || [];
    verbinde();
    malFormular(); malAutoren(); malAblage(); ansichtKlasse(); malFilterAuf(); malPerioden(); malWerkwahl();
    zeigeStartAusLager();
  }
  // ═════════════════════════════════════════════════════════════════════
  //  Meldungen des Workers
  // ═════════════════════════════════════════════════════════════════════
  function vor(m) {
    if (!C) return false;
    switch (m.typ) {
      case 'vorschlag': return true;   // die alte Liste bleibt zu; unsere fragt selbst (pultvorschlag)
      case 'pultvorschlag': zeigeVorschlag(m); return true;
      case 'seite': zeichneSeite(m); return true;
      case 'ort': empfangeOrt(m); return true;
      case 'pultwerke': if (m.id === C.anfrage()) { Z.werke = m.werke; malWerkwahl(); malHist(); malFilter(); } return true;
      case 'pultliste': Z.alleWerke = m.werke; malWerkwahl(); malFilter(); return true;
      case 'pultstart': empfangeStart(m); return true;
      case 'begriffe': if (m.id === Z.bid) { Z.begriffe = m; zeichneBegriffe(); } return true;
    }
    return false;
  }
  /** Nur in der Ansicht „Stellen“ gilt die Ordnung; die anderen Ansichten nehmen die ganze Breite. */
  function ansichtKlasse() { if (C) document.body.classList.toggle('pult-stellen', C.S.ansicht === 'stellen'); }
  function nach(m) {
    if (!C) return;
    ansichtKlasse();
    if (m.typ === 'bereit') {
      malAutoren();
      sende({ typ: 'pultliste', id: 0 });
      if (document.body.classList.contains('rch-ruhe')) fordereStart();
      fordereVorschlag();
    } else if (m.typ === 'bezuege') {
      lager('idealismus-bezuege', m);
    } else if (m.typ === 'ergebnis') {
      if (m.id !== C.anfrage()) return;
      schliesseSeite();
      Z.karten = {}; Z.werke = null; Z.begriffe = null;
      var hat = !m.leer && m.gesamt && m.gesamt.stellen > 0;
      document.body.classList.toggle('pult-hat', !!hat);
      Z.stat = m.leer ? null : statistik(m.jeBand);
      malAutoren(); malFilter(); malLesart(); malPerioden();
      if (hat) sende({ typ: 'pultwerke', id: m.id });
      else { malWerkwahl(); malHist(); if (!m.leer) fragNachAehnlichen(); }
      // Die Liste der Vorschläge soll die neuen Stellen nicht verdecken, wenn niemand mehr tippt
      if (Date.now() - Z.vzeit > 2500) schliesseVorschlag();
    } else if (m.typ === 'stellen') {
      if (m.id !== C.anfrage()) return;
      m.stellen.forEach(function (s) { Z.karten[s.i] = s; });
    }
  }
  function statistik(jeBand) {
    var st = {};
    EDS.forEach(function (ed) { st[ed] = { stellen: 0, vorkommen: 0, woerter: 0, baende: 0 }; });
    (jeBand || []).forEach(function (b) {
      var e = st[C.edVon(b.work)];
      if (!e) return;
      e.stellen += b.stellen; e.vorkommen += b.vorkommen; e.woerter += b.woerter; if (b.stellen) e.baende++;
    });
    return st;
  }
  function malLesart() {
    // „Gesucht: Anschauung“ unter dem Feld sagt bei einem einzelnen Wort nichts Neues
    var q = C.S.q || '';
    document.body.classList.toggle('pult-lesart-aus', /^[\p{L}\p{N}-]+$/u.test(q));
  }

  // ═════════════════════════════════════════════════════════════════════
  //  Erste Ansicht und Ergebnis: was wo steht
  // ═════════════════════════════════════════════════════════════════════
  function ruhe(an) {
    if (!C) return;
    if (an) {
      dom.leiste.insertBefore(dom.autoren, dom.leiste.firstChild);
      document.body.classList.remove('pult-hat', 'pult-blatt-auf');
      schliesseSeite();
      Z.stat = null; Z.werke = null;
      malAutoren(); malFilter(); malWerkwahl(); malHist(); schliesseExport();
      if (C.bereit()) fordereStart();
    } else {
      dom.mitte.insertBefore(dom.autoren, dom.filter);
      if (!schmal()) dom.facetten.open = true;
    }
    malAblage(); malPerioden(); malFilterAuf();
  }

  // ── Autoren: Schalter über den Stellen ──────────────────────────────
  function gewaehlteEd() {
    var S = C.S, an = {};
    EDS.forEach(function (ed) {
      var alle = C.baendeVon(ed), n = alle.filter(function (w) { return S.baende.indexOf(w) >= 0; }).length;
      an[ed] = !n ? 'false' : n === alle.length ? 'true' : 'mixed';
    });
    return an;
  }
  /** Der eine Autor, wenn genau eine Ausgabe ganz gewählt ist; sonst null. */
  function einAutor() {
    if (EINE) return EDS[0];
    var an = gewaehlteEd(), ganz = EDS.filter(function (ed) { return an[ed] === 'true'; });
    return ganz.length === 1 && !EDS.some(function (ed) { return an[ed] === 'mixed'; }) ? ganz[0] : null;
  }
  function malAutoren() {
    if (!C) return;
    var an = gewaehlteEd(), keine = !C.S.baende.length, st = Z.stat, max = 0.0001;
    if (st) EDS.forEach(function (ed) { var d = st[ed].woerter ? st[ed].vorkommen / st[ed].woerter * 1e4 : 0; st[ed].dichte = d; if (d > max) max = d; });
    dom.autoren.classList.toggle('pult-autoren-wahl', !keine);
    dom.autoren.innerHTML = EDS.map(function (ed) {
      var n = C.baendeVon(ed).length, s = st && st[ed];
      var titel = keine ? tx('nur ' + NAME[ed], NAME[ed] + ' only') : an[ed] === 'false' ? tx(NAME[ed] + ' dazunehmen', 'add ' + NAME[ed]) : tx(NAME[ed] + ' abwählen', 'remove ' + NAME[ed]);
      if (s) titel += ' · ' + dichte(s.dichte) + ' ' + tx('Vorkommen je 10 000 Wörter', 'occurrences per 10,000 words');
      return '<button type="button" class="pa pa-' + ed + (s && !s.stellen ? ' pa-leer' : '') + '" data-ed="' + ed + '" aria-pressed="' + (keine ? 'false' : an[ed]) + '" title="' + titel + '">' +
        '<span class="pa-kopf"><i class="pa-punkt" aria-hidden="true"></i><b>' + NAME[ed] + '</b>' +
        '<span class="pa-n">' + (s ? zahl(s.stellen) + '<span class="pa-wort"> ' + (s.stellen === 1 ? tx('Stelle', 'passage') : tx('Stellen', 'passages')) + '</span>' : n + ' ' + tx('Bände', 'volumes')) + '</span></span>' +
        (s ? '<span class="pa-bar" aria-hidden="true"><i style="width:' + (s.dichte / max * 100).toFixed(1) + '%"></i></span>' : '') +
        '</button>';
    }).join('');
  }
  function schalteEd(ed) {
    var S = C.S, an = gewaehlteEd(), neu = [];
    // Nichts gewählt heißt alle. Der erste Klick wählt einen Autor allein, weitere nehmen dazu oder weg.
    if (!S.baende.length) neu = C.baendeVon(ed);
    else {
      EDS.forEach(function (e) {
        var jetzt = e === ed ? an[e] === 'false' : an[e] !== 'false';
        if (jetzt) neu = neu.concat(C.baendeVon(e));
      });
      if (EDS.every(function (e) { return C.baendeVon(e).every(function (w) { return neu.indexOf(w) >= 0; }); })) neu = [];
    }
    S.baende = neu; S.seiten = null;
    if (S.q) C.suche(true); else { C.zeichneBaende(null); C.schreibeAdresse(true); malAutoren(); malWerkwahl(); }
  }

  // ── Bandliste: Zahl je Autor, leere Bände eingeklappt ───────────────
  function baende(jeBand) {
    if (!C) return;
    var liste = C.$('rch-baende-liste'), leer = 0;
    var sum = {};
    (jeBand || []).forEach(function (b) { var ed = C.edVon(b.work); sum[ed] = (sum[ed] || 0) + b.stellen; if (!b.stellen) leer++; });
    liste.querySelectorAll('.ei-bandkopf').forEach(function (k) {
      var n = sum[k.dataset.ed];
      k.classList.toggle('leer', !!jeBand && !n);
      if (jeBand) k.insertAdjacentHTML('beforeend', '<span class="c">' + zahl(n || 0) + '</span>');
    });
    liste.classList.toggle('pult-leere-auf', Z.leereAuf);
    dom.leere.hidden = !jeBand || !leer;
    dom.leere.textContent = Z.leereAuf ? tx('Bände ohne Treffer ausblenden', 'Hide volumes without hits')
      : (leer === 1 ? tx('1 Band ohne Treffer zeigen', 'Show 1 volume without hits') : tx(leer + ' Bände ohne Treffer zeigen', 'Show ' + leer + ' volumes without hits'));
    malAutoren();
  }

  // ── Stationen des gewählten Autors ──────────────────────────────────
  function malPerioden() {
    if (!C || !dom.perioden) return;
    var ed = einAutor(), S = C.S;
    dom.perioden.hidden = !ed;
    if (!ed) { dom.perioden.innerHTML = ''; return; }
    dom.perioden.innerHTML = '<span class="pp-lab">' + tx(NAME[ed] + 's Stationen', NAME[ed] + '’s periods') + '</span>' + PERIODEN[ed].map(function (p) {
      var an = !!S.jahre && S.jahre.von === p[1] && S.jahre.bis === p[2];
      return '<button type="button" data-von="' + p[1] + '" data-bis="' + p[2] + '" aria-pressed="' + an + '">' + p[0] + ' <span>' + p[1] + '–' + p[2] + '</span></button>';
    }).join('');
  }

  // ── Werke: eines oder mehrere aus allen Werken der Ausgabe ──────────
  function werkVon(k) {
    var L = Z.alleWerke || Z.werke || [];
    for (var i = 0; i < L.length; i++) if (L[i].k === k) return L[i];
    return null;
  }
  function malWerkwahl() {
    if (!C || !dom.werkeListe) return;
    document.getElementById('pult-werke-n').textContent = Z.werkwahl.length ? Z.werkwahl.length + ' ' + tx('gewählt', 'selected') : '';
    if (!dom.werkeFach.open) return;
    if (!Z.alleWerke) {
      dom.werkeListe.innerHTML = '<p class="pw-hinweis">' + tx('Die Werke stehen hier, sobald die Bände geladen sind.', 'The works are listed here once the volumes have loaded.') + '</p>';
      C.starte();
      return;
    }
    var zahlJe = {}, hatZahl = !!(Z.werke && C.S.q && !document.body.classList.contains('rch-ruhe'));
    (Z.werke || []).forEach(function (x) { zahlJe[x.k] = x.n; });
    var an = gewaehlteEd(), keineEd = !C.S.baende.length, q = Z.werkSuche.trim().toLowerCase();
    var L = [];
    Z.alleWerke.forEach(function (x, i) {
      var g = Z.werkwahl.indexOf(x.k) >= 0;
      if (!g && !keineEd && an[x.ed] === 'false') return;
      if (!g && q && (x.titel + ' ' + x.sig + ' ' + (x.jahr == null ? '' : x.jahr) + ' ' + NAME[x.ed]).toLowerCase().indexOf(q) < 0) return;
      L.push({ x: x, i: i, g: g ? 1 : 0, n: zahlJe[x.k] || 0 });
    });
    L.sort(function (a, b) { return (b.g - a.g) || (hatZahl ? b.n - a.n : 0) || a.i - b.i; });
    var grenze = q ? 40 : Z.werkAlle ? L.length : 8, zeige = L.slice(0, Math.max(grenze, Z.werkwahl.length));
    dom.werkeListe.innerHTML = zeige.map(function (e) {
      var x = e.x;
      return '<button type="button" class="pw pw-' + x.ed + '" data-k="' + esc(x.k) + '" aria-pressed="' + (e.g ? 'true' : 'false') + '">' +
        '<span class="t">' + esc(x.titel) + '</span><span class="c">' + (hatZahl ? (e.n ? zahl(e.n) : '–') : '') + '</span>' +
        '<span class="pw-ort">' + esc(wer(x.ed, ' · ') + x.sig + (x.jahr != null ? ' · ' + x.jahr : '')) + '</span></button>';
    }).join('') +
      (!L.length ? '<p class="pw-hinweis">' + tx('Kein Werk mit diesem Titel.', 'No work with this title.') + '</p>' : '') +
      (L.length > zeige.length ? '<button type="button" class="pult-mehr" data-werke-mehr>' + tx('alle ' + L.length + ' zeigen', 'show all ' + L.length) + '</button>'
        : (Z.werkAlle && !q && L.length > 8 ? '<button type="button" class="pult-mehr" data-werke-mehr>' + tx('weniger zeigen', 'show fewer') + '</button>' : ''));
  }
  function schalteWerk(k) {
    var i = Z.werkwahl.indexOf(k);
    if (i >= 0) Z.werkwahl.splice(i, 1); else Z.werkwahl.push(k);
    C.S.seiten = null;
    if (C.S.q) C.suche(true); else { C.schreibeAdresse(true); malWerkwahl(); }
  }

  // Zeitfenster der Achsen: im Portal 1785–1854, auf der Seite einer Ausgabe die Jahre ihres Autors (assets/suche-baende.js)
  var ZF = window.RECHERCHE_ZEIT || { von: 1785, n: 14 };
  var HVON = ZF.von, HSCHRITT = 5, HN = ZF.n;
  /** Der Worker zählt immer ab 1785 in 14 Jahrfünften; hier der Ausschnitt des Zeitfensters. */
  function fenster(a, von, schritt) { var ab = Math.max(0, Math.round((HVON - (von || 1785)) / (schritt || HSCHRITT))); return a.slice(ab, ab + HN); }
  function malHist() {
    var w = Z.werke || [];
    if (!w.length || document.body.classList.contains('rch-ruhe')) { dom.hist.innerHTML = ''; return; }
    var n = [], max = 1, j, S = C.S;
    for (j = 0; j < HN; j++) n.push(0);
    w.forEach(function (x) { if (x.jahr == null) return; var k = Math.floor((x.jahr - HVON) / HSCHRITT); if (k >= 0 && k < HN) n[k] += x.n; });
    // Mit einem Zeitfilter bleiben die Balken der ungefilterten Suche stehen, sonst sähe man nur noch den gewählten
    var kennung = JSON.stringify([S.q, S.baende, S.arten, S.gattung, S.hervor, S.aus, S.seiten]);
    if (!S.jahre) Z.hist = { k: kennung, n: n };
    else if (Z.hist && Z.hist.k === kennung) n = Z.hist.n;
    n.forEach(function (v) { if (v > max) max = v; });
    dom.hist.innerHTML = '<div class="ph" role="group" aria-label="' + tx('Vorkommen je Jahrfünft', 'Occurrences per five-year period') + '">' + n.map(function (v, k) {
      var a = HVON + k * HSCHRITT, b = a + HSCHRITT - 1, drin = !S.jahre || (a <= S.jahre.bis && b >= S.jahre.von);
      return '<button type="button" class="' + (v ? '' : 'null ') + (drin ? 'drin' : '') + '" data-von="' + a + '" data-bis="' + b + '" style="height:' + (v ? Math.max(8, v / max * 100).toFixed(0) : 3) + '%"' +
        ' title="' + a + '–' + b + ': ' + zahl(v) + ' ' + tx('Vorkommen', v === 1 ? 'occurrence' : 'occurrences') + '"' + (v ? '' : ' tabindex="-1"') + '></button>';
    }).join('') + '</div><div class="ph-achse"><span>' + HVON + '</span><span>' + (HVON + HN * HSCHRITT - 1) + '</span></div>';
  }

  // ── Filter als Marken über den Stellen ──────────────────────────────
  function aktiveFilter() {
    var S = C.S, m = [], an = gewaehlteEd();
    if (S.seiten) m.push(['seiten', C.sigVon(S.seiten.work) + ', ' + tx('S.', 'pp.') + ' ' + S.seiten.von + '–' + S.seiten.bis]);
    else if (S.baende.length && EDS.some(function (ed) { return an[ed] === 'mixed'; })) {
      m.push(['baende', S.baende.length === 1 ? C.sigVon(S.baende[0]) : S.baende.length + ' ' + tx('Bände', 'volumes')]);
    }
    if (Z.werkwahl.length > 2) m.push(['werke', Z.werkwahl.length + ' ' + tx('Werke', 'works')]);
    else Z.werkwahl.forEach(function (k) { var x = werkVon(k); m.push(['werk:' + k, x ? x.titel : tx('ein Werk', 'one work')]); });
    if (S.jahre) m.push(['jahre', S.jahre.von + '–' + S.jahre.bis]);
    if (S.gattung) m.push(['gattung', tx('nur ', 'only ') + S.gattung.split('').map(function (g) { return GATTUNGEN[g]; }).join(', ')]);
    if (S.hervor) m.push(['hervor', tx('nur Hervorhebungen', 'emphasis only')]);
    if (!(S.arten.t && S.arten.n && S.arten.h)) {
      var aus = [];
      if (!S.arten.t) aus.push(tx('Haupttext', 'main text'));
      if (!S.arten.n) aus.push(tx('Anmerkungen', 'notes'));
      if (!S.arten.h) aus.push(tx('Überschriften', 'headings'));
      m.push(['arten', tx('ohne ', 'without ') + aus.join(', ')]);
    }
    if (S.aus.length) m.push(['aus', S.aus.length === 1 ? tx('ohne die Form ', 'without the form ') + S.aus[0] : tx('ohne ' + S.aus.length + ' Formen', 'without ' + S.aus.length + ' forms')]);
    return m;
  }
  function malFilter() {
    if (!C) return;
    if (document.body.classList.contains('rch-ruhe') || !C.S.q) { dom.filter.hidden = true; dom.filter.innerHTML = ''; return; }
    var m = aktiveFilter();
    dom.filter.hidden = !m.length;
    dom.filter.innerHTML = m.map(function (x) {
      return '<span class="pf"><span>' + esc(x[1]) + '</span><button type="button" data-filter-weg="' + esc(x[0]) + '" aria-label="' + esc(tx('Filter aufheben: ', 'Remove filter: ') + x[1]) + '">×</button></span>';
    }).join('') + (m.length > 1 ? '<button type="button" class="pf-alle" data-filter-weg="alle">' + tx('alle Filter aufheben', 'clear all filters') + '</button>' : '');
  }
  /** Erste Ansicht: der Knopf „Filter“ zählt, was gesetzt ist. */
  function malFilterAuf() {
    if (!C || !dom.filterAuf) return;
    var n = aktiveFilter().length, auf = document.body.classList.contains('rch-baende-auf');
    dom.filterAuf.innerHTML = tx('Filter', 'Filters') + (n ? ' <span class="pf-n">' + n + '</span>' : '');
    dom.filterAuf.setAttribute('aria-expanded', auf ? 'true' : 'false');
  }
  function filterWeg(was) {
    var S = C.S, alle = was === 'alle';
    if (alle || was === 'seiten') { if (S.seiten) S.baende = []; S.seiten = null; }
    // „alle Filter aufheben“ lässt die Wahl ganzer Autoren stehen: sie steht über den Stellen, nicht bei den Marken
    if (was === 'baende' || (alle && EDS.some(function (ed) { return gewaehlteEd()[ed] === 'mixed'; }))) { S.baende = []; S.seiten = null; }
    if (alle || was === 'werke') Z.werkwahl = [];
    if (was.indexOf('werk:') === 0) Z.werkwahl = Z.werkwahl.filter(function (k) { return k !== was.slice(5); });
    if (alle || was === 'jahre') S.jahre = null;
    if (alle || was === 'gattung') S.gattung = '';
    if (alle || was === 'hervor') { S.hervor = false; C.$('rch-hervor').setAttribute('aria-pressed', 'false'); }
    if (alle || was === 'arten') S.arten = { t: 1, n: 1, h: 1 };
    if (alle || was === 'aus') S.aus = [];
    C.malZeit(); C.malArten(); C.suche(true);
  }

  // ═════════════════════════════════════════════════════════════════════
  //  Stellen: Karte, Auswahl, Druckseite
  // ═════════════════════════════════════════════════════════════════════
  function schluessel(s) { return s.work + '|' + s.zitat; }
  function gemerkt(s) { var k = schluessel(s); return Z.liste.some(function (x) { return x.k === k; }); }
  function karte(s, ARTNAME) {
    var druck = C.leserLink(s, true), g = gemerkt(s);
    return '<article class="rch-stelle pk pk-' + s.ed + '" tabindex="-1" data-i="' + s.i + '" data-zitat="' + esc(s.zitat) + '" data-druck="' + esc(druck) + '">' +
      '<div class="rch-zitat">' + (EINE ? '' : '<span class="ei-autor">' + esc(NAME[s.ed] || C.edName(s.work)) + '</span>, ') + esc(s.zitat) +
      (ARTNAME[s.art] ? '<span class="art">' + ARTNAME[s.art] + '</span>' : '') + '</div>' +
      '<div class="pk-werk">' + (s.werk ? '<i>' + esc(s.werk) + '</i>' : '') + (s.jahr != null ? '<span class="j">' + s.jahr + '</span>' : '') + '</div>' +
      (s.abschnitt && s.abschnitt !== s.werk ? '<div class="rch-pfad">' + esc(s.abschnitt) + '</div>' : '') +
      '<p class="rch-text">' + s.html + '</p>' +
      '<div class="rch-wege"><button type="button" class="pk-seite" data-seite="' + s.i + '" aria-expanded="false">' + tx('Seite zeigen', 'Show page') + '</button>' +
      '<a href="' + esc(druck) + '">' + tx('Im Leser öffnen', 'Open in the reader') + '</a>' +
      '<button type="button" data-kopie="' + esc(s.zitat) + '">' + tx('Zitat kopieren', 'Copy citation') + '</button>' +
      '<button type="button" class="pk-merk" data-merk="' + s.i + '" aria-pressed="' + g + '">' + (g ? tx('Gemerkt', 'On your list') : tx('Merken', 'Add to list')) + '</button></div>' +
      '</article>';
  }
  function karteVon(i) { return C.results.querySelector('.rch-stelle[data-i="' + i + '"]'); }
  /** Die Druckseite klappt unter der Stelle auf; ein zweiter Klick schließt sie. Immer nur eine. */
  function schliesseSeite() {
    if (!dom.vorschau) return;
    var art = dom.vorschau.parentNode;
    if (art) {
      art.removeChild(dom.vorschau);
      var qp = art.querySelector && art.querySelector('.qp');
      if (qp) qp.remove();
    }
    C.results.querySelectorAll('.rch-stelle.pult-gewaehlt').forEach(function (a) {
      a.classList.remove('pult-gewaehlt');
      var b = a.querySelector('[data-seite]');
      if (b) { b.setAttribute('aria-expanded', 'false'); b.textContent = tx('Seite zeigen', 'Show page'); }
    });
    Z.gewaehlt = null; Z.seite = null;
  }
  function waehle(i) {
    var art = karteVon(i);
    if (!art) return;
    if (Z.gewaehlt === i) { schliesseSeite(); return; }
    schliesseSeite();
    Z.gewaehlt = i;
    art.classList.add('pult-gewaehlt');
    var b = art.querySelector('[data-seite]');
    if (b) { b.setAttribute('aria-expanded', 'true'); b.textContent = tx('Seite schließen', 'Close page'); }
    dom.vorschau.innerHTML = '<p class="pv-leer">' + tx('Die Seite wird gesetzt …', 'Setting the page …') + '</p>';
    art.appendChild(dom.vorschau);
    sende({ typ: 'seite', id: C.anfrage(), i: i });
  }
  function zeichneSeite(m) {
    if (m.i == null || m.id !== C.anfrage() || m.i !== Z.gewaehlt || !dom.vorschau.parentNode) return;
    Z.seite = m;
    var s = Z.karten[m.i], meta = [wer(m.ed) + m.sig];
    if (m.jahr != null) meta.push(m.jahr);
    if (GATTUNG[m.gattung]) meta.push(GATTUNG[m.gattung]);
    meta.push(tx('Seite ', 'page ') + m.buch);
    var seite = m.teile.map(function (t) {
      return '<div class="pv-teil pv-' + t.art + '">' + t.zeilen.map(function (z) {
        var nr = z.nr != null && (z.nr % 5 === 0 || z.hier) ? z.nr : '';
        return '<div class="pv-z' + (z.hier ? ' hier' : '') + '"><span class="nr">' + nr + '</span><span class="tx">' + z.html + '</span></div>';
      }).join('') + '</div>';
    }).join('');
    dom.vorschau.innerHTML =
      '<header class="pv-kopf"><p><b>' + esc(m.werk || '') + '</b><span class="pv-meta">' + esc(meta.join(' · ')) + '</span></p>' +
      '<button type="button" class="pv-zu" data-pv="zu" aria-label="' + tx('Seite schließen', 'close page') + '">×</button></header>' +
      '<div class="pv-leib" tabindex="0"><div class="pv-seite pv-ed-' + m.ed + '">' + seite + '</div></div>' +
      '<footer class="pv-fuss"><nav class="pv-blatt" aria-label="' + tx('Blättern', 'Turn pages') + '">' +
      (m.vor != null ? '<button type="button" data-pv="seite" data-pdf="' + m.vor + '">‹ ' + tx('S. ', 'p. ') + esc(m.vorBuch) + '</button>' : '') +
      (!m.eigeneSeite ? '<button type="button" data-pv="heim">' + tx('zur Stelle', 'back to the passage') + '</button>' : '') +
      (m.nach != null ? '<button type="button" data-pv="seite" data-pdf="' + m.nach + '">' + tx('S. ', 'p. ') + esc(m.nachBuch) + ' ›</button>' : '') +
      '</nav>' +
      (s ? '<span class="pv-wege"><button type="button" class="qp-knopf" data-parallel="' + s.i + '" title="' + (EINE ? tx('Ähnliche Stellen in der Ausgabe', 'Similar passages in the edition') : tx('Ähnliche Stellen bei Fichte, Schelling und Hegel', 'Similar passages in Fichte, Schelling, and Hegel')) + '">' + tx('Parallelstellen', 'Parallel passages') + '</button>' +
        '<a href="' + esc(C.leserLink(s, false)) + '">' + tx('Lesefassung', 'Reading text') + '</a>' +
        '<a class="pv-auf" href="' + esc(C.leserLink(s, true)) + '">' + tx('Im Druckbild öffnen', 'Open in print layout') + '</a></span>' : '') +
      '</footer>';
    passeSeiteEin();
    var hier = dom.vorschau.querySelector('.pv-z.hier'), leib = dom.vorschau.querySelector('.pv-leib');
    if (hier && leib) leib.scrollTop = Math.max(0, hier.offsetTop - leib.offsetTop - leib.clientHeight * 0.3);
  }
  /** Druckzeilen sollen Zeilen bleiben: die Schrift der Seite wird so weit verkleinert, dass die längste Zeile
   *  in die Spalte passt, aber nicht unter 9,5 px. Fehlt wenig, bleibt es bei 9,5 px und die längsten Zeilen
   *  brechen mit Einzug um; fehlt viel (Telefon), bleibt die gewöhnliche Größe. */
  function passeSeiteEin() {
    var seite = dom.vorschau && dom.vorschau.querySelector('.pv-seite');
    if (!seite || !seite.offsetParent) return;
    seite.style.fontSize = '';
    seite.classList.add('pv-zeilen');
    var breite = 0, platz = 0;
    seite.querySelectorAll('.pv-z .tx').forEach(function (t) { if (t.scrollWidth > breite) breite = t.scrollWidth; if (!platz) platz = t.clientWidth; });
    if (!platz || breite <= platz) return;
    var px = parseFloat(getComputedStyle(seite).fontSize) * platz / breite * 0.975;
    if (px >= 9.5) { seite.style.fontSize = px.toFixed(2) + 'px'; return; }
    seite.classList.remove('pv-zeilen');
    if (px >= 8.2) seite.style.fontSize = '9.5px';
  }

  // ═════════════════════════════════════════════════════════════════════
  //  Merkliste und Export (nur in diesem Browser)
  // ═════════════════════════════════════════════════════════════════════
  var exportArt = 'fuss';
  function merke(i) {
    var s = Z.karten[i];
    if (!s) return;
    var k = schluessel(s), ix = -1;
    Z.liste.forEach(function (x, j) { if (x.k === k) ix = j; });
    if (ix >= 0) Z.liste.splice(ix, 1);
    else Z.liste.push({ k: k, ed: s.ed, zitat: s.zitat, werk: s.werk || s.title, jahr: s.jahr, text: klartext(s.html), url: C.leserLink(s, true), q: C.S.q, notiz: '' });
    lager('idealismus-merkliste', Z.liste);
    C.toast(ix >= 0 ? tx('Von der Merkliste genommen', 'Removed from the list') : tx('Gemerkt', 'Added to the list'), wer(s.ed) + s.zitat);
    malGemerkt(); malAblage();
    if (!dom.export.hidden) malExport();
  }
  function malGemerkt() {
    C.results.querySelectorAll('[data-merk]').forEach(function (b) {
      var s = Z.karten[+b.dataset.merk], g = s && gemerkt(s);
      b.setAttribute('aria-pressed', g ? 'true' : 'false');
      b.textContent = g ? tx('Gemerkt', 'On your list') : tx('Merken', 'Add to list');
    });
  }
  function malAblage() {
    if (!dom.ablage) return;
    var n = Z.liste.length, an = n > 0;
    document.body.classList.toggle('pult-ablage-an', an);
    if (!an) { dom.ablage.innerHTML = ''; return; }
    dom.ablage.innerHTML = '<b>' + tx('Merkliste', 'Working list') + '</b><span class="pa-zahl">' + zahl(n) + ' ' + (n === 1 ? tx('Stelle', 'passage') : tx('Stellen', 'passages')) + '</span>' +
      '<span class="pa-sigel">' + Z.liste.slice(-6).reverse().map(function (x) { return esc(wer(x.ed) + x.zitat); }).join(' · ') + '</span>' +
      '<span class="pa-tasten" aria-hidden="true"><kbd>j</kbd><kbd>k</kbd> ' + tx('weiter, zurück', 'next, previous') + ' <kbd>s</kbd> ' + tx('merken', 'save') + '</span>' +
      '<button type="button" id="pult-ablage-auf" aria-expanded="' + !dom.export.hidden + '">' + tx('Ansehen und exportieren', 'View and export') + '</button>';
  }
  function sauber(t) { return t.replace(/^\[…\]\s*/, '… ').replace(/\s*\[…\]$/, ' …').replace(/\s*\[…\]\s*/g, ' … '); }
  function exportText(art) {
    var L = Z.liste;
    if (art === 'fuss') return L.map(function (x) { return NAME[x.ed] + ', ' + x.zitat + ': „' + sauber(x.text) + '“' + (x.notiz ? ' [' + x.notiz + ']' : ''); }).join('\n\n');
    if (art === 'md') return L.map(function (x) {
      return '> ' + sauber(x.text) + '\n>\n> — ' + NAME[x.ed] + (x.werk ? ', *' + x.werk + '*' : '') + (x.jahr != null ? ' (' + x.jahr + ')' : '') + ', ' + x.zitat + (x.notiz ? '\n\n' + x.notiz : '');
    }).join('\n\n');
    if (art === 'sigel') return L.map(function (x) { return NAME[x.ed] + ', ' + x.zitat; }).join('\n');
    function feld(s) { s = String(s == null ? '' : s); return /[";\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; }
    return '﻿' + [[tx('Autor', 'Author'), tx('Stelle', 'Citation'), tx('Werk', 'Work'), tx('Jahr', 'Year'), 'Text', tx('Notiz', 'Note'), tx('Anfrage', 'Query'), tx('Adresse', 'Address')].join(';')]
      .concat(L.map(function (x) { return [NAME[x.ed], x.zitat, x.werk, x.jahr, sauber(x.text), x.notiz, x.q, x.url].map(feld).join(';'); })).join('\r\n') + '\r\n';
  }
  function malExport() {
    var arten = [['fuss', tx('Zitate mit Text', 'Quotations')], ['md', 'Markdown'], ['sigel', tx('nur Siglen', 'Citations only')], ['csv', 'CSV']];
    dom.export.innerHTML = '<header><b>' + tx('Merkliste', 'Working list') + '</b><span>' + tx('bleibt in diesem Browser', 'kept in this browser') + '</span>' +
      '<button type="button" data-ex="zu" aria-label="' + tx('schließen', 'close') + '">×</button></header>' +
      '<ol class="pe-liste">' + Z.liste.map(function (x, i) {
        return '<li class="pk-' + x.ed + '"><div><a href="' + esc(x.url) + '">' + esc(wer(x.ed) + x.zitat) + '</a>' + (x.werk ? ' <i>' + esc(x.werk) + '</i>' : '') +
          '<p>' + esc(sauber(x.text).slice(0, 220)) + (x.text.length > 220 ? ' …' : '') + '</p>' +
          '<input type="text" data-notiz="' + i + '" value="' + esc(x.notiz || '') + '" placeholder="' + tx('Notiz', 'Note') + '" aria-label="' + tx('Notiz zu dieser Stelle', 'Note on this passage') + '"></div>' +
          '<button type="button" data-ex="weg" data-i="' + i + '" aria-label="' + tx('von der Liste nehmen', 'remove from the list') + '">×</button></li>';
      }).join('') + '</ol>' +
      '<div class="pe-arten" role="group" aria-label="' + tx('Format', 'Format') + '">' + arten.map(function (a) {
        return '<button type="button" data-ex="art" data-art="' + a[0] + '" aria-pressed="' + (exportArt === a[0]) + '">' + a[1] + '</button>';
      }).join('') + '</div>' +
      '<pre class="pe-text" tabindex="0">' + esc(exportText(exportArt).replace(/^﻿/, '')) + '</pre>' +
      '<footer><button type="button" data-ex="leeren">' + tx('Liste leeren', 'Empty the list') + '</button><span></span>' +
      '<button type="button" data-ex="datei">' + tx('Als Datei speichern', 'Save as file') + '</button>' +
      '<button type="button" class="pe-haupt" data-ex="kopie">' + tx('Kopieren', 'Copy') + '</button></footer>';
  }
  function oeffneExport() { if (!Z.liste.length) return; malExport(); dom.export.hidden = false; malAblage(); }
  function schliesseExport() { if (dom.export && !dom.export.hidden) { dom.export.hidden = true; malAblage(); } }
  function speichereDatei() {
    var end = exportArt === 'csv' ? 'csv' : exportArt === 'md' ? 'md' : 'txt', name = 'idealismus-merkliste.' + end;
    var blob = new Blob([exportText(exportArt)], { type: (end === 'csv' ? 'text/csv' : 'text/plain') + ';charset=utf-8' }), a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
    C.toast(tx('Gespeichert', 'Saved'), name);
  }

  // ═════════════════════════════════════════════════════════════════════
  //  Das Feld: Wörter, Zitate, Werke, Tippfehler
  // ═════════════════════════════════════════════════════════════════════
  var ROEM = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX', 'XXI', 'XXII'];
  /** „GW 9, 23“, „SW I/3, 511,24“, „NW II“: Reihe, Band, Seite, Zeile. */
  function zitatLesen(q) {
    var m = /^\s*(GW|SW|NW)\.?\s*((?:[IVX]+|\d+)(?:\s*\/\s*\d+)?)(?:\s*[,:;]?\s*(?:S\.|p\.|pp\.)?\s*(\d+|[ivxlc]+)(?:\s*[,.:]\s*(?:Z\.)?\s*(\d+))?)?\s*$/i.exec(q || '');
    if (!m) return null;
    return { reihe: m[1].toUpperCase(), band: m[2].toUpperCase().replace(/\s+/g, ''), seite: m[3] ? (/^\d+$/.test(m[3]) ? +m[3] : m[3].toUpperCase()) : null, zeile: m[4] ? +m[4] : null };
  }
  /** Die Bände, die ein Sigel meinen kann: Fichtes SW VII und Schellings SW I/7 (durchgezählt VII) heißen beide „SW VII“. */
  function baendeZu(z) {
    var B = C.baende().length ? C.baende() : (window.HEGEL_EDITION_BAENDE || []);
    var ziele = [z.reihe + z.band], n = /^\d+$/.test(z.band) ? +z.band : ROEM.indexOf(z.band);
    if (n > 0) {
      if (z.reihe === 'GW') ziele.push('GW' + n);
      else {
        if (ROEM[n]) ziele.push(z.reihe + ROEM[n]);
        if (z.reihe === 'SW' && n <= 14) ziele.push(n <= 10 ? 'SWI/' + n : 'SWII/' + (n - 10));
      }
    }
    return B.filter(function (b) { return ziele.indexOf(b.sig.toUpperCase().replace(/\s+/g, '')) >= 0; });
  }
  function zitatOptionen(z) {
    return baendeZu(z).map(function (b) {
      var ed = C.edVon(b.work), k = b.work + '|' + (z.seite == null ? '' : z.seite) + '|' + (z.zeile == null ? '' : z.zeile);
      if (z.seite != null && !(k in Z.orte) && C.bereit()) { Z.orte[k] = null; sende({ typ: 'ort', id: k, work: b.work, buch: z.seite, zeile: z.zeile }); }
      return { art: 'zitat', k: k, ed: ed, work: b.work, sig: b.sig, titel: b.title, seite: z.seite, zeile: z.zeile };
    });
  }
  function zitatLink(o) {
    var ort = Z.orte[o.k];
    if (o.seite == null) return C.EDITIONEN[o.ed].url + '/text?work=' + encodeURIComponent(o.work);
    if (!ort || ort.pdf == null) return null;
    return C.leserLink({ work: o.work, woerter: [], ziel: { pdf: ort.pdf, von: ort.zeile, bis: ort.zeile } }, true);
  }
  function empfangeOrt(m) {
    Z.orte[m.id] = m;
    if (Z.sprung === m.id) { Z.sprung = null; var o = { k: m.id, work: m.work, ed: C.edVon(m.work), seite: m.buch }, l = zitatLink(o); if (l) { location.href = l; return; } }
    if (!dom.vorschlag.hidden) malVorschlag(Z.vletzte || { woerter: [], aehnlich: [], werke: [] });
    malZitatLeer();
  }
  function letztesWort() {
    var v = C.input.value, ende = C.input.selectionStart == null ? v.length : C.input.selectionStart;
    if (ende !== v.length) return null;
    var m = /(^|[\s(])(=?)([\p{L}\p{N}]{2,})$/u.exec(v);
    if (!m || /^(AND|OR|NOT|UND|ODER|NICHT|SATZ|SENTENCE|NEAR|NAH|BEFORE|VOR)$/.test(m[3])) return null;
    var vorher = v.slice(0, m.index + m[1].length);
    if ((vorher.match(/"/g) || []).length % 2) return null;
    return { wort: m[3], von: m.index + m[1].length + m[2].length };
  }
  function schlicht(q) { return /^[\p{L}\p{N}\s.,'’-]+$/u.test(q); }
  function fordereVorschlag() {
    if (!C || document.activeElement !== C.input) return;
    var q = C.input.value.trim(), zit = zitatLesen(q), lw = letztesWort();
    Z.vzeit = Date.now();
    Z.vzitat = zit ? zitatOptionen(zit) : [];
    var w = q.split(/\s+/);
    Z.vbezug = w.length === 2 && w.every(function (x) { return /^[\p{L}][\p{L}\p{N}-]+$/u.test(x) && !/^[A-ZÄÖÜ]{2,}$/.test(x); }) ? w : null;
    if (!q) { schliesseVorschlag(); return; }
    if (C.bereit() && !zit && (lw || (q.length >= 3 && schlicht(q)))) {
      sende({ typ: 'pultvorschlag', id: ++Z.vid, wort: lw ? lw.wort : '', titel: schlicht(q) ? q : '' });
      if (Z.vbezug) malVorschlag(Z.vletzte && Z.vletzte.fuer === q ? Z.vletzte : { woerter: [], aehnlich: [], werke: [] });
    } else { ++Z.vid; malVorschlag({ woerter: [], aehnlich: [], werke: [] }); }
  }
  function zeigeVorschlag(m) {
    if (m.zweck === 'leer') { zeigeAehnliche(m); return; }
    if (m.id !== Z.vid || document.activeElement !== C.input) return;
    m.fuer = C.input.value.trim();
    malVorschlag(m);
  }
  function malVorschlag(m) {
    Z.vletzte = m;
    var lw = letztesWort(), L = [], html = '';
    function kopf(t) { html += '<li class="kopf" role="presentation">' + t + '</li>'; }
    function zeile(o, innen) { var i = L.push(o) - 1; html += '<li role="option" id="pv-' + i + '" data-i="' + i + '" aria-selected="false"' + (o.aus ? ' aria-disabled="true" class="aus"' : '') + '>' + innen + '</li>'; }
    if (Z.vzitat.length) {
      kopf(tx('Zitat', 'Citation'));
      Z.vzitat.forEach(function (o) {
        var ort = Z.orte[o.k], wo = wer(o.ed) + o.sig + (o.seite != null ? ', ' + tx('Seite ', 'page ') + o.seite : '') + (o.zeile != null ? ', ' + tx('Zeile ', 'line ') + o.zeile : '');
        var fehlt = o.seite != null && ort && ort.pdf == null;
        o.aus = fehlt;
        zeile(o, '<span class="vz">§</span><span><b>' + esc(wo) + '</b> <span class="vd">' + esc(o.titel) + '</span></span><span class="n">' +
          (fehlt ? tx('diese Seite hat der Band nicht', 'no such page in this volume') + (ort.von != null ? ' (' + ort.von + '–' + ort.bis + ')' : '')
                 : o.seite != null && !ort ? tx('wird gesucht …', 'looking it up …') : tx('im Leser öffnen', 'open in the reader')) + '</span>');
      });
    }
    if (m.werke && m.werke.length) {
      kopf(tx('Zu einem Werk', 'Go to a work'));
      m.werke.forEach(function (x) {
        zeile({ art: 'werk', x: x }, '<span class="vz">❧</span><span><b>' + esc(x.titel) + '</b></span><span class="n">' + esc(wer(x.ed) + x.sig + (x.jahr != null ? ' · ' + x.jahr : '')) + '</span>');
      });
    }
    var woerter = (m.woerter || []).filter(function (x) { return !lw || x.form.toLowerCase() !== lw.wort.toLowerCase() || m.woerter.length > 1; });
    if (lw && woerter.length) {
      kopf(tx('Wörter der Ausgabe', 'Words in the edition'));
      woerter.forEach(function (x) { zeile({ art: 'wort', form: x.form }, '<span class="vz"></span><span>' + esc(x.form) + '</span><span class="n">' + zahl(x.n) + '</span>'); });
    }
    if (lw && m.aehnlich && m.aehnlich.length) {
      kopf(tx('Dieses Wort steht nicht in der Ausgabe. Gemeint vielleicht', 'This word is not in the edition. Perhaps you mean'));
      m.aehnlich.forEach(function (x) { zeile({ art: 'wort', form: x.form, gleich: true }, '<span class="vz">≈</span><span><b>' + esc(x.form) + '</b></span><span class="n">' + zahl(x.n) + '</span>'); });
    }
    if (Z.vbezug) {
      var a = Z.vbezug[0], b = Z.vbezug[1];
      kopf(tx('Zwei Wörter: wie sollen sie zueinander stehen?', 'Two words: how should they relate?'));
      [['"' + a + ' ' + b + '"', tx('als genaue Wortfolge', 'as an exact phrase')], [a + ' NEAR/8 ' + b, tx('höchstens acht Wörter voneinander', 'within eight words')],
       [a + ' SENTENCE ' + b, tx('im selben Satz', 'in the same sentence')]].forEach(function (x) {
        zeile({ art: 'anfrage', q: x[0] }, '<span class="vz"></span><span>' + esc(x[0]) + ' <span class="vd">' + x[1] + '</span></span>');
      });
    }
    if (!L.length) { schliesseVorschlag(); return; }
    html += '<li class="fuss" role="presentation"><span><code>"…"</code> ' + tx('Wendung', 'phrase') + '</span><span><code>NEAR/8</code> ' + tx('Nähe', 'proximity') +
      '</span><span><code>*</code> ' + tx('Wortanfang, Wortende', 'any beginning or ending') + '</span><span><code>~</code> ' + tx('gebeugte Formen', 'inflected forms') +
      '</span><span><code>=</code> ' + tx('nur diese Schreibung', 'this spelling only') + '</span></li>';
    Z.vliste = L;
    dom.vorschlag.innerHTML = html;
    dom.vorschlag.hidden = false;
    C.input.setAttribute('aria-expanded', 'true');
    // Ein Zitat ist eindeutig gemeint: Enter öffnet es
    markiere(Z.vzitat.length && !L[0].aus ? 0 : -1);
  }
  function schliesseVorschlag() {
    if (!dom.vorschlag) return;
    dom.vorschlag.hidden = true; dom.vorschlag.innerHTML = '';
    Z.vliste = []; Z.vwahl = -1; ++Z.vid;   // eine Antwort, die noch unterwegs ist, öffnet die Liste nicht wieder
    C.input.setAttribute('aria-expanded', 'false'); C.input.removeAttribute('aria-activedescendant');
  }
  function markiere(i) {
    dom.vorschlag.querySelectorAll('li[role="option"]').forEach(function (li, k) { li.setAttribute('aria-selected', k === i ? 'true' : 'false'); });
    Z.vwahl = i;
    if (i >= 0) C.input.setAttribute('aria-activedescendant', 'pv-' + i); else C.input.removeAttribute('aria-activedescendant');
  }
  function setzeAnfrage(q, neu) {
    C.input.value = q; C.spiegeln();
    C.S.q = q.trim(); C.S.aus = []; C.S.seiten = null;
    if (neu) C.merkeZuletzt(C.S.q);
    C.suche(!!neu);
  }
  function nimm(i) {
    var o = Z.vliste[i];
    if (!o || o.aus) return;
    if (o.art === 'zitat') {
      var l = zitatLink(o);
      if (l) location.href = l; else { Z.sprung = o.k; C.starte(); }
      return;
    }
    if (o.art === 'werk') {
      var e = C.EDITIONEN[o.x.ed];
      location.href = (e && e.url ? e.url : '') + '/text?work=' + encodeURIComponent(o.x.work) + (o.x.pdf != null ? '#page-' + o.x.pdf : '');
      return;
    }
    if (o.art === 'anfrage') { schliesseVorschlag(); setzeAnfrage(o.q, true); C.input.focus(); return; }
    var lw = letztesWort();
    if (!lw) return;
    var q = C.input.value.slice(0, lw.von) + o.form + (o.gleich ? '' : ' ');
    schliesseVorschlag();
    setzeAnfrage(q, !!o.gleich);
    C.input.focus();
  }

  // Keine Stelle: Tippfehler auffangen, Zitate anbieten
  function fragNachAehnlichen() {
    malZitatLeer();
    var woerter = (C.S.q.match(/[\p{L}]{4,}/gu) || []).filter(function (w) { return !/^(AND|OR|NOT|UND|ODER|NICHT|SATZ|SENTENCE|NEAR|BEFORE)$/.test(w); }).slice(0, 3);
    woerter.forEach(function (w) { sende({ typ: 'pultvorschlag', id: 0, wort: w, zweck: 'leer' }); });
  }
  function zeigeAehnliche(m) {
    var leer = C.results.querySelector('.rch-leer ul');
    if (!leer || !m.aehnlich.length || C.S.q.indexOf(m.wort) < 0) return;
    var li = el('li', 'pult-gemeint', null, tx('Statt „' + esc(m.wort) + '“ vielleicht: ', 'Instead of “' + esc(m.wort) + '” perhaps: ') + m.aehnlich.map(function (x) {
      return '<a href="#" data-ersatz="' + esc(x.form) + '" data-fuer="' + esc(m.wort) + '"><b>' + esc(x.form) + '</b></a> <span class="n">' + zahl(x.n) + '</span>';
    }).join(', '));
    leer.insertBefore(li, leer.firstChild);
  }
  function malZitatLeer() {
    var zit = zitatLesen(C.S.q), box = C.results.querySelector('.rch-leer');
    if (!zit || !box) return;
    var alt = box.querySelector('.pult-zitat'); if (alt) alt.remove();
    var opt = zitatOptionen(zit);
    if (!opt.length) return;
    var div = el('div', 'pult-zitat', null, '<p>' + tx('Das sieht nach einem Zitat aus:', 'This looks like a citation:') + '</p>' + opt.map(function (o) {
      var l = zitatLink(o), ort = Z.orte[o.k], wo = wer(o.ed) + o.sig + (o.seite != null ? ', ' + tx('Seite ', 'page ') + o.seite : '') + (o.zeile != null ? ', ' + tx('Zeile ', 'line ') + o.zeile : '');
      return l ? '<a href="' + esc(l) + '">' + esc(wo) + ' ' + tx('im Leser öffnen', 'open in the reader') + '</a>'
               : '<span>' + esc(wo) + (ort && ort.pdf == null ? ': ' + tx('diese Seite hat der Band nicht', 'no such page in this volume') : ' …') + '</span>';
    }).join(''));
    box.insertBefore(div, box.firstChild);
  }

  // ═════════════════════════════════════════════════════════════════════
  //  Suchformular („Erweitert“): schreibt die Anfrage ins Feld, ohne dass man die Suchsprache kennen muss
  // ═════════════════════════════════════════════════════════════════════
  function formLeer() { return { alle: '', wendung: '', eines: '', keines: '', a: '', b: '', n: 8, art: 'NEAR', schreibung: 'alle' }; }
  var F = formLeer();
  var OPERATOR = /^(AND|OR|NOT|UND|ODER|NICHT|SATZ|SENTENCE|(NEAR|NAH|BEFORE|VOR)(\/\d+)?)$/;
  function formWoerter(s) {
    return String(s || '').split(/[\s,;]+/).map(function (w) { return w.replace(/^[=("„“”]+|[~)"“”.]+$/g, ''); }).filter(function (w) { return w && !OPERATOR.test(w); });
  }
  /** Ein Wort mit der gewählten Schreibung: =Wort nur genau so, Wort~ auch gebeugt. Muster (* ?) bleiben, wie sie sind. */
  function formWort(w) { return /[*?]/.test(w) ? w : F.schreibung === 'exakt' ? '=' + w : F.schreibung === 'formen' ? w + '~' : w; }
  function formAnfrage() {
    var t = [], a = formWoerter(F.a)[0], b = formWoerter(F.b)[0];
    formWoerter(F.alle).forEach(function (w) { t.push(formWort(w)); });
    var wendung = F.wendung.replace(/["„“”]/g, ' ').replace(/\s+/g, ' ').trim();
    if (wendung) t.push('"' + wendung + '"');
    var eines = formWoerter(F.eines).map(formWort);
    if (eines.length === 1) t.push(eines[0]); else if (eines.length) t.push('(' + eines.join(' OR ') + ')');
    if (a && b) t.push('(' + formWort(a) + ' ' + (F.art === 'SENTENCE' ? 'SENTENCE' : F.art + '/' + F.n) + ' ' + formWort(b) + ')');
    if (!t.length) return '';
    return t.join(' ') + formWoerter(F.keines).map(function (w) { return ' NOT ' + formWort(w); }).join('');
  }
  /** Eine Anfrage zurück in die Felder lesen, soweit sie aus dem Formular stammen könnte; sonst null. */
  function formLies(q) {
    var f = formLeer(), r = ' ' + (q || '') + ' ', m, keine = [];
    if ((m = /"([^"]+)"/.exec(r))) { f.wendung = m[1]; r = r.replace(m[0], ' '); }
    if ((m = /\(?\s*([^\s()"]+)\s+(NEAR|NAH|BEFORE|VOR)\/(\d+)\s+([^\s()"]+)\s*\)?/.exec(r))) {
      f.a = m[1]; f.b = m[4]; f.n = +m[3]; f.art = /NEAR|NAH/.test(m[2]) ? 'NEAR' : 'BEFORE'; r = r.replace(m[0], ' ');
    } else if ((m = /\(?\s*([^\s()"]+)\s+(SENTENCE|SATZ)\s+([^\s()"]+)\s*\)?/.exec(r))) {
      f.a = m[1]; f.b = m[3]; f.art = 'SENTENCE'; r = r.replace(m[0], ' ');
    }
    if ((m = /\(([^()"]*\s(?:OR|ODER)\s[^()"]*)\)/.exec(r))) { f.eines = m[1].split(/\s+(?:OR|ODER)\s+/).join(' ').trim(); r = r.replace(m[0], ' '); }
    r = r.replace(/\s(?:NOT|NICHT)\s+([^\s()"]+)/g, function (_, w) { keine.push(w); return ' '; });
    f.keines = keine.join(' ');
    if (/["()]/.test(r) || r.split(/\s+/).some(function (w) { return OPERATOR.test(w); })) return null;
    f.alle = r.replace(/\s+/g, ' ').trim();
    var alle = [f.alle, f.eines, f.keines, f.a, f.b].join(' ').split(/\s+/).filter(Boolean);
    if (alle.length && alle.every(function (w) { return w.charAt(0) === '='; })) f.schreibung = 'exakt';
    else if (alle.length && alle.every(function (w) { return /~$/.test(w); })) f.schreibung = 'formen';
    ['alle', 'eines', 'keines', 'a', 'b'].forEach(function (k) { f[k] = f[k].split(/\s+/).map(function (w) { return w.replace(/^=|~$/g, ''); }).join(' ').trim(); });
    return f;
  }
  function formFeld(k, name, beispiel) {
    return '<label class="pfo-zeile"><span class="pfo-lab">' + name + '</span><input type="text" data-f="' + k + '" spellcheck="false" autocapitalize="off" autocomplete="off"' +
      (beispiel ? ' placeholder="' + beispiel + '"' : '') + '></label>';
  }
  function malFormular() {
    var arten = [['NEAR', tx('nahe bei', 'near')], ['BEFORE', tx('vor', 'before')], ['SENTENCE', tx('im selben Satz wie', 'in the same sentence as')]];
    var schreibung = [['alle', tx('jede Schreibung der Zeit', 'every period spelling'), tx('Sein findet auch Seyn', 'Sein also finds Seyn')],
                      ['exakt', tx('nur genau diese Schreibung', 'this exact spelling only'), tx('Sein findet nur Sein', 'Sein finds only Sein')],
                      ['formen', tx('auch gebeugte Formen', 'inflected forms too'), tx('Begriff findet Begriffe, Begriffs', 'Begriff finds Begriffe, Begriffs')]];
    dom.formular.innerHTML = '<div class="pfo-felder">' +
      formFeld('alle', tx('Alle diese Wörter', 'All of these words'), tx('etwa: Begriff Idee', 'e.g. Begriff Idee')) +
      formFeld('wendung', tx('Genau diese Wendung', 'This exact phrase'), tx('etwa: an und für sich', 'e.g. an und für sich')) +
      formFeld('eines', tx('Eines dieser Wörter', 'Any of these words'), tx('etwa: Seyn Wesen', 'e.g. Seyn Wesen')) +
      formFeld('keines', tx('Keines dieser Wörter', 'None of these words'), '') +
      '<div class="pfo-zeile pfo-naehe"><span class="pfo-lab">' + tx('Zwei Wörter beieinander', 'Two words together') + '</span><span class="pfo-reihe">' +
      '<input type="text" data-f="a" spellcheck="false" autocapitalize="off" autocomplete="off" placeholder="' + tx('Wort', 'word') + '" aria-label="' + tx('erstes Wort', 'first word') + '">' +
      '<select data-f="art" aria-label="' + tx('Verhältnis der beiden Wörter', 'How the two words relate') + '">' + arten.map(function (a) { return '<option value="' + a[0] + '">' + a[1] + '</option>'; }).join('') + '</select>' +
      '<input type="text" data-f="b" spellcheck="false" autocapitalize="off" autocomplete="off" placeholder="' + tx('Wort', 'word') + '" aria-label="' + tx('zweites Wort', 'second word') + '">' +
      '<span class="pfo-abstand">' + tx('höchstens', 'at most') + ' <input type="number" data-f="n" min="1" max="99" aria-label="' + tx('Abstand in Wörtern', 'distance in words') + '"> ' + tx('Wörter Abstand', 'words apart') + '</span>' +
      '</span></div></div>' +
      '<div class="pfo-schreibung" role="radiogroup" aria-label="' + tx('Schreibung und Formen', 'Spelling and word forms') + '"><span class="pfo-lab">' + tx('Schreibung und Formen', 'Spelling and word forms') + '</span>' +
      schreibung.map(function (x) { return '<button type="button" role="radio" data-schr="' + x[0] + '" aria-checked="false"><b>' + x[1] + '</b><span>' + x[2] + '</span></button>'; }).join('') + '</div>' +
      '<div class="pfo-fuss"><span class="pfo-anfrage" id="pfo-anfrage" aria-live="polite"></span>' +
      '<button type="button" data-fo="leer">' + tx('Felder leeren', 'Clear fields') + '</button>' +
      '<button type="button" class="pfo-los" data-fo="los">' + tx('Suchen', 'Search') + '</button></div>';
    fuelleFormular();
  }
  function formVorschau() {
    var q = formAnfrage(), a = document.getElementById('pfo-anfrage');
    dom.formular.classList.toggle('pfo-satz', F.art === 'SENTENCE');
    dom.formular.querySelectorAll('[data-schr]').forEach(function (b) { b.setAttribute('aria-checked', b.dataset.schr === F.schreibung ? 'true' : 'false'); });
    if (a) a.innerHTML = q ? tx('Anfrage: ', 'Query: ') + '<code>' + esc(q) + '</code>' : esc(Z.formHinweis || tx('Mindestens ein Wort oder eine Wendung eintragen.', 'Enter at least one word or phrase.'));
  }
  function fuelleFormular() {
    dom.formular.querySelectorAll('[data-f]').forEach(function (e) { e.value = F[e.dataset.f]; });
    formVorschau();
  }
  function formularAuf(auf) {
    dom.formular.hidden = !auf;
    dom.formKnopf.setAttribute('aria-expanded', auf ? 'true' : 'false');
    if (!auf) return;
    schliesseVorschlag();
    var f = formLies(C.input.value);
    Z.formHinweis = f ? '' : tx('Die Anfrage im Feld ist von Hand geschrieben; das Formular beginnt leer.', 'The query in the field was written by hand; the form starts empty.');
    F = f || formLeer();
    fuelleFormular();
    var erst = dom.formular.querySelector('[data-f="alle"]');
    if (erst) erst.focus();
  }
  function formularLos() {
    var q = formAnfrage();
    if (!q) { C.toast(tx('Das Formular ist leer', 'The form is empty')); return; }
    formularAuf(false);
    setzeAnfrage(q, true);
  }

  // ═════════════════════════════════════════════════════════════════════
  //  Erste Ansicht: Zahlen der Beispiele, vier kleine Ansichten
  // ═════════════════════════════════════════════════════════════════════
  var PROBE = 'Anschauung';
  function fordereStart() {
    if (Z.startGefragt || !document.querySelector('.pl-beispiele')) return;
    Z.startGefragt = true;
    var c = lager('idealismus-pultstart'), qs = [];
    document.querySelectorAll('.pl-beispiele [data-q]').forEach(function (b) { qs.push(b.dataset.q); });
    sende({ typ: 'pultstart', id: ++Z.startId, beispiele: qs, probe: PROBE, stand: c && c.zahlen && qs.every(function (q) { return q in c.zahlen; }) ? c.stand : null });
  }
  function empfangeStart(m) {
    if (m.gleich) return;
    lager('idealismus-pultstart', { stand: m.stand, zahlen: m.zahlen, probe: m.probe });
    zeigeStart(m);
  }
  function zeigeStartAusLager() {
    var c = lager('idealismus-pultstart');
    if (c) zeigeStart(c);
    var b = lager('idealismus-bezuege');
    if (b && window.Quer && window.QuerCtx) try { window.Quer.bezuege(b); } catch (_) {}
  }
  function zeigeStart(d) {
    document.querySelectorAll('.pl-beispiele [data-q]').forEach(function (b) {
      var z = d.zahlen && d.zahlen[b.dataset.q], n = b.querySelector('[data-zahl]');
      if (n && z) n.textContent = zahl(z.stellen) + ' ' + (z.stellen === 1 ? tx('Stelle', 'passage') : tx('Stellen', 'passages'));
    });
    var p = d.probe, feld = document.getElementById('pl-ansichten');
    if (!p || p.leer || !feld) return;
    function bild(name, html) { var e = feld.querySelector('[data-bild="' + name + '"]'); if (e) e.innerHTML = html; }
    bild('kwic', '<span class="pb-kwic">' + p.kwic.map(function (k) { return '<span><span>' + esc(k.links) + '</span><mark>' + esc(k.wort) + '</mark><span>' + esc(k.rechts) + '</span></span>'; }).join('') + '</span>');
    var max = 0.0001;
    p.jeBand.forEach(function (b) { b.d = b.woerter ? b.n / b.woerter : 0; if (b.d > max) max = b.d; });
    bild('baende', '<span class="pb-saeulen">' + p.jeBand.map(function (b) { return '<i class="pb-' + b.ed + '" style="height:' + Math.max(b.n ? 4 : 1, b.d / max * 100).toFixed(0) + '%"></i>'; }).join('') + '</span>');
    var dm = 0.0001;
    EDS.forEach(function (ed) { var e = p.je[ed]; e.d = e.woerter ? e.vorkommen / e.woerter * 1e4 : 0; if (e.d > dm) dm = e.d; });
    bild('autoren', '<span class="pb-drei">' + EDS.map(function (ed) { return '<span><em>' + dichte(p.je[ed].d) + '</em><i class="pb-' + ed + '" style="height:' + (p.je[ed].d / dm * 100).toFixed(0) + '%"></i></span>'; }).join('') + '</span>');
    var W = 220, H = 70, N = fenster(p.je[EDS[0]].n).length, zm = 0.0001, linien = {};
    EDS.forEach(function (ed) {
      var ws = fenster(p.je[ed].w);
      linien[ed] = fenster(p.je[ed].n).map(function (n, j) { var w = ws[j]; var v = w >= 20000 ? n / w * 1e4 : null; if (v > zm) zm = v; return v; });
    });
    bild('zeit', '<svg class="pb-zeit" viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="none" aria-hidden="true">' + EDS.map(function (ed) {
      var dd = '', stift = false;
      linien[ed].forEach(function (v, j) { if (v == null) { stift = false; return; } dd += (stift ? 'L' : 'M') + (3 + (W - 6) * j / (N - 1)).toFixed(1) + ' ' + (H - 3 - (H - 8) * v / zm).toFixed(1); stift = true; });
      return '<path class="pb-' + ed + '" d="' + dd + '"/>';
    }).join('') + '</svg>');
    feld.classList.add('pl-voll');
  }

  // ═════════════════════════════════════════════════════════════════════
  //  Ansicht „Begriffe“: mehrere Anfragen auf einer Zeitachse
  // ═════════════════════════════════════════════════════════════════════
  function begriffeAnsicht(ziel) {
    ziel.innerHTML = '<div class="qv-kopf"><p>' + tx(
      'Mehrere Anfragen auf einer Zeitachse: wie oft jede in den Schriften eines Jahrfünfts steht, je 10 000 Wörter. Gezählt wird im ganzen Bestand, ohne die Filter links; Exzerpte zählen nicht.',
      'Several queries on one time axis: how often each occurs in the writings of a five-year period, per 10,000 words. Counted across the whole corpus, without the filters on the left; excerpts are not counted.') + '</p></div>' +
      '<div class="pb-leiste" id="pb-leiste"></div><figure class="zk pb-kurve" id="pb-kurve"><p class="qv-warte">' + tx('Die Anfragen werden gezählt …', 'Counting the queries …') + '</p></figure>';
    malBegriffeLeiste();
    sende({ typ: 'begriffe', id: ++Z.bid, terme: [C.S.q].concat(Z.mit) });
  }
  function malBegriffeLeiste() {
    var l = document.getElementById('pb-leiste');
    if (!l) return;
    var terme = [C.S.q].concat(Z.mit);
    l.innerHTML = (EINE ? '' : '<div class="pb-gruppe" role="group" aria-label="' + tx('Autor', 'Author') + '"><span class="pb-lab">' + tx('Bei', 'In') + '</span>' +
      [['alle', tx('allen dreien', 'all three')]].concat(EDS.map(function (ed) { return [ed, NAME[ed]]; })).map(function (a) {
        return '<button type="button" data-pb-autor="' + a[0] + '" aria-pressed="' + (Z.autor === a[0]) + '">' + a[1] + '</button>';
      }).join('') + '</div>') +
      '<div class="pb-gruppe pb-terme"><span class="pb-lab">' + tx('Begriffe', 'Terms') + '</span>' + terme.map(function (q, i) {
        return '<span class="pb-term"><i class="zk-feld zk-t' + (i + 1) + '" aria-hidden="true"></i>' + esc(q) + (i ? '<button type="button" data-pb-weg="' + (i - 1) + '" aria-label="' + esc(tx('entfernen: ', 'remove: ') + q) + '">×</button>' : '') + '</span>';
      }).join('') + (terme.length < 4 ? '<form id="pb-form"><input type="text" id="pb-neu" spellcheck="false" autocapitalize="off" placeholder="' + tx('weitere Anfrage, etwa Idee~', 'another query, e.g. Idee~') + '" aria-label="' + tx('weitere Anfrage', 'another query') + '">' +
        '<button type="submit">' + tx('dazu', 'add') + '</button></form>' : '') + '</div>';
  }
  function zeichneBegriffe() {
    var fig = document.getElementById('pb-kurve'), m = Z.begriffe;
    if (!fig || !m || C.S.ansicht !== 'begriffe') return;
    var eds = Z.autor === 'alle' ? EDS : [Z.autor];
    var reihen = [];
    m.terme.forEach(function (t, i) {
      if (t.leer) return;
      var n = [], w = [];
      for (var j = 0; j < m.n; j++) { n.push(0); w.push(0); }
      eds.forEach(function (ed) { for (var j = 0; j < m.n; j++) { n[j] += t.je[ed].n[j]; w[j] += t.je[ed].w[j]; } });
      reihen.push({ id: 't' + (i + 1), name: t.q, n: fenster(n, m.von, m.schritt), w: fenster(w, m.von, m.schritt) });
    });
    if (!window.Zeitkurve || !reihen.length || !window.Zeitkurve.zeichne(fig, { von: Math.max(m.von, HVON), schritt: m.schritt, n: reihen[0].n.length, min: 20000, reihen: reihen })) {
      fig.innerHTML = '<p class="qv-nichts">' + tx('Keine Stelle in datierten Schriften.', 'No passage in dated writings.') + '</p>';
    }
  }
  function begriffeNeu() { malBegriffeLeiste(); C.schreibeAdresse(false); sende({ typ: 'begriffe', id: ++Z.bid, terme: [C.S.q].concat(Z.mit) }); }

  // ═════════════════════════════════════════════════════════════════════
  //  Verbinden
  // ═════════════════════════════════════════════════════════════════════
  function blatt(auf) {
    document.body.classList.toggle('pult-blatt-auf', auf);
    dom.filterKnopf.setAttribute('aria-expanded', auf ? 'true' : 'false');
    if (auf) dom.facetten.open = true;
  }
  function verbinde() {
    dom.autoren.addEventListener('click', function (e) { var b = e.target.closest('[data-ed]'); if (b) schalteEd(b.dataset.ed); });
    dom.filter.addEventListener('click', function (e) { var b = e.target.closest('[data-filter-weg]'); if (b) filterWeg(b.dataset.filterWeg); });
    // Filter links
    dom.werkeFach.addEventListener('click', function (e) {
      if (e.target.closest('[data-werke-mehr]')) { Z.werkAlle = !Z.werkAlle; malWerkwahl(); return; }
      var b = e.target.closest('.pw');
      if (b) schalteWerk(b.dataset.k);
    });
    dom.werkeFach.addEventListener('input', function (e) { if (e.target.id === 'pult-werke-suche') { Z.werkSuche = e.target.value; malWerkwahl(); } });
    function zeitraum(von, bis) {
      var S = C.S;
      S.jahre = S.jahre && S.jahre.von === von && S.jahre.bis === bis ? null : { von: von, bis: bis };
      C.malZeit();
      if (S.q) C.suche(true); else C.schreibeAdresse(true);
    }
    dom.perioden.addEventListener('click', function (e) { var b = e.target.closest('button[data-von]'); if (b) zeitraum(+b.dataset.von, +b.dataset.bis); });
    dom.hist.addEventListener('click', function (e) { var b = e.target.closest('button[data-von]'); if (b) zeitraum(+b.dataset.von, +b.dataset.bis); });
    dom.leere.addEventListener('click', function () { Z.leereAuf = !Z.leereAuf; var l = C.letzte(); C.zeichneBaende(l && l.jeBand ? l.jeBand : null); });
    dom.filterKnopf.addEventListener('click', function () { blatt(!document.body.classList.contains('pult-blatt-auf')); });
    dom.blattZu.addEventListener('click', function () { blatt(false); });
    dom.filterAuf.addEventListener('click', function () { C.$('rch-baende-knopf').click(); malFilterAuf(); malWerkwahl(); });

    // Stellen: ein Klick klappt die Druckseite auf
    C.results.addEventListener('click', function (e) {
      var m = e.target.closest('[data-merk]');
      if (m) { merke(+m.dataset.merk); return; }
      var er = e.target.closest('[data-ersatz]');
      if (er) { e.preventDefault(); setzeAnfrage(C.S.q.replace(er.dataset.fuer, er.dataset.ersatz), true); return; }
      var se = e.target.closest('[data-seite]');
      if (se) { waehle(+se.dataset.seite); return; }
      if (e.target.closest('a, button, input, .qp, .pult-seite')) return;
      var art = e.target.closest('.rch-stelle');
      if (!art || (window.getSelection && String(window.getSelection()))) return;
      waehle(+art.dataset.i);
    });
    dom.vorschau.addEventListener('click', function (e) {
      var b = e.target.closest('[data-pv]');
      if (!b) return;
      var was = b.dataset.pv;
      if (was === 'zu') { var art = dom.vorschau.parentNode; schliesseSeite(); if (art && art.focus) art.focus({ preventScroll: true }); }
      else if (was === 'seite') sende({ typ: 'seite', id: C.anfrage(), i: Z.gewaehlt, pdf: +b.dataset.pdf });
      else if (was === 'heim') sende({ typ: 'seite', id: C.anfrage(), i: Z.gewaehlt });
    });

    // Merkliste
    dom.ablage.addEventListener('click', function (e) { if (e.target.closest('#pult-ablage-auf')) { if (dom.export.hidden) oeffneExport(); else schliesseExport(); } });
    dom.export.addEventListener('click', function (e) {
      var b = e.target.closest('[data-ex]');
      if (!b) return;
      var was = b.dataset.ex;
      if (was === 'zu') schliesseExport();
      else if (was === 'art') { exportArt = b.dataset.art; malExport(); }
      else if (was === 'kopie') C.kopiere(exportText(exportArt).replace(/^﻿/, ''), tx('Kopiert', 'Copied'), zahl(Z.liste.length) + ' ' + tx('Stellen', 'passages'));
      else if (was === 'datei') speichereDatei();
      else if (was === 'weg') { Z.liste.splice(+b.dataset.i, 1); lager('idealismus-merkliste', Z.liste); malGemerkt(); malAblage(); if (Z.liste.length) malExport(); else schliesseExport(); }
      else if (was === 'leeren') { if (b.dataset.sicher) { Z.liste = []; lager('idealismus-merkliste', Z.liste); malGemerkt(); schliesseExport(); malAblage(); } else { b.dataset.sicher = '1'; b.textContent = tx('Wirklich leeren?', 'Really empty it?'); } }
    });
    dom.export.addEventListener('change', function (e) {
      var n = e.target.closest('[data-notiz]');
      if (!n) return;
      Z.liste[+n.dataset.notiz].notiz = n.value.trim(); lager('idealismus-merkliste', Z.liste);
      var pre = dom.export.querySelector('.pe-text'); if (pre) pre.textContent = exportText(exportArt).replace(/^﻿/, '');
    });

    // Feld
    C.input.addEventListener('input', fordereVorschlag);
    C.input.addEventListener('focus', function () { if (C.input.value.trim()) fordereVorschlag(); });
    C.input.addEventListener('blur', function () { setTimeout(schliesseVorschlag, 140); });
    C.input.addEventListener('keydown', function (e) {
      var offen = !dom.vorschlag.hidden && Z.vliste.length;
      // Enter ohne Wahl sucht; eine Antwort, die noch unterwegs ist, soll die Liste danach nicht öffnen
      if (e.key === 'Enter' && (!offen || Z.vwahl < 0)) { schliesseVorschlag(); return; }
      if (!offen) return;
      var n = Z.vliste.length;
      if (e.key === 'ArrowDown') { e.preventDefault(); e.stopImmediatePropagation(); markiere(Math.min(Z.vwahl + 1, n - 1)); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); e.stopImmediatePropagation(); markiere(Math.max(Z.vwahl - 1, -1)); }
      else if ((e.key === 'Enter' || e.key === 'Tab') && Z.vwahl >= 0) { e.preventDefault(); e.stopImmediatePropagation(); nimm(Z.vwahl); }
      else if (e.key === 'Escape') { e.preventDefault(); e.stopImmediatePropagation(); schliesseVorschlag(); }
    }, true);
    dom.vorschlag.addEventListener('mousedown', function (e) {
      var li = e.target.closest('li[data-i]');
      if (!li) return;
      e.preventDefault();
      nimm(+li.dataset.i);
    });

    // Suchformular
    dom.formKnopf.addEventListener('click', function () { formularAuf(dom.formular.hidden); });
    function feldGeaendert(e) {
      var f = e.target.dataset && e.target.dataset.f;
      if (!f) return;
      F[f] = f === 'n' ? Math.max(1, Math.min(99, parseInt(e.target.value, 10) || 8)) : e.target.value;
      Z.formHinweis = '';
      formVorschau();
    }
    dom.formular.addEventListener('input', feldGeaendert);
    dom.formular.addEventListener('change', feldGeaendert);
    dom.formular.addEventListener('click', function (e) {
      var s = e.target.closest('[data-schr]');
      if (s) { F.schreibung = s.dataset.schr; formVorschau(); return; }
      var b = e.target.closest('[data-fo]');
      if (!b) return;
      if (b.dataset.fo === 'leer') { F = formLeer(); Z.formHinweis = ''; fuelleFormular(); } else formularLos();
    });
    dom.formular.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && e.target.tagName === 'INPUT') { e.preventDefault(); formularLos(); }
    });

    // Erste Ansicht: die vier kleinen Ansichten führen die Probeanfrage aus
    document.addEventListener('click', function (e) {
      var b = e.target.closest('#pl-ansichten [data-ansicht]');
      if (b) { e.preventDefault(); C.sucheMit(PROBE); C.setzeAnsicht(b.dataset.ansicht); return; }
      var a = e.target.closest('[data-pb-autor]');
      if (a) { Z.autor = a.dataset.pbAutor; malBegriffeLeiste(); C.schreibeAdresse(false); zeichneBegriffe(); return; }
      var w = e.target.closest('[data-pb-weg]');
      if (w) { Z.mit.splice(+w.dataset.pbWeg, 1); begriffeNeu(); return; }
      // Ein Klick neben das Blatt der Filter schließt es (Telefon)
      if (document.body.classList.contains('pult-blatt-auf') && !e.target.closest('#rch-baende, #pult-filter-knopf')) blatt(false);
    });
    document.addEventListener('submit', function (e) {
      if (e.target.id !== 'pb-form') return;
      e.preventDefault();
      var f = document.getElementById('pb-neu'), q = f.value.trim();
      if (!q || Z.mit.length >= 3 || q === C.S.q || Z.mit.indexOf(q) >= 0) return;
      if (!C.H.lies(q).ast) { C.toast(tx('Die Anfrage enthält kein Suchwort', 'The query contains no search word')); return; }
      Z.mit.push(q); begriffeNeu();
    });
    var wartet = 0;
    window.addEventListener('resize', function () { clearTimeout(wartet); wartet = setTimeout(passeSeiteEin, 150); });
    document.addEventListener('keydown', function (e) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === 'Escape') {
        if (!dom.export.hidden) { schliesseExport(); return; }
        if (!dom.formular.hidden) { formularAuf(false); C.input.focus(); return; }
        if (document.body.classList.contains('pult-blatt-auf')) { blatt(false); return; }
        if (Z.gewaehlt != null) { var offen = dom.vorschau.parentNode; schliesseSeite(); if (offen && offen.focus) offen.focus({ preventScroll: true }); return; }
      }
      var tag = (document.activeElement && document.activeElement.tagName) || '';
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      var art = document.activeElement && document.activeElement.closest && document.activeElement.closest('.rch-stelle');
      var i = art ? +art.dataset.i : Z.gewaehlt;
      if (i == null || !Z.karten[i]) return;
      if (e.key === 's') { e.preventDefault(); merke(i); }
      else if (e.key === 'v' && art) { e.preventDefault(); waehle(i); }
    });
  }

  window.Pult = {
    start: start, vor: vor, nach: nach, ruhe: ruhe, karte: karte, baende: baende,
    frage: function (m) { if (C && Z.werkwahl.length) m.werke = Z.werkwahl.slice(); return m; },
    adresse: function (p) {
      ansichtKlasse();
      if (!C) return;
      if (Z.werkwahl.length) p.set('werke', Z.werkwahl.join(','));
      if (C.S.ansicht === 'begriffe') {
        if (Z.mit.length) p.set('mit', Z.mit.join('|'));
        if (Z.autor !== 'alle') p.set('autor', Z.autor);
      }
      // Die Adresse wird nach jeder Änderung der Suche geschrieben: hier folgen die Stationen und der Zähler der Filter
      malPerioden(); malFilterAuf();
    },
    lies: function (p) {
      Z.mit = (p.get('mit') || '').split('|').map(function (x) { return x.trim(); }).filter(Boolean).slice(0, 3);
      Z.autor = EDS.indexOf(p.get('autor')) >= 0 ? p.get('autor') : 'alle';
      Z.werkwahl = (p.get('werke') || '').split(',').map(function (x) { return x.trim(); }).filter(function (x) { return /^[\w-]+\|\d+$/.test(x); }).slice(0, 40);
      setTimeout(function () { ansichtKlasse(); malWerkwahl(); malFilterAuf(); }, 0);
    },
    begriffe: begriffeAnsicht
  };
})();
