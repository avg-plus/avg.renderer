import * as avg from "avg-engine/engine";
import { ScriptingDispatcher } from "app/common/manager/scripting-dispatcher";
import { Impl } from "app/common/api/impl";
import { APIGotoTitleView } from "avg-engine/engine";

export class APIGotoTitleViewImpl extends Impl {
  @Impl.registerImpl(APIGotoTitleView, avg.OP.GotoTitleView)
  public static op_go_to_title_view(scriptUnit: avg.AVGScriptUnit): Promise<avg.AVGScriptUnit> {
    const script = <avg.APIGotoTitleView>scriptUnit;

    return new Promise((resolve, reject) => {
      ScriptingDispatcher.dispatch(avg.OP.GotoTitleView, script, resolve);
    });
  }
}
