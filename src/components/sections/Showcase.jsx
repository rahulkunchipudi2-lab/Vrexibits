import { showcase } from '../../data/site';
import SmartImage from '../ui/SmartImage';
import useInView from '../../hooks/useInView';
import cx from '../../lib/cx';

/** Large rounded, inset cinematic image (Apple product-page style). */
export default function Showcase() {
  const [ref, inView] = useInView({ threshold: 0.2 });
  return (
    <section aria-labelledby="showcase-title" className="bg-white pb-24 sm:pb-32">
      <div className="container-x">
        <div ref={ref} className="on-dark relative isolate flex min-h-[70svh] items-end overflow-hidden rounded-5xl bg-navy text-white sm:min-h-[80svh]">
          <div className={cx('absolute inset-0 -z-20 transition-transform duration-[2400ms] ease-apple', inView ? 'scale-100' : 'scale-110')}>
            <SmartImage src={showcase.image.src} srcSet={showcase.image.srcSet} alt={showcase.image.alt} sizes="100vw" />
          </div>
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-navy via-navy/50 to-navy/10" />
          <div className="w-full p-8 sm:p-12 lg:p-16">
            <h2 id="showcase-title" className="max-w-[18ch] text-balance text-[clamp(2rem,5vw,4.5rem)] font-semibold leading-[1.05] tracking-display">
              {showcase.heading}
            </h2>
            <p className="mt-5 max-w-[46ch] text-pretty text-[17px] leading-relaxed text-white/80 sm:text-xl">{showcase.text}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
