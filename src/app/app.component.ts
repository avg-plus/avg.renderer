import { Component, ElementRef, AfterViewInit, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ElectronService } from "./providers/electron.service";

import * as avg from "avg-engine/engine";

import { TransitionLayerService } from "./components/transition-layer/transition-layer.service";
import { AVGNativePath, EngineSettings } from "avg-engine/engine";
import { GameInitializer } from "./game-initializer";
import { DebugPanel } from "./common/debugger/debug-panel";

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
    avg.PlatformService.initFromWindow(window);
    if (avg.PlatformService.isDesktop()) {
      ElectronService.initDebugging();
    }

    DebugPanel.init();
  }

  async ngOnInit() {}

  async ngAfterViewInit() {
    await this.initializer.initErrorHandler();
    await this.initializer.initWindowEventListener(this.router);
    await this.initializer.initFileSystem();
    await this.initializer.initEngineSettings();
    await this.initializer.initResource(this.route, this.router);
    // await this.initializer.initStyleSheets();
    await this.initializer.initGameSettings();
    await this.initializer.initHotkeys();
    await this.initializer.initDesktopWindow();
    await this.initializer.initGlobalClickEvent();
    await this.initializer.initAPI();
    await this.initializer.initLoadingService();
    this.initializer.preloadEngineAssets().then(
      v => {
        this.initializer.endInitilizing();

        // Start game
        const entryScript = AVGNativePath.join(avg.Resource.getPath(avg.ResourcePath.Scripts), EngineSettings.get(
          "engine.env.entry_script_file"
        ) as string);

        this.router.navigate(["main-scene", { script: entryScript }]).then(result => {
          if (result) {
            TransitionLayerService.fadeTo(0, 0);
          }
        });
      },
      _ => {}
    );
  }
}
