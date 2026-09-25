// Talks to the Netlify backend (netlify/functions). In the demo preview
// (no backend) everything is simulated in memory.
export const DEMO = import.meta.env.VITE_DEMO_FORM === 'true';
export const DEMO_LOGIN = { email: 'demo@vrexhibits.com', password: 'demo1234' };

let demoState = { loggedIn: false, content: {} };
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function call(path, options = {}) {
  const res = await fetch(path, { credentials: 'same-origin', ...options });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Something went wrong (${res.status}). Please try again.`);
  return data;
}

export async function getSession() {
  if (DEMO) return { loggedIn: demoState.loggedIn, configured: true };
  return call('/api/session');
}

export async function login(email, password) {
  if (DEMO) {
    await wait(500);
    if (email.trim().toLowerCase() !== DEMO_LOGIN.email || password !== DEMO_LOGIN.password) throw new Error('That email or password is not correct.');
    demoState.loggedIn = true;
    return { ok: true };
  }
  return call('/api/session', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ email, password }) });
}

export async function logout() {
  if (DEMO) { demoState.loggedIn = false; return; }
  await call('/api/session', { method: 'DELETE' }).catch(() => {});
}

export async function loadContent() {
  if (DEMO) return demoState.content;
  return call('/api/content');
}

export async function saveContent(content) {
  if (DEMO) { await wait(700); demoState.content = content; return { ok: true, rebuilding: true }; }
  return call('/api/content', { method: 'PUT', headers: { 'content-type': 'application/json' }, body: JSON.stringify(content) });
}

export async function uploadImage(blob) {
  if (DEMO) { await wait(400); return { url: URL.createObjectURL(blob) }; }
  return call('/api/upload', { method: 'POST', headers: { 'content-type': blob.type }, body: blob });
}
