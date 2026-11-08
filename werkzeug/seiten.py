#!/usr/bin/env python3
"""Die einfachen Seiten des Portals mit gemeinsamem Kopf und Fuss schreiben: unterstuetzen, impressum, datenschutz, 404.
  python3 werkzeug/seiten.py
"""
import pathlib

S = pathlib.Path.home() / 'idealismus/site'
KOFI = 'https://ko-fi.com/idealismedition'

RINGE = ('<svg class="ringe-mark site-title-rings" viewBox="0 0 200 120" aria-hidden="true">'
         '<circle class="ring ring-a" cx="100" cy="44" r="34" vector-effect="non-scaling-stroke"/>'
         '<circle class="ring ring-b" cx="80" cy="72" r="34" vector-effect="non-scaling-stroke"/>'
         '<circle class="ring ring-c" cx="120" cy="72" r="34" vector-effect="non-scaling-stroke"/></svg>')


def seite(datei, titel, rumpf, beschreibung='', aktuell='', ohne_index=False):
    nav = [('/#editionen', 'Ausgaben', ''), ('/recherche', 'Recherche', 'recherche'), (KOFI, 'Unterstützen', 'unterstuetzen')]
    navhtml = '\n'.join(f'      <li' + (' class="nav-weit"' if k == 'unterstuetzen' else '') + f'><a href="{h}"' + (' target="_blank" rel="noopener"' if h.startswith('http') else '') + (' class="current" aria-current="page"' if k and k == aktuell else '') + f'>{t}</a></li>' for h, t, k in nav)
    kanon = '' if ohne_index else f'\n  <link rel="canonical" href="https://www.idealismedition.com/{datei.removesuffix(".html").removesuffix("index")}">'
    (S / datei).write_text(f'''<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>{titel} · Edition Deutscher Idealismus</title>''' + (f'\n  <meta name="description" content="{beschreibung}">' if beschreibung else '')
        + ('\n  <meta name="robots" content="noindex">' if ohne_index else '') + kanon + f'''
  <link rel="icon" href="/favicon.ico" sizes="48x48">
  <link rel="icon" type="image/png" sizes="96x96" href="/assets/favicon-96.png">
  <link rel="icon" type="image/svg+xml" href="/assets/favicon.svg">
  <link rel="apple-touch-icon" sizes="180x180" href="/assets/apple-touch-icon.png">
  <meta name="apple-mobile-web-app-title" content="Idealismus">
  <meta name="theme-color" content="#232229">
  <link rel="preload" href="/assets/fonts/SourceSerif4-Variable-roman.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="/assets/fonts.css">
  <link rel="stylesheet" href="/assets/style.css">
  <link rel="stylesheet" href="/assets/portal.css">
  <script src="/assets/themefarbe.js"></script>
</head>
<body>

<header class="site-header" role="banner">
  <a href="/" class="site-title" aria-label="Edition Deutscher Idealismus, Startseite">
    {RINGE}
    <span class="site-title-rows">
      <span class="site-title-hegel">IDEALISMUS</span>
      <span class="site-title-edition">edition</span>
    </span>
  </a>
  <nav class="sitenav" aria-label="Hauptnavigation">
    <ul>
{navhtml}
    </ul>
  </nav>
</header>

{rumpf.strip()}

<footer class="site-footer">
  <div>Edition Deutscher Idealismus · Fichte, Schelling, Hegel</div>
  <nav>
    <a href="https://www.fichteedition.com/">Fichte-Edition</a>
    <a href="https://www.schellingedition.com/">Schelling-Edition</a>
    <a href="https://www.hegeledition.com/">Hegel-Edition</a>
    <a href="{KOFI}" target="_blank" rel="noopener">Unterstützen</a>
    <a href="/datenschutz">Datenschutz</a>
    <a href="/impressum">Impressum</a>
  </nav>
</footer>
</body>
</html>
''', encoding='utf-8')


ANSCHRIFT = '''Giuliano Infantino<br>
      Brüdergasse 29<br>
      53111 Bonn'''

