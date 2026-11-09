// Suchkern für die KI-Recherche (api/ki-frage.js): liest dieselben Suchdaten wie die Suchseite (assets/suche/*.json,
// von werkzeug/sammle.py aus den drei Editionen kopiert) und stellt zwei Werkzeuge bereit, die Claude aufruft:
//   suche(anfrage, …)  Stellen nach Wörtern, mit alter Rechtschreibung (seyn ~ sein, Nothwendigkeit ~ Notwendigkeit)
//   lesen(id, …)       eine Stelle mit Umgebung im Wortlaut
// Jede Stelle trägt ihre Kennung (werk:nummer), ihr Zitat nach dem Druck (Sigle, Seite, Zeilen) und den Link in den Leser.
const fs = require('fs');
const path = require('path');

const ORDNER = path.join(__dirname, '..', 'assets', 'suche');
const EDITIONEN = {
  fichte: { name: 'Fichte', url: 'https://www.fichteedition.com' },
  schelling: { name: 'Schelling', url: 'https://www.schellingedition.com' },
  hegel: { name: 'Hegel', url: 'https://www.hegeledition.com' },
};

// Für den Vergleich: klein, ohne Sperrsatz-Sternchen, alte Schreibungen angeglichen. Länge ändert sich (th → t),
// darum werden Fundstellen im Original nur ungefähr verortet (für den Ausschnitt genügt das).
function norm(s) {
  return s.toLowerCase().replace(/\*/g, '').replace(/ß/g, 'ss').replace(/th/g, 't').replace(/ey/g, 'ei')
    .replace(/ae/g, 'ä').replace(/oe/g, 'ö').replace(/ue/g, 'ü').replace(/­/g, '');
}

let KORPUS = null;
function korpus() {
  if (KORPUS) return KORPUS;
  const index = JSON.parse(fs.readFileSync(path.join(ORDNER, 'index.json'), 'utf8'));
  const baende = [], einheiten = [];
  for (const b of index.baende) {
    const d = JSON.parse(fs.readFileSync(path.join(ORDNER, b.work + '.json'), 'utf8'));
    const band = { work: b.work, sig: b.sig, title: b.title, ed: b.ed, secs: d.secs, von: einheiten.length };
    d.u.forEach((u, i) => {
      // u = [pdf-Seite, Druckseite, Art, weiter, Abschnitt, Text, Zeilen (Versatz, Zeile, Versatz, Zeile, …)]
      einheiten.push({ band, i, pdf: u[0], buch: u[1], art: u[2], weiter: u[3], sec: u[4], text: u[5], zeilen: u[6] || null, n: norm(u[5]) });
    });
    band.bis = einheiten.length;
    baende.push(band);
  }
  KORPUS = { baende, einheiten, nachId: new Map(einheiten.map((e, k) => [e.band.work + ':' + e.i, k])) };
  return KORPUS;
}

function zeileBei(e, versatz) {
  if (!e.zeilen) return null;
  let z = e.zeilen[1];
  for (let k = 0; k < e.zeilen.length; k += 2) { if (e.zeilen[k] <= versatz) z = e.zeilen[k + 1]; else break; }
  return z;
}
function zeilen(e) { return e.zeilen ? [e.zeilen[1], e.zeilen[e.zeilen.length - 1]] : [null, null]; }
function zitat(e) {
  const [a, b] = zeilen(e);
  return e.band.sig + ', ' + e.buch + (a != null ? ',' + a + (b != null && b !== a ? '–' + b : '') : '');
}
function link(e) {
  const [a, b] = zeilen(e);
  const p = new URLSearchParams({ work: e.band.work });
  if (a != null) p.set('z', a + (b != null && b !== a ? '-' + b : ''));
  p.set('druck', '1');
  return EDITIONEN[e.band.ed].url + '/text?' + p.toString() + '#page-' + e.pdf;
}
function stelle(e) {
  return { id: e.band.work + ':' + e.i, zitat: zitat(e), werk: EDITIONEN[e.band.ed].name + ', ' + e.band.title,
           abschnitt: e.band.secs[e.sec] || '', link: link(e) };
}

