import { useState, useRef, useCallback, useEffect } from 'react';

/**
 * Timestamp-based engine. Elapsed = accumulated base + (performance.now() - startTs).
 * No setInterval decrementing => no drift. One loop only (rAF when visible,
 * 200ms timeout when the tab is hidden, since rAF is paused in background tabs).
 * If limitMs is given, elapsed is clamped to it and onFinish fires exactly once.
 */
export default function useTimerEngine(limitMs = null, onFinish = null) {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const base = useRef(0), startTs = useRef(0), raf = useRef(0), tm = useRef(0), on = useRef(false);
  const limit = useRef(limitMs), fin = useRef(onFinish);
  limit.current = limitMs;
  fin.current = onFinish;

  const stopLoop = useCallback(() => { cancelAnimationFrame(raf.current); clearTimeout(tm.current); }, []);

  const tick = useCallback(() => {
    const e = base.current + performance.now() - startTs.current;
    const lim = limit.current;
    if (lim != null && e >= lim) {
      on.current = false; base.current = lim;
      setElapsed(lim); setRunning(false);
      if (fin.current) fin.current();
      return;
    }
    setElapsed(e);
    if (document.hidden) tm.current = setTimeout(tick, 200);
    else raf.current = requestAnimationFrame(tick);
  }, []);

  const start = useCallback(() => {
    if (on.current) return;
    on.current = true; startTs.current = performance.now();
    setRunning(true); stopLoop(); tick();
  }, [stopLoop, tick]);

  const pause = useCallback(() => {
    if (!on.current) return;
    stopLoop(); on.current = false;
    base.current += performance.now() - startTs.current;
    setElapsed(base.current); setRunning(false);
  }, [stopLoop]);

  const reset = useCallback(() => {
    stopLoop(); on.current = false; base.current = 0;
    setElapsed(0); setRunning(false);
  }, [stopLoop]);

  useEffect(() => {
    const onVis = () => { if (on.current) { stopLoop(); tick(); } };
    document.addEventListener('visibilitychange', onVis);
    return () => { document.removeEventListener('visibilitychange', onVis); stopLoop(); };
  }, [stopLoop, tick]);

  return { elapsed, running, start, pause, reset };
}
