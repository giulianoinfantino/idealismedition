// Glossary consultation for the English translation (built 09.11.2026): one open round in which readers vote on the
// contested renderings and give a reason for every vote. Page: /translation; questions: assets/glossar/abstimmung.json.
//
// Rules the page explains, enforced here:
//   - A vote needs a reason (at least MIN_GRUND characters). One vote per decision and person; a new vote replaces it.
//   - Others can mark a reason "convincing" (once per person, never their own). An option's score is its votes plus the
//     convincing marks on its reasons, so a well-argued case counts more than a bare majority.
//   - Anyone may propose another rendering ("other"); it becomes an option others can vote for.
//   - Three reports hide a reason until the owner looks at it (admin token).
//   - After SCHLUSS the round is closed: reading still works, writing does not.
// "Person" = a random id the browser keeps in localStorage. There is no login, so this can be gamed; the owner
// checks the result before adopting it. Stored: the id, the option, the reason text and the time. No IP address is
// stored; a keyed hash of it lives at most one hour, only for the rate limit.
//
// Environment (Vercel project idealismedition):
//   KV_REST_API_URL / KV_REST_API_TOKEN   Upstash Redis (Vercel Marketplace) – or UPSTASH_REDIS_REST_URL / _TOKEN
//   GLOSSAR_ADMIN                         token for hiding/unhiding reasons
//   GLOSSAR_SALZ                          secret for the rate-limit hash (falls back to GLOSSAR_ADMIN)
// Without the Redis variables the function keeps everything in memory (local tests only; lost on restart).
const crypto = require('crypto');
const FRAGEN = require('../assets/glossar/abstimmung.json');

const SCHLUSS = FRAGEN.schluss;            // ISO date-time; after it the round is read-only
const MIN_GRUND = 20, MAX_GRUND = 1500, MAX_VORSCHLAG = 80;
const MELDUNGEN_BIS_VERBORGEN = 3;
const SCHREIBEN_JE_STUNDE = 120;
const HERKUNFT = ['https://www.idealismedition.com', 'https://idealismedition.com'];
const ENTSCHEIDUNGEN = new Map(FRAGEN.entscheidungen.map(e => [e.id, e]));

// ---------- storage: Upstash REST, or memory ----------
const URL_ = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const speicher = globalThis.__glossarSpeicher || (globalThis.__glossarSpeicher = new Map());

async function redis(befehle) {   // befehle: [[cmd, ...args], ...] → results in order
  if (URL_ && TOKEN) {
    const r = await fetch(URL_ + '/pipeline', {
      method: 'POST', headers: { Authorization: 'Bearer ' + TOKEN, 'Content-Type': 'application/json' },
      body: JSON.stringify(befehle)
    });
    if (!r.ok) throw new Error('redis ' + r.status);
    return (await r.json()).map(x => { if (x.error) throw new Error(x.error); return x.result; });
  }
  // memory only for local tests; on Vercel without a database the consultation is simply not open
  if (process.env.VERCEL_ENV) throw Object.assign(new Error('kein Speicher'), { keinSpeicher: true });
  return befehle.map(([cmd, k, ...a]) => speicherBefehl(cmd.toUpperCase(), k, a));
}
function speicherBefehl(cmd, k, a) {   // the handful of commands used below
  const h = () => { if (!speicher.has(k)) speicher.set(k, new Map()); return speicher.get(k); };
  const s = () => { if (!speicher.has(k)) speicher.set(k, new Set()); return speicher.get(k); };
  switch (cmd) {
    case 'HGET': return speicher.has(k) ? (speicher.get(k).get(a[0]) ?? null) : null;
    case 'HSET': { const m = h(); for (let i = 0; i < a.length; i += 2) m.set(a[i], String(a[i + 1])); return 1; }
    case 'HDEL': { const m = h(); let n = 0; for (const f of a) n += m.delete(f) ? 1 : 0; return n; }
    case 'HGETALL': { const m = speicher.get(k); return m ? [...m].flat() : []; }
    case 'HINCRBY': { const m = h(); const v = Number(m.get(a[0]) || 0) + Number(a[1]); m.set(a[0], String(v)); return v; }
    case 'SADD': { const m = s(); const neu = !m.has(a[0]); m.add(a[0]); return neu ? 1 : 0; }
    case 'SREM': { const m = s(); return m.delete(a[0]) ? 1 : 0; }
    case 'SMEMBERS': return speicher.has(k) ? [...speicher.get(k)] : [];
    case 'SISMEMBER': return speicher.has(k) && speicher.get(k).has(a[0]) ? 1 : 0;
    case 'DEL': return speicher.delete(k) ? 1 : 0;
    case 'GET': { const v = speicher.get(k); return v && v.bis > Date.now() ? v.wert : null; }
    case 'SET': { const ex = a.indexOf('EX'); speicher.set(k, { wert: a[0], bis: Date.now() + (ex >= 0 ? Number(a[ex + 1]) * 1000 : 1e12) }); return 'OK'; }
    case 'INCR': { const v = Number(speicher.get(k) || 0) + 1; speicher.set(k, v); return v; }
    case 'EXPIRE': return 1;
    default: throw new Error('unsupported ' + cmd);
  }
}
const paare = arr => { const o = {}; for (let i = 0; i < (arr || []).length; i += 2) o[arr[i]] = arr[i + 1]; return o; };
const json = (s, f) => { try { return JSON.parse(s); } catch (e) { return f; } };

