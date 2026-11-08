#!/usr/bin/env python3
"""search.html aus der Suchseite der Schelling-Edition ableiten (beide Editionen haben dieselbe Suchseite).

Die Suchseite der Editionen bleibt die Quelle; hier wird nur ersetzt, was das Portal anders braucht:
Kopf und Fuss, Bandliste nach Editionen, Links in die Edition, aus der eine Stelle stammt.
  python3 werkzeug/recherche_seite.py   (danach sammle.py, das die Bandzahl einsetzt)
"""
import pathlib, re, sys

QUELLE = pathlib.Path.home() / 'schelling/site/de/search.html'   # deutsche Seiten liegen seit der englischen Fassung unter de/
ZIEL = pathlib.Path.home() / 'idealismus/site/de/search.html'
t = QUELLE.read_text(encoding='utf-8')
# Was die Schelling-Seite für sich trägt (Fußzeile mit den anderen Ausgaben, Sprachumschalter), setzt das Portal selbst
t = re.sub(r'\n  <div class="site-footer-familie">.*?</div>', '', t)
t = re.sub(r'\n  <div class="kopf-rechts">.*?</div>', '', t, flags=re.S)


def ers(alt, neu, n=1):
    global t
    if t.count(alt) != n:
        sys.exit(f'{t.count(alt)}× statt {n}×: {alt[:80]!r}')
    t = t.replace(alt, neu)


# ── Kopf ─────────────────────────────────────────────────────────────────
ers('<title>Recherche — Digitale Schelling-Edition</title>', '<title>Recherche · Edition Deutscher Idealismus</title>')
ers('content="Volltextsuche über Schellings Werke nach dem Text der Sämmtlichen Werke: zitiert bis zur Druckzeile, mit Konkordanz, Verteilung über die Bände, Phrasen, Nähe und Orthographie-Ausgleich."',
    'content="Eine Volltextsuche über die Werke Schellings und Hegels: zitiert bis zur Druckzeile, mit Konkordanz, Verteilung über die Bände, Phrasen, Nähe und Orthographie-Ausgleich."')
ers('https://www.schellingedition.com/search.html', 'https://www.idealismedition.com/recherche')   # og:url; canonical und hreflang setzt englisch.py
ers('content="Recherche — Digitale Schelling-Edition"', 'content="Recherche · Edition Deutscher Idealismus"')
ers('content="Volltextsuche über Schellings Werke nach dem Text der Sämmtlichen Werke: zitiert bis zur Zeile, mit Konkordanz und Verteilung."',
    'content="Eine Volltextsuche über Schelling und Hegel: zitiert bis zur Zeile, mit Konkordanz und Verteilung."')
ers('https://www.schellingedition.com/assets/og.png', 'https://www.idealismedition.com/assets/og.png')
ers('<meta name="apple-mobile-web-app-title" content="Schelling">', '<meta name="apple-mobile-web-app-title" content="Idealismus">')
ers('  <link rel="manifest" href="manifest.json">\n', '')
ers('<a href="index.html" class="site-title" aria-label="Digitale Schelling-Edition — Startseite">',
    '<a href="/" class="site-title" aria-label="Edition Deutscher Idealismus, Startseite">')
ers('<span class="site-title-hegel">SCHELLING</span>', '<span class="site-title-hegel">IDEALISMUS</span>')
ers('''      <li><a href="index.html">Sammlung</a></li>
      <li><a href="text.html">Lektüre</a></li>
      <li><a href="search.html" class="current" aria-current="page">Recherche</a></li>
      <li class="nav-weit"><a href="https://www.idealismedition.com/de/support">Unterstützen</a></li>''',
    '''      <li><a href="/#editionen">Ausgaben</a></li>
      <li><a href="search" class="current" aria-current="page">Recherche</a></li>
      <li class="nav-weit"><a href="/support">Unterstützen</a></li>''')