function esc(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
// Anfrage: Wörter (alle müssen in derselben Stelle stehen), "Wortfolge" in Anführungszeichen, Stern am Ende für Wortanfang
function muster(anfrage) {
  const teile = [];
  const re = /"([^"]+)"|(\S+)/g; let m;
  while ((m = re.exec(anfrage))) {
    const roh = (m[1] || m[2]).trim(); if (!roh) continue;
    const anfang = /\*$/.test(roh);
    const t = norm(roh.replace(/\*$/, '')).replace(/[^\p{L}\p{N}\s-]/gu, '').trim();
    if (t.length < 2) continue;
    const kern = t.split(/\s+/).map(esc).join('[\\s\\-]+');
    teile.push({ wort: roh, re: new RegExp('(?<![\\p{L}])' + kern + (anfang ? '[\\p{L}]*' : '(?![\\p{L}])'), 'gu') });
  }
  return teile;
}

function suche({ anfrage, autor, werke, anzahl }) {
  const K = korpus();
  const teile = muster(String(anfrage || ''));
  if (!teile.length) return { fehler: 'Die Anfrage enthält kein Suchwort.' };
  const erlaubt = new Set((Array.isArray(werke) ? werke : []).filter(Boolean));
  const treffer = []; const jeBand = {};
  for (const b of K.baende) {
    if (autor && b.ed !== autor) continue;
    if (erlaubt.size && !erlaubt.has(b.work)) continue;
    for (let k = b.von; k < b.bis; k++) {
      const e = K.einheiten[k];
      let wert = 0, erst = -1, ok = true;
      for (const t of teile) {
        t.re.lastIndex = 0; let m, n = 0;
        while ((m = t.re.exec(e.n))) { if (erst < 0 || m.index < erst) erst = m.index; n++; if (n > 50) break; }
        if (!n) { ok = false; break; }
        wert += Math.log(1 + n);
      }
      if (!ok) continue;
      wert = wert / Math.sqrt(1 + e.n.length / 800);
      treffer.push({ k, wert, erst });
      jeBand[b.sig] = (jeBand[b.sig] || 0) + 1;
    }
  }
  treffer.sort((x, y) => y.wert - x.wert);
  const n = Math.max(1, Math.min(25, Number(anzahl) || 12));
  return {
    anfrage, gesamt: treffer.length,
    verteilung: Object.entries(jeBand).sort((a, b) => b[1] - a[1]).slice(0, 12).map(([s, z]) => s + ': ' + z).join(', '),
    stellen: treffer.slice(0, n).map(t => {
      const e = K.einheiten[t.k];
      const mitte = Math.round(t.erst * e.text.length / Math.max(1, e.n.length));
      const a = Math.max(0, mitte - 220), z = Math.min(e.text.length, mitte + 280);
      return Object.assign(stelle(e), { auszug: (a > 0 ? '… ' : '') + e.text.slice(a, z) + (z < e.text.length ? ' …' : '') });
    }),
  };
}

function lesen({ id, umgebung }) {
  const K = korpus();
  const k = K.nachId.get(String(id || ''));
  if (k == null) return { fehler: 'Unbekannte Kennung: ' + id };
  const um = Math.max(0, Math.min(3, Number(umgebung) || 1));
  const e = K.einheiten[k], b = e.band;
  const aus = [];
  for (let j = Math.max(b.von, k - um); j <= Math.min(b.bis - 1, k + um); j++) {
    const x = K.einheiten[j];
    aus.push(Object.assign(stelle(x), { text: x.text.length > 4000 ? x.text.slice(0, 4000) + ' …' : x.text }));
  }
  return { stellen: aus };
}

function uebersicht() {
  return korpus().baende.map(b => `${b.work} | ${EDITIONEN[b.ed].name} | ${b.sig} | ${b.title}`).join('\n');
}

module.exports = { suche, lesen, uebersicht, stelleNachId: id => { const K = korpus(); const k = K.nachId.get(id); return k == null ? null : Object.assign(stelle(K.einheiten[k]), { text: K.einheiten[k].text }); } };