// keys
const K = {
  person: p => 'g:p:' + p,         // hash decision → 'option|reason'      (one vote per decision and person)
  aktiv: 'g:aktiv',                // set of decisions with any vote (reads fetch only these)
  zahlen: d => 'g:vc:' + d,        // hash option key → number of votes
  gruende: d => 'g:r:' + d,        // hash reason id → {o, t, p, z}
  eigene: d => 'g:o:' + d,         // hash option key → {en, p, z}        (proposed renderings)
  marken: 'g:mc',                  // hash reason id → convincing marks
  markiert: r => 'g:m:' + r,       // set of persons who marked reason r
  gemeldet: r => 'g:rep:' + r,     // set of persons who reported reason r
  verborgen: 'g:hidden',           // hash reason id → 'gemeldet' | 'admin'
  frei: 'g:ok',                    // hash reason id → 1 (admin cleared; reports no longer hide it)
  takt: h => 'g:rl:' + h
};

// ---------- reading ----------
// The public state is cached in one key for STAND_SEKUNDEN, so a page view costs two commands, not hundreds.
const STAND_SEKUNDEN = 15;
async function stand() {
  const [zwischen] = await redis([['GET', 'g:stand']]);
  if (zwischen) return json(zwischen, {});
  const frisch = await standBerechnen();
  await redis([['SET', 'g:stand', JSON.stringify(frisch), 'EX', STAND_SEKUNDEN]]);
  return frisch;
}
async function standBerechnen() {
  const [aktiv] = await redis([['SMEMBERS', K.aktiv]]);
  const ids = (aktiv || []).filter(d => ENTSCHEIDUNGEN.has(d));
  const befehle = [['HGETALL', K.marken], ['HGETALL', K.verborgen]];
  for (const d of ids) befehle.push(['HGETALL', K.zahlen(d)], ['HGETALL', K.gruende(d)], ['HGETALL', K.eigene(d)]);
  // decisions without votes are simply absent; the page treats them as empty
  const r = await redis(befehle);
  const marken = paare(r[0]), verborgen = paare(r[1]);
  const aus = {};
  ids.forEach((d, i) => {
    const zahlen = paare(r[2 + i * 3]), gruende = paare(r[3 + i * 3]), eigene = paare(r[4 + i * 3]);
    const liste = Object.entries(gruende).map(([id, s]) => {
      const g = json(s, {});
      return { id, o: g.o, t: g.t, z: g.z, m: Number(marken[id] || 0) };
    }).filter(g => !verborgen[g.id]);
    const optionen = {};
    for (const [o, n] of Object.entries(zahlen)) optionen[o] = { stimmen: Number(n), marken: 0 };
    for (const g of liste) (optionen[g.o] = optionen[g.o] || { stimmen: 0, marken: 0 }).marken += g.m;
    aus[d] = {
      optionen,
      eigene: Object.fromEntries(Object.entries(eigene).map(([k, s]) => [k, { en: json(s, {}).en }])),
      gruende: liste.sort((a, b) => b.m - a.m || a.z - b.z)
    };
  });
  return aus;
}

