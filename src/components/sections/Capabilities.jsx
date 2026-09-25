import { useState } from 'react';
import { capabilities } from '../../data/site';
import SmartImage from '../ui/SmartImage';
import cx from '../../lib/cx';

export default function Capabilities() {
  const [open, setOpen] = useState(0); // expanded item (click / keyboard)
  const [preview, setPreview] = useState(null); // hovered item (desktop image preview)
  const shown = capabilities[preview ?? (open >= 0 ? open : 0)];

  return (
    <section id="capabilities" aria-labelledby="capabilities-title" className="bg-cool py-24 sm:py-32 lg:py-40">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="capabilities-title" className="text-balance text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.05] tracking-display text-navy">
            What we design and build.
          </h2>
          <p className="mt-5 text-pretty text-[17px] leading-relaxed text-navy/65 sm:text-xl">
            Five disciplines, one studio. Most projects draw on several of them at once.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:mt-20 lg:grid-cols-12 lg:gap-8">
          <ul className="rounded-4xl bg-white px-5 sm:px-8 lg:col-span-7" onMouseLeave={() => setPreview(null)}>
            {capabilities.map((item, i) => {
              const isOpen = open === i;
              return (
                <li key={item.id} className="border-b border-navy/10 last:border-b-0" onMouseEnter={() => setPreview(i)}>
                  <h3>
                    <button
                      type="button"
                      id={`cap-btn-${item.id}`}
                      aria-expanded={isOpen}
                      aria-controls={`cap-panel-${item.id}`}
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      className="group flex w-full items-center gap-4 rounded-2xl py-6 text-left sm:gap-6 sm:py-7"
                    >
                      <span className={cx('w-8 shrink-0 text-[15px] font-semibold tabular-nums transition-colors duration-300 sm:w-10 sm:text-[17px]', isOpen ? 'text-burgundy' : 'text-navy/35')}>
                        {item.number}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[21px] font-semibold tracking-[-0.02em] text-navy sm:text-[28px]">{item.title}</span>
                        <span className="mt-1 block text-[15px] text-navy/55">{item.summary}</span>
                      </span>
                      <span aria-hidden="true" className={cx('relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ease-apple', isOpen ? 'rotate-45 bg-burgundy text-white' : 'bg-cool text-navy group-hover:bg-royal group-hover:text-white')}>
                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M12 5v14M5 12h14" /></svg>
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`cap-panel-${item.id}`}
                    role="region"
                    aria-labelledby={`cap-btn-${item.id}`}
                    className={cx('grid transition-[grid-template-rows] duration-500 ease-apple', isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}
                  >
                    <div className="overflow-hidden" inert={isOpen ? undefined : ''}>
                      <div className="pb-7 pl-12 sm:pl-16">
                        <p className="max-w-[58ch] text-pretty text-[17px] leading-relaxed text-navy/70">{item.description}</p>
                        <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${item.title} services`}>
                          {item.deliverables.map((d) => (
                            <li key={d} className="rounded-full bg-cool px-3.5 py-1.5 text-[13px] font-medium text-royal">{d}</li>
                          ))}
                        </ul>
                        <div className="mt-6 aspect-[16/10] overflow-hidden rounded-3xl lg:hidden">
                          <SmartImage src={item.image.src} srcSet={item.image.srcSet} alt={item.image.alt} sizes="100vw" />
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Sticky preview (desktop) */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-24">
              <div className="relative h-[calc(100svh-8rem)] max-h-[44rem] min-h-[30rem] overflow-hidden rounded-4xl bg-navy">
                {capabilities.map((c) => (
                  <SmartImage
                    key={c.id}
                    src={c.image.src}
                    srcSet={c.image.srcSet}
                    alt=""
                    aria-hidden="true"
                    sizes="40vw"
                    className={cx('absolute inset-0 transition-all duration-700 ease-apple', c.id === shown.id ? 'scale-100 opacity-100' : 'scale-105 opacity-0')}
                  />
                ))}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/85 to-transparent p-8 pt-24 text-white">
                  <span className="text-[13px] font-medium text-white/70">{shown.number}</span>
                  <span className="mt-1 block text-2xl font-semibold tracking-[-0.02em]">{shown.title}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
