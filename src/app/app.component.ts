import { APIManager } from "engine/scripting/api-manager";

import { Component, ElementRef, AfterViewInit, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ElectronService } from "./providers/electron.service";

import { TransitionLayerService } from "./components/transition-layer/transition-layer.service";
import { GameInitializer } from "./game-initializer";
import { GameResource, ResourcePath } from "engine/core/resource";
import { PlatformService } from "engine/core/platform/platform-service";
import { AVGNativePath } from "engine/core/native-modules/avg-native-path";

// 初始化所有 API
import "../engine/scripting/exports";
import EnvSetting from 'engine/core/env-setting';

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
    await this.initializer.initEnvSettings();
    await this.initializer.initResource(this.route, this.router);
    await this.initializer.initGameSettings();
    await this.initializer.initHotkeys();
    await this.initializer.initDesktopWindow();
    await this.initializer.initGameEngineData();
    await this.initializer.initGlobalClickEvent();
    await this.initializer.initLoadingService();
    await this.initializer.initAPI();
    await this.initializer.initHTMLWidgetLayer();
    // await this.initializer.initDanmaku();
    await this.initializer.initDebugServer();
    this.initializer.preloadEngineAssets().then(
      v => {
        this.initializer.endInitilizing();

        // Start game
        const entryScript = AVGNativePath.join(
          GameResource.getPath(ResourcePath.Scripts),
          EnvSetting.get("engine.env.entry_script_file") as string
        );

        this.router
          .navigate(["main-scene", { script: entryScript }])
          .then(result => {
            // if (result) {
            //   TransitionLayerService.fadeTo(0, 0);
            // }
          });
      },
      _ => {}
    );
  }

  async ngAfterViewInit() {}
}
