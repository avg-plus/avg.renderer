const { app, BrowserWindow } = require("electron");
const minimist = require("./libs/minimist");

let win;

process.argv = process.argv.slice(2);

app.commandLine.appendSwitch("in-process-gpu");

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
  win.setMenu(null);

  // and load the index.html of the app.
  win.loadURL(`file://` + __dirname + `/index.html`);


  global.args = minimist(process.argv);

  console.log("  global.args from main: ",  global.args);

  // if (global.args) {
  //   win.webContents.openDevTools();
  // }

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
