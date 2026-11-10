#!/usr/bin/env python3
"""Das Pult in die Suchseite des Portals einbauen (seit 11/2026).

Die Suchseite kommt aus der Schelling-Edition (recherche_seite.py). Hier wird ersetzt und ergänzt, was die
neue Recherche des Portals braucht: erste Ansicht (Titel, Beispiele mit Erklärung, vier kleine Ansichten),
Rangfolge und Zeitfolge der Stellen, die Ansicht „Begriffe“, und die Haken, über die assets/recherche-pult.js
in die Seite greift (Pult.start, vor, nach, ruhe, karte, baende, adresse, lies, begriffe).

recherche_seite.py ruft einbau(t) als letzten Schritt. Allein aufgerufen baut das Skript in die vorhandene
Seite ein (nur wenn sie das Pult noch nicht hat):
  python3 werkzeug/pult_einbau.py [--aus datei]
Danach wie immer: python3 werkzeug/englisch.py ~/idealismus bauen
"""
import pathlib, re, sys

ZIEL = pathlib.Path(__file__).resolve().parent.parent / 'site/de/search.html'
MARKE = 'assets/recherche-pult.css'

ERSTE_ANSICHT = '''<div class="rch-hilfe" id="search-guide">
        <section class="pl-bsp" aria-labelledby="pl-bsp-h">
          <h2 id="pl-bsp-h">So lässt sich fragen</h2>
          <p class="pl-unter">Jede Zeile führt die Suche aus; rechts steht, wie viel sie findet.</p>
          <div class="rch-beispiele pl-beispiele">
            <button type="button" data-q="&quot;intellectuelle Anschauung&quot;"><span class="q">„intellectuelle Anschauung“</span><span class="n" data-zahl></span><span class="w">Die genaue Wortfolge, in jeder Schreibung der Zeit.</span></button>
            <button type="button" data-q="Schöpfung NEAR/8 Freiheit"><span class="q">Schöpfung <code>NEAR/8</code> Freiheit</span><span class="n" data-zahl></span><span class="w">Beide Wörter höchstens acht Wörter voneinander, in beliebiger Folge.</span></button>
            <button type="button" data-q="Sein"><span class="q">Sein</span><span class="n" data-zahl></span><span class="w">Die heutige Schreibung findet auch <i>Seyn</i>.</span></button>
            <button type="button" data-q="*seyn"><span class="q"><code>*</code>seyn</span><span class="n" data-zahl></span><span class="w">Jedes Wort mit diesem Ende: <i>Daseyn</i>, <i>Fürsichseyn</i>.</span></button>
            <button type="button" data-q="Substanz SENTENCE Subject"><span class="q">Substanz <code>SENTENCE</code> Subject</span><span class="n" data-zahl></span><span class="w">Beide Wörter im selben Satz.</span></button>
            <button type="button" data-q="(Begriff OR Idee) AND Urtheil"><span class="q">(Begriff <code>OR</code> Idee) <code>AND</code> Urtheil</span><span class="n" data-zahl></span><span class="w">Eines von zwei Wörtern, zusammen mit einem dritten.</span></button>
          </div>
        </section>
        <section class="pl-ans" id="pl-ansichten" aria-labelledby="pl-ans-h">
          <h2 id="pl-ans-h">Was zurückkommt</h2>
          <p class="pl-unter">Nicht nur eine Liste von Stellen. Am Beispiel <i>Anschauung</i>:</p>
          <div class="pl-vier">
            <button type="button" data-ansicht="konkordanz"><span class="bild" data-bild="kwic"></span><b>Konkordanz</b><span class="t">Jedes Vorkommen in einer Zeile, zu ordnen nach dem Wort davor oder danach.</span></button>
            <button type="button" data-ansicht="verteilung"><span class="bild" data-bild="baende"></span><b>Verteilung</b><span class="t">Wo das Wort dicht steht, Band für Band, je 10 000 Wörter.</span></button>
            <button type="button" data-ansicht="vergleich"><span class="bild" data-bild="autoren"></span><b>Vergleich</b><span class="t">Wie oft und in welchem Umfeld die drei das Wort gebrauchen.</span></button>
            <button type="button" data-ansicht="zeit"><span class="bild" data-bild="zeit"></span><b>Zeit</b><span class="t">Von 1785 bis 1854 in Jahrfünften, nach dem Jahr jeder Schrift.</span></button>
          </div>
        </section>
        '''

