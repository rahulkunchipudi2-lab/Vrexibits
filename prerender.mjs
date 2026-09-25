// Injects the pre-rendered page into dist/index.html and preloads the main font.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');

const { render } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);
let html = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
html = html.replace('<!--app-html-->', render());

const assets = fs.existsSync(path.join(dist, 'assets')) ? fs.readdirSync(path.join(dist, 'assets')) : [];
const font = assets.find((f) => /^__no_font_preload__$/ /* Apple devices use the system font; don't force a download */.test(f));
if (font) {
  html = html.replace(
    '<!-- Font is self-hosted; the build adds a preload for it -->',
    `<link rel="preload" href="/assets/${font}" as="font" type="font/woff2" crossorigin />`
  );
}

// Inline the stylesheet: saves a render-blocking round trip (CSS is ~8 KB gzipped).
html = html.replace(/<link rel="stylesheet" crossorigin href="\/assets\/([^"]+\.css)">/, (_, file) => {
  const css = fs.readFileSync(path.join(dist, 'assets', file), 'utf8').replace(/url\(\/assets\//g, 'url(/assets/');
  return `<style>${css}</style>`;
});

fs.writeFileSync(path.join(dist, 'index.html'), html);
fs.rmSync(ssrDir, { recursive: true, force: true });
console.log('Pre-rendered dist/index.html' + (font ? ` (preloading ${font})` : ''));
