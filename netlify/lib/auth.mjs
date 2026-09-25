// Email + password login for the admin portal.
// The login is set in Netlify: Site configuration -> Environment variables
//   ADMIN_EMAIL, ADMIN_PASSWORD   (required)
import crypto from 'node:crypto';
import { store } from './store.mjs';

const COOKIE = 'vr_admin';
const MAX_AGE = 60 * 60 * 12; // 12 hours
const secret = () => crypto.createHash('sha256').update(`${process.env.ADMIN_PASSWORD || ''}|${process.env.SESSION_SECRET || process.env.SITE_ID || 'vr-exhibits'}`).digest();
const sign = (v) => crypto.createHmac('sha256', secret()).update(v).digest('base64url');
const safeEqual = (a, b) => {
  const x = Buffer.from(String(a)); const y = Buffer.from(String(b));
  return x.length === y.length && crypto.timingSafeEqual(x, y);
};

export const json = (body, status = 200, headers = {}) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store', ...headers } });

export function isConfigured() {
  return Boolean(process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD);
}

export function isLoggedIn(req) {
  const raw = (req.headers.get('cookie') || '').split(/;\s*/).find((c) => c.startsWith(`${COOKIE}=`));
  if (!raw || !isConfigured()) return false;
  const [payload, sig] = raw.slice(COOKIE.length + 1).split('.');
  if (!payload || !sig || !safeEqual(sign(payload), sig)) return false;
  const { exp } = JSON.parse(Buffer.from(payload, 'base64url').toString());
  return Date.now() < exp;
}

export function sessionCookie() {
  const payload = Buffer.from(JSON.stringify({ exp: Date.now() + MAX_AGE * 1000 })).toString('base64url');
  return `${COOKIE}=${payload}.${sign(payload)}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${MAX_AGE}`;
}
export const clearCookie = () => `${COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`;

/** Checks email + password, with a lockout after repeated failures */
export async function checkLogin(email, password, ip) {
  const attempts = await store('admin-attempts');
  const key = crypto.createHash('sha256').update(ip || 'unknown').digest('hex');
  const rec = (await attempts.get(key, { type: 'json' })) || { count: 0, until: 0 };
  if (rec.until > Date.now()) return { ok: false, locked: true };
  const ok = safeEqual(String(email).trim().toLowerCase(), String(process.env.ADMIN_EMAIL).trim().toLowerCase())
    && safeEqual(String(password), String(process.env.ADMIN_PASSWORD));
  if (ok) { await attempts.delete(key); return { ok: true }; }
  rec.count += 1;
  if (rec.count >= 8) { rec.until = Date.now() + 15 * 60 * 1000; rec.count = 0; }
  await attempts.setJSON(key, rec);
  return { ok: false, locked: rec.until > Date.now() };
}

/** Same-site check for write requests (blocks cross-site form posts) */
export function sameOrigin(req) {
  const origin = req.headers.get('origin');
  if (!origin) return true;
  try { return new URL(origin).host === new URL(req.url).host; } catch { return false; }
}
