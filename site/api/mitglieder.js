// Mitglieder für die Seite „Unterstützen“: Zahl der laufenden Abos und die Namen, die Mitglieder freiwillig für die
// Friends of the Edition angegeben haben. Gezählt wird bei Stripe selbst (aktive Abos), es wird nichts gespeichert.
// Den Namen schreibt sonst mitglied-danke.js an das Abo, wenn der Leser nach dem Bezahlen zurückkehrt. Schließt jemand
// das Fenster vorher, holt diese Funktion ihn nach: für Abos ohne Vermerk „friends_geprueft“ liest sie die Checkout-
// Sitzung und trägt Namen und Vermerk ein (höchstens zehn je Aufruf; die Antwort ist eine halbe Stunde zwischengespeichert).
const { stripe, friendsName } = require('./_stripe');

async function nachtragen(abo) {
  const l = await stripe('checkout/sessions?limit=1&subscription=' + abo.id);
  const name = friendsName(l.data && l.data[0]);
  await stripe('subscriptions/' + abo.id, { methode: 'POST',
    felder: Object.assign({ 'metadata[friends_geprueft]': '1' }, name ? { 'metadata[friends]': name } : {}) });
  return name;
}

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=86400');
  try {
    let nach = null, zahl = 0, nachgetragen = 0; const namen = new Set();
    for (let seite = 0; seite < 20; seite++) {
      const l = await stripe('subscriptions?status=active&limit=100' + (nach ? '&starting_after=' + nach : ''));
      for (const a of l.data) {
        zahl++;
        const m = a.metadata || {};
        let n = m.friends;
        if (!n && !m.friends_geprueft && nachgetragen < 10) {
          nachgetragen++;
          try { n = await nachtragen(a); } catch (e) { /* beim nächsten Aufruf wieder */ }
        }
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