async function meins(person) {   // this person's votes, so the page can show them
  return paare((await redis([['HGETALL', K.person(person)]]))[0]);
}

// ---------- writing ----------
function kurz(s, n) { return String(s == null ? '' : s).replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, '').trim().slice(0, n); }
function gueltigePerson(p) { return typeof p === 'string' && /^[a-f0-9-]{20,40}$/.test(p); }

async function abstimmen(d, person) {
  const e = ENTSCHEIDUNGEN.get(d.entscheidung);
  if (!e) return [400, { ok: false, grund: 'entscheidung' }];
  const grund = kurz(d.grund, MAX_GRUND);
  if (grund.length < MIN_GRUND) return [400, { ok: false, grund: 'grund' }];
  let option = String(d.option || '');
  const vorschlag = kurz(d.vorschlag, MAX_VORSCHLAG);
  const jetzt = Date.now();
  if (option === 'andere') {
    if (vorschlag.length < 2) return [400, { ok: false, grund: 'vorschlag' }];
    // the same wording proposed twice becomes one option
    const vorhanden = paare((await redis([['HGETALL', K.eigene(e.id)]]))[0]);
    const gleich = Object.entries(vorhanden).find(([, s]) => (json(s, {}).en || '').toLowerCase() === vorschlag.toLowerCase());
    option = gleich ? gleich[0] : 'x' + crypto.randomBytes(4).toString('hex');
    if (!gleich) await redis([['HSET', K.eigene(e.id), option, JSON.stringify({ en: vorschlag, p: person, z: jetzt })]]);
  } else if (!e.optionen.some(o => o.key === option)) {
    const eigene = paare((await redis([['HGETALL', K.eigene(e.id)]]))[0]);
    if (!eigene[option]) return [400, { ok: false, grund: 'option' }];
  }
  const alt = (await redis([['HGET', K.person(person), e.id]]))[0];
  const befehle = [];
  if (alt) {   // replace the previous vote and its reason; marks on it are lost if the option changes
    const [altOption, altGrund] = alt.split('|');
    befehle.push(['HINCRBY', K.zahlen(e.id), altOption, -1], ['HDEL', K.gruende(e.id), altGrund]);
    if (altOption !== option) befehle.push(['HDEL', K.marken, altGrund], ['DEL', K.markiert(altGrund)]);
  }
  const rid = alt && alt.split('|')[0] === option ? alt.split('|')[1] : 'r' + crypto.randomBytes(6).toString('hex');
  befehle.push(['HINCRBY', K.zahlen(e.id), option, 1],
    ['HSET', K.gruende(e.id), rid, JSON.stringify({ o: option, t: grund, p: person, z: jetzt })],
    ['HSET', K.person(person), e.id, option + '|' + rid], ['SADD', K.aktiv, e.id]);
  befehle.push(['DEL', 'g:stand']);
  await redis(befehle);
  return [200, { ok: true, option, grund: rid }];
}

async function markieren(d, person, art) {   // art: 'marke' (convincing) or 'meldung' (report)
  const e = ENTSCHEIDUNGEN.get(d.entscheidung);
  const rid = String(d.grundId || '');
  if (!e || !/^r[a-f0-9]{12}$/.test(rid)) return [400, { ok: false }];
  const g = json((await redis([['HGET', K.gruende(e.id), rid]]))[0], null);
  if (!g) return [404, { ok: false }];
  if (g.p === person) return [400, { ok: false, grund: 'eigen' }];
  if (art === 'marke') {
    const zurueck = d.zurueck === true;
    const [n] = await redis([[zurueck ? 'SREM' : 'SADD', K.markiert(rid), person]]);
    if (n) await redis([['HINCRBY', K.marken, rid, zurueck ? -1 : 1], ['DEL', 'g:stand']]);
    return [200, { ok: true }];
  }
  const [neu] = await redis([['SADD', K.gemeldet(rid), person]]);
  if (neu) {
    const [frei] = await redis([['HGET', K.frei, rid]]);
    const meldungen = paare((await redis([['HGETALL', 'g:repn']]))[0]);
    const n = Number(meldungen[rid] || 0) + 1;
    const befehle = [['HSET', 'g:repn', rid, n]];
    if (!frei && n >= MELDUNGEN_BIS_VERBORGEN) befehle.push(['HSET', K.verborgen, rid, 'gemeldet'], ['DEL', 'g:stand']);
    await redis(befehle);
  }
  return [200, { ok: true }];
}