seite('unterstuetzen.html', 'Unterstützen', f'''
<main class="legal-container">
  <div class="legal-kicker">Unterstützen</div>
  <h1>Mitglied werden</h1>
  <p class="legal-lead">Die Ausgaben sind frei zugänglich, ohne Bezahlschranke und ohne Konto, und sollen es bleiben. Wer die Arbeit mittragen will, kann Mitglied werden.</p>

  <div class="ei-mitglied">
    <a class="ei-knopf" href="{KOFI}" target="_blank" rel="noopener">Mitglied werden über Ko-fi</a>
  </div>

  <section class="legal-section">
    <h2>Was die Mitgliedschaft ist</h2>
    <p>Eine freiwillige Unterstützung der Arbeit an den Ausgaben. Sie öffnet nichts, was nicht ohnehin offen ist: Lesen, Suchen und die Daten bleiben für alle gleich.</p>
  </section>

  <section class="legal-section">
    <h2>Wofür</h2>
    <p>Für die weitere Prüfung der Texte am Druck und für neue Bände.</p>
  </section>

  <section class="legal-section">
    <h2>Friends of the Edition</h2>
    <p>Mitglieder werden, wenn sie es wünschen, unter den <a href="https://www.hegeledition.com/friends">Friends of the Edition</a> genannt.</p>
  </section>
</main>''', beschreibung='Die Ausgaben sind frei zugänglich. Wer die Arbeit mittragen will, kann Mitglied werden.', aktuell='unterstuetzen')

seite('impressum.html', 'Impressum', f'''
<main class="legal-container">
  <div class="legal-kicker">Rechtliche Angaben</div>
  <h1>Impressum</h1>

  <section class="legal-section">
    <h2>Angaben gemäß § 5 DDG</h2>
    <p>
      {ANSCHRIFT}
    </p>
  </section>

  <section class="legal-section">
    <h2>Kontakt</h2>
    <p>
      E-Mail: giulianoinfantino[at]icloud.com<br>
      Website: <a href="https://giulianoinfantino.com">giulianoinfantino.com</a>
    </p>
  </section>

  <section class="legal-section">
    <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
    <p>
      {ANSCHRIFT}
    </p>
  </section>

  <section class="legal-section">
    <h2>Haftung für Inhalte</h2>
    <p>Die Inhalte dieser Website werden mit größtmöglicher Sorgfalt erstellt. Eine Gewähr für Richtigkeit, Vollständigkeit und Aktualität kann dennoch nicht übernommen werden.</p>
  </section>

  <section class="legal-section">
    <h2>Texte und Daten</h2>
    <p>Die Texte Fichtes, Schellings und Hegels sind gemeinfrei. Die Hegel-Edition gibt allein Hegels Text wieder, nicht den urheberrechtlich geschützten Apparat der Herausgeber der <em>Gesammelten Werke</em>. Die Daten der Editionen stehen unter CC&nbsp;BY&nbsp;4.0; Einzelheiten nennen die Editionen selbst.</p>
  </section>

  <section class="legal-section">
    <h2>Bildnachweis</h2>
    <p>Die drei Bildnisse auf der Startseite sind gemeinfrei:</p>
    <ul class="legal-list">
      <li>Johann Gottlieb Fichte, Lithographie von Johann Friedrich Jugel nach einem Gemälde von Heinrich Anton Dähling (1808), Deutsche Fotothek Dresden (<a href="https://commons.wikimedia.org/wiki/File:Johann_Gottlieb_Fichte.jpg" target="_blank" rel="noopener">Wikimedia&nbsp;Commons</a>);</li>
      <li>Friedrich Wilhelm Joseph Schelling, Gemälde von Joseph Karl Stieler (1835) (<a href="https://commons.wikimedia.org/wiki/Category:Friedrich_Wilhelm_Joseph_Schelling" target="_blank" rel="noopener">Wikimedia&nbsp;Commons</a>);</li>
      <li>Georg Wilhelm Friedrich Hegel, Gemälde von Jakob Schlesinger (1831) (<a href="https://commons.wikimedia.org/wiki/File:1831_Schlesinger_Philosoph_Georg_Friedrich_Wilhelm_Hegel_anagoria.JPG" target="_blank" rel="noopener">Wikimedia&nbsp;Commons</a>).</li>
    </ul>
    <p>Die Aufnahmen sind dort als gemeinfrei ausgewiesen; für originalgetreue Vervielfältigungen gemeinfreier visueller Werke schließt § 68 UrhG ein eigenes Schutzrecht aus. Für die Startseite sind sie zugeschnitten und im Ton angeglichen.</p>
  </section>
</main>''')

