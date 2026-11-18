const PRESETS = [1, 5, 10, 15, 30];
export default function QuickPresets({ onSelect, disabled }) {
  return (
    <div className="presets">
      {PRESETS.map((m) => (
        <button key={m} className="chip" disabled={disabled} onClick={() => onSelect(m)}>{m} min</button>
      ))}
    </div>
  );
}
