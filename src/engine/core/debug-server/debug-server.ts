import { EngineAPI_Flow } from "engine/scripting/exports";
import { DebugCommands } from "./commands";

const WebSocket = require("ws");

export class DebugConnection {
  static async start(server: string) {
    const socket = new WebSocket(`ws://${server}`);

    socket.addEventListener("open", event => {
      // socket.send("Hello Server!");
      socket.send({
        cmd: "register",
        data: {
          PID: process.pid
        }
      });
    });

    socket.addEventListener("message", event => {
      console.log("Message from server ", event.data);

      if (!event.data || !event.data.cmd) {
        console.log("error: unknown command.");
        return;
      }

      this.handleMessage(event.data.cmd, event.data.data);
    });
  }

  static async handleMessage(cmd: string, data: any) {
    switch (cmd) {
      case DebugCommands.Reload:
        window.location.reload();
        break;
      case DebugCommands.RunStory:
        await EngineAPI_Flow.executeScript(data.script);
        break;
    }
  }
}
