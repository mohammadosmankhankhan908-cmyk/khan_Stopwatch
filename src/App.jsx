import { useState, useRef, useCallback } from 'react';
import Navbar from './components/Navbar.jsx';
import TimerModeSelector from './components/TimerModeSelector.jsx';
import Settings from './components/Settings.jsx';
import Stopwatch from './components/Stopwatch.jsx';
import Countdown from './components/Countdown.jsx';
import useAlarm from './hooks/useAlarm.js';

export default function App() {
  const [mode, setMode] = useState('stopwatch');
  const [settings, setSettings] = useState({ alarm: true, sound: true });
  const [alarmActive, setAlarmActive] = useState(false);
  const { unlock, play, stop } = useAlarm();
  const cfg = useRef(settings);
  cfg.current = settings;

  const handleFinish = useCallback(() => {
    if (!cfg.current.alarm) return;
    setAlarmActive(true);
    if (cfg.current.sound) play();
  }, [play]);

  const stopAlarm = useCallback(() => { stop(); setAlarmActive(false); }, [stop]);

  const changeSetting = (key, value) => {
    setSettings((s) => ({ ...s, [key]: value }));
    if (key === 'sound' && !value) stop();
    if (key === 'alarm' && !value) stopAlarm();
  };

  return (
    <div className="app">
      <div className="bg" style={{ backgroundImage: `radial-gradient(circle at 15% 8%,rgba(56,189,248,.2),transparent 45%),radial-gradient(circle at 88% 92%,rgba(168,85,247,.24),transparent 45%),linear-gradient(rgba(5,8,22,.8),rgba(5,8,22,.93)),url(${import.meta.env.BASE_URL}photo.png)` }} />
      <Navbar />
      <main className="main">
        <div className="toolbar">
          <TimerModeSelector mode={mode} onChange={setMode} />
          <Settings settings={settings} onChange={changeSetting} />
        </div>
        <Stopwatch active={mode === 'stopwatch'} unlock={unlock} />
        <Countdown active={mode === 'countdown'} unlock={unlock} alarmActive={alarmActive}
                   onFinish={handleFinish} onStopAlarm={stopAlarm} />
      </main>
      <footer className="footer">
        <p>Time is Precious... Use it Wisely!</p>
        <p>Gift from ❤️ Khan Sahib</p>
      </footer>
    </div>
  );
}
