import * as fs from "fs";

import { Component, ElementRef, AfterViewInit } from "@angular/core";
import { Router } from "@angular/router";
import { ElectronService } from "./providers/electron.service";
import { APIImplManager } from "app/common/api/api-impl-manger";

import * as avg from "avg-engine/engine";

// import { app, BrowserWindow, screen, remote } from "electron";
import { TransitionLayerService } from "./components/transition-layer/transition-layer.service";
import { DebugingService } from "./common/debuging-service";
import { AVGNativeFS } from "avg-engine/engine";

@Component({
  selector: "game",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements AfterViewInit {
  constructor(
    public electronService: ElectronService,
    private router: Router,
    private elementRef: ElementRef
  ) {
    avg.PlatformService.initFromWindow(window);
    if (avg.PlatformService.isElectron()) {
      ElectronService.initDebugging();
    }
  }

  async ngAfterViewInit() {
    // Init resources
    avg.Resource.init(AVGNativeFS.__dirname + "/assets/");

    // Init settings
    const settings = await avg.AVGNativeFS.readFileSync(
      avg.AVGNativePath.join(avg.Resource.getRoot(), "game.json")
    );

    avg.Setting.parseFromSettings(JSON.stringify(settings));

    //  Init screen size

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

    // this.electronService.initDebugging();

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
