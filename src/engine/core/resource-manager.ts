/*
 资源管理器提供三种加载方式：
  - 按需加载：需要用到资源的时候再从硬盘/网络上进行资源的加载，可能会造成卡顿
  - 手动预加载：可以在任意时机指定预加载的资源，并缓存
  - 自动预加载：由引擎来推测需要预加载的资源
*/
// import * as Loader from "resource-loader";
import * as PIXI from "pixi.js";
import { getExtension } from "./utils";

enum LoadingTaskStatus {
  Pending,
  Loading,
  Finished
}

type LoadingTask = {
  name: string;
  url: string;
  onCompleted: (resource: PIXI.LoaderResource) => void;
  status: LoadingTaskStatus;
};

/**
 * 用于管理资源的加载
 *
 * @export
 * @class ResourceManager
 */
class GameResourceManager {
  private loadingTasks: Map<string, LoadingTask> = new Map<string, LoadingTask>();
  public resourceLoader = PIXI.Loader.shared;

  constructor() {
    this.resourceLoader.concurrency = 10;
  }
  /**
   * 添加一项资源加载任务，会堵塞帧
   *
   * @param {string} name
   * @param {string} url
   * @memberof GameResourceManager
   */
  public addLoading(url: string, onCompleted?: (resource: PIXI.LoaderResource) => void) {
    // 这里用 URL 作为 key，便于检索资源缓存
    const resource = this.resourceLoader.resources[url];

    // 资源存在则直接返回
    if (resource) {
      console.log("Resource load from cached: ", url);

      if (onCompleted) {
        onCompleted(resource);
      }
      return;
    }

    const task: LoadingTask = {
      name: url,
      url,
      onCompleted,
      status: LoadingTaskStatus.Pending
    };

    this.loadingTasks.set(url, task);
  }

  public update() {
    if (this.resourceLoader.loading) {
      return;
    }

    const pendingTasks = [];
    this.loadingTasks.forEach(v => {
      if (v.status === LoadingTaskStatus.Pending) {
        pendingTasks.push(v);
      }
    });

    if (pendingTasks && pendingTasks.length > 0) {
      for (let task of pendingTasks) {
        let loadOptions = {};
        const extension = getExtension(task.url);
        if (extension === "gif") {
          loadOptions = {
            loadType: "arraybuffer",
            xhrType: "arraybuffer",
            crossOrigin: "*"
          };
        }

        // 这里用 URL 作为 key，便于检索资源缓存
        const resource = this.resourceLoader.resources[task.url];

        if (!resource) {
          console.log("Add pending download task: ", task);
          this.resourceLoader.add(task.url, task.url, loadOptions);
        } else {
          console.log("Resource load from cached: ", task);
        }

        task.status = LoadingTaskStatus.Loading;
      }

      this.resourceLoader.load((loader: PIXI.Loader, resources: Partial<Record<string, PIXI.LoaderResource>>) => {
        console.log("Loading process: ", loader);
        // this.resourceLoader.reset();

        // 通知进度变更
        this.loadingTasks.forEach((value, key) => {
          const url = value.url;
          const resource: PIXI.LoaderResource = resources[url];
          if (value && value.onCompleted && resource) {
            value.onCompleted(resource);
          }
        });

        // 资源加载完成
        if (loader.progress === 100) {
          console.log("Resources all loaded: ", loader);

          pendingTasks.forEach((task: LoadingTask) => {
            this.loadingTasks.delete(task.name);
          });
        }
      });
    }
  }
}

export const ResourceManager = new GameResourceManager();
