import { useRef, useState } from 'react';
import { company, contact, mailtoAll } from '../../data/site';
import submitEnquiry from '../../lib/submitEnquiry';
import Button from '../ui/Button';
import cx from '../../lib/cx';

const EMPTY = { name: '', company: '', email: '', phone: '', projectType: '', budget: '', message: '', website: '' };
const FIELD_ORDER = ['name', 'company', 'email', 'phone', 'projectType', 'budget'];

export function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = 'Enter your full name.';
  if (!v.company.trim()) e.company = 'Enter your company or brand name.';
  if (!v.email.trim()) e.email = 'Enter your email address.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = 'Enter an email address like name@company.com.';
  if (v.phone.trim()) {
    const digits = v.phone.replace(/\D/g, '');
    if (/[^\d\s()+-]/.test(v.phone) || digits.length < 7 || digits.length > 15) e.phone = 'Enter a phone number with 7 to 15 digits.';
  }
  if (!v.projectType) e.projectType = 'Choose the type of project.';
  if (!v.budget) e.budget = 'Choose a budget range, or pick "Not sure yet".';
  // Message is optional: no minimum length.
  return e;
}

const inputBase =
  'mt-2 block h-12 w-full rounded-xl border bg-white px-4 text-[17px] text-navy placeholder:text-navy/35 transition-[border-color,box-shadow] duration-200 focus:outline-none focus:ring-4';

function Field({ id, label, required, error, children, className }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="flex items-baseline justify-between text-[13px] font-medium text-navy/80">
        <span>{label}</span>
        {!required && <span className="font-normal text-navy/45">Optional</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 flex items-center gap-1.5 text-[13px] font-medium text-burgundy">
          <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-2h2zm0-4h-2V7h2z" /></svg>
          {error}
        </p>
      )}
    </div>
  );
}

function ContactRow({ label, children, icon }) {
  return (
    <div className="flex gap-4 border-t border-white/15 py-5">
      <span aria-hidden="true" className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10">
        <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{icon}</svg>
      </span>
      <div className="min-w-0">
        <dt className="text-[13px] text-white/60">{label}</dt>
        <dd className="text-[17px] font-medium">{children}</dd>
      </div>
    </div>
  );
}

