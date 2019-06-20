import { ScriptingDispatcher } from "app/common/manager/scripting-dispatcher";
import { Impl } from "app/common/api/impl";
import { OP } from "engine/const/op";
import { APIDialogue } from "engine/scripting/api/api-dialogue";
import { AVGScriptUnit } from "engine/scripting/script-unit";

export class APIDialogueImpl extends Impl {
  @Impl.registerImpl(APIDialogue, OP.ShowText)
  public static op_show(scriptUnit: AVGScriptUnit): Promise<AVGScriptUnit> {
    const script = <APIDialogue>scriptUnit;

    return new Promise((resolve, reject) => {
      ScriptingDispatcher.dispatch(OP.ShowText, script, resolve);
    });
  }

  @Impl.registerImpl(APIDialogue, OP.HideText)
  public static op_hide(scriptUnit: AVGScriptUnit): Promise<AVGScriptUnit> {
    const script = <APIDialogue>scriptUnit;

    return new Promise((resolve, reject) => {
      ScriptingDispatcher.dispatch(OP.HideText, script, resolve);
    });
  }
}
