import { Injectable } from "@angular/core";
import { AVGService } from "../../common/avg-service";
import {
  AVGNativeFS,
  EngineSettings,
  Resource,
  AVGNativePath,
  EngineUtils
} from "avg-engine/engine";

import * as createjs from "preload-js";
import * as $ from "jquery";

class ResourceFileGroup {
  public tips: string;
  public files: Array<string> = [];
}

@Injectable()
export class LoadingLayerService extends AVGService {
  private static syncDownloadQueue: Array<ResourceFileGroup> = [];
  private static asyncDownloadQueue: Array<ResourceFileGroup> = [];

  public static isShowLoadingScreen = false;
  public static currentDownloadTips = "";
  public static currentDownloadFile = "";
  public static currentProgress = "";

  private static _queue: any = new createjs.LoadQueue();

  public static init() {
    // All file loaded
    this._queue.on("complete", () => {
      // console.log("preloadjs: complete");
    });

    // A single file has completed loading.
    this._queue.on("fileload", event => {
      // console.log("preloadjs: fileload");
    });

    this._queue.on("progress", event => {
      this.currentProgress = (event.loaded * 100).toFixed(1);
      if (event.loaded >= 1) {
        this.currentProgress = "100";

        setTimeout(() => {
          // this.hideLoadingScreen();
        }, 500);
      }
    });

    this._queue.on("fileprogress", event => {
      // console.log("preloadjs: fileprogress ", event);
    });

    this._queue.on("error", err => {
      // console.log("preloadjs:", err);
    });
  }

  public static addToSyncList(group: ResourceFileGroup[]) {
    this.syncDownloadQueue = this.syncDownloadQueue.concat(group);
  }

  public static addToAsyncList(group: ResourceFileGroup[]) {
    this.asyncDownloadQueue = this.asyncDownloadQueue.concat(group);
  }

  public static startDownloadSync() {
    this.syncDownloadQueue.forEach(group => {
      this.currentDownloadTips = group.tips;

      const downloadList = group.files;
      downloadList.forEach(async file => {
        this.currentDownloadFile = file;
        this._queue.loadFile(file);

        // console.log("downloaded %s", file);
      });
    });
  }
  public static hideLoadingScreen() {
    this.isShowLoadingScreen = false;
  }

  public static showLoadingScreen() {
    this.isShowLoadingScreen = true;

    const bg = EngineSettings.get("engine.loading_screen.background") as string;
    // const e = document.getElementById("#loading-layer");

    console.log("bg", bg);

    const style = {
      width: "100%",
      height: "100%",
      "z-index": 9999999,
      background: "url(" + AVGNativePath.join(Resource.getRoot(), bg) + ")",
      "background-size": "100% 100%",
      "background-repeat": "no-repeat"
    };

    const s = EngineUtils.cssObjectToStyles(style);
    console.log("style", s);

    $("loading-layer").prop("style", s);
  }
}
