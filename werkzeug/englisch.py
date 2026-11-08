#!/usr/bin/env python3
"""Englische Fassung einer Edition aus ihren deutschen Seiten bauen.

Die deutschen Seiten sind die Quelle und liegen unter site/de/. Die englischen Seiten entstehen daraus
unter denselben Namen im Wurzelverzeichnis, die übersetzten Skripte unter site/assets/en/.
Übersetzt wird über eine Tabelle (sprache/en.json): Schlüssel ist der deutsche Abschnitt, Zahlen darin als
Platzhalter {0}, {1} …, damit sich berechnete Seiten (Richtlinien, Kennzahlen) ohne neue Übersetzung neu bauen.

  englisch.py <repo> umzug      einmalig: site/*.html nach site/de/, vercel.json-Umschreibungen
  englisch.py <repo> auszug     neue deutsche Abschnitte in sprache/en.json aufnehmen (en = null)
  englisch.py <repo> bauen      englische Seiten und Skripte schreiben; meldet Fehlendes

Konfiguration: <repo>/sprache/konfig.json
  {"site": "site", "basis": "https://www.fichteedition.com", "js": ["recherche-kern.js", …]}
"""
import html as H
import json, pathlib, re, subprocess, sys

BLOCK = set('''html head body title p li h1 h2 h3 h4 h5 h6 dt dd figcaption td th summary button label caption
blockquote option legend div section header footer nav ul ol dl figure main article aside table tr tbody thead
form details select'''.split())
VOID = set('br hr img input meta link source wbr col area base embed param track'.split())
SKIP = ('script', 'style', 'svg', 'code', 'pre', 'textarea', 'noscript')
TOKEN = re.compile(r'<!--.*?-->|<(script|style|svg|code|pre|textarea|noscript)\b[^>]*>.*?</\1\s*>|<[^>]+>|[^<]+', re.S | re.I)
BUCHST = re.compile(r'[A-Za-zÄÖÜäöüß]')
# Zahl im Seitentext: 6&#8239;424 · 99,98 · 1845 · nicht Ziffern in Entities (&#8239;)
ZAHL = re.compile(r'(?<![\w#&])\d+(?:(?:&#8239;|&nbsp;| | )\d{3})*(?:,\d+)?(?!\w)')
ATTR = re.compile(r'\b(alt|title|aria-label|placeholder)="([^"]*)"')
META = re.compile(r'<meta\s+(?:name|property)="(description|og:description|twitter:description|og:title|twitter:title)"\s+content="([^"]*)"')
DEUTSCH = re.compile(r'[äöüßÄÖÜ„“]|\b(?:der|die|das|den|dem|des|und|oder|nicht|keine?n?|eine?[mnrs]?|mit|von|für|auf|bis|aus|nach|im|zum|zur|Seite\w*|Band|Bände\w*|Wort\w*|Wörter|Stelle\w*|Treffer|Suche\w*|Zeile\w*|Text\w*|Lektüre|Anmerkung\w*|Druck\w*|Inhalt\w*|Recherche|Sperr\w*|Kursiv\w*|wird|werden|ist|sind|Verzeichnis\w*|Ausgabe\w*|Herausgeber\w*|schlie\w*|öffne\w*|Fassung)\b')
# Stellen, an denen ein Wort zugleich Anzeige und Schlüssel ist oder die Tabelle nicht greift:
# im englischen Ergebnis (Seiten und assets/en/*.js) wörtlich ersetzen. Weitere je Repo in konfig.json "ersetzen".
ERSETZEN = [
    ("? 'ein' : 'aus'", "? 'on' : 'off'"),
    ("MONATE = ['Jan.', 'Feb.', 'März', 'Apr.', 'Mai', 'Juni', 'Juli', 'Aug.', 'Sep.', 'Okt.', 'Nov.', 'Dez.'];",
     "MONATE = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June', 'July', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];"),
    ("'Gesucht: '", "'Searched for: '"),
    ("'Fehler: ' +", "'Error: ' +"),
    # Der Such-Worker liegt in assets/en/; seine Daten liegen in assets/suche/
    ("new URL('suche/', self.location.href)", "new URL('../suche/', self.location.href)"),
    ('class="cookie-notice-ok">Verstanden</button>', 'class="cookie-notice-ok">Got it</button>'),
    ("'Alle ' + gesamt", "'All ' + gesamt"),
    ("'Fehler beim Senden. Bitte versuchen Sie es erneut.'", "'Sending failed. Please try again.'"),
]
JSLIT = re.compile(r"'((?:[^'\\\n]|\\.)*)'|\"((?:[^\"\\\n]|\\.)*)\"|`((?:[^`\\]|\\.)*)`", re.S)


