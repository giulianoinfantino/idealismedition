/* Rückmeldung (seit 08.11.2026), dieselbe Datei auf allen vier Seiten: ein Link „Rückmeldung“ im Fuß und
   „Fehler melden“ im Zitierfenster des Lesers (lesepult.js ruft Rueckmeldung.oeffnen). Gesendet wird an
   https://www.idealismedition.com/api/rueckmeldung, dort wird daraus ein Issue in einem privaten Repository.
   Geladen von themefarbe.js, das jede Seite schon einbindet; zweisprachig nach <html lang>. */
(function () {
  'use strict';
  if (window.Rueckmeldung) return;
  var EN = document.documentElement.lang === 'en';
  var ZIEL = 'https://www.idealismedition.com/api/rueckmeldung';
  var T = EN ? {
    link: 'Feedback', titel: 'Feedback', titelStelle: 'Report an error at this passage',
    stelle: 'Passage', text: 'Your message', textPh: 'What is wrong, or what should we know?',
    email: 'Email (optional, only if you want a reply)', senden: 'Send', abbrechen: 'Cancel', schliessen: 'Close',
    danke: 'Thank you. Your feedback has arrived.', fehler: 'Sending did not work. Please try again later.',
    leer: 'Please write a few words.', hinweis: 'We store only what you write here and the page you sent it from. ',
    datenschutz: 'Privacy', laeuft: 'Sending …'
  } : {
    link: 'Rückmeldung', titel: 'Rückmeldung', titelStelle: 'Fehler an dieser Stelle melden',
    stelle: 'Stelle', text: 'Ihre Nachricht', textPh: 'Was ist falsch, oder was sollten wir wissen?',
    email: 'E-Mail (freiwillig, nur für eine Antwort)', senden: 'Senden', abbrechen: 'Abbrechen', schliessen: 'Schließen',
    danke: 'Danke. Ihre Rückmeldung ist angekommen.', fehler: 'Das Senden hat nicht geklappt. Bitte später noch einmal.',
    leer: 'Bitte schreiben Sie ein paar Worte.', hinweis: 'Gespeichert wird nur, was Sie hier schreiben, und die Seite, von der es kommt. ',
    datenschutz: 'Datenschutz', laeuft: 'Wird gesendet …'
  };
  function ausgabe() {
    var m = (document.querySelector('.site-title-hegel') || {}).textContent || '';
    m = m.trim().toLowerCase();
    return m === 'hegel' || m === 'fichte' || m === 'schelling' ? m : 'portal';
  }
  var datenschutz = (EN ? '' : '/de') + '/privacy';

  var css = document.createElement('style');
  css.textContent = [
    '.rm-dialog{margin:auto;width:min(30rem,calc(100vw - 2rem));padding:1.3rem 1.4rem 1.1rem;border:1px solid var(--rule);border-radius:3px;',
    'background:var(--bg-paper);color:var(--text-body);box-shadow:0 12px 40px var(--shadow-med);font-family:var(--font-body)}',
    '.rm-dialog::backdrop{background:rgba(0,0,0,.35)}',
    '.rm-dialog h2{font-family:var(--font-display);font-weight:400;font-size:1.35rem;color:var(--text-ink);margin:0 0 .8rem}',
    '.rm-stelle{font-size:.86rem;color:var(--text-muted);margin:0 0 .9rem}.rm-stelle b{font-weight:400;color:var(--text-ink)}',
    '.rm-dialog label{display:block;font-size:.82rem;color:var(--text-muted);margin:.7rem 0 .3rem}',
    '.rm-dialog textarea,.rm-dialog input[type=email]{width:100%;box-sizing:border-box;font:inherit;font-size:.95rem;color:var(--text-ink);',
    'background:var(--bg-page);border:1px solid var(--rule);border-radius:2px;padding:.5rem .6rem}',
    '.rm-dialog textarea{min-height:7.5rem;resize:vertical}',
    '.rm-dialog textarea:focus,.rm-dialog input:focus{outline:none;border-color:var(--accent-gold)}',
    '.rm-falle{position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden}',
    '.rm-hinweis{font-size:.76rem;color:var(--text-muted);margin:.8rem 0 0}.rm-hinweis a{color:var(--text-muted);text-decoration:underline}',
    '.rm-knoepfe{display:flex;justify-content:flex-end;gap:.6rem;margin-top:1rem}',
    '.rm-knoepfe button{font:inherit;font-size:.86rem;padding:.45rem 1rem;border:1px solid var(--rule);border-radius:2px;background:none;color:var(--text-body);cursor:pointer}',
    '.rm-knoepfe button[type=submit]{border-color:var(--accent-gold);color:var(--text-ink)}',
    '.rm-knoepfe button:disabled{opacity:.5;cursor:default}',
    '.rm-meldung{font-size:.88rem;margin:.8rem 0 0;color:var(--text-ink)}'
  ].join('');
  document.head.appendChild(css);

  var dlg = null, offenSeit = 0;
  function baue() {
    dlg = document.createElement('dialog');
    dlg.className = 'rm-dialog';
    dlg.innerHTML = '<form method="dialog" novalidate>' +
      '<h2></h2><p class="rm-stelle" hidden></p>' +
      '<label for="rm-text"></label><textarea id="rm-text" maxlength="5000" required></textarea>' +
      '<label for="rm-email"></label><input type="email" id="rm-email" maxlength="200" autocomplete="email">' +
      '<div class="rm-falle" aria-hidden="true"><input type="text" name="webseite" tabindex="-1" autocomplete="off"></div>' +
      '<p class="rm-meldung" role="status" hidden></p>' +
      '<div class="rm-knoepfe"><button type="button" class="rm-abbrechen"></button><button type="submit"></button></div>' +
      '<p class="rm-hinweis"></p></form>';
    dlg.querySelector('label[for=rm-text]').textContent = T.text;
    dlg.querySelector('#rm-text').placeholder = T.textPh;
    dlg.querySelector('label[for=rm-email]').textContent = T.email;
    dlg.querySelector('.rm-abbrechen').textContent = T.abbrechen;
    dlg.querySelector('button[type=submit]').textContent = T.senden;
    var h = dlg.querySelector('.rm-hinweis');
    h.appendChild(document.createTextNode(T.hinweis));
    var a = document.createElement('a'); a.href = datenschutz; a.textContent = T.datenschutz; h.appendChild(a);
    dlg.querySelector('.rm-abbrechen').addEventListener('click', function () { dlg.close(); });
    dlg.querySelector('form').addEventListener('submit', senden);
    document.body.appendChild(dlg);
  }
  var daten = {};
  function oeffnen(d) {
    if (!dlg) baue();
    daten = d || {};
    var st = daten.art === 'stelle';
    dlg.querySelector('h2').textContent = st ? T.titelStelle : T.titel;
    var p = dlg.querySelector('.rm-stelle');
    p.hidden = !(st && daten.zitat);
    p.textContent = '';
    if (st && daten.zitat) { p.appendChild(document.createTextNode(T.stelle + ': ')); var b = document.createElement('b'); b.textContent = daten.zitat; p.appendChild(b); }
    var m = dlg.querySelector('.rm-meldung'); m.hidden = true;
    var knopf = dlg.querySelector('button[type=submit]'); knopf.disabled = false; knopf.textContent = T.senden; knopf.hidden = false;
    dlg.querySelector('.rm-abbrechen').textContent = T.abbrechen;
    dlg.querySelector('#rm-text').value = '';
    offenSeit = Date.now();
    if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', '');
    dlg.querySelector('#rm-text').focus();
  }
  function senden(e) {
    e.preventDefault();
    var text = dlg.querySelector('#rm-text').value.trim(), m = dlg.querySelector('.rm-meldung');
    var knopf = dlg.querySelector('button[type=submit]');
    if (text.length < 3) { m.textContent = T.leer; m.hidden = false; return; }
    knopf.disabled = true; knopf.textContent = T.laeuft;
    fetch(ZIEL, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        art: daten.art === 'stelle' ? 'stelle' : 'allgemein', ausgabe: ausgabe(), zitat: daten.zitat || '',
        link: daten.link || '', seite: location.href, sprache: EN ? 'en' : 'de', text: text,
        email: dlg.querySelector('#rm-email').value.trim(), webseite: dlg.querySelector('[name=webseite]').value,
        dauer: Date.now() - offenSeit
      })
    }).then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return r.ok && j.ok; }); })
      .catch(function () { return false; })
      .then(function (ok) {
        m.textContent = ok ? T.danke : T.fehler; m.hidden = false;
        if (ok) { knopf.hidden = true; dlg.querySelector('.rm-abbrechen').textContent = T.schliessen; dlg.querySelector('#rm-text').value = ''; }
        else { knopf.disabled = false; knopf.textContent = T.senden; }
      });
  }

  // Link im Fuß aller Seiten
  function fussLink() {
    document.querySelectorAll('.site-footer nav, .p-fuss nav').forEach(function (nav) {
      if (nav.querySelector('.rm-link')) return;
      var a = document.createElement('a');
      a.href = '#rueckmeldung'; a.className = 'rm-link'; a.textContent = T.link;
      a.addEventListener('click', function (e) { e.preventDefault(); oeffnen({ art: 'allgemein' }); });
      nav.appendChild(a);
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fussLink); else fussLink();
  if (location.hash === '#rueckmeldung') setTimeout(function () { oeffnen({ art: 'allgemein' }); }, 300);

  window.Rueckmeldung = { oeffnen: oeffnen };
})();
