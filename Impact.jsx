import { impact } from '../../data/site';
import useInView from '../../hooks/useInView';
import useCountUp from '../../hooks/useCountUp';

function Stat({ stat, start }) {
  const value = useCountUp(stat.value, start);
  return (
    <div className="flex flex-col-reverse border-t border-white/25 pt-6">
      <dt className="mt-4 text-base font-semibold text-white/80">{stat.label}</dt>
      <dd className="text-[clamp(3.75rem,8vw,7.5rem)] font-semibold leading-none tracking-[-0.05em] tabular-nums">
        <span aria-hidden="true">
          {value}
          <span className="text-white/60">{stat.suffix}</span>
        </span>
        <span className="sr-only">{stat.value}{stat.suffix}</span>
      </dd>
    </div>
  );
}

export default function Impact() {
  const [ref, inView] = useInView({ threshold: 0.3 });
  if (impact.isPlaceholder) return null; // never show unverified numbers publicly
  return (
    <section aria-labelledby="impact-title" className="on-dark relative overflow-hidden bg-burgundy py-24 text-white lg:py-32">
      <div aria-hidden="true" className="absolute left-0 top-0 h-3 w-1/2 bg-royal" />
      <div className="container-x" ref={ref}>
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-x-10">
          <h2 id="impact-title" className="text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-none tracking-display lg:col-span-5">
            {impact.heading}
          </h2>
          <p className="max-w-[40ch] text-lg leading-relaxed text-white/75 lg:col-span-4 lg:col-start-9">{impact.intro}</p>
        </div>
        <dl className="mt-16 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
          {impact.stats.map((s) => (
            <Stat key={s.label} stat={s} start={inView} />
          ))}
        </dl>
      </div>
    </section>
  );
}
