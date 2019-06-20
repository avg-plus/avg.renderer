import { GameRunningPlatform } from "../../const/game-running-platform";
import { AVGGame } from "../game";

export class PlatformService {
  private static _platform: GameRunningPlatform;
  
  public static initFromWindow(window: any) {
    // Conditional imports
    const process = window.process;
    let platform = GameRunningPlatform.WebBrowser;

    const isElectron = window && window.process && window.process.type;

    if (isElectron) {
      if (process.platform === "linux") {
        platform = GameRunningPlatform.Linux;
      } else if (process.platform === "darwin") {
        platform = GameRunningPlatform.MacOS;
      } else if (process.platform === "win32") {
        platform = GameRunningPlatform.Windows;
      }
    } else {
      platform = GameRunningPlatform.WebBrowser;
    }

    this._platform = platform;

    console.log("Game running on platform - " + GameRunningPlatform[platform]);
  }

  public static getRunningPlatform(): GameRunningPlatform {
    return this._platform;
  }

  public static isWebBrowser() {
    return this._platform === GameRunningPlatform.WebBrowser;
  }

  public static isDesktop() {
    return (
      this._platform === GameRunningPlatform.MacOS ||
      this._platform === GameRunningPlatform.Windows ||
      this._platform === GameRunningPlatform.Linux
    );
  }

  public static isWindowsDesktop() {
    return this._platform === GameRunningPlatform.Windows ;
  }
}
