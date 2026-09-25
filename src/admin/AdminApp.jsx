import { useEffect, useRef, useState } from 'preact/hooks';
import { toEditable, resolveImage, resolveLogo, workFilters } from '../data/site';
import * as api from './api';
import { prepareImage } from './image';

/* ------------------------------------------------------------------ */
/* Small building blocks                                               */
/* ------------------------------------------------------------------ */
const cx = (...c) => c.filter(Boolean).join(' ');
const inputCls = 'mt-1.5 block w-full rounded-xl border border-navy/15 bg-white px-3.5 py-2.5 text-[15px] text-navy placeholder:text-navy/35 focus:border-royal focus:outline-none focus:ring-4 focus:ring-royal/15';

function Text({ label, value, onInput, multiline, placeholder, hint, type = 'text' }) {
  const Tag = multiline ? 'textarea' : 'input';
  return (
    <label className="block">
      <span className="text-[13px] font-medium text-navy/75">{label}</span>
      <Tag
        type={multiline ? undefined : type}
        rows={multiline ? (typeof multiline === 'number' ? multiline : 3) : undefined}
        className={cx(inputCls, multiline && 'resize-y leading-relaxed')}
        value={value ?? ''}
        placeholder={placeholder}
        onInput={(e) => onInput(e.currentTarget.value)}
      />
      {hint && <span className="mt-1 block text-[12px] text-navy/50">{hint}</span>}
    </label>
  );
}

function Btn({ children, onClick, kind = 'plain', disabled, type = 'button', className, title }) {
  const k = {
    primary: 'bg-burgundy text-white hover:bg-burgundy-600',
    blue: 'bg-royal text-white hover:bg-royal-700',
    plain: 'bg-white text-navy ring-1 ring-inset ring-navy/15 hover:bg-cool',
    danger: 'bg-white text-burgundy ring-1 ring-inset ring-burgundy/30 hover:bg-burgundy-100',
    ghost: 'text-navy/70 hover:bg-white hover:text-navy',
  }[kind];
  return (
    <button type={type} title={title} disabled={disabled} onClick={onClick}
      className={cx('inline-flex h-10 items-center justify-center gap-2 rounded-full px-4 text-[14px] font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50', k, className)}>
      {children}
    </button>
  );
}

function Card({ title, subtitle, children, actions }) {
  return (
    <section className="rounded-3xl bg-white p-5 shadow-[0_1px_2px_rgba(16,36,62,0.06)] sm:p-7">
      {(title || actions) && (
        <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
          <div>
            {title && <h2 className="text-[19px] font-semibold tracking-[-0.01em] text-navy">{title}</h2>}
            {subtitle && <p className="mt-1 text-[14px] text-navy/55">{subtitle}</p>}
          </div>
          {actions}
        </div>
      )}
      {children}
    </section>
  );
}

/** Photo / logo picker with preview, upload and shrink */
function ImagePicker({ label, src, onUploaded, kind = 'photo', alt, onAlt, tall }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const input = useRef(null);
  const pick = async (e) => {
    const file = e.currentTarget.files?.[0];
    e.currentTarget.value = '';
    if (!file) return;
    setErr(''); setBusy(true);
    try {
      const blob = await prepareImage(file, kind);
      const { url } = await api.uploadImage(blob);
      onUploaded(url);
    } catch (x) { setErr(x.message || 'Upload failed. Please try again.'); }
    setBusy(false);
  };
  return (
    <div>
      {label && <span className="text-[13px] font-medium text-navy/75">{label}</span>}
      <div className={cx('relative mt-1.5 overflow-hidden rounded-2xl bg-cool ring-1 ring-inset ring-navy/10', kind === 'logo' ? 'flex h-28 items-center justify-center p-4' : tall ? 'aspect-[4/3]' : 'aspect-[16/9]')}>
        {src ? <img src={src} alt="" className={kind === 'logo' ? 'max-h-full max-w-full object-contain' : 'h-full w-full object-cover'} /> : <span className="flex h-full items-center justify-center text-[13px] text-navy/40">No image yet</span>}
        {busy && <div className="absolute inset-0 flex items-center justify-center bg-white/70 text-[14px] font-medium text-navy">Uploading…</div>}
      </div>
      <div className="mt-2.5 flex flex-wrap items-center gap-2">
        <input ref={input} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={pick} />
        <Btn kind="blue" disabled={busy} onClick={() => input.current?.click()}>
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 16V4M7 9l5-5 5 5M4 20h16" /></svg>
          {src ? 'Replace' : 'Upload'} {kind === 'logo' ? 'logo' : 'photo'}
        </Btn>
      </div>
      {onAlt && <div className="mt-3"><Text label="Describe this photo (for Google & accessibility)" value={alt} onInput={onAlt} placeholder="e.g. Blue exhibition stand with lounge seating" /></div>}
      {err && <p className="mt-2 text-[13px] font-medium text-burgundy">{err}</p>}
    </div>
  );
}

