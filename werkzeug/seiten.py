#!/usr/bin/env python3
"""Die einfachen Seiten des Portals mit gemeinsamem Kopf und Fuss schreiben: analysen, unterstuetzen, impressum, datenschutz, 404.
  python3 werkzeug/seiten.py
"""
import pathlib

S = pathlib.Path.home() / 'idealismus/site'
KOFI = 'https://ko-fi.com/idealismedition'
KOFI_STUFEN = KOFI + '/tiers'
# Stripe-Kundenportal (Anmeldelink aus dem Stripe-Dashboard: Einstellungen → Billing → Kundenportal). Leer: Link entfällt.
STRIPE_PORTAL = 'https://billing.stripe.com/p/login/7sY00k4l22zc7LMcbSdEs00'

# Mitgliedsstufen: Name, Betrag alle drei Monate, derselbe Betrag je Monat, fuer wen, welche Ringe gold
# (a oben, b links, c rechts wie im Zeichen). Beträge wie in api/_stripe.js (seit 08.11.2026 vierteljährlich).
STUFEN = [('Reader', '6', '2', 'Für Studierende und alle, die mit kleinem Budget lesen.', 'a'),
          ('Fellow', '12', '4', 'Für Promovierende und Postdocs, die mit den Texten arbeiten.', 'ab'),
          ('Scholar', '24', '8', 'Für Professorinnen und Professoren, die die Ausgaben in Forschung und Lehre nutzen.', 'abc')]


def stufe(name, preis, monat, wer, an):
    ringe = ''.join(f'<circle{" class=\"an\"" if k in an else ""} cx="{x}" cy="{y}" r="34"/>'
                    for k, x, y in (('a', 100, 44), ('b', 80, 72), ('c', 120, 72)))
    return f'''    <li class="ei-stufe">
      <svg viewBox="0 0 200 120" aria-hidden="true">{ringe}</svg>
      <h2>{name}</h2>
      <p class="ei-preis">{preis}&nbsp;€ alle drei Monate</p>
      <p class="ei-preis-monat">{monat}&nbsp;€ im Monat</p>
      <p class="ei-wer">{wer}</p>
      <a class="ei-knopf ei-stufe-knopf" href="#mitglied" data-stufe="{name.lower()}" data-name="{name}" data-betrag="{preis}" data-an="{an}">{name} werden</a>
    </li>'''

RINGE = ('<svg class="ringe-mark site-title-rings" viewBox="0 0 200 120" aria-hidden="true">'
         '<circle class="ring ring-a" cx="100" cy="44" r="34" vector-effect="non-scaling-stroke"/>'
         '<circle class="ring ring-b" cx="80" cy="72" r="34" vector-effect="non-scaling-stroke"/>'
         '<circle class="ring ring-c" cx="120" cy="72" r="34" vector-effect="non-scaling-stroke"/></svg>')


def seite(datei, titel, rumpf, beschreibung='', aktuell='', ohne_index=False, kopf='', fuss=''):
    nav = [('/', 'Ausgaben', ''), ('/search', 'Recherche', 'recherche'), ('/analyses', 'Analysen', 'analysen'),
           ('/support', 'Unterstützen', 'unterstuetzen')]
    navhtml = '\n'.join(f'      <li' + (' class="nav-weit"' if k == 'unterstuetzen' else '') + f'><a href="{h}"' + (' target="_blank" rel="noopener"' if h.startswith('http') else '') + (' class="current" aria-current="page"' if k and k == aktuell else '') + f'>{t}</a></li>' for h, t, k in nav)
    kanon = '' if ohne_index else f'\n  <link rel="canonical" href="https://www.idealismedition.com/{datei.removesuffix(".html").removesuffix("index")}">'
    (S / 'de' / datei).write_text(f'''<!DOCTYPE html>
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
  <link rel="stylesheet" href="/assets/portal.css">{kopf}
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
    <a href="/support">Unterstützen</a>
    <a href="/privacy">Datenschutz</a>
    <a href="/legal-notice">Impressum</a>
  </nav>
</footer>
{fuss}<script defer src="/_vercel/insights/script.js"></script>
</body>
</html>
''', encoding='utf-8')


ANSCHRIFT = '''Giuliano Infantino<br>
      Brüdergasse 29<br>
      53111 Bonn'''

