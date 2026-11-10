/* Translation glossary (/translation), 09.11.2026.
   1. Preview: tap a marked word → its German; tap a sentence → the sentence in German (and back).
   2. Consultation: questions from /assets/glossar/abstimmung.json, votes and reasons from /api/glossar.
      Score of a rendering = votes + "convincing" marks on its reasons (the API enforces the rules). */
(function () {
  'use strict';
  var API = '/api/glossar';
  var GRUPPEN = { shared: 'All three authors', fichte: 'Fichte', schelling: 'Schelling', hegel: 'Hegel', conventions: 'Convention' };
  var MIN_GRUND = 20;

  function lies(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function schreib(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function el(tag, cls, text) { var n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; }
  function zahl(n) { return n == null ? '–' : n.toLocaleString('en-US'); }

  /* ---------- 1. preview ---------- */
  var pop = document.getElementById('gl-pop'), offenerTerm = null;
  function popZu() { if (offenerTerm) offenerTerm.setAttribute('aria-expanded', 'false'); offenerTerm = null; pop.hidden = true; }
  function popAuf(btn) {
    popZu();
    pop.textContent = '';
    pop.appendChild(el('small', null, 'German'));
    pop.appendChild(document.createTextNode(btn.getAttribute('data-de')));
    pop.hidden = false;
    var r = btn.getBoundingClientRect(), w = pop.offsetWidth;
    var x = Math.max(8, Math.min(window.scrollX + r.left + r.width / 2 - w / 2, window.scrollX + document.documentElement.clientWidth - w - 8));
    pop.style.left = x + 'px';
    pop.style.top = (window.scrollY + r.top - pop.offsetHeight - 8) + 'px';
    btn.setAttribute('aria-expanded', 'true');
    offenerTerm = btn;
  }
  function satzUmschalten(s) {
    popZu();
    var de = s.classList.toggle('ist-de');
    s.setAttribute('aria-pressed', de ? 'true' : 'false');
    var en = s.querySelector('.gl-en'), alt = s.querySelector('.gl-de');
    if (de) {
      if (!alt) { alt = el('span', 'gl-de', s.getAttribute('data-de')); alt.lang = 'de'; s.appendChild(alt); }
      en.hidden = true; alt.hidden = false;
    } else { en.hidden = false; if (alt) alt.hidden = true; }
  }
  var probe = document.getElementById('gl-probe');
  if (probe) {
    probe.querySelectorAll('.gl-term').forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
    probe.addEventListener('click', function (e) {
      var t = e.target.closest('.gl-term');
      if (t) { e.stopPropagation(); if (offenerTerm === t) popZu(); else popAuf(t); return; }
      var s = e.target.closest('.gl-satz'); if (s) satzUmschalten(s);
    });
    probe.addEventListener('keydown', function (e) {
      if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('gl-satz')) { e.preventDefault(); satzUmschalten(e.target); }
    });
    document.addEventListener('click', function (e) { if (!e.target.closest('.gl-term')) popZu(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') popZu(); });
    window.addEventListener('resize', popZu);
  }

  /* ---------- 2. consultation ---------- */
  var liste = document.getElementById('gl-liste'), status = document.getElementById('gl-status');
  if (!liste) return;

  // The browser id is created only at the first vote or mark (nothing is stored for mere reading).
  var person = lies('gl-person');
  if (person && !/^[a-f0-9-]{20,40}$/.test(person)) person = null;
  function personHolen() {
    if (!person) {
      person = (window.crypto && crypto.randomUUID) ? crypto.randomUUID()
        : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) { var r = Math.random() * 16 | 0; return (c === 'x' ? r : (r & 3 | 8)).toString(16); });
      schreib('gl-person', person);
    }
    return person;
  }
  function apiAdresse() { return API + (person ? '?person=' + encodeURIComponent(person) : ''); }
  var marken = {}; try { marken = JSON.parse(lies('gl-marken') || '{}') || {}; } catch (e) {}
  var gemeldet = {}; try { gemeldet = JSON.parse(lies('gl-gemeldet') || '{}') || {}; } catch (e) {}

  var fragen = null, stand = {}, meins = {}, offen = true, schluss = null, apiDa = false;
  var gezeigt = {};           // decision id → reasons list expanded
  var geoeffnet = Date.now();
  var filter = { gruppe: 'alle', text: '', ordnung: 'offen' };
  var grenze = 30;          // cards rendered; more on request

  function laden() {
    return Promise.all([
      fetch('/assets/glossar/abstimmung.json').then(function (r) { return r.json(); }),
      fetch(apiAdresse(), { cache: 'no-store' }).then(function (r) { return r.ok ? r.json() : null; }).catch(function () { return null; })
    ]).then(function (a) {
      fragen = a[0];
      var j = a[1];
      apiDa = !!(j && j.ok);
      if (apiDa) { stand = j.stand || {}; meins = j.meins || {}; offen = j.offen; schluss = j.schluss; }
      else { offen = false; schluss = fragen.schluss; }
      schlussText();
      zeichnen();
    }).catch(function () { status.textContent = 'The questions could not be loaded. Please try again later.'; });
  }
  function neuHolen() {
    return fetch(apiAdresse(), { cache: 'no-store' }).then(function (r) { return r.json(); }).then(function (j) {
      if (j && j.ok) { stand = j.stand || {}; meins = j.meins || {}; offen = j.offen; }
      zeichnen();
    }).catch(function () {});
  }
  function schlussText() {
    var s = document.getElementById('gl-schluss'), d = new Date(schluss);
    if (!s || isNaN(d)) return;
    var tag = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Berlin' });
    s.textContent = offen ? 'The round closes on ' + tag + '.' : (apiDa ? 'The round closed on ' + tag + '.' : 'The round closes on ' + tag + '.');
  }

  function punkte(e) {
    var s = stand[e.id] || { optionen: {}, eigene: {}, gruende: [] };
    var alle = e.optionen.map(function (o) { return { key: o.key, en: o.en, hinweis: o.hinweis, eigen: false }; });
    Object.keys(s.eigene || {}).forEach(function (k) {   // a reader's proposal shows while someone votes for it
      if (((s.optionen || {})[k] || {}).stimmen > 0) alle.push({ key: k, en: s.eigene[k].en, hinweis: 'Proposed by a reader', eigen: true });
    });
    alle.forEach(function (o) {
      var p = (s.optionen || {})[o.key] || { stimmen: 0, marken: 0 };
      o.stimmen = p.stimmen; o.marken = p.marken; o.punkte = p.stimmen + p.marken;
    });
    return { optionen: alle, gruende: s.gruende || [] };
  }
  function lebhaft(e) { var p = punkte(e); return p.gruende.length; }
  function stimmenZahl(e) {
    var o = (stand[e.id] || {}).optionen || {}, n = 0;
    for (var k in o) n += o[k].stimmen || 0;
    return n;
  }
  var saat = Math.floor(Math.random() * 1e9);
  try { var s0 = sessionStorage.getItem('gl-saat'); if (s0) saat = +s0; else sessionStorage.setItem('gl-saat', String(saat)); } catch (e) {}
  function mischung(id) {   // stable pseudo-random number per question and visitor
    var h = saat;
    for (var i = 0; i < id.length; i++) h = Math.imul(h ^ id.charCodeAt(i), 2654435761) >>> 0;
    return h;
  }

  function zeichnen() {
    if (!fragen) return;
    var offenerFokus = document.activeElement && document.activeElement.closest('.gl-karte') ? document.activeElement : null;
    if (offenerFokus && (offenerFokus.tagName === 'TEXTAREA' || offenerFokus.type === 'text')) return; // don't wipe what someone is typing
    var es = fragen.entscheidungen.slice();
    if (filter.ordnung === 'offen') {
      // Default: what has had the fewest votes comes first, what you have answered goes last.
      // Ties are shuffled once per visitor, so that not everybody starts with the same questions.
      es.sort(function (a, b) {
        return (meins[a.id] ? 1 : 0) - (meins[b.id] ? 1 : 0) || stimmenZahl(a) - stimmenZahl(b) || mischung(a.id) - mischung(b.id);
      });
    } else if (filter.ordnung === 'lebhaft') es.sort(function (a, b) { return lebhaft(b) - lebhaft(a); });
    liste.textContent = '';
    var abgestimmt = 0;
    var treffer = es.filter(function (e) {
      if (meins[e.id]) abgestimmt++;
      var text = (e.deutsch + ' ' + e.optionen.map(function (o) { return o.en; }).join(' ') + ' ' + e.frage).toLowerCase();
      return (filter.gruppe === 'alle' || e.gruppe === filter.gruppe) && (!filter.text || text.indexOf(filter.text) >= 0);
    });
    treffer.slice(0, grenze).forEach(function (e) { liste.appendChild(karte(e)); });
    if (treffer.length > grenze) {
      var mehr = el('button', 'gl-gruende-schalter gl-mehr', 'Show ' + Math.min(30, treffer.length - grenze) + ' more of ' + (treffer.length - grenze));
      mehr.type = 'button';
      mehr.addEventListener('click', function () { grenze += 30; zeichnen(); });
      liste.appendChild(mehr);
    }
    var n = treffer.length;
    status.textContent = n + ' of ' + es.length + ' questions' + (apiDa ? ' · you have answered ' + abgestimmt : '') +
      (apiDa ? (offen ? '' : ' · the round is closed') : ' · voting is not open yet');
  }

  function karte(e) {
    var p = punkte(e), mein = meins[e.id] ? meins[e.id].split('|') : null;
    var max = Math.max.apply(null, p.optionen.map(function (o) { return o.punkte; }).concat([0]));
    var k = el('article', 'gl-karte'); k.id = 'f-' + e.id;

    var kopf = el('div', 'gl-kopf');
    var h = el('h3', 'gl-wort', e.deutsch); h.lang = 'de';
    kopf.appendChild(h); kopf.appendChild(el('span', 'gl-gruppe', GRUPPEN[e.gruppe] || ''));
    k.appendChild(kopf);
    if (e.zaehlung) {
      var z = e.zaehlung;
      k.appendChild(el('div', 'gl-zahlen', 'Occurrences · Fichte ' + zahl(z.f) + ' · Schelling ' + zahl(z.s) + ' · Hegel ' + zahl(z.h)));
    }
    k.appendChild(el('p', 'gl-frage', e.frage));

    var form = el('form'); form.noValidate = true;
    var ul = el('ul', 'gl-optionen');
    var name = 'o-' + e.id;
    p.optionen.forEach(function (o) {
      var li = el('li'), lab = el('label', 'gl-option');
      var r = el('input'); r.type = 'radio'; r.name = name; r.value = o.key; r.disabled = !offen;
      if (mein && mein[0] === o.key) { r.checked = true; lab.classList.add('gewaehlt'); }
      lab.appendChild(r);
      var en = el('span', 'gl-option-en', o.en);
      if (e.vorschlag === o.key) { en.appendChild(document.createTextNode(' ')); en.appendChild(el('span', 'gl-marke-vorschlag', 'current proposal')); }
      lab.appendChild(en);
      var pk = el('span', 'gl-option-punkte');
      if (apiDa && max > 0) {
        pk.appendChild(el('b', null, String(o.punkte)));
        pk.appendChild(document.createTextNode(o.stimmen + (o.stimmen === 1 ? ' vote' : ' votes') + (o.marken ? ' · ' + o.marken + ' ✓' : '')));
      }
      lab.appendChild(pk);
      lab.appendChild(el('span', 'gl-option-hinweis', o.hinweis || ''));
      if (apiDa && max > 0) {
        var b = el('span', 'gl-balken'); b.style.width = (o.punkte / max * 100) + '%'; lab.appendChild(b);
        if (o.punkte === max) lab.classList.add('fuehrt');
      }
      li.appendChild(lab); ul.appendChild(li);
    });
    // own proposal
    var liA = el('li'), labA = el('label', 'gl-option gl-option-andere');
    var rA = el('input'); rA.type = 'radio'; rA.name = name; rA.value = 'andere'; rA.disabled = !offen;
    var tA = el('input'); tA.type = 'text'; tA.maxLength = 80; tA.placeholder = 'Another rendering …'; tA.disabled = !offen; tA.setAttribute('aria-label', 'Your own rendering');
    tA.addEventListener('focus', function () { rA.checked = true; waehlen(); });
    labA.appendChild(rA); labA.appendChild(tA); labA.appendChild(el('span'));
    liA.appendChild(labA); ul.appendChild(liA);
    form.appendChild(ul);

    // reason + send
    var f = el('div', 'gl-formular');
    var ta = el('textarea'); ta.maxLength = 1500; ta.disabled = !offen;
    ta.placeholder = 'Why this rendering? A passage that supports it, or one that breaks the others, counts most.';
    ta.setAttribute('aria-label', 'Your reason');
    if (mein) { var alt = p.gruende.filter(function (g) { return g.id === mein[1]; })[0]; if (alt) ta.value = alt.t; }
    var falle = el('input', 'gl-falle'); falle.name = 'webseite'; falle.tabIndex = -1; falle.autocomplete = 'off'; falle.setAttribute('aria-hidden', 'true');
    var zeile = el('div', 'gl-formular-zeile');
    var hinweis = el('span', 'gl-formular-hinweis', mein ? 'You voted here. Sending again replaces your vote.' : 'At least ' + MIN_GRUND + ' characters.');
    var knopf = el('button', 'gl-senden', mein ? 'Update vote' : 'Vote'); knopf.type = 'submit'; knopf.disabled = !offen;
    zeile.appendChild(hinweis); zeile.appendChild(knopf);
    var meldung = el('div', 'gl-meldung'); meldung.setAttribute('aria-live', 'polite');
    f.appendChild(ta); f.appendChild(falle); f.appendChild(zeile); f.appendChild(meldung);
    form.appendChild(f);
    k.appendChild(form);

    function waehlen() {
      if (!offen) return;
      k.classList.add('waehlt');
      ul.querySelectorAll('.gl-option').forEach(function (l) { l.classList.toggle('gewaehlt', l.querySelector('input[type=radio]').checked); });
    }
    ul.addEventListener('change', waehlen);
    if (mein) k.classList.add('waehlt');

    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var gew = form.querySelector('input[name="' + name + '"]:checked');
      meldung.className = 'gl-meldung fehler';
      if (!gew) { meldung.textContent = 'Please choose a rendering first.'; return; }
      if (gew.value === 'andere' && tA.value.trim().length < 2) { meldung.textContent = 'Please write your rendering.'; tA.focus(); return; }
      if (ta.value.trim().length < MIN_GRUND) { meldung.textContent = 'Please give a reason of at least ' + MIN_GRUND + ' characters.'; ta.focus(); return; }
      knopf.disabled = true; meldung.className = 'gl-meldung'; meldung.textContent = 'Sending …';
      senden({ tat: 'stimme', entscheidung: e.id, option: gew.value, vorschlag: tA.value, grund: ta.value, webseite: falle.value, dauer: Date.now() - geoeffnet })
        .then(function (j) {
          if (j.ok) { meldung.textContent = 'Thank you. Your vote and reason are in.'; gezeigt[e.id] = true; document.activeElement && document.activeElement.blur(); setTimeout(neuHolen, 300); }
          else { knopf.disabled = false; meldung.className = 'gl-meldung fehler'; meldung.textContent = fehlerText(j.grund); }
        });
    });

    // reasons
    var sichtbar = p.gruende.filter(function (g) { return !gemeldet[g.id]; });
    if (sichtbar.length) {
      var offenListe = !!gezeigt[e.id];
      var sch = el('button', 'gl-gruende-schalter', offenListe ? 'Hide reasons' : 'Read ' + sichtbar.length + (sichtbar.length === 1 ? ' reason' : ' reasons'));
      sch.type = 'button';
      var gl = el('ul', 'gl-gruende'); gl.hidden = !offenListe;
      var optEn = {}; p.optionen.forEach(function (o) { optEn[o.key] = o.en; });
      sichtbar.forEach(function (g) {
        var li = el('li', 'gl-grund' + (g.m >= 3 ? ' stark' : ''));
        var fuer = el('div', 'gl-grund-fuer', 'For '); fuer.appendChild(el('em', null, optEn[g.o] || '…'));
        li.appendChild(fuer);
        li.appendChild(el('div', 'gl-grund-text', g.t));
        var fuss = el('div', 'gl-grund-fuss');
        var eigen = mein && mein[1] === g.id;
        var ub = el('button', 'gl-ueberzeugt', 'Convincing' + (g.m ? ' · ' + g.m : '')); ub.type = 'button';
        ub.setAttribute('aria-pressed', marken[g.id] ? 'true' : 'false');
        ub.disabled = !offen || eigen;
        ub.addEventListener('click', function () {
          var zurueck = !!marken[g.id];
          ub.disabled = true;
          senden({ tat: 'marke', entscheidung: e.id, grundId: g.id, zurueck: zurueck }).then(function (j) {
            if (j.ok) { if (zurueck) delete marken[g.id]; else marken[g.id] = 1; schreib('gl-marken', JSON.stringify(marken)); neuHolen(); }
            else ub.disabled = false;
          });
        });
        fuss.appendChild(ub);
        if (eigen) fuss.appendChild(el('span', 'gl-eigen', 'your reason'));
        else if (offen) {
          var mb = el('button', 'gl-melden', 'Report'); mb.type = 'button';
          mb.addEventListener('click', function () {
            if (!confirm('Report this reason as abusive or off-topic? Reports are for abuse, not for disagreement.')) return;
            senden({ tat: 'meldung', entscheidung: e.id, grundId: g.id }).then(function () {
              gemeldet[g.id] = 1; schreib('gl-gemeldet', JSON.stringify(gemeldet)); li.remove();
            });
          });
          fuss.appendChild(mb);
        }
        li.appendChild(fuss);
        gl.appendChild(li);
      });
      sch.addEventListener('click', function () {
        gezeigt[e.id] = !gezeigt[e.id]; gl.hidden = !gezeigt[e.id];
        sch.textContent = gezeigt[e.id] ? 'Hide reasons' : 'Read ' + sichtbar.length + (sichtbar.length === 1 ? ' reason' : ' reasons');
      });
      k.appendChild(sch); k.appendChild(gl);
    }
    return k;
  }

  function fehlerText(g) {
    return ({ grund: 'Please give a reason of at least ' + MIN_GRUND + ' characters.', vorschlag: 'Please write your rendering.',
      geschlossen: 'The round is closed.', 'zu-viel': 'Too many votes from your connection in the last hour. Please try again later.' })[g]
      || 'Sending did not work. Please try again later.';
  }
  function senden(d) {
    d.person = personHolen();
    return fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(d) })
      .then(function (r) { return r.json(); }).catch(function () { return { ok: false }; });
  }

  // filter, search, order
  document.querySelectorAll('.gl-chip').forEach(function (c) {
    c.addEventListener('click', function () {
      document.querySelectorAll('.gl-chip').forEach(function (x) { x.setAttribute('aria-pressed', x === c ? 'true' : 'false'); });
      filter.gruppe = c.getAttribute('data-gruppe'); grenze = 30; zeichnen();
    });
  });
  var su = document.getElementById('gl-suche'), suT;
  su.addEventListener('input', function () { clearTimeout(suT); suT = setTimeout(function () { filter.text = su.value.trim().toLowerCase(); grenze = 30; zeichnen(); }, 150); });
  document.getElementById('gl-sortierung').addEventListener('change', function (ev) { filter.ordnung = ev.target.value; grenze = 30; zeichnen(); });

  laden();
  // others' votes: refresh now and then while the tab is visible
  setInterval(function () { if (document.visibilityState === 'visible' && apiDa && offen) neuHolen(); }, 60000);
})();

