import { AfterViewInit, Component, ElementRef, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ElectronService } from "./providers/electron.service";

import * as avg from "avg-engine/engine";
import { AVGNativePath, EngineSettings } from "avg-engine/engine";

import { TransitionLayerService } from "./components/transition-layer/transition-layer.service";
import { GameInitializer } from "./game-initializer";

@Component({
  selector: "game",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements AfterViewInit, OnInit {
  constructor(private initializer: GameInitializer,
              public electronService: ElectronService,
              private router: Router,
              private elementRef: ElementRef) {
    avg.PlatformService.initFromWindow(window);
    if (avg.PlatformService.isDesktop()) {
      ElectronService.initDebugging();
    }
  }

  async ngOnInit() {
  }

  async ngAfterViewInit() {
    await this.initializer.initWindowEventListener(this.router);
    await this.initializer.initFileSystem();
    await this.initializer.initEngineSettings();
    await this.initializer.initResource();
    await this.initializer.initStyleSheets();
    await this.initializer.initGameSettings();
    await this.initializer.initDesktopWindow();
    await this.initializer.initAPI();
    await this.initializer.initLoadingService();
    this.initializer.preloadEngineAssets().then(
      v => {
        this.initializer.endInitilizing();

        // Start game
        const entryScript = AVGNativePath.join(
          avg.Resource.getPath(avg.ResourcePath.Scripts),
          EngineSettings.get("engine.env.entry_script_file") as string
        );

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

        // DebugingService.DebugMessager.asObservable().subscribe(
        //   (message: any) => {
        //     const script =
        //       avg.Resource.getPath(avg.ResourcePath.Scripts) +
        //       "/" +
        //       message.data;

        //     this.router.navigate(["reload-view"]).then(result => {
        //       this.router.navigate(["main-scene", { script: script }], {});
        //     });
        //   }
        // );
      },
      _ => {
      }
    );
  }
}
