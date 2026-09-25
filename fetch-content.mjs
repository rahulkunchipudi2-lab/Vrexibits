// Runs before each Netlify build: downloads the admin's saved content from the
// live site so the new build (and its pre-rendered HTML) includes it.
import fs from 'node:fs';
const out = new URL('../src/data/content.json', import.meta.url);
const base = process.env.CONTENT_SOURCE_URL || process.env.URL;
let content = {};
if (base) {
  try {
    const res = await fetch(new URL('/api/content', base), { headers: { accept: 'application/json' } });
    if (res.ok) content = await res.json();
    console.log(`Admin content: ${res.ok ? `loaded (updated ${content.updatedAt || 'never'})` : `none yet (${res.status})`}`);
  } catch (e) {
    console.log('Admin content: not available yet, using built-in defaults.');
  }
} else {
  console.log('Admin content: no site URL (local build), using built-in defaults.');
}
fs.writeFileSync(out, JSON.stringify(content || {}, null, 2));
