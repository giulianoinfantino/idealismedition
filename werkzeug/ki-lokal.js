#!/usr/bin/env node
// Das Portal lokal, mit der KI-Recherche über Claude Code statt über einen API-Schlüssel (nur zum eigenen Ausprobieren).
//   node werkzeug/ki-lokal.js            → http://localhost:4173/de/ask
// Statische Dateien kommen aus site/ (wie bei Vercel: saubere Adressen, /de/assets → /assets). POST /api/ki-frage ruft
// `claude -p` auf, angemeldet mit dem eigenen Claude-Abo; Claude darf dabei nur die zwei Werkzeuge der Recherche benutzen
// (werkzeug/ki-werkzeug.js suche|lesen). Die Antwort geht im selben Strom an die Seite wie bei api/ki-frage.js.
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawn } = require('child_process');

const WURZEL = path.join(__dirname, '..', 'site');
const WERKZEUG = path.join(__dirname, 'ki-werkzeug.js');
const KI = require(path.join(WURZEL, 'api', 'ki-frage.js'));
const PORT = Number(process.env.PORT) || 4173;
const ARTEN = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp',
  '.woff2': 'font/woff2', '.ico': 'image/x-icon', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8' };
const MODELLE = { 'claude-opus-5-5': 'opus', 'claude-sonnet-5-5': 'sonnet', 'claude-haiku-5-5': 'haiku' };

