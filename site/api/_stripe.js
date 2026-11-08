// Gemeinsames für die Stripe-Dienste der Mitgliedschaft (api/mitglied-*.js). Ohne npm-Paket: die Stripe-API
// spricht Formulardaten, das reicht für die drei Aufrufe.
// Umgebung (Vercel-Projekt idealismedition): STRIPE_SECRET_KEY (sk_…), STRIPE_PUBLISHABLE_KEY (pk_…)
const STUFEN = {
  reader:  { name: 'Reader',  betrag: 199 },
  fellow:  { name: 'Fellow',  betrag: 399 },
  scholar: { name: 'Scholar', betrag: 599 },
};
async function stripe(pfad, { methode = 'GET', felder = null } = {}) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) { const e = new Error('nicht eingerichtet'); e.status = 503; throw e; }
  const r = await fetch('https://api.stripe.com/v1/' + pfad, {
    method: methode,
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/x-www-form-urlencoded', 'Stripe-Version': '2024-06-20' },
    body: felder ? new URLSearchParams(felder).toString() : undefined,
  });
  const j = await r.json();
  if (!r.ok) { const e = new Error((j.error && j.error.message) || 'stripe ' + r.status); e.status = 502; throw e; }
  return j;
}
module.exports = { STUFEN, stripe };
