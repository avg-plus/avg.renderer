import { PluginBase } from "./plugin-base";
import { AVGPluginHooks, AVGPlugin } from "./avg-plugin";
import { Conjure } from "./conjure/conjure";
import { DialogueParserPlugin } from "./internal/dialogue-parser-plugin";
import { WaitNextInputWidgetPlugin } from "./internal/wait-next-input-widget-plugin";

export class PluginManager {
  private static _registeredPlugins: Map<string, PluginBase>;

  private static _conjure: Conjure;

  public static init() {
    this._registeredPlugins = new Map<string, PluginBase>();

    this._conjure = new Conjure("activate");

    // Register internal plugins
    this.register(new DialogueParserPlugin());
    this.register(new WaitNextInputWidgetPlugin());
  }

  public static getAllPlugins() {
    // List all plugins and check the plugins are valid
  }

  public static register(plugin: PluginBase) {
    const pluginInfo = plugin.pluginInfo();
    console.log("Plugin registered: ", pluginInfo);

    if (!this._registeredPlugins.has(plugin.constructor.name)) {
      this._registeredPlugins.set(plugin.constructor.name, plugin);
    }
  }

  public static async loadScripts(scripts: string) {
    scripts = "const exports = {};\n" + scripts;
    const instance = this._conjure.loadScript(scripts, {});
    if (instance) {
      const plugin = <AVGPlugin>instance;
      this.register(plugin);
      return instance;
    }

    return instance;
  }

  public static on(event: AVGPluginHooks, ...args: any[]) {
    this._registeredPlugins.forEach((value: PluginBase) => {
      let method = value[event];
      method && method(...args);
    });
  }
}
