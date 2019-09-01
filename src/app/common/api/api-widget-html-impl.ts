import { ScriptingDispatcher } from "app/common/manager/scripting-dispatcher";
import { Impl } from "app/common/api/impl";
import { OP } from "engine/const/op";
import {
  APIHtmlWidget,
  HtmlWidgetResult
} from "engine/scripting/api/api-html-widget";
import { AVGScriptUnit } from "engine/scripting/script-unit";

export class APIHtmlWidgetImpl extends Impl {
  @Impl.registerImpl(APIHtmlWidget, OP.ShowHtmlWidget)
  public static op_show_html_widget(
    scriptUnit: AVGScriptUnit
  ): Promise<HtmlWidgetResult> {
    const script = <APIHtmlWidget>scriptUnit;

    return new Promise<HtmlWidgetResult>((resolve, reject) => {
      ScriptingDispatcher.dispatch(OP.ShowHtmlWidget, script, resolve);
    });
  }

  @Impl.registerImpl(APIHtmlWidget, OP.RemoveHtmlWidget)
  public static op_remove_html_widget(
    scriptUnit: AVGScriptUnit
  ): Promise<HtmlWidgetResult> {
    const script = <APIHtmlWidget>scriptUnit;

    return new Promise<HtmlWidgetResult>((resolve, reject) => {
      ScriptingDispatcher.dispatch(OP.RemoveHtmlWidget, script, resolve);
    });
  }
}
