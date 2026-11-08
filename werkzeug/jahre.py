#!/usr/bin/env python3
"""Jahr und Gattung für jedes Werk der 41 Bände: Grundlage der Begriffsgeschichte und des Zeitfilters.

Schreibt site/assets/suche/jahre.json; sammle.py ruft das nach dem Zusammenlegen der Suchdaten auf.

  {"v": 1, "gattungen": {...}, "baende": {"fsw-1": [[unit, jahr, gattung, titel], ...], ...}}

unit ist die Nummer der ersten Einheit (Seite oder Absatz) im Suchindex des Bandes, ab der das Werk
gilt, bis zum nächsten Eintrag. Das erste Werk eines Bandes beginnt immer bei 0, damit Titelei und
Vorrede des Herausgebers mitgezählt werden.

Jahr: bei Druckschriften das Jahr der ersten Veröffentlichung, bei Vorlesungen das Jahr, in dem sie
gehalten wurden (beim Winter das Anfangsjahr), beim Nachlass das Jahr der Niederschrift. Sammelrubriken
und Werke, die über mehrere Jahre entstanden sind, stehen bei einem mittleren Jahr. None: nicht datierbar
(bleibt in der Suche, fehlt in der Begriffsgeschichte).

Gattung: d Druckschrift (vom Autor veröffentlicht), v Vorlesung (Manuskript, Nachschrift, Rede vor
Hörern), n Nachlass (übrige Handschriften), e Exzerpt (fremde Texte, von Hegel abgeschrieben; in den
Analysen ausgelassen).

Seitenangaben für Fichte und Schelling wie in daten/konkordanz.json der Editionen, für Hegel nach dem
gedruckten Inhaltsverzeichnis der GW.
"""
import json, pathlib, sys

HOME = pathlib.Path.home()
SUCHE = HOME / 'idealismus/site/assets/suche'
GATTUNGEN = {'d': 'Druckschrift', 'v': 'Vorlesung', 'n': 'Nachlass', 'e': 'Exzerpt'}

# Band, Seite der SW: (Jahr, Gattung). Die Titel kommen aus der Konkordanz der Edition.
FICHTE = {
    ('SW I', '3'): (1794, 'd'), ('SW I', '29'): (1794, 'd'), ('SW I', '85'): (1794, 'd'),
    ('SW I', '331'): (1795, 'd'), ('SW I', '419'): (1797, 'd'), ('SW I', '453'): (1797, 'd'),
    ('SW I', '521'): (1797, 'd'),
    ('SW II', '1'): (1801, 'n'), ('SW II', '165'): (1800, 'd'), ('SW II', '321'): (1801, 'd'),
    ('SW II', '535'): (1810, 'v'), ('SW II', '693'): (1810, 'd'),
    ('SW III', 'XLVII'): (1796, 'd'), ('SW III', '387'): (1800, 'd'),
    ('SW IV', 'XXXV'): (1798, 'd'), ('SW IV', '367'): (1813, 'v'), ('SW IV', '601'): (1813, 'v'),
    ('SW V', '1'): (1790, 'n'), ('SW V', '9'): (1792, 'd'), ('SW V', '175'): (1798, 'd'),
    ('SW V', '191'): (1799, 'd'), ('SW V', '239'): (1799, 'd'), ('SW V', '335'): (1799, 'n'),
    ('SW V', '375'): (1800, 'd'), ('SW V', '397'): (1806, 'd'),
    ('SW VI', '1'): (1793, 'd'), ('SW VI', '37'): (1793, 'd'), ('SW VI', '289'): (1794, 'd'),
    ('SW VI', '347'): (1806, 'd'), ('SW VI', '449'): (1812, 'd'),
    ('SW VII', '1'): (1806, 'd'), ('SW VII', '257'): (1808, 'd'), ('SW VII', '503'): (1806, 'n'),
    ('SW VII', '517'): (1813, 'n'),
    ('SW VIII', '1'): (1801, 'd'), ('SW VIII', '95'): (1807, 'n'), ('SW VIII', '205'): (1807, 'n'),
    ('SW VIII', '221'): (1795, 'd'), ('SW VIII', '409'): (1795, 'd'), ('SW VIII', '437'): (1810, 'n'),
    ('NW I', '1'): (1813, 'v'), ('NW I', '103'): (1812, 'v'), ('NW I', '401'): (1813, 'v'),
    ('NW II', '1'): (1813, 'v'), ('NW II', '87'): (1804, 'v'), ('NW II', '315'): (1812, 'v'),
    ('NW II', '493'): (1812, 'v'),
    ('NW III', '1'): (1812, 'v'), ('NW III', '119'): (1798, 'v'), ('NW III', '145'): (1811, 'v'),
    ('NW III', '209'): (1791, 'n'), ('NW III', '221'): (1807, 'n'), ('NW III', '275'): (1805, 'n'),
    ('NW III', '295'): (1813, 'n'), ('NW III', '345'): (1800, 'n'), ('NW III', '401'): (1807, 'd'),
}