seite('analyses.html', 'Analysen', '''
<main class="legal-container legal-container--wide an">
  <div class="legal-kicker">Analysen</div>
  <h1>Der Wortschatz der drei</h1>
  <p class="legal-lead">Was sich am Volltext der 41 Bände ablesen lässt: wann ein Begriff aufkommt und wieder zurücktritt, welche Wörter jeden der drei kennzeichnen und was sie im Druck hervorheben.</p>

  <section class="an-abschnitt" id="begriffsgeschichte">
    <h2>Begriffsgeschichte</h2>
    <p class="an-unter">Wie oft ein Wort in den Schriften eines Jahrfünfts steht, je 10&#8239;000 Wörter. Gezählt werden alle Schreibungen und Beugungsformen, also <i>Begriff</i>, <i>Begriffe</i> und <i>Begriffs</i> zusammen.</p>
    <form class="p-suche an-form" id="an-form" role="search">
      <input type="search" id="an-wort" name="wort" value="Freiheit" aria-label="Wort" spellcheck="false" autocapitalize="off" autocorrect="off">
      <button type="submit">Zeigen</button>
    </form>
    <p class="an-beispiele"><span>Zum Beispiel</span>
      <button type="button" data-wort="Freiheit">Freiheit</button>
      <button type="button" data-wort="Anschauung">Anschauung</button>
      <button type="button" data-wort="Reflexion">Reflexion</button>
      <button type="button" data-wort="Potenz">Potenz</button>
      <button type="button" data-wort="Bild">Bild</button>
      <button type="button" data-wort="Anerkennung">Anerkennung</button>
      <button type="button" data-wort="Offenbarung">Offenbarung</button>
      <button type="button" data-wort="Dialektik">Dialektik</button>
    </p>
    <h3 class="an-kurve-kopf"><span id="an-kurve-wort">Freiheit</span></h3>
    <figure class="zk" id="an-kurve"></figure>
    <p class="an-hinweis" id="an-kurve-hinweis" hidden></p>
    <p class="an-weiter"><a id="an-recherche" href="/search?q=Freiheit&amp;ansicht=zeit">In der Recherche über die Jahre verteilen</a>, auch für Wortfolgen und seltene Wörter, mit den Werken dazu.</p>
  </section>

  <section class="an-abschnitt" id="wortschatz">
    <h2>Kennzeichnender Wortschatz</h2>
    <p class="an-unter">Wörter, die einer der drei deutlich öfter gebraucht als die beiden anderen, geordnet nach der Stärke des Unterschieds. Der Balken zeigt, wie oft das Wort bei ihm steht, der Strich, wie oft bei den anderen; die Zahl sagt, wievielmal so oft. Ein Wort öffnet seine Begriffsgeschichte.</p>
    <div class="an-umschalter" role="group" aria-label="Wortart">
      <button type="button" data-art="begriffe" aria-pressed="true">Substantive</button>
      <button type="button" data-art="stil" aria-pressed="false">Andere Wörter</button>
    </div>
    <div class="an-spalten" id="an-vokabular"></div>
  </section>

  <section class="an-abschnitt" id="hervorhebungen">
    <h2>Hervorhebungen</h2>
    <p class="an-unter">Gesperrt oder kursiv gesetzte Wörter, wie die Drucke sie wiedergeben. Welche Wörter am häufigsten hervorgehoben sind und welche fast immer, wenn sie vorkommen.</p>
    <div class="an-kacheln" id="an-hv-zahlen"></div>
    <div class="an-spalten" id="an-hv-listen"></div>
  </section>

  <section class="legal-section an-grundlage">
    <h2>Grundlage</h2>
    <p>Maschinell ausgezählt aus dem Text der Recherche, Haupttext und Anmerkungen ohne Überschriften, nach ihrem Schreibungsausgleich: <i>daß</i> und <i>dass</i>, <i>Seyn</i> und <i>Sein</i> zählen als dasselbe Wort. Die Zahlen sind so genau wie die Texterfassung, die noch in der offenen Beta ist. Hegels Exzerpte (GW 3 und ein Abschnitt von GW 5) bleiben außer Betracht, weil sie fremde Texte wiedergeben.</p>
    <p>Jahre: bei Druckschriften das Jahr des Erscheinens, bei Vorlesungen das Jahr, in dem sie gehalten wurden, beim Nachlass das der Niederschrift; Sammelrubriken stehen bei einem mittleren Jahr. Manches geben die Ausgaben in späterer Fassung, etwa die Enzyklopädie von 1827 und 1830 oder die zweite Auflage von Schellings Ideen. Ein Jahrfünft, in dem von einem der drei weniger als 20&#8239;000 Wörter vorliegen, bleibt in der Kurve frei.</p>
    <p>Kennzeichnend heißt: Das Wort steht bei einem Autor mindestens 40-mal und, auf die Länge der Texte gerechnet, öfter als bei den beiden anderen zusammengenommen; geordnet ist nach dem Log-Likelihood-Test von Dunning. Beugungsformen der Substantive sind zusammengefasst. Hervorhebungen sind nach den TEI-Daten der Ausgaben gezählt; die Sprecher in Schellings Bruno sind ausgenommen. Stand: <span id="an-stand"></span>.</p>
  </section>
</main>''', beschreibung='Begriffsgeschichte, kennzeichnender Wortschatz und Hervorhebungen bei Fichte, Schelling und Hegel, ausgezählt aus dem Volltext der 41 Bände.',
      aktuell='analysen',
      kopf='\n  <link rel="stylesheet" href="/assets/zeitkurve.css">',
      fuss='<script src="/assets/ortho.js" defer></script>\n<script src="/assets/zeitkurve.js" defer></script>\n<script src="/assets/analysen.js" defer></script>\n')

