// Storage for the admin portal. On Netlify this is Netlify Blobs (built in, no setup).
// For local testing (LOCAL_BLOBS_DIR set) it uses plain files on disk.
import fs from 'node:fs/promises';
import path from 'node:path';

export async function store(name) {
  const dir = process.env.LOCAL_BLOBS_DIR;
  if (dir) {
    const base = path.join(dir, name);
    await fs.mkdir(base, { recursive: true });
    const file = (k) => path.join(base, encodeURIComponent(k));
    return {
      async get(k, opts = {}) {
        try {
          const buf = await fs.readFile(file(k));
          return opts.type === 'json' ? JSON.parse(buf.toString()) : buf;
        } catch { return null; }
      },
      async getWithMetadata(k) {
        try {
          const data = await fs.readFile(file(k));
          const metadata = JSON.parse(await fs.readFile(file(k) + '.meta').catch(() => '{}'));
          return { data, metadata };
        } catch { return null; }
      },
      async set(k, data, opts = {}) {
        await fs.writeFile(file(k), Buffer.from(data));
        if (opts.metadata) await fs.writeFile(file(k) + '.meta', JSON.stringify(opts.metadata));
      },
      async setJSON(k, v) { await fs.writeFile(file(k), JSON.stringify(v)); },
      async delete(k) { await fs.rm(file(k), { force: true }); },
    };
  }
  const { getStore } = await import('@netlify/blobs');
  return getStore({ name, consistency: 'strong' });
}
