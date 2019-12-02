import { app, BrowserWindow, screen } from "electron";
import { join } from "path";
import { format } from "url";

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
    defaultEncoding: "utf-8",
    webPreferences: {
      backgroundThrottling: false,
      nodeIntegration: true,
    },
  });

  win.webContents.setFrameRate(60);

  win.loadURL(
    format({
      pathname: join(__dirname, "index.html"),
      protocol: "file:",
      slashes: true,
    }),
  );

  // 隐藏窗口，等待游戏加载完成之后确认尺寸再显示窗口
  win.hide();

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