# ── Feld und Hilfe ───────────────────────────────────────────────────────
ers('>Anmerkungen des Drucks <span class="n"></span></button>', '>Anmerkungen <span class="n"></span></button>')
ers('<p class="rch-unter" id="rch-unter">Volltext der Sämmtlichen Werke · 14 Bände</p>', '<p class="rch-unter" id="rch-unter">Volltext von Fichte, Schelling und Hegel</p>')
ers('''            <button type="button" data-q="&quot;das reine Seyn&quot;" title="genaue Wortfolge">„das reine Seyn“</button>
            <button type="button" data-q="Begriff* NEAR/10 Objectivität" title="Nähe, mit Wortanfang">Begriff* NEAR/10 Objectivität</button>
            <button type="button" data-q="*seyn" title="Wortende: Daseyn, Fürsichseyn …">*seyn</button>
            <button type="button" data-q="=Seyn" title="nur diese Schreibung">=Seyn</button>''',
    '''            <button type="button" data-q="&quot;intellectuelle Anschauung&quot;" title="genaue Wortfolge">„intellectuelle Anschauung“</button>
            <button type="button" data-q="Indifferenz" title="ein Wort, in allen Schreibungen">Indifferenz</button>
            <button type="button" data-q="Nicht-Ich" title="ein Wort">Nicht-Ich</button>
            <button type="button" data-q="Schöpfung NEAR/8 Freiheit" title="Nähe">Schöpfung NEAR/8 Freiheit</button>
            <button type="button" data-q="*seyn" title="Wortende: Daseyn, Fürsichseyn …">*seyn</button>''')
ers('„und“, „oder“, „nicht“ in Kleinbuchstaben sind Wörter.</p>',
    '„und“, „oder“, „nicht“ in Kleinbuchstaben sind Wörter. Bei Hegel wird nur Hegels Text durchsucht, nie der Apparat der Herausgeber.</p>')

# ── Fuss und Skripte ─────────────────────────────────────────────────────
ers('''  <div>Digitale Schelling-Edition</div>
  <nav>
    <a href="https://www.idealismedition.com/de/support">Unterstützen</a>
    <a href="news.html">Neuigkeiten</a>
    <a href="guidelines.html">Richtlinien</a>
    <a href="copyright.html">Urheberrecht</a>
    <a href="privacy.html">Datenschutz</a>
    <a href="legal-notice.html">Impressum</a>
  </nav>''',
    '''  <div>Edition Deutscher Idealismus · Fichte, Schelling, Hegel</div>
  <nav>
    <a href="https://www.fichteedition.com/">Fichte-Edition</a>
    <a href="https://www.schellingedition.com/">Schelling-Edition</a>
    <a href="https://www.hegeledition.com/">Hegel-Edition</a>
    <a href="/support">Unterstützen</a>
    <a href="privacy">Datenschutz</a>
    <a href="legal-notice">Impressum</a>
  </nav>''')
ers('<script src="assets/edition-data.js"></script>', '<script src="assets/baende.js"></script>')
ers('''<script>if("serviceWorker"in navigator)navigator.serviceWorker.register("/sw.js")</script>
<script src="assets/auswahl.js" defer></script>
<script src="assets/kopieren.js" defer></script>
<script src="assets/cookie-notice.js" defer></script>
<!-- Reichweitenmessung: cookielos, ohne dauerhafte Kennung. Siehe privacy.html -->
<script defer src="/_vercel/insights/script.js"></script>
<script defer src="/_vercel/speed-insights/script.js"></script>''',
    '<script src="assets/auswahl.js" defer></script>\n<script defer src="/_vercel/insights/script.js"></script>')

# ── Seite: Editionen ─────────────────────────────────────────────────────
ers("  var BANDLISTE = (window.HEGEL_EDITION_BAENDE || []);",
    """  var BANDLISTE = (window.HEGEL_EDITION_BAENDE || []);
  // Jede Stelle gehoert einer Edition; die Kennung des Bandes sagt welcher (sw- Schelling, gw- Hegel).
  var EDITIONEN = window.IDEALISMUS_EDITIONEN || {};
  var ED_VON = {};
  (window.HEGEL_EDITION_BAENDE || []).forEach(function (b) { ED_VON[b.work] = b.ed; });
  function edVon(w) { return ED_VON[w] || (/^sw-/.test(w) ? 'schelling' : /^gw-/.test(w) ? 'hegel' : ''); }
  function edName(w) { var e = EDITIONEN[edVon(w)]; return e ? e.name : ''; }
  function baendeVon(ed) { return BANDLISTE.filter(function (b) { return edVon(b.work) === ed; }).map(function (b) { return b.work; }); }
  /** Die Edition, deren Baende genau gewaehlt sind, sonst null. */
  function ganzeEdition() {
    if (!S.baende.length) return null;
    var ed = edVon(S.baende[0]), alle = baendeVon(ed);
    return alle.length === S.baende.length && S.baende.every(function (w) { return edVon(w) === ed; }) ? ed : null;
  }""")
