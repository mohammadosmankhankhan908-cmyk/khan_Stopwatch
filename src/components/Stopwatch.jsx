import { useState } from 'react';
import CircularTimer from './CircularTimer.jsx';
import TimerControls from './TimerControls.jsx';
import LapHistory from './LapHistory.jsx';
import Notes from './Notes.jsx';
import useTimerEngine from '../hooks/useTimerEngine.js';
import useHotkeys from '../hooks/useHotkeys.js';
import useTitle from '../hooks/useTitle.js';
import { CYCLE_MS, fmt } from '../utils/time.js';

export default function Stopwatch({ active, unlock }) {
  const { elapsed, running, start, pause, reset } = useTimerEngine();
  const [laps, setLaps] = useState([]);

  const doStart = () => { unlock(); start(); };
  const doReset = () => { reset(); setLaps([]); };
  const doLap = () => {
    if (!running) return;
    setLaps((l) => [{ n: l.length + 1, lap: elapsed - (l[0] ? l[0].total : 0), total: elapsed }, ...l]);
  };

  useHotkeys(active, { Space: () => (running ? pause() : doStart()), KeyL: doLap, KeyR: doReset });
  useTitle(active, `${fmt(elapsed, false)} • Stopwatch Pro`);

  // The ring wraps every 30 min; the stopwatch itself never resets.
  const progress = (elapsed % CYCLE_MS) / CYCLE_MS;
  const cycle = Math.floor(elapsed / CYCLE_MS) + 1;

  return (
    <section className="stage" hidden={!active}>
      <div className="panel timer-panel">
        <CircularTimer ms={elapsed} progress={progress} running={running} caption={`Ring cycle ${cycle} · 30 min per lap of the ring`} />
        <TimerControls running={running} started={elapsed > 0} onStart={doStart} onPause={pause} onReset={doReset} onLap={doLap} />
        <p className="hint">Space start/pause · L lap · R reset</p>
      </div>
      <div className="side">
        <LapHistory laps={laps} onClear={() => setLaps([])} />
        <Notes />
      </div>
    </section>
  );
}
