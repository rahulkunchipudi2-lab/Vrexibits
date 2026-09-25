import { useEffect, useRef, useState } from 'react';
import { navigation, hero, company, mailtoAll } from '../../data/site';
import Logo from '../ui/Logo';
import Button from '../ui/Button';
import cx from '../../lib/cx';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);
  const firstLinkRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    document.body.style.overflow = 'hidden';
    firstLinkRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  const close = () => setOpen(false);
  const dark = !scrolled && !open; // dark glass over the hero, light glass elsewhere

  return (
    <header
      className={cx(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-500 ease-apple',
        dark ? 'glass-dark text-white' : 'glass-light text-navy shadow-[0_1px_0_rgba(16,36,62,0.08)]'
      )}
    >
      <nav aria-label="Primary" className="container-x flex h-14 items-center justify-between gap-6">
        <a href="#top" aria-label="VR Exhibits, back to top" onClick={close} className="rounded-lg">
          <Logo tone={dark ? 'light' : 'dark'} />
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {navigation.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={cx('rounded-md py-2 text-[13px] font-normal transition-opacity duration-300', dark ? 'text-white/80 hover:text-white' : 'text-navy/75 hover:text-navy')}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Button href={hero.primaryCta.href} size="sm" className="hidden sm:inline-flex">
            {hero.primaryCta.label}
          </Button>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-3 w-[18px]" aria-hidden="true">
              <span className={cx('absolute left-0 h-[1.5px] w-full rounded bg-current transition-transform duration-300 ease-apple', open ? 'top-[5px] rotate-45' : 'top-0')} />
              <span className={cx('absolute left-0 h-[1.5px] w-full rounded bg-current transition-transform duration-300 ease-apple', open ? 'top-[5px] -rotate-45' : 'top-[10px]')} />
            </span>
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="fixed inset-x-0 bottom-0 top-14 flex animate-fade flex-col overflow-y-auto bg-white px-6 pb-10 pt-6 text-navy sm:px-10 lg:hidden">
          <ul>
            {navigation.map((item, i) => (
              <li key={item.href} className="animate-rise" style={{ animationDelay: `${i * 40}ms` }}>
                <a
                  ref={i === 0 ? firstLinkRef : undefined}
                  href={item.href}
                  onClick={close}
                  className="block rounded-lg py-2.5 text-[28px] font-semibold tracking-[-0.02em] transition-colors hover:text-burgundy"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-auto space-y-5 pt-10">
            <Button href={hero.primaryCta.href} onClick={close} size="lg" className="w-full">
              {hero.primaryCta.label}
            </Button>
            <p className="text-center text-[15px] text-navy/60">
              <a href={company.phone.href} className="inline-block py-1.5 hover:text-navy">{company.phone.display}</a>
              <br />
              <a href={mailtoAll()} className="inline-block py-1.5 hover:text-navy">{company.emails[0]}</a>
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
