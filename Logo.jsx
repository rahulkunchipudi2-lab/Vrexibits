import cx from '../../lib/cx';

export default function Logo({ tone = 'dark', className }) {
  const light = tone === 'light';
  return (
    <span className={cx('inline-flex items-center gap-2.5', className)}>
      <svg viewBox="0 0 64 64" className="h-8 w-8 shrink-0" aria-hidden="true">
        <rect width="64" height="64" rx="15" fill={light ? '#FFFFFF' : '#123B70'} />
        <rect x="42" y="12" width="9" height="40" rx="2" fill="#741F3D" />
        <path d="M12 16h7l7 22 7-22h7L30 48h-8z" fill={light ? '#123B70' : '#FFFFFF'} />
      </svg>
      <span className={cx('text-[17px] font-semibold tracking-[-0.02em]', light ? 'text-white' : 'text-navy')}>VR Exhibits</span>
    </span>
  );
}
