import { APIManager } from "engine/scripting/api-manager";

import { Component, ElementRef, AfterViewInit, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ElectronService } from "./providers/electron.service";

import { TransitionLayerService } from "./components/transition-layer/transition-layer.service";
import { GameInitializer } from "./game-initializer";
import { GameResource, ResourcePath } from "engine/core/resource";
import { EngineSettings } from "engine/core/engine-setting";
import { PlatformService } from "engine/core/platform/platform-service";
import { AVGNativePath } from "engine/core/native-modules/avg-native-path";

// 初始化所有 API
import "../engine/scripting/exports";

@Component({
  selector: "game",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements AfterViewInit, OnInit {
  constructor(
    private initializer: GameInitializer,
    public electronService: ElectronService,
    private router: Router,
    private route: ActivatedRoute,
    private elementRef: ElementRef
  ) {
    PlatformService.initFromWindow(window);
    if (PlatformService.isDesktop()) {
      ElectronService.initDebugging();
    }
  }

  async ngOnInit() {
    await this.initializer.initErrorHandler();
    await this.initializer.initWindowEventListener(this.router);
    await this.initializer.initFileSystem();
    await this.initializer.initEngineSettings();
    await this.initializer.initResource(this.route, this.router);
    await this.initializer.initGameSettings();
    await this.initializer.initHotkeys();
    await this.initializer.initDesktopWindow();
    await this.initializer.initGameEngineData();
    await this.initializer.initGlobalClickEvent();
    await this.initializer.initLoadingService();
    await this.initializer.initAPI();
    this.initializer.preloadEngineAssets().then(
      v => {
        this.initializer.endInitilizing();

        // Start game
        const entryScript = AVGNativePath.join(GameResource.getPath(ResourcePath.Scripts), EngineSettings.get(
          "engine.env.entry_script_file"
        ) as string);

        this.router.navigate(["main-scene", { script: entryScript }]).then(result => {
          // if (result) {
          //   TransitionLayerService.fadeTo(0, 0);
          // }
        });
      },
      _ => {}
    );
  }

  async ngAfterViewInit() {
    const times = [];
    let fps;
    const fpsOut = document.getElementById("fps");

    let last = 0;
    function refreshLoop() {
      window.requestAnimationFrame(function() {
        const now = performance.now();

        while (times.length > 0 && times[0] <= now - 1000) {
          times.shift();
        }
        times.push(now);
        fps = times.length;

        if (now - last > 100) {
          fpsOut.innerHTML = fps + " fps";
          last = now;
        }

        refreshLoop();
      });
    }

    // refreshLoop();
  }
}
