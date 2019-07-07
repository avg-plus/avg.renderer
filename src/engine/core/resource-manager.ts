/*
 资源管理器提供三种加载方式：
  - 按需加载：需要用到资源的时候再从硬盘/网络上进行资源的加载，可能会造成卡顿
  - 手动预加载：可以在任意时机指定预加载的资源，并缓存
  - 自动预加载：由引擎来推测需要预加载的资源
*/
import * as Loader from "resource-loader";
import { getExtension } from "./utils";

enum LoadingTaskStatus {
  Pending,
  Loading,
  Finished
}

type LoadingTask = {
  name: string;
  url: string;
  onCompleted: (resource: Loader.Resource) => void;
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
  private resourceLoader = new Loader.Loader();

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
  public addLoading(name: string, url: string, onCompleted?: (resource: Loader.Resource) => void) {
    const task: LoadingTask = {
      name,
      url,
      onCompleted,
      status: LoadingTaskStatus.Pending
    };

    this.loadingTasks.set(name, task);
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
            crossOrigin: ""
          };
        }

        // 这里用 URL 作为 key，便于检索资源缓存
        const resource = this.resourceLoader.resources[task.url];
        if (!resource) {
          console.log("Add pending download task: ", task);
          this.resourceLoader.add(task.url, task.url, loadOptions);
        }

        task.status = LoadingTaskStatus.Loading;
      }

      this.resourceLoader.load((result, resources) => {
        console.log("Loading process: ", result);
        this.resourceLoader.reset();

        // 通知进度变更
        this.loadingTasks.forEach((value, key) => {
          const url = value.url;
          const resource: Loader.Resource = resources[url];
          if (value && value.onCompleted && resource) {
            value.onCompleted(resource);
          }
        });

        // 资源加载完成
        console.log("Resource loading progress : ", result.progress);

        if (result.progress === 100) {
          console.log("Resources all loaded: ", result);

          pendingTasks.forEach((task: LoadingTask) => {
            this.loadingTasks.delete(task.name);
          });
        }
      });
    }
  }
}

export const ResourceManager = new GameResourceManager();
