# khan_Stopwatch — Time is Precious... Use it Wisely!

## Run it
```bash
npm install
npm run dev      # open the printed local URL
npm run build    # production build in /dist
```
Requires Node 18+.

## Your photo
Put your picture at `public/photo.png`. It is used as the dimmed page background and in the
round profile badge (top-right). If the file is missing, a gradient background and the letter "K" show instead.

## Structure
- `App.jsx` – mode, settings, alarm state; keeps both timers mounted so their states stay independent.
- `Navbar`, `TimerModeSelector`, `Settings` – header, Stopwatch/Countdown tabs, Alarm and Sound toggles.
- `Stopwatch` / `Countdown` – each owns its own engine instance, keyboard shortcuts and tab title.
- `CircularTimer` – SVG ring + `HH:MM:SS:CC` display. `TimerControls`, `QuickPresets`, `LapHistory` – shared UI.
- `hooks/useTimerEngine.js` – the timing core. `hooks/useAlarm.js` – Web Audio alarm.

## Timer logic
- Elapsed time = saved base + (`performance.now()` − start timestamp). Nothing is ever incremented per tick, so there is no drift.
- One loop: `requestAnimationFrame` while the tab is visible, a 200 ms timeout while hidden (rAF is paused in background tabs). A `visibilitychange` listener restarts the loop, and cleanup cancels both.
- Pause stores the elapsed time into the base; Resume sets a new start timestamp.
- Stopwatch ring = `(elapsed % 30 min) / 30 min`: it wraps to 0 every 30 minutes while the time keeps counting.
- Countdown ring = `elapsed / total` (empty → full). Elapsed is clamped to the total, so remaining time never goes below zero, and the finish callback runs once per run.
- The alarm beeps (Web Audio) until Stop Alarm; the audio context is unlocked by the Start click to satisfy browser autoplay rules.

Shortcuts: Space start/pause · L lap · R reset · Esc stop alarm.

## Windows .exe
Double-click `build-exe.bat` (or run `npm install` then `npm run dist`).
The `release/` folder will contain `khan_Stopwatch Setup 1.0.0.exe` (installer) and a portable `.exe`.
Test the desktop app without packaging: `npm run app`.
