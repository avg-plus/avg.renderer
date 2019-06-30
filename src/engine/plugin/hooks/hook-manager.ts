import { HookEvents } from "./hook-events";
import { Subject, Subscription, AsyncSubject } from "rxjs";

type HookCallbackFunc = (params: any) => any;
type HookCallbackContext = {
  event: HookEvents;
  cb: HookCallbackFunc;
};

export class HookManager {
  private static hooks: Map<HookEvents, Array<HookCallbackFunc>> = new Map<HookEvents, Array<HookCallbackFunc>>();

  public static async subscribeHook(event: HookEvents, cb: (data: any) => void) {
    console.log(`Registered Hook: ${event}`);

    let hookList = this.hooks.get(event) || [];
    hookList.push(await cb);
    this.hooks.set(event, hookList);

    const context: HookCallbackContext = {
      event,
      cb
    };

    return context;
  }

  public static unsubscribe(context: HookCallbackContext) {
    if (context && context.event && context.cb) {
      const hookList = this.hooks.get(context.event);
      const index = hookList.indexOf(context.cb);
      if (index >= 0) {
        hookList.splice(index, 1);
        this.hooks.set(context.event, hookList);
      }
    }
  }

  public static async triggerHook(event: HookEvents, data?: any) {
    let hookList = this.hooks.get(event);
    let dataTrace = data;

    if (hookList) {
      for (let i = 0; i < hookList.length; ++i) {
        dataTrace = await hookList[i](dataTrace);
        console.log(`Trigger Hook: [${event}] => `, dataTrace);
      }
    }

    return dataTrace || data;
  }
}
