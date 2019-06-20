import { AVGScriptUnit } from "../script-unit";
import { ScriptingResult } from "../../data/scripting-result";
import { ScreenWidgetHtml } from "../../data/screen-widget-html";

export class HtmlWidgetResult extends ScriptingResult {}

export class APIHtmlWidget extends AVGScriptUnit {
  public data: ScreenWidgetHtml = new ScreenWidgetHtml();
}
