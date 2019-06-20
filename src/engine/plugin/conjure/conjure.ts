import { AVGPlugin } from "../avg-plugin";

export class Conjure {
  private _scripts: string = "";
  private _entryFunctionName: string;
  // private _plugins: Map<string, AVGPlugin> = new Map<string, AVGPlugin>();

  constructor(entryFunctionName: string) {
    this._entryFunctionName = "start";

    if (!entryFunctionName) {
      this._entryFunctionName = entryFunctionName;
    }
  }

  public load(id: string, injectContext: any) {
    const entry = require(id)();

    if (!entry) {
      throw new Error("No exported activate entry function.");
    }

    const instance = entry(injectContext);
    if (!instance) {
      throw new Error("No plugin instance returned.");
    }

    return instance;
  }

  public loadScript(scripts: string, injectContext: any): any {
    this._scripts = scripts;

    const entry = eval(scripts);
    if (!entry) {
      throw new Error("No exported activate entry function.");
    }

    const instance = entry(injectContext);
    if (!instance) {
      throw new Error("No plugin instance returned.");
    }

    console.log(entry, instance);

    // const pluginInfo = (<AVGPlugin>instance).pluginInfo();

    // let plugin = this._plugins.get(pluginInfo.name);
    // if (plugin) {
    //   return plugin;
    // }

    // plugin.scripts = scripts;
    // plugin.instance = instance;

    // this._plugins.set(name, plugin);

    return instance;
  }

  // public on(name: string, ...args: any[]) {
  //   this._plugins.forEach((value: Plugin, key: string) => {
  //     const method = value.instance[name];
  //     method && method(...args);
  //   });
  // }
}
