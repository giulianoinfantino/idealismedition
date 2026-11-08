#!/usr/bin/env python3
"""Fichte im Portal freischalten, sobald seine Edition steht: Bildnis nicht mehr grau und gestrichelt, Link zur Edition,
Texte fuer drei Editionen, Recherche ueber alle drei. Danach sammle.py, recherche_seite.py, seiten.py laufen lassen.
  python3 werkzeug/fichte_frei.py"""
import pathlib, re, sys
P = pathlib.Path.home() / 'idealismus'; S = P / 'site'
sys.path.insert(0, str(P / 'werkzeug'))
from sammle import FICHTE_URL


def ers(datei, alt, neu, pflicht=True):
    p = S / datei if not str(datei).startswith('/') else pathlib.Path(datei)
    t = p.read_text(encoding='utf-8')
    if alt not in t:
        if pflicht and neu not in t: raise SystemExit(f'{datei}: nicht gefunden: {alt[:70]}')
        return
    p.write_text(t.replace(alt, neu), encoding='utf-8')


# Buehne: Fichte wie die anderen, mit Link zur Edition
ers('index.html', '<li class="ei-bild ei-bild--kommt" data-ring="a" style="--i:0">', '<li class="ei-bild" data-ring="a" style="--i:0">')
ers('index.html', '<a class="ei-bild-link" href="#fichte" aria-label="Fichte: Edition in Vorbereitung">',
    f'<a class="ei-bild-link" href="{FICHTE_URL}/" aria-label="Fichte: zur Edition der Sämmtlichen und Nachgelassenen Werke">')
ers('index.html', '<span class="ei-was"><span class="ei-was-lang">Sämmtliche Werke · </span>in Vorbereitung</span>',
    '<span class="ei-was"><span class="ei-was-lang">Sämmtliche Werke · </span>11 Bände</span>')
ers('index.html', '<a class="st-neu" href="https://www.schellingedition.com/fassung-07"><span class="st-neu-marke">Neu</span><span class="st-neu-text">Schelling, alle 14 Bände</span>',
    f'<a class="st-neu" href="{FICHTE_URL}/neuigkeiten.html"><span class="st-neu-marke">Neu</span><span class="st-neu-text">Fichte, alle 11 Bände</span>')
ers('index.html', 'Die Volltextsuche geht über die Bände beider Editionen zugleich, Schelling neben Hegel.',
    'Die Volltextsuche geht über die Bände aller drei Editionen zugleich, Fichte neben Schelling und Hegel.')
ers('index.html', 'sie fließt in die Bände, die noch fehlen, als nächstes in Fichte.',
    'sie fließt in die weitere Prüfung der Texte und in neue Bände.')
ers('index.html', 'legen die Richtlinien jeder Edition offen: <a href="https://www.hegeledition.com/editionsrichtlinien">Hegel</a>, <a href="https://www.schellingedition.com/editionsrichtlinien">Schelling</a>.',
    f'legen die Richtlinien jeder Edition offen: <a href="{FICHTE_URL}/editionsrichtlinien.html">Fichte</a>, <a href="https://www.schellingedition.com/editionsrichtlinien">Schelling</a>, <a href="https://www.hegeledition.com/editionsrichtlinien">Hegel</a>.')
ers('index.html', '<a href="recherche?q=Indifferenz">Indifferenz</a>', '<a href="recherche?q=Indifferenz">Indifferenz</a>\n    <a href="recherche?q=Nicht-Ich">Nicht-Ich</a>')
# Fichtes Ring im Zeichen nicht mehr leise
ers('assets/portal.css', '/* Fichtes Ring im Zeichen ist noch leise */\n.ei-zier .ring-a{opacity:.45}\n', '')
# Fuss der Startseite: alle drei Editionen
ers('index.html', '    <a href="https://www.schellingedition.com/">Schelling-Edition</a>\n    <a href="https://www.hegeledition.com/">Hegel-Edition</a>\n    <a href="recherche">Recherche</a>',
    f'    <a href="{FICHTE_URL}/">Fichte-Edition</a>\n    <a href="https://www.schellingedition.com/">Schelling-Edition</a>\n    <a href="https://www.hegeledition.com/">Hegel-Edition</a>\n    <a href="recherche">Recherche</a>')
