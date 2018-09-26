import * as avg from "avg-engine/engine";
import { ScriptingDispatcher } from "app/common/manager/scripting-dispatcher";
import { Impl } from "app/common/api/impl";
import { APIDialogue } from "avg-engine/engine";

export class APIDialogueImpl extends Impl {
  @Impl.registerImpl(APIDialogue, avg.OP.ShowText)
  public static op_show(scriptUnit: avg.AVGScriptUnit): Promise<avg.AVGScriptUnit> {
    const script = <avg.APIDialogue>scriptUnit;

    return new Promise((resolve, reject) => {
      ScriptingDispatcher.dispatch(avg.OP.ShowText, script, resolve);
    });
  }

  @Impl.registerImpl(APIDialogue, avg.OP.HideText)
  public static op_hide(scriptUnit: avg.AVGScriptUnit): Promise<avg.AVGScriptUnit> {
    const script = <avg.APIDialogue>scriptUnit;

    return new Promise((resolve, reject) => {
      ScriptingDispatcher.dispatch(avg.OP.HideText, script, resolve);
    });
  }
}
