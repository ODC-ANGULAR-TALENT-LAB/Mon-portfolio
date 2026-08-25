/**
 * Synchronise les images twemoji hebergees dans public/assets/twemoji.
 *
 * Le portfolio n'embarque que les emoji reellement presents dans les sources,
 * pas le jeu complet (3500+ fichiers). Apres avoir ajoute un emoji dans
 * portfolio.ts ou dans un template, lancer :
 *
 *     node scripts/sync-twemoji.mjs
 *
 * Le script relit la meme expression reguliere que l'application, recense les
 * emoji utilises, telecharge ceux qui manquent et signale ceux devenus inutiles.
 */
import fs from 'node:fs';
import path from 'node:path';

const VERSION = '14.0.2';
const OUT_DIR = 'public/assets/twemoji';
const SRC_DIR = 'src';

// Meme regex que src/app/core/emoji-regex.ts, lue depuis le fichier pour
// qu'elle ne puisse pas diverger.
const regexSource = fs.readFileSync(path.join(SRC_DIR, 'app/core/emoji-regex.ts'), 'utf8');
const start = regexSource.indexOf('export const EMOJI_RE =') + 'export const EMOJI_RE ='.length;
const literal = regexSource.slice(start).trim().replace(/;$/, '').trim();
const EMOJI_RE = eval(literal);

function toCodePoint(text, sep = '-') {
  const out = [];
  let code = 0;
  let pending = 0;
  let i = 0;
  while (i < text.length) {
    code = text.charCodeAt(i++);
    if (pending) {
      out.push((0x10000 + ((pending - 0xd800) << 10) + (code - 0xdc00)).toString(16));
      pending = 0;
    } else if (code >= 0xd800 && code <= 0xdbff) {
      pending = code;
    } else {
      out.push(code.toString(16));
    }
  }
  return out.join(sep);
}

const ZWJ = String.fromCharCode(0x200d);
const iconFor = (raw) => toCodePoint(raw.indexOf(ZWJ) < 0 ? raw.replace(/️/g, '') : raw);

function sourceFiles(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) sourceFiles(full, acc);
    else if (/\.(ts|html)$/.test(entry.name) && entry.name !== 'emoji-regex.ts') acc.push(full);
  }
  return acc;
}

const used = new Set();
for (const file of sourceFiles(SRC_DIR)) {
  const text = fs.readFileSync(file, 'utf8');
  const re = new RegExp(EMOJI_RE.source, 'g');
  let match;
  while ((match = re.exec(text)) !== null) {
    const icon = iconFor(match[0]);
    if (icon) used.add(icon);
  }
}

fs.mkdirSync(OUT_DIR, { recursive: true });
const present = new Set(
  fs
    .readdirSync(OUT_DIR)
    .filter((f) => f.endsWith('.png'))
    .map((f) => f.replace(/\.png$/, '')),
);

const missing = [...used].filter((c) => !present.has(c));
const unused = [...present].filter((c) => !used.has(c));

console.log(`emoji utilises : ${used.size} | presents : ${present.size}`);

for (const code of missing) {
  const url = `https://cdnjs.cloudflare.com/ajax/libs/twemoji/${VERSION}/72x72/${code}.png`;
  const response = await fetch(url);
  if (!response.ok) {
    console.error(`  echec ${code} (HTTP ${response.status})`);
    process.exitCode = 1;
    continue;
  }
  const buffer = Buffer.from(await response.arrayBuffer());
  fs.writeFileSync(path.join(OUT_DIR, `${code}.png`), buffer);
  console.log(`  ajoute  ${code}.png (${buffer.length} octets)`);
}

for (const code of unused) {
  console.log(`  inutilise : ${code}.png — a supprimer si l'emoji ne revient pas`);
}

if (!missing.length && !unused.length) {
  console.log('  tout est deja synchronise');
}
