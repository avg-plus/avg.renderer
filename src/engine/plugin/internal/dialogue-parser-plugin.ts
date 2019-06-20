import { APIDialogueChoice } from "../../scripting/api/api-dialogue-choices";
import { AVGPlugin } from "../avg-plugin";
import { PluginInfo } from "../plugin-info";
import { AVGInternalPlugin } from "../avg-internal-plugin";
import { Dialogue } from "engine/data/dialogue";
import { APIVariable } from "engine/scripting/api/api-variable";

// export function activate(context) {
//   return new DialogueParserPlugin();
// }

export class DialogueParserPlugin extends AVGInternalPlugin {
  public pluginInfo(): PluginInfo {
    return {
      name: "AVGPlus.TextParser",
      version: "1.0",
      author: "AVGPlus",
      description: "Text plugin with highlighting supported."
    };
  }

  public onBeforeShowDialogue(dialogue: Dialogue) {
    dialogue.text = DialogueParserPlugin.parseContent(dialogue.text);
    dialogue.name = DialogueParserPlugin.parseContent(dialogue.name);
  }

  public onBeforeShowChoices(data: APIDialogueChoice) {
    data.choices.map(v => {
      v.title = DialogueParserPlugin.parseContent(v.title);
    });
  }

  public static parseContent(text: string) {
    // [b][/b] Bold
    // [color=red][/color] Change text color
    // [sN][/size] Change text size

    if (!text) {
      return "";
    }

    // Replace spaces to '&nbsp;'
    // text = text.replace(/ /g, "&nbsp;");
    text = text.replace(/\n/g, "<br>");

    // Grammar: ${variable}
    let variableRegex = /\${(.*)}/;
    let vMatch: RegExpExecArray = null;
    while ((vMatch = variableRegex.exec(text)) !== null) {
      let value = APIVariable.get(vMatch[1]);
      text = text.replace(variableRegex, value === undefined ? "" : value);
    }

    // Grammar: [color=N][/color]
    text = text.replace(/\[color=([a-zA-Z0-9#]+)\]/g, `<span style="color:$1">`);
    text = text.replace(/\[\/color\]/g, `</span>`);

    // Grammar: [c=N][/c]
    text = text.replace(/\[c=([a-zA-Z0-9#]+)\]|\[color=([a-zA-Z0-9#]+)\]/g, `<span style="color:$1">`);
    text = text.replace(/\[\/c\]/g, `</span>`);

    // Grammar: [bold][/bold]
    text = text.replace(/\[bold\]/g, `<bold>`);
    text = text.replace(/\[\/bold\]/g, `</bold>`);

    // Grammar: [b][/b]
    text = text.replace(/\[b\]/g, `<b>`);
    text = text.replace(/\[\/b\]/g, `</b>`);

    // Grammar: [italic][/italic]
    text = text.replace(/\[italic\]/g, `<i>`);
    text = text.replace(/\[\/italic\]/g, `</i>`);

    // Grammar: [i][/i]
    text = text.replace(/\[i\]/g, `<i>`);
    text = text.replace(/\[\/i\]/g, `</i>`);

    // Grammar: [del][/del]
    text = text.replace(/\[del\]/g, `<del>`);
    text = text.replace(/\[\/del\]/g, `</del>`);

    // Grammar: [size=N][/size]
    text = text.replace(/\[size=(\d+)\]/g, `<span style="font-size: $1px;">`);
    text = text.replace(/\[\/size\]/g, `</span>`);

    // Grammar: [s=N][/s]
    text = text.replace(/\[s=(\d+)\]/g, `<span style="font-size: $1px;">`);
    text = text.replace(/\[\/s\]/g, `</span>`);

    // Grammar: [emoji=file]
    text = text.replace(/\[emoji=([\w\-\. ]+)]/g, `<img src='assets/graphics/emoji/$1' />`);

    // Grammar: [br]
    text = text.replace(/\[br]/g, `<br>`);

    // Grammar: [wait=N]
    text = text.replace(/\[wait\]/g, `<wait />`);
    text = text.replace(/\[wait(=(\d+))?\]/g, `<wait time="$2" />`);

    // Grammar: [rt=rt]Content[/rt]
    text = text.replace(
      /\[rt=([\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\w ;]+)\]([\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\w ;]+)\[\/rt\]/g,
      `<ruby>$2<rt>$1</rt></ruby>`
    );

    return text;
  }
}
