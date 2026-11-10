#!/usr/bin/env python3
"""Daten der Glossar-Abstimmung (/translation) bauen: uebersetzung/abstimmung-quelle.json → site/assets/glossar/abstimmung.json.
Prüft: eindeutige ids, jede Frage hat ≥ 2 Optionen mit eindeutigen keys, vorschlag ist einer davon oder null,
gruppe bekannt, kein moderner Übersetzername im öffentlichen Text (Wunsch des Nutzers, 09.11.2026).
  python3 -I werkzeug/glossar_seite.py"""
import json, pathlib, re, sys
P = pathlib.Path(__file__).resolve().parent.parent
q = json.loads((P / 'uebersetzung/abstimmung-quelle.json').read_text(encoding='utf-8'))
# further questions extracted from the glossary tables (abstimmung-zusatz-*.json), appended after the main list
for z in sorted((P / 'uebersetzung').glob('abstimmung-zusatz-*.json')):
    q['entscheidungen'] += json.loads(z.read_text(encoding='utf-8'))['entscheidungen']
# Owner decisions, not for a public vote (entscheidungsregister.md D5, E1, C2)
NICHT_OEFFENTLICH = {'ethnische-begriffe', 'f-ethnische-begriffe', 'zitate-fremd', 'satzgrenzen'}
q['entscheidungen'] = [e for e in q['entscheidungen'] if e['id'] not in NICHT_OEFFENTLICH]
# The same German term from two sources becomes one question: the first one kept, options of the second added
zusammen, nach_wort = [], {}
for e in q['entscheidungen']:
    w = e['deutsch'].strip().lower()
    if w not in nach_wort:
        nach_wort[w] = e; zusammen.append(e); continue
    erst = nach_wort[w]
    da = {o['en'].strip().lower() for o in erst['optionen']}
    for o in e['optionen']:
        if o['en'].strip().lower() not in da and len(erst['optionen']) < 4:
            erst['optionen'].append(dict(o, key=chr(ord('a') + len(erst['optionen'])))); da.add(o['en'].strip().lower())
    if erst['gruppe'] != e['gruppe']: erst['gruppe'] = 'shared'
q['entscheidungen'] = zusammen
NAMEN = r'\b(Pinkard|Giovanni|Brinkmann|Dahlstrom|Inwood|Miller|Breazeale|Heath|Lachs|Wright|Love|Schmidt|Matthews|Wirth|Bowie|Peterson|Vater|Harris|Cerf|Knox|Nisbet|Wallace|Geraets|Burbidge|Neuhouser|Baur|Zöller|Guyer|Wood|Gregor|Kemp Smith|Gutmann|Stott|Marti|Pfau|Richey|Zisselsberger|Hodgson|Petry|Moore|Adler|Preuss|Green|Kroeger|Houlgate|Kojève)\b'
fehler, ids = [], set()
for e in q['entscheidungen']:
    i = e['id']
    if i in ids: fehler.append(f'doppelte id {i}')
    ids.add(i)
    if e['gruppe'] not in ('shared', 'fichte', 'schelling', 'hegel', 'conventions'): fehler.append(f'{i}: gruppe {e["gruppe"]}')
    keys = [o['key'] for o in e['optionen']]
    if len(keys) < 2 or len(set(keys)) != len(keys): fehler.append(f'{i}: optionen')
    if e.get('vorschlag') not in keys + [None]: fehler.append(f'{i}: vorschlag {e.get("vorschlag")}')
    text = json.dumps({k: v for k, v in e.items() if k != 'id'}, ensure_ascii=False)
    for m in re.findall(NAMEN, text): fehler.append(f'{i}: Übersetzername „{m}“ im öffentlichen Text')
if fehler: sys.exit('\n'.join(fehler))
aus = {'stand': q['stand'], 'schluss': q['schluss'], 'entscheidungen': q['entscheidungen']}
z = P / 'site/assets/glossar/abstimmung.json'
z.parent.mkdir(parents=True, exist_ok=True)
z.write_text(json.dumps(aus, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')
print(f'{len(ids)} Fragen → {z.relative_to(P)}')

# ---------- the whole glossary (settled rows) for browsing: German → English only ----------
# Public page shows no "Established"/"Notes" columns: they name modern translators (owner's wish, 09.11.2026).
QUELLEN = [('hegel', 'hegel-glossar.md'), ('hegel', 'hegel-glossar-nachtrag.md'), ('fichte', 'fichte-glossar.md'),
           ('schelling', 'schelling-glossar.md'), ('shared', 'gemeinsam-glossar.md')]
EN_SPALTEN = ('english', 'our rendering', 'rendering')

def rein(s):
    s = re.sub(r'<[^>]+>', '', s)
    s = re.sub(r'\*\*|\*|`', '', s)
    s = re.sub(r'\[([^\]]+)\]\([^)]*\)', r'\1', s)
    s = re.sub(r'\s*\((?=[^)]*(✓|unchecked|\(u\)|\bu\b))[^)]*\)', '', s)   # attributions in brackets
    s = re.sub(r'\s*[:;,]?\s*\b[A-Z][A-Za-z]{0,3}\d{0,2}\b\s*✓²?', '', s)    # sigla like "P ✓", "B88 ✓"
    s = s.replace('✓', '').replace('(u)', '')
    s = re.sub(r'\s+', ' ', s).strip(' ;,·')
    tiefe, aus = 0, []                       # unbalanced brackets left over from removed attributions
    for ch in s:
        if ch == ')' and tiefe == 0: continue
        tiefe += (ch == '(') - (ch == ')'); aus.append(ch)
    s = ''.join(aus)
    if tiefe > 0: s = s[:s.rfind('(')].strip()
    if len(s) > 100 and '. ' in s: s = s[:s.index('. ') + 1]
    return s.strip(' ;,·')

eintraege, gesehen = [], set()
for autor, datei in QUELLEN:
    bereich, kopf = '', None
    for zeile in (P / 'uebersetzung' / datei).read_text(encoding='utf-8').splitlines():
        if zeile.startswith('#'):
            bereich = re.sub(r'^#+\s*', '', zeile).strip(); kopf = None; continue
        if not zeile.startswith('|'):
            kopf = None; continue
        zellen = [z.strip() for z in zeile.strip().strip('|').split('|')]
        if kopf is None:
            kopf = [z.lower() for z in zellen]; continue
        if set(zeile) <= set('|-: '): continue
        if not kopf or not kopf[0].startswith('german'): continue
        en_i = next((i for i, k in enumerate(kopf) if k in EN_SPALTEN), None)
        if en_i is None or en_i >= len(zellen): continue
        if '⚑' in zeile or re.match(r'^(D|N|C|F|S)\d+$', zellen[0]): continue
        de, en = rein(zellen[0]), rein(zellen[en_i])
        if not de or not en or len(en) > 160: continue
        if re.search(NAMEN, de + ' ' + en): continue
        if (autor, de.lower()) in gesehen: continue
        gesehen.add((autor, de.lower()))
        eintraege.append({'de': de, 'en': en, 'a': autor, 'b': re.sub(r'^[\dA-Z]+[′.]?\s+', '', bereich)[:60]})
(P / 'site/assets/glossar/glossar.json').write_text(json.dumps(eintraege, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')
print(f'{len(eintraege)} feste Einträge → site/assets/glossar/glossar.json')
