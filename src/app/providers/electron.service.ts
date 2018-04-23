import { Injectable } from "@angular/core";

// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.

import * as childProcess from "child_process";
import { DebugingService } from "app/common/debuging-service";

const { app } = require("electron");
const remote = require("electron").remote;
const ipcRenderer = require("electron").ipcRenderer;

@Injectable()
export class ElectronService {
  ipcRenderer: typeof ipcRenderer;
  childProcess: typeof childProcess;

  constructor() {
    // Conditional imports
    if (this.isElectron()) {
      this.ipcRenderer = window.require("electron").ipcRenderer;
      this.childProcess = window.require("child_process");
    }
  }

  public initDebugging() {
    if (!this.isElectron()) {
      return;
    }

    DebugingService.initDebugMenus();
  }

  isElectron = () => {
    return window && window.process && window.process.type;
  };
}
