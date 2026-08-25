/**
 * Regenere src/styles/fontawesome.css et public/assets/webfonts a partir du
 * paquet @fortawesome/fontawesome-free (dependance de developpement).
 *
 *     node scripts/sync-fontawesome.mjs
 *
 * Pourquoi ne pas pointer directement sur node_modules dans angular.json :
 * la feuille officielle declare cinq formats de police (eot, svg, ttf, woff,
 * woff2). Angular copie alors 2,9 Mo dans le bundle, alors que le woff2 seul
 * (172 Ko) couvre tous les navigateurs vises par le projet.
 */
import fs from 'node:fs';
import path from 'node:path';

const PKG = 'node_modules/@fortawesome/fontawesome-free';
const CSS_OUT = 'src/styles/fontawesome.css';
const FONT_OUT = 'public/assets/webfonts';
const FACES = ['fa-brands-400', 'fa-regular-400', 'fa-solid-900'];

if (!fs.existsSync(PKG)) {
  console.error(`${PKG} introuvable — lancer d'abord : npm install`);
  process.exit(1);
}

const version = JSON.parse(fs.readFileSync(path.join(PKG, 'package.json'), 'utf8')).version;
const css = fs.readFileSync(path.join(PKG, 'css/all.min.css'), 'utf8');

const trimmed = css.replace(/@font-face\{[^}]*\}/g, (block) => {
  const found = FACES.find((name) => block.includes(`${name}.woff2`));
  if (!found) return block;
  return block
    .replace(/src:url\([^)]*\);/g, '')
    .replace(
      /src:url\([^}]*?\)\s*format\("woff2"\)[^};]*;?/,
      `src:url(/assets/webfonts/${found}.woff2) format("woff2");`,
    );
});

const header =
  `/* Font Awesome ${version} (SIL OFL 1.1 / MIT / CC BY 4.0) — fontawesome.com\n` +
  `   Copie depuis @fortawesome/fontawesome-free, sources reduites au woff2 :\n` +
  `   les formats eot/svg/ttf/woff ne visent que des navigateurs disparus et\n` +
  `   pesaient 2,7 Mo dans le bundle. Regenerer avec scripts/sync-fontawesome.mjs. */\n`;

fs.writeFileSync(CSS_OUT, header + trimmed);
fs.mkdirSync(FONT_OUT, { recursive: true });
let total = 0;
for (const name of FACES) {
  const from = path.join(PKG, 'webfonts', `${name}.woff2`);
  const to = path.join(FONT_OUT, `${name}.woff2`);
  fs.copyFileSync(from, to);
  const size = fs.statSync(to).size;
  total += size;
  console.log(`  ${name}.woff2  ${Math.round(size / 1024)} Ko`);
}

const leftovers = trimmed.match(/format\("(woff|truetype|embedded-opentype|svg)"\)/g);
if (leftovers) {
  console.error(`  attention : ${leftovers.length} source(s) non-woff2 subsistent`);
  process.exitCode = 1;
}
console.log(`Font Awesome ${version} synchronise — ${Math.round(total / 1024)} Ko de polices`);
