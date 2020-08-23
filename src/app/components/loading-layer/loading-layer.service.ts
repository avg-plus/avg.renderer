import { Injectable } from "@angular/core";
import { AVGService } from "../../common/avg-service";

import * as createjs from "preload-js";
import * as $ from "jquery";
import { AnimationUtils } from "../../common/animations/animation-utils";
import { TransitionLayerService } from "../transition-layer/transition-layer.service";
import EnvSettings  from "engine/core/env-setting";

class ResourceFileGroup {
  public tips: string;
  public files: Array<string> = [];
}

@Injectable()
export class LoadingLayerService extends AVGService {
  private static syncDownloadQueue: Array<ResourceFileGroup> = [];
  private static asyncDownloadQueue: Array<ResourceFileGroup> = [];

  public static isShowLoadingScreen = false;
  public static currentDownloadTips;
  public static currentDownloadFile = "";
  public static currentProgress = 0;

  private static _isLoaderInitialized = false;

  private static _queue: any = new createjs.LoadQueue();

  private static onCompleted: () => void;

  public static init() {
    // A single file has completed loading.
    this._queue.on("fileload", event => {
      // console.log("preloadjs: fileload");
    });

    let progressAnimatedTimer;
    this._queue.on("progress", event => {
      this.currentProgress = event.loaded * 100;

      const elem = document.getElementById("load-progress");

      if (!progressAnimatedTimer) {
        progressAnimatedTimer = setInterval(() => {
          elem.style.width = this.currentProgress + "%";
          if (this.currentProgress >= 100) {
            this.currentProgress = 100;
            clearInterval(progressAnimatedTimer);
          }
        }, 1);
      }

      this.currentDownloadTips =
        "少女祈祷中..." + this.currentProgress.toFixed(1) + "%";

      if (event.loaded >= 1) {
        this.currentProgress = 100;
        this.currentDownloadTips = "正在进入游戏";
        AnimationUtils.fadeTo(".loading-progress", 600, 0);
        AnimationUtils.to("", ".loading-container", 600, {
          bottom: "0%"
        });
        AnimationUtils.to(
          "ChangeLoadingTips",
          ".loading-text",
          600,
          {
            fontSize: "7vh"
          },
          () => {
            // setTimeout(() => {
            //   this.hideLoadingScreen();
            // }, 500);
          }
        );
      }
    });

    this._queue.on("fileprogress", event => {
      // console.log("preloadjs: fileprogress ", event);
    });

    this._queue.on("error", err => {
      // console.log("preloadjs:", err);
    });
  }

  public static asyncLoading(url: string) {
    return new Promise((resolve, reject) => {
      const queue = new createjs.LoadQueue();
      queue.loadFile(url);

      queue.on("complete", () => {
        // console.log("Resource Loaded: " + url);
        resolve();
      });
    });
  }

  public static addToSyncList(group: ResourceFileGroup[]) {
    this.syncDownloadQueue = this.syncDownloadQueue.concat(group);
  }

  public static async startDownloadSync() {
    this.syncDownloadQueue.forEach(group => {
      const downloadList = group.files;
      downloadList.forEach(async file => {
        this.currentDownloadTips = group.tips;

        this.currentDownloadFile = file;
        this._queue.loadFile(file);
      });
    });

    // All file loaded
    return new Promise((resolve, reject) => {
      this._queue.on("complete", () => {
        resolve();
      });
    });
  }

  public static hideLoadingScreen() {
    return new Promise((resolve, reject) => {
      AnimationUtils.fadeTo("#loading-layer", 300, 0, () => {
        this.isShowLoadingScreen = false;
        TransitionLayerService.releasePointerEvents();

        resolve();
      });
    });
  }

  public static showLoadingScreen() {
    TransitionLayerService.lockPointerEvents();
    this.isShowLoadingScreen = true;
    AnimationUtils.fadeTo("#loading-layer", 500, 1);
    AnimationUtils.fadeTo(".loading-progress", 500, 1);

    if (!this._isLoaderInitialized) {
      const bg = EnvSettings.get("engine.loading_screen.background") as string;

      // const style = {
      //   width: "100%",
      //   height: "100%",
      //   "z-index": 9999999,
      //   background: "url(" + AVGNativePath.join(Resource.getAssetsRoot(), bg) + ")",
      //   "background-size": "100% 100%",
      //   "background-repeat": "no-repeat"
      // };

      // const s = EngineUtils.cssObjectToStyles(style);

      $(".lds-ellipsis").remove();
      // $("#loading-layer-container").prop("style", s);
    }
  }
}
