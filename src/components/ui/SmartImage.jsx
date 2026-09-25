import cx from '../../lib/cx';

/**
 * Responsive, lazy-loaded image.
 * For real photography pass `srcSet` (e.g. "a-800.webp 800w, a-1600.webp 1600w")
 * and `sizes` to let the browser choose the right file.
 */
export default function SmartImage({
  src,
  srcSet,
  sizes = '100vw',
  alt,
  width = 1600,
  height = 1100,
  priority = false,
  className,
  ...rest
}) {
  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      className={cx('block h-full w-full object-cover', className)}
      {...rest}
    />
  );
}
