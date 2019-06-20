import { AVGNativeFS } from "../../core/native-modules/avg-native-fs";
import { AVGNativePath } from "../../core/native-modules/avg-native-path";
import { ResourcePath, Resource } from "../../core/resource";
import { PluginManager } from "../../plugin/plugin-manager";
import { AVGPlugin } from "../../plugin/avg-plugin";

export namespace plugins {
  export async function load(file: string) {
    const scripts = await AVGNativeFS.readFileSync(AVGNativePath.join(Resource.getPath(ResourcePath.Plugins), file));

    return PluginManager.loadScripts(scripts);
  }

  export function call(plugin: AVGPlugin, method: string, params: any) {
    return plugin[method](params);
  }
}
