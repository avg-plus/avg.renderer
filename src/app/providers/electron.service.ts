import { Injectable } from "@angular/core";

// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.

import * as childProcess from "child_process";
import { PlatformService } from "engine/core/platform";
// import { DebugingService } from "app/common/debuging-service";

// import {
//   TouchBarSpacer,
//   TouchBar,
//   TouchBarLabel,
//   TouchBarButton
// } from "electron";
// import { dialog } from "electron";

// const { app, dialog } = require("electron");

let remote = null;
let ipcRenderer = null;

if (PlatformService.isDesktop()) {
  remote = require("electron").remote;
  ipcRenderer = require("electron").ipcRenderer;
}

@Injectable()
export class ElectronService extends PlatformService {
  ipcRenderer: typeof ipcRenderer;
  childProcess: typeof childProcess;

  public static initDebugging() {
    // DebugingService.initDebugMenus();
  }

  constructor() {
    super();

    if (PlatformService.isDesktop()) {
      this.ipcRenderer = window.require("electron").ipcRenderer;
      this.childProcess = window.require("child_process");
    }
  }

  public setMenuTouchBar() {
    //   // Reel labels
    //   const startGameLabel = new TouchBarLabel({
    //     label: "开始游戏",
    //     textColor: "blue"
    //   });
    //   // const reel2 = new TouchBarLabel();
    //   // const reel3 = new TouchBarLabel();
    //   // Spin result label
    //   // const result = new TouchBarLabel();
    //   // Spin button
    //   const spin = new TouchBarButton({
    //     label: "🎰 Spin",
    //     backgroundColor: "#7851A9",
    //     click: () => {}
    //   });
    //   const touchBar = new TouchBar({
    //     items: [startGameLabel, spin]
    //   });
    //   // (<any>window).setTouchBar(touchBar);
  }
}