seite('datenschutz.html', 'Datenschutz', '''
<main class="legal-container">
  <div class="legal-kicker">Datenschutzhinweise</div>
  <h1>Datenschutz</h1>
  <p class="legal-lead">Welche Daten beim Besuch dieser Website verarbeitet werden und an wen Sie sich bei Fragen wenden können.</p>

  <section class="legal-section">
    <h2>1. Verantwortliche Stelle</h2>
    <p>
      Giuliano Infantino<br>
      Brüdergasse 29<br>
      53111 Bonn<br>
      E-Mail: giulianoinfantino[at]icloud.com
    </p>
  </section>

  <section class="legal-section">
    <h2>2. Zugriffsdaten</h2>
    <p>Die Website wird bei Vercel Inc. betrieben. Beim Aufruf können dort technisch notwendige Server-Log-Daten verarbeitet werden, insbesondere IP-Adresse, Datum und Uhrzeit des Zugriffs, Browsertyp, Betriebssystem und angeforderte Datei. Zweck ist die Bereitstellung, Stabilität und Sicherheit der Website; Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.</p>
  </section>

  <section class="legal-section">
    <h2>3. Keine Cookies, keine Reichweitenmessung</h2>
    <p>Diese Website setzt keine Cookies und misst keine Reichweite. Schriften und Suchdaten werden von dieser Website selbst geladen, nicht von Dritten.</p>
    <p>Im lokalen Speicher Ihres Browsers werden nur Ihr Farbschema und Ihre zuletzt gesuchten Anfragen abgelegt. Beides bleibt auf Ihrem Gerät und wird nicht übertragen. Die Recherche läuft vollständig in Ihrem Browser: Ihre Anfragen werden nicht an den Server geschickt. Da diese Speicherung für den von Ihnen gewünschten Dienst unbedingt erforderlich ist, bedarf sie keiner Einwilligung (§ 25 Abs. 2 Nr. 2 TDDDG). Sie können die Angaben jederzeit über die Einstellungen Ihres Browsers löschen.</p>
  </section>

  <section class="legal-section">
    <h2>4. Verweise auf andere Websites</h2>
    <p>Die Treffer der Recherche und die Bandtitel führen in die Ausgaben auf www.fichteedition.com, schellingedition.com und hegeledition.com; dort gelten deren Datenschutzhinweise. Für die Mitgliedschaft wird auf Ko-fi verwiesen. Es handelt sich um einfache Links: Erst wenn Sie einen anklicken, verlassen Sie diese Website.</p>
  </section>

  <section class="legal-section">
    <h2>5. Ihre Rechte</h2>
    <p>Sie haben im Rahmen der gesetzlichen Bestimmungen das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung sowie auf Beschwerde bei einer Datenschutzaufsichtsbehörde. Fragen richten Sie bitte an giulianoinfantino[at]icloud.com.</p>
  </section>
</main>''')

seite('404.html', 'Seite nicht gefunden', '''
<main class="error-page">
  <div class="error-content">
    <div class="error-code">404</div>
    <h1 class="error-title">Seite nicht gefunden</h1>
    <p class="error-text">Die angeforderte Seite gibt es nicht oder nicht mehr.</p>
    <p class="ei-wege" style="justify-content:center"><a href="/">Zur Startseite</a><a href="/recherche">Recherche</a></p>
  </div>
</main>''', ohne_index=True)

print('Seiten geschrieben')
