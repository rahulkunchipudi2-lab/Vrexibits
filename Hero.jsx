import { hero, company, projects } from '../../data/site';
import Button from '../ui/Button';
import SmartImage from '../ui/SmartImage';

// "Navsari", "Navsari and Mumbai", "Navsari, Mumbai and Bangalore"
const listCities = (offices) => {
  const c = offices.map((o) => o.label.replace(' office', ''));
  return c.length < 2 ? c.join('') : `${c.slice(0, -1).join(', ')} and ${c[c.length - 1]}`;
};

export default function Hero() {
  const index = projects.slice(0, 4);

  return (
    <section id="top" aria-labelledby="hero-title" className="on-dark relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-navy text-white">
      <div className="absolute inset-0 -z-20 animate-hero-zoom">
        <SmartImage src={hero.image.src} srcSet={hero.image.srcSet} alt={hero.image.alt} priority sizes="100vw" />
      </div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-navy/35" />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-3/4 bg-gradient-to-b from-navy/90 via-navy/55 to-transparent" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-navy/80 to-transparent" />

      <div className="container-x flex flex-1 flex-col items-center pb-8 pt-28 text-center sm:pt-32 lg:pt-36">
        <p className="animate-rise text-[15px] font-medium text-white/75 sm:text-[17px]">
          Offices in {listCities(company.offices)}
        </p>
        <h1
          id="hero-title"
          className="mt-4 max-w-[16ch] animate-rise text-balance text-[clamp(2.5rem,6.4vw,5.75rem)] font-semibold leading-[1.04] tracking-display [animation-delay:120ms]"
        >
          {hero.statement}
        </h1>
        <p className="mt-6 max-w-[40ch] animate-rise text-pretty text-[17px] leading-relaxed text-white/80 [animation-delay:240ms] sm:text-xl">
          {hero.intro}
        </p>
        <div className="mt-9 flex animate-rise flex-wrap items-center justify-center gap-3 [animation-delay:360ms] sm:gap-4">
          <Button href={hero.primaryCta.href} size="lg">{hero.primaryCta.label}</Button>
          <Button href={hero.secondaryCta.href} size="lg" variant="ghostLight">{hero.secondaryCta.label}</Button>
        </div>

        <div className="mt-auto flex w-full flex-col items-center gap-6 pt-14">
          {/* Project index */}
          <nav aria-label="Recent projects" className="animate-rise [animation-delay:520ms]">
            <ol className="glass-dark flex flex-wrap items-center justify-center gap-1 rounded-[1.5rem] p-1.5 sm:rounded-full ring-1 ring-inset ring-white/15">
              <li className="hidden px-3 text-[13px] text-white/60 sm:block">Recent work</li>
              {index.map((p) => (
                <li key={p.id}>
                  <a href="#work" className="block rounded-full px-3.5 py-2 text-[13px] font-medium text-white/90 transition-colors hover:bg-white hover:text-navy">
                    {p.name}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {/* Scroll indicator */}
          <a href="#about" className="flex flex-col items-center gap-2 rounded-lg px-3 py-1 text-[12px] text-white/60 transition-colors hover:text-white" aria-label="Scroll to the next section">
            <svg viewBox="0 0 24 24" className="h-5 w-5 animate-bounce-soft" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
          </a>
        </div>
      </div>
    </section>
  );
}
