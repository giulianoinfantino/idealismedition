#!/usr/bin/env python3
"""Startseite einer Ausgabe neu ordnen: oben Bildnis und alle Bände, darunter die Informationen.
Ersetzt Titelblatt, Kennzahlen und den Abschnitt „Die Bände“ in site/de/index.html durch den Auftakt,
legt das Bildnis aus dem Portal (Graustufen-Ausschnitt) nach assets/bildnis*, ergänzt die Fußzeile um
die Edition Deutscher Idealismus.  auftakt.py <site-ordner> <id: fichte|schelling|hegel>"""
import pathlib, re, shutil, sys
PORTAL = 'https://www.idealismedition.com'
P = {
  'fichte': dict(vor='Johann Gottlieb', name='Fichte', leben='1762–1814',
                 werk='Sämmtlichen und Nachgelassenen Werke', alt='Bildnis Johann Gottlieb Fichtes, Lithographie von Johann Friedrich Jugel nach Heinrich Anton Dähling (1808)'),
  'schelling': dict(vor='Friedrich Wilhelm Joseph', name='Schelling', leben='1775–1854',
                 werk='Sämmtlichen Werke', alt='Bildnis Friedrich Wilhelm Joseph Schellings, gemalt von Joseph Karl Stieler (1835)'),
  'hegel': dict(vor='Georg Wilhelm Friedrich', name='Hegel', leben='1770–1831',
                 werk='Gesammelten Werke', alt='Bildnis Georg Wilhelm Friedrich Hegels, gemalt von Jakob Schlesinger (1831)'),
}
URL = {'fichte': 'https://www.fichteedition.com/', 'schelling': 'https://www.schellingedition.com/', 'hegel': 'https://www.hegeledition.com/'}

def main(site, wer):
    S = pathlib.Path(site).expanduser(); p = P[wer]; f = S / 'de' / 'index.html'; t = f.read_text(encoding='utf-8')
    quelle = pathlib.Path.home() / 'idealismus/site/assets/bildnisse'
    for suf in ('.jpg', '.webp', '@2x.jpg', '@2x.webp'):
        shutil.copy(quelle / f'{wer}{suf}', S / 'assets' / f'bildnis{suf}')
    a = t.index('<!-- ═══ TITELBLATT ═══')
    neu_m = re.search(r'<a class="st-neu" href="([^"]+)"><span class="st-neu-marke">([^<]*)</span><span class="st-neu-text">([^<]*)</span>', t)
    zahlen = re.search(r'<div class="st-wrap" id="zahlen">.*?</div>\n</div>\n', t, re.S) or re.search(r'<div class="st-wrap" id="zahlen">.*?</dl>\s*</div>\n', t, re.S)
    katalog = re.search(r'(<div class="st-katalog" id="katalog">.*?<!-- katalog:ende -->\s*</div>)', t, re.S).group(1)
    # Ende des alten Abschnitts „Die Bände“: nach dem Katalog (der selbst <section>-Gruppen enthält) das nächste </section>
    b = t.index('</section>', t.index('<!-- katalog:ende -->', t.index('id="baende"'))) + len('</section>')
    neu = f'''<!-- ═══ AUFTAKT ═══ Wie im Portal: links das Bildnis (Graustufen, aus ~/idealismus/site/assets/bildnisse),
     rechts alle Bände. Darunter die Kennzahlen und was die Ausgabe ist. (auftakt.py, 08.11.2026) -->
<section class="st-auftakt" aria-labelledby="st-titel">
  <div class="st-person">
    <a class="st-portal" href="{PORTAL}/de/">Edition Deutscher Idealismus</a>
    <picture>
      <source type="image/webp" srcset="assets/bildnis.webp 1x, assets/bildnis@2x.webp 2x">
      <img src="assets/bildnis.jpg" width="308" height="400" decoding="async" alt="{p['alt']}">
    </picture>
    <h1 id="st-titel" class="st-person-name"><span class="st-person-vor">{p['vor']}</span> {p['name']}</h1>
    <p class="st-person-leben">{p['leben']}</p>
    <p class="st-person-ausgabe">Digitale Ausgabe nach dem Text der <em>{p['werk']}</em></p>
    <p class="st-person-von">eingerichtet von <a href="https://giulianoinfantino.com" rel="me">Giuliano Infantino</a></p>
    <p class="st-person-wege"><a href="text.html">Lesen</a> · <a href="search.html">Recherche</a></p>''' + (f'''
    <a class="st-neu st-neu-klein" href="{neu_m.group(1)}"><span class="st-neu-marke">{neu_m.group(2)}</span><span class="st-neu-text">{neu_m.group(3)}</span><span class="st-neu-pfeil" aria-hidden="true">→</span></a>''' if neu_m else '') + f'''
  </div>
  <div class="st-werke" id="baende">
    <h2 class="st-werke-titel">Die Bände</h2>
  {katalog}
  </div>
</section>

{zahlen.group(0) if zahlen else ''}'''
    t = t[:a] + neu + t[b:]
    # Das farbige Bildnis im Abschnitt „Was diese Ausgabe anders macht“ doppelte jetzt das Bildnis oben
    t = re.sub(r'(<h2 id="anders-titel">.*?)\s*<figure class="st-bild">.*?</figure>', r'\1', t, count=1, flags=re.S)
    # Fuß: Zeile mit Portal und den drei Ausgaben
    if 'class="lp-footer-familie"' not in t:
        fam = ('\n  <p class="lp-footer-familie"><a href="' + PORTAL + '/de/">Edition Deutscher Idealismus</a>: '
               + ' · '.join(f'<a href="{URL[w]}de/"' + (' aria-current="page"' if w == wer else '') + f'>{P[w]["name"]}</a>' for w in ('fichte', 'schelling', 'hegel')) + '</p>')
        t = re.sub(r'(<footer class="lp-footer">\s*<h3>[^<]*</h3>)', lambda m: m.group(1) + fam, t, count=1)
    f.write_text(t, encoding='utf-8')
    # Fußzeile der übrigen Seiten
    for q in sorted((S / 'de').glob('*.html')):
        if q.name == 'index.html': continue
        u = q.read_text(encoding='utf-8')
        if 'site-footer-familie' in u: continue
        fam = ('<div class="site-footer-familie"><a href="' + PORTAL + '/de/">Edition Deutscher Idealismus</a> · '
               + ' · '.join(f'<a href="{URL[w]}de/">{P[w]["name"]}</a>' for w in ('fichte', 'schelling', 'hegel') if w != wer) + '</div>')
        u2 = re.sub(r'(<footer class="site-footer"[^>]*>\s*<div>[^<]*</div>)', lambda m: m.group(1) + '\n  ' + fam, u, count=1)
        if u2 != u: q.write_text(u2, encoding='utf-8')
    print(wer, 'Auftakt gesetzt')

if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])
