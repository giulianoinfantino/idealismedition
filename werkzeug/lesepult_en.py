#!/usr/bin/env python3
"""Englische Einträge für das Lesepult in sprache/en.json einer Ausgabe: das neue Einstellungsfeld
(Schlüssel = deutscher Text der Vorlage in text.html), Reste aus einem früheren Auszug von lesepult.js
entfernen, Codebrocken (falsch gepaarte Anführungszeichen) unverändert lassen.
  python3 lesepult_en.py <repo-wurzel> <Autor englisch: Hegel’s|Schelling’s|Fichte’s>"""
import json, pathlib, sys

w = pathlib.Path(sys.argv[1]); autor = sys.argv[2]
p = w / 'sprache/en.json'
d = json.loads(p.read_text(encoding='utf-8'))
ERS = [
    ('<div class="einstellungen-gruppe">Darstellung</div>', '<div class="einstellungen-gruppe">Display</div>'),
    ('<span class="lp-etikett">Schriftgröße</span>', '<span class="lp-etikett">Font size</span>'),
    ('title="Kleiner" aria-label="Schrift verkleinern"', 'title="Smaller" aria-label="Decrease font size"'),
    ('title="Größer" aria-label="Schrift vergrößern"', 'title="Larger" aria-label="Increase font size"'),
    ('id="lp-hervor-etikett">Hervorhebung</span>', 'id="lp-hervor-etikett">Emphasis</span>'),
    ('title="Hervorhebungen kursiv">Kursiv</button>', 'title="Emphasis in italics">Italic</button>'),
    ('title="Sperrsatz wie im Druck">Sperrsatz</button>', 'title="Letter-spaced as in the print">Letter-spaced</button>'),
    ('title="Ohne jede Auszeichnung">Schlicht</button>', 'title="Without any marking">Plain</button>'),
    ('hidden aria-pressed="false">Kursiv</button>', 'hidden aria-pressed="false">Italic</button>'),
    ('<div class="einstellungen-gruppe">Beim Kopieren</div>', '<div class="einstellungen-gruppe">When copying</div>'),
    ('<span class="lp-etikett">Quellenangabe anfügen</span>', '<span class="lp-etikett">Add source reference</span>'),
    ('title="Beim Kopieren Quellenangabe mitnehmen" aria-pressed="true">ein</button>', 'title="Include the source reference when copying" aria-pressed="true">on</button>'),
    ('<span class="lp-etikett">Zeilen angeben (Druckbild)</span>', '<span class="lp-etikett">Line numbers (print layout)</span>'),
    ('title="Zitat mit Zeilenangabe" aria-pressed="true">ein</button>', 'title="Citation with line numbers" aria-pressed="true">on</button>'),
    ('<span class="lp-etikett">Hervorhebungen mitnehmen</span>', '<span class="lp-etikett">Keep emphasis</span>'),
    ('title="Hervorhebungen als *Wort* mitkopieren" aria-pressed="true">ein</button>', 'title="Copy emphasis as *word*" aria-pressed="true">on</button>'),
    ('<div class="einstellungen-gruppe">Daten</div>', '<div class="einstellungen-gruppe">Data</div>'),
    ('<kbd>←</kbd> <kbd>→</kbd> blättern · <kbd>/</kbd> suchen · <kbd>T</kbd> Verzeichnis · Klick auf eine Seitenzahl: zitieren',
     '<kbd>←</kbd> <kbd>→</kbd> turn pages · <kbd>/</kbd> search · <kbd>T</kbd> contents · click a page number to cite'),
]
n = 0
for k in list(d['js']):
    v = d['js'][k]
    if v is not None: continue
    if 'lp-etikett' in k and 'einstellungen-gruppe' in k:
        e = k
        for a, b in ERS:
            if a not in e: sys.exit(f'nicht gefunden: {a[:60]}')
            e = e.replace(a, b)
        import re
        e = re.sub(r'title="Diesen Band als TEI-XML im DTA-Basisformat herunterladen: Text zeilengenau, mit (Sperrsatz|Hervorhebungen) und (\w+ )?Noten"',
                   lambda m: f'title="Download this volume as TEI-XML in the DTA base format: text line by line, with {"letter-spaced type" if m.group(1) == "Sperrsatz" else "emphasis"} and {autor + " " if m.group(2) else ""}notes"', e)
        if 'DTA-Basisformat' in e: sys.exit('TEI-Titel nicht übersetzt')
        d['js'][k] = e; n += 1
    elif k.lstrip().startswith(('zaehlt', '//')) or '\n  ' in k:
        d['js'][k] = k; n += 1          # Codebrocken aus falsch gepaarten Anführungszeichen: unverändert
    elif k in ('Stelle ', 'Inhaltsverzeichnis', 'Inhalt') or 'data-ansicht=' in k or 'data-tun=' in k:
        del d['js'][k]; n += 1          # aus lesepult.js, das beide Sprachen selbst trägt
offen = [k[:60] for t in ('seiten', 'js') for k, v in d[t].items() if v is None]
p.write_text(json.dumps(d, ensure_ascii=False, indent=1) + '\n', encoding='utf-8')
print(f'{n} Einträge; offen: {offen}')
