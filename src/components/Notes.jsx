import { memo, useState, useEffect } from 'react';
const KEY = 'khan_stopwatch_notes';

function Notes() {
  const [text, setText] = useState(() => { try { return localStorage.getItem(KEY) || ''; } catch { return ''; } });
  const [saved, setSaved] = useState(true);

  // Autosave 0.5s after you stop typing.
  useEffect(() => {
    setSaved(false);
    const id = setTimeout(() => { try { localStorage.setItem(KEY, text); } catch { /* ignore */ } setSaved(true); }, 500);
    return () => clearTimeout(id);
  }, [text]);

  return (
    <aside className="panel notes">
      <div className="notes-head">
        <h2>Notes</h2>
        <span className={saved ? 'notes-state ok' : 'notes-state'}>{saved ? 'Saved ✓' : 'Saving…'}</span>
      </div>
      <textarea value={text} onChange={(e) => setText(e.target.value)} maxLength={5000}
                placeholder="Write your notes here…" aria-label="Notes" />
      <div className="notes-foot">
        <span>{text.length} / 5000</span>
        <button className="btn reset small" disabled={!text} onClick={() => setText('')}>Clear</button>
      </div>
    </aside>
  );
}
export default memo(Notes);
