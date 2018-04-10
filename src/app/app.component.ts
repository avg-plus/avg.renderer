import * as path from "path";
import * as fs from "fs";

import { Component, ElementRef, AfterViewInit } from "@angular/core";
import { Router } from "@angular/router";
import { ElectronService } from "./providers/electron.service";
import { transition } from "app/common/manager/transition";
import { APIImplManager } from "app/common/api/api-impl-manger";

import * as avg from "avg-engine/engine";

import { app, BrowserWindow, screen, remote } from "electron";
import { TransitionLayerService } from "./components/transition-layer/transition-layer.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements AfterViewInit {
  constructor(
    public electronService: ElectronService,
    private router: Router,
    private elementRef: ElementRef
  ) {
    if (electronService.isElectron()) {
      console.log("Mode electron");
      // Check if electron is correctly injected (see externals in webpack.config.js)
      // console.log('c', electronService.ipcRenderer);
      // Check if nodeJs childProcess is correctly injected (see externals in webpack.config.js)
      // console.log('c', electronService.childProcess);
    } else {
      console.log("Mode web");
    }
  }

  ngAfterViewInit() {
    // Init Resources
    avg.Resource.init(__dirname + "/assets/");

    // Init settings
    let settings = fs.readFileSync(
      path.join(avg.Resource.getRoot(), "game.json"),
      { encoding: "utf8", flag: "r" }
    );
    avg.Setting.parseFromSettings(settings);

    let win = remote.getCurrentWindow();

    if (avg.Setting.FullScreen) {
      console.log(screen.getPrimaryDisplay());
      win.setBounds({
        width: screen.getPrimaryDisplay().bounds.width,
        height: screen.getPrimaryDisplay().bounds.height,
        x: 0,
        y: 0
      });
      win.setFullScreen(avg.Setting.FullScreen);
    } else {
      win.setBounds({
        width: avg.Setting.WindowWidth,
        height: avg.Setting.WindowHeight,
        x: 0,
        y: 0
      });
    }

    console.log(win);

    // Init transition
    // const element = this.elementRef.nativeElement.querySelector('#avg-transition');
    // transition.init(element);
    APIImplManager.init();

    // this.router.navigate(["title-view"]).then(result => {
    //   if (result) {
    //     TransitionLayerService.fadeTo(0, 3000);
    //   }
    // });
    this.router.navigate(["main-scene"]).then(result => {
      if (result) {
        TransitionLayerService.fadeTo(0, 0);
      }
    });
  }
}
