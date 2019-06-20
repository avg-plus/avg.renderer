// import { Axios } from "../../common/axios-default";
// import * as BrowserFS from "browserfs";
// import * as NodeFS from "fs";
// import { PlatformService } from "engine/core/platform/platform-service";
// import { AVGNativePath } from "engine/core/native-modules/avg-native-path";

// export class AVGNativeFSImpl {
//   private static _isFileSystemOK = false;
//   private static _fs = null;

//   public static get __dirname() {
//     if (PlatformService.isDesktop()) {
//       if (PlatformService.isWindowsDesktop() && __dirname.indexOf("\\") !== -1) {
//         __dirname = __dirname.replace(/\\/g, "/");
//       }
//       return __dirname;
//     } else {
//       return ".";
//     }
//   }

//   public static async initFileSystem() {
//     console.log("Init Env", process.env);

//     BrowserFS.install(window);

//     await new Promise((resolve, reject) => {
//       if (PlatformService.isDesktop()) {
//         console.log("Init FileSystem:NodeFS", NodeFS);

//         this._fs = NodeFS;
//         this._isFileSystemOK = true;
//       } else {
//         console.log("Init FileSystem:BrowserFS", BrowserFS);

//         BrowserFS.configure(
//           {
//             fs: "LocalStorage",
//             options: {}
//           },
//           e => {
//             if (e) {
//               // An error happened!
//               console.error(e);
//               reject(e);
//               this._isFileSystemOK = false;
//               throw e;
//             }

//             this._isFileSystemOK = true;
//             this._fs = BrowserFS.BFSRequire("fs");

//             resolve();
//           }
//         );
//       }
//     });
//   }

//   public static isFileSystemOK(): boolean {
//     return this._isFileSystemOK;
//   }

//   public static writeFile(
//     filename: string,
//     data: any,
//     options?: { encoding?: string; mode?: string | number; flag?: string },
//     cb?: (e?: any) => void
//   ): void {
//     if (PlatformService.isDesktop()) {
//       return this._fs.writeFile(filename, data, options, cb);
//     }
//   }

//   public static writeFileSync(
//     filename: string,
//     data: any,
//     options?: { encoding?: string; mode?: string | number; flag?: string }
//   ): void {
//     if (PlatformService.isDesktop()) {
//       return this._fs.writeFileSync(filename, data, options);
//     }
//   }

//   public static readFile(
//     filename: string,
//     options: { encoding: string; flag?: string },
//     callback: (e: any, rv?: string) => void
//   ): void {
//     if (PlatformService.isDesktop() && !AVGNativePath.isHttpURL(filename)) {
//       this._fs.readFile(filename, options, callback);
//     } else {
//       const response = Axios.get(filename).then(value => {
//         if (callback) {
//           if (value.status !== 200) {
//             callback(null, null);
//             return;
//           }
//           callback(null, value.data);
//         }
//       });
//     }
//   }

//   public static async readFileSync(
//     filename: string,
//     options?: {
//       encoding?: string;
//       flag?: string;
//     }
//   ) {
//     if (PlatformService.isDesktop() && !AVGNativePath.isHttpURL(filename)) {
//       const data = this._fs.readFileSync(filename, options);
//       return data.toString("utf8");
//     }

//     // Axios.get("").then(results => {
//     //   console.log("results:", results);
//     // });

//     // request(filename);
//     // request(filename, function(error, response, body) {
//     //   console.log("error:", error); // Print the error if one occurred
//     //   console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
//     //   console.log("body:", body); // Print the HTML for the Google homepage.
//     // });

//     const response = await Axios.get(filename, {
//       headers: { "content-type": "application/json", "Cache-Control": "no-cache" },
//       transformResponse: res => {
//         console.log("results:", res);

//         return res;
//       }
//     });

//     // if (response.status !== 200) {
//     //   return "";
//     // }

//     // return response.data;
//   }

//   public static readLocalStorage(
//     filename: string,
//     options?: {
//       encoding?: string;
//       flag?: string;
//     }
//   ) {
//     if (PlatformService.isWebBrowser()) {
//       return this._fs.readFileSync(filename, options);
//     }
//   }

//   public static writeLocalStorage(
//     filename: string,
//     options?: {
//       encoding?: string;
//       flag?: string;
//     }
//   ) {
//     if (PlatformService.isWebBrowser()) {
//       return this._fs.readFileSync(filename, options);
//     }
//   }
// }
