#!/bin/bash
# Portal ausliefern, immer aus einer Kopie ausserhalb von Git: aus einem Git-Ordner blockiert Vercel
# jeden Build (COMMIT_AUTHOR_REQUIRED, siehe Schelling-Edition). Vorher: sammle.py, seiten.py, recherche_seite.py.
#   werkzeug/deploy.sh          Vorschau
#   werkzeug/deploy.sh --prod   Produktion
# Aus einem anderen Stand ausliefern (etwa einem Zweig in eigenem Ordner): IDEALISMUS=/pfad/zum/ordner werkzeug/deploy.sh
# Fehlt dort die Verknuepfung mit Vercel, gilt die aus ~/idealismus.
set -euo pipefail
P="${IDEALISMUS:-$HOME/idealismus}"; D="${TMPDIR:-/tmp/}idealismus-deploy"
V="$P/.vercel"; [ -f "$V/project.json" ] || V="$HOME/idealismus/.vercel"
[ -f "$V/project.json" ] || { echo "Projekt nicht verknuepft: $V/project.json fehlt"; exit 1; }
[ -f "$P/site/assets/suche/index.json" ] || { echo "Suchdaten fehlen: erst python3 werkzeug/sammle.py"; exit 1; }
if grep -q '"gw-16"' "$P/site/assets/suche/index.json"; then echo "GW 16 im Suchindex: nicht ausliefern"; exit 1; fi
mkdir -p "$D"
rsync -a --delete --exclude '.vercel' --exclude 'assets/og-source.html' --exclude '.DS_Store' --exclude 'de/assets' --exclude 'de/api' "$P/site/" "$D/"
rm -rf "$D/.vercel" && cp -R "$V" "$D/.vercel"
cd "$D" && vercel deploy --yes --scope kant-atlas "$@"
