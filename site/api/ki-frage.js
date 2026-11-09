// KI-Recherche (Vorschau, seit 08.11.2026): Claude beantwortet eine Frage zu den Texten von Fichte, Schelling und Hegel,
// indem es mit zwei Werkzeugen in den 41 Bänden sucht und liest (api/_ki-korpus.js), und belegt jede Aussage mit Stellen.
// Die Antwort kommt als NDJSON-Strom: erst die Arbeitsschritte (damit man sieht, was gesucht wird), dann die Antwort
// mit den Quellen und eine Kostenschätzung.
//
// Umgebung: ANTHROPIC_API_KEY; KI_MODELL (Vorgabe claude-opus-5-5); KI_OFFEN=1 schaltet die Funktion in Production frei.
// Ohne KI_OFFEN antwortet sie nur auf Vorschau-Adressen (VERCEL_ENV preview/development).
const Anthropic = require('@anthropic-ai/sdk');
const K = require('./_ki-korpus');

const MODELLE = {   // US-$ je Million Token: Eingabe, Ausgabe, Cache lesen, Cache schreiben (5 min)
  'claude-opus-5-5':   [4, 20, 0.2, 5],
  'claude-sonnet-5-5': [2, 10, 0.2, 2.5],
  'claude-haiku-5-5':  [0.1, 0.5, 0.01, 0.125],
};
const RUNDEN = 10;

const WERKZEUGE = [
  {
    name: 'suche',
    description: 'Sucht Stellen in den 41 Bänden nach Wörtern. Alle Wörter müssen in derselben Stelle (einem Seitenstück) vorkommen; '
      + '"Wortfolge" in Anführungszeichen sucht genau diese Folge; ein Stern am Wortende sucht den Wortanfang (Begriff* findet Begriffe, begrifflich). '
      + 'Groß-/Kleinschreibung, ß/ss, th/t (Nothwendigkeit), ey/ei (seyn) und ae/ä werden angeglichen; andere alte Schreibungen '
      + '(c/k/z wie Princip, Accidenz; -iren) bitte als Varianten eigens suchen. Es gibt kein OR; für Alternativen mehrere Suchen. Gibt die Gesamtzahl, die Verteilung auf Bände '
      + 'und die besten Stellen mit Kennung, Zitat und Ausschnitt zurück.',
    input_schema: {
      type: 'object', additionalProperties: false,
      properties: {
        anfrage: { type: 'string', description: 'Suchwörter, z. B. Leben "unmittelbare Idee" oder Trieb* Selbstbewusstsein' },
        autor: { type: 'string', enum: ['alle', 'fichte', 'schelling', 'hegel'] },
        werke: { type: 'array', items: { type: 'string' }, description: 'Kennungen der Bände (z. B. gw-12, fsw-4); leer = alle' },
        anzahl: { type: 'integer', description: 'Wie viele Stellen zurückgeben, 1 bis 25' },
      },
      required: ['anfrage', 'autor', 'werke', 'anzahl'],
    },
    strict: true,
  },
  {
    name: 'lesen',
    description: 'Gibt eine Stelle (Kennung aus der Suche) im vollen Wortlaut zurück, mit so vielen Nachbarstellen davor und danach '
      + 'wie angegeben (0 bis 3). Vor jedem längeren Zitat oder jeder Deutung die Stelle lesen.',
    input_schema: {
      type: 'object', additionalProperties: false,
      properties: { id: { type: 'string' }, umgebung: { type: 'integer' } },
      required: ['id', 'umgebung'],
    },
    strict: true,
  },
];

