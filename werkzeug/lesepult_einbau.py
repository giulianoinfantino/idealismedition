#!/usr/bin/env python3
"""Lesepult in den Leser einer Ausgabe einbauen (de/text.html): Stil und Skript einbinden, das
Einstellungsfeld neu fassen, TEI-Download auf DTABf, Grundschrift 18 px. Einmalig je Ausgabe;
ein zweiter Lauf ändert nichts.
  python3 lesepult_einbau.py <de/text.html> <Autor im Titel: Hegels|Schellings|Fichtes> [Sperrsatz|Hervorhebungen]"""
import re, sys

p, autor = sys.argv[1], sys.argv[2]
hervor = sys.argv[3] if len(sys.argv) > 3 else 'Sperrsatz'   # Fichtes SW sind Antiqua: Kursive, kein Sperrsatz
t = open(p, encoding='utf-8').read()
if 'lesepult.js' in t:
    sys.exit('schon eingebaut')

def ers(alt, neu, n=1):
    global t
    if t.count(alt) != n: sys.exit(f'{t.count(alt)}× statt {n}×: {alt[:90]!r}')
    t = t.replace(alt, neu)

ers('<link rel="stylesheet" href="assets/style.css">', '<link rel="stylesheet" href="assets/style.css">\n  <link rel="stylesheet" href="assets/lesepult.css">')
ers('<script src="assets/leser-feinsatz.js"></script>', '<script src="assets/leser-feinsatz.js"></script>\n<script src="assets/lesepult.js" defer></script>')
ers("const pfad = 'assets/tei/' + sig + '.xml';", "const pfad = 'assets/dtabf/' + sig + '.xml';")
ers(".style.fontSize = (17 + fontStep * 2) + 'px';", ".style.fontSize = (18 + fontStep * 2) + 'px';")

# Einstellungsfeld: Etiketten in gewöhnlicher Schrift, Schalter mit Stellung, Hervorhebung als drei Felder
a = t.index('einstellungenPanel.innerHTML = `')
b = t.index('`;', a)
alt = t[a:b]
m = re.search(r'title="(Diesen Band als TEI-XML[^"]*)"', alt)
if not m: sys.exit('TEI-Titel nicht gefunden')
neu = '''einstellungenPanel.innerHTML = `
      <div class="einstellungen-gruppe">Darstellung</div>
      <div class="einstellungen-zeile">
        <span class="lp-etikett">Schriftgröße</span>
        <div class="einstellungen-zeile-steuerung lp-groesse">
          <button class="btn-classic btn-font" onclick="adjustFontSize(-1)" title="Kleiner" aria-label="Schrift verkleinern">A−</button>
          <span class="lp-groesse-wert" id="lp-groesse-wert" aria-live="polite"></span>
          <button class="btn-classic btn-font" onclick="adjustFontSize(1)" title="Größer" aria-label="Schrift vergrößern">A+</button>
        </div>
      </div>
      <div class="einstellungen-zeile">
        <span class="lp-etikett" id="lp-hervor-etikett">Hervorhebung</span>
        <div class="lp-segment" role="group" aria-labelledby="lp-hervor-etikett">
          <button type="button" data-hervor="kursiv" onclick="setSperrsatz('kursiv')" title="Hervorhebungen kursiv">Kursiv</button>
          <button type="button" data-hervor="sperrsatz" onclick="setSperrsatz('sperrsatz')" title="Sperrsatz wie im Druck">Sperrsatz</button>
          <button type="button" data-hervor="schlicht" onclick="setSperrsatz('schlicht')" title="Ohne jede Auszeichnung">Schlicht</button>
        </div>
        <button type="button" class="btn-classic btn-einzel-toggle" id="emphasis-toggle" onclick="toggleSperrsatz()" hidden aria-pressed="false">Kursiv</button>
      </div>
      <div class="einstellungen-gruppe">Beim Kopieren</div>
      <div class="einstellungen-zeile">
        <span class="lp-etikett">Quellenangabe anfügen</span>
        <button type="button" class="btn-classic btn-einzel-toggle lp-schalter" id="cite-toggle" onclick="toggleCite()"
                title="Beim Kopieren Quellenangabe mitnehmen" aria-pressed="true">ein</button>
      </div>
      <div class="einstellungen-zeile">
        <span class="lp-etikett">Zeilen angeben (Druckbild)</span>
        <button type="button" class="btn-classic btn-einzel-toggle lp-schalter" id="zeilen-toggle" onclick="toggleZeilen()"
                title="Zitat mit Zeilenangabe" aria-pressed="true">ein</button>
      </div>
      <div class="einstellungen-zeile">
        <span class="lp-etikett">Hervorhebungen mitnehmen</span>
        <button type="button" class="btn-classic btn-einzel-toggle lp-schalter" id="cite-italic-toggle" onclick="toggleCiteItalic()"
                title="Hervorhebungen als *Wort* mitkopieren" aria-pressed="true">ein</button>
      </div>
      <div class="einstellungen-gruppe">Daten</div>
      <div class="einstellungen-zeile">
        <span class="lp-etikett">TEI (DTABf)</span>
        <a class="btn-classic btn-einzel-toggle" id="tei-download" ${teiLink.attr}
           title="Diesen Band als TEI-XML im DTA-Basisformat herunterladen: Text zeilengenau, mit HERVOR und AUTOR Noten">${teiLink.label}</a>
      </div>
      <p class="lp-tasten"><kbd>←</kbd> <kbd>→</kbd> blättern · <kbd>/</kbd> suchen · <kbd>T</kbd> Verzeichnis · Klick auf eine Seitenzahl: zitieren</p>'''.replace('AUTOR Noten', autor + ' Noten' if autor else 'Noten').replace('HERVOR', hervor)
t = t[:a] + neu + t[b:]
open(p, 'w', encoding='utf-8').write(t)
print('eingebaut:', p)
