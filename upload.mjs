import crypto from 'node:crypto';
import { json, isLoggedIn, sameOrigin } from '../lib/auth.mjs';
import { store } from '../lib/store.mjs';

const TYPES = { 'image/webp': 'webp', 'image/jpeg': 'jpg', 'image/png': 'png' };

// POST an image (admin only). The browser shrinks photos before upload.
export default async (req) => {
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
  if (!sameOrigin(req) || !isLoggedIn(req)) return json({ error: 'Please log in again.' }, 401);
  const type = (req.headers.get('content-type') || '').split(';')[0];
  if (!TYPES[type]) return json({ error: 'Please upload a JPG, PNG or WebP image.' }, 415);
  const data = await req.arrayBuffer();
  if (data.byteLength > 4.5 * 1024 * 1024) return json({ error: 'That image is too large (max 4.5 MB).' }, 413);
  const key = `${Date.now().toString(36)}-${crypto.randomBytes(6).toString('hex')}.${TYPES[type]}`;
  await (await store('site-images')).set(key, data, { metadata: { type } });
  return json({ url: `/api/img/${key}` });
};

export const config = { path: '/api/upload' };