def norm(s):
    return re.sub(r'\s+', ' ', s).strip()


def zahlen_raus(s):
    z = []
    def f(m):
        z.append(m.group(0)); return '{%d}' % (len(z) - 1)
    return ZAHL.sub(f, s), z


def zahl_en(z):
    """Deutsche Zahl in englische Schreibweise: Tausender mit Komma, Dezimalpunkt."""
    z = re.sub(r'(?<=\d)(?:&#8239;|&nbsp;| | )(?=\d{3})', ',', z)
    return re.sub(r'(?<=\d),(?=\d)', '.', z) if re.search(r',\d{1,2}$|,\d+$', z) and not re.search(r',\d{3}$', z) else z


MONATE = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']


def datum_en(s):
    """27.08.2026 -> 27 August 2026 (im englischen Text, nach dem Einsetzen der Zahlen)."""
    return re.sub(r'\b(\d{1,2})\.(\d{1,2})\.(\d{4})\b',
                  lambda m: f'{int(m.group(1))} {MONATE[int(m.group(2)) - 1]} {m.group(3)}' if 1 <= int(m.group(2)) <= 12 else m.group(0), s)


def zahlen_im_text(t):
    """Sichtbarer Text der englischen Seite: 133 514 -> 133,514; 0,56% -> 0.56% (nicht in Tags, Skripten, Stilen)."""
    def text(s):
        s = re.sub(r'(?<![\d,.])(\d{1,3})((?:(?: |\u202f|\u2009|\u00a0|&#8239;|&thinsp;|&nbsp;)\d{3})+)(?![\d,])',
                   lambda m: m.group(1) + re.sub(r'(?: |\u202f|\u2009|\u00a0|&#8239;|&thinsp;|&nbsp;)', ',', m.group(2)), s)
        return re.sub(r'(?<=\d),(?=\d+(?:\s|&nbsp;|\u202f)?%)', '.', s)
    teile = re.split(r'(<script\b.*?</script>|<style\b.*?</style>|<[^>]+>)', t, flags=re.S | re.I)
    return ''.join(x if i % 2 else text(x) for i, x in enumerate(teile))


def ohne_umschalter(t):
    """Der Sprachumschalter wird je Sprache neu gesetzt und nicht übersetzt."""
    return re.sub(r'\n  <div class="kopf-rechts">.*?</div>', '', t, flags=re.S)


def ohne_huelle(s):
    """<a …>Text</a> -> Text, solange der Abschnitt aus genau einem Element besteht."""
    while True:
        m = re.fullmatch(r'<(\w+)\b[^>]*>(.*)</\1>', s, re.S)
        if not m or '<' + m.group(1) in m.group(2) or not BUCHST.search(m.group(2)):
            return s
        s = m.group(2).strip()


