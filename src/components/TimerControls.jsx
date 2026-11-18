export default function TimerControls({ running, started, canStart = true, onStart, onPause, onReset, onLap, alarmActive, onStopAlarm }) {
  return (
    <div className="controls">
      <button className="btn start" disabled={running || !canStart} onClick={onStart}>{started ? 'Resume' : 'Start'}</button>
      <button className="btn pause" disabled={!running} onClick={onPause}>Pause</button>
      {onLap && <button className="btn lap" disabled={!running} onClick={onLap}>Lap</button>}
      <button className="btn reset" disabled={!started && !running} onClick={onReset}>Reset</button>
      {onStopAlarm && <button className="btn alarm" disabled={!alarmActive} onClick={onStopAlarm}>Stop Alarm</button>}
    </div>
  );
}
