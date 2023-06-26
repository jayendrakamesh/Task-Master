const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createMainWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, './preload.js')
        }
    });

    mainWindow.loadFile(path.join(__dirname, 'index.html'));

}

app.whenReady().then(createMainWindow);
