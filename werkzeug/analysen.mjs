// Korpus-Analysen der Edition Deutscher Idealismus, vorab berechnet für die Seite „Analysen“.
//
//   node werkzeug/analysen.mjs           schreibt site/assets/analysen.json
//
// Grundlage sind dieselben Daten wie in der Recherche: der zusammengelegte Suchindex
// (site/assets/suche/*.json, nur Bände, die ausgeliefert werden) und für die Hervorhebungen
// die TEI-Dateien der drei Ausgaben. Gezählt wird nach dem Schreibungsausgleich der Suche
// (ortho.js), damit „daß“ (Hegel, GW) und „dass“ (Fichte, SW) nicht als Unterschied der
// Autoren erscheinen, sondern als derselbe Wortschlüssel.
//
// 1. Kennzeichnendes Vokabular: Log-Likelihood (Dunning) je Autor gegen die beiden anderen;
//    nur Wörter, die der Autor häufiger gebraucht, mit mindestens MIN_N Vorkommen.
// 2. Hervorhebungen: gesperrte bzw. kursivierte Wörter je Autor, am häufigsten und am
//    verlässlichsten (Anteil der Vorkommen, die hervorgehoben sind).
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const HOME = process.env.HOME;
const P = path.join(HOME, 'idealismus/site');
const ctx = { window: {}, globalThis: {} };
ctx.globalThis = ctx; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(P, 'assets/ortho.js'), 'utf8').replace('typeof window !== \'undefined\' ? window : globalThis', 'globalThis'), ctx);
const O = ctx.HEGEL_ORTHO;

