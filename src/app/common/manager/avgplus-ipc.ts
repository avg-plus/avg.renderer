import { EngineAPI_Flow } from "./../../../engine/scripting/exports/flow";
import Postmate from "postmate";
import { Router } from "@angular/router";
import { AVGGame } from "engine/core/game";
import { AVGStory } from "engine/scripting/story";
import { Sandbox } from 'engine/core/sandbox';

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
        console.log("Received IPC Message (AVGPlusIPC_ReloadPlayer): ", data);

        window.location.reload();
      },
      AVGPlusIPC_RunStory: async data => {
        console.log("Received IPC Message (AVGPlusIPC_RunStory): ", data);

        await EngineAPI_Flow.executeScript(data.data.script);
      }
    });

    handshake.then(parent => {
      this._parent = parent;
    });
  }
}
