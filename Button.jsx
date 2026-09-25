import cx from '../../lib/cx';

// Apple-style pill buttons. Burgundy stays reserved for the main action.
const variants = {
  primary: 'bg-burgundy text-white hover:bg-burgundy-600 active:bg-burgundy-800',
  outline: 'text-royal ring-1 ring-inset ring-royal/60 hover:bg-royal hover:text-white hover:ring-royal',
  light: 'bg-white text-navy hover:bg-white/90',
  ghostLight: 'text-white ring-1 ring-inset ring-white/70 hover:bg-white hover:text-navy',
};

const sizes = {
  sm: 'h-9 px-4 text-[13px]',
  md: 'h-11 px-6 text-[15px]',
  lg: 'h-12 px-7 text-[17px]',
};

/** Renders an <a> when `href` is set, otherwise a <button>. */
export default function Button({ href, variant = 'primary', size = 'md', className, children, ...rest }) {
  const classes = cx(
    'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 ease-apple active:scale-[0.98]',
    'disabled:cursor-not-allowed disabled:opacity-60',
    variants[variant],
    sizes[size],
    className
  );
  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}
