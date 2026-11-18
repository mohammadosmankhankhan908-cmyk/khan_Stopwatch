import { useRef, useCallback, useEffect } from 'react';

// Web Audio alarm: a triple beep repeated every 1.2s until stop() is called.
export default function useAlarm() {
  const ctx = useRef(null), iv = useRef(null);

  const unlock = useCallback(() => { // call from a user gesture
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    if (!ctx.current) ctx.current = new AC();
    if (ctx.current.state === 'suspended') ctx.current.resume();
  }, []);

  const beep = useCallback(() => {
    const c = ctx.current; if (!c) return;
    const t = c.currentTime;
    [0, 0.18, 0.36].forEach((d) => {
      const o = c.createOscillator(), g = c.createGain();
      o.type = 'square'; o.frequency.value = 880;
      g.gain.setValueAtTime(0.0001, t + d);
      g.gain.exponentialRampToValueAtTime(0.25, t + d + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, t + d + 0.14);
      o.connect(g); g.connect(c.destination);
      o.start(t + d); o.stop(t + d + 0.15);
    });
  }, []);

  const stop = useCallback(() => { clearInterval(iv.current); iv.current = null; }, []);
  const play = useCallback(() => { unlock(); stop(); beep(); iv.current = setInterval(beep, 1200); }, [unlock, stop, beep]);

  useEffect(() => stop, [stop]);
  return { unlock, play, stop };
}
