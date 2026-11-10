#!/usr/bin/env python3
"""Die drei Bildnisse der Startseite zuschneiden und angleichen: gleiche Augenlinie, gleiche Kopfgroesse, gleiches Format,
dieselbe Tonung (Graustufen, gleiche Schwarz-/Weisspunkte am Gesicht, dieselbe feine Koernung), damit die Reihe wie aus
einer Serie wirkt und nicht ein Gemaelde fotografisch weich neben zwei Stichen steht.

Quellen (gemeinfrei, Wikimedia Commons; Nachweis in legal-notice.html), in quellen/bilder/:
  fichte-daehling-jugel.jpg     Lithographie von J. F. Jugel nach dem Gemaelde von H. A. Daehling (1808)
  schelling-stieler-1835.png    Joseph Karl Stieler, 1835 (aus der Schelling-Edition)
  hegel-schlesinger-1831.jpg    Jakob Schlesinger, 1831 (aus der Hegel-Edition)

Je Bild: Augenmitte (x, y; Mitte zwischen beiden Pupillen) und Kopfhoehe (Scheitel bis Kinn) in Pixeln der Quelle,
am Bild gemessen (Zoom mit Fadenkreuz, 09.11.2026 nachgemessen: Fichte 620/572, Schelling 548/363, Hegel 468/548).
Daraus der Ausschnitt: Kopf = KOPF der Hoehe, Augenlinie bei AUGE von oben, Augenmitte waagrecht in der Mitte.
KOPF und AUGE sind von Hegel vorgegeben: sein Kopf fuellt die Vorlage (930 von 1371 px), groesser geht der Ausschnitt
nicht, also bekommen die anderen beiden denselben Kopfanteil.

Tonung: Graustufen; eine Kennlinie je Bild, die das dunkelste Hundertstel des ganzen Ausschnitts auf SCHWARZ und
drei Perzentile des Gesichtsfelds (Schatten, Mitte, Licht) auf dieselben Zielwerte legt. Danach dieselbe feine
Koernung fuer alle drei (an der 1x-Groesse erzeugt, fuer @2x hochgerechnet, damit das Korn gleich gross erscheint).
Fichtes Lithographie steht auf hellem Papier; ihr Rand wird in den dunklen Grund der beiden Gemaelde gefuehrt.
Die Seite zeigt die Bilder ohnehin mit filter:grayscale(1); die Dateien sind trotzdem schon grau.

  python3 -I werkzeug/bildnisse.py [--bogen [ziel.png]]    (--bogen: Kontaktbogen zur Kontrolle)
"""
import pathlib, random, sys
from PIL import Image, ImageChops, ImageDraw, ImageFilter, ImageOps

P = pathlib.Path.home() / 'idealismus'
Q = P / 'quellen/bilder'
Z = P / 'site/assets/bildnisse'
FORMAT = 0.77          # Breite : Hoehe des Ausschnitts (Bogenfeld)
KOPF = 0.68            # Kopfhoehe im Ausschnitt (Hegel laesst nicht mehr zu, s. o.)
AUGE = 0.40            # Augenlinie von oben
GROESSEN = {'': 340, '@2x': 680}   # Breite in Pixeln

# Zieltonwerte (0..255): dunkelstes Hundertstel des Ausschnitts, dann Perzentile im Gesichtsfeld.
SCHWARZ = 14
GESICHT = ((0.05, 50), (0.50, 138), (0.97, 232))
KORN = 8               # Standardabweichung der Koernung in Tonwerten, bei 340 px Breite
KORN_SAAT = 1831

