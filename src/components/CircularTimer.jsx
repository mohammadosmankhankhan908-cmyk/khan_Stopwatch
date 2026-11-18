import { useId } from 'react';
import { parts, p2 } from '../utils/time.js';
const R = 130, C = 2 * Math.PI * R;
const UNITS = [['h', 'Hours'], ['m', 'Minutes'], ['s', 'Seconds'], ['c', 'Centis']];

export default function CircularTimer({ ms, progress, caption, done = false, running = false }) {
  // Unique id per ring: the Stopwatch and Countdown rings both exist in the page,
  // and a shared id made the visible ring lose its gradient (it stayed empty).
  const gid = 'rg' + useId().replace(/[^a-zA-Z0-9]/g, '');
  const t = parts(ms);
  const p = Math.min(1, Math.max(0, progress));
  const a = p * 2 * Math.PI;
  return (
    <div className={`ring-wrap${done ? ' done' : ''}${running ? ' live' : ''}`}>
      <svg viewBox="0 0 300 300" aria-hidden="true">
        <defs>
          <linearGradient id={gid} gradientUnits="userSpaceOnUse" x1="20" y1="20" x2="280" y2="280">
            <stop offset="0" stopColor="#38bdf8" />
            <stop offset="1" stopColor="#a855f7" />
          </linearGradient>
        </defs>
        <circle className="track" cx="150" cy="150" r={R} />
        {p > 0 && (
          <circle className="prog" cx="150" cy="150" r={R} stroke={`url(#${gid})`}
                  strokeDasharray={C} strokeDashoffset={C * (1 - p)} transform="rotate(-90 150 150)" />
        )}
        {p > 0 && p < 1 && <circle className="ring-head" cx={150 + R * Math.sin(a)} cy={150 - R * Math.cos(a)} r="7" />}
      </svg>
      <div className="ring-inner">
        <div className="digits" role="timer">
          {UNITS.map(([k, label], i) => (
            <div className="unit-group" key={k}>
              {i > 0 && <i>:</i>}
              <div className="unit"><b>{p2(t[k])}</b><small>{label}</small></div>
            </div>
          ))}
        </div>
        <div className="pct">{Math.floor(p * 100)}%</div>
        <div className="cap">{caption}</div>
      </div>
    </div>
  );
}
