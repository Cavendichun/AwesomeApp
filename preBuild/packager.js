const electron = require("electron");
const path = require("path");
const { app, BrowserWindow, ipcMain } = electron;

let mainWindow = null;

function createMianWindow () {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        frame: false
    })
    mainWindow.loadFile(path.resolve(__dirname, './dist/index.html'));
    mainWindow.on("closed", function () {
        mainWindow = null;
        app.quit();
    })
    mainWindow.on("maximize", function () {
        mainWindow.webContents.send('window-maximize');
    })
    mainWindow.on("unmaximize", function () {
        mainWindow.webContents.send('window-unmaximize');
    })
    // mainWindow.webContents.openDevTools();
}

app.on("ready", function () {
    createMianWindow();
})

app.on("window-all-closed", function () {
    app.quit();
})

ipcMain.on('close-app', () => {
    mainWindow.close();
});

ipcMain.on('min-app', () => {
    mainWindow.minimize();
});

ipcMain.on('max-app', () => {
    if (mainWindow.isMaximized()) {
        // 若已经是最大化了，则还原
        mainWindow.unmaximize();
    } else {
        // 最大化窗口
        mainWindow.maximize();
    }
});