const move = (arr, i, d) => {
  const j = i + d;
  if (j < 0 || j >= arr.length) return arr;
  const next = [...arr]; [next[i], next[j]] = [next[j], next[i]]; return next;
};

function RowTools({ i, count, onMove, onDelete, what }) {
  return (
    <div className="flex items-center gap-1">
      <Btn kind="ghost" className="h-9 w-9 px-0" title="Move up" disabled={i === 0} onClick={() => onMove(-1)}>↑</Btn>
      <Btn kind="ghost" className="h-9 w-9 px-0" title="Move down" disabled={i === count - 1} onClick={() => onMove(1)}>↓</Btn>
      <Btn kind="danger" className="h-9" onClick={() => { if (confirm(`Remove this ${what}?`)) onDelete(); }}>Remove</Btn>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Sections                                                            */
/* ------------------------------------------------------------------ */
function PhotosSection({ c, set }) {
  const up = (path, v) => set((d) => { const n = structuredClone(d); path(n, v); return n; });
  return (
    <div className="space-y-5">
      <Card title="Main photo & headline" subtitle="The first thing visitors see, filling the whole screen.">
        <div className="grid gap-6 lg:grid-cols-2">
          <ImagePicker src={resolveImage(c.hero.image)} alt={c.hero.image.alt}
            onUploaded={(url) => up((n) => { n.hero.image = { url, alt: '' }; })}
            onAlt={(v) => up((n) => { n.hero.image.alt = v; })} />
          <div className="space-y-4">
            <Text label="Headline" value={c.hero.statement} onInput={(v) => up((n) => { n.hero.statement = v; })} multiline={2} />
            <Text label="Short introduction" value={c.hero.intro} onInput={(v) => up((n) => { n.hero.intro = v; })} multiline={3} />
          </div>
        </div>
      </Card>
      <Card title="About section photos" subtitle="Two photos shown side by side under “About the studio”.">
        <div className="grid gap-6 sm:grid-cols-2">
          {c.brand.images.map((img, i) => (
            <ImagePicker key={i} label={i === 0 ? 'Left photo (larger)' : 'Right photo'} tall src={resolveImage(img)} alt={img.alt}
              onUploaded={(url) => up((n) => { n.brand.images[i] = { url, alt: '' }; })}
              onAlt={(v) => up((n) => { n.brand.images[i].alt = v; })} />
          ))}
        </div>
        <div className="mt-5"><Text label="About heading" value={c.brand.heading} onInput={(v) => up((n) => { n.brand.heading = v; })} multiline={2} /></div>
      </Card>
      <Card title="Large image band" subtitle="The big rounded photo with text, below the About section.">
        <div className="grid gap-6 lg:grid-cols-2">
          <ImagePicker src={resolveImage(c.showcase.image)} alt={c.showcase.image.alt}
            onUploaded={(url) => up((n) => { n.showcase.image = { url, alt: '' }; })}
            onAlt={(v) => up((n) => { n.showcase.image.alt = v; })} />
          <div className="space-y-4">
            <Text label="Heading" value={c.showcase.heading} onInput={(v) => up((n) => { n.showcase.heading = v; })} multiline={2} />
            <Text label="Text" value={c.showcase.text} onInput={(v) => up((n) => { n.showcase.text = v; })} multiline={3} />
          </div>
        </div>
      </Card>
    </div>
  );
}

const LAYOUTS = [['full', 'Full width (large)'], ['broad', 'Wide'], ['side', 'Standard'], ['wide', 'Extra wide'], ['tall', 'Tall']];

function ProjectsSection({ c, set }) {
  const list = c.projects;
  const setList = (fn) => set((d) => ({ ...d, projects: fn(d.projects) }));
  const edit = (i, patch) => setList((l) => l.map((p, j) => (j === i ? { ...p, ...patch } : p)));
  const add = () => setList((l) => [...l, { id: `project-${Date.now()}`, name: '', industry: '', location: '', year: new Date().getFullYear(), service: 'Exhibition', layout: 'side', image: { url: '', alt: '' } }]);
  return (
    <div className="space-y-5">
      <Card title={`Projects (${list.length})`} subtitle="Shown in “Selected work”. The first 6 appear first; visitors can view the rest." actions={<Btn kind="blue" onClick={add}>+ Add project</Btn>}>
        <p className="text-[13px] text-navy/55">Tip: new projects are added at the bottom. Use ↑ to move them up.</p>
      </Card>
      {list.map((p, i) => (
        <Card key={p.id} title={p.name || 'New project'} subtitle={`Project ${i + 1}`}
          actions={<RowTools i={i} count={list.length} what="project" onMove={(d) => setList((l) => move(l, i, d))} onDelete={() => setList((l) => l.filter((_, j) => j !== i))} />}>
          <div className="grid gap-6 lg:grid-cols-2">
            <ImagePicker src={resolveImage(p.image)} alt={p.image?.alt}
              onUploaded={(url) => edit(i, { image: { url, alt: '' } })}
              onAlt={(v) => edit(i, { image: { ...p.image, alt: v } })} />
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2"><Text label="Project / client name" value={p.name} onInput={(v) => edit(i, { name: v })} placeholder="e.g. Eirich" /></div>
              <Text label="Industry" value={p.industry} onInput={(v) => edit(i, { industry: v })} placeholder="e.g. Automotive" />
              <Text label="City" value={p.location} onInput={(v) => edit(i, { location: v })} placeholder="e.g. Mumbai" />
              <Text label="Year" value={p.year} onInput={(v) => edit(i, { year: v })} placeholder="e.g. 2025" />
              <label className="block">
                <span className="text-[13px] font-medium text-navy/75">Service</span>
                <select className={inputCls} value={p.service} onChange={(e) => edit(i, { service: e.currentTarget.value })}>
                  {workFilters.filter((f) => f !== 'All').map((f) => <option key={f}>{f}</option>)}
                </select>
              </label>
              <label className="block sm:col-span-2">
                <span className="text-[13px] font-medium text-navy/75">Tile size on the website</span>
                <select className={inputCls} value={p.layout} onChange={(e) => edit(i, { layout: e.currentTarget.value })}>
                  {LAYOUTS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
              </label>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function ClientsSection({ c, set }) {
  const list = c.clients;
  const setList = (fn) => set((d) => ({ ...d, clients: fn(d.clients) }));
  const edit = (i, patch) => setList((l) => l.map((x, j) => (j === i ? { ...x, ...patch } : x)));
  const sectors = [...new Set(list.map((x) => x.sector).filter(Boolean))];
  return (
    <div className="space-y-5">
      <Card title={`Client logos (${list.length})`} subtitle="These slide across the middle of the website. Logos with a white or transparent background look best."
        actions={<Btn kind="blue" onClick={() => setList((l) => [{ name: '', sector: sectors[0] || '', logo: '' }, ...l])}>+ Add client</Btn>}>
        <datalist id="sectors">{sectors.map((s) => <option key={s} value={s} />)}</datalist>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {list.map((x, i) => (
            <div key={`${i}-${x.name}`} className="rounded-2xl bg-cool p-4">
              <ImagePicker kind="logo" src={resolveLogo(x.logo)} onUploaded={(url) => edit(i, { logo: url })} />
              <div className="mt-3 space-y-3">
                <Text label="Company name" value={x.name} onInput={(v) => edit(i, { name: v })} />
                <label className="block">
                  <span className="text-[13px] font-medium text-navy/75">Industry</span>
                  <input list="sectors" className={inputCls} value={x.sector} onInput={(e) => edit(i, { sector: e.currentTarget.value })} />
                </label>
              </div>
              <div className="mt-3"><RowTools i={i} count={list.length} what="client" onMove={(d) => setList((l) => move(l, i, d))} onDelete={() => setList((l) => l.filter((_, j) => j !== i))} /></div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function ContactSection({ c, set }) {
  const k = c.company;
  const up = (fn) => set((d) => { const n = structuredClone(d); fn(n.company); return n; });
  return (
    <div className="space-y-5">
      <Card title="Main contact">
        <div className="grid gap-4 sm:grid-cols-2">
          <Text label="Owner name" value={k.owner.name} onInput={(v) => up((n) => { n.owner.name = v; })} />
          <Text label="Owner title" value={k.owner.title} onInput={(v) => up((n) => { n.owner.title = v; })} />
          <Text label="Main phone" value={k.phone} onInput={(v) => up((n) => { n.phone = v; })} placeholder="+91 94485 53301" />
          <Text label="WhatsApp number" value={k.whatsapp} onInput={(v) => up((n) => { n.whatsapp = v; })} placeholder="+91 94485 53301" />
          <Text label="Opening hours" value={k.hours} onInput={(v) => up((n) => { n.hours = v; })} />
          <Text label="Enquiry email(s)" value={k.emails.join(', ')} onInput={(v) => up((n) => { n.emails = v.split(',').map((s) => s.trim()); })}
            hint="Website enquiries are emailed here. Separate several with commas. A new first address needs a one-time FormSubmit activation." />
        </div>
      </Card>
      <Card title={`Offices (${k.offices.length})`} actions={<Btn kind="blue" onClick={() => up((n) => { n.offices.push({ label: 'New office', address: '', contact: { name: '', title: 'Manager', phone: '', email: '' } }); })}>+ Add office</Btn>}>
        <div className="space-y-4">
          {k.offices.map((o, i) => (
            <div key={i} className="rounded-2xl bg-cool p-4 sm:p-5">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <p className="text-[16px] font-semibold text-navy">{o.label || 'Office'}</p>
                <RowTools i={i} count={k.offices.length} what="office"
                  onMove={(d) => up((n) => { n.offices = move(n.offices, i, d); })}
                  onDelete={() => up((n) => { n.offices.splice(i, 1); })} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Text label="Office name" value={o.label} onInput={(v) => up((n) => { n.offices[i].label = v; })} placeholder="e.g. Pune office" />
                <Text label="Address (one line per row)" value={o.address} multiline={4} onInput={(v) => up((n) => { n.offices[i].address = v; })} />
                <Text label="Contact person" value={o.contact.name} onInput={(v) => up((n) => { n.offices[i].contact.name = v; })} />
                <Text label="Their title" value={o.contact.title} onInput={(v) => up((n) => { n.offices[i].contact.title = v; })} />
                <Text label="Their phone" value={o.contact.phone} onInput={(v) => up((n) => { n.offices[i].contact.phone = v; })} />
                <Text label="Their email" type="email" value={o.contact.email} onInput={(v) => up((n) => { n.offices[i].contact.email = v; })} />
              </div>
            </div>
          ))}
        </div>
      </Card>
      <Card title="Social media" subtitle="Paste the full link to each profile. Leave empty to hide.">
        <div className="grid gap-4 sm:grid-cols-2">
          {k.social.map((s, i) => (
            <Text key={s.label} label={s.label} value={s.href} placeholder={`https://www.${s.label.toLowerCase()}.com/yourpage`} onInput={(v) => up((n) => { n.social[i].href = v.trim(); })} />
          ))}
        </div>
      </Card>
    </div>
  );
}

function NumbersSection({ c, set }) {
  const up = (fn) => set((d) => { const n = structuredClone(d); fn(n.impact); return n; });
  return (
    <Card title="Company numbers" subtitle="The large statistics band. Only switch it on once the numbers are correct.">
      <label className="mb-6 flex cursor-pointer items-center gap-3 rounded-2xl bg-cool p-4">
        <input type="checkbox" className="h-5 w-5 accent-[#741F3D]" checked={c.impact.show} onChange={(e) => up((n) => { n.show = e.currentTarget.checked; })} />
        <span className="text-[15px] font-medium text-navy">Show the numbers section on the website</span>
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        {c.impact.stats.map((s, i) => (
          <div key={i} className="grid grid-cols-[1fr_5rem] gap-3 rounded-2xl bg-cool p-4">
            <div className="col-span-2"><Text label="Label" value={s.label} onInput={(v) => up((n) => { n.stats[i].label = v; })} /></div>
            <Text label="Number" type="number" value={s.value} onInput={(v) => up((n) => { n.stats[i].value = v; })} />
            <Text label="After" value={s.suffix} placeholder="+ or %" onInput={(v) => up((n) => { n.stats[i].suffix = v; })} />
          </div>
        ))}
      </div>
    </Card>
  );
}

const SECTIONS = [
  ['photos', 'Photos & text', PhotosSection],
  ['projects', 'Projects', ProjectsSection],
  ['clients', 'Client logos', ClientsSection],
  ['contact', 'Contact & offices', ContactSection],
  ['numbers', 'Numbers', NumbersSection],
];

/* ------------------------------------------------------------------ */
/* Login                                                               */
/* ------------------------------------------------------------------ */
function Login({ onDone, configured }) {
  const [email, setEmail] = useState(api.DEMO ? api.DEMO_LOGIN.email : '');
  const [password, setPassword] = useState(api.DEMO ? api.DEMO_LOGIN.password : '');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const submit = async (e) => {
    e.preventDefault(); setErr(''); setBusy(true);
    try { await api.login(email, password); onDone(); } catch (x) { setErr(x.message); }
    setBusy(false);
  };
  return (
    <main className="flex min-h-[100svh] items-center justify-center px-5 py-12">
      <form onSubmit={submit} className="w-full max-w-sm rounded-4xl bg-white p-8 shadow-[0_30px_80px_-40px_rgba(16,36,62,0.35)] sm:p-10">
        <div className="flex items-center gap-2.5">
          <svg viewBox="0 0 64 64" className="h-9 w-9" aria-hidden="true"><rect width="64" height="64" rx="15" fill="#123B70" /><rect x="42" y="12" width="9" height="40" rx="2" fill="#741F3D" /><path d="M12 16h7l7 22 7-22h7L30 48h-8z" fill="#fff" /></svg>
          <span className="text-[17px] font-semibold tracking-[-0.02em] text-navy">VR Exhibits</span>
        </div>
        <h1 className="mt-8 text-[28px] font-semibold tracking-[-0.02em] text-navy">Admin sign in</h1>
        <p className="mt-1 text-[15px] text-navy/55">Update photos, projects and contact details.</p>
        {!configured && <p className="mt-5 rounded-2xl bg-burgundy-100 p-3 text-[13px] text-burgundy-800">The admin login is not set up yet. Follow Part C of the setup guide (ADMIN_EMAIL and ADMIN_PASSWORD).</p>}
        {api.DEMO && <p className="mt-5 rounded-2xl bg-royal-50 p-3 text-[13px] text-royal">Demo preview: the login is filled in for you. Changes here are not saved.</p>}
        <div className="mt-6 space-y-4">
          <Text label="Email" type="email" value={email} onInput={setEmail} />
          <Text label="Password" type="password" value={password} onInput={setPassword} />
        </div>
        {err && <p role="alert" className="mt-4 text-[14px] font-medium text-burgundy">{err}</p>}
        <Btn type="submit" kind="primary" disabled={busy || !email || !password} className="mt-6 h-12 w-full text-[16px]">{busy ? 'Signing in…' : 'Sign in'}</Btn>
      </form>
    </main>
  );
}

/* ------------------------------------------------------------------ */
/* App                                                                 */
/* ------------------------------------------------------------------ */
export default function AdminApp() {
  const [session, setSession] = useState(null);
  const [content, setContent] = useState(null);
  const [saved, setSaved] = useState('');
  const [tab, setTab] = useState('photos');
  const [status, setStatus] = useState({ kind: '', text: '' });
  const [saving, setSaving] = useState(false);

  const refresh = () => api.getSession().then(setSession).catch(() => setSession({ loggedIn: false, configured: true }));
  useEffect(() => { refresh(); }, []);

  useEffect(() => {
    if (!session?.loggedIn) return;
    api.loadContent().then((stored) => {
      const base = toEditable();
      const merged = { ...base, ...(stored || {}) };
      delete merged.updatedAt;
      setContent(merged);
      setSaved(JSON.stringify(merged));
    }).catch((e) => setStatus({ kind: 'error', text: e.message }));
  }, [session?.loggedIn]);

  const dirty = content && JSON.stringify(content) !== saved;
  useEffect(() => {
    const warn = (e) => { if (dirty) { e.preventDefault(); e.returnValue = ''; } };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  const publish = async () => {
    setSaving(true); setStatus({ kind: '', text: '' });
    try {
      const r = await api.saveContent(content);
      setSaved(JSON.stringify(content));
      setStatus({ kind: 'ok', text: r.rebuilding ? 'Published! Your website will show the changes in about 2 minutes.' : 'Saved. The website will show it after the next deploy (the build hook is not set up yet, see Part C step 3 of the guide).' });
    } catch (e) {
      setStatus({ kind: 'error', text: e.message });
      if (/log in/i.test(e.message)) refresh();
    }
    setSaving(false);
  };

  if (!session) return <div className="flex min-h-[100svh] items-center justify-center text-navy/50">Loading…</div>;
  if (!session.loggedIn) return <Login configured={session.configured} onDone={refresh} />;
  if (!content) return <div className="flex min-h-[100svh] items-center justify-center text-navy/50">{status.text || 'Loading your website content…'}</div>;

  const Section = SECTIONS.find((s) => s[0] === tab)[2];

  return (
    <div className="min-h-[100svh] pb-32">
      <header className="glass-light sticky top-0 z-20 border-b border-navy/10">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
          <div className="flex items-center gap-2.5">
            <svg viewBox="0 0 64 64" className="h-8 w-8" aria-hidden="true"><rect width="64" height="64" rx="15" fill="#123B70" /><rect x="42" y="12" width="9" height="40" rx="2" fill="#741F3D" /><path d="M12 16h7l7 22 7-22h7L30 48h-8z" fill="#fff" /></svg>
            <span className="text-[16px] font-semibold tracking-[-0.01em] text-navy">Admin</span>
          </div>
          <div className="flex items-center gap-1">
            <a href="/" target="_blank" rel="noopener" className="inline-flex h-9 items-center rounded-full px-3 text-[14px] text-navy/70 hover:bg-white hover:text-navy">View website ↗</a>
            <Btn kind="ghost" className="h-9" onClick={async () => { if (!dirty || confirm('You have unpublished changes. Log out anyway?')) { await api.logout(); refresh(); } }}>Log out</Btn>
          </div>
        </div>
        <nav className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 pb-2 sm:px-6" aria-label="Admin sections">
          {SECTIONS.map(([id, label]) => (
            <button key={id} type="button" onClick={() => { setTab(id); window.scrollTo({ top: 0 }); }}
              className={cx('h-9 shrink-0 rounded-full px-4 text-[14px] font-medium transition-colors', tab === id ? 'bg-royal text-white' : 'text-navy/70 hover:bg-white')}>
              {label}
            </button>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
        <Section c={content} set={setContent} />
      </main>

      {/* Publish bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 px-4 pb-4 sm:px-6" style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
        <div className="glass-light mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 rounded-3xl p-3 pl-5 shadow-[0_20px_50px_-20px_rgba(16,36,62,0.4)] ring-1 ring-navy/10">
          <p className={cx('text-[14px]', status.kind === 'error' ? 'font-medium text-burgundy' : status.kind === 'ok' ? 'font-medium text-royal' : 'text-navy/60')} role="status">
            {status.text || (dirty ? 'You have unpublished changes.' : 'Everything is published.')}
          </p>
          <div className="flex gap-2">
            {dirty && <Btn onClick={() => { if (confirm('Discard all unpublished changes?')) setContent(JSON.parse(saved)); }}>Discard</Btn>}
            <Btn kind="primary" disabled={!dirty || saving} onClick={publish} className="h-11 px-6">{saving ? 'Publishing…' : 'Publish changes'}</Btn>
          </div>
        </div>
      </div>
    </div>
  );
}
