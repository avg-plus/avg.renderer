import * as avg from "avg-engine/engine";
import { Impl } from "./impl";
import { ScriptingDispatcher } from "../manager/scripting-dispatcher";

export class APIInputBoxImpl extends Impl {
  @Impl.printAPIDetail
  public static op_show(scriptUnit: avg.AVGScriptUnit): Promise<avg.InputBoxResult> {
    const script = <avg.APIInputBox>scriptUnit;

    return new Promise<avg.InputBoxResult>((resolve, reject) => {
      ScriptingDispatcher.dispatch(avg.OP.ShowInputBox, script, resolve);
    });
  }
}
