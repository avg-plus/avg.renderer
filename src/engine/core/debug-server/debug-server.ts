import { EngineAPI_Flow } from "engine/scripting/exports";
import { DebugCommands } from "./commands";

import * as WebSocket from "ws";

export class DebugConnection {
  static async start(server: string) {
    const socket = new WebSocket(`ws://${server}`);

    socket.addEventListener("open", event => {
      // socket.send("Hello Server!");
      this.sendMessage(socket, {
        cmd: "register",
        data: {
          PID: process.pid
        }
      });
    });

    socket.addEventListener("message", event => {
      console.log("Message from server ", event.data);

      const data = JSON.parse(event.data);

      if (!data || !data.cmd) {
        console.log("error: unknown command.");
        return;
      }

      this.handleMessage(data.cmd, data.data);
    });
  }

  private static async sendMessage(socket: WebSocket, data: any) {
    socket.send(JSON.stringify(data));
  }

  static async handleMessage(cmd: string, data: any) {
    switch (cmd) {
      case DebugCommands.Reload:
        window.location.reload();
        break;
      case DebugCommands.RunStory:
        console.log("run story", data);
        
        await EngineAPI_Flow.executeScript(data.script);
        break;
    }
  }
}