const AUTOR = w => w.startsWith('f') ? 'fichte' : w.startsWith('sw-') ? 'schelling' : 'hegel';
const AUTOREN = ['fichte', 'schelling', 'hegel'];
const MIN_N = 40;
// Ein Wort darf einen Apostroph enthalten: Fichte’schen ist ein Wort, nicht Fichte und schen
const WORT = /[A-Za-zÄÖÜäöüßſ]+(?:[’'][A-Za-zÄÖÜäöüßſ]+)*/g;
// Funktionswörter und Wörter, die nur die Gestalt des Drucks spiegeln
const STOPP = new Set(`der die das des dem den ein eine einer eines einem einen und oder aber auch als wie so zu zur zum
von vom mit für fur auf aus bei bis durch gegen ohne um unter über uber nach vor an am in im ins ist sind war waren wird werden
worden seyn sein sei sey seyen hat haben hatte hatten habe kann können konnte muss muß müssen soll sollen will wollen nicht
nur noch schon sehr mehr weil daß dass wenn ob denn dann da doch also nun wo was wer welche welcher welches welchen welchem
dieser diese dieses diesen diesem jener jene jenes jenen jenem es er sie ihr ihm ihn ihnen wir uns ich mich mir du dich dir
man sich sein seine seiner seines seinem seinen ihre ihrer ihres ihrem ihren unser unsere kein keine keiner keinen
alle aller alles allen allem jedes jeder jede jeden jedem andere anderen anderer anderes anderem selbst ebenso eben
hier dort ja nein wohl etwa einmal immer wieder sondern sowohl zwar weder noch indem insofern sofern sobald ganz gar
erst einem eines bloß bloss blos thun tun sey dies dieß diß diess giebt außer ausser überhaupt uberhaupt zusatz anmerkung`.split(/\s+/).flatMap(w => [w, schluessel(w)]));
// Sprecher der Dialoge stehen im Druck gesperrt (Bruno), sind aber keine Hervorhebung
const SPRECHER = new Set(['bruno', 'lucian', 'anselmo', 'alexander'].map(w => schluessel(w)));

function schluessel(w) { return O.normalize(w.toLowerCase().replace(/ſ/g, 's')); }

// ── 1. Wortzählung aus dem Suchindex ─────────────────────────────────
const ix = JSON.parse(fs.readFileSync(path.join(P, 'assets/suche/index.json'), 'utf8'));
// Jahr und Gattung je Einheit (werkzeug/jahre.py); Exzerpte (fremde Texte) zählen nirgends mit
const JAHRE = JSON.parse(fs.readFileSync(path.join(P, 'assets/suche/jahre.json'), 'utf8')).baende;
const VON = 1785, NJ = 14;                               // Jahrfünfte 1785–1789 … 1850–1854
const KOLUMNE = /^[0-9]+ \*[^*]+\*(?: \[[0-9]+\])?(?: [0-9]+)? /;
const zahl = { fichte: new Map(), schelling: new Map(), hegel: new Map() };
const form = { fichte: new Map(), schelling: new Map(), hegel: new Map() };
const summe = { fichte: 0, schelling: 0, hegel: 0 };
const zeitWoerter = Object.fromEntries(AUTOREN.map(a => [a, new Array(NJ).fill(0)]));
const zeit = new Map();                                  // Schlüssel -> Int32Array(3 × NJ)
const ausgelassen = new Set();                           // Bände mit Exzerpten, nur für die Meldung
for (const b of ix.baende) {
  const d = JSON.parse(fs.readFileSync(path.join(P, 'assets/suche', b.work + '.json'), 'utf8'));
  const a = AUTOR(b.work), ai = AUTOREN.indexOf(a), seg = JAHRE[b.work];
  let s = 0;
  for (let i = 0; i < d.u.length; i++) {
    while (s + 1 < seg.length && seg[s + 1][0] <= i) s++;
    const u = d.u[i], [, jahr, gattung] = seg[s];
    if (gattung === 'e') { ausgelassen.add(b.work); continue; }
    if (u[2] !== 't' && u[2] !== 'n') continue;          // Haupttext und Anmerkungen, keine Überschriften
    const jf = jahr ? Math.floor((jahr - VON) / 5) : -1;
    // In einigen Bänden der Fichte-SW steht der Kolumnentitel noch als erste Zeile im Text
    // („422 *Die Anweisung zum seligen Leben, oder auch* [43] 29“): nicht mitzählen
    const text = KOLUMNE.test(u[5]) ? u[5].replace(KOLUMNE, '') : u[5];
    for (const m of text.matchAll(WORT)) {
      const w = m[0];
      summe[a]++; if (jf >= 0) zeitWoerter[a][jf]++;       // jedes Wort zählt für die Größe des Korpus
      if (w.length < 3) continue;
      const k = schluessel(w);
      zahl[a].set(k, (zahl[a].get(k) || 0) + 1);
      let f = form[a].get(k); if (!f) form[a].set(k, f = new Map());
      f.set(w, (f.get(w) || 0) + 1);
      if (jf >= 0) {
        let z = zeit.get(k); if (!z) zeit.set(k, z = new Int32Array(3 * NJ));
        z[ai * NJ + jf]++;
      }
    }
  }
}
// Beugungsformen der Substantive auf die Grundform legen (Bild, Bilde, Bildes, Bilder → Bild),
// aber nur, wenn die Grundform selbst als Substantiv im Korpus steht. Gilt für alle drei
// Autoren gleich, damit die Vergleiche dieselben Gruppen zählen.
const formAlle = new Map();
for (const a of AUTOREN) for (const [k, f] of form[a]) {
  let g = formAlle.get(k); if (!g) formAlle.set(k, g = new Map());
  for (const [w, n] of f) g.set(w, (g.get(w) || 0) + n);
}
const haeufigsteForm = k => [...formAlle.get(k).entries()].sort((x, y) => y[1] - x[1])[0][0];
const istSubst = k => formAlle.has(k) && /^[A-ZÄÖÜ]/.test(haeufigsteForm(k));
const gesamt = k => AUTOREN.reduce((s, a) => s + (zahl[a].get(k) || 0), 0);
const ENDUNG = ['ern', 'en', 'er', 'es', 'e', 'n', 's'];
const grund = new Map();
for (const k of formAlle.keys()) {
  if (!istSubst(k)) continue;
  let g = k;
  for (let tiefe = 0; tiefe < 2; tiefe++) {
    // die Grundform muss geläufig sein, sonst ist sie eher ein Bruchstück (Denk- und …)
    const e = ENDUNG.find(e => g.endsWith(e) && g.length - e.length >= 3 && istSubst(g.slice(0, -e.length))
                               && gesamt(g.slice(0, -e.length)) >= 0.1 * gesamt(g));
    if (!e) break; g = g.slice(0, -e.length);
  }
  if (g !== k) grund.set(k, g);
}
for (const a of AUTOREN) {
  for (const [k, g] of grund) {
    const n = zahl[a].get(k); if (!n) continue;
    zahl[a].set(g, (zahl[a].get(g) || 0) + n); zahl[a].delete(k);
    const f = form[a].get(k), fg = form[a].get(g) || new Map();
    form[a].set(g, fg);                       // die Anzeige bleibt die Grundform selbst
    if (!fg.size) for (const [w, m] of f) fg.set(w, (fg.get(w) || 0) + m);
    form[a].delete(k);
  }
}
for (const [k, g] of grund) {
  const z = zeit.get(k); if (!z) continue;
  let zg = zeit.get(g); if (!zg) zeit.set(g, zg = new Int32Array(3 * NJ));
  for (let i = 0; i < z.length; i++) zg[i] += z[i];
  zeit.delete(k);
}
function anzeige(a, k) {
  const f = form[a].get(k); if (!f) return k;
  return [...f.entries()].sort((x, y) => y[1] - x[1])[0][0];
}
function ll(a, b, c, d) {   // a: Vorkommen im Teilkorpus (Größe c), b: im Rest (Größe d)
  const e1 = c * (a + b) / (c + d), e2 = d * (a + b) / (c + d);
  return 2 * ((a ? a * Math.log(a / e1) : 0) + (b ? b * Math.log(b / e2) : 0));
}
const vokabular = {};
for (const a of AUTOREN) {
  const rest = AUTOREN.filter(x => x !== a);
  const nRest = rest.reduce((s, x) => s + summe[x], 0);
  const liste = [];
  for (const [k, n] of zahl[a]) {
    if (n < MIN_N || STOPP.has(k) || k.length < 4) continue;
    const m = rest.reduce((s, x) => s + (zahl[x].get(k) || 0), 0);
    const pa = n / summe[a], pr = m / nRest;
    if (pa <= pr) continue;
    liste.push({ wort: anzeige(a, k), schluessel: k, n, je10k: +(1e4 * pa).toFixed(2), rest10k: +(1e4 * pr).toFixed(2),
                 ll: Math.round(ll(n, m, summe[a], nRest)),
                 bei: Object.fromEntries(rest.map(x => [x, +(1e4 * (zahl[x].get(k) || 0) / summe[x]).toFixed(2)])) });
  }
  liste.sort((x, y) => y.ll - x.ll);
  // Substantive erkennt man im Deutschen an der Großschreibung der häufigsten Form
  const gross = x => /^[A-ZÄÖÜ]/.test(x.wort);
  vokabular[a] = { begriffe: liste.filter(gross).slice(0, 40), stil: liste.filter(x => !gross(x)).slice(0, 40) };
}

// ── 2. Hervorhebungen aus den TEI-Dateien ────────────────────────────
const TEI = {
  fichte: path.join(HOME, 'fichte/site/assets/tei'),
  schelling: path.join(HOME, 'schelling/site/assets/tei'),
  hegel: path.join(HOME, 'Desktop/Claude Code/idealismus-edition/Hegel Edition/assets/tei'),
};
const SIG = { fichte: w => w.replace(/^f(sw|nw)-(\d+)$/, (_, r, n) => 'F' + r.toUpperCase() + n),
              schelling: w => w.replace(/^sw-(I{1,2})-(\d+)$/, (_, r, n) => 'SW' + r + n),
              hegel: w => 'GW' + String(w.replace('gw-', '')).padStart(2, '0') };
const hervor = { fichte: new Map(), schelling: new Map(), hegel: new Map() };
const hervorSumme = { fichte: 0, schelling: 0, hegel: 0 };
for (const b of ix.baende) {
  if (JAHRE[b.work].every(x => x[2] === 'e')) continue;   // ganz Exzerpt (GW 3)
  const a = AUTOR(b.work), datei = path.join(TEI[a], SIG[a](b.work) + '.xml');
  if (!fs.existsSync(datei)) { console.error('TEI fehlt:', datei); continue; }
  const t = fs.readFileSync(datei, 'utf8');
  const body = t.slice(t.indexOf('<text'))
    // nur der Text, den auch die Zählung kennt: keine Überschriften, Kolumnentitel, Inhaltslisten, Sprungmarken
    .replace(/<head\b[\s\S]*?<\/head>|<fw\b[\s\S]*?<\/fw>|<list\b[\s\S]*?<\/list>|<note type="anker"[\s\S]*?<\/note>/g, ' ')
    .replace(/<lb n="1"\/>[0-9]+ <hi rendition="#g">[^<]+<\/hi>(?: \[[0-9]+\])?(?: [0-9]+)?/g, '<lb n="1"/>')   // Kolumnentitel im Text
    // Trennung am Zeilenende auflösen, auch wenn die Hervorhebung dort neu ansetzt (Forbergi-|schen)
    .replace(/<pc[^>]*force="weak"[^>]*>[^<]*<\/pc>/g, '').replace(/<lb\b[^>]*break="no"[^>]*\/>/g, '')
    .replace(/<\/hi>(?=<hi rendition="#g")<hi rendition="#g"[^>]*>/g, '')
    // eine Hervorhebung endet oder beginnt nie mitten im Wort
    .replace(/<\/hi>([A-Za-zÄÖÜäöüßſ]+)/g, '$1</hi>').replace(/([A-Za-zÄÖÜäöüßſ]+)(<hi rendition="#g"[^>]*>)/g, '$2$1');
  for (const m of body.matchAll(/<hi rendition="#g"[^>]*>([\s\S]*?)<\/hi>/g)) {
    const inhalt = m[1].replace(/<[^>]+>/g, ' ');
    for (const w of inhalt.match(WORT) || []) {
      if (w.length < 3) continue;
      let k = schluessel(w); if (SPRECHER.has(k)) continue;
      k = grund.get(k) || k;
      hervorSumme[a]++;
      hervor[a].set(k, (hervor[a].get(k) || 0) + 1);
    }
  }
}
const hervorhebungen = {};
for (const a of AUTOREN) {
  const alle = [...hervor[a].entries()].filter(([k]) => !STOPP.has(k) && k.length >= 4);
  const haeufig = alle.sort((x, y) => y[1] - x[1]).slice(0, 40)
    .map(([k, n]) => ({ wort: anzeige(a, k), n, anteil: +(n / (zahl[a].get(k) || n)).toFixed(3) }));
  const verlaesslich = alle.filter(([k, n]) => (zahl[a].get(k) || 0) >= 60 && n >= 20)
    .map(([k, n]) => ({ wort: anzeige(a, k), n, gesamt: zahl[a].get(k), anteil: +(n / zahl[a].get(k)).toFixed(3) }))
    .sort((x, y) => y.anteil - x.anteil).slice(0, 40);
  hervorhebungen[a] = { woerter: hervorSumme[a], anteil: +(hervorSumme[a] / summe[a]).toFixed(4), haeufig, verlaesslich };
}

// ── 3. Begriffsgeschichte: Vorkommen je Jahrfünft und Autor ─────────
// Nur Wörter, die oft genug stehen, um eine Kurve zu tragen; seltenere in der Recherche.
const MIN_ZEIT = +(process.env.MIN_ZEIT || 50);
const reihen = {};
for (const [k, z] of zeit) {
  let n = 0; for (const x of z) n += x;
  if (n < MIN_ZEIT || STOPP.has(k) || k.length < 3) continue;
  const ai = [0, 1, 2].sort((x, y) => (zahl[AUTOREN[y]].get(k) || 0) - (zahl[AUTOREN[x]].get(k) || 0))[0];
  // je Autor nur die besetzten Jahrfünfte: "Index:Zahl" durch Komma getrennt
  reihen[k] = [anzeige(AUTOREN[ai], k), ...[0, 1, 2].map(a => {
    const t = []; for (let j = 0; j < NJ; j++) if (z[a * NJ + j]) t.push(j + ':' + z[a * NJ + j]);
    return t.join(',');
  })];
}
fs.writeFileSync(path.join(P, 'assets/zeitreihen.json'), JSON.stringify({
  stand: new Date().toISOString().slice(0, 10), von: VON, schritt: 5, n: NJ, autoren: AUTOREN,
  woerter: zeitWoerter, min: MIN_ZEIT, reihen }));
console.log('Zeitreihen:', Object.keys(reihen).length, 'Wörter; Wortzahl je Jahrfünft', JSON.stringify(zeitWoerter));
console.log('Exzerpte ausgelassen in', [...ausgelassen].join(', '));

const aus = { stand: new Date().toISOString().slice(0, 10), woerter: summe, vokabular, hervorhebungen,
              methode: { min_n: MIN_N, mass: 'Log-Likelihood (Dunning) gegen die beiden anderen Autoren', schreibung: 'ortho.js' } };
fs.writeFileSync(path.join(P, 'assets/analysen.json'), JSON.stringify(aus));
console.log('Wörter', summe);
for (const a of AUTOREN) console.log(a, 'Begriffe:', vokabular[a].begriffe.slice(0, 12).map(x => x.wort).join(', '), '| Stil:', vokabular[a].stil.slice(0, 10).map(x => x.wort).join(', '));
for (const a of AUTOREN) console.log(a, 'hervorgehoben:', hervorhebungen[a].haeufig.slice(0, 10).map(x => x.wort).join(', '), '| Anteil', hervorhebungen[a].anteil);
