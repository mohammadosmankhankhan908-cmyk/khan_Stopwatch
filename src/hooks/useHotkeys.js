import { useEffect, useRef } from 'react';

// map: { Space: fn, KeyL: fn, ... } — only active while `active` is true.
export default function useHotkeys(active, map) {
  const ref = useRef(map);
  ref.current = map;
  useEffect(() => {
    if (!active) return;
    const onKey = (e) => {
      if (/INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
      const fn = ref.current[e.code];
      if (!fn) return;
      e.preventDefault();
      if (e.target.tagName === 'BUTTON') e.target.blur();
      fn();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active]);
}
