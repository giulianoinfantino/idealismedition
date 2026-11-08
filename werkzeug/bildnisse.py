#!/usr/bin/env python3
"""Die drei Bildnisse der Startseite zuschneiden und angleichen: gleiche Augenlinie, gleiche Kopfgroesse, gleiches Format.

Quellen (gemeinfrei, Wikimedia Commons; Nachweis in legal-notice.html), in quellen/bilder/:
  fichte-daehling-jugel.jpg     Lithographie von J. F. Jugel nach dem Gemaelde von H. A. Daehling (1808)
  schelling-stieler-1835.png    Joseph Karl Stieler, 1835 (aus der Schelling-Edition)
  hegel-schlesinger-1831.jpg    Jakob Schlesinger, 1831 (aus der Hegel-Edition)

Je Bild: Augenmitte (x, y) und Kopfhoehe (Scheitel bis Kinn) in Pixeln der Quelle, von Hand am Bild gemessen.
Daraus der Ausschnitt: Kopf = KOPF der Hoehe, Augenlinie bei AUGE von oben, Augenmitte waagrecht in der Mitte.
Fichte erscheint, solange seine Edition in Vorbereitung ist, grau und gedaempft; das macht die Seite per CSS,
hier wird nur sein heller Papiergrund an den dunklen Grund der beiden Gemaelde angeglichen.

  python3 -I werkzeug/bildnisse.py [--bogen]    (--bogen: Kontaktbogen zur Kontrolle in den Notizordner)
"""
import pathlib, sys
from PIL import Image, ImageDraw, ImageFilter, ImageOps

P = pathlib.Path.home() / 'idealismus'
Q = P / 'quellen/bilder'
Z = P / 'site/assets/bildnisse'
FORMAT = 0.77          # Breite : Hoehe des Ausschnitts (Bogenfeld)
KOPF = 0.65            # Kopfhoehe im Ausschnitt
AUGE = 0.41            # Augenlinie von oben
GROESSEN = {'': 340, '@2x': 680}   # Breite in Pixeln

BILDER = {
    'fichte':    dict(datei='fichte-daehling-jugel.jpg',  auge=(621, 571), kopf=578, papier=True),
    'schelling': dict(datei='schelling-stieler-1835.png', auge=(544, 364), kopf=510),
    'hegel':     dict(datei='hegel-schlesinger-1831.jpg', auge=(470, 550), kopf=930),
}


def ausschnitt(b, im):
    w, h = im.size
    ch = b['kopf'] / KOPF
    ch = min(ch, h, w / FORMAT)          # nicht ueber den Bildrand hinaus: dann eben ein groesserer Kopf
    cw = ch * FORMAT
    x0 = b['auge'][0] - cw / 2
    y0 = b['auge'][1] - AUGE * ch
    x0 = max(0, min(x0, w - cw))
    y0 = max(0, min(y0, h - ch))
    return im.crop((round(x0), round(y0), round(x0 + cw), round(y0 + ch)))


def papier_abdunkeln(im):
    """Fichte: Lithographie auf hellem Papier. Grau, Mitteltoene tiefer, Rand in den dunklen Grund."""
    g = ImageOps.grayscale(im)
    g = g.point(lambda v: int(255 * (v / 255) ** 1.9))
    g = g.filter(ImageFilter.GaussianBlur(0.7))     # das Korn der Lithographie; Fichte steht ohnehin noch unscharf da
    w, h = g.size
    maske = Image.new('L', (w, h), 0)
    ImageDraw.Draw(maske).ellipse((-w * 0.12, h * 0.07, w * 1.12, h * 1.25), fill=255)
    maske = maske.filter(ImageFilter.GaussianBlur(w * 0.14))
    dunkel = Image.new('L', (w, h), 22)
    return Image.composite(g, dunkel, maske).convert('RGB')


def main():
    Z.mkdir(parents=True, exist_ok=True)
    fertig = {}
    for name, b in BILDER.items():
        im = Image.open(Q / b['datei']).convert('RGB')
        a = ausschnitt(b, im)
        if b.get('papier'):
            a = papier_abdunkeln(a)
        for zusatz, breite in GROESSEN.items():
            r = a.resize((breite, round(breite / FORMAT)), Image.LANCZOS)
            q = 72 if b.get('papier') else 82
            r.save(Z / f'{name}{zusatz}.webp', 'WEBP', quality=q, method=6)
            r.save(Z / f'{name}{zusatz}.jpg', 'JPEG', quality=q + 2, optimize=True, progressive=True)
        fertig[name] = a
        print(f'{name}: Ausschnitt {a.size[0]}×{a.size[1]} aus {im.size[0]}×{im.size[1]}')
    if '--bogen' in sys.argv:
        bw, bh = 360, round(360 / FORMAT)
        bogen = Image.new('RGB', (bw * 3 + 40, bh + 20), (28, 27, 32))
        for i, name in enumerate(BILDER):
            bogen.paste(fertig[name].resize((bw, bh)), (10 + i * (bw + 10), 10))
        d = ImageDraw.Draw(bogen)
        for y in (AUGE, AUGE - KOPF * 0.45, AUGE + KOPF * 0.55):   # Augenlinie, ungefaehr Scheitel und Kinn
            d.line((0, 10 + y * bh, bogen.size[0], 10 + y * bh), fill=(203, 170, 92), width=1)
        ziel = pathlib.Path(sys.argv[sys.argv.index('--bogen') + 1]) if len(sys.argv) > sys.argv.index('--bogen') + 1 else P / 'quellen/bogen.png'
        bogen.save(ziel)
        print('Kontaktbogen:', ziel)


if __name__ == '__main__':
    main()
