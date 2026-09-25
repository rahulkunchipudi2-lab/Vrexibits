import { company, capabilities, navigation, footer, hero, mailtoAll } from '../../data/site';
import Logo from '../ui/Logo';
import Button from '../ui/Button';

const linkClass = 'inline-block rounded py-1 text-white/70 transition-colors duration-300 hover:text-white hover:underline hover:decoration-burgundy-600 hover:decoration-2 hover:underline-offset-4';

export default function Footer() {
  const year = new Date().getFullYear();
  const socials = company.social.filter((s) => s.href);
  return (
    <footer className="on-dark bg-royal text-white" aria-labelledby="footer-title">
      <h2 id="footer-title" className="sr-only">Site footer</h2>
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-8 border-b border-white/15 py-14 sm:flex-row sm:items-center">
          <div>
            <Logo tone="light" />
            <p className="mt-4 max-w-[36ch] text-[15px] leading-relaxed text-white/70">{footer.line}</p>
          </div>
          <Button href={hero.primaryCta.href} size="lg">{hero.primaryCta.label}</Button>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-12 text-[13px] sm:grid-cols-3 lg:grid-cols-12">
          <nav aria-label="Services" className="col-span-2 sm:col-span-1 lg:col-span-4">
            <h3 className="font-semibold text-white">Services</h3>
            <ul className="mt-3 space-y-0.5">
              {capabilities.map((c) => <li key={c.id}><a href="#capabilities" className={linkClass}>{c.title}</a></li>)}
            </ul>
          </nav>
          <nav aria-label="Footer" className="lg:col-span-3">
            <h3 className="font-semibold text-white">Explore</h3>
            <ul className="mt-3 space-y-0.5">
              {navigation.map((n) => <li key={n.href}><a href={n.href} className={linkClass}>{n.label}</a></li>)}
            </ul>
          </nav>
          <div className="lg:col-span-5">
            <h3 className="font-semibold text-white">Contact</h3>
            <ul className="mt-3 space-y-0.5">
              <li><a href={company.phone.href} className={linkClass}>{company.phone.display}</a> <span className="text-white/45">({company.owner.name})</span></li>
              {company.emails.map((e) => <li key={e}><a href={mailtoAll()} className={`${linkClass} break-all`}>{e}</a></li>)}
              <li>
                <a href={`https://wa.me/${company.whatsapp.number}`} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  WhatsApp<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
              {company.offices.map((o) => (
                <li key={o.id} className="pt-3 leading-relaxed">
                  <span className="block font-medium text-white/85">{o.label}</span>
                  <address className="not-italic text-white/55">{o.address.join(', ')}</address>
                  {o.contact && (
                    <span className="block text-white/55">
                      {o.contact.name}, {o.contact.title}: <a href={o.contact.phone.href} className={linkClass}>{o.contact.phone.display}</a>
                      {o.contact.email && <>{' · '}<a href={`mailto:${o.contact.email}`} className={`${linkClass} break-all`}>{o.contact.email}</a></>}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/15 py-6 text-[12px] text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright © {year} {company.legalName}. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-2">
            {socials.length > 0 && (
              <ul className="flex flex-wrap gap-2" aria-label="Social media">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex h-9 items-center rounded-full bg-white/10 px-4 text-[13px] text-white transition-colors hover:bg-burgundy">
                      {s.label}<span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
            <a href="#top" className="inline-flex h-9 items-center rounded-full px-3 text-white/70 transition-colors hover:bg-burgundy hover:text-white">Back to top</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
