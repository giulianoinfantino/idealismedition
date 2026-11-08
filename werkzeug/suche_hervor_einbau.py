#!/usr/bin/env python3
"""„Nur Hervorhebungen“ und Beugungsformen (Wort~) in die Suchseite einer Ausgabe einbauen (de/search.html).
Das Portal bekommt beides über recherche_seite.py; hier dieselben Eingriffe für die Seiten der Ausgaben.
  python3 suche_hervor_einbau.py <de/search.html>"""
import sys
p = sys.argv[1]
t = open(p, encoding='utf-8').read()
if 'rch-hervor' in t: sys.exit('schon eingebaut')

def ers(alt, neu, n=1, muss=True):
    global t
    if t.count(alt) != n:
        if muss: sys.exit(f'{t.count(alt)}× statt {n}×: {alt[:90]!r}')
        print('übersprungen:', alt[:60]); return
    t = t.replace(alt, neu)

ers('<button type="button" class="rch-chip" data-art="h" aria-pressed="true">Überschriften <span class="n"></span></button>',
    '<button type="button" class="rch-chip" data-art="h" aria-pressed="true">Überschriften <span class="n"></span></button>\n        <button type="button" class="rch-chip rch-chip-hervor" id="rch-hervor" aria-pressed="false" title="Nur Wörter, die der Druck sperrt oder kursiv setzt">Nur Hervorhebungen</button>')
ers("document.querySelectorAll('.rch-chip').forEach(function (c) { c.setAttribute('aria-pressed', S.arten[c.dataset.art] ? 'true' : 'false'); });",
    "document.querySelectorAll('.rch-chip[data-art]').forEach(function (c) { c.setAttribute('aria-pressed', S.arten[c.dataset.art] ? 'true' : 'false'); });")
ers("  document.querySelectorAll('.rch-chip').forEach(function (c) {\n    c.addEventListener('click', function () {\n      var a = c.dataset.art;",
    "  document.querySelectorAll('.rch-chip[data-art]').forEach(function (c) {\n    c.addEventListener('click', function () {\n      var a = c.dataset.art;")
ers("    document.querySelectorAll('.rch-chip').forEach(function (c) { c.querySelector('.n').textContent = zahl(m.arten[c.dataset.art] || 0); });",
    "    document.querySelectorAll('.rch-chip[data-art]').forEach(function (c) { c.querySelector('.n').textContent = zahl(m.arten[c.dataset.art] || 0); });")
ers("aus: [], seiten: null, kwicOrdnung: 'werk'", "aus: [], seiten: null, kwicOrdnung: 'werk', hervor: false")
ers("if (S.seiten) p.set('seiten', S.seiten.work + ':' + S.seiten.von + '-' + S.seiten.bis);",
    "if (S.seiten) p.set('seiten', S.seiten.work + ':' + S.seiten.von + '-' + S.seiten.bis);\n    if (S.hervor) p.set('hervor', '1');")
ers("S.seiten = sm ? { work: sm[1], von: +sm[2], bis: +sm[3] } : null;",
    "S.seiten = sm ? { work: sm[1], von: +sm[2], bis: +sm[3] } : null;\n    S.hervor = p.get('hervor') === '1';")
ers("malArten(); malAnsicht(); spiegeln();", "malArten(); malAnsicht(); spiegeln();\n    $('rch-hervor').setAttribute('aria-pressed', S.hervor ? 'true' : 'false');")
ers("aus: S.aus, seiten: S.seiten, ordnung: S.ordnung });", "aus: S.aus, seiten: S.seiten, ordnung: S.ordnung, hervor: S.hervor });")
ers("  function malAnsicht() {", """  // Nur Hervorhebungen: gesperrte oder kursive Wörter des Drucks
  $('rch-hervor').addEventListener('click', function () {
    S.hervor = !S.hervor; this.setAttribute('aria-pressed', S.hervor ? 'true' : 'false');
    if (S.q) suche(true); else schreibeAdresse(true);
  });
  function malAnsicht() {""")
ers('<dt>=Seyn</dt><dd>nur genau diese Schreibung</dd>',
    '<dt>=Seyn</dt><dd>nur genau diese Schreibung</dd>\n              <dt>Begriff~</dt><dd>auch die gebeugten Formen<i>Begriffe, Begriffs, Begriffes, Begriffen</i></dd>')
ers('<dt>"…"</dt><dd>genaue Wortfolge, auch über den Seitenwechsel</dd>',
    '<dt>"…"</dt><dd>genaue Wortfolge, auch über den Seitenwechsel</dd>\n              <dt>Nur Hervorhebungen</dt><dd>Schalter unter dem Feld: nur Wörter, die der Druck sperrt oder kursiv setzt</dd>')
ers('<button type="button" data-q="*seyn" title="Wortende: Daseyn, Fürsichseyn …">*seyn</button>',
    '<button type="button" data-q="*seyn" title="Wortende: Daseyn, Fürsichseyn …">*seyn</button>\n            <button type="button" data-q="Begriff~" title="mit gebeugten Formen: Begriffe, Begriffs …">Begriff~</button>', muss=False)
open(p, 'w', encoding='utf-8').write(t)
print('eingebaut:', p)
