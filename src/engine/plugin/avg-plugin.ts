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

  // // > 显示对话前
  // protected onBeforeShowDialogue(dialogue: Dialogue) {}

  // // > 显示选项前
  // protected onBeforeShowChoices(dialogue: APIDialogueChoice) {}

  // // > 显示对话后
  // protected onBeforeHideDialogue() {}

  // // > 显示角色前
  // protected onBeforeShowCharacter() {}

  // // > 显示角色后
  // protected onBeforeHideCharacter() {}

  // // > 显示场景前
  // protected onBeforeLoadScene() {}

  // // > 显示场景后
  // protected onBeforeHideScene() {}
}
