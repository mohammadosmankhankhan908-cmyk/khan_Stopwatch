import { fmt } from '../utils/time.js';
export default function LapHistory({ laps, onClear }) {
  return (
    <aside className="panel laps">
      <div className="laps-head">
        <h2>Laps <span>{laps.length}</span></h2>
        <button className="btn reset small" disabled={!laps.length} onClick={onClear}>Clear all</button>
      </div>
      {laps.length === 0 ? (
        <p className="empty">Press Lap while the stopwatch runs to record a split.</p>
      ) : (
        <>
          <div className="lap-row lap-th"><span>Lap</span><span>Split</span><span>Total</span></div>
          <ul>
            {laps.map((l) => (
              <li key={l.n} className="lap-row">
                <span>#{l.n}</span><span>{fmt(l.lap)}</span><span>{fmt(l.total)}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </aside>
  );
}
