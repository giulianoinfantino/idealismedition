/* Hinweis auf die Mitgliedschaft (09.11.2026, Wunsch des Nutzers), dieselbe Datei auf allen vier Seiten
   (themefarbe.js lädt sie). Wer zusammengerechnet länger als eine Stunde auf den Seiten gelesen hat,
   sieht oben ein Band: die Ausgaben sind frei, Mitglieder halten sie am Netz. Weggeklickt kommt es nach
   6, dann 12, dann 24 Stunden wieder; wer Mitglied geworden ist (Rückkehr von Stripe auf der Seite
   „Unterstützen“) oder „Ich bin schon Mitglied“ wählt, sieht es nicht mehr. Die Lesezeit zählt nur,
   solange die Seite sichtbar ist. Schlüssel wandern mit den übrigen Einstellungen über die vier
   Domains (themefarbe.js, Parameter e). Nie auf Impressum, Datenschutz und der Seite „Unterstützen“. */
(function () {
  'use strict';
  var ZEIT = 'edition-lesezeit', BIS = 'edition-hinweis-bis', N = 'edition-hinweis-n', MITGLIED = 'edition-mitglied';
  var SCHWELLE = 3600, TAKT = 15, PAUSEN = [6, 12, 24];   // Sekunden, Sekunden, Stunden
  var EN = (document.documentElement.lang || 'de').slice(0, 2) === 'en';
  function lies(k) { try { return localStorage.getItem(k); } catch (_) { return null; } }
  function setze(k, v) { try { localStorage.setItem(k, String(v)); } catch (_) {} }

  if (/\/(impressum|datenschutz|privacy|legal-notice|support)(\.html)?$/.test(location.pathname)) return;
  if (lies(MITGLIED) === 'ja') return;

  // Lesezeit zählen, solange die Seite sichtbar ist
  var sekunden = parseInt(lies(ZEIT) || '0', 10) || 0, offen = 0;
  function sichern() { if (offen) { sekunden += offen; offen = 0; setze(ZEIT, sekunden); } }
  setInterval(function () {
    if (document.visibilityState !== 'visible') return;
    offen += TAKT;
    if (offen >= 60) sichern();
    if (sekunden + offen >= SCHWELLE) zeigen();
  }, TAKT * 1000);
  document.addEventListener('visibilitychange', sichern);
  window.addEventListener('pagehide', sichern);

  var T = EN ? {
    kopf: 'You have been reading here for more than an hour.',
    text: 'The editions of Fichte, Schelling and Hegel are free and will stay free. Members keep them online and pay for the next volumes: from €6 a quarter, cancel any time, with your name among the Friends of the Edition if you wish.',
    kurz: 'The editions are free; members keep them online, from €6 a quarter.',
    los: 'Become a member', spaeter: 'Later', bin: 'I am already a member',
    ziel: 'https://www.idealismedition.com/support'
  } : {
    kopf: 'Sie lesen hier seit mehr als einer Stunde.',
    text: 'Die Ausgaben von Fichte, Schelling und Hegel sind frei und bleiben es. Wer Mitglied wird, hält sie am Netz und bezahlt die nächsten Bände: ab 6 € im Quartal, jederzeit kündbar, mit Namen unter den Friends of the Edition, wenn Sie mögen.',
    kurz: 'Die Ausgaben sind frei; Mitglieder halten sie am Netz, ab 6 € im Quartal.',
    los: 'Mitglied werden', spaeter: 'Später', bin: 'Ich bin schon Mitglied',
    ziel: 'https://www.idealismedition.com/de/support'
  };

  var band = null;
  function hoehe() {
    if (!band) return;
    document.documentElement.style.setProperty('--banner-h', band.offsetHeight + 'px');
  }
  function weg() {
    if (!band) return;
    band.remove(); band = null;
    document.documentElement.style.setProperty('--banner-h', '0px');
  }
  function zeigen() {
    if (band || document.querySelector('.promo-banner')) return;
    if (lies(MITGLIED) === 'ja') return;
    var bis = parseInt(lies(BIS) || '0', 10) || 0;
    if (Date.now() < bis) return;
    band = document.createElement('div');
    band.className = 'promo-banner mitglied-hinweis';
    band.setAttribute('role', 'note');
    var p = document.createElement('p');
    var b = document.createElement('strong'); b.textContent = T.kopf + ' ';
    var lang = document.createElement('span'); lang.className = 'mh-lang'; lang.textContent = T.text + ' ';
    var kurz = document.createElement('span'); kurz.className = 'mh-kurz'; kurz.textContent = T.kurz + ' ';
    p.appendChild(b); p.appendChild(lang); p.appendChild(kurz);
    var a = document.createElement('a'); a.href = T.ziel; a.textContent = T.los + ' →'; a.className = 'mh-los';
    p.appendChild(a);
    var bin = document.createElement('button'); bin.type = 'button'; bin.className = 'mh-bin'; bin.textContent = T.bin;
    bin.addEventListener('click', function () { setze(MITGLIED, 'ja'); weg(); });
    p.appendChild(bin);
    var zu = document.createElement('button'); zu.type = 'button'; zu.className = 'promo-banner-close';
    zu.setAttribute('aria-label', T.spaeter); zu.title = T.spaeter; zu.textContent = '×';
    zu.addEventListener('click', function () {
      var n = (parseInt(lies(N) || '0', 10) || 0) + 1;
      setze(N, n);
      setze(BIS, Date.now() + PAUSEN[Math.min(n, PAUSEN.length) - 1] * 3600 * 1000);
      weg();
    });
    band.appendChild(p); band.appendChild(zu);
    document.body.insertBefore(band, document.body.firstChild);
    hoehe();
    window.addEventListener('resize', hoehe);
  }
  if (sekunden >= SCHWELLE) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', zeigen); else zeigen();
  }
})();
