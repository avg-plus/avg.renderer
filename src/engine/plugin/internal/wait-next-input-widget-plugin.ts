import { PluginInfo } from "../plugin-info";
import { AVGInternalPlugin } from "../avg-internal-plugin";
import { Dialogue } from "engine/data/dialogue";

export class WaitNextInputWidgetPlugin extends AVGInternalPlugin {
  public pluginInfo(): PluginInfo {
    return {
      name: "AVGPlus.WaitNextInputWidget",
      version: "1.0",
      author: "AVGPlus",
      description: "Add animation icon at the end of dialogue."
    };
  }

  public onBeforeShowDialogue(dialogue: Dialogue) {
    const waitInputIcon = `<img src="data/icons/wait-input.gif" />`;
    dialogue.text = dialogue.text + waitInputIcon;
  }
}
