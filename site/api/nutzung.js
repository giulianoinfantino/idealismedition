// Nutzung der letzten 30 Tage fuer die Grafik auf der Startseite: je Tag die
// eindeutigen Besucher der vier Seiten (Vercel Web Analytics), also des Portals
// und der Hegel-, Fichte- und Schelling-Edition, je Seite eine Reihe. Die Grafik
// stapelt sie; die Hoehe einer Saeule ist die Summe. Wer an einem Tag mehrere
// Seiten besucht, zaehlt auf jeder: Web Analytics erkennt niemanden ueber eine
// Seite hinaus wieder.
//
// Die Abfrage ist dieselbe, die `vercel metrics vercel.analytics_pageview.count
// -a unique/visitor_id -g 1d` stellt, einmal je Projekt (alle im selben Team).
// Sie braucht ein Vercel-API-Token in VERCEL_API_TOKEN (Geltungsbereich: das
// Team der Edition). Faellt eine der vier Abfragen aus, meldet die Antwort
// { available:false } und die Grafik baut sich nicht auf: lieber keine Zahl als
// eine zu kleine Summe, und nie ein Leer- oder Fehlerzustand auf der Seite.
//
// Die Antwort wird am CDN eine Stunde gehalten: die Zahlen aendern sich
// tagsueber nur langsam.

const TEAM = 'team_4OooSwx5VknXGD0Nn2LAi83y';
const TAGE = 30;
// Reihenfolge = Stapel von unten nach oben und Legende. `protokoll`: Web Analytics zaehlt bei Portal und
// Fichte erst seit dem Abend des 8.11.2026. Fuer den Tag davor zaehlt die Grafik aus den Server-Protokollen:
// verschiedene Adressen, die Seiten (text/html, 200) abgerufen haben, ohne erkannte Bots. Die Werte wurden am
// 8.11. abends einmal gezaehlt und stehen hier fest (wie in api/nutzung.js der Fichte-Edition); die Funktion
// selbst fragt keine Protokolle und keine Adressen ab.
const SEITEN = [
  { key: 'hegel', name: 'Hegel', projekt: 'prj_xThLJwtk5Jb6ubGvzt10g8PGE0XL', protokoll: {} },
  { key: 'fichte', name: 'Fichte', projekt: 'prj_sH636nlm5jUJhGu7hX9aT0xfGiKv', protokoll: { '2026-11-08': 155 } },
  { key: 'schelling', name: 'Schelling', projekt: 'prj_3YU8CSAZd5JnI0HD0ZVP9LI2ZY8R', protokoll: {} },
  { key: 'portal', name: 'Portal', projekt: 'prj_h4lATLWuIDsDvUyf21sYDpcZgnjz', protokoll: { '2026-11-08': 102 } }
];

// Die 30 Tage bis einschliesslich heute (UTC), als "JJJJ-MM-TT".
function tage() {
  const heute = new Date();
  heute.setUTCHours(0, 0, 0, 0);
  const liste = [];
  for (let i = TAGE - 1; i >= 0; i--) {
    const d = new Date(heute);
    d.setUTCDate(heute.getUTCDate() - i);
    liste.push(d.toISOString().slice(0, 10));
  }
  return liste;
}

async function besucher(projekt, liste) {
  const token = process.env.VERCEL_API_TOKEN;
  if (!token) throw new Error('VERCEL_API_TOKEN fehlt');
  const start = `${liste[0]}T00:00:00.000Z`;
  const ende = new Date(`${liste[liste.length - 1]}T00:00:00.000Z`);
  ende.setUTCDate(ende.getUTCDate() + 1);
  const r = await fetch(`https://api.vercel.com/v2/observability/query?teamId=${TEAM}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      scope: { type: 'project', ownerId: TEAM, projectIds: [projekt] },
      metric: 'vercel.analytics_pageview.count',
      aggregation: 'unique/visitor_id',
      startTime: start,
      endTime: ende.toISOString(),
      granularity: { days: 1 }
    })
  });
  if (!r.ok) throw new Error(`Vercel ${r.status}`);
  const antwort = await r.json();
  const jeTag = {};
  for (const zeile of antwort.data || []) {
    const tag = String(zeile.timestamp).slice(0, 10);
    const wert = Object.entries(zeile).find(([k]) => k !== 'timestamp');
    jeTag[tag] = wert ? Number(wert[1]) || 0 : 0;
  }
  return liste.map(t => jeTag[t] || 0);
}

module.exports = async (req, res) => {
  const liste = tage();
  const reihen = await Promise.all(SEITEN.map(s => besucher(s.projekt, liste))).catch(() => null);
  if (!reihen) {
    res.setHeader('Cache-Control', 's-maxage=300');   // bald neu versuchen
    res.status(200).json({ available: false });
    return;
  }
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
  SEITEN.forEach((s, j) => {
    liste.forEach((tag, i) => {
      if (tag in s.protokoll) reihen[j][i] = Math.max(reihen[j][i], s.protokoll[tag]);   // nur vor dem Start der Messung
    });
  });
  res.status(200).json({
    available: true,
    stand: new Date().toISOString(),
    reihen: SEITEN.map(s => ({ key: s.key, name: s.name })),
    tage: liste.map((tag, i) => {
      const t = { tag };
      SEITEN.forEach((s, j) => { t[s.key] = reihen[j][i]; });
      return t;
    })
  });
};
