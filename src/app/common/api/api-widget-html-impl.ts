import * as avg from "avg-engine/engine";
import { ScriptingDispatcher } from "app/common/manager/scripting-dispatcher";
import { Impl } from "app/common/api/impl";
import { APIHtmlWidget } from "avg-engine/engine";

export class APIHtmlWidgetImpl extends Impl {
  @Impl.registerImpl(APIHtmlWidget, avg.OP.ShowHtmlWidget)
  public static op_show_html_widget(scriptUnit: avg.AVGScriptUnit): Promise<avg.HtmlWidgetResult> {
    const script = <avg.APIHtmlWidget>scriptUnit;

    return new Promise<avg.HtmlWidgetResult>((resolve, reject) => {
      ScriptingDispatcher.dispatch(avg.OP.ShowHtmlWidget, script, resolve);
    });
  }
}