function system(sprache) {
  return `Du bist der Recherche-Assistent der Edition Deutscher Idealismus (idealismedition.com), einer digitalen Ausgabe der Werke von Fichte, Schelling und Hegel. Leserinnen und Leser sind meist Studierende und Forschende der Philosophie.

Beantworte die Frage aus den Texten selbst. Suche dazu mit dem Werkzeug „suche“ (mehrere Anfragen, Synonyme, Wortfamilien und alte Schreibungen, gefiltert nach Autor oder Band, wo das hilft) und lies die einschlägigen Stellen mit „lesen“, bevor du sie zitierst oder deutest. Arbeite gründlich, aber zielstrebig: meist genügen drei bis acht Werkzeugaufrufe.

Belege: Jede Aussage darüber, was ein Text sagt, trägt unmittelbar danach eine Marke ⟦Kennung⟧ mit der Kennung der Stelle aus den Werkzeugergebnissen, etwa ⟦gw-12:851⟧. Zitiere kurze Wendungen wörtlich in Anführungszeichen, im Original (alte Schreibung beibehalten, Sternchen *…* bedeuten Sperrsatz und dürfen weggelassen werden). Erfinde nie eine Kennung. Was du nur aus allgemeinem Wissen beisteuerst, kennzeichne als solches und setze keine Marke dazu. Findest du nichts Einschlägiges, sage das offen und nenne, wonach du gesucht hast.

Form: ${sprache === 'en' ? 'Antworte auf Englisch; Zitate bleiben deutsch im Original.' : 'Antworte auf Deutsch.'} Schreibe ruhige, klare Absätze ohne Überschriften und ohne Aufzählungszeichen, in der Regel 150 bis 400 Wörter. Nenne Stellen im Text so, wie man sie zitiert (etwa „Wissenschaft der Logik, GW 12, 236“); die Marken setzt die Seite in anklickbare Nummern um.

Der Bestand (Kennung | Autor | Sigle | Titel). Andere Bände, etwa Hegels Vorlesungsnachschriften oder GW 13 und GW 16, sind nicht enthalten; sage es, wenn eine Frage sie bräuchte.
${K.uebersicht()}`;
}

function fuehre(name, eingabe) {
  try {
    if (name === 'suche') {
      const autor = eingabe.autor && eingabe.autor !== 'alle' ? eingabe.autor : null;
      return K.suche({ anfrage: eingabe.anfrage, autor, werke: eingabe.werke, anzahl: eingabe.anzahl });
    }
    if (name === 'lesen') return K.lesen({ id: eingabe.id, umgebung: eingabe.umgebung });
    return { fehler: 'Unbekanntes Werkzeug: ' + name };
  } catch (e) {
    return { fehler: 'Werkzeug fehlgeschlagen: ' + e.message };
  }
}