async function verwalten(d) {   // owner: hide, unhide (and clear for good), list hidden
  if (!process.env.GLOSSAR_ADMIN || d.admin !== process.env.GLOSSAR_ADMIN) return [403, { ok: false }];
  const rid = String(d.grundId || '');
  if (d.tat === 'verbergen') await redis([['HSET', K.verborgen, rid, 'admin'], ['DEL', 'g:stand']]);
  else if (d.tat === 'zeigen') await redis([['HDEL', K.verborgen, rid], ['HSET', K.frei, rid, 1], ['DEL', 'g:stand']]);
  else if (d.tat === 'verborgene') {
    const verborgen = paare((await redis([['HGETALL', K.verborgen]]))[0]);
    const aus = [];
    for (const e of ENTSCHEIDUNGEN.values()) {
      const gruende = paare((await redis([['HGETALL', K.gruende(e.id)]]))[0]);
      for (const [id, s] of Object.entries(gruende)) if (verborgen[id]) aus.push({ entscheidung: e.id, id, warum: verborgen[id], ...json(s, {}) });
    }
    return [200, { ok: true, verborgen: aus }];
  } else return [400, { ok: false }];
  return [200, { ok: true }];
}

async function zuViel(req) {
  const ip = String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '').split(',')[0].trim();
  const salz = process.env.GLOSSAR_SALZ || process.env.GLOSSAR_ADMIN || 'lokal';
  const stunde = Math.floor(Date.now() / 3600000);
  const h = crypto.createHmac('sha256', salz).update(ip + '|' + stunde).digest('hex').slice(0, 24);
  const [n] = await redis([['INCR', K.takt(h)], ['EXPIRE', K.takt(h), 3700]]);
  return n > SCHREIBEN_JE_STUNDE;
}

// ---------- handler ----------
module.exports = async (req, res) => {
  const herkunft = req.headers.origin || '';
  if (HERKUNFT.includes(herkunft) || /^http:\/\/(127\.0\.0\.1|localhost):\d+$/.test(herkunft)) {
    res.setHeader('Access-Control-Allow-Origin', herkunft);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();
  const offen = Date.now() < Date.parse(SCHLUSS);
  try {
    if (req.method === 'GET') {
      const person = String((req.query && req.query.person) || '');
      if (gueltigePerson(person)) {   // personal view: never cached
        res.setHeader('Cache-Control', 'no-store');
        return res.status(200).json({ ok: true, offen, schluss: SCHLUSS, stand: await stand(), meins: await meins(person) });
      }
      res.setHeader('Cache-Control', 's-maxage=20, stale-while-revalidate=120');
      return res.status(200).json({ ok: true, offen, schluss: SCHLUSS, stand: await stand() });
    }
    if (req.method !== 'POST') return res.status(405).json({ ok: false });
    res.setHeader('Cache-Control', 'no-store');
    let d = req.body;
    if (typeof d === 'string') d = json(d, null);
    if (!d || typeof d !== 'object') return res.status(400).json({ ok: false });
    if (d.tat === 'verbergen' || d.tat === 'zeigen' || d.tat === 'verborgene') {
      const [s, b] = await verwalten(d); return res.status(s).json(b);
    }
    if (!offen) return res.status(403).json({ ok: false, grund: 'geschlossen' });
    if (d.webseite) return res.status(200).json({ ok: true });            // trap field for programs
    if (!gueltigePerson(d.person)) return res.status(400).json({ ok: false, grund: 'person' });
    if (await zuViel(req)) return res.status(429).json({ ok: false, grund: 'zu-viel' });
    let s, b;
    if (d.tat === 'stimme') [s, b] = await abstimmen(d, d.person);
    else if (d.tat === 'marke') [s, b] = await markieren(d, d.person, 'marke');
    else if (d.tat === 'meldung') [s, b] = await markieren(d, d.person, 'meldung');
    else [s, b] = [400, { ok: false }];
    return res.status(s).json(b);
  } catch (e) {
    if (e && e.keinSpeicher) return res.status(503).json({ ok: false, grund: 'nicht-offen' });
    console.error('glossar', e && e.message);
    return res.status(500).json({ ok: false, grund: 'speicher' });
  }
};
