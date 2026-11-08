// Bezahlvorgang für eine der drei Monatsstufen: legt eine Stripe-Checkout-Sitzung an, die eingebettet auf
// der Seite „Unterstützen“ erscheint (ui_mode embedded). Die drei Monatspreise sind feste Preise mit lookup_key
// (_stripe.js legt sie beim ersten Aufruf an). Gefragt wird zusätzlich, freiwillig, der Name für die Friends of the Edition.
const { STUFEN, stripe, preis } = require('./_stripe');

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ ok: false });
  let d = req.body;
  if (typeof d === 'string') { try { d = JSON.parse(d); } catch (e) { d = {}; } }
  const stufe = STUFEN[d && d.stufe] ? d.stufe : null;
  if (!stufe) return res.status(400).json({ ok: false, grund: 'stufe' });
  const en = d.sprache === 'en', s = STUFEN[stufe];
  if (!process.env.STRIPE_PUBLISHABLE_KEY) return res.status(503).json({ ok: false, grund: 'nicht eingerichtet' });
  try {
    const preisId = await preis(stufe);
    const sitzung = await stripe('checkout/sessions', { methode: 'POST', felder: {
      ui_mode: 'embedded',
      mode: 'subscription',
      locale: en ? 'en' : 'de',
      return_url: `https://www.idealismedition.com${en ? '' : '/de'}/support?danke={CHECKOUT_SESSION_ID}`,
      'line_items[0][quantity]': '1',
      'line_items[0][price]': preisId,
      'custom_fields[0][key]': 'friends',
      'custom_fields[0][type]': 'text',
      'custom_fields[0][optional]': 'true',
      'custom_fields[0][text][maximum_length]': '60',
      'custom_fields[0][label][type]': 'custom',
      'custom_fields[0][label][custom]': en ? 'Name for the Friends of the Edition (optional)' : 'Name bei den Friends of the Edition (freiwillig)',
      'subscription_data[metadata][stufe]': stufe,
    } });
    return res.status(200).json({ ok: true, clientSecret: sitzung.client_secret, publishableKey: process.env.STRIPE_PUBLISHABLE_KEY });
  } catch (e) {
    return res.status(e.status || 502).json({ ok: false, grund: e.message });
  }
};
