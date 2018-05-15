import * as avg from "avg-engine/engine";
import { ScriptingDispatcher } from "app/common/manager/scripting-dispatcher";
import { Impl } from "app/common/api/impl";

export class APICharacterImpl extends Impl {
  @Impl.printAPIDetail
  public static op_show(
    scriptUnit: avg.AVGScriptUnit
  ): Promise<avg.AVGScriptUnit> {
    const script = <avg.APICharacter>scriptUnit;

    return new Promise((resolve, reject) => {
      ScriptingDispatcher.dispatch(avg.OP.ShowCharacter, script, resolve);
    });
  }


  @Impl.printAPIDetail
  public static op_animate(
    scriptUnit: avg.AVGScriptUnit
  ): Promise<avg.AVGScriptUnit> {
    const script = <avg.APIAnimateCharacter>scriptUnit;

    return new Promise((resolve, reject) => {
      ScriptingDispatcher.dispatch(avg.OP.AnimateCharacter, script, resolve);
    });
  }

  @Impl.printAPIDetail
  public static op_hide(
    scriptUnit: avg.AVGScriptUnit
  ): Promise<avg.AVGScriptUnit> {
    const script = <avg.APICharacter>scriptUnit;

    return new Promise((resolve, reject) => {
      ScriptingDispatcher.dispatch(avg.OP.HideCharacter, script, resolve);
    });
  }
}