def abschnitte(t):
    """Liefert (anfang, ende, text) aller übersetzbaren Abschnitte einer Seite, nicht überlappend."""
    stapel, aus = [], []
    for m in TOKEN.finditer(t):
        tok = m.group(0)
        if m.group(1) or tok.startswith('<!--'):
            if stapel: stapel[-1]['kinder'].append((m.start(), m.end()))
            continue
        if tok.startswith('</'):
            name = tok[2:].strip(' >').lower()
            if name not in BLOCK: continue
            while stapel:
                e = stapel.pop()
                if e['name'] == name: break
            else:
                continue
            a, kinder = e['inhalt'], e['kinder'] + [(m.start(), m.start())]
            for k0, k1 in kinder:
                lauf = t[a:k0]
                if BUCHST.search(re.sub(r'<[^>]+>|&\w+;|&#\d+;', '', lauf)):
                    l = len(lauf) - len(lauf.lstrip()); r = len(lauf.rstrip())
                    aus.append((a + l, a + r))
                a = max(a, k1)
            if stapel: stapel[-1]['kinder'].append((e['start'], m.end()))
        elif tok.startswith('<'):
            name = re.match(r'<\s*([\w-]+)', tok)
            name = name.group(1).lower() if name else ''
            if name in BLOCK and name not in VOID and not tok.endswith('/>'):
                stapel.append({'name': name, 'start': m.start(), 'inhalt': m.end(), 'kinder': []})
    erg = []
    for a, b in sorted(aus):
        s = t[a:b]
        innen = ohne_huelle(s)
        if innen != s:
            i = s.find(innen); a, b = a + i, a + i + len(innen); s = innen
        erg.append((a, b, s))
    return erg


def maskiert(t):
    """Skripte, Stile, SVG und Kommentare durch Leerraum ersetzen (Positionen bleiben)."""
    return re.sub(r'<!--.*?-->|<(script|style|svg)\b[^>]*>.*?</\1\s*>', lambda m: ' ' * len(m.group(0)), t, flags=re.S | re.I)


def attribute(t):
    """(anfang, ende, text) für Attributwerte mit Text: alt, title, aria-label, placeholder, meta content."""
    aus = []
    t = maskiert(t)
    for m in META.finditer(t):
        aus.append((m.start(2), m.end(2), m.group(2)))
    for tag in re.finditer(r'<(?!meta\b|!--)[a-zA-Z][^>]*>', t):
        for m in ATTR.finditer(tag.group(0)):
            if BUCHST.search(m.group(2)):
                aus.append((tag.start() + m.start(2), tag.start() + m.end(2), m.group(2)))
    return aus


def js_texte(t):
    aus = []
    for m in JSLIT.finditer(t):
        g = 1 if m.group(1) is not None else 2 if m.group(2) is not None else 3
        s = m.group(g)
        if len(s) < 2 or not DEUTSCH.search(s): continue
        if g == 3 and '`' in s: continue
        if re.search(r'=>|\bfunction\b|\breturn\b|;\s*$', s) and '<' not in s: continue
        aus.append((m.start(g), m.end(g), s))
    return aus


def skripte_inline(t):
    for m in re.finditer(r'<script\b(?![^>]*\bsrc=)[^>]*>(.*?)</script>', t, re.S | re.I):
        yield m.start(1), m.group(1)