function datei(url) {
  let p = decodeURIComponent(url.split('?')[0]).replace(/^\/de\/(assets|api)\//, '/$1/');
  if (p.includes('..')) return null;
  const kandidaten = p.endsWith('/') ? [p + 'index.html'] : [p, p + '.html', p + '/index.html'];
  for (const k of kandidaten) {
    const f = path.join(WURZEL, k);
    if (fs.existsSync(f) && fs.statSync(f).isFile()) return f;
  }
  return null;
}

// Der Systemprompt der Website, mit den Werkzeugen als Befehle statt als Funktionsaufrufe
function systemLokal(sprache) {
  return KI.system(sprache).replace(
    /Suche dazu mit dem Werkzeug „suche“/,
    'Du hast genau zwei Befehle über das Bash-Werkzeug, sonst nichts:\n'
    + `  node ${WERKZEUG} suche '<anfrage>' <alle|fichte|schelling|hegel> <anzahl 1–25> [band,band]\n`
    + `  node ${WERKZEUG} lesen <kennung> <umgebung 0–3>\n`
    + 'Die Anfrage steht in einfachen Anführungszeichen; darin "Wortfolge" in doppelten Anführungszeichen, Stern am Wortende für den Wortanfang. '
    + 'Groß-/Kleinschreibung, ß/ss, th/t, ey/ei, ae/ä und Genitiv -s/-es werden angeglichen; andere alte Schreibungen (c/k/z, -iren) eigens suchen. Es gibt kein OR: für Alternativen mehrere Suchen. '
    + 'Benutze keine anderen Befehle und keine anderen Werkzeuge. Antworte am Ende nur mit der Antwort selbst, ohne Vorbemerkung.\n\n'
    + 'Suche mit „suche“') + '\n';
}

function frage(req, res, d) {
  const frage = String((d && d.frage) || '').trim().slice(0, 1500);
  if (frage.length < 3) { res.writeHead(400); return res.end(); }
  const sprache = d.sprache === 'en' ? 'en' : 'de';
  const modell = MODELLE[d.modell] || 'opus';
  res.writeHead(200, { 'Content-Type': 'application/x-ndjson; charset=utf-8', 'Cache-Control': 'no-store' });
  const sende = o => res.write(JSON.stringify(o) + '\n');

  const leer = fs.mkdtempSync(path.join(os.tmpdir(), 'ki-lokal-'));   // ohne Projektdateien, ohne CLAUDE.md
  const args = ['-p', frage, '--output-format', 'stream-json', '--verbose', '--model', modell,
    '--system-prompt', systemLokal(sprache), '--tools', 'Bash',
    '--allowedTools', `Bash(node ${WERKZEUG}:*)`, `Bash(node ${WERKZEUG} *)`,
    '--strict-mcp-config', '--setting-sources', 'local', '--no-session-persistence'];
  const kind = spawn('claude', args, { cwd: leer, env: (({ ANTHROPIC_API_KEY, ...rest }) => rest)(process.env) });
  const gesehen = new Set(), offen = new Map(); let rest = '', fertig = false; const beginn = Date.now();
  res.on('close', () => { if (!fertig && !res.writableEnded) kind.kill('SIGTERM'); });   // Seite geschlossen: abbrechen

  kind.stdout.on('data', chunk => {
    rest += chunk.toString('utf8');
    const zeilen = rest.split('\n'); rest = zeilen.pop();
    for (const z of zeilen) {
      if (!z.trim()) continue;
      let e; try { e = JSON.parse(z); } catch (_) { continue; }
      if (e.type === 'assistant') {
        for (const b of (e.message && e.message.content) || []) {
          if (b.type !== 'tool_use') continue;
          const cmd = String((b.input && b.input.command) || '');
          const m = cmd.match(/ki-werkzeug\.js\s+(suche|lesen)\s+(.*)$/s);
          if (!m) continue;
          const q = m[2].match(/^'([^']*)'|^"((?:[^"\\]|\\.)*)"|^(\S+)/) || [];
          offen.set(b.id, { art: m[1], anfrage: q[1] || q[2] || q[3] || m[2], autor: (m[2].match(/\s(alle|fichte|schelling|hegel)\b/) || [])[1] });
        }
      } else if (e.type === 'user') {
        for (const b of (e.message && e.message.content) || []) {
          if (b.type !== 'tool_result') continue;
          const text = Array.isArray(b.content) ? b.content.map(x => x.text || '').join('') : String(b.content || '');
          let erg = {}; try { erg = JSON.parse(text); } catch (_) {}
          (erg.stellen || []).forEach(s => gesehen.add(s.id));
          const w = offen.get(b.tool_use_id); offen.delete(b.tool_use_id);
          if (w && w.art === 'suche') sende({ t: 'schritt', art: 'suche', anfrage: w.anfrage, autor: w.autor, gesamt: erg.gesamt || 0 });
          else if (w) { const l = erg.stellen || []; sende({ t: 'schritt', art: 'lesen', zitat: l.length ? l[Math.floor(l.length / 2)].zitat : w.anfrage }); }
        }
      } else if (e.type === 'result') {
        fertig = true;
        if (e.is_error || e.subtype !== 'success') { sende({ t: 'fehler', grund: e.subtype || 'fehler', meldung: String(e.result || '').slice(0, 300) }); }
        else {
          const b = KI.belege(String(e.result || '').trim(), gesehen);
          sende({ t: 'antwort', text: b.text, quellen: b.quellen, verworfen: b.verworfen });
        }
        const u = e.usage || {};
        sende({ t: 'kosten', modell: 'Claude Code (' + modell + ')', effort: '', sekunden: Math.round((Date.now() - beginn) / 1000),
          verbrauch: { input_tokens: u.input_tokens || 0, output_tokens: u.output_tokens || 0,
                       cache_read_input_tokens: u.cache_read_input_tokens || 0, cache_creation_input_tokens: u.cache_creation_input_tokens || 0 },
          dollar: Math.round((e.total_cost_usd || 0) * 1000) / 1000 });
      }
    }
  });
  let fehlertext = '';
  kind.stderr.on('data', c => { fehlertext += c.toString('utf8'); });
  kind.on('close', code => {
    if (!fertig) sende({ t: 'fehler', grund: 'claude ' + code, meldung: fehlertext.slice(-300) });
    fs.rmSync(leer, { recursive: true, force: true });
    res.end();
  });
}

http.createServer((req, res) => {
  if (req.method === 'POST' && req.url.replace(/^\/de/, '').startsWith('/api/ki-frage')) {
    let roh = '';
    req.on('data', c => { roh += c; if (roh.length > 20000) req.destroy(); });
    req.on('end', () => { let d = {}; try { d = JSON.parse(roh); } catch (_) {} frage(req, res, d); });
    return;
  }
  if (req.url.startsWith('/api/')) { res.writeHead(200, { 'Content-Type': 'application/json' }); return res.end('{"ok":false}'); }
  const f = datei(req.url);
  if (!f) { res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' }); return res.end(fs.readFileSync(path.join(WURZEL, 'de', '404.html'))); }
  res.writeHead(200, { 'Content-Type': ARTEN[path.extname(f)] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
}).listen(PORT, '127.0.0.1', () => console.log(`KI-Recherche lokal: http://localhost:${PORT}/de/ask  (englisch: /ask)`));
