import { PluginInfo } from "./plugin-info";

export interface PluginBase {
  pluginInfo(): PluginInfo;
}
