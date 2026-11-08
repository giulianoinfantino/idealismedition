// Nach dem Bezahlen kehrt Stripe mit ?danke=<Sitzung> auf „Unterstützen“ zurück. Hier wird die Sitzung geprüft und
// der freiwillig angegebene Name an das Abo geschrieben (metadata.friends), damit er in der Liste erscheint.
const { stripe, friendsName } = require('./_stripe');

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  const id = String((req.query && req.query.sitzung) || '');
  if (!/^cs_(test|live)_[A-Za-z0-9]+$/.test(id)) return res.status(400).json({ ok: false });
  try {
    const s = await stripe('checkout/sessions/' + id);
    if (s.status !== 'complete') return res.status(200).json({ ok: false, status: s.status });
    const name = friendsName(s);
    if (s.subscription) await stripe('subscriptions/' + s.subscription, { methode: 'POST',
      felder: Object.assign({ 'metadata[friends_geprueft]': '1' }, name ? { 'metadata[friends]': name } : {}) });
    return res.status(200).json({ ok: true, name: !!name });
  } catch (e) {
    return res.status(e.status || 502).json({ ok: false });
  }
};
