import { Injectable } from "@angular/core";
import {
  AVGNativeFS,
  AVGNativePath,
  PlatformService,
  EngineSettings,
  Resource,
  Setting
} from "avg-engine/engine";
import { AVGNativeFSImpl } from "./common/filesystem/avg-native-fs-impl";
import { LoadingLayerService } from "./components/loading-layer/loading-layer.service";
import { APIImplManager } from "./common/api/api-impl-manger";

@Injectable()
export class GameInitializer {
  // Apply filesystem implementations to engine
  public initFileSystem() {
    for (const m in AVGNativeFS) {
      AVGNativeFS[m] = AVGNativeFSImpl[m];
    }
    AVGNativeFS.initFileSystem();
  }

  // Init engine settings
  public async initEngineSettings() {
    const content = await AVGNativeFS.readFileSync(
      AVGNativePath.join(AVGNativeFS.__dirname, "/data/engine.json")
    );

    if (PlatformService.isDesktop()) {
      EngineSettings.init(content);
    } else {
      EngineSettings.init(JSON.stringify(content));
    }
  }
  // Init resources
  public async initResource() {
    Resource.init(AVGNativeFS.__dirname + "/assets/");
  }
  // Init settings
  public async initGameSettings() {
    const settingFile = AVGNativePath.join(Resource.getRoot(), "game.json");

    const settings = await AVGNativeFS.readFileSync(settingFile);

    if (PlatformService.isDesktop()) {
      Setting.parseFromSettings(settings);
    } else {
      Setting.parseFromSettings(JSON.stringify(settings));
    }
  }

  //  Init screen size
  public async initDesktopWindow() {
    if (PlatformService.isDesktop()) {
      const { app, BrowserWindow, screen, remote } = require("electron");

      const win = remote.getCurrentWindow();
      if (Setting.FullScreen) {
        console.log(screen.getPrimaryDisplay());
        win.setBounds({
          width: screen.getPrimaryDisplay().bounds.width,
          height: screen.getPrimaryDisplay().bounds.height,
          x: 0,
          y: 0
        });
        win.setFullScreen(Setting.FullScreen);
      } else {
        win.setBounds({
          width: Setting.WindowWidth,
          height: Setting.WindowHeight,
          x:
            screen.getPrimaryDisplay().bounds.width / 2 -
            Setting.WindowWidth / 2,
          y:
            screen.getPrimaryDisplay().bounds.height / 2 -
            Setting.WindowHeight / 2
        });
      }
      // this.electronService.initDebugging();
    }
  }

  // Init API implementations
  public async initAPI() {
    APIImplManager.init();
  }

  public async initLoadingService() {
    LoadingLayerService.init();
  }

  // Preload resources
  public async preloadAssets() {
    LoadingLayerService.addToSyncList([
      {
        tips: "正在加载过渡效果...",
        files: [
          AVGNativeFS.__dirname + "/data/masks/brush-down.png",
          AVGNativeFS.__dirname + "/data/masks/brush.png",
          AVGNativeFS.__dirname + "/data/masks/iris-in.png",
          AVGNativeFS.__dirname + "/data/masks/iris-out.png",
          AVGNativeFS.__dirname + "/data/masks/window-shades.png",
          AVGNativeFS.__dirname + "/data/masks/wipe.png"
        ]
      },
      {
        tips: "正在加载特效...",
        files: [AVGNativeFS.__dirname + "/data/effects/effect-snow.json"]
      }
    ]);

    LoadingLayerService.showLoadingScreen();
    LoadingLayerService.startDownloadSync();
  }
}
