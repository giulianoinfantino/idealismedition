#!/usr/bin/env python3
"""Das Portal auf den Stand der Editionen bringen: Suchdaten zusammenlegen, Zahlen und Bandlisten in die Startseite schreiben.

Quellen sind die Ordner, aus denen die Editionen ausgeliefert werden, nie die Arbeitsordner mit gesperrten Baenden:
  Schelling  ~/schelling/site
  Hegel      ~/hegel-umfrage-wt   (ohne GW 13 und GW 16, bis 31.12.2026 gesperrt)

Aufruf nach jeder Freigabe einer Edition:  python3 werkzeug/sammle.py
"""
import datetime, html, json, pathlib, re, shutil, subprocess, sys

HOME = pathlib.Path.home()
P = HOME / 'idealismus'
S = P / 'site'
SUCHE = S / 'assets/suche'
GESPERRT = {'gw-13', 'gw-16'}   # § 70 UrhG bis 31.12.2026 (GW 13: Erscheinen 2000/2001 strittig), siehe Hegel-Edition
# Die Fichte-Edition (Domain seit 08.11.2026)
FICHTE_URL = 'https://www.fichteedition.com'

EDITIONEN = [
    dict(id='fichte', name='Fichte', voll='Johann Gottlieb Fichte', leben='1762–1814',
         ausgabe='Sämmtliche Werke', hg='und Nachgelassene Werke, herausgegeben von I. H. Fichte, Berlin 1845–1846 und Bonn 1834–1835',
         url=FICHTE_URL, quelle=HOME / 'fichte/site', praefix='f'),
    dict(id='schelling', name='Schelling', voll='Friedrich Wilhelm Joseph Schelling', leben='1775–1854',
         ausgabe='Sämmtliche Werke', hg='herausgegeben von K. F. A. Schelling, Stuttgart und Augsburg 1856–1861',
         url='https://www.schellingedition.com', quelle=HOME / 'schelling/site', praefix='sw-'),
    dict(id='hegel', name='Hegel', voll='Georg Wilhelm Friedrich Hegel', leben='1770–1831',
         ausgabe='Gesammelte Werke', hg='herausgegeben von der Nordrhein-Westfälischen Akademie der Wissenschaften, seit 1968',
         url='https://www.hegeledition.com', quelle=HOME / 'hegel-umfrage-wt', praefix='gw-'),
]

SCHMAL = '&#8239;'
def zahl(n): return f'{n:,}'.replace(',', SCHMAL)
def esc(s): return html.escape(str(s), quote=True)


def lies_edition(e):
    q = e['quelle']
    t = (q / 'assets/edition-data.js').read_text(encoding='utf-8').split('=', 1)[1].strip().rstrip(';')
    werke = [w for w in json.loads(t)['works'] if w['work_id'] not in GESPERRT]
    start = (q / 'index.html').read_text(encoding='utf-8')
    m = re.search(r'st-zahl-fassung.*?<dd>.*?>\s*([\d.]+)\s*<', start, re.S)
    if not m: sys.exit(f"{e['name']}: Fassungsnummer auf der Startseite nicht gefunden")
    n = re.search(r'<a class="st-neu" href="([^"]+)"', start)
    ix = json.loads((q / 'assets/suche/index.json').read_text(encoding='utf-8'))
    baende = [b for b in ix['baende'] if b['work'] not in GESPERRT]
    if {b['work'] for b in baende} != {w['work_id'] for w in werke}:
        sys.exit(f"{e['name']}: Suchindex und Bandliste stimmen nicht überein")
    e.update(werke=werke, fassung=m.group(1), stand=ix['stand'], baende=baende,
             neu=(e['url'] + '/' + n.group(1).removesuffix('.html')) if n else e['url'] + '/neuigkeiten')


def seiten(w): return w['stats'].get('pages_body') or w['stats'].get('pages_total') or 0


def titel(t):
    m = re.match(r'^(.*?)\s*\(([^()]*)\)$', t)
    return (m.group(1), m.group(2)) if m else (t, '')


def band_html(e, w):
    name, jahr = titel(w['title'])
    return ('<li class="st-band">'
            f'<span class="st-band-nr" aria-hidden="true">{esc(w["siglum"] if e["id"] == "fichte" else w["band"])}</span>'
            f'<a class="st-band-titel" href="{e["url"]}/text?work={esc(w["work_id"])}">'
            f'<span class="st-vh">{e["name"]}, {esc(w["siglum"])}: </span>{esc(name)}'
            + (f' <span class="st-band-jahr">{esc(jahr)}</span>' if jahr else '') + '</a>'
            f'<span class="st-band-seiten">{zahl(seiten(w))}&nbsp;<abbr title="Seiten">S.</abbr></span>'
            '</li>')


KURZ = {'fichte': 'Sämmtliche und Nachgelassene Werke', 'schelling': 'Sämmtliche Werke', 'hegel': 'Gesammelte Werke'}


