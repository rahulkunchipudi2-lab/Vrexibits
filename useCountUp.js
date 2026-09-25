import { useEffect, useState } from 'react';
import useReducedMotion from './useReducedMotion';

/** Animates from 0 to `target` once `start` becomes true. */
export default function useCountUp(target, start, duration = 1600) {
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return undefined;
    if (reduced) {
      setValue(target);
      return undefined;
    }
    let frame;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min((now - t0) / duration, 1);
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [start, target, duration, reduced]);

  return value;
}
