import { clients, hero } from '../../data/site';
import ClientMark from '../ui/ClientMark';
import Button from '../ui/Button';
import cx from '../../lib/cx';

function LogoCard({ client, decorative }) {
  return (
    <li
      className="group flex h-24 w-44 shrink-0 items-center justify-center rounded-3xl bg-cool px-6 py-5 transition-all duration-500 ease-apple hover:-translate-y-1 hover:bg-white hover:shadow-[0_14px_34px_-14px_rgba(16,36,62,0.3)] sm:h-28 sm:w-56 sm:px-8"
      aria-hidden={decorative || undefined}
      title={client.name}
    >
      <ClientMark {...client} decorative={decorative} />
    </li>
  );
}

/** One endlessly sliding row. The list is rendered twice so the loop is seamless. */
function MarqueeRow({ items, reverse, duration }) {
  return (
    <div className="marquee-mask overflow-hidden py-2">
      <div
        className={cx('marquee-track flex w-max gap-4', reverse && 'marquee-reverse')}
        style={{ '--marquee-duration': `${duration}s` }}
      >
        <ul className="flex shrink-0 gap-4" aria-label={reverse ? undefined : 'Clients'}>
          {items.map((c) => <LogoCard key={c.name} client={c} />)}
        </ul>
        <ul className="marquee-duplicate flex shrink-0 gap-4" aria-hidden="true">
          {items.map((c) => <LogoCard key={c.name} client={c} decorative />)}
        </ul>
      </div>
    </div>
  );
}

export default function Clients() {
  const half = Math.ceil(clients.logos.length / 2);
  const rowA = clients.logos.slice(0, half);
  const rowB = clients.logos.slice(half);

  // Industry summary, counted from the client list itself
  const sectors = Object.entries(
    clients.logos.reduce((acc, c) => ({ ...acc, [c.sector]: (acc[c.sector] || 0) + 1 }), {})
  ).sort((a, b) => b[1] - a[1]);

  return (
    <section id="clients" aria-labelledby="clients-title" className="overflow-hidden bg-white pb-24 sm:pb-32 lg:pb-40">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[17px] font-semibold text-burgundy">
            {clients.logos.length} brands across {sectors.length} industries
          </p>
          <h2 id="clients-title" className="mt-3 text-balance text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.05] tracking-display text-navy">
            {clients.heading}
          </h2>
          <p className="mt-5 text-pretty text-[17px] leading-relaxed text-navy/65 sm:text-xl">{clients.intro}</p>
        </div>
      </div>

      {/* Full-width sliding logo band */}
      <div className="mt-14 space-y-2 sm:mt-16"> setPaused(false)}
      >
        <MarqueeRow items={rowA} duration={70} />
        <MarqueeRow items={rowB} duration={80} reverse />
      </div>

      <div className="container-x">
        {/* Industries */}
        <ul className="mx-auto mt-14 flex max-w-4xl flex-wrap justify-center gap-2" aria-label="Industries we work with">
          {sectors.map(([name, count]) => (
            <li key={name} className="inline-flex items-center gap-2 rounded-full bg-cool py-2 pl-4 pr-2 text-[15px] text-navy/80">
              {name}
              <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-white px-2 text-[13px] font-semibold tabular-nums text-royal">{count}</span>
            </li>
          ))}
        </ul>

        <div className="mt-14 flex flex-col items-center gap-4 text-center">
          <p className="text-[21px] font-semibold tracking-[-0.02em] text-navy">Your brand could be next.</p>
          <Button href={hero.primaryCta.href}>{hero.primaryCta.label}</Button>
        </div>
      </div>
    </section>
  );
}