BILDER = {
    'fichte':    dict(datei='fichte-daehling-jugel.jpg',  auge=(620, 572), kopf=580, papier=True),
    'schelling': dict(datei='schelling-stieler-1835.png', auge=(548, 363), kopf=505),
    'hegel':     dict(datei='hegel-schlesinger-1831.jpg', auge=(468, 548), kopf=925),
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
    a = im.crop((round(x0), round(y0), round(x0 + cw), round(y0 + ch)))
    auge = (b['auge'][0] - x0, b['auge'][1] - y0)        # Augenmitte im Ausschnitt
    return a, auge


def gesichtsfeld(a, auge, kopf):
    """Kasten von den Brauen bis zum Kinn, etwa gesichtsbreit: dort werden die Tonwerte gemessen."""
    w, h = a.size
    x, y = auge
    return (round(x - kopf * 0.22), round(y - kopf * 0.10), round(x + kopf * 0.22), round(y + kopf * 0.42))


def perzentil(hist, q):
    ziel = q * sum(hist)
    lauf = 0
    for v, n in enumerate(hist):
        lauf += n
        if lauf >= ziel:
            return v
    return 255


def kennlinie(g, feld):
    """Stuetzpunkte (Quelle -> Ziel) aus den Histogrammen, dazwischen gerade, an den Enden bis 0 und 255 verlaengert."""
    ganz = g.histogram()
    gesicht = g.crop(feld).histogram()
    punkte = [(perzentil(ganz, 0.01), SCHWARZ)] + [(perzentil(gesicht, q), z) for q, z in GESICHT]
    stuetz = []
    for x, y in punkte:                               # monoton halten, falls Perzentile zusammenfallen
        if stuetz and x <= stuetz[-1][0]:
            x = stuetz[-1][0] + 1
        stuetz.append((x, y))
    (x0, y0), (x1, y1) = stuetz[0], stuetz[1]
    stuetz.insert(0, (0, max(0, y0 - (y1 - y0) * x0 / (x1 - x0))))
    (x0, y0), (x1, y1) = stuetz[-2], stuetz[-1]
    stuetz.append((255, min(255, y1 + (y1 - y0) * (255 - x1) / (x1 - x0))))
    lut = []
    for v in range(256):
        for (xa, ya), (xb, yb) in zip(stuetz, stuetz[1:]):
            if xa <= v <= xb:
                lut.append(round(ya + (yb - ya) * (v - xa) / (xb - xa)))
                break
    return [max(0, min(255, v)) for v in lut]


def papier_abdunkeln(g, auge, kopf):
    """Fichte: Lithographie auf hellem Papier. Der Rand um Kopf und Schultern geht in den dunklen Grund ueber."""
    w, h = g.size
    x, y = auge
    maske = Image.new('L', (w, h), 0)
    ImageDraw.Draw(maske).ellipse((x - kopf * 0.52, y - kopf * 0.68, x + kopf * 0.52, y + kopf * 1.5), fill=255)
    maske = maske.filter(ImageFilter.GaussianBlur(kopf * 0.18))
    dunkel = Image.new('L', (w, h), SCHWARZ + 8)
    return Image.composite(g, dunkel, maske)


def koernung(g, breite):
    """Feines, gleichmaessiges Korn; bei 340 px erzeugt, fuer groessere Ausgaben hochgerechnet (gleiche Korngroesse)."""
    zufall = random.Random(KORN_SAAT)
    klein = (340, round(340 / FORMAT))
    werte = bytes(max(0, min(255, round(128 + zufall.gauss(0, KORN)))) for _ in range(klein[0] * klein[1]))
    korn = Image.frombytes('L', klein, werte)
    if g.size != klein:
        korn = korn.resize(g.size, Image.BICUBIC)
    return ImageChops.add(g, korn, 1.0, -128)


def tonung(b, a, auge):
    g = ImageOps.grayscale(a)
    feld = gesichtsfeld(g, auge, b['kopf'])
    g = g.point(kennlinie(g, feld))
    if b.get('papier'):
        g = papier_abdunkeln(g, auge, b['kopf'])
    return g


def main():
    Z.mkdir(parents=True, exist_ok=True)
    fertig = {}
    for name, b in BILDER.items():
        im = Image.open(Q / b['datei']).convert('RGB')
        a, auge = ausschnitt(b, im)
        g = tonung(b, a, auge)
        for zusatz, breite in GROESSEN.items():
            r = g.resize((breite, round(breite / FORMAT)), Image.LANCZOS)
            r = koernung(r, breite).convert('RGB')
            r.save(Z / f'{name}{zusatz}.webp', 'WEBP', quality=80, method=6)
            r.save(Z / f'{name}{zusatz}.jpg', 'JPEG', quality=84, optimize=True, progressive=True)
            if zusatz == '':
                fertig[name] = r
        print(f'{name}: Ausschnitt {a.size[0]}×{a.size[1]} aus {im.size[0]}×{im.size[1]}, '
              f'Augenlinie bei {auge[1] / a.size[1]:.3f} (= {auge[1] / a.size[1] * 442:.0f} px von 442), '
              f'Kopf {b["kopf"] / a.size[1]:.3f} der Hoehe')
    if '--bogen' in sys.argv:
        bw, bh = 340, 442
        bogen = Image.new('RGB', (bw * 3 + 40, bh + 20), (0x23, 0x22, 0x29))
        for i, name in enumerate(BILDER):
            bogen.paste(fertig[name], (10 + i * (bw + 10), 10))
        d = ImageDraw.Draw(bogen)
        for y in (AUGE, AUGE - KOPF * 0.45, AUGE + KOPF * 0.55):   # Augenlinie, ungefaehr Scheitel und Kinn
            d.line((0, 10 + y * bh, bogen.size[0], 10 + y * bh), fill=(203, 170, 92), width=1)
        i = sys.argv.index('--bogen')
        ziel = pathlib.Path(sys.argv[i + 1]) if len(sys.argv) > i + 1 else P / 'quellen/bogen.png'
        bogen.save(ziel)
        print('Kontaktbogen:', ziel)


if __name__ == '__main__':
    main()
