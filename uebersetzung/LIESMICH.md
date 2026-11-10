# Englische Übersetzung: Glossar und Abstimmung

Stand 09.11.2026. Nichts committet, nichts live.

## Dateien

| Datei | Inhalt |
|---|---|
| `hegel-glossar.md` | Hegel, Entwurf 1 (≈170 Einträge, D1–D15) |
| `hegel-glossar-nachtrag.md` | Hegel, Nachtrag: 245 Einträge, 21 Korrekturen an Entwurf 1, N1–N9, 40 Fallen, Werktitel |
| `fichte-glossar.md` | Fichte: 297 Einträge, F1–F18, 28 Fallen, heikle Stellen (Reden, 1793 über Juden) |
| `schelling-glossar.md` | Schelling: ≈430 Einträge, S1–S20, 30 Fallen, Götternamen |
| `gemeinsam-glossar.md` | autorübergreifend: Kernwortschatz, Kant-Schicht (Cambridge), Sprache um 1800, 25 Konventionen, C1–C36 |
| `abstimmung-quelle.json` + `abstimmung-zusatz-A/B.json` | die offenen Fragen (zusammen 348 nach Zusammenführen) für die Leserabstimmung (öffentlicher Text: keine Übersetzernamen) |
| `zaehle.py` | Zähler über alle drei Korpora (`count`, `kwic`, `kandidaten`), alte Schreibungen angeglichen |

Die Entwürfe widersprechen sich an einigen Stellen (Grenze/Schranke, Wechselwirkung, Dasein/Existenz je Autor,
Sittlichkeit in Fichte). In der Abstimmung stehen diese Fragen ohne Vorschlag (`vorschlag: null`).

## Abstimmung (/translation)

- Seite `site/translation.html`, `site/assets/glossar.{js,css}`, Schnittstelle `site/api/glossar.js`.
- Daten bauen: `python3 -I werkzeug/glossar_seite.py` → `site/assets/glossar/abstimmung.json` (72 Fragen) und
  `glossar.json` (≈1 300 feste Einträge, nur Deutsch → Englisch; die Spalten mit Übersetzern bleiben draußen).
- Regeln: jede Stimme braucht eine Begründung; Punkte = Stimmen + „überzeugend“-Marken; eigene Vorschläge möglich;
  drei Meldungen blenden einen Grund aus; Schluss `schluss` in der Quelle (30.11.2026).
- **Vor dem Livegang:** Upstash Redis über den Vercel Marketplace an das Projekt `idealismedition` hängen
  (setzt `KV_REST_API_URL`/`KV_REST_API_TOKEN`), `GLOSSAR_ADMIN` und `GLOSSAR_SALZ` setzen, Datenschutz-Abschnitt
  (DE in `werkzeug/seiten.py`, EN über `englisch.py`) mit Anbieter und Region ergänzen, dann deploy.
- Verwalten: `POST /api/glossar {tat: 'verborgene'|'verbergen'|'zeigen', admin, grundId}`.

## Feste Anforderung an die Übersetzung (Nutzer, 09.11.2026)

Im englischen Leser muss man jedes Wort und jeden Satz auf das deutsche Original umschalten können.
Darum: die Übersetzung wird **satzweise am Original ausgerichtet** gespeichert (jeder englische Satz kennt seinen
deutschen Satz), und **jeder Glossarbegriff trägt sein deutsches Wort** (Lemma und Wortlaut) im Markup.
Die Vorschau auf /translation zeigt das Verhalten (Wort antippen = Deutsch, Satz antippen = ganzer Satz deutsch).

## Stand 09.11.2026 spät

- Seite: **348 Fragen** (312 Begriffe, 36 Konventionen). Doppelte deutsche Begriffe werden beim Bauen zusammengeführt;
  Eigentümerfragen (Ethnische Begriffe, fremde Zitate, Satzgrenzen) bleiben draußen (`NICHT_OEFFENTLICH`).
- `entscheidungsregister.md`: 121 Meta-Entscheidungen (A–J), je mit Zuständigkeit O/C/T; `meta-recherche.md`: Quellen dazu (M1–M118).
