// Rückmeldungen der Leser als Issues in einem privaten GitHub-Repository (seit 08.11.2026).
// Eine Stelle für alle vier Seiten: Hegel-, Fichte-, Schelling-Edition und Portal schicken hierher
// (assets/rueckmeldung.js). Gespeichert wird nur, was im Formular steht, und die Seite, von der es kam;
// keine IP-Adresse, keine Kennung. Die E-Mail-Adresse ist freiwillig und steht nur im privaten Issue.
//
// Umgebung (Vercel-Projekt idealismedition):
//   GITHUB_RUECKMELDUNG_TOKEN  Fine-grained Token, nur dieses Repository, Recht „Issues: Read and write“
//   RUECKMELDUNG_REPO          optional, Vorgabe giulianoinfantino/idealismus-rueckmeldungen

const REPO = process.env.RUECKMELDUNG_REPO || 'giulianoinfantino/idealismus-rueckmeldungen';
const HERKUNFT = ['https://www.idealismedition.com', 'https://www.hegeledition.com',
                  'https://www.fichteedition.com', 'https://www.schellingedition.com'];
const AUSGABEN = { hegel: 'Hegel', fichte: 'Fichte', schelling: 'Schelling', portal: 'Portal' };

function kurz(s, n) { return String(s == null ? '' : s).replace(/\u0000/g, '').trim().slice(0, n); }
// Markdown im Issue entschärfen: kein @-Erwähnen, keine eingeschmuggelten Bilder oder HTML
function sicher(s) { return s.replace(/@/g, '@​').replace(/</g, '&lt;').replace(/!\[/g, '!​['); }

module.exports = async (req, res) => {
  const herkunft = req.headers.origin || '';
  if (HERKUNFT.includes(herkunft) || /^http:\/\/(127\.0\.0\.1|localhost):\d+$/.test(herkunft)) {
    res.setHeader('Access-Control-Allow-Origin', herkunft);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ ok: false });

  let d = req.body;
  if (typeof d === 'string') { try { d = JSON.parse(d); } catch (e) { d = null; } }
  if (!d || typeof d !== 'object') return res.status(400).json({ ok: false, grund: 'leer' });
  // Falle für Programme: ein unsichtbares Feld, und mindestens drei Sekunden zwischen Öffnen und Senden
  if (d.webseite || (typeof d.dauer === 'number' && d.dauer < 3000)) return res.status(200).json({ ok: true });

  const text = kurz(d.text, 5000);
  if (text.length < 3) return res.status(400).json({ ok: false, grund: 'text' });
  const ausgabe = AUSGABEN[d.ausgabe] ? d.ausgabe : 'portal';
  const art = d.art === 'stelle' ? 'stelle' : 'allgemein';
  const zitat = kurz(d.zitat, 120), link = kurz(d.link, 500), seite = kurz(d.seite, 500);
  const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(kurz(d.email, 200)) ? kurz(d.email, 200) : '';
  const sprache = d.sprache === 'en' ? 'en' : 'de';

  const titel = (art === 'stelle' && zitat ? sicher(zitat) + ': ' : AUSGABEN[ausgabe] + ': ')
    + sicher(text.replace(/\s+/g, ' ').slice(0, 70)) + (text.length > 70 ? ' …' : '');
  const zeilen = [
    sicher(text), '', '---',
    `**Ausgabe:** ${AUSGABEN[ausgabe]}`,
    art === 'stelle' && zitat ? `**Stelle:** ${sicher(zitat)}` : null,
    link ? `**Link:** ${link}` : null,
    seite && seite !== link ? `**Seite:** ${seite}` : null,
    `**Sprache der Seite:** ${sprache}`,
    email ? `**Antwort an:** ${sicher(email)}` : '**Antwort an:** keine Adresse angegeben',
  ].filter(x => x != null);

  const token = process.env.GITHUB_RUECKMELDUNG_TOKEN;
  if (!token) return res.status(503).json({ ok: false, grund: 'nicht eingerichtet' });
  try {
    const r = await fetch(`https://api.github.com/repos/${REPO}/issues`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json',
                 'X-GitHub-Api-Version': '2022-11-28', 'Content-Type': 'application/json',
                 'User-Agent': 'idealismedition-rueckmeldung' },
      body: JSON.stringify({ title: titel, body: zeilen.join('\n'), labels: [ausgabe, art] })
    });
    if (!r.ok) return res.status(502).json({ ok: false, grund: 'github ' + r.status });
    const j = await r.json();
    return res.status(200).json({ ok: true, nummer: j.number });
  } catch (e) {
    return res.status(502).json({ ok: false, grund: 'netz' });
  }
};
