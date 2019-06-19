import { app, BrowserWindow, screen, Menu, MenuItem, autoUpdater, dialog } from "electron";

import * as path from "path";
import * as url from "url";

let win, serve;

const args = process.argv.slice(1);
serve = args.some(val => val === "--serve");

app.commandLine.appendSwitch("in-process-gpu");

function createWindow() {
  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    width: 1280,
    height: 760,
    minWidth: 800,
    minHeight: 450,
    resizable: true,
    backgroundColor: "#000000",
    hasShadow: true,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.webContents.setFrameRate(60);

  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file:",
      slashes: true
    })
  );

  // and load the index.html of the app.
  // win.loadURL("file://" + __dirname + "/index.html");

  // Open the DevTools.
  if (serve) {
    win.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  win.on("closed", () => {
    win = null;
    app.quit();
  });
}

try {
  app.on("ready", () => {
    createWindow();
  });

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });

  app.on("activate", () => {
    if (win === null) {
      createWindow();
    }
  });
} catch (e) {
  alert(e);
}
