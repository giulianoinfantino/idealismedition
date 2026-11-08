#!/usr/bin/env python3
"""Lokaler Dienst wie bei Vercel mit cleanUrls: /recherche liefert recherche.html. Nur 127.0.0.1.
  python3 werkzeug/dienst.py [port]"""
import http.server, os, pathlib, sys
WURZEL = pathlib.Path(__file__).resolve().parent.parent / 'site'
class H(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **k): super().__init__(*a, directory=str(WURZEL), **k)
    def send_head(self):
        pfad = self.path.split('?', 1)[0].split('#', 1)[0]
        if pfad != '/' and not os.path.splitext(pfad)[1] and (WURZEL / (pfad.lstrip('/') + '.html')).exists():
            self.path = pfad + '.html' + self.path[len(pfad):]
        if not (WURZEL / self.path.split('?', 1)[0].lstrip('/')).exists() and self.path.split('?', 1)[0] != '/':
            self.send_response(404); self.send_header('Content-Type', 'text/html; charset=utf-8'); self.end_headers()
            self.wfile.write((WURZEL / '404.html').read_bytes()); return None
        return super().send_head()
    def log_message(self, *a): pass
http.server.ThreadingHTTPServer(('127.0.0.1', int(sys.argv[1]) if len(sys.argv) > 1 else 8744), H).serve_forever()
