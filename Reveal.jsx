import useInView from '../../hooks/useInView';
import cx from '../../lib/cx';

/** Fades content in once when it scrolls into view. */
export default function Reveal({ as: Tag = 'div', delay = 0, className, children, ...rest }) {
  const [ref, inView] = useInView();
  return (
    <Tag
      ref={ref}
      className={cx('reveal', inView && 'is-visible', className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
