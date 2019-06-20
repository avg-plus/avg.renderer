import Postmate from "Postmate";
import { Router } from "@angular/router";
import { AVGGame } from "engine/core/game";
import { AVGStory } from "engine/scripting/story";

export class AVGPlusIPC {
  private static _parent;

  public static onGameEngineLoaded() {
    if (this._parent) {
      this._parent.emit("AVGPlusIPC_Notification_EngineLoaded");
    }
  }

  public static init(router: Router) {
    const handshake = new Postmate.Model({
      AVGPlusIPC_ReloadPlayer: data => {
        window.location.reload();
      },
      AVGPlusIPC_RunStory: data => {
        AVGGame._entryStory = new AVGStory();
        AVGGame._entryStory.loadFromString(data.data.script);
        AVGGame._entryStory.run();
      }
    });

    handshake.then(parent => {
      this._parent = parent;
    });
  }
}
