import * as avg from "avg-engine/engine";
import * as BrowserFS from "browserfs";
import * as NodeFS from "fs";

import Axios from "axios";

export class AVGNativeFSImpl {
  private static _isFileSystemOK = false;
  private static _fs = null;

  public static get __dirname() {

    if (avg.PlatformService.isDesktop()) {
      if (avg.PlatformService.isWindowsDesktop() && __dirname.indexOf("\\") !== -1) {
        __dirname = __dirname.replace(/\\/g, "/");
      }
      return __dirname;
    } else {
      return ".";
    }
  }

  public static async initFileSystem() {
    console.log("Init FileSystem:BrowserFS", BrowserFS);
    console.log("Init FileSystem:NodeFS", NodeFS);
    console.log("Init Env", process.env);

    BrowserFS.install(window);

    await new Promise((resolve, reject) => {
      if (avg.PlatformService.isDesktop()) {
        this._fs = NodeFS;
        this._isFileSystemOK = true;
      } else {
        BrowserFS.configure(
          {
            fs: "LocalStorage",
            options: {}
          },
          e => {
            if (e) {
              // An error happened!
              console.error(e);
              reject(e);
              this._isFileSystemOK = false;
              throw e;
            }

            this._isFileSystemOK = true;
            this._fs = BrowserFS.BFSRequire("fs");

            resolve();
          }
        );
      }
    });
  }

  public static isFileSystemOK(): boolean {
    return this._isFileSystemOK;
  }

  public static writeFile(
    filename: string,
    data: any,
    options?: { encoding?: string; mode?: string | number; flag?: string },
    cb?: (e?: any) => void
  ): void {
    if (avg.PlatformService.isDesktop()) {
      return this._fs.writeFile(filename, data, options, cb);
    }
  }

  public static writeFileSync(
    filename: string,
    data: any,
    options?: { encoding?: string; mode?: string | number; flag?: string }
  ): void {
    if (avg.PlatformService.isDesktop()) {
      return this._fs.writeFileSync(filename, data, options);
    }
  }

  public static readFile(
    filename: string,
    options: { encoding: string; flag?: string },
    callback: (e: any, rv?: string) => void
  ): void {
    if (avg.PlatformService.isDesktop()) {
      this._fs.readFile(filename, options, callback);
    } else {
      const response = Axios.get(filename).then(value => {
        if (callback) {
          callback(null, value.data);
        }
      });
    }
  }

  public static async readFileSync(
    filename: string,
    options?: {
      encoding?: string;
      flag?: string;
    }
  ) {
    if (avg.PlatformService.isDesktop()) {
      const data = this._fs.readFileSync(filename, options);
      return data.toString("utf8");
    }

    const response = await Axios.get(filename, {
      headers: { Accept: "text/plain" }
    });
    return response.data;
  }

  public static readLocalStorage(
    filename: string,
    options?: {
      encoding?: string;
      flag?: string;
    }
  ) {
    if (avg.PlatformService.isWebBrowser()) {
      return this._fs.readFileSync(filename, options);
    }
  }

  public static writeLocalStorage(
    filename: string,
    options?: {
      encoding?: string;
      flag?: string;
    }
  ) {
    if (avg.PlatformService.isWebBrowser()) {
      return this._fs.readFileSync(filename, options);
    }
  }
}
