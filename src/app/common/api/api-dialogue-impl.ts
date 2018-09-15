import * as avg from "avg-engine/engine";
import { ScriptingDispatcher } from "app/common/manager/scripting-dispatcher";
import { Impl } from "app/common/api/impl";
import { Sandbox } from "../../../../../avg.engine/engine/core/sandbox";

export class APIDialogueImpl extends Impl {
  @Impl.printAPIDetail
  public static op_show(scriptUnit: avg.AVGScriptUnit): Promise<avg.AVGScriptUnit> {
    // if (Sandbox.isSkipMode) {
    //   return new Promise((resolve, reject) => {
    //     resolve();
    //   });
    // }

    const script = <avg.APIDialogue>scriptUnit;

    return new Promise((resolve, reject) => {
      ScriptingDispatcher.dispatch(avg.OP.ShowText, script, resolve);
    });
  }

  @Impl.printAPIDetail
  public static op_hide(scriptUnit: avg.AVGScriptUnit): Promise<avg.AVGScriptUnit> {
    const script = <avg.APIDialogue>scriptUnit;

    return new Promise((resolve, reject) => {
      ScriptingDispatcher.dispatch(avg.OP.HideText, script, resolve);
    });
  }
}
