// import * as path from "path";
// import * as fs from "fs";

const path = null;
const fs = null;

import { Component, ElementRef, AfterViewInit } from "@angular/core";
import { Router } from "@angular/router";
import { ElectronService } from "./providers/electron.service";
import { APIImplManager } from "app/common/api/api-impl-manger";

import * as avg from "avg-engine/engine";

// import { app, BrowserWindow, screen, remote } from "electron";
import { TransitionLayerService } from "./components/transition-layer/transition-layer.service";
import { DebugingService } from "./common/debuging-service";
import { Http } from "@angular/http";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements AfterViewInit {
  constructor(
    public electronService: ElectronService,
    private router: Router,
    private elementRef: ElementRef,
    private http: Http
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
    avg.Resource.init("../assets/");

    // Init settings
    // const settings = fs.readFileSync(
    //   path.join(avg.Resource.getRoot(), "game.json"),
    //   { encoding: "utf8", flag: "r" }
    // );

    const settings = {}; // this.http.get("../assets/game.json");

    // avg.Setting.parseFromSettings(settings);

    // const win = remote.getCurrentWindow();

    // if (avg.Setting.FullScreen) {
    //   console.log(screen.getPrimaryDisplay());
    //   win.setBounds({
    //     width: screen.getPrimaryDisplay().bounds.width,
    //     height: screen.getPrimaryDisplay().bounds.height,
    //     x: 0,
    //     y: 0
    //   });
    //   win.setFullScreen(avg.Setting.FullScreen);
    // } else {
    //   win.setBounds({
    //     width: avg.Setting.WindowWidth,
    //     height: avg.Setting.WindowHeight,
    //     x:
    //       screen.getPrimaryDisplay().bounds.width / 2 -
    //       avg.Setting.WindowWidth / 2,
    //     y:
    //       screen.getPrimaryDisplay().bounds.height / 2 -
    //       avg.Setting.WindowHeight / 2
    //   });
    // }

    this.electronService.initDebugging();

    // Init transition
    // const element = this.elementRef.nativeElement.querySelector('#avg-transition');
    // transition.init(element);
    APIImplManager.init();

    const entryScript =
      avg.Resource.getPath(avg.ResourcePath.Scripts) + "/tutorial/tutorial.avs";

    this.router.navigate(["title-view"]).then(result => {
      if (result) {
        TransitionLayerService.fadeTo(0, 3000);
      }
    });

    this.router
      .navigate(["main-scene", { script: entryScript }])
      .then(result => {
        if (result) {
          TransitionLayerService.fadeTo(0, 3000);
        }
      });

    DebugingService.DebugMessager.asObservable().subscribe((message: any) => {
      const script =
        avg.Resource.getPath(avg.ResourcePath.Scripts) + "/" + message.data;

      this.router.navigate(["reload-view"]).then(result => {
        this.router.navigate(["main-scene", { script: script }], {});
      });
    });
  }
}
