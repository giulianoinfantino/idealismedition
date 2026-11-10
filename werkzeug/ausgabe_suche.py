#!/usr/bin/env python3
"""Die Recherche des Portals in die Seite einer einzelnen Ausgabe setzen (seit 11/2026).

Die Suchseiten der Ausgaben (fichteedition.com/search, schellingedition.com/search, hegeledition.com/search)
bekommen dieselbe Recherche wie das Portal, auf den einen Autor zugeschnitten: keine Autorenschalter, die
Stationen des Autors stehen immer bei den Filtern, Werkwahl und Zeitkurve nur für seine Bände, die Ansicht
„Vergleich“ und die Querverweise entfallen. Kopf, Fuß und die übrigen Skripte der Seite bleiben die der Ausgabe.

  python3 werkzeug/ausgabe_suche.py fichte|schelling|hegel [ordner-der-ausgabe] [--sw]

Schreibt in der Ausgabe: de/search.html, assets/recherche-{pult,quer,portal-worker}.js, assets/recherche-{pult,ausgabe}.css, assets/zeitkurve.{js,css},
assets/suche-baende.js, assets/suche/jahre.json; ergänzt sprache/konfig.json (Skripte, wörtliche Ersetzungen).
--sw zählt den Speichernamen in sw.js hoch (bei jeder Auslieferung nötig, die CSS oder JS ändert).
Danach in der Ausgabe: englisch.py <ordner> auszug, dann dieses Skript mit --en (füllt sprache/en.json aus der
Tabelle des Portals), dann englisch.py <ordner> bauen.
Nach jedem sammle.py mit neuen Suchdaten einer Ausgabe erneut laufen lassen (jahre.json zählt in Einheiten des Index).
"""
import json, pathlib, re, shutil, sys

P = pathlib.Path(__file__).resolve().parent.parent
HOME = pathlib.Path.home()
N = '<span class="n" data-zahl></span>'
AUSGABEN = {
    'fichte': dict(name='Fichte', gen='Fichtes', wurzel=HOME / 'fichte', site='site', ausgabe='Sämmtliche und Nachgelassene Werke',
                   zitat='SW I, 91', beispiele=['phrase:"intellectuelle Anschauung"', 'near:Freiheit|Nothwendigkeit', 'sein', 'seyn', 'satz:Bestimmung|Mensch', 'oder:Sittlichkeit|Moralität|Recht']),
    'schelling': dict(name='Schelling', gen='Schellings', wurzel=HOME / 'schelling', site='site', ausgabe='Sämmtliche Werke',
                      zitat='SW I/7, 350', beispiele=['phrase:"intellectuelle Anschauung"', 'near:Identität|Differenz', 'sein', 'seyn', 'satz:Geist|Natur', 'oder:Begriff|Idee|Urtheil']),
    'hegel': dict(name='Hegel', gen='Hegels', wurzel=HOME / 'Desktop/Claude Code/idealismus-edition/Hegel Edition', site='.', ausgabe='Gesammelte Werke',
                  zitat='GW 9, 23', beispiele=['phrase:"an und für sich"', 'near:Freiheit|Nothwendigkeit', 'sein', 'seyn', 'satz:Substanz|Subject', 'oder:Begriff|Idee|Urtheil']),
}
ERKLAERUNG = {   # deutsch, englisch
    'phrase': ('Die genaue Wortfolge, in jeder Schreibung der Zeit.', 'The exact phrase, in every period spelling.'),
    'near': ('Beide Wörter höchstens acht Wörter voneinander, in beliebiger Folge.', 'Both words within eight words of each other, in either order.'),
    'sein': ('Die heutige Schreibung findet auch <i>Seyn</i>.', 'Modern spelling also finds <i>Seyn</i>.'),
    'seyn': ('Jedes Wort mit diesem Ende: <i>Daseyn</i>, <i>Fürsichseyn</i>.', 'Any word with this ending: <i>Daseyn</i>, <i>Fürsichseyn</i>.'),
    'satz': ('Beide Wörter im selben Satz.', 'Both words in the same sentence.'),
    'oder': ('Eines von zwei Wörtern, zusammen mit einem dritten.', 'Either of two words, together with a third.'),
}
ASSETS = ['recherche-pult.js', 'recherche-pult.css', 'recherche-portal-worker.js', 'recherche-quer.js', 'zeitkurve.js', 'zeitkurve.css']
JS_DAZU = ['recherche-portal-worker.js', 'recherche-quer.js', 'zeitkurve.js']