class Repo:
    def __init__(self, wurzel):
        self.w = pathlib.Path(wurzel).expanduser().resolve()
        self.k = json.loads((self.w / 'sprache' / 'konfig.json').read_text(encoding='utf-8'))
        self.site = self.w / self.k.get('site', 'site')
        self.de = self.site / 'de'
        self.tab_pfad = self.w / 'sprache' / 'en.json'
        self.tab = json.loads(self.tab_pfad.read_text(encoding='utf-8')) if self.tab_pfad.exists() else {'seiten': {}, 'js': {}}

    def seiten(self):
        return sorted(p.name for p in self.de.glob('*.html') if p.name not in self.k.get('ohne', []))

    def schreibe_tab(self):
        self.tab_pfad.write_text(json.dumps(self.tab, ensure_ascii=False, indent=1, sort_keys=False) + '\n', encoding='utf-8')

    # ── einmalig ───────────────────────────────────────────────────────
    def umzug(self):
        self.de.mkdir(exist_ok=True)
        for p in sorted(self.site.glob('*.html')):
            if p.name in self.k.get('bleibt', []): continue
            if (self.de / p.name).exists(): continue
            r = subprocess.run(['git', '-C', str(self.w), 'mv', str(p), str(self.de / p.name)], capture_output=True, text=True)
            if r.returncode: p.rename(self.de / p.name)
            print('  nach de/:', p.name)
        v = self.site / 'vercel.json'
        d = json.loads(v.read_text(encoding='utf-8')) if v.exists() else {}
        rw = d.setdefault('rewrites', [])
        for q in self.k.get('geteilt', ['assets', 'api']):
            regel = {'source': f'/de/{q}/:pfad*', 'destination': f'/{q}/:pfad*'}
            if regel not in rw: rw.append(regel)
        for f in self.k.get('geteilte_dateien', ['favicon.ico', 'manifest.json']):
            regel = {'source': f'/de/{f}', 'destination': f'/{f}'}
            if regel not in rw: rw.append(regel)
        v.write_text(json.dumps(d, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
        # lokal (python -m http.server): de/assets zeigt auf ../assets; beim Deploy ausgeschlossen
        for q in self.k.get('geteilt', ['assets', 'api']):
            l = self.de / q
            if not l.exists() and (self.site / q).exists(): l.symlink_to(f'../{q}')

    # ── Auszug ─────────────────────────────────────────────────────────
    def ohne_de(self, t):
        """Absolute /de/-Links der deutschen Seiten (Portal) für die Übersetzung zurück auf die Wurzel."""
        return re.sub(r'href="/de/', 'href="/', t) if self.k.get('absolut') else t

    def schluessel_seite(self, t):
        t = self.ohne_de(ohne_umschalter(t))
        for a, b, s in abschnitte(t) + attribute(t):
            k, _ = zahlen_raus(norm(s))
            if BUCHST.search(re.sub(r'\{\d+\}', '', k)) and k not in ('EN', 'DE'): yield k
        for o, code in skripte_inline(t):
            for a, b, s in js_texte(code):
                yield 'js:' + s

    def auszug(self):
        neu = 0; gesehen = set()
        for n in self.seiten():
            t = (self.de / n).read_text(encoding='utf-8')
            for k in self.schluessel_seite(t):
                ziel = self.tab['js'] if k.startswith('js:') else self.tab['seiten']
                kk = k[3:] if k.startswith('js:') else k
                gesehen.add(k)
                if kk not in ziel: ziel[kk] = None; neu += 1
        for f in self.k.get('js', []):
            t = (self.site / 'assets' / f).read_text(encoding='utf-8')
            for a, b, s in js_texte(t):
                gesehen.add('js:' + s)
                if s not in self.tab['js']: self.tab['js'][s] = None; neu += 1
        offen = sum(1 for v in list(self.tab['seiten'].values()) + list(self.tab['js'].values()) if v is None)
        self.schreibe_tab()
        # Umgebung jedes Skripttexts, damit beim Übersetzen erkennbar ist, ob er angezeigt wird oder Schlüssel ist
        kontext = {}
        quellen = [(n, (self.de / n).read_text(encoding='utf-8')) for n in self.seiten()]
        quellen += [('assets/' + f, (self.site / 'assets' / f).read_text(encoding='utf-8')) for f in self.k.get('js', [])]
        for n, t in quellen:
            for a, b, s in js_texte(t):
                if s not in kontext:
                    kontext[s] = n + ': ' + norm(t[max(0, a - 90):b + 60])
        (self.w / 'sprache' / 'en-kontext.json').write_text(json.dumps(kontext, ensure_ascii=False, indent=1) + '\n', encoding='utf-8')
        print(f'{neu} neue Abschnitte; offen {offen}; Tabelle {len(self.tab["seiten"])} Seite + {len(self.tab["js"])} Skript')

    # ── Bauen ──────────────────────────────────────────────────────────
    def uebersetze_seite(self, t, fehlt):
        teile = []
        for a, b, s in abschnitte(t) + attribute(t):
            k, z = zahlen_raus(norm(s))
            if not BUCHST.search(re.sub(r'\{\d+\}', '', k)) or k in ('EN', 'DE'): continue
            en = self.tab['seiten'].get(k)
            if en is None: fehlt.append(k); continue
            try:
                en = datum_en(re.sub(r'\{(\d+)\}', lambda m: zahl_en(z[int(m.group(1))]), en))
            except IndexError:
                fehlt.append('PLATZHALTER: ' + k); continue
            teile.append((a, b, en))
        for o, code in skripte_inline(t):
            for a, b, s in js_texte(code):
                en = self.tab['js'].get(s)
                if en is None: fehlt.append('js:' + s); continue
                teile.append((o + a, o + b, en))
        teile.sort()
        aus, pos = [], 0
        for a, b, en in teile:
            if a < pos: continue
            aus.append(t[pos:a]); aus.append(en); pos = b
        aus.append(t[pos:])
        return ''.join(aus)

    def rahmen(self, t, name, sprache):
        """lang, og:locale, canonical, hreflang, Umschalter, Merker für die gewählte Sprache."""
        basis = self.k['basis'].rstrip('/')
        pfad = '' if name == 'index.html' else name.removesuffix('.html')
        url_en, url_de = f'{basis}/{pfad}', f'{basis}/de/{pfad}'
        t = re.sub(r'<html lang="de">', f'<html lang="{sprache}">', t, count=1)
        if sprache == 'en':
            t = t.replace('<meta property="og:locale" content="de_DE">', '<meta property="og:locale" content="en_US">\n  <meta property="og:locale:alternate" content="de_DE">')
            t = re.sub(r'<link rel="canonical" href="[^"]*">', f'<link rel="canonical" href="{url_en}">', t)
        else:
            t = re.sub(r'<link rel="canonical" href="[^"]*">', f'<link rel="canonical" href="{url_de}">', t)
            if self.k.get('absolut'):
                # Seiten mit absoluten Links (Portal): interne Ziele der deutschen Seiten nach /de/
                t = re.sub(r'href="/(?!de/|de"|assets/|api/|_vercel/|favicon)([^"]*)"', lambda m: f'href="/de/{m.group(1)}"', t)
        t = re.sub(r'\n  <link rel="alternate" hreflang="[^"]*" href="[^"]*">', '', t)
        alt = (f'\n  <link rel="alternate" hreflang="en" href="{url_en}">'
               f'\n  <link rel="alternate" hreflang="de" href="{url_de}">'
               f'\n  <link rel="alternate" hreflang="x-default" href="{url_en}">')
        t = re.sub(r'(<meta name="viewport"[^>]*>)', r'\1' + alt.replace('\\', '\\\\'), t, count=1)
        # Merker: wer DE gewählt hat, kommt auf den englischen Seiten gleich zur deutschen
        t = re.sub(r'\n  <script>/\*sprache\*/.*?</script>', '', t, flags=re.S)
        if sprache == 'en':
            merk = ("\n  <script>/*sprache*/try{if(localStorage.getItem('sprache')==='de'&&!/[?&]en\\b/.test(location.search))"
                    "location.replace('/de'+(location.pathname==='/'?'/':location.pathname)+location.search+location.hash)}catch(e){}</script>")
            t = re.sub(r'(<meta charset="utf-8">)', r'\1' + merk.replace('\\', '\\\\'), t, count=1)
        # Umschalter rechts in der Kopfleiste, neben dem Knopf für hell/dunkel (themefarbe.js hängt ihn in .kopf-rechts)
        t = re.sub(r'\n\s*<li class="sprache">.*?</li>', '', t)
        t = re.sub(r'\n  <div class="kopf-rechts">.*?</div>', '', t, flags=re.S)
        if sprache == 'en':
            ziel = '/de/' + pfad
            a = (f'<a class="sprache-schalter" href="{ziel}" hreflang="de" lang="de" title="Deutsch" aria-label="Deutsche Fassung" '
                 f"onclick=\"try{{localStorage.setItem('sprache','de')}}catch(e){{}};this.href='/de'+(location.pathname==='/'?'/':location.pathname)+location.search+location.hash\">DE</a>")
        else:
            ziel = '/' + pfad
            a = (f'<a class="sprache-schalter" href="{ziel}?en" hreflang="en" lang="en" title="English" aria-label="English version" '
                 f"onclick=\"try{{localStorage.setItem('sprache','en')}}catch(e){{}};this.href=location.pathname.replace(/^\\/de/,'')+location.search+location.hash\">EN</a>")
        t = re.sub(r'(<header class="site-header".*?</nav>)', lambda m: m.group(1) + '\n  <div class="kopf-rechts">' + a + '</div>', t, count=1, flags=re.S)
        return t

    def nach(self, t, seite=False):
        for alt, neu in ERSETZEN + [tuple(x) for x in self.k.get('ersetzen', [])]:
            t = t.replace(alt, neu)
        t = re.sub(r'(\d)&nbsp;%', r'\1%', t)
        return zahlen_im_text(t) if seite else t

    def bauen(self):
        fehlt_alle = {}
        (self.site / 'assets' / 'en').mkdir(exist_ok=True)
        js_en = set()
        for f in self.k.get('js', []):
            t = (self.site / 'assets' / f).read_text(encoding='utf-8')
            fehlt = []
            teile = []
            for a, b, s in js_texte(t):
                en = self.tab['js'].get(s)
                if en is None: fehlt.append('js:' + s); continue
                teile.append((a, b, en))
            aus, pos = [], 0
            for a, b, en in sorted(teile):
                aus.append(t[pos:a]); aus.append(en); pos = b
            aus.append(t[pos:])
            (self.site / 'assets' / 'en' / f).write_text(self.nach(''.join(aus)), encoding='utf-8')
            js_en.add(f)
            if fehlt: fehlt_alle['assets/' + f] = fehlt
        for n in self.seiten():
            de = (self.de / n).read_text(encoding='utf-8')
            de2 = self.rahmen(de, n, 'de')
            if de2 != de: (self.de / n).write_text(de2, encoding='utf-8')
            fehlt = []
            en = self.uebersetze_seite(self.ohne_de(ohne_umschalter(de2)), fehlt)
            en = self.rahmen(en, n, 'en')
            for f in js_en:
                en = en.replace(f'assets/{f}', f'assets/en/{f}')
            # Rechtstexte: die deutsche Fassung ist maßgeblich
            if n in self.k.get('rechtlich', []) and 'class="hinweis-uebersetzung"' not in en:
                en = re.sub(r'(<h1>.*?</h1>)', r'\1\n  <p class="legal-lead hinweis-uebersetzung">This English text is provided for convenience. The <a href="/de/' + n.removesuffix('.html') + r'">German version</a> is authoritative.</p>', en, count=1, flags=re.S)
            (self.site / n).write_text(self.nach(en, seite=True), encoding='utf-8')
            if fehlt: fehlt_alle[n] = fehlt
        n_f = sum(len(v) for v in fehlt_alle.values())
        print(f'{len(self.seiten())} Seiten, {len(js_en)} Skripte gebaut; {n_f} Abschnitte ohne Übersetzung (deutsch belassen)')
        for k, v in fehlt_alle.items():
            print(f'  {k}: {len(v)}', '·', ' | '.join(x[:50] for x in v[:3]))
        return n_f


if __name__ == '__main__':
    r = Repo(sys.argv[1])
    {'umzug': r.umzug, 'auszug': r.auszug, 'bauen': r.bauen}[sys.argv[2]]()
