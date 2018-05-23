import {
    app,
    BrowserWindow,
    screen,
    Menu,
    MenuItem,
    autoUpdater,
    dialog
} from "electron";
// import * as path from "path";

const path = null;
const fs = null;
const url = null;

let win, serve;

const args = process.argv.slice(1);
serve = args.some(val => val === "--serve");

if (serve) {
    require("electron-reload")(__dirname, {});
}

function createWindow() {
    const electronScreen = screen;
    const size = electronScreen.getPrimaryDisplay().workAreaSize;

    // Create the browser window.
    win = new BrowserWindow({
        width: 1366,
        height: 768,
        resizable: false,
        backgroundColor: "#000000",
        hasShadow: true
    });
    
    win.webContents.setFrameRate(60);

    // and load the index.html of the app.
    win.loadURL("file://" + __dirname + "/index.html");

    // Open the DevTools.
    if (serve) {
        win.webContents.openDevTools();
    }

    // Emitted when the window is closed.
    win.on("closed", () => {
        // Dereference the window object, usually you would store window
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
        app.quit();
    });
}

try {
    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    app.on("ready", () => {
        setTimeout(function() {
            // const server = "http://47.106.10.135:1337";
            // const feed = `${server}/update/${process.platform}/${app.getVersion()}`;

            // autoUpdater.on(
            //   "update-downloaded",
            //   (event, releaseNotes, releaseName) => {
            //     const dialogOpts = {
            //       type: "info",
            //       buttons: ["Restart", "Later"],
            //       title: "Application Update",
            //       message: process.platform === "win32" ? releaseNotes : releaseName,
            //       detail:
            //         "A new version has been downloaded. Restart the application to apply the updates."
            //     };

            //     dialog.showMessageBox(dialogOpts, response => {
            //       if (response === 0) {
            //         autoUpdater.quitAndInstall();
            //       }
            //     });
            //   }
            // );

            // autoUpdater.on("update-available", message => {
            //   console.log("update available");
            // });

            // autoUpdater.on("update-not-available", message => {
            //   console.log("update notavailable");
            // });

            // autoUpdater.on("error", message => {
            //   console.error("There was a problem updating the application");
            //   console.error(message);
            // });

            // autoUpdater.setFeedURL(feed);
            // autoUpdater.checkForUpdates();

            createWindow();
        }, 1000);
    });

    // Quit when all windows are closed.
    app.on("window-all-closed", () => {
        // On OS X it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        if (process.platform !== "darwin") {
            app.quit();
        }
    });

    app.on("activate", () => {
        // On OS X it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (win === null) {
            createWindow();
        }
    });
} catch (e) {
    // Catch Error
    // throw e;
}
