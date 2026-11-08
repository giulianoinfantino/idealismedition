// Mitglieder für die Seite „Unterstützen“: Zahl der laufenden Abos und die Namen, die Mitglieder freiwillig für die
// Friends of the Edition angegeben haben. Gezählt wird bei Stripe selbst (aktive Abos), es wird nichts gespeichert.
const { stripe } = require('./_stripe');

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=86400');
  try {
    let nach = null, zahl = 0; const namen = new Set();
    for (let seite = 0; seite < 20; seite++) {
      const l = await stripe('subscriptions?status=active&limit=100' + (nach ? '&starting_after=' + nach : ''));
      for (const a of l.data) {
        zahl++;
        const n = a.metadata && a.metadata.friends;
        if (n) namen.add(n);
      }
      if (!l.has_more || !l.data.length) break;
      nach = l.data[l.data.length - 1].id;
    }
    return res.status(200).json({ ok: true, zahl, namen: [...namen].sort((a, b) => a.localeCompare(b, 'de')) });
  } catch (e) {
    return res.status(200).json({ ok: false });
  }
};
