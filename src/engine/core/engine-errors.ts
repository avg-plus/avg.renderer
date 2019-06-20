import { AVGStory } from "engine/scripting/story";

export class AVGEngineError {
  private static _cb: (error: any) => void;

  public static init(window: any, cb: (error: any) => void) {
    this._cb = cb;

    // if (PlatformService.isDesktop()) {
    //   process.addListener("uncaughtException", event => {
    //     this._cb(event);
    //   });
    // } else {
    //   if (window) {
    //     window.addEventListener("error", event => {
    //       this._cb(event);
    //     });
    //   }
    // }
  }

  public static emit(type, error: string, data?: any) {
    console.error("An exception is emitted:", type, error, data);
    this._cb({
      type,
      desc: error,
      file: AVGStory.TracingScriptFile,
      data: data || {}
    });
  }
}
