const { app, BrowserWindow, ipcMain, dialog } = require('electron');
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

    mainWindow.loadFile(path.join(__dirname, './index.html'));

    ipcMain.on("list-created", () => {
        dialog.showMessageBox(mainWindow, {
            type: "info",
            title: "Success",
            message: "List created successfully.",
        });
    });

    ipcMain.on("list-not-created", () => {
        dialog.showMessageBox(mainWindow, {
            type: "error",
            title: "Warning",
            message: "List title either blank or already exists.",
        });
    });

    ipcMain.on("list-deleted", () => {
        dialog
        .showMessageBox(mainWindow, {
          type: "info",
          title: "Success",
          message: "List deleted successfully.",
          buttons: ["OK"],
      })
        .then((response) => {
          if (response.response === 0) {
            mainWindow.reload();
        }
    })
        .catch((error) => {
            console.error(error);
        });
    });

}

app.whenReady().then(createMainWindow);
