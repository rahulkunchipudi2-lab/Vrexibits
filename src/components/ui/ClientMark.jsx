/** A client logo, or a clean text wordmark when no logo file is supplied. */
export default function ClientMark({ name, logo, decorative = false }) {
  if (logo) {
    return (
      <img
        src={logo}
        alt={decorative ? '' : name}
        loading="lazy"
        decoding="async"
        draggable="false"
        className="h-full w-full select-none object-contain"
      />
    );
  }
  return (
    <span className="select-none text-center text-[19px] font-semibold leading-tight tracking-[-0.02em] text-navy/80" aria-hidden={decorative || undefined}>
      {name}
    </span>
  );
}
