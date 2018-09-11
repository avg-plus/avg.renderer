import { Injectable } from "@angular/core";
import {
  AVGNativeFS,
  AVGNativePath,
  PlatformService,
  EngineSettings,
  Resource,
  Setting,
  AVGGame
} from "avg-engine/engine";
import { AVGNativeFSImpl } from "./common/filesystem/avg-native-fs-impl";
import { LoadingLayerService } from "./components/loading-layer/loading-layer.service";
import { APIImplManager } from "./common/api/api-impl-manger";
import * as $ from "jquery";
import { CanActivate, Router } from "@angular/router";

import * as avg from "avg-engine/engine";

@Injectable()
export class GameInitializer implements CanActivate {
  private _initilized = false;

  public endInitilizing() {
    this._initilized = true;
  }

  canActivate() {
    return this._initilized;
  }

  // Apply filesystem implementations to engine
  public initFileSystem() {
    for (const m in AVGNativeFS) {
      AVGNativeFS[m] = AVGNativeFSImpl[m];
    }
    AVGNativeFS.initFileSystem();
  }

  // Init engine settings
  public async initEngineSettings() {
    const content = await AVGNativeFS.readFileSync(AVGNativePath.join(AVGNativeFS.__dirname, "/data/engine.json"));

    if (PlatformService.isDesktop()) {
      EngineSettings.init(content);
    } else {
      EngineSettings.init(JSON.stringify(content));
    }
  }
  // Init resources
  public async initResource() {
    const assetsRootDirname = EngineSettings.get("engine.env.assets_root_dirname") as string;
    const dataRootDirname = EngineSettings.get("engine.env.data_root_dirname") as string;
    Resource.init(
      AVGNativePath.join(AVGNativeFS.__dirname, assetsRootDirname),
      AVGNativePath.join(AVGNativeFS.__dirname, dataRootDirname)
    );
  }

  // Init stylesheets
  public async initStyleSheets() {
    const dataRoot = AVGNativePath.join(AVGNativeFS.__dirname, "/data");
    let style = await AVGNativeFS.readFileSync(AVGNativePath.join(dataRoot, "/stylesheets/mask.css.tpl"));

    style = style.replace("$MASK_IMAGE_SPRITE_IRIS_IN", AVGNativePath.join(dataRoot, "/masks/iris-in.png"));
    style = style.replace("$MASK_IMAGE_SPRITE_IRIS_OUT", AVGNativePath.join(dataRoot, "/masks/iris-out.png"));
    style = style.replace("$MASK_IMAGE_SPRITE_WIPE", AVGNativePath.join(dataRoot, "/masks/wipe.png"));
    style = style.replace("$MASK_IMAGE_SPRITE_WINDOW_SHADES", AVGNativePath.join(dataRoot, "/masks/window-shades.png"));
    style = style.replace("$MASK_IMAGE_SPRITE_BRUSH", AVGNativePath.join(dataRoot, "/masks/brush.png"));
    style = style.replace("$MASK_IMAGE_SPRITE_BRUSH_DOWN", AVGNativePath.join(dataRoot, "/masks/brush-down.png"));

    // $("head").append(`<style>${style}</style>`);

    // console.log(style);
  }

  // Init settings
  public async initGameSettings() {
    const settingFile = AVGNativePath.join(Resource.getAssetsRoot(), "game.json");

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
          x: screen.getPrimaryDisplay().bounds.width / 2 - Setting.WindowWidth / 2,
          y: screen.getPrimaryDisplay().bounds.height / 2 - Setting.WindowHeight / 2
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
  public async preloadEngineAssets() {
    const loadingBackground = EngineSettings.get("engine.loading_screen.background") as string;

    const defaultFont = EngineSettings.get("engine.default_fonts") as string;

    await LoadingLayerService.asyncLoading(AVGNativePath.join(Resource.getAssetsRoot(), loadingBackground));
    await LoadingLayerService.asyncLoading(AVGNativePath.join(Resource.getAssetsRoot(), defaultFont));

    const fontStyle = `
    @font-face {
      font-family: "DefaultFont";
      font-style: normal;
      font-weight: 400;
      src: url('${AVGNativePath.join(Resource.getAssetsRoot(), defaultFont)}');
    }`;

    $("head").append("<style id='default-font'>" + fontStyle + "</style>");

    // Load necessary assets for engine
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
        files: [
          AVGNativeFS.__dirname + "/data/effects/shader/bg_fsh.shader",
          AVGNativeFS.__dirname + "/data/effects/shader/fx_brightbuf_fsh.shader",
          AVGNativeFS.__dirname + "/data/effects/shader/fx_common_fsh.shader",
          AVGNativeFS.__dirname + "/data/effects/shader/fx_common_vsh.shader",
          AVGNativeFS.__dirname + "/data/effects/shader/fx_dirblur_r4_fsh.shader",
          AVGNativeFS.__dirname + "/data/effects/shader/pp_final_fsh.shader",
          AVGNativeFS.__dirname + "/data/effects/shader/pp_final_vsh.shader",
          AVGNativeFS.__dirname + "/data/effects/shader/sakura_point_fsh.shader",
          AVGNativeFS.__dirname + "/data/effects/shader/sakura_point_vsh.shader"
        ]
      },

      {
        tips: "加载游戏资源...",
        files: [
          AVGNativePath.join(Resource.getAssetsRoot(), "audio/bgm/tutorial/Sunburst.mp3"),
          AVGNativePath.join(Resource.getAssetsRoot(), "audio/bgm/tutorial/BeautifulHawaii.mp3"),
          AVGNativePath.join(Resource.getAssetsRoot(), "audio/bgm/tutorial/text-theme.mp3"),
          AVGNativePath.join(Resource.getAssetsRoot(), "graphics/backgrounds/tutorial/avg-scene-forest.jpg"),
          AVGNativePath.join(Resource.getAssetsRoot(), "graphics/backgrounds/tutorial/bedroom-1-day.jpg"),
          AVGNativePath.join(Resource.getAssetsRoot(), "graphics/backgrounds/tutorial/bedroom-1.jpg"),
          AVGNativePath.join(Resource.getAssetsRoot(), "graphics/backgrounds/tutorial/demo-bg-1.jpg")
        ]
      }
    ]);

    LoadingLayerService.showLoadingScreen();

    await LoadingLayerService.startDownloadSync();
    await LoadingLayerService.hideLoadingScreen();
  }

  // Init playground communicator
  public async initWindowEventListener(router: Router) {
    if (window.addEventListener) {
      window.addEventListener(
        "message",
        event => {
          const message = event.data;

          router.ngOnDestroy();
          router.navigated = false;
          router.navigate(["main-scene", { script: "" }]).then(result => {
            AVGGame._entryStory = new avg.AVGStory();
            // story.UnsafeTerminate();

            AVGGame._entryStory.loadFromString(message);
            AVGGame._entryStory.run();
          });
        },
        false
      );
    }
  }
}