/* The whole glossary: settled draft rows (assets/glossar/glossar.json), objections through the feedback form. */
(function () {
  'use strict';
  var liste = document.getElementById('gl-ganz-liste'); if (!liste) return;
  var su = document.getElementById('gl-ganz-suche'), au = document.getElementById('gl-ganz-autor'), mehr = document.getElementById('gl-ganz-mehr');
  var NAME = { shared: 'All three', fichte: 'Fichte', schelling: 'Schelling', hegel: 'Hegel' };
  var alle = [], grenze = 60, t;
  function el(tag, cls, text) { var n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; }
  function zeichnen() {
    var q = su.value.trim().toLowerCase(), a = au.value;
    var treffer = alle.filter(function (e) { return (!a || e.a === a) && (!q || (e.de + ' ' + e.en).toLowerCase().indexOf(q) >= 0); });
    liste.textContent = '';
    treffer.slice(0, grenze).forEach(function (e) {
      var d = el('div');
      var dt = el('dt', null, e.de); dt.lang = 'de';
      var dd = el('dd', 'gl-en-zelle', e.en);
      var wer = el('dd', 'gl-wer');
      wer.appendChild(el('span', 'gl-autor', NAME[e.a]));
      var b = el('button', 'gl-einwand', 'Object'); b.type = 'button';
      b.addEventListener('click', function () {
        if (window.Rueckmeldung) window.Rueckmeldung.oeffnen({ art: 'stelle', zitat: 'Glossary (' + NAME[e.a] + '): ' + e.de + ' → ' + e.en });
      });
      wer.appendChild(b);
      d.appendChild(dt); d.appendChild(dd); d.appendChild(wer); liste.appendChild(d);
    });
    mehr.hidden = treffer.length <= grenze;
    mehr.textContent = 'Show more (' + (treffer.length - grenze) + ')';
  }
  fetch('/assets/glossar/glossar.json').then(function (r) { return r.json(); }).then(function (d) {
    alle = d;
    var z = document.getElementById('gl-ganz-zahl'); if (z) z.textContent = d.length.toLocaleString('en-US');
    zeichnen();
  }).catch(function () {});
  su.addEventListener('input', function () { clearTimeout(t); t = setTimeout(function () { grenze = 60; zeichnen(); }, 150); });
  au.addEventListener('change', function () { grenze = 60; zeichnen(); });
  mehr.addEventListener('click', function () { grenze += 120; zeichnen(); });
})();
