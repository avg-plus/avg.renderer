const { app, BrowserWindow } = require("electron");
import minimist from "minimist";
let win;

const args = minimist(process.argv.slice(2));
delete args._;
console.log("args = ", args);

app.commandLine.appendSwitch("in-process-gpu");
// app.commandLine.appendSwitch("allow-insecure-localhost", "true");

function createWindow() {
  // const electronScreen = screen;

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
      webSecurity: true,
      // allowRunningInsecureContent: true,
      // nodeIntegrationInWorker: true,
      nodeIntegration: true
    }
  });

  // 隐藏窗口，等待游戏加载完成之后确认尺寸再显示窗口
  win.hide();

  // and load the index.html of the app.
  win.loadURL(`file://` + __dirname + `/index.html`);

  global.args = {
    debug: args.debug
  };

  if (args.serve) {
    win.webContents.openDevTools();
  }

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