ers("Volltext der Sämmtlichen Werke · ' + m.baende.length", "Volltext von Fichte, Schelling und Hegel · ' + m.baende.length")
ers("var ZL = 'hegel-recherche-zuletzt';", "var ZL = 'idealismus-recherche-zuletzt';")
ers("    if (S.baende.length) p.set('work', S.baende.join(','));",
    "    var ganz = ganzeEdition();\n    if (ganz) p.set('ed', ganz); else if (S.baende.length) p.set('work', S.baende.join(','));")
ers("    S.baende = (p.get('work') || '').split(',').filter(Boolean);",
    "    S.baende = (p.get('work') || '').split(',').filter(Boolean);\n    if (!S.baende.length && p.get('ed')) S.baende = baendeVon(p.get('ed'));")
ers("""    return 'text.html?' + p.toString() + '#page-' + s.ziel.pdf;""",
    """    var e = EDITIONEN[edVon(s.work)];
    return (e && e.url ? e.url : '') + '/text?' + p.toString() + '#page-' + s.ziel.pdf;""")
ers("var ARTNAME = { n: 'Anmerkung des Drucks', h: 'Überschrift' };", "var ARTNAME = { n: 'Anmerkung', h: 'Überschrift' };")
ers("""html += '<div class="rch-gruppe"><h2>' + esc(g.sig) + '</h2>""",
    """html += '<div class="rch-gruppe"><h2><span class="ei-autor">' + esc(edName(g.work)) + '</span> ' + esc(g.sig) + '</h2>""")
ers("var name = 'schelling-' + (m.art", "var name = 'idealismus-' + (m.art")
# Bandliste: vor jeder Edition ein Kopf, der ihre Baende auf einmal waehlt
ers("""    liste.innerHTML = baende.map(function (b) {
      var an = S.baende.indexOf(b.work) >= 0;""",
    """    var vorige = '';
    liste.innerHTML = baende.map(function (b) {
      var ed = edVon(b.work), kopf = '';
      if (ed !== vorige) {
        vorige = ed;
        var alle = baendeVon(ed), gewaehlt = alle.length && alle.every(function (w) { return S.baende.indexOf(w) >= 0; });
        kopf = '<button type="button" class="ei-bandkopf" data-ed="' + ed + '" aria-pressed="' + gewaehlt + '" title="nur die Bände dieser Edition">' +
          esc(EDITIONEN[ed] ? EDITIONEN[ed].name : ed) + '<span>' + esc(EDITIONEN[ed] ? EDITIONEN[ed].ausgabe : '') + '</span></button>';
      }
      var an = S.baende.indexOf(b.work) >= 0;""")
ers("""      return '<button type="button" class="rch-band' + (hat && !b.stellen ? ' leer' : '')""",
    """      return kopf + '<button type="button" class="rch-band' + (hat && !b.stellen ? ' leer' : '')""")
ers("""  $('rch-baende-liste').addEventListener('click', function (e) {
    var b = e.target.closest('.rch-band');""",
    """  $('rch-baende-liste').addEventListener('click', function (e) {
    var k = e.target.closest('.ei-bandkopf');
    if (k) {
      var alle = baendeVon(k.dataset.ed), ganz = ganzeEdition() === k.dataset.ed;
      S.baende = ganz ? [] : alle.slice();
      if (S.seiten && S.baende.indexOf(S.seiten.work) < 0) S.seiten = null;
      if (S.q) suche(true); else { zeichneBaende(null); schreibeAdresse(true); }
      return;
    }
    var b = e.target.closest('.rch-band');""")
ers("  <link rel=\"stylesheet\" href=\"assets/recherche.css\">", "  <link rel=\"stylesheet\" href=\"assets/recherche.css\">\n  <link rel=\"stylesheet\" href=\"assets/recherche-portal.css\">")

ers("""      '<div class="rch-zitat">' + esc(s.zitat) +""",
    """      '<div class="rch-zitat">' + (S.ordnung === 'dichte' ? '<span class="ei-autor">' + esc(edName(s.work)) + '</span> ' : '') + esc(s.zitat) +""")

# ── Querverweise (recherche-quer.js, recherche-portal-worker.js) ──────────
ers("try { worker = new Worker('assets/recherche-worker.js'); }", "try { worker = new Worker('assets/recherche-portal-worker.js'); }")
ers('<button type="button" role="tab" id="tab-verteilung" data-ansicht="verteilung" aria-selected="false" aria-controls="search-results">Verteilung<span class="kz">3</span></button>',
    '<button type="button" role="tab" id="tab-verteilung" data-ansicht="verteilung" aria-selected="false" aria-controls="search-results">Verteilung<span class="kz">3</span></button>\n        <button type="button" role="tab" id="tab-vergleich" data-ansicht="vergleich" aria-selected="false" aria-controls="search-results">Vergleich<span class="kz">4</span></button>')
