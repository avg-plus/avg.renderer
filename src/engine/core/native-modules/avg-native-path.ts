// import urljoin from "urljoin";

import { PlatformService } from "../platform/platform-service";

export class AVGNativePath {
  public static isHttpURL(url: string): boolean {
    if (!url) {
      return false;
    }

    return url.startsWith("http://") || url.startsWith("https://");
  }

  static isAbsolute(path: string) {
    const splitDeviceRe = /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/;

    if (PlatformService.runOnWindows()) {
      const result = splitDeviceRe.exec(path),
        device = result[1] || "",
        isUnc = device && device.charAt(1) !== ":";

      return !!result[2] || isUnc;
    } else {
      return path.charAt(0) === "/";
    }
  }

  // 同时支持本地路径和HTTP URL
  public static join(...paths: string[]): string {
    if (!paths || paths.length === 0) {
      return "";
    }

    let parts = [];

    if (AVGNativePath.isHttpURL(paths[0])) {
      for (let i = 0; i < paths.length - 1; ++i) {
        if (!paths[i].endsWith("/")) {
          paths[i] += "/";
        }
      }

      // const fullURL = urljoin(paths).join("");
      const fullURL = paths.join("");

      return fullURL;
    }

    for (var i = 0, l = paths.length; i < l; i++) {
      if (!paths[i]) {
        continue;
      }

      parts = parts.concat(paths[i].split("/"));
    }

    const newParts = [];
    for (i = 0, l = parts.length; i < l; i++) {
      const part = parts[i];
      if (!part) continue;
      if (part === "..") {
        newParts.pop();
      } else {
        newParts.push(part);
      }
    }

    if (parts[0] === "") {
      newParts.unshift("");
    }

    return newParts.join("/") || (newParts.length ? "/" : ".");
  }
}
