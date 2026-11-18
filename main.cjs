const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200, height: 820, minWidth: 380, minHeight: 600,
    autoHideMenuBar: true, backgroundColor: '#070b1a', title: 'khan_Stopwatch',
  });
  win.loadFile(path.join(__dirname, 'dist', 'index.html'));
}
app.whenReady().then(createWindow);
app.on('window-all-closed', () => app.quit());
