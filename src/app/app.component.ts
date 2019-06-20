import { Component, ElementRef, AfterViewInit, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ElectronService } from "./providers/electron.service";

import { TransitionLayerService } from "./components/transition-layer/transition-layer.service";
import { GameInitializer } from "./game-initializer";
import { DebugPanel } from "./common/debugger/debug-panel";
import { PlatformService } from "engine/core/platform";
import { Resource, ResourcePath } from "engine/core/resource";
import { AVGNativePath } from "engine/core/native-modules";
import { EngineSettings } from "engine/core/engine-setting";
import Axios from "axios";

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

    DebugPanel.init();
  }

  async ngOnInit() {

    const a = Axios.get("http://127.0.0.1:2335/game.json").then(results => {
      console.log(results.data);
    });
  }

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
        const entryScript = AVGNativePath.join(Resource.getPath(ResourcePath.Scripts), EngineSettings.get(
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