export default function Contact() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const successRef = useRef(null);
  const formRef = useRef(null);

  const update = (name, value) => {
    const next = { ...values, [name]: value };
    setValues(next);
    setErrors(validate(next)); // always recompute so no stale error lingers (only touched fields display)
  };
  const onChange = (e) => update(e.target.name, e.target.value);
  const onBlur = (e) => {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors(validate(values));
  };

  const hasError = (name) => touched[name] && errors[name];
  const fieldProps = (name) => ({
    id: `f-${name}`,
    name,
    value: values[name],
    onChange,
    onBlur,
    'aria-invalid': hasError(name) ? true : undefined,
    'aria-describedby': hasError(name) ? `f-${name}-error` : undefined,
    className: cx(inputBase, hasError(name) ? 'border-burgundy focus:ring-burgundy/15' : 'border-navy/15 focus:border-royal focus:ring-royal/15'),
  });
  const err = (name) => (touched[name] ? errors[name] : undefined);

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    setTouched(Object.fromEntries(FIELD_ORDER.map((f) => [f, true])));
    const first = FIELD_ORDER.find((f) => found[f]);
    if (first) {
      formRef.current?.querySelector(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus('submitting');
    try {
      await submitEnquiry(values);
      setStatus('success');
      requestAnimationFrame(() => successRef.current?.focus());
    } catch {
      setStatus('error');
    }
  };

  const reset = () => {
    setValues(EMPTY);
    setErrors({});
    setTouched({});
    setStatus('idle');
  };

  const whatsappHref = `https://wa.me/${company.whatsapp.number}?text=${encodeURIComponent('Hello VR Exhibits, I would like to discuss a project.')}`;

  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-cool py-24 sm:py-32 lg:py-40">
      <div className="container-x">
        <div className="mx-auto max-w-4xl text-center">
          <h2 id="contact-title" className="text-balance text-[clamp(2.75rem,8vw,6.5rem)] font-semibold leading-[1] tracking-[-0.04em]">
            <span className="text-gradient-brand">{contact.heading}</span>
          </h2>
          <p className="mx-auto mt-6 max-w-[40ch] text-pretty text-[17px] leading-relaxed text-navy/65 sm:text-xl">{contact.intro}</p>
        </div>

        <div className="mt-14 grid gap-5 sm:mt-20 lg:grid-cols-12">
          {/* Contact details card */}
          <aside aria-label="Contact details" className="on-dark order-2 rounded-4xl bg-royal p-7 text-white sm:p-10 lg:order-1 lg:col-span-5">
            <p className="text-[13px] text-white/60">Talk directly to</p>
            <p className="mt-1 text-[28px] font-semibold tracking-[-0.02em]">{company.owner.name}</p>
            <p className="text-[15px] text-white/70">{company.owner.title}, {company.name}</p>
            <p className="mt-2 text-[15px] text-white/70">{company.hours}</p>
            <dl className="mt-8">
              <ContactRow label="Phone" icon={<path d="M5 4h3.5l1.7 4.3-2.2 1.4a11 11 0 006.3 6.3l1.4-2.2L20 15.5V19a1.5 1.5 0 01-1.5 1.5A15.5 15.5 0 013.5 5.5 1.5 1.5 0 015 4z" />}>
                <a className="inline-block py-1 hover:underline" href={company.phone.href}>{company.phone.display}</a>
              </ContactRow>
              <ContactRow label="WhatsApp" icon={<path d="M4 20l1.3-4A8.5 8.5 0 1112 20.5a8.4 8.4 0 01-4-1z" />}>
                <a className="inline-block py-1 hover:underline" href={whatsappHref} target="_blank" rel="noopener noreferrer">
                  {company.whatsapp.display}<span className="sr-only"> (opens WhatsApp in a new tab)</span>
                </a>
              </ContactRow>
              <ContactRow label="Email" icon={<><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="M3.5 7l8.5 6 8.5-6" /></>}>
                {company.emails.map((e) => (
                  <a key={e} className="block break-all py-1 hover:underline" href={mailtoAll()}>{e}</a>
                ))}
              </ContactRow>
            </dl>

            {/* One card per office, with its local contact */}
            <div className="mt-2 space-y-3">
              {company.offices.map((office) => (
                <div key={office.id} className="rounded-3xl bg-white/10 p-5 sm:p-6">
                  <p className="flex items-center gap-2 text-[13px] font-medium text-white/65">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0114 0C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>
                    {office.label}
                  </p>
                  <address className="mt-2 text-[15px] not-italic leading-relaxed text-white/85">
                    {office.address.map((line) => <span key={line} className="block">{line}</span>)}
                  </address>
                  {office.contact && (
                    <div className="mt-4 border-t border-white/15 pt-4">
                      <p className="text-[17px] font-semibold tracking-[-0.01em]">{office.contact.name}</p>
                      <p className="text-[13px] text-white/60">{office.contact.title}, {office.label}</p>
                    </div>
                  )}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {office.contact && (
                      <a href={office.contact.phone.href} className="inline-flex h-10 items-center gap-2 rounded-full bg-white px-4 text-[15px] font-medium text-royal transition-colors hover:bg-white/90">
                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 4h3.5l1.7 4.3-2.2 1.4a11 11 0 006.3 6.3l1.4-2.2L20 15.5V19a1.5 1.5 0 01-1.5 1.5A15.5 15.5 0 013.5 5.5 1.5 1.5 0 015 4z" /></svg>
                        <span className="sr-only">Call {office.contact.name}: </span>{office.contact.phone.display}
                      </a>
                    )}
                    {office.contact?.email && (
                      <a href={`mailto:${office.contact.email}`} className="inline-flex h-10 max-w-full items-center rounded-full bg-white/15 px-4 text-[15px] font-medium text-white transition-colors hover:bg-white/25">
                        <span className="sr-only">Email {office.contact.name}: </span><span className="truncate">{office.contact.email}</span>
                      </a>
                    )}
                    <a href={office.mapUrl} target="_blank" rel="noopener noreferrer" className="inline-flex h-10 items-center rounded-full bg-white/15 px-4 text-[15px] font-medium text-white transition-colors hover:bg-white/25">
                      Open in Maps<span className="sr-only">: {office.label} (opens in a new tab)</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </aside>

          {/* Form card */}
          <div className="order-1 rounded-4xl bg-white p-6 shadow-[0_20px_60px_-30px_rgba(16,36,62,0.25)] sm:p-10 lg:order-2 lg:col-span-7 lg:p-12">
            {status === 'success' ? (
              <div role="status" className="flex min-h-[30rem] flex-col items-center justify-center text-center">
                <span aria-hidden="true" className="mb-7 flex h-16 w-16 items-center justify-center rounded-full bg-burgundy text-white">
                  <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
                </span>
                <h3 ref={successRef} tabIndex={-1} className="text-[40px] font-semibold tracking-[-0.03em] text-navy focus:outline-none">
                  {contact.successTitle}
                </h3>
                <p className="mt-3 max-w-[40ch] text-[17px] leading-relaxed text-navy/65">
                  {contact.successText} We will write to <strong className="font-semibold text-navy">{values.email}</strong>.
                </p>
                <div className="mt-8">
                  <Button variant="outline" onClick={reset}>Send another enquiry</Button>
                </div>
              </div>
            ) : (
              <form ref={formRef} onSubmit={onSubmit} noValidate aria-labelledby="form-title">
                <h3 id="form-title" className="text-[28px] font-semibold tracking-[-0.02em] text-navy">Project enquiry</h3>
                <p className="mt-1 text-[15px] text-navy/55">Takes about a minute.</p>

                <div className="mt-8 grid gap-x-5 gap-y-6 sm:grid-cols-2">
                  <Field id="f-name" label="Name" required error={err('name')}>
                    <input type="text" autoComplete="name" placeholder="Your full name" {...fieldProps('name')} />
                  </Field>
                  <Field id="f-company" label="Company" required error={err('company')}>
                    <input type="text" autoComplete="organization" placeholder="Company or brand" {...fieldProps('company')} />
                  </Field>
                  <Field id="f-email" label="Email" required error={err('email')}>
                    <input type="email" autoComplete="email" inputMode="email" placeholder="name@company.com" {...fieldProps('email')} />
                  </Field>
                  <Field id="f-phone" label="Phone" error={err('phone')}>
                    <input type="tel" autoComplete="tel" inputMode="tel" placeholder="+91 98765 43210" {...fieldProps('phone')} />
                  </Field>

                  <fieldset
                    className="sm:col-span-2"
                    aria-invalid={err('projectType') ? true : undefined}
                    aria-describedby={err('projectType') ? 'f-projectType-error' : undefined}
                  >
                    <legend className="text-[13px] font-medium text-navy/80">Project type</legend>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {contact.projectTypes.map((t) => {
                        const checked = values.projectType === t;
                        return (
                          <label
                            key={t}
                            className={cx(
                              'cursor-pointer rounded-full px-4 py-2.5 text-[15px] transition-all duration-200 ease-apple has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-burgundy',
                              checked ? 'bg-royal text-white' : 'bg-cool text-navy/80 hover:bg-royal-50 hover:text-navy'
                            )}
                          >
                            <input
                              type="radio"
                              name="projectType"
                              value={t}
                              checked={checked}
                              onChange={(e) => {
                                setTouched((x) => ({ ...x, projectType: true }));
                                update('projectType', e.target.value);
                              }}
                              className="sr-only"
                            />
                            {t}
                          </label>
                        );
                      })}
                    </div>
                    {err('projectType') && <p id="f-projectType-error" className="mt-2 text-[13px] font-medium text-burgundy">{err('projectType')}</p>}
                  </fieldset>

                  <Field id="f-budget" label="Budget range" required error={err('budget')} className="sm:col-span-2">
                    <div className="relative">
                      <select {...fieldProps('budget')} className={cx(fieldProps('budget').className, 'cursor-pointer appearance-none pr-11', !values.budget && 'text-navy/40')}>
                        <option value="">Select a range</option>
                        {contact.budgets.map((b) => <option key={b} value={b} className="text-navy">{b}</option>)}
                      </select>
                      <svg aria-hidden="true" viewBox="0 0 24 24" className="pointer-events-none absolute right-4 top-1/2 mt-1 h-4 w-4 -translate-y-1/2 text-navy/50" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M6 9l6 6 6-6" /></svg>
                    </div>
                  </Field>

                  <Field id="f-message" label="Project details" error={err('message')} className="sm:col-span-2">
                    <textarea rows={4} placeholder="Event or venue, dates, stand size (anything you'd like to share)" {...fieldProps('message')} className={cx(fieldProps('message').className, 'h-auto resize-y py-3 leading-relaxed')} />
                  </Field>

                  {/* Honeypot for bots: hidden from people and assistive tech */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="f-website">Website</label>
                    <input id="f-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={onChange} />
                  </div>
                </div>

                {status === 'error' && (
                  <p role="alert" className="mt-6 rounded-2xl bg-burgundy-100 px-4 py-3 text-[15px] font-medium text-burgundy-800">
                    The enquiry could not be sent. Check your connection and try again, or email {company.emails[0]}.
                  </p>
                )}

                <div className="mt-8 flex flex-col-reverse items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-center text-[13px] text-navy/50 sm:text-left">We only use your details to reply to this enquiry.</p>
                  <Button type="submit" size="lg" disabled={status === 'submitting'} className="sm:min-w-[11rem]">
                    {status === 'submitting' ? 'Sending…' : 'Send enquiry'}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
