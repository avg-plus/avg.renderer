import * as avg from "avg-engine/engine";
import { ScriptingDispatcher } from "app/common/manager/scripting-dispatcher";
import { Impl } from "app/common/api/impl";
import { APICharacter } from "avg-engine/engine";

export class APICharacterImpl extends Impl {
  @Impl.registerImpl(APICharacter, avg.OP.ShowCharacter)
  public static op_show(scriptUnit: avg.AVGScriptUnit): Promise<avg.AVGScriptUnit> {
    const script = <avg.APICharacter>scriptUnit;

    return new Promise((resolve, reject) => {
      ScriptingDispatcher.dispatch(avg.OP.ShowCharacter, script, resolve);
    });
  }

  @Impl.registerImpl(APICharacter, avg.OP.AnimateCharacter)
  public static op_animate(scriptUnit: avg.AVGScriptUnit): Promise<avg.AVGScriptUnit> {
    const script = <avg.APIAnimateCharacter>scriptUnit;

    return new Promise((resolve, reject) => {
      ScriptingDispatcher.dispatch(avg.OP.AnimateCharacter, script, resolve);
    });
  }


  @Impl.registerImpl(APICharacter, avg.OP.UpdateCharacter)
  public static op_update(scriptUnit: avg.AVGScriptUnit): Promise<avg.AVGScriptUnit> {
    const script = <avg.APICharacter>scriptUnit;

    return new Promise((resolve, reject) => {
      ScriptingDispatcher.dispatch(avg.OP.UpdateCharacter, script, resolve);
    });
  }

  @Impl.registerImpl(APICharacter, avg.OP.HideCharacter)
  public static op_hide(scriptUnit: avg.AVGScriptUnit): Promise<avg.AVGScriptUnit> {
    const script = <avg.APICharacter>scriptUnit;

    return new Promise((resolve, reject) => {
      ScriptingDispatcher.dispatch(avg.OP.HideCharacter, script, resolve);
    });
  }
}
