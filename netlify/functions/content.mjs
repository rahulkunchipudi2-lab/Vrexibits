import { json, isLoggedIn, sameOrigin } from '../lib/auth.mjs';
import { store } from '../lib/store.mjs';

// GET: the saved site content (public; it is what the website shows).
// PUT: save new content (admin only), then rebuild the website.
export default async (req) => {
  const s = await store('site-content');
  if (req.method === 'GET') {
    const content = (await s.get('content', { type: 'json' })) || {};
    return json(content);
  }
  if (req.method === 'PUT') {
    if (!sameOrigin(req) || !isLoggedIn(req)) return json({ error: 'Please log in again.' }, 401);
    const text = await req.text();
    if (text.length > 900_000) return json({ error: 'Content is too large.' }, 413);
    let content;
    try { content = JSON.parse(text); } catch { return json({ error: 'Invalid content.' }, 400); }
    content.updatedAt = new Date().toISOString();
    await s.setJSON('content', content);
    // Keep a short history so a mistake can be undone
    const history = (await s.get('history', { type: 'json' })) || [];
    history.unshift(content);
    await s.setJSON('history', history.slice(0, 10));

    let rebuilding = false;
    if (process.env.BUILD_HOOK_URL) {
      const r = await fetch(process.env.BUILD_HOOK_URL, { method: 'POST' }).catch(() => null);
      rebuilding = Boolean(r?.ok);
    }
    return json({ ok: true, updatedAt: content.updatedAt, rebuilding });
  }
  return json({ error: 'Method not allowed' }, 405);
};

export const config = { path: '/api/content' };