SCHELLING = {
    ('SW I/1', '1'): (1792, 'd'), ('SW I/1', '43'): (1793, 'd'), ('SW I/1', '85'): (1794, 'd'),
    ('SW I/1', '113'): (1795, 'd'), ('SW I/1', '149'): (1795, 'd'), ('SW I/1', '245'): (1796, 'd'),
    ('SW I/1', '281'): (1795, 'd'), ('SW I/1', '343'): (1797, 'd'), ('SW I/1', '453'): (1797, 'd'),
    ('SW I/1', '474'): (1798, 'd'), ('SW I/1', '483'): (1798, 'd'),
    ('SW I/2', '1'): (1797, 'd'), ('SW I/2', '345'): (1798, 'd'),
    ('SW I/3', '1'): (1799, 'd'), ('SW I/3', '269'): (1799, 'd'), ('SW I/3', '327'): (1800, 'd'),
    ('SW I/3', '635'): (1800, 'd'),
    ('SW I/4', '1'): (1800, 'd'), ('SW I/4', '79'): (1801, 'd'), ('SW I/4', '105'): (1801, 'd'),
    ('SW I/4', '213'): (1802, 'd'), ('SW I/4', '333'): (1802, 'd'), ('SW I/4', '511'): (1802, 'd'),
    ('SW I/4', '525'): (1802, 'd'),
    ('SW I/5', '1'): (1802, 'd'), ('SW I/5', '207'): (1803, 'd'), ('SW I/5', '353'): (1803, 'v'),
    ('SW I/6', '1'): (1804, 'd'), ('SW I/6', '11'): (1804, 'd'), ('SW I/6', '71'): (1804, 'v'),
    ('SW I/6', '131'): (1804, 'v'),
    ('SW I/7', '1'): (1806, 'd'), ('SW I/7', '127'): (1806, 'd'), ('SW I/7', '289'): (1807, 'd'),
    ('SW I/7', '331'): (1809, 'd'), ('SW I/7', '417'): (1810, 'v'), ('SW I/7', '485'): (1807, 'd'),
    ('SW I/8', '1'): (1807, 'n'), ('SW I/8', '19'): (1812, 'd'), ('SW I/8', '137'): (1813, 'd'),
    ('SW I/8', '195'): (1815, 'n'), ('SW I/8', '345'): (1815, 'd'), ('SW I/8', '425'): (1811, 'n'),
    ('SW I/9', '1'): (1810, 'n'), ('SW I/9', '111'): (1817, 'd'), ('SW I/9', '207'): (1821, 'v'),
    ('SW I/9', '253'): (1818, 'n'), ('SW I/9', '301'): (1830, 'n'), ('SW I/9', '367'): (1830, 'd'),
    ('SW I/9', '377'): (1834, 'd'),
    ('SW I/10', '1'): (1833, 'v'), ('SW I/10', '201'): (1834, 'd'), ('SW I/10', '225'): (1836, 'v'),
    ('SW I/10', '287'): (1840, 'n'), ('SW I/10', '295'): (1838, 'd'), ('SW I/10', '301'): (1843, 'v'),
    ('SW I/10', '391'): (1846, 'd'), ('SW I/10', '419'): (1850, 'n'), ('SW I/10', '427'): (1825, 'n'),
    ('SW I/10', '429'): (1802, 'd'),
    ('SW II/1', '1'): (1842, 'v'), ('SW II/1', '573'): (1850, 'd'),
    ('SW II/2', 'III'): (1842, 'v'), ('SW II/2', '675'): (1833, 'n'),
    ('SW II/3', 'III'): (1841, 'v'),
    ('SW II/4', '1'): (1842, 'v'), ('SW II/4', '335'): (1840, 'n'), ('SW II/4', '357'): (1841, 'd'),
}
# Zusätzliche Einschnitte innerhalb eines Werks: Band, Seite, Jahr, Gattung, Titel
SCHELLING_EXTRA = [
    ('SW II/1', '253', 1847, 'v', 'Philosophische Einleitung in die Philosophie der Mythologie, oder Darstellung der reinrationalen Philosophie'),
]

