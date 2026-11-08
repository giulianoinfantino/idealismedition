#!/usr/bin/env python3
"""Englische Seitenadressen: deutsche Dateinamen in Seiten, Skripten, Generatoren und Übersetzungstabelle umstellen,
Dateien unter de/ umbenennen und Umleitungen der alten Adressen in vercel.json eintragen.
  adressen.py <repo> <site-ordner> <karte-name>      karte: editionen | portal"""
import json, pathlib, re, subprocess, sys
KARTEN = {
    'editionen': {'editionsrichtlinien': 'guidelines', 'neuigkeiten': 'news', 'urheberrecht': 'copyright',
                  'datenschutz': 'privacy', 'impressum': 'legal-notice'},
    'portal': {'recherche': 'search', 'unterstuetzen': 'support', 'datenschutz': 'privacy', 'impressum': 'legal-notice'},
}
# Links aus dem Portal in die Editionen
EDITIONEN = KARTEN['editionen']


def umstellen(t, karte, fremd=True):
    for alt, neu in karte.items():
        t = re.sub(rf'(?<![\w-]){alt}\.html', f'{neu}.html', t)
        t = re.sub(rf'((?:href=|src=)"(?:/de)?/?){alt}(?=["#?])', rf'\g<1>{neu}', t)
        t = re.sub(rf"(['\"](?:/de)?/){alt}(?=['\"#?])", rf'\g<1>{neu}', t)
    if fremd:   # absolute Links auf die Editionen
        for alt, neu in EDITIONEN.items():
            t = re.sub(rf'(https://www\.(?:fichte|schelling|hegel)edition\.com/(?:de/)?){alt}(?=[".#?\'/]|$)', rf'\g<1>{neu}', t)
    return t


def main(repo, site, karte_name):
    R = pathlib.Path(repo).expanduser(); S = R / site; karte = KARTEN[karte_name]
    dateien = [p for p in (S / 'de').glob('*.html')]
    dateien += [p for p in (S / 'assets').glob('*.js') if not re.match(r'(work-|search-data|edition-data|baende)', p.name)]
    for muster in ('werkzeug/*.py', '*.py', '*.mjs', 'sw.js', 'sprache/konfig.json'):
        dateien += [p for p in R.glob(muster) if p.name not in ('adressen.py', 'englisch.py')]
    if site != '.':
        dateien += [p for p in S.glob('sw.js')]
    geaendert = 0
    for p in sorted(set(dateien)):
        t = p.read_text(encoding='utf-8'); n = umstellen(t, karte)
        if n != t: p.write_text(n, encoding='utf-8'); geaendert += 1
    # Übersetzungstabelle: Schlüssel und Werte
    tp = R / 'sprache' / 'en.json'
    if tp.exists():
        d = json.loads(tp.read_text(encoding='utf-8'))
        for teil in ('seiten', 'js'):
            d[teil] = {umstellen(k, karte): (umstellen(v, karte) if isinstance(v, str) else v) for k, v in d[teil].items()}
        tp.write_text(json.dumps(d, ensure_ascii=False, indent=1) + '\n', encoding='utf-8')
    # Dateien umbenennen
    for alt, neu in karte.items():
        q, z = S / 'de' / f'{alt}.html', S / 'de' / f'{neu}.html'
        if q.exists():
            r = subprocess.run(['git', '-C', str(R), 'mv', str(q), str(z)], capture_output=True)
            if r.returncode: q.rename(z)
        e = S / f'{alt}.html'
        if e.exists(): e.unlink()   # englische Seite wird neu gebaut
    # Umleitungen
    v = S / 'vercel.json'; d = json.loads(v.read_text(encoding='utf-8'))
    red = d.setdefault('redirects', [])
    vorhanden = {r['source'] for r in red}
    for alt, neu in karte.items():
        for pre in ('', '/de'):
            for suf in ('', '.html'):
                src = f'{pre}/{alt}{suf}'
                if src not in vorhanden:
                    red.append({'source': src, 'destination': f'{pre}/{neu}', 'permanent': True})
    v.write_text(json.dumps(d, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(f'{R.name}: {geaendert} Dateien umgestellt, {len(karte)} Seiten umbenannt, Umleitungen {len(red)}')


if __name__ == '__main__':
    main(*sys.argv[1:4])
