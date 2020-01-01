import * as BrowserFS from "browserfs";
import { axios } from "app/common/axios-default";
import { PlatformService } from "../platform/platform-service";
import { AVGNativePath } from "./avg-native-path";

// const NodeFS = window.require('fs');
import * as NodeFS from 'fs';


export class AVGNativeFS {
  private static _isFileSystemOK = false;
  private static _fs = null;

  public static get __dirname() {
    let dirname = window["__dirname"];

    if (PlatformService.isDesktop()) {
      if (PlatformService.runOnWindows() && dirname.indexOf("\\") !== -1) {
        dirname = dirname.replace(/\\/g, "/");
      }
      return dirname;
    } else {
      return ".";
    }
  }

  public static async initFileSystem() {
    console.log("Init Env", process.env);


    return new Promise((resolve, reject) => {
      if (PlatformService.isDesktop()) {
        console.log("Init FileSystem:NodeFS", NodeFS);

        this._fs = NodeFS;
        this._isFileSystemOK = true;
      } else {
        console.log("Init FileSystem:BrowserFS", BrowserFS);

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
          }
        );
      }

      resolve();
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
    if (PlatformService.isDesktop()) {
      return this._fs.writeFile(filename, data, options, cb);
    }
  }

  public static writeFileSync(
    filename: string,
    data: any,
    options?: { encoding?: string; mode?: string | number; flag?: string }
  ): void {
    if (PlatformService.isDesktop()) {
      return this._fs.writeFileSync(filename, data, options);
    }
  }

  public static readFile(
    filename: string,
    options: { encoding: string; flag?: string },
    callback: (e: any, rv?: string) => void
  ): void {
    if (PlatformService.isDesktop() && !AVGNativePath.isHttpURL(filename)) {
      this._fs.readFile(filename, options, callback);
      // this._ipc.send()
    } else {
      const response = axios.get(filename).then(value => {
        if (callback) {
          if (value.status !== 200) {
            callback(null, null);
            return;
          }
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
    if (PlatformService.isDesktop() && !AVGNativePath.isHttpURL(filename)) {
      const data = this._fs.readFileSync(filename, options);
      return data;
    }

    const response = await axios.get(filename, {
      transformResponse: res => {
        return res;
      }
    });

    if (response.status !== 200) {
      return "";
    }

    return response.data;
  }

  public static readLocalStorage(
    filename: string,
    options?: {
      encoding?: string;
      flag?: string;
    }
  ) {
    if (PlatformService.isWebBrowser()) {
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
    if (PlatformService.isWebBrowser()) {
      return this._fs.readFileSync(filename, options);
    }
  }
}