# GW: gedruckte Seite (None: Bandanfang), Jahr, Gattung, Titel nach dem Inhaltsverzeichnis
HEGEL = {
    'gw-1': [(None, 1786, 'n', 'Tagebuch 1785–1787'),
             (35, 1787, 'n', 'Arbeiten aus der Gymnasialzeit, ein Aufsatz aus dem Tübinger Stift'),
             (55, 1793, 'n', 'Vier Predigten 1792–1793'), (73, 1793, 'n', 'Studien 1792/93–1794'),
             (165, 1794, 'n', 'Ein Manuskript zur Psychologie und Transzendentalphilosophie'),
             (193, 1795, 'n', 'Studien 1795'), (205, 1795, 'n', 'Das Leben Jesu'),
             (279, 1796, 'n', 'Studien 1795–1796'),
             (379, 1796, 'n', 'Bericht über eine Alpenwanderung, Eleusis'),
             (403, None, 'n', 'Nicht näher Datierbares')],
    'gw-3': [(None, 1786, 'e', 'Exzerpte aus der Gymnasialzeit'),
             (201, 1785, 'e', 'Definitionen von allerhand Gegenständen'),
             (207, 1795, 'e', 'Exzerpte aus der Berner Zeit'),
             (221, 1795, 'e', 'Exzerpte zum Berner Staatswesen'),
             (235, None, 'e', 'Nicht näher Datierbares')],
    'gw-4': [(None, 1801, 'd', 'Differenz des Fichte’schen und Schelling’schen Systems der Philosophie'),
             (93, 1801, 'd', 'Kritiken und Anzeigen aus der Erlanger Litteratur-Zeitung'),
             (113, 1802, 'd', 'Kritisches Journal der Philosophie'),
             (507, 1807, 'n', 'Maximen des Journals der deutschen Literatur')],
    'gw-5': [(None, 1800, 'n', 'Fragmente einer Kritik der Verfassung Deutschlands: Vorarbeiten und Entwürfe'),
             (27, 1801, 'n', 'Verfassung Deutschlands: Jenaer Entwürfe und Ausarbeitungen'),
             (159, 1802, 'n', 'Verfassung Deutschlands: Fragmente einer Reinschrift'),
             (203, 1801, 'e', 'Verfassung Deutschlands: Exzerpte und Notizen'),
             (221, 1801, 'd', 'Texte zur Habilitation'),
             (255, 1801, 'v', 'Fragmente aus Vorlesungsmanuskripten 1801/02'),
             (277, 1802, 'n', 'System der Sittlichkeit'),
             (363, 1803, 'v', 'Fragmente aus Vorlesungsmanuskripten 1803'),
             (379, 1807, 'n', 'Wer denkt abstract?'),
             (389, 1807, 'd', 'Aus der Bamberger Zeitung 1807'), (432, 1808, 'd', 'Aus der Bamberger Zeitung 1808'),
             (449, 1803, 'n', 'Ergänzungen'), (483, 1805, 'n', 'Jenaer Notizenbuch 1803–1806')],
    'gw-6': [(None, 1803, 'v', 'Das System der speculativen Philosophie (Jenaer Systementwürfe I)')],
    'gw-7': [(None, 1804, 'n', 'Logik, Metaphysik, Naturphilosophie (Jenaer Systementwürfe II)')],
    'gw-8': [(None, 1805, 'v', 'Naturphilosophie und Philosophie des Geistes (Jenaer Systementwürfe III)')],
    'gw-9': [(None, 1807, 'd', 'Phänomenologie des Geistes'),
             (435, 1807, 'n', 'Beilagen zur Phänomenologie')],
    'gw-11': [(None, 1812, 'd', 'Wissenschaft der Logik. Das Seyn (1812)'),
              (233, 1813, 'd', 'Wissenschaft der Logik. Die Lehre vom Wesen (1813)')],
    'gw-12': [(None, 1816, 'd', 'Wissenschaft der Logik. Die Lehre vom Begriff (1816)'),
              (255, 1816, 'n', 'Beilagen zur Lehre vom Begriff')],
    'gw-15': [(None, 1817, 'd', 'Friederich Heinrich Jacobi’s Werke (Rezension)'),
              (30, 1817, 'd', 'Verhandlungen in der Versammlung der Landstände'),
              (126, 1822, 'd', 'Vorwort zu Hinrichs, Die Religion'),
              (147, 1820, 'n', 'Über die Errichtung einer kritischen Zeitschrift der Literatur'),
              (204, 1820, 'n', 'Über von Kügelgens Bilder'),
              (207, 1823, 'n', 'Fragment zur Philosophie des subjektiven Geistes'),
              (253, 1821, 'n', 'Sekundäre Überlieferung')],
    'gw-17': [(None, 1821, 'v', 'Religions-Philosophie (Vorlesungsmanuskript 1821)'),
              (301, 1821, 'v', 'Beilagen zur Religionsphilosophie')],
    'gw-18': [(None, 1816, 'v', 'Rede zum Antritt des Lehramtes in Heidelberg'),
              (9, 1818, 'v', 'Rede zum Antritt des Lehramtes in Berlin'),
              (33, 1820, 'v', 'Zur Geschichte der Philosophie'),
              (95, 1823, 'v', 'Fragment einer Einleitung zur Geschichte der Philosophie'),
              (113, 1820, 'v', 'Zur Ästhetik'),
              (119, 1822, 'v', 'Philosophie der Weltgeschichte, Einleitung 1822–1828'),
              (138, 1830, 'v', 'Philosophie der Weltgeschichte, Einleitung 1830/31'),
              (215, 1829, 'v', 'Zu den Beweisen vom Daseyn Gottes'),
              (219, 1825, 'v', 'Sekundäre Überlieferung')],
    'gw-19': [(None, 1827, 'd', 'Enzyklopädie der philosophischen Wissenschaften (1827)')],
    'gw-20': [(None, 1830, 'd', 'Enzyklopädie der philosophischen Wissenschaften (1830)')],
    'gw-21': [(None, 1832, 'd', 'Wissenschaft der Logik. Die Lehre vom Seyn (1832)'),
              (385, 1831, 'n', 'Beilage')],
}


