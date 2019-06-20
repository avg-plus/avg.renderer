import { ScriptingDispatcher } from "app/common/manager/scripting-dispatcher";
import { Impl } from "app/common/api/impl";
import { OP } from "engine/const/op";
import { APIGotoTitleView } from "engine/scripting/api/api-title-view";
import { AVGScriptUnit } from "engine/scripting/script-unit";

export class APIGotoTitleViewImpl extends Impl {
  @Impl.registerImpl(APIGotoTitleView, OP.GotoTitleView)
  public static op_go_to_title_view(scriptUnit: AVGScriptUnit): Promise<AVGScriptUnit> {
    const script = <APIGotoTitleView>scriptUnit;

    return new Promise((resolve, reject) => {
      ScriptingDispatcher.dispatch(OP.GotoTitleView, script, resolve);
    });
  }
}
