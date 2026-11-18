export default function TimerModeSelector({ mode, onChange }) {
  const tabs = [['stopwatch', 'Stopwatch'], ['countdown', 'Countdown']];
  return (
    <div className="tabs" role="tablist">
      {tabs.map(([id, label]) => (
        <button key={id} role="tab" aria-selected={mode === id}
                className={mode === id ? 'tab on' : 'tab'} onClick={() => onChange(id)}>{label}</button>
      ))}
    </div>
  );
}
