import { useMemo, useState } from 'react';
import { projects, workFilters, workInitialCount } from '../../data/site';
import SmartImage from '../ui/SmartImage';
import Button from '../ui/Button';
import cx from '../../lib/cx';

const layoutClasses = {
  full: 'md:col-span-6 md:row-span-2 lg:col-span-12 lg:row-span-2',
  feature: 'md:col-span-6 md:row-span-2 lg:col-span-7',
  side: 'md:col-span-3 lg:col-span-5',
  tall: 'md:col-span-3 md:row-span-2 lg:col-span-4',
  wide: 'md:col-span-6 lg:col-span-8',
  broad: 'md:col-span-3 lg:col-span-7',
};

function ProjectCard({ project, index }) {
  const meta = [
    ['Industry', project.industry],
    ['Location', project.location],
    ['Year', project.year],
    ['Service', project.service],
  ].filter(([, value]) => value !== '' && value != null); // hide details not yet supplied
  return (
    <li className={cx('group relative min-h-[24rem] overflow-hidden rounded-4xl bg-navy md:min-h-0', layoutClasses[project.layout] ?? layoutClasses.side)}>
      <a href={project.href} className="absolute inset-0 block rounded-4xl" aria-label={[project.name, `${project.service} project`, project.industry, project.location, project.year].filter(Boolean).join(', ')}>
        <SmartImage
          src={project.image.src}
          srcSet={project.image.srcSet}
          alt={project.image.alt}
          sizes="(min-width: 1024px) 70vw, (min-width: 768px) 50vw, 100vw"
          className="transition-transform duration-[1200ms] ease-apple group-hover:scale-[1.04] group-focus-visible:scale-[1.04]"
        />
        <span className="glass-dark absolute left-5 top-5 rounded-full px-3 py-1 text-[12px] font-semibold tabular-nums text-white">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="absolute inset-x-0 bottom-0 block bg-gradient-to-t from-navy/90 via-navy/50 to-transparent p-6 pt-24 text-white sm:p-8 sm:pt-28">
          <span className="block text-2xl font-semibold tracking-[-0.02em] sm:text-[28px]">{project.name}</span>
          {/* Details: always visible on touch devices, revealed on hover/focus elsewhere */}
          <span className="grid transition-[grid-template-rows,opacity] duration-500 ease-apple [@media(hover:hover)]:grid-rows-[0fr] [@media(hover:hover)]:opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100 group-focus-visible:grid-rows-[1fr] group-focus-visible:opacity-100">
            <span className="block overflow-hidden">
              <span className="mt-3 flex flex-wrap gap-2">
                {meta.map(([label, value]) => (
                  <span key={label} className="rounded-full bg-white/15 px-3 py-1 text-[13px] font-medium backdrop-blur-sm">
                    <span className="sr-only">{label}: </span>{value}
                  </span>
                ))}
              </span>
            </span>
          </span>
        </span>
      </a>
    </li>
  );
}

export default function FeaturedWork() {
  const [filter, setFilter] = useState('All');
  const [showAll, setShowAll] = useState(false);
  const usedFilters = workFilters.filter((f) => f === 'All' || projects.some((p) => p.service === f));

  const filtered = useMemo(() => projects.filter((p) => filter === 'All' || p.service === filter), [filter]);
  const visible = showAll ? filtered : filtered.slice(0, workInitialCount);
  const hiddenCount = filtered.length - visible.length;

  return (
    <section id="work" aria-labelledby="work-title" className="bg-white py-24 sm:py-32 lg:py-40">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="work-title" className="text-balance text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.05] tracking-display text-navy">
            Selected work.
          </h2>
          <p className="mt-5 text-pretty text-[17px] leading-relaxed text-navy/65 sm:text-xl">
            Stands we have designed and built for brands across India.
          </p>
        </div>

        {usedFilters.length > 2 && (
          <div role="group" aria-label="Filter projects by service" className="mx-auto mt-10 flex w-fit max-w-full flex-wrap justify-center gap-1 rounded-full bg-cool p-1">
            {usedFilters.map((f) => {
              const active = filter === f;
              return (
                <button
                  key={f}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(f)}
                  className={cx('h-9 rounded-full px-4 text-[13px] font-medium transition-all duration-300 ease-apple', active ? 'bg-white text-navy shadow-[0_2px_8px_rgba(16,36,62,0.12)]' : 'text-navy/60 hover:text-navy')}
                >
                  {f}
                </button>
              );
            })}
          </div>
        )}

        <p className="sr-only" aria-live="polite">
          Showing {visible.length} of {filtered.length} {filter === 'All' ? '' : filter.toLowerCase()} projects
        </p>

        <ul className="mt-12 grid grid-cols-1 gap-4 [grid-auto-flow:dense] sm:mt-16 md:auto-rows-[20rem] md:grid-cols-6 lg:auto-rows-[24rem] lg:grid-cols-12 lg:gap-5">
          {visible.map((p) => (
            <ProjectCard key={p.id} project={p} index={projects.indexOf(p)} />
          ))}
        </ul>

        <div className="mt-12 flex justify-center">
          {hiddenCount > 0 ? (
            <Button variant="outline" onClick={() => setShowAll(true)} aria-controls="work">
              View all work ({filtered.length})
            </Button>
          ) : (
            <Button variant="outline" href="#contact">
              Discuss a similar project
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