def werk_fichte(sw):          # 'SW III' -> fsw-3, 'NW II' -> fnw-2
    reihe, roem = sw.split()
    return f"f{reihe.lower()}-{ROEM[roem]}"

def werk_schelling(sw):       # 'SW I/7' -> sw-I-07
    abt, n = sw.split()[1].split('/')
    return f"sw-{abt}-{int(n):02d}"

ROEM = {r: i for i, r in enumerate('I II III IV V VI VII VIII IX X'.split(), 1)}


def eintraege():
    """Je Band die Einschnitte: [(Seite oder None, Jahr, Gattung, Titel)], in der Folge der Seiten."""
    aus = {}
    for ed, tafel, werk in (('fichte', FICHTE, werk_fichte), ('schelling', SCHELLING, werk_schelling)):
        k = json.loads((HOME / ed / 'daten/konkordanz.json').read_text(encoding='utf-8'))
        gesehen = set()
        for w in k['werke']:
            schl = (w['sw'], str(w['seite_sw']))
            if schl not in tafel: sys.exit(f'{ed}: kein Jahr für {schl} {w["titel"]}')
            gesehen.add(schl)
            j, g = tafel[schl]
            aus.setdefault(werk(w['sw']), []).append((str(w['seite_sw']), j, g, w['titel']))
        if gesehen != set(tafel): sys.exit(f'{ed}: Jahre ohne Werk: {set(tafel) - gesehen}')
    for sw, s, j, g, t in SCHELLING_EXTRA:
        aus[werk_schelling(sw)].append((s, j, g, t))
    for w, liste in HEGEL.items():
        aus[w] = [(None if s is None else str(s), j, g, t) for s, j, g, t in liste]
    return aus


def bauen(suche=SUCHE):
    ix = json.loads((suche / 'index.json').read_text(encoding='utf-8'))
    tafel = eintraege()
    baende, fehler = {}, []
    for b in ix['baende']:
        w = b['work']
        if w not in tafel: fehler.append(f'{w}: keine Jahre'); continue
        u = json.loads((suche / f'{w}.json').read_text(encoding='utf-8'))['u']
        buch = [x[1] if isinstance(x[1], int) else None for x in u]   # römisch gezählte Titelei: None
        liste = tafel[w]
        # Titelblätter tragen keinen Text und fehlen im Index: das Werk beginnt bei der ersten
        # Einheit, deren Seite nicht vor der Anfangsseite liegt
        def ort(s, ab):
            for i in range(ab, len(buch)):
                if buch[i] is not None and buch[i] >= int(s): return i
            return -1
        zeilen, ab = [], 0
        for n, (s, j, g, t) in enumerate([liste[0]] + sorted(liste[1:], key=lambda e: int(e[0]))):
            i = 0 if n == 0 else ort(s, ab)
            if i < 0: fehler.append(f'{w}: Seite {s} ({t[:40]}) nicht im Index'); continue
            zeilen.append([i, j, g, t]); ab = i
        baende[w] = zeilen
    for f in fehler: print('  !', f, file=sys.stderr)
    (suche / 'jahre.json').write_text(json.dumps({'v': 1, 'gattungen': GATTUNGEN, 'baende': baende}, ensure_ascii=False), encoding='utf-8')
    return baende, fehler


if __name__ == '__main__':
    b, f = bauen()
    n = sum(len(v) for v in b.values())
    print(f'jahre.json: {len(b)} Bände, {n} Einschnitte' + (f', {len(f)} Fehler' if f else ''))
    sys.exit(1 if f else 0)