seite('support.html', 'Unterstützen', f'''
<main class="legal-container legal-container--wide">
  <div class="legal-kicker">Unterstützen</div>
  <h1>Mitglied werden</h1>
  <p class="legal-lead">Die Ausgaben sind frei zugänglich, ohne Bezahlschranke und ohne Konto, und sollen es bleiben. Wer die Arbeit mittragen will, kann Mitglied werden.</p>

  <ul class="ei-stufen">
{chr(10).join(stufe(*x) for x in STUFEN)}
  </ul>
  <p class="ei-hinweis">Die Stufen unterscheiden sich nur im Betrag; wählen Sie, was zu Ihnen passt. Bezahlt wird sicher über Stripe, direkt hier auf der Seite; die Mitgliedschaft lässt sich jederzeit beenden.{(' <a href="' + STRIPE_PORTAL + '" target="_blank" rel="noopener">Mitgliedschaft verwalten</a>') if STRIPE_PORTAL else ''}</p>
  <p class="ei-hinweis ei-leise">Ein Klick auf eine Stufe lädt das Bezahlfeld von Stripe; erst dann gehen Daten an Stripe (siehe <a href="/privacy">Datenschutz</a>).</p>
  <p class="ei-danke" id="ei-danke" hidden>Danke! Ihre Mitgliedschaft ist eingerichtet. Eine Bestätigung kommt per E-Mail von Stripe.</p>

  <dialog class="ei-kofi-fenster" id="kasse-fenster" aria-labelledby="kasse-titel">
    <div class="ei-kofi-kopf" tabindex="-1" autofocus>
      <svg viewBox="0 0 200 120" aria-hidden="true" id="kasse-ringe"><circle cx="100" cy="44" r="34"/><circle cx="80" cy="72" r="34"/><circle cx="120" cy="72" r="34"/></svg>
      <div><h2 id="kasse-titel"></h2><p class="ei-kofi-schritt" id="kasse-preis"></p></div>
      <button type="button" class="ei-kofi-zu" id="kasse-zu" aria-label="Schließen">×</button>
    </div>
    <div class="ei-kasse" id="kasse"></div>
    <p class="ei-kasse-meldung" id="kasse-meldung" hidden></p>
    <p class="ei-kofi-fuss">Bezahlt wird über Stripe; Ihre Karten- oder Kontodaten sehen wir nicht. Jederzeit kündbar, zum Ende des laufenden Vierteljahrs.</p>
  </dialog>

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
    <p>Mitglieder werden, wenn sie es wünschen, unter den Friends of the Edition genannt.</p>
    <p class="ei-zahl" id="ei-zahl" hidden></p>
    <ul class="ei-friends" id="ei-friends" hidden></ul>
  </section>
</main>''', beschreibung='Die Ausgaben sind frei zugänglich. Wer die Arbeit mittragen will, kann Mitglied werden.', aktuell='unterstuetzen',
      fuss='''<script>
/* Mitgliedschaft mit Stripe, direkt auf der Seite: die Stufe öffnet ein Fenster mit Stripes eingebettetem Bezahlfeld
   (api/mitglied-sitzung.js). Stripe.js lädt erst mit diesem Klick. Nach dem Bezahlen kehrt Stripe mit ?danke= zurück. */
(function () {
  var EN = document.documentElement.lang === 'en';
  var fenster = document.getElementById('kasse-fenster'), feld = document.getElementById('kasse'), meldung = document.getElementById('kasse-meldung');
  var kasse = null, stripeLaedt = null;
  function ladeStripe() {
    if (!stripeLaedt) stripeLaedt = new Promise(function (ok, nein) {
      var sc = document.createElement('script'); sc.src = 'https://js.stripe.com/v3/'; sc.onload = ok; sc.onerror = nein; document.head.appendChild(sc);
    });
    return stripeLaedt;
  }
  function zeige(t) { meldung.textContent = t; meldung.hidden = !t; }
  function oeffnen(a) {
    document.getElementById('kasse-titel').textContent = EN ? 'Become a ' + a.dataset.name : a.dataset.name + ' werden';
    document.getElementById('kasse-preis').textContent = EN ? '€' + a.dataset.betrag.replace(',', '.') + ' every three months, cancel any time' : a.dataset.betrag + ' € alle drei Monate, jederzeit kündbar';
    document.querySelectorAll('#kasse-ringe circle').forEach(function (c, k) { c.classList.toggle('an', (a.dataset.an || '').indexOf('abc'[k]) >= 0); });
    if (fenster.showModal) fenster.showModal(); else fenster.setAttribute('open', '');
    if (kasse) { kasse.destroy(); kasse = null; }
    feld.textContent = ''; zeige(EN ? 'Loading the payment form …' : 'Das Bezahlfeld wird geladen …');
    var antwort;
    fetch('/api/mitglied-sitzung', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ stufe: a.dataset.stufe, sprache: EN ? 'en' : 'de' }) })
      .then(function (r) { return r.json(); })
      .then(function (j) { if (!j.ok) throw new Error(j.grund); antwort = j; return ladeStripe(); })
      .then(function () { return Stripe(antwort.publishableKey).initEmbeddedCheckout({ fetchClientSecret: function () { return Promise.resolve(antwort.clientSecret); } }); })
      .then(function (k) { kasse = k; zeige(''); k.mount('#kasse'); })
      .catch(function () { zeige(EN ? 'The payment form could not be loaded. Please try again later.' : 'Das Bezahlfeld ließ sich nicht laden. Bitte später noch einmal.'); });
  }
  document.querySelectorAll('.ei-stufe-knopf').forEach(function (a) {
    a.addEventListener('click', function (e) { e.preventDefault(); oeffnen(a); });
  });
  document.getElementById('kasse-zu').addEventListener('click', function () { fenster.close(); });
  fenster.addEventListener('click', function (e) { if (e.target === fenster) fenster.close(); });
  // Zurück von Stripe: danken, freiwilligen Namen an das Abo schreiben
  var danke = new URLSearchParams(location.search).get('danke');
  if (danke) {
    document.getElementById('ei-danke').hidden = false;
    fetch('/api/mitglied-danke?sitzung=' + encodeURIComponent(danke)).catch(function () {});
    history.replaceState(null, '', location.pathname);
  }
  // Zahl der Mitglieder und Friends of the Edition
  fetch('/api/mitglieder').then(function (r) { return r.json(); }).then(function (j) {
    if (!j.ok || !j.zahl) return;
    var z = document.getElementById('ei-zahl');
    z.textContent = EN ? (j.zahl === 1 ? 'One member supports the editions.' : j.zahl + ' members support the editions.') : (j.zahl === 1 ? 'Ein Mitglied trägt die Ausgaben mit.' : j.zahl + ' Mitglieder tragen die Ausgaben mit.');
    z.hidden = false;
    if (j.namen && j.namen.length) {
      var ul = document.getElementById('ei-friends');
      j.namen.forEach(function (n) { var li = document.createElement('li'); li.textContent = n; ul.appendChild(li); });
      ul.hidden = false;
    }
  }).catch(function () {});
})();
</script>
''')

