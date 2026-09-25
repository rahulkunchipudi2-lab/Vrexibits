import { process } from '../../data/site';
import Reveal from '../ui/Reveal';

export default function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className="on-dark bg-navy py-24 text-white sm:py-32 lg:py-40">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="process-title" className="text-balance text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.05] tracking-display">
            From brief to show day.
          </h2>
          <p className="mt-5 text-pretty text-[17px] leading-relaxed text-white/65 sm:text-xl">
            Five stages, each with a clear sign-off, so you always know what has been decided and what comes next.
          </p>
        </div>

        <ol className="mt-14 grid gap-4 sm:mt-20 sm:grid-cols-2 lg:grid-cols-5 lg:gap-3">
          {process.map((step, i) => (
            <Reveal as="li" key={step.number} delay={i * 90} className="relative flex flex-col rounded-4xl bg-white/[0.06] p-7 ring-1 ring-inset ring-white/10 transition-colors duration-500 hover:bg-white/[0.1] sm:last:col-span-2 lg:last:col-span-1">
              <span aria-hidden="true" className="bg-gradient-to-b from-white to-white/30 bg-clip-text text-[56px] font-semibold leading-none tracking-[-0.04em] text-transparent tabular-nums">
                {step.number}
              </span>
              <h3 className="mt-8 text-[21px] font-semibold tracking-[-0.02em]">
                <span className="sr-only">Step {i + 1}: </span>
                {step.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-white/65">{step.text}</p>
              {i < process.length - 1 && (
                <span aria-hidden="true" className="absolute -right-[11px] top-1/2 z-10 hidden h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full bg-navy text-white/60 ring-1 ring-white/15 lg:flex">
                  <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 6l6 6-6 6" /></svg>
                </span>
              )}
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