// ⟦id⟧ → ⟦1⟧, ⟦2⟧ … in Reihenfolge des ersten Vorkommens; Kennungen, die kein Werkzeug geliefert hat, fallen weg
function belege(text, gesehen) {
  const nummer = new Map(), quellen = []; let verworfen = 0;
  const aus = text.replace(/\s*⟦([^⟧]+)⟧/g, (ganz, inhalt) => {
    const marken = inhalt.split(/[,;]\s*/).map(s => s.trim()).filter(Boolean);
    const nrn = [];
    for (const id of marken) {
      if (!gesehen.has(id)) { verworfen++; continue; }
      if (!nummer.has(id)) {
        const s = K.stelleNachId(id);
        if (!s) { verworfen++; continue; }
        nummer.set(id, quellen.length + 1);
        quellen.push({ nr: quellen.length + 1, id, zitat: s.zitat, werk: s.werk, abschnitt: s.abschnitt, link: s.link,
                       auszug: s.text.length > 420 ? s.text.slice(0, 420) + ' …' : s.text });
      }
      nrn.push(nummer.get(id));
    }
    return nrn.length ? '⟦' + nrn.join(',') + '⟧' : '';
  });
  return { text: aus, quellen, verworfen };
}

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ ok: false });
  const umgebung = process.env.VERCEL_ENV || 'development';
  if (umgebung === 'production' && process.env.KI_OFFEN !== '1') return res.status(403).json({ ok: false, grund: 'noch nicht freigegeben' });
  if (!process.env.ANTHROPIC_API_KEY) return res.status(503).json({ ok: false, grund: 'nicht eingerichtet' });

  let d = req.body;
  if (typeof d === 'string') { try { d = JSON.parse(d); } catch (e) { d = {}; } }
  const frage = String((d && d.frage) || '').trim().slice(0, 1500);
  if (frage.length < 3) return res.status(400).json({ ok: false, grund: 'frage' });
  const sprache = d.sprache === 'en' ? 'en' : 'de';
  const modell = MODELLE[d.modell] ? d.modell : (MODELLE[process.env.KI_MODELL] ? process.env.KI_MODELL : 'claude-opus-5-5');
  const effort = ['low', 'medium', 'high'].includes(d.effort) ? d.effort : 'medium';

  res.writeHead(200, { 'Content-Type': 'application/x-ndjson; charset=utf-8', 'Cache-Control': 'no-store', 'X-Accel-Buffering': 'no' });
  const sende = o => res.write(JSON.stringify(o) + '\n');

  const client = new Anthropic();
  const messages = [{ role: 'user', content: frage }];
  const gesehen = new Set();
  const verbrauch = { input_tokens: 0, output_tokens: 0, cache_read_input_tokens: 0, cache_creation_input_tokens: 0 };
  const beginn = Date.now();
  try {
    for (let runde = 1; ; runde++) {
      const letzte = runde >= RUNDEN;
      const anfrage = {
        model: modell, max_tokens: 16000,
        system: system(sprache), tools: WERKZEUGE, messages,
        output_config: { effort },
        cache_control: { type: 'ephemeral' },
      };
      if (letzte) anfrage.tool_choice = { type: 'none' };
      if (modell !== 'claude-haiku-5-5') { anfrage.betas = ['server-side-fallback-2026-07-01']; anfrage.fallbacks = 'default'; }
      const r = await client.beta.messages.create(anfrage);
      for (const k of Object.keys(verbrauch)) verbrauch[k] += (r.usage && r.usage[k]) || 0;

      if (r.stop_reason === 'refusal') { sende({ t: 'fehler', grund: 'abgelehnt' }); break; }
      messages.push({ role: 'assistant', content: r.content });
      const aufrufe = r.content.filter(b => b.type === 'tool_use');
      if (r.stop_reason !== 'tool_use' || !aufrufe.length) {
        const text = r.content.filter(b => b.type === 'text').map(b => b.text).join('\n\n').trim();
        const b = belege(text, gesehen);
        sende({ t: 'antwort', text: b.text, quellen: b.quellen, verworfen: b.verworfen, abgeschnitten: r.stop_reason === 'max_tokens' });
        break;
      }
      const ergebnisse = [];
      for (const a of aufrufe) {
        const erg = fuehre(a.name, a.input || {});
        (erg.stellen || []).forEach(s => gesehen.add(s.id));
        if (a.name === 'suche') sende({ t: 'schritt', art: 'suche', anfrage: a.input.anfrage, autor: a.input.autor, gesamt: erg.gesamt || 0 });
        else sende({ t: 'schritt', art: 'lesen', zitat: (erg.stellen || []).map(s => s.zitat).find((z, i, l) => i === Math.floor(l.length / 2)) || a.input.id });
        ergebnisse.push({ type: 'tool_result', tool_use_id: a.id, content: JSON.stringify(erg), is_error: !!erg.fehler });
      }
      const inhalt = ergebnisse.slice();
      if (runde + 1 >= RUNDEN) inhalt.push({ type: 'text', text: 'Das Rechercheende ist erreicht: Antworte jetzt mit dem Gefundenen, ohne weitere Werkzeuge.' });
      messages.push({ role: 'user', content: inhalt });
    }
  } catch (e) {
    const grund = e instanceof Anthropic.RateLimitError ? 'ausgelastet'
      : e instanceof Anthropic.AuthenticationError ? 'schluessel'
      : e instanceof Anthropic.APIError ? 'api ' + e.status : 'fehler';
    sende({ t: 'fehler', grund, meldung: String(e.message || '').slice(0, 300) });
  }
  const p = MODELLE[modell];
  const dollar = (verbrauch.input_tokens * p[0] + verbrauch.output_tokens * p[1] + verbrauch.cache_read_input_tokens * p[2]
    + verbrauch.cache_creation_input_tokens * p[3]) / 1e6;
  sende({ t: 'kosten', modell, effort, sekunden: Math.round((Date.now() - beginn) / 1000), verbrauch, dollar: Math.round(dollar * 1000) / 1000 });
  res.end();
};
// für den lokalen Betrieb mit Claude Code (werkzeug/ki-lokal.js)
module.exports.system = system;
module.exports.belege = belege;
