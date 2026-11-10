#!/usr/bin/env python3
"""Count glossary terms in the three corpora (Fichte, Schelling, Hegel), with period spellings folded.

Corpus: one line per text unit, "Sigle|page<TAB>text", built from the portal's search data
(site/assets/suche/*.json). Default location: $KORPUS or the scratchpad path below.

  python3 -I zaehle.py count 'Potenz' 'Ungrund' 'unvordenklich'   # regex per argument, on folded text
  python3 -I zaehle.py kwic 'Anstoß' [n] [autor]                    # keyword in context, with page refs
  python3 -I zaehle.py kandidaten autor [n]                         # most frequent nouns, with ratio to the other two

Folding (applied to corpus and pattern alike): lowercase, ß→ss, th→t, y→i, ae/oe/ue at word start → ä/ö/ü,
-iren→-ieren, c→z before e/i/ä, else c→k (ch, ck kept). So 'Seyn' = 'Sein', 'Thätigkeit' = 'Tätigkeit', 'Princip' = 'Prinzip'.
Patterns are matched with word boundaries on the left only, so 'Potenz' also counts 'Potenzen', 'Potenzirung'.
"""
import collections, os, re, sys

KORPUS = os.environ.get('KORPUS', '/private/tmp/claude-501/-Users-giulianoinfantino/983662c3-0b25-47b5-bdff-aef0dd441316/scratchpad/korpus')
AUTOREN = ('fichte', 'schelling', 'hegel')


def falte(s):
    s = s.lower().replace('ß', 'ss').replace('th', 't').replace('y', 'i')
    s = re.sub(r'\bae', 'ä', s); s = re.sub(r'\boe', 'ö', s); s = re.sub(r'\bue', 'ü', s)
    s = re.sub(r'(?<=[a-zäöü]{3})(?<![wh])ir(?=t|en\b|end|ung|bar)', 'ier', s)
    s = re.sub(r'c(?=[eiä])', 'z', s); s = re.sub(r'c(?![hk])', 'k', s)
    return s


_cache = {}
def zeilen(autor):
    if autor not in _cache:
        with open(os.path.join(KORPUS, autor + '.txt'), encoding='utf-8') as f:
            _cache[autor] = [l.rstrip('\n').split('\t', 1) for l in f]
    return _cache[autor]


_falt = {}
def gefaltet(autor):
    if autor not in _falt:
        _falt[autor] = falte('\n'.join(t for _, t in zeilen(autor)))
    return _falt[autor]


def count(muster):
    print('pattern'.ljust(40), *[a.rjust(10) for a in AUTOREN])
    for m in muster:
        rx = re.compile(r'\b(?:' + falte(m) + ')')
        print(m.ljust(40), *[str(len(rx.findall(gefaltet(a)))).rjust(10) for a in AUTOREN])


def kwic(muster, n=12, autor=None):
    rx = re.compile(r'\b(?:' + falte(muster) + ')')
    for a in ([autor] if autor else AUTOREN):
        treffer = 0
        for ref, t in zeilen(a):
            ft = falte(t)
            for m in rx.finditer(ft):
                print(f'{a[:3]} {ref:14} …{t[max(0, m.start()-90):m.end()+90]}…')
                treffer += 1
                if treffer >= n: break
            if treffer >= n: break


def kandidaten(autor, n=400):
    wort = re.compile(r'(?<=[a-zäöüß,;:] )([A-ZÄÖÜ][a-zäöüß]{3,})')
    zahl = {a: collections.Counter(falte(w) for _, t in zeilen(a) for w in wort.findall(t)) for a in AUTOREN}
    gesamt = {a: sum(z.values()) for a, z in zahl.items()}
    for w, c in zahl[autor].most_common(n):
        andere = [zahl[b][w] / gesamt[b] * gesamt[autor] for b in AUTOREN if b != autor]
        print(f'{w:28} {c:6}  ratio {c / (max(sum(andere) / 2, 1)):6.1f}')


if __name__ == '__main__':
    cmd, *rest = sys.argv[1:] or ['help']
    if cmd == 'count': count(rest)
    elif cmd == 'kwic': kwic(rest[0], int(rest[1]) if len(rest) > 1 else 12, rest[2] if len(rest) > 2 else None)
    elif cmd == 'kandidaten': kandidaten(rest[0], int(rest[1]) if len(rest) > 1 else 400)
    else: print(__doc__)