ers("      zeichneBaende(null);\n      if (S.q) suche(false); else status.textContent",
    "      zeichneBaende(null);\n      worker.postMessage({ typ: 'bezuege' });\n      if (S.q) suche(false); else status.textContent")
ers("    } else if (m.typ === 'fehler') {",
    "    } else if (m.typ === 'vergleich') {\n      if (m.id === anfrage && S.ansicht === 'vergleich') Quer.vergleich(m, results);\n    } else if (m.typ === 'parallel') {\n      if (m.id === anfrage) Quer.parallel(m, results);\n    } else if (m.typ === 'bezuege') {\n      Quer.bezuege(m);\n    } else if (m.typ === 'fehler') {")
ers("S.ansicht = ['stellen', 'konkordanz', 'verteilung'].indexOf(p.get('ansicht')) >= 0", "S.ansicht = ['stellen', 'konkordanz', 'verteilung', 'vergleich'].indexOf(p.get('ansicht')) >= 0")
ers("    else zeichneVerteilung();",
    "    else if (S.ansicht === 'vergleich') { results.innerHTML = '<p class=\"qv-warte\">Die drei Ausgaben werden verglichen …</p>'; worker.postMessage({ typ: 'vergleich', id: anfrage }); }\n    else zeichneVerteilung();")
ers("""'">Lesefassung</a></div>' +""", """'">Lesefassung</a><button type="button" class="qp-knopf" data-parallel="' + s.i + '" title="Ähnliche Stellen bei Fichte, Schelling und Hegel">Parallelstellen</button></div>' +""")
ers("    else if (e.key === '3') setzeAnsicht('verteilung');", "    else if (e.key === '3') setzeAnsicht('verteilung');\n    else if (e.key === '4') setzeAnsicht('vergleich');")
ers("  var ARTNAME = { n: 'Anmerkung', h: 'Überschrift' };", """  // Querverweise: was recherche-quer.js von der Seite braucht
  function sucheMit(q, ed) {
    input.value = q; spiegeln(); S.q = q; S.aus = []; S.seiten = null; S.baende = ed ? baendeVon(ed) : [];
    S.ansicht = 'stellen'; malAnsicht(); merkeZuletzt(q); suche(true); window.scrollTo(0, 0);
  }
  window.QuerCtx = {
    esc: esc, zahl: zahl, leserLink: leserLink, edName: edName, sucheMit: sucheMit,
    sucheInBand: function (w) { S.baende = [w]; S.seiten = null; S.ansicht = 'stellen'; malAnsicht(); suche(true); window.scrollTo(0, 0); },
    sucheNah: function (wort, ed) {
      var einfach = /^[\\p{L}\\p{N}*?=-]+$/u.test(S.q);
      sucheMit(einfach ? S.q + ' NEAR/8 ' + wort : '(' + S.q + ') ' + wort, ed);
    }
  };
  results.addEventListener('click', function (e) {
    var p = e.target.closest('[data-parallel]');
    if (!p) return;
    var art = p.closest('.rch-stelle');
    if (p.dataset.offen) { var q = art && art.querySelector('.qp'); if (q) q.remove(); delete p.dataset.offen; p.textContent = 'Parallelstellen'; return; }
    p.disabled = true; p.textContent = 'Parallelstellen werden gesucht …';
    worker.postMessage({ typ: 'parallel', id: anfrage, i: +p.dataset.parallel });
  });
  var ARTNAME = { n: 'Anmerkung', h: 'Überschrift' };""")
ers('        <div id="rch-zuletzt-feld" hidden>', '        <div class="qb-feld" id="qb" hidden></div>\n        <div id="rch-zuletzt-feld" hidden>')
ers('<script src="assets/recherche-kern.js"></script>', '<script src="assets/recherche-kern.js"></script>\n<script src="assets/recherche-quer.js"></script>')

# Was nach dem Ersetzen nicht mehr vorkommen darf: Seiten der Edition, die es im Portal nicht gibt
for rest in ('search.html', 'index.html', 'text.html', 'news.html', 'edition-data', 'Gesammelten Werke'):
    if rest in t:
        sys.exit(f'übrig: {rest}')
ZIEL.write_text(t, encoding='utf-8')
print('search.html geschrieben')
