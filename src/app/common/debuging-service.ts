import * as avg from "avg-engine/engine";
// import * as fs from "fs";
// import { MenuItemConstructorOptions } from "electron";
import { Subject } from "rxjs/Subject";

// const { app } = require("electron");
// const remote = require("electron").remote;
// const ipcRenderer = require("electron").ipcRenderer;

class MenuItemConstructorOptions {}
const app: any = null;
const remote: any = null;
const ipcRenderer: any = null;

export enum DebugMessageType {
  LiveLoadScript
}

export class DebugingService {
  public static DebugMessager: Subject<any> = new Subject<any>();

  public static listAllScripts() {
    // return fs.readdirSync(avg.Resource.getPath(avg.ResourcePath.Scripts));
  }

  public static initDebugMenus() {
    // const files = this.listAllScripts();

    // const scriptMenus = [];
    // files.forEach(f => {
    //   scriptMenus.push({
    //     label: f,
    //     click: () => {
    //       console.log("menu click");
    //       this.DebugMessager.next({
    //         type: DebugMessageType.LiveLoadScript,
    //         data: f
    //       });
    //     }
    //   });
    // });

    // const template: MenuItemConstructorOptions[] = [
    //   {
    //     label: "Edit",
    //     submenu: [
    //       { role: "undo" },
    //       { role: "redo" },
    //       { type: "separator" },
    //       { role: "cut" },
    //       { role: "copy" },
    //       { role: "paste" },
    //       { role: "pasteandmatchstyle" },
    //       { role: "delete" },
    //       { role: "selectall" }
    //     ]
    //   },
    //   {
    //     label: "View",
    //     submenu: [
    //       { role: "reload" },
    //       { role: "forcereload" },
    //       { role: "toggledevtools" },
    //       { type: "separator" },
    //       { role: "resetzoom" },
    //       { role: "zoomin" },
    //       { role: "zoomout" },
    //       { type: "separator" },
    //       { role: "togglefullscreen" }
    //     ]
    //   },
    //   {
    //     role: "window",
    //     submenu: [{ role: "minimize" }, { role: "close" }]
    //   },
    //   {
    //     role: "help",
    //     submenu: [
    //       {
    //         label: "Learn More",
    //         click() {
    //           require("electron").shell.openExternal("https://electronjs.org");
    //         }
    //       }
    //     ]
    //   }
    // ];

    // console.log("Current Platform = " + window.process.platform);
    // if (window.process.platform === "darwin") {
    //   template.unshift({
    //     label: "Electron",
    //     submenu: [
    //       { role: "about" },
    //       { type: "separator" },
    //       { role: "services", submenu: [] },
    //       { type: "separator" },
    //       { role: "hide" },
    //       { role: "hideothers" },
    //       { role: "unhide" },
    //       { type: "separator" },
    //       { role: "quit" }
    //     ]
    //   });
    // }

    // template.push({
    //   label: "Debug",
    //   submenu: [
    //     {
    //       label: "🔈 声音",
    //       submenu: [
    //         {
    //           label: "▶️ 播放BGM",
    //           click: (menuItem, browserWindow, event) => {
    //             avg.api.resumeBGM();
    //           }
    //         },
    //         {
    //           label: "⏸ 暂停BGM",
    //           click: (menuItem, browserWindow, event) => {
    //             avg.api.stopBGM();
    //           }
    //         }
    //       ]
    //     },

    //     {
    //       label: "📽 执行脚本",
    //       submenu: scriptMenus
    //     },
    //     {
    //       label: "🔚 返回标题画面",
    //       click: (menuItem, browserWindow, event) => {
    //         avg.api.callTitleView();
    //       }
    //     }
    //   ]
    // });

    // const menu = remote.Menu.buildFromTemplate(
    //   <MenuItemConstructorOptions[]>template
    // );

    // remote.Menu.setApplicationMenu(menu);
  }
}
