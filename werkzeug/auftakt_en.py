#!/usr/bin/env python3
"""Übersetzungen für den Auftakt der Startseiten eintragen (nur offene Einträge).  auftakt_en.py <repo>"""
import json, pathlib, re, sys
ERS = [
    (r'(https://www\.(?:idealism|fichte|schelling|hegel)edition\.com)/de/', r'\1/'),
    (r'Digitale Ausgabe nach dem Text der <em>Sämmtlichen und Nachgelassenen Werke</em>, eingerichtet von Giuliano Infantino',
     'Digital edition based on the text of the <em>Sämmtliche und Nachgelassene Werke</em>, prepared by Giuliano Infantino'),
    (r'Digitale Ausgabe nach dem Text der <em>Sämmtlichen Werke</em>, eingerichtet von Giuliano Infantino',
     'Digital edition based on the text of the <em>Sämmtliche Werke</em>, prepared by Giuliano Infantino'),
    (r'Digitale Ausgabe nach dem Text der <em>Gesammelten Werke</em>, eingerichtet von Giuliano Infantino',
     'Digital edition based on the text of the <em>Gesammelte Werke</em>, prepared by Giuliano Infantino'),
    (r'>Lesen</a> · <a href="search.html">Recherche<', '>Read</a> · <a href="search.html">Search<'),
    (r'Bildnis Johann Gottlieb Fichtes, Lithographie von Johann Friedrich Jugel nach Heinrich Anton Dähling',
     'Portrait of Johann Gottlieb Fichte, lithograph by Johann Friedrich Jugel after Heinrich Anton Dähling'),
    (r'Bildnis Friedrich Wilhelm Joseph Schellings, gemalt von Joseph Karl Stieler',
     'Portrait of Friedrich Wilhelm Joseph Schelling, painted by Joseph Karl Stieler'),
    (r'Bildnis Georg Wilhelm Friedrich Hegels, gemalt von Jakob Schlesinger',
     'Portrait of Georg Wilhelm Friedrich Hegel, painted by Jakob Schlesinger'),
]
R = pathlib.Path(sys.argv[1]).expanduser(); p = R / 'sprache' / 'en.json'; d = json.loads(p.read_text(encoding='utf-8'))
n = 0
for k, v in d['seiten'].items():
    if v is not None: continue
    e = k
    for a, b in ERS: e = re.sub(a, b, e)
    if re.search(r'[äöüß]|\b(und|der|die|von|nach|Lesen|Recherche|Bildnis)\b', re.sub(r'<em>.*?</em>|<span class="st-person-vor">.*?</span>|Edition Deutscher Idealismus|Dähling|Schellings sämmtliche', '', e)):
        print('offen:', k[:100]); continue
    d['seiten'][k] = e; n += 1
p.write_text(json.dumps(d, ensure_ascii=False, indent=1) + '\n', encoding='utf-8')
print(n, 'eingetragen')
