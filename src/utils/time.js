export const CYCLE_MS = 30 * 60 * 1000; // stopwatch ring = 30 minutes
export const p2 = (n) => String(n).padStart(2, '0');
export function parts(ms) {
  ms = Math.max(0, Math.floor(ms));
  return { h: Math.floor(ms / 3600000), m: Math.floor(ms / 60000) % 60, s: Math.floor(ms / 1000) % 60, c: Math.floor((ms % 1000) / 10) };
}
export function fmt(ms, withCs = true) {
  const t = parts(ms);
  return `${p2(t.h)}:${p2(t.m)}:${p2(t.s)}${withCs ? ':' + p2(t.c) : ''}`;
}
