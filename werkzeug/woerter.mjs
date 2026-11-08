#!/usr/bin/env node
// Woerter je Band, gezaehlt vom Suchkern selbst: dieselbe Zahl, die die Recherche nach dem Laden meldet.
//   node werkzeug/woerter.mjs site/assets/suche  ->  {"sw-I-01": 123456, ...}
import fs from 'node:fs';import path from 'node:path';import vm from 'node:vm';
const A=path.join(path.dirname(new URL(import.meta.url).pathname),'..','site','assets');
for(const f of ['ortho.js','recherche-kern.js'])vm.runInThisContext(fs.readFileSync(path.join(A,f),'utf8'),{filename:f});
const H=globalThis.HegelRecherche,dir=process.argv[2];
const ix=JSON.parse(fs.readFileSync(path.join(dir,'index.json'),'utf8'));const aus={};
for(const b of ix.baende)aus[b.work]=H.baueBand(JSON.parse(fs.readFileSync(path.join(dir,b.work+'.json'),'utf8'))).woerter;
console.log(JSON.stringify(aus));