def edition_html(e):
    """Eine stille Karte je Edition: Name, Lebensdaten, Ausgabe, Umfang, Weg in die Edition."""
    n = len(e.get('werke', []))
    stand = f'{n} Bände · Fassung {esc(e["fassung"])}' if n else 'In Vorbereitung'
    return (f'<a class="ei-karte" id="{e["id"]}" href="{e["url"]}/">'
            f'<span class="ei-karte-name">{e["name"]}</span>'
            f'<span class="ei-karte-leben">{e["leben"]}</span>'
            f'<span class="ei-karte-ausgabe">{KURZ[e["id"]]}</span>'
            f'<span class="ei-karte-stand">{stand}</span>'
            f'<span class="ei-karte-weg">Zur Edition <span aria-hidden="true">→</span></span></a>')


def ersetze(text, marke, neu):
    a, b = f'<!-- {marke}:anfang -->', f'<!-- {marke}:ende -->'
    i, j = text.find(a), text.find(b)
    if i < 0 or j < 0: sys.exit(f'Marke {marke} fehlt')
    return text[:i + len(a)] + '\n' + neu + '\n' + text[j:]


def main():
    da = [e for e in EDITIONEN if 'quelle' in e]
    for e in da: lies_edition(e)

    # Suchdaten: eine Bandliste in der Folge der Editionen, die Dateien unveraendert
    if SUCHE.exists(): shutil.rmtree(SUCHE)
    SUCHE.mkdir(parents=True)
    baende = []
    for e in da:
        for b in e['baende']:
            shutil.copy2(e['quelle'] / 'assets/suche' / f"{b['work']}.json", SUCHE)
            baende.append({**b, 'ed': e['id']})
    stand = max(e['stand'] for e in da)
    (SUCHE / 'index.json').write_text(json.dumps({'v': 1, 'stand': stand, 'baende': baende}, ensure_ascii=False), encoding='utf-8')
    woerter = json.loads(subprocess.check_output(['node', str(P / 'werkzeug/woerter.mjs'), str(SUCHE)], text=True))

    # Bandliste und Editionen fuer die Recherche, bevor der Worker geladen hat
    eds = {e['id']: {'name': e['name'], 'url': e.get('url', ''), 'ausgabe': KURZ[e['id']]} for e in EDITIONEN}
    (S / 'assets/baende.js').write_text(
        '/* Von werkzeug/sammle.py geschrieben. */\n'
        'window.IDEALISMUS_EDITIONEN = ' + json.dumps(eds, ensure_ascii=False) + ';\n'
        'window.HEGEL_EDITION_BAENDE = ' + json.dumps([{'work': b['work'], 'sig': b['sig'], 'title': b['title'], 'ed': b['ed']} for b in baende], ensure_ascii=False) + ';\n',
        encoding='utf-8')

    # Startseite
    nb = sum(len(e['werke']) for e in da)
    ns = sum(seiten(w) for e in da for w in e['werke'])
    nw = sum(woerter.values())
    mio = f'{nw / 1e6:.1f}'.replace('.', ',')
    zahlen = f'      {nb} Bände · {zahl(ns)} Seiten · {mio}&nbsp;Mio. Wörter'
    # Startseite: Bandzahlen unter den Bildnissen und im Suchfeld
    i = (S / 'de' / 'index.html').read_text(encoding='utf-8')
    for e in da:
        i = re.sub(rf'(<span data-baende="{e["id"]}">)\d+ Bände', rf'\g<1>{len(e["werke"])} Bände', i)
    i = re.sub(r'placeholder="In allen \d+ Bänden suchen"', f'placeholder="In allen {nb} Bänden suchen"', i)
    (S / 'de' / 'index.html').write_text(i, encoding='utf-8')
    r = (S / 'de' / 'recherche.html').read_text(encoding='utf-8')
    r = re.sub(r'(<p class="rch-unter" id="rch-unter">)[^<]*', rf'\g<1>Volltext von Fichte, Schelling und Hegel · {nb} Bände', r, count=1)
    (S / 'de' / 'recherche.html').write_text(r, encoding='utf-8')

    # Sitemap
    heute = datetime.date.today().isoformat()
    urls = [('/', 1.0), ('/recherche', 0.9), ('/unterstuetzen', 0.5), ('/impressum', 0.2), ('/datenschutz', 0.2)]
    urls += [('/de' + u if u != '/' else '/de/', round(max(0.1, p - 0.1), 1)) for u, p in list(urls)]   # Deutsch unter /de/
    (S / 'sitemap.xml').write_text(
        '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        + ''.join(f'  <url><loc>https://www.idealismedition.com{u}</loc><lastmod>{heute}</lastmod><priority>{p}</priority></url>\n' for u, p in urls)
        + '</urlset>\n', encoding='utf-8')

    for e in da:
        print(f"{e['name']}: {len(e['werke'])} Bände, Fassung {e['fassung']}, Stand {e['stand']}, "
              f"{sum(seiten(w) for w in e['werke'])} Seiten, {sum(v for k, v in woerter.items() if k.startswith(e['praefix']))} Wörter")
    print(f'Portal: {nb} Bände, {ns} Seiten, {nw} Wörter, Suchstand {stand}')


if __name__ == '__main__':
    main()
