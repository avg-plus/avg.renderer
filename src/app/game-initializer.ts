import { SlotManager } from "./../engine/plugin/hooks/slot-manager";
import { Injectable } from "@angular/core";

import { LoadingLayerService } from "./components/loading-layer/loading-layer.service";
import { APIImplManager } from "./common/api/api-impl-manger";
import * as $ from "jquery";
import { CanActivate, Router, ActivatedRoute } from "@angular/router";

import { AVGEngineError } from "../engine/core/engine-errors";
import { TransitionLayerService } from "./components/transition-layer/transition-layer.service";
import { AVGPlusIPC } from "./common/manager/avgplus-ipc";
import { input } from "engine/core/input";
import { i18n } from "engine/core/i18n";
import { EngineSettings } from "engine/core/engine-setting";
import { GameResource } from "engine/core/resource";
import { Setting } from "engine/core/setting";
import { PlatformService } from "engine/core/platform/platform-service";
import { AVGNativeFS } from "engine/core/native-modules/avg-native-fs";
import { AVGNativePath } from "engine/core/native-modules/avg-native-path";
import { APIManager } from "engine/scripting/api-manager";
import { randomIn, getRandomBetween } from "engine/core/utils";
import { HTMLWidgetManager } from "./common/manager/html-widget-manager";
import { DanmakuManager } from "engine/core/danmaku-mananger";

@Injectable()
export class GameInitializer implements CanActivate {
  private _initilized = false;

  public endInitilizing() {
    this._initilized = true;
  }

  canActivate() {
    return this._initilized;
  }

  public async initHotkeys() {
    input.init();
  }

  async initHTMLWidgetLayer() {
    HTMLWidgetManager.init();
  }

  public async initErrorHandler() {
    AVGEngineError.init(window, error => {
      alert("错误：" + error.desc);

      // if (PlatformService.isDesktop()) {
      //   // window.close();
      //   return;
      // }

      const errorTemplate = `
        <div style="padding:20px; width: 100%; height: 100%; background: #292929; user-select: auto; color: white; overflow-y: scroll">
          <h2 style="color: salmon;">${error.type}</h2>
          ${"<h3 style='color: bisque;'> Error In " + error.file + "</h3>"}
          <h4 style='color: indianred;'> [${i18n.lang.ERROR_HANDLER_ERROR}] <br>${error.desc}</h4>
          <br>
          <h3 style='color: salmon;'>${i18n.lang.ERROR_HANDLER_ADDITION_INFOS}</h3>
          ${
            error.data.file
              ? "<div style='color: bisque; white-space: pre; user-select: auto;'> File: " + error.data.file + "</div>"
              : ""
          }
          ${
            error.data.lineNumber
              ? "<div style='color: bisque; white-space: pre; user-select: auto;'> Line: " +
                error.data.lineNumber +
                "</div>"
              : ""
          }

        ${JSON.stringify(error.data)}
        </div>
      `;

      $("body").html(errorTemplate);
    });
  }

  // Apply filesystem implementations to engine
  public async initFileSystem() {
    await AVGNativeFS.initFileSystem();
  }

  public async initGameEngineData() {
    SlotManager.init();
  }

  public async initDanmaku() {
    DanmakuManager.initDanmaku();
  }

  // Init engine environment settings
  public async initEngineSettings() {
    const content = await AVGNativeFS.readFileSync(AVGNativePath.join(AVGNativeFS.__dirname, "/data/env.json"));

    EngineSettings.init(content);
  }

  // Init resources
  public async initResource(route: ActivatedRoute, router: Router) {
    // Get current url params to get assets directory
    console.log("init resource", router.url);

    // Read 'engine.json' to get game project dir and engine dir
    const content = await AVGNativeFS.readFileSync(AVGNativePath.join(AVGNativeFS.__dirname, "engine.json"));
    const envData = JSON.parse(content);

    // let assetsRootDirname = EngineSettings.get("engine.env.assets_root_dirname") as string;
    // let dataRootDirname = EngineSettings.get("engine.env.data_root_dirname") as string;

    let assetsRootDirname = envData.game_assets_root as string;
    let dataRootDirname = envData.engine_bundle_root as string;

    // 如果不是 HTTP URL 则使用本地路径
    if (!AVGNativePath.isHttpURL(dataRootDirname)) {
      dataRootDirname = AVGNativePath.join(AVGNativeFS.__dirname, dataRootDirname);
    }

    GameResource.init(assetsRootDirname, dataRootDirname);
  }

  // Init settings
  public async initGameSettings() {
    const settingFile = AVGNativePath.join(GameResource.getAssetsRoot(), "game.json");

    console.log(AVGNativeFS);

    try {
      const settings = await AVGNativeFS.readFileSync(settingFile);
      Setting.parseFromSettings(settings);
    } catch (error) {
      AVGEngineError.emit("初始化失败", "游戏配置文件初始化失败，请检查资源路径或者网络是否通畅");
      return false;
    }
  }

  public async initGlobalClickEvent() {
    document.addEventListener("click", (evnt: Event) => {
      const element = <any>evnt.target;

      // TODO: If has 'story-locker' attribute, prevent click event for story process
      if (element.attributes["story-locker"]) {
        return;
      }

      if (!TransitionLayerService.isLockPointerEvents()) {
        TransitionLayerService.FullScreenClickListener.next();
      }
    });
  }

