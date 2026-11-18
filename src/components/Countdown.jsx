import { useState } from 'react';
import CircularTimer from './CircularTimer.jsx';
import TimerControls from './TimerControls.jsx';
import QuickPresets from './QuickPresets.jsx';
import useTimerEngine from '../hooks/useTimerEngine.js';
import useHotkeys from '../hooks/useHotkeys.js';
import useTitle from '../hooks/useTitle.js';
import { fmt } from '../utils/time.js';

const FIELDS = [['h', 'Hours', 99], ['m', 'Minutes', 59], ['s', 'Seconds', 59], ['c', 'Centis', 99]];

export default function Countdown({ active, unlock, alarmActive, onFinish, onStopAlarm }) {
  const [f, setF] = useState({ h: 0, m: 1, s: 0, c: 0 });
  const total = ((f.h * 60 + f.m) * 60 + f.s) * 1000 + f.c * 10;
  const { elapsed, running, start, pause, reset } = useTimerEngine(total, onFinish);

  const remaining = Math.max(0, total - elapsed);
  const done = total > 0 && elapsed >= total;
  const locked = running || elapsed > 0;

  const doStart = () => { if (total > 0 && !done) { unlock(); start(); } };
  const doReset = () => { reset(); onStopAlarm(); };
  const setField = (k, max, raw) => setF((p) => ({ ...p, [k]: Math.max(0, Math.min(max, parseInt(raw, 10) || 0)) }));
  const preset = (min) => setF({ h: Math.floor(min / 60), m: min % 60, s: 0, c: 0 });

  useHotkeys(active, {
    Space: () => (alarmActive ? onStopAlarm() : running ? pause() : doStart()),
    KeyR: doReset,
    Escape: onStopAlarm,
  });
  useTitle(active, `${done ? 'TIME IS UP!' : fmt(remaining, false)} • Countdown`);

  return (
    <section className="stage single" hidden={!active}>
      <div className="panel timer-panel">
        <CircularTimer ms={remaining} progress={total ? elapsed / total : 0} done={done} running={running}
                       caption={done ? 'Complete' : 'Ring fills as time runs out'} />
        {alarmActive && <div className="timesup" role="alert">TIME IS UP!</div>}
        <div className="duration">
          {FIELDS.map(([k, label, max]) => (
            <label key={k}>
              <input type="number" min="0" max={max} value={f[k]} disabled={locked}
                     onChange={(e) => setField(k, max, e.target.value)} />
              <small>{label}</small>
            </label>
          ))}
        </div>
        <QuickPresets onSelect={preset} disabled={locked} />
        <TimerControls running={running} started={elapsed > 0} canStart={total > 0 && !done}
                       onStart={doStart} onPause={pause} onReset={doReset}
                       alarmActive={alarmActive} onStopAlarm={onStopAlarm} />
        <p className="hint">Space start/pause · R reset · Esc stop alarm</p>
      </div>
    </section>
  );
}
