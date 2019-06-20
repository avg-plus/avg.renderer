import { ScriptingDispatcher } from "app/common/manager/scripting-dispatcher";
import { Impl } from "app/common/api/impl";
import { OP } from "engine/const/op";
import { APIDialogueChoice, SelectedDialogueChoice } from "engine/scripting/api/api-dialogue-choices";
import { AVGScriptUnit } from "engine/scripting/script-unit";

export class APIDialogueChoicesImpl extends Impl {
  @Impl.registerImpl(APIDialogueChoice, OP.ShowChioce)
  public static async op_show(scriptUnit: AVGScriptUnit): Promise<SelectedDialogueChoice> {
    const script = <APIDialogueChoice>scriptUnit;

    return await new Promise<SelectedDialogueChoice>((resolve, reject) => {
      ScriptingDispatcher.dispatch(OP.ShowChioce, script, resolve);
    });
  }
}
