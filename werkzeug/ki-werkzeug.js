#!/usr/bin/env node
// Die zwei Werkzeuge der KI-Recherche als Befehl, für den lokalen Betrieb mit Claude Code (werkzeug/ki-lokal.js):
//   node werkzeug/ki-werkzeug.js suche '<anfrage>' [alle|fichte|schelling|hegel] [anzahl] [band,band…]
//   node werkzeug/ki-werkzeug.js lesen <kennung> [umgebung 0–3]
// Ausgabe: JSON, wie api/ki-frage.js es Claude als Werkzeugergebnis gibt.
const K = require('../site/api/_ki-korpus');
const [was, a, b, c, d] = process.argv.slice(2);
let erg;
if (was === 'suche') {
  erg = K.suche({ anfrage: a, autor: b && b !== 'alle' ? b : null, anzahl: c, werke: d ? d.split(',') : [] });
} else if (was === 'lesen') {
  erg = K.lesen({ id: a, umgebung: b });
} else {
  erg = { fehler: 'Aufruf: suche <anfrage> [autor] [anzahl] [bände] oder lesen <kennung> [umgebung]' };
}
process.stdout.write(JSON.stringify(erg, null, 1) + '\n');
