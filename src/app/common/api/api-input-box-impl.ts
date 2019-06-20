import { Impl } from "./impl";
import { ScriptingDispatcher } from "../manager/scripting-dispatcher";
import { InputBoxResult } from "engine/data/input-data";
import { OP } from "engine/const/op";
import { APIInputBox } from "engine/scripting/api/api-input-box";
import { AVGScriptUnit } from "engine/scripting/script-unit";

export class APIInputBoxImpl extends Impl {
  @Impl.registerImpl(APIInputBox, OP.ShowInputBox)
  public static op_show(scriptUnit: AVGScriptUnit): Promise<InputBoxResult> {
    const script = <APIInputBox>scriptUnit;

    return new Promise<InputBoxResult>((resolve, reject) => {
      ScriptingDispatcher.dispatch(OP.ShowInputBox, script, resolve);
    });
  }
}