seite('legal-notice.html', 'Impressum', f'''
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

seite('privacy.html', 'Datenschutz', '''
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
    <h2>3. Keine Cookies, cookielose Reichweitenmessung</h2>
    <p>Diese Website setzt keine Cookies. Die Reichweite misst Vercel Web Analytics ohne Cookies und ohne dauerhafte Kennung: Aus Seitenaufrufen entstehen Zählwerte je Tag; ein Besucher wird nicht über den Tag hinaus wiedererkannt. Rechtsgrundlage ist das berechtigte Interesse an einer Reichweitenstatistik (Art. 6 Abs. 1 lit. f DSGVO). Die Startseite zeigt die Besucher je Tag der letzten 30 Tage. Schriften und Suchdaten werden von dieser Website selbst geladen, nicht von Dritten.</p>
    <p>Im lokalen Speicher Ihres Browsers werden nur Ihr Farbschema und Ihre zuletzt gesuchten Anfragen abgelegt. Beides bleibt auf Ihrem Gerät und wird nicht übertragen. Die Recherche läuft vollständig in Ihrem Browser: Ihre Anfragen werden nicht an den Server geschickt. Da diese Speicherung für den von Ihnen gewünschten Dienst unbedingt erforderlich ist, bedarf sie keiner Einwilligung (§ 25 Abs. 2 Nr. 2 TDDDG). Sie können die Angaben jederzeit über die Einstellungen Ihres Browsers löschen.</p>
  </section>

  <section class="legal-section">
    <h2>4. Rückmeldungen</h2>
    <p>Über den Link „Rückmeldung“ im Fuß jeder Seite und „Fehler melden“ im Leser können Sie uns schreiben. Übermittelt wird nur, wenn Sie auf „Senden“ klicken: Ihre Nachricht, eine freiwillige E-Mail-Adresse für eine Antwort, die Seite und gegebenenfalls die Textstelle, auf die sich die Nachricht bezieht, und die Sprache der Seite; keine IP-Adresse und keine Kennung.</p>
    <p>Die Nachricht geht über eine Funktion der Website www.idealismedition.com (betrieben bei Vercel Inc.) an GitHub (GitHub, Inc., USA) und wird dort als Eintrag in einem nicht öffentlichen Verzeichnis gespeichert, das nur der Verantwortliche einsehen kann. GitHub nimmt am EU-US Data Privacy Framework teil. Die Angaben dienen allein der Bearbeitung Ihres Hinweises und werden gelöscht, sobald er erledigt ist, spätestens nach zwei Jahren. Rechtsgrundlage ist Ihre Einwilligung durch das Senden (Art. 6 Abs. 1 lit. a DSGVO); Sie können jederzeit die Löschung verlangen.</p>
  </section>

  <section class="legal-section">
    <h2>5. Mitgliedschaft über Stripe (nur nach Klick)</h2>
    <p>Auf der Seite „Unterstützen“ lässt sich eine Mitgliedschaft direkt abschließen. Dafür lädt die Seite das Bezahlfeld von Stripe (Stripe Payments Europe, Ltd., Irland), aber erst, wenn Sie eine der Stufen anklicken; vorher wird nichts von Stripe geladen. Nach dem Klick ruft Ihr Browser Inhalte von Servern von Stripe ab. Dabei erhält Stripe Ihre IP-Adresse und technische Angaben zu Ihrem Browser und setzt Cookies, die der Betrugsvorbeugung dienen.</p>
    <p>Ihre Zahlungsangaben geben Sie unmittelbar bei Stripe ein; Karten- und Kontodaten erhalten wir nicht. In unserem Stripe-Konto sehen wir Ihren Namen, Ihre E-Mail-Adresse, die gewählte Stufe und den Stand der Mitgliedschaft, und den Namen, den Sie freiwillig für die Friends of the Edition angeben. Diesen Namen zeigen wir auf der Seite „Unterstützen“, solange die Mitgliedschaft läuft. Rechtsgrundlage für das Laden des Bezahlfelds ist Ihre Einwilligung durch den Klick (Art. 6 Abs. 1 lit. a DSGVO, § 25 Abs. 1 TDDDG), für die Abwicklung der Mitgliedschaft deren Durchführung (Art. 6 Abs. 1 lit. b DSGVO). Ergänzend gilt die Datenschutzerklärung von Stripe.</p>
  </section>

  <section class="legal-section">
    <h2>6. Verweise auf andere Websites</h2>
    <p>Die Treffer der Recherche und die Bandtitel führen in die Ausgaben auf www.fichteedition.com, schellingedition.com und hegeledition.com; dort gelten deren Datenschutzhinweise. Es handelt sich um einfache Links: Erst wenn Sie einen anklicken, verlassen Sie diese Website.</p>
  </section>

  <section class="legal-section">
    <h2>7. Ihre Rechte</h2>
    <p>Sie haben im Rahmen der gesetzlichen Bestimmungen das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung sowie auf Beschwerde bei einer Datenschutzaufsichtsbehörde. Fragen richten Sie bitte an giulianoinfantino[at]icloud.com.</p>
  </section>
</main>''')

seite('404.html', 'Seite nicht gefunden', '''
<main class="error-page">
  <div class="error-content">
    <div class="error-code">404</div>
    <h1 class="error-title">Seite nicht gefunden</h1>
    <p class="error-text">Die angeforderte Seite gibt es nicht oder nicht mehr.</p>
    <p class="ei-wege" style="justify-content:center"><a href="/">Zur Startseite</a><a href="/search">Recherche</a></p>
  </div>
</main>''', ohne_index=True)

print('Seiten geschrieben')
