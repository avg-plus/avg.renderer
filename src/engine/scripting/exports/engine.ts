import { Subscription } from "rxjs";
import { HookEvents } from "./../../plugin/hooks/hook-events";
import { HookManager } from "./../../plugin/hooks/hook-manager";
import { APIExport, AVGExportedAPI } from "./avg-exported-api";
/**
 * 用于扩展和自定义引擎的表现
 *
 * @export
 * @class EngineAPI_Engine
 * @extends {AVGExportedAPI}
 */
@APIExport("engine", EngineAPI_Engine)
export class EngineAPI_Engine extends AVGExportedAPI {
  public static async subscribeHook(event: string, cb: (data: any) => any) {
    return await HookManager.subscribeHook(<HookEvents>event, cb);
  }

  public static async unsubscribeHook(subscription: any) {
    HookManager.unsubscribe(subscription);
  }
}