# Recherche und einfache Seiten
w = P / 'werkzeug/recherche_seite.py'; t = w.read_text(encoding='utf-8')
t = t.replace("Volltext der Gesammelten Werke · ' + m.baende.length\", \"Volltext von Schelling und Hegel · ' + m.baende.length\"",
              "Volltext der Gesammelten Werke · ' + m.baende.length\", \"Volltext von Fichte, Schelling und Hegel · ' + m.baende.length\"")
t = t.replace("'<p class=\"rch-unter\" id=\"rch-unter\">Volltext von Schelling und Hegel</p>'", "'<p class=\"rch-unter\" id=\"rch-unter\">Volltext von Fichte, Schelling und Hegel</p>'")
t = t.replace("    '''  <div>Edition Deutscher Idealismus · Fichte, Schelling, Hegel</div>\n  <nav>\n    <a href=\"https://www.schellingedition.com/\">Schelling-Edition</a>",
              f"    '''  <div>Edition Deutscher Idealismus · Fichte, Schelling, Hegel</div>\n  <nav>\n    <a href=\"{FICHTE_URL}/\">Fichte-Edition</a>\n    <a href=\"https://www.schellingedition.com/\">Schelling-Edition</a>")
t = t.replace('<button type="button" data-q="Indifferenz" title="ein Wort, in allen Schreibungen">Indifferenz</button>',
              '<button type="button" data-q="Indifferenz" title="ein Wort, in allen Schreibungen">Indifferenz</button>\n            <button type="button" data-q="Nicht-Ich" title="ein Wort">Nicht-Ich</button>')
t = t.replace("    (/^sw-/.test(w) ? 'schelling' : /^gw-/.test(w) ? 'hegel' : '')", "    (/^sw-/.test(w) ? 'schelling' : /^gw-/.test(w) ? 'hegel' : /^f[sn]w-/.test(w) ? 'fichte' : '')")
w.write_text(t, encoding='utf-8')
s = P / 'werkzeug/sammle.py'; t = s.read_text(encoding='utf-8')
t = t.replace("rf'\\g<1>Volltext von Schelling und Hegel · {nb} Bände'", "rf'\\g<1>Volltext von Fichte, Schelling und Hegel · {nb} Bände'")
s.write_text(t, encoding='utf-8')
z = P / 'werkzeug/seiten.py'; t = z.read_text(encoding='utf-8')
t = t.replace('Die Treffer der Recherche und die Bandtitel führen in die Editionen auf hegeledition.com und schellingedition.com;',
              f'Die Treffer der Recherche und die Bandtitel führen in die Editionen auf {FICHTE_URL.split("//")[1]}, schellingedition.com und hegeledition.com;')
t = t.replace("  <nav>\n    <a href=\"https://www.schellingedition.com/\">Schelling-Edition</a>",
              f"  <nav>\n    <a href=\"{FICHTE_URL}/\">Fichte-Edition</a>\n    <a href=\"https://www.schellingedition.com/\">Schelling-Edition</a>")
t = t.replace('Für die Bände, die noch fehlen, als nächstes Fichtes <em>Sämmtliche Werke</em>, und für die Prüfung der vorhandenen am Druck.',
              'Für die weitere Prüfung der Texte am Druck und für neue Bände.')
t = t.replace(', das Bildnis Fichtes in Grau, solange seine Edition in Vorbereitung ist.', '.')
z.write_text(t, encoding='utf-8')
# Vorschaubild: Fichte ohne Grau
o = S / 'assets/og-source.html'; t = o.read_text(encoding='utf-8')
o.write_text(t.replace('<div class="bild kommt">', '<div class="bild">'), encoding='utf-8')
print('Fichte freigeschaltet; jetzt: recherche_seite.py, sammle.py, seiten.py, Vorschaubild neu')
