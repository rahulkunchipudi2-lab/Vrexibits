import { store } from '../lib/store.mjs';

// Serves uploaded images. Keys are unique, so they can be cached for a year.
export default async (req, context) => {
  const key = context?.params?.key || new URL(req.url).pathname.split('/').pop();
  if (!/^[a-z0-9-]+\.(webp|jpg|png)$/.test(key)) return new Response('Not found', { status: 404 });
  const hit = await (await store('site-images')).getWithMetadata(key, { type: 'arrayBuffer' });
  if (!hit) return new Response('Not found', { status: 404 });
  return new Response(hit.data, {
    headers: { 'content-type': hit.metadata?.type || 'image/webp', 'cache-control': 'public, max-age=31536000, immutable' },
  });
};

export const config = { path: '/api/img/:key' };
