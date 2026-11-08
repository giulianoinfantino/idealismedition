# Edition Deutscher Idealismus (idealismedition.com)

Portal über den Editionen: Startseite mit den Bänden aller Editionen und eine gemeinsame Recherche.
Die Editionen selbst bleiben, wo sie sind (hegeledition.com, schellingedition.com); das Portal liest nur ihre Daten.

- `werkzeug/sammle.py`: Suchdaten und Zahlen aus den Editionen holen (Hegel aus `~/hegel-umfrage-wt`, ohne GW 16; Schelling aus `~/schelling/site`).
- `werkzeug/recherche_seite.py`: `recherche.html` aus der Suchseite der Editionen ableiten.
- `werkzeug/seiten.py`: Unterstützen, Impressum, Datenschutz, 404.
- `werkzeug/dienst.py [port]`: lokal wie Vercel (cleanUrls), Standard 8744.
- `werkzeug/deploy.sh [--prod]`: aus einer Kopie außerhalb von Git ausliefern.

Nach jeder Freigabe einer Edition: `python3 werkzeug/sammle.py && werkzeug/deploy.sh --prod`.
