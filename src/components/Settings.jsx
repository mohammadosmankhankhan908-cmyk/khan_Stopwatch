export default function Settings({ settings, onChange }) {
  const items = [['alarm', 'Alarm'], ['sound', 'Sound']];
  return (
    <div className="settings">
      {items.map(([key, label]) => (
        <label key={key} className="toggle">
          <input type="checkbox" checked={settings[key]} onChange={(e) => onChange(key, e.target.checked)} />
          <span className="sw" />
          {label} {settings[key] ? 'ON' : 'OFF'}
        </label>
      ))}
    </div>
  );
}
