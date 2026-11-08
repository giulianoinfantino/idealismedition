// Nutzung der letzten 30 Tage fuer die Grafik auf der Startseite: je Tag die
// eindeutigen Besucher der Website (Vercel Web Analytics). Dieselbe Abfrage wie
// in der Hegel- und der Schelling-Edition (api/nutzung.js dort), ohne die Mac-App: die Reihe
// `app` bleibt null, und assets/nutzung.js zeichnet dann nur die Website.
//
// Die Abfrage ist dieselbe, die `vercel metrics vercel.analytics_pageview.count
// -a unique/visitor_id -g 1d` stellt. Sie braucht ein Vercel-API-Token in
// VERCEL_API_TOKEN (Geltungsbereich: das Team der Edition). Faellt sie aus,
// meldet die Antwort { available:false } und die Grafik baut sich nicht auf:
// nie ein Leer- oder Fehlerzustand auf der Seite.
//
// Die Antwort wird am CDN eine Stunde gehalten: die Zahlen aendern sich
// tagsueber nur langsam.

const TEAM = 'team_4OooSwx5VknXGD0Nn2LAi83y';
const PROJEKT = 'prj_h4lATLWuIDsDvUyf21sYDpcZgnjz';   // idealismedition
const TAGE = 30;
// Web Analytics zaehlt erst seit dem Abend des 8.11.2026. Fuer die Tage bis dahin zaehlt die Grafik aus den
// Server-Protokollen: verschiedene Adressen, die Seiten (text/html, 200) abgerufen haben, ohne erkannte Bots.
// Der Wert wurde am 8.11. abends einmal aus den Protokollen gezaehlt und steht hier fest; die Funktion
// selbst fragt keine Protokolle und keine Adressen ab.
const PROTOKOLL_BIS = '2026-11-08';
const PROTOKOLL_STAND = { '2026-11-08': 102 };

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

async function websiteBesucher(liste) {
  const token = process.env.VERCEL_API_TOKEN;
  if (!token) throw new Error('VERCEL_API_TOKEN fehlt');
  const start = `${liste[0]}T00:00:00.000Z`;
  const ende = new Date(`${liste[liste.length - 1]}T00:00:00.000Z`);
  ende.setUTCDate(ende.getUTCDate() + 1);
  const r = await fetch(`https://api.vercel.com/v2/observability/query?teamId=${TEAM}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      scope: { type: 'project', ownerId: TEAM, projectIds: [PROJEKT] },
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
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
  const liste = tage();
  const web = await websiteBesucher(liste).catch(() => null);
  if (!web) {
    res.status(200).json({ available: false });
    return;
  }
  for (let i = 0; i < liste.length; i++) {
    if (!(liste[i] in PROTOKOLL_STAND)) continue;   // nur die Tage vor dem Start der Messung
    web[i] = Math.max(web[i], PROTOKOLL_STAND[liste[i]] || 0);
  }
  res.status(200).json({
    available: true,
    stand: new Date().toISOString(),
    tage: liste.map((tag, i) => ({ tag, web: web[i], app: null }))
  });
};
