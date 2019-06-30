import { PluginBase } from "./plugin-base";
import { PluginInfo } from "./plugin-info";

export enum AVGPluginHooks {
  OnBeforeShowDialogue = "onBeforeShowDialogue",
  OnBeforeShowChoices = "onBeforeShowChoices"
}

export class AVGPlugin implements PluginBase {
  pluginInfo(): PluginInfo {
    return {
      name: null,
      version: null,
      author: null,
      description: null
    };
  }
}
