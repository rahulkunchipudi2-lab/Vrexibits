import { brand, company } from '../../data/site';
import SmartImage from '../ui/SmartImage';
import Reveal from '../ui/Reveal';

export default function BrandStatement() {
  const [main, detail] = brand.images;
  const initials = company.owner.name.split(' ').map((w) => w[0]).join('');
  return (
    <section id="about" aria-labelledby="about-title" className="bg-white py-24 sm:py-32 lg:py-40">
      <div className="container-x">
        <Reveal className="mx-auto max-w-4xl text-center">
          <p className="text-[17px] font-semibold text-burgundy">About the studio</p>
          <h2 id="about-title" className="mt-4 text-balance text-[clamp(2rem,4.6vw,3.75rem)] font-semibold leading-[1.08] tracking-display text-navy">
            {brand.heading}
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:mt-20 md:grid-cols-12 lg:gap-5">
          <Reveal className="overflow-hidden rounded-4xl bg-cool md:col-span-7">
            <div className="aspect-[4/3] md:aspect-auto md:h-full md:min-h-[26rem]">
              <SmartImage src={main.src} srcSet={main.srcSet} alt={main.alt} sizes="(min-width: 768px) 58vw, 100vw" />
            </div>
          </Reveal>
          <Reveal delay={120} className="overflow-hidden rounded-4xl bg-cool md:col-span-5">
            <div className="aspect-[4/3] md:aspect-auto md:h-full md:min-h-[26rem]">
              <SmartImage src={detail.src} srcSet={detail.srcSet} alt={detail.alt} sizes="(min-width: 768px) 42vw, 100vw" />
            </div>
          </Reveal>
        </div>

        {/* Bento row: story, two facts, founder */}
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:mt-5 lg:grid-cols-12 lg:gap-5">
          <Reveal className="rounded-4xl bg-cool p-8 sm:p-10 md:col-span-2 lg:col-span-6">
            {brand.body.map((para) => (
              <p key={para.slice(0, 24)} className="text-pretty text-[17px] leading-relaxed text-navy/75 [&+&]:mt-5">
                {para}
              </p>
            ))}
          </Reveal>
          {brand.facts.map((f, i) => (
            <Reveal key={f.title} delay={80 * (i + 1)} className="flex flex-col justify-between gap-8 rounded-4xl bg-cool p-8 lg:col-span-3">
              <span aria-hidden="true" className="flex h-11 w-11 items-center justify-center rounded-full bg-royal text-white">
                {i === 0 ? (
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="9" cy="8" r="3.2" /><path d="M3.5 19c.6-3 2.8-4.6 5.5-4.6s4.9 1.6 5.5 4.6M15.5 5.2a3 3 0 010 5.6M17.5 14.6c1.6.6 2.7 2 3 4.4" /></svg>
                ) : (
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="8.5" /><path d="M8 12.5l2.7 2.7L16.2 9.5" /></svg>
                )}
              </span>
              <div>
                <h3 className="text-2xl font-semibold tracking-[-0.02em] text-navy">{f.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-navy/65">{f.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mx-auto mt-14 flex w-fit items-center gap-4 rounded-full bg-cool py-2.5 pl-2.5 pr-7">
          <span aria-hidden="true" className="flex h-12 w-12 items-center justify-center rounded-full bg-royal text-sm font-semibold text-white">{initials}</span>
          <span className="text-left">
            <span className="block text-[17px] font-semibold tracking-[-0.01em] text-navy">{company.owner.name}</span>
            <span className="block text-[13px] text-navy/60">{company.owner.title}, {company.name}</span>
          </span>
        </Reveal>
      </div>
    </section>
  );
}
