import { HookManager } from "./hook-manager";

export interface Hook {
  defaultImpl(data: any): any;
}

export function APIHook(name: string, t: any) {
  console.log(`Init Hook: ${name}`);
  return function(constructor: Function) {
    // HookManager.registerHook(name, t);
  };
}
