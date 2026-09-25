import { json, isConfigured, isLoggedIn, checkLogin, sessionCookie, clearCookie, sameOrigin } from '../lib/auth.mjs';

export default async (req, context) => {
  if (req.method === 'GET') return json({ loggedIn: isLoggedIn(req), configured: isConfigured() });
  if (!sameOrigin(req)) return json({ error: 'Forbidden' }, 403);
  if (req.method === 'DELETE') return json({ ok: true }, 200, { 'set-cookie': clearCookie() });
  if (req.method === 'POST') {
    if (!isConfigured()) return json({ error: 'The admin login has not been set up yet (ADMIN_EMAIL and ADMIN_PASSWORD).' }, 503);
    const { email = '', password = '' } = await req.json().catch(() => ({}));
    const result = await checkLogin(email, password, context?.ip || req.headers.get('x-nf-client-connection-ip'));
    if (result.locked) return json({ error: 'Too many attempts. Please wait 15 minutes and try again.' }, 429);
    if (!result.ok) return json({ error: 'That email or password is not correct.' }, 401);
    return json({ ok: true }, 200, { 'set-cookie': sessionCookie() });
  }
  return json({ error: 'Method not allowed' }, 405);
};

export const config = { path: '/api/session' };