KONTEXT = '''  // Das Pult (assets/recherche-pult.js) greift über diese Namen in die Seite
  window.PultCtx = {
    S: S, H: H, $: $, input: input, results: results, status: status, esc: esc, zahl: zahl, EDITIONEN: EDITIONEN,
    suche: suche, starte: starte, spiegeln: spiegeln, merkeZuletzt: merkeZuletzt, schreibeAdresse: schreibeAdresse,
    setzeAnsicht: setzeAnsicht, malArten: malArten, malZeit: malZeit, zeichneBaende: zeichneBaende, fordereStellen: fordereStellen,
    kopiere: kopiere, toast: toast, leserLink: leserLink, edVon: edVon, edName: edName, baendeVon: baendeVon, sigVon: sigVon, sucheMit: sucheMit,
    baende: function () { return BANDLISTE; }, worker: function () { return worker; }, anfrage: function () { return anfrage; },
    letzte: function () { return letzteAntwort; }, bereit: function () { return bereit; }, gesamt: function () { return stellenGesamt; }
  };
  if (window.Pult) window.Pult.start(window.PultCtx);

'''


def einbau(t):
    if MARKE in t:
        return t

    def ers(alt, neu, n=1):
        nonlocal t
        if t.count(alt) != n:
            sys.exit(f'pult_einbau: {t.count(alt)}× statt {n}×: {alt[:90]!r}')
        t = t.replace(alt, neu)

    # ── Kopf, Rumpf, Skript ──────────────────────────────────────────────
    ers('  <link rel="stylesheet" href="assets/zeitkurve.css">', '  <link rel="stylesheet" href="assets/zeitkurve.css">\n  <link rel="stylesheet" href="assets/recherche-pult.css">')
    ers('<body class="search-page recherche rch-ruhe">', '<body class="search-page recherche rch-ruhe pult">')
    ers('<script src="assets/recherche-quer.js"></script>', '<script src="assets/recherche-quer.js"></script>\n<script src="assets/recherche-pult.js"></script>')

    # ── Erste Ansicht ────────────────────────────────────────────────────
    ers('<h1>Recherche</h1>', '<h1>Jedes Wort von Fichte, Schelling und Hegel, zitiert bis zur Druckzeile.</h1>')
    # Der Titel nennt die drei schon; darunter stehen nur noch Umfang und Schreibung (sammle.py schreibt die Zahl der Bände)
    def unter(m):
        zahl = re.search(r'(\d+) Bände', m.group(1))   # vor sammle.py steht hier noch keine Zahl
        return ('<p class="rch-unter" id="rch-unter">' + (zahl.group(1) + ' ' if zahl else '') + 'Bände im Volltext</p>\n'
                '      <p class="pl-zusatz">Die Schreibung der Zeit wird verstanden: <i>Sein</i> findet <i>Seyn</i>.</p>')
    t, n = re.subn(r'<p class="rch-unter" id="rch-unter">([^<]*)</p>', unter, t, count=1)
    if n != 1: sys.exit('pult_einbau: rch-unter nicht gefunden')
    ers("$('rch-unter').textContent = 'Volltext von Fichte, Schelling und Hegel · ' + m.baende.length + ' Bände · ' + zahl(m.woerter) + ' Wörter';",
        "$('rch-unter').textContent = m.baende.length + ' Bände · ' + zahl(m.woerter) + ' Wörter im Volltext';")
    ers('placeholder="Wort, Wendung oder Ausdruck  ·  Taste /"', 'placeholder="Wort, Wendung, Zitat (GW 9, 23) oder Werktitel"')
    t, n = re.subn(r'<div class="rch-hilfe" id="search-guide">\s*<div>\s*<h2>Zum Beispiel</h2>.*?</div>\s*</div>\s*(?=<div class="qb-feld" id="qb" hidden></div>)',
                   lambda m: ERSTE_ANSICHT, t, count=1, flags=re.S)
    if n != 1: sys.exit('pult_einbau: Beispiele der ersten Ansicht nicht gefunden')

    # ── Ansichten und Ordnung ────────────────────────────────────────────
    ers('data-ansicht="zeit" aria-selected="false" aria-controls="search-results">Zeit<span class="kz">5</span></button>',
        'data-ansicht="zeit" aria-selected="false" aria-controls="search-results">Zeit<span class="kz">5</span></button>\n'
        '        <button type="button" role="tab" id="tab-begriffe" data-ansicht="begriffe" aria-selected="false" aria-controls="search-results">Begriffe<span class="kz">6</span></button>')
    ers('''          <option value="werk">Werkfolge</option>
          <option value="dichte">Trefferdichte</option>''',
        '''          <option value="rang">Beste zuerst</option>
          <option value="werk">Werkfolge</option>
          <option value="jahr">Zeitfolge</option>
          <option value="dichte">Trefferdichte</option>''')
    ers('<dt>1 – 5</dt><dd>Stellen, Konkordanz, Verteilung, Vergleich, Zeit</dd>',
        '<dt>1 – 6</dt><dd>Stellen, Konkordanz, Verteilung, Vergleich, Zeit, Begriffe</dd>\n              <dt>s</dt><dd>Stelle auf die Merkliste</dd>')
    ers("ansicht: 'stellen', ordnung: 'werk',", "ansicht: 'stellen', ordnung: 'rang',")
    ers("if (S.ordnung !== 'werk') p.set('ordnung', S.ordnung);", "if (S.ordnung !== 'rang') p.set('ordnung', S.ordnung);")
    ers("S.ordnung = p.get('ordnung') === 'dichte' ? 'dichte' : 'werk';", "S.ordnung = ['werk', 'dichte', 'jahr'].indexOf(p.get('ordnung')) >= 0 ? p.get('ordnung') : 'rang';")
    ers("['stellen', 'konkordanz', 'verteilung', 'vergleich', 'zeit'].indexOf(p.get('ansicht'))", "['stellen', 'konkordanz', 'verteilung', 'vergleich', 'zeit', 'begriffe'].indexOf(p.get('ansicht'))")
    ers("    else zeichneVerteilung();", "    else if (S.ansicht === 'begriffe' && window.Pult) window.Pult.begriffe(results);\n    else zeichneVerteilung();")
    ers("    else if (e.key === '5') setzeAnsicht('zeit');", "    else if (e.key === '5') setzeAnsicht('zeit');\n    else if (e.key === '6') setzeAnsicht('begriffe');")

    # ── Mehrere ganze Editionen in der Adresse: ?ed=fichte,hegel ─────────
    ers("    var ganz = ganzeEdition();\n    if (ganz) p.set('ed', ganz);", "    var ganz = ganzeEditionen();\n    if (ganz) p.set('ed', ganz);")
    ers("    if (!S.baende.length && p.get('ed')) S.baende = baendeVon(p.get('ed'));",
        "    if (!S.baende.length && p.get('ed')) p.get('ed').split(',').forEach(function (ed) { S.baende = S.baende.concat(baendeVon(ed)); });")
    ers("  var bereit = false, ladeStart = false, worker = null,",
        """  /** Die Editionen, deren Bände genau gewählt sind (mit Komma), sonst null. */
  function ganzeEditionen() {
    if (!S.baende.length) return null;
    var eds = [], rest = S.baende.slice();
    Object.keys(EDITIONEN).forEach(function (ed) {
      var alle = baendeVon(ed);
      if (alle.length && alle.every(function (w) { return rest.indexOf(w) >= 0; })) { eds.push(ed); rest = rest.filter(function (w) { return alle.indexOf(w) < 0; }); }
    });
    return eds.length && !rest.length ? eds.join(',') : null;
  }
  var bereit = false, ladeStart = false, worker = null,""")

    # ── Haken ────────────────────────────────────────────────────────────
    ers("  function empfange(e) {\n    var m = e.data;\n    if (m.typ === 'fortschritt') {",
        "  function empfange(e) {\n    var m = e.data;\n    if (window.Pult && window.Pult.vor(m)) return;\n    empfangeSeite(m);\n    if (window.Pult) window.Pult.nach(m);\n  }\n"
        "  function empfangeSeite(m) {\n    if (m.typ === 'fortschritt') {")
    ers("  function ruhe(an) { document.body.classList.toggle('rch-ruhe', !!an); }",
        "  function ruhe(an) { document.body.classList.toggle('rch-ruhe', !!an); if (window.Pult) window.Pult.ruhe(!!an); }")
    ers("  function stelleHtml(s) {\n    return '<article class=\"rch-stelle\"", "  function stelleHtml(s) {\n    if (window.Pult) return window.Pult.karte(s, ARTNAME);\n    return '<article class=\"rch-stelle\"")
    ers("jeBand ? 'Bände · ' + mit + ' mit Treffern' : 'Bände';\n  }", "jeBand ? 'Bände · ' + mit + ' mit Treffern' : 'Bände';\n    if (window.Pult) window.Pult.baende(jeBand);\n  }")
    ers("    var url = location.pathname + (p.toString() ? '?' + p.toString() : '');", "    if (window.Pult) window.Pult.adresse(p);\n    var url = location.pathname + (p.toString() ? '?' + p.toString() : '');")
    ers("    S.hervor = p.get('hervor') === '1';\n", "    S.hervor = p.get('hervor') === '1';\n    if (window.Pult) window.Pult.lies(p);\n")
    ers("  // ── Start ───────────────────────────────────────────────────────────\n", KONTEXT + "  // ── Start ───────────────────────────────────────────────────────────\n")
    return t


if __name__ == '__main__':
    quelle = pathlib.Path(sys.argv[2]) if len(sys.argv) > 2 and sys.argv[1] == '--aus' else ZIEL
    alt = quelle.read_text(encoding='utf-8')
    if MARKE in alt:
        sys.exit('Das Pult ist schon eingebaut. Für einen neuen Einbau erst die Seite neu ableiten: python3 werkzeug/recherche_seite.py')
    ZIEL.write_text(einbau(alt), encoding='utf-8')
    print('Pult in search.html eingebaut')
