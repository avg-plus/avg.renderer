import { HookEvents } from "./hook-events";
import { HookManager } from "./hook-manager";

export interface Hook {
  defaultImpl(data: any): any;
}

export function APIHook(event: HookEvents, t: any) {
  return function(constructor: Function) {
    HookManager.subscribeHook(event, t);
  };
}
