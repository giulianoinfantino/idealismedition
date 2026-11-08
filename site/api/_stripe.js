// Gemeinsames für die Stripe-Dienste der Mitgliedschaft (api/mitglied-*.js). Ohne npm-Paket: die Stripe-API
// spricht Formulardaten, das reicht für die drei Aufrufe.
// Umgebung (Vercel-Projekt idealismedition): STRIPE_SECRET_KEY (sk_…), STRIPE_PUBLISHABLE_KEY (pk_…)
const STUFEN = {
  reader:  { name: 'Reader',  betrag: 199, schluessel: 'idealismus_reader_monat' },
  fellow:  { name: 'Fellow',  betrag: 399, schluessel: 'idealismus_fellow_monat' },
  scholar: { name: 'Scholar', betrag: 599, schluessel: 'idealismus_scholar_monat' },
};
async function stripe(pfad, { methode = 'GET', felder = null, einmalig = null } = {}) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) { const e = new Error('nicht eingerichtet'); e.status = 503; throw e; }
  const r = await fetch('https://api.stripe.com/v1/' + pfad, {
    method: methode,
    headers: Object.assign({ Authorization: `Bearer ${key}`, 'Content-Type': 'application/x-www-form-urlencoded', 'Stripe-Version': '2025-09-30.clover' },
                           einmalig ? { 'Idempotency-Key': einmalig } : {}),
    body: felder ? new URLSearchParams(felder).toString() : undefined,
  });
  const j = await r.json();
  if (!r.ok) { const e = new Error((j.error && j.error.message) || 'stripe ' + r.status); e.status = 502; throw e; }
  return j;
}
// Der Monatspreis einer Stufe, über seinen lookup_key gefunden. Fehlt er (erster Aufruf, oder ein neues Konto),
// legt die Funktion Produkt und Preis einmal an; der Idempotenzschlüssel verhindert Doppel bei gleichzeitigen Aufrufen.
// So muss im Stripe-Dashboard nichts vorbereitet werden, und es entsteht nicht je Bezahlvorgang ein neues Produkt.
// Steuercode für Stripe Tax: „General – Electronically Supplied Services“. Ohne ihn lehnt ein Konto mit
// eingeschaltetem Stripe Tax die Sitzung ab („the product tax code is missing“).
const STEUERCODE = 'txcd_10000000';
const GEMERKT = {};   // Preis-IDs je Stufe, solange die Funktion warm bleibt (spart eine Abfrage je Bezahlvorgang)
async function preis(stufe) {
  if (GEMERKT[stufe]) return GEMERKT[stufe];
  GEMERKT[stufe] = await preisSuchen(stufe);
  return GEMERKT[stufe];
}
async function preisSuchen(stufe) {
  const s = STUFEN[stufe];
  const l = await stripe('prices?active=true&lookup_keys[]=' + encodeURIComponent(s.schluessel));
  if (l.data && l.data.length) return l.data[0].id;
  const produkt = await stripe('products', { methode: 'POST', einmalig: 'produkt-' + s.schluessel, felder: {
    name: `${s.name} · Edition Deutscher Idealismus`,
    description: 'Mitgliedschaft: freiwillige Unterstützung der digitalen Ausgaben von Fichte, Schelling und Hegel',
    tax_code: STEUERCODE,
  } });
  const p = await stripe('prices', { methode: 'POST', einmalig: 'preis-' + s.schluessel, felder: {
    product: produkt.id, currency: 'eur', unit_amount: String(s.betrag), 'recurring[interval]': 'month',
    lookup_key: s.schluessel, nickname: s.name,
  } });
  return p.id;
}
// Der freiwillige Name aus dem Bezahlvorgang eines Abos (Zusatzfeld „friends“ der Checkout-Sitzung)
function friendsName(sitzung) {
  const f = ((sitzung && sitzung.custom_fields) || []).find(x => x.key === 'friends');
  return f && f.text && f.text.value ? String(f.text.value).trim().slice(0, 60) : '';
}
module.exports = { STUFEN, stripe, preis, friendsName };