def beispiel(b):
    art, _, rest = b.partition(':')
    w = rest.split('|')
    if art == 'phrase': q, zeige = rest, '„' + rest.strip('"') + '“'
    elif art == 'near': q, zeige = f'{w[0]} NEAR/8 {w[1]}', f'{w[0]} <code>NEAR/8</code> {w[1]}'
    elif art == 'sein': q, zeige = 'Sein', 'Sein'
    elif art == 'seyn': q, zeige = '*seyn', '<code>*</code>seyn'
    elif art == 'satz': q, zeige = f'{w[0]} SENTENCE {w[1]}', f'{w[0]} <code>SENTENCE</code> {w[1]}'
    else: q, zeige = f'({w[0]} OR {w[1]}) AND {w[2]}', f'({w[0]} <code>OR</code> {w[1]}) <code>AND</code> {w[2]}'
    return (f'            <button type="button" data-q="{q.replace(chr(34), "&quot;")}"><span class="q">{zeige}</span>{N}'
            f'<span class="w">{ERKLAERUNG[art][0]}</span></button>')


def zwischen(t, a, b, mit_b=True):
    i = t.index(a); j = t.index(b, i)
    return t[i:j + (len(b) if mit_b else 0)]


def baue(ed, wurzel, sw=False):
    A = AUSGABEN[ed]
    S = wurzel if A['site'] == '.' else wurzel / A['site']
    pd = (P / 'site/de/search.html').read_text(encoding='utf-8')
    e = (S / 'de/search.html').read_text(encoding='utf-8')
    index = json.loads((S / 'assets/suche/index.json').read_text(encoding='utf-8'))
    if any(b['work'] in ('gw-13', 'gw-16') for b in index['baende']): sys.exit('GW 13 oder GW 16 im Suchindex: nicht ausliefern')

    def ers(t, alt, neu, n=1):
        if t.count(alt) != n: sys.exit(f'ausgabe_suche ({ed}): {t.count(alt)}× statt {n}×: {alt[:90]!r}')
        return t.replace(alt, neu)

    # ── Jahr und Gattung der Werke dieser Ausgabe: daraus das Zeitfenster der Achsen und die Gattungen, die es gibt ──
    jahre = json.loads((P / 'site/assets/suche/jahre.json').read_text(encoding='utf-8'))
    fehlt = [b['work'] for b in index['baende'] if b['work'] not in jahre['baende']]
    if fehlt: sys.exit(f'jahre.json des Portals kennt nicht: {fehlt}')
    jahre['baende'] = {b['work']: jahre['baende'][b['work']] for b in index['baende']}
    werke = [w for l in jahre['baende'].values() for w in l]
    js = [w[1] for w in werke if w[1]]
    gattungen = {w[2] for w in werke}
    von = 1785 + (min(js) - 1785) // 5 * 5          # Jahrfünfte wie im Portal: 1785, 1790, …
    nj = (max(js) - von) // 5 + 1
    bis = von + 5 * nj - 1

    # ── Die Seite der Ausgabe in ihre Teile: Kopf mit Kopfzeile, Fuß, Schluss ──
    schon = 'assets/recherche-pult.css' in e
    kopf = e[:e.index('<main')]
    fuss = zwischen(e, '</main>', '<script src="assets/ortho.js">', False)[len('</main>'):]
    i = e.index('<script>', e.index('<script src="assets/recherche-kern.js">'))
    schluss = e[e.index('\n</script>', i) + len('\n</script>'):]
    art_n = re.search(r'data-art="n" aria-pressed="true">(.*?) <span class="n">', e).group(1)
    artname = re.search(r"var ARTNAME = \{ n: '([^']*)', h: 'Überschrift' \};", e).group(1)
    zuletzt = re.search(r"var ZL = '([^']*)';", e).group(1)            # zuletzt Gesuchtes im Browser: der Schlüssel der Ausgabe bleibt
    csv = re.search(r"var name = '([a-z]+)-' \+ \(m\.art === 'kwic'", e).group(1)
    hinweis = re.search(r'<p class="rch-unter">Operatoren gelten[^<]*</p>', e).group(0)
    if not schon:
        kopf = ers(kopf, '  <link rel="stylesheet" href="assets/recherche.css">',
                   '  <link rel="stylesheet" href="assets/recherche.css">\n  <link rel="stylesheet" href="assets/recherche-ausgabe.css">\n'
                   '  <link rel="stylesheet" href="assets/zeitkurve.css">\n  <link rel="stylesheet" href="assets/recherche-pult.css">')
        kopf = ers(kopf, '<body class="search-page recherche rch-ruhe">', '<body class="search-page recherche rch-ruhe pult pult-eine">')

    # ── Der Hauptteil des Portals, auf den einen Autor gestellt ──
    m = zwischen(pd, '<main', '</main>')
    m = ers(m, '<h1>Jedes Wort von Fichte, Schelling und Hegel, zitiert bis zur Druckzeile.</h1>', f'<h1>Jedes Wort {A["gen"]}, zitiert bis zur Druckzeile.</h1>')
    m, n = re.subn(r'(<p class="rch-unter" id="rch-unter">)[^<]*', rf'\g<1>{len(index["baende"])} Bände im Volltext', m, count=1)
    if n != 1: sys.exit('rch-unter fehlt')
    m = ers(m, 'placeholder="Wort, Wendung, Zitat (GW 9, 23) oder Werktitel"', f'placeholder="Wort, Wendung, Zitat ({A["zitat"]}) oder Werktitel"')
    m = ers(m, 'data-art="n" aria-pressed="true">Anmerkungen <span class="n">', f'data-art="n" aria-pressed="true">{art_n} <span class="n">')
    m, n = re.subn(r'(<div class="rch-beispiele pl-beispiele">\n).*?(\n          </div>)', lambda x: x.group(1) + '\n'.join(beispiel(b) for b in A['beispiele']) + x.group(2), m, count=1, flags=re.S)
    if n != 1: sys.exit('Beispiele fehlen')
    m, n = re.subn(r'\n\s*<button type="button" data-ansicht="vergleich"><span class="bild" data-bild="autoren">.*?</button>', '', m, count=1)
    if n != 1: sys.exit('kleine Ansicht „Vergleich“ fehlt')
    m, n = re.subn(r'\n\s*<button type="button" role="tab" id="tab-vergleich"[^\n]*', '', m, count=1)
    if n != 1: sys.exit('Reiter „Vergleich“ fehlt')
    m = ers(m, 'aria-controls="search-results">Zeit<span class="kz">5</span>', 'aria-controls="search-results">Zeit<span class="kz">4</span>')
    m = ers(m, 'aria-controls="search-results">Begriffe<span class="kz">6</span>', 'aria-controls="search-results">Begriffe<span class="kz">5</span>')
    m = ers(m, '<dt>1 – 6</dt><dd>Stellen, Konkordanz, Verteilung, Vergleich, Zeit, Begriffe</dd>', '<dt>1 – 5</dt><dd>Stellen, Konkordanz, Verteilung, Zeit, Begriffe</dd>')
    m, n = re.subn(r'<p class="rch-unter">Operatoren gelten[^<]*</p>', lambda x: hinweis, m, count=1)
    if n != 1: sys.exit('Hinweis zu den Operatoren fehlt')
    m = ers(m, '        <div class="qb-feld" id="qb" hidden></div>\n', '')
    m = ers(m, 'placeholder="1785" inputmode="numeric">', f'placeholder="{min(js)}" inputmode="numeric">')
    m = ers(m, 'placeholder="1854" inputmode="numeric">', f'placeholder="{max(js)}" inputmode="numeric">')
    m = ers(m, 'Von 1785 bis 1854 in Jahrfünften, nach dem Jahr jeder Schrift.', f'Von {von} bis {bis} in Jahrfünften, nach dem Jahr jeder Schrift.')
    for g in 'dvne':
        if g in gattungen: continue
        m, n = re.subn(rf'\n\s*<button type="button" class="rch-gattung" data-g="{g}"[^\n]*', '', m, count=1)
        if n != 1: sys.exit(f'Gattung {g} fehlt in der Seite')

    # ── Skripte des Portals, ohne was nur das Portal hat ──
    s = zwischen(pd, '<script src="assets/ortho.js">', '<script src="assets/auswahl.js" defer>', False).rstrip() + '\n'
    s = ers(s, '<script src="assets/baende.js"></script>', '<script src="assets/suche-baende.js"></script>')
    s = ers(s, '<script src="assets/parallel-start.js" defer></script>\n', '')
    s = ers(s, "      worker.postMessage({ typ: 'bezuege' });\n", '')
    s = ers(s, "  var ARTNAME = { n: 'Anmerkung', h: 'Überschrift' };", f"  var ARTNAME = {{ n: '{artname}', h: 'Überschrift' }};")
    s = ers(s, "var ZL = 'idealismus-recherche-zuletzt';", f"var ZL = '{zuletzt}';")
    s = ers(s, "['stellen', 'konkordanz', 'verteilung', 'vergleich', 'zeit', 'begriffe'].indexOf(p.get('ansicht'))", "['stellen', 'konkordanz', 'verteilung', 'zeit', 'begriffe'].indexOf(p.get('ansicht'))")
    s = ers(s, "var name = 'idealismus-' + (m.art === 'kwic'", f"var name = '{csv}-' + (m.art === 'kwic'")
    s = ers(s, "    else if (e.key === '4') setzeAnsicht('vergleich');\n    else if (e.key === '5') setzeAnsicht('zeit');\n    else if (e.key === '6') setzeAnsicht('begriffe');",
            "    else if (e.key === '4') setzeAnsicht('zeit');\n    else if (e.key === '5') setzeAnsicht('begriffe');")
    (S / 'de/search.html').write_text(kopf + m + fuss + s + schluss.lstrip('\n'), encoding='utf-8')

    # ── Dateien ──
    for f in ASSETS: shutil.copy2(P / 'site/assets' / f, S / 'assets' / f)
    portal_css = (P / 'site/assets/recherche-portal.css').read_text(encoding='utf-8')
    (S / 'assets/recherche-ausgabe.css').write_text(
        '/* Von werkzeug/ausgabe_suche.py des Portals: recherche-portal.css ohne die Regeln für die Kopfzeile des Portals. */\n'
        + '\n'.join(z for z in portal_css.split('\n') if '.sitenav' not in z) , encoding='utf-8')
    (S / 'assets/suche-baende.js').write_text(
        '/* Von werkzeug/ausgabe_suche.py des Portals geschrieben: die Bände dieser Ausgabe für die Recherche. */\n'
        'window.IDEALISMUS_EDITIONEN = ' + json.dumps({ed: {'name': A['name'], 'url': '.', 'ausgabe': A['ausgabe']}}, ensure_ascii=False) + ';\n'
        'window.HEGEL_EDITION_BAENDE = ' + json.dumps([{'work': b['work'], 'sig': b['sig'], 'title': b['title'], 'ed': ed} for b in index['baende']], ensure_ascii=False) + ';\n'
        f'window.RECHERCHE_ZEIT = {{"von": {von}, "n": {nj}}};   // Achsen: {von}–{bis} in Jahrfünften\n',
        encoding='utf-8')
    (S / 'assets/suche/jahre.json').write_text(json.dumps(jahre, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')

    # ── Übersetzung: Skripte anmelden, wörtliche Ersetzungen des Portals übernehmen, soweit sie nur die Recherche treffen ──
    kp = wurzel / 'sprache/konfig.json'
    k = json.loads(kp.read_text(encoding='utf-8'))
    for f in JS_DAZU:
        if f not in k['js']: k['js'].append(f)
    pk = json.loads((P / 'sprache/konfig.json').read_text(encoding='utf-8'))
    # Der Suchkern ist in Portal und Ausgaben dieselbe Datei: Ersetzungen des Portals für ihn gelten auch hier
    eigene = '\n'.join((P / 'site/assets' / f).read_text(encoding='utf-8') for f in JS_DAZU + ['recherche-kern.js']) + pd
    andere = '\n'.join((S / 'assets' / f).read_text(encoding='utf-8') for f in k['js'] if f not in JS_DAZU + ['recherche-kern.js'] and (S / 'assets' / f).exists())
    for paar in pk.get('ersetzen', []):
        if paar in k.setdefault('ersetzen', []) or paar[0] not in eigene: continue
        if paar[0] in andere: print(f'  Ersetzung ausgelassen (träfe andere Skripte der Ausgabe): {paar[0][:60]}'); continue
        k['ersetzen'].append(paar)
    kp.write_text(json.dumps(k, ensure_ascii=False, indent=1) + '\n', encoding='utf-8')

    if sw:
        swp = S / 'sw.js'
        t = swp.read_text(encoding='utf-8')
        t, n = re.subn(r"(var CACHE = '[a-z]+-v)(\d+)'", lambda x: x.group(1) + str(int(x.group(2)) + 1) + "'", t, count=1)
        if n != 1: sys.exit('sw.js: Speichername nicht gefunden')
        swp.write_text(t, encoding='utf-8')
    print(f'{ed}: Recherche gesetzt ({len(index["baende"])} Bände)' + (', sw.js hochgezählt' if sw else ''))


def englisch(ed, wurzel):
    """sprache/en.json der Ausgabe: offene Abschnitte aus der Tabelle des Portals füllen, dazu die Sätze dieser Ausgabe."""
    A = AUSGABEN[ed]
    p = wurzel / 'sprache/en.json'
    d = json.loads(p.read_text(encoding='utf-8'))
    pe = json.loads((P / 'sprache/en.json').read_text(encoding='utf-8'))
    alle = {}
    for teil in ('seiten', 'js'):
        for a, b in pe[teil].items():
            if b is not None: alle.setdefault(a, b)
    def zitat_schluessel(z): return re.sub(r'\d+', lambda x, c=iter(range(99)): '{%d}' % next(c), z)
    eigen = {
        f'Jedes Wort {A["gen"]}, zitiert bis zur Druckzeile.': f'Every word of {A["name"]}, cited to the line.',
        'Stellen, Konkordanz, Verteilung, Zeit, Begriffe': 'Passages, Concordance, Distribution, Time, Terms',
        zitat_schluessel(f'Wort, Wendung, Zitat ({A["zitat"]}) oder Werktitel'): zitat_schluessel(f'Word, phrase, citation ({A["zitat"]}) or work title'),
    }
    offen = []
    for teil in ('seiten', 'js'):
        for a, b in d[teil].items():
            if b is not None: continue
            if a in eigen: d[teil][a] = eigen[a]; continue
            if a in alle: d[teil][a] = alle[a]; continue
            neu = a
            for de, en in ERKLAERUNG.values(): neu = neu.replace(de, en)
            neu = re.sub(r'„([^“]*)“', r'“\1”', neu)
            # Bruchstücke der Beispielanfragen (deutsche Suchwörter) bleiben, wie sie sind
            if neu != a or re.fullmatch(r'(<span class="q">)?[\wäöüÄÖÜß() .\-]+(</span>)?', a): d[teil][a] = neu
            else: offen.append(a)
    p.write_text(json.dumps(d, ensure_ascii=False, indent=1, sort_keys=False) + '\n', encoding='utf-8')
    print(f'{ed}: en.json gefüllt, offen {len(offen)}')
    for a in offen: print('   ', repr(a)[:200])


if __name__ == '__main__':
    arg = [a for a in sys.argv[1:] if not a.startswith('--')]
    if not arg or arg[0] not in AUSGABEN: sys.exit(__doc__)
    w = pathlib.Path(arg[1]).resolve() if len(arg) > 1 else AUSGABEN[arg[0]]['wurzel']
    if '--en' in sys.argv: englisch(arg[0], w)
    else: baue(arg[0], w, sw='--sw' in sys.argv)
