# Edition Deutscher Idealismus (idealismedition.com)

Portal über den Editionen: Startseite mit den Bänden aller Editionen und eine gemeinsame Recherche.
Die Editionen selbst bleiben, wo sie sind (hegeledition.com, schellingedition.com); das Portal liest nur ihre Daten.

- `werkzeug/sammle.py`: Suchdaten und Zahlen aus den Editionen holen (Hegel aus `~/hegel-umfrage-wt`, ohne GW 16; Schelling aus `~/schelling/site`).
- `werkzeug/recherche_seite.py`: die Suchseite (`site/de/search.html`) aus der Suchseite der Editionen ableiten; ruft am Ende `pult_einbau.py`.
- `werkzeug/pult_einbau.py`: was nur die Recherche des Portals hat („das Pult“, seit 11/2026): erste Ansicht mit Beispielen, Autoren als Schalter, Filter (Stationen des gewählten Autors, Werkwahl, Gattung, Textart, Bände), Suchformular „Erweitert“, Druckseite, die unter der Stelle aufklappt, Merkliste mit Export, Rangfolge, Ansicht „Begriffe“, Zitate und Werktitel im Suchfeld. Die Stationen je Autor stehen oben in `recherche-pult.js` (`PERIODEN`). Dazu gehören `site/assets/recherche-pult.js`, `recherche-pult.css` und der Abschnitt „Pult“ in `recherche-portal-worker.js`. `recherche-pult.js` trägt beide Sprachen selbst und läuft nicht durch `englisch.py`.
- `werkzeug/ausgabe_suche.py fichte|schelling|hegel [ordner] [--sw]`: dieselbe Recherche auf der Suchseite einer einzelnen Ausgabe (fichteedition.com/search, schellingedition.com/search, hegeledition.com/search; seit 11/2026). Setzt den Hauptteil und die Skripte von `site/de/search.html` in Kopf und Fuß der Ausgabe und stellt sie auf den einen Autor: keine Autorenschalter, seine Stationen stehen immer bei den Filtern, Zeitachsen nur über seine Jahre, nur die Gattungen, die es bei ihm gibt, eigene Beispiele, kein „Vergleich“, keine Querverweise. Schreibt in die Ausgabe `de/search.html`, `assets/recherche-pult.{js,css}`, `recherche-quer.js`, `recherche-portal-worker.js`, `recherche-ausgabe.css`, `zeitkurve.{js,css}`, `suche-baende.js` (Bände, Zeitfenster), `suche/jahre.json` und ergänzt `sprache/konfig.json`; `--sw` zählt den Speichernamen in `sw.js` hoch. Danach in der Ausgabe `englisch.py <ordner> auszug`, `ausgabe_suche.py <ausgabe> <ordner> --en` (füllt `sprache/en.json` aus der Tabelle des Portals), `englisch.py <ordner> bauen`. Nach jeder Änderung an der Recherche des Portals und nach neuen Suchdaten einer Ausgabe wiederholen. `recherche.css`, `recherche-kern.js` und `recherche-worker.js` bleiben die der Ausgabe.
- `werkzeug/englisch.py ~/idealismus bauen`: die englischen Seiten und Skripte aus den deutschen (`sprache/en.json`, `sprache/konfig.json`); nach jeder Änderung an einer deutschen Seite.
- `werkzeug/seiten.py`: Unterstützen, Impressum, Datenschutz, 404.
- `werkzeug/dienst.py [port]`: lokal wie Vercel (cleanUrls), Standard 8744.
- `werkzeug/deploy.sh [--prod]`: aus einer Kopie außerhalb von Git ausliefern.

Nach jeder Freigabe einer Edition: `python3 werkzeug/sammle.py && werkzeug/deploy.sh --prod`.

Suchseite neu ableiten: `python3 werkzeug/recherche_seite.py && python3 werkzeug/sammle.py && python3 werkzeug/englisch.py ~/idealismus bauen`.
Einen Zweig als Vorschau ausliefern, ohne den Arbeitsordner anzufassen: `IDEALISMUS=/pfad/zum/zweig werkzeug/deploy.sh` (ohne `--prod`).
