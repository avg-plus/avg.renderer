import * as avg from "avg-engine/engine";
import * as BrowserFS from "browserfs";

import * as fs from "fs";
import * as path from "path";
import Axios from "axios";

export class AVGNativeFSImpl {
  private static _isFileSystemOK = false;
  private static _fs = null;

  public static __dirname = ".";
  public static async initFileSystem() {
    console.log("fs", fs);
    console.log("path", path);

    fs.writeFileSync("./xxx.txt", "aaa");

    BrowserFS.install(window);

    await new Promise((resolve, reject) => {
      if (avg.PlatformService.isElectron()) {
        // this._fs = require("fs");
        // console.log(node_fs);
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

            // Otherwise, BrowserFS is ready-to-use!
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
    return this._fs.writeFile(filename, data, options, cb);
  }

  public static writeFileSync(
    filename: string,
    data: any,
    options?: { encoding?: string; mode?: string | number; flag?: string }
  ): void {
    return this._fs.writeFileSync(filename, data, options);
  }

  public static readFile(
    filename: string,
    options: { encoding: string; flag?: string },
    callback: (e: any, rv?: string) => void
  ): void {
    if (
      avg.PlatformService.isWebBrowser() ||
      avg.PlatformService.isElectron()
    ) {
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
    const response = await Axios.get(filename);
    return response.data;
  }

  public static readFromLocalStorage(
    filename: string,
    options?: {
      encoding?: string;
      flag?: string;
    }
  ) {}
}