  //  Init screen size
  public async initDesktopWindow() {
    if (PlatformService.isDesktop()) {
      const { app, BrowserWindow, screen, remote } = require("electron");

      const win = remote.getCurrentWindow();
      if (Setting.FullScreen) {
        // win.setBounds({
        //   width: screen.getPrimaryDisplay().bounds.width,
        //   height: screen.getPrimaryDisplay().bounds.height,
        //   x: 0,
        //   y: 0
        // });
        win.setFullScreen(Setting.FullScreen);
      } else {
        win.setContentSize(Setting.WindowWidth, Setting.WindowHeight);
        win.show();
        // win.setBounds({
        //   width: Setting.WindowWidth,
        //   height: Setting.WindowHeight,
        //   x: screen.getPrimaryDisplay().bounds.width / 2 - Setting.WindowWidth / 2,
        //   y: screen.getPrimaryDisplay().bounds.height / 2 - Setting.WindowHeight / 2
        // });
      }
      // this.electronService.initDebugging();
    }
  }

  // Init API implementations
  public async initAPI() {
    APIImplManager.init();
    APIManager.Instance.init();
  }

  public async initLoadingService() {
    // LoadingLayerService.init();
  }

  // Preload resources
  public async preloadEngineAssets() {
    // const loadingBackground = EngineSettings.get("engine.loading_screen.background") as string;

    const defaultFont = EngineSettings.get("engine.default_fonts") as string;

    // await LoadingLayerService.asyncLoading(AVGNativePath.join(Resource.getAssetsRoot(), loadingBackground));
    // await LoadingLayerService.asyncLoading(AVGNativePath.join(Resource.getAssetsRoot(), defaultFont));

    const fontStyle = `
    @font-face {
      font-family: "DefaultFont";
      font-style: normal;
      font-weight: 400;
      src: url('${AVGNativePath.join(GameResource.getAssetsRoot(), defaultFont)}');
    }`;

    // $("head").append("<style id='default-font'>" + fontStyle + "</style>");

    // Load necessary assets for engine
    LoadingLayerService.addToSyncList([
      {
        tips: "正在加载过渡效果...",
        files: [
          // AVGNativeFS.__dirname + "/data/masks/brush-down.png",
          // AVGNativeFS.__dirname + "/data/masks/brush.png",
          // AVGNativeFS.__dirname + "/data/masks/iris-in.png",
          // AVGNativeFS.__dirname + "/data/masks/iris-out.png",
          // AVGNativeFS.__dirname + "/data/masks/window-shades.png",
          // AVGNativeFS.__dirname + "/data/masks/wipe.png"
        ]
      },
      {
        tips: "正在加载特效...",
        files: [
          // AVGNativeFS.__dirname + "/data/effects/shader/bg_fsh.shader",
          // AVGNativeFS.__dirname + "/data/effects/shader/fx_brightbuf_fsh.shader",
          // AVGNativeFS.__dirname + "/data/effects/shader/fx_common_fsh.shader",
          // AVGNativeFS.__dirname + "/data/effects/shader/fx_common_vsh.shader",
          // AVGNativeFS.__dirname + "/data/effects/shader/fx_dirblur_r4_fsh.shader",
          // AVGNativeFS.__dirname + "/data/effects/shader/pp_final_fsh.shader",
          // AVGNativeFS.__dirname + "/data/effects/shader/pp_final_vsh.shader",
          // AVGNativeFS.__dirname + "/data/effects/shader/sakura_point_fsh.shader",
          // AVGNativeFS.__dirname + "/data/effects/shader/sakura_point_vsh.shader"
        ]
      },

      {
        tips: "加载游戏资源...",
        files: [
          // AVGNativePath.join(Resource.getAssetsRoot(), "audio/se/explode.wav"),
          // AVGNativePath.join(Resource.getAssetsRoot(), "audio/bgm/living.mp3"),
          // AVGNativePath.join(Resource.getAssetsRoot(), "graphics/backgrounds/lab-lighting.jpg"),
          // AVGNativePath.join(Resource.getAssetsRoot(), "graphics/characters/kingwl-normal.png"),
          // AVGNativePath.join(Resource.getAssetsRoot(), "graphics/characters/kingwl-really.png"),
          // AVGNativePath.join(Resource.getAssetsRoot(), "graphics/characters/latyas-normal.png"),
          // AVGNativePath.join(Resource.getAssetsRoot(), "graphics/characters/latyas-laugh.png"),
          // AVGNativePath.join(Resource.getAssetsRoot(), "graphics/characters/latyas-serious.png"),
          // AVGNativePath.join(Resource.getAssetsRoot(), "graphics/characters/space-normal.png"),
          // AVGNativePath.join(Resource.getAssetsRoot(), "graphics/characters/space-smile.png"),
          // AVGNativePath.join(Resource.getAssetsRoot(), "graphics/characters/space-hidden.png"),
          // AVGNativePath.join(Resource.getAssetsRoot(), "graphics/characters/vizee-normal.png"),
        ]
      }
    ]);

    // LoadingLayerService.showLoadingScreen();

    // await LoadingLayerService.startDownloadSync();
    // await LoadingLayerService.hideLoadingScreen();
  }

  // Init playground communicator
  public async initWindowEventListener(router: Router) {
    AVGPlusIPC.init(router);
  }
}
