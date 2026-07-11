const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    title: "TrumpetPracticeHero",
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    },
    autoHideMenuBar: true
  });

  // Load from local build or Vite dev server based on environment
  if (process.env.ELECTRON_DEV === 'true') {
    mainWindow.loadURL('http://localhost:5173/');
  } else {
    mainWindow.loadFile(path.join(__dirname, 'dist', 'index.html'));
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
