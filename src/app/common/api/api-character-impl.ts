import { ScriptingDispatcher } from "app/common/manager/scripting-dispatcher";
import { Impl } from "app/common/api/impl";
import { OP } from "engine/const/op";
import { APICharacter } from "engine/scripting/api/api-character";
import { AVGScriptUnit } from "engine/scripting/script-unit";

export class APICharacterImpl extends Impl {
  @Impl.registerImpl(APICharacter, OP.ShowCharacter)
  public static op_show(scriptUnit: AVGScriptUnit): Promise<AVGScriptUnit> {
    const script = <APICharacter>scriptUnit;

    return new Promise((resolve, reject) => {
      ScriptingDispatcher.dispatch(OP.ShowCharacter, script, resolve);
    });
  }

  @Impl.registerImpl(APICharacter, OP.AnimateCharacter)
  public static op_animate(scriptUnit: AVGScriptUnit): Promise<AVGScriptUnit> {
    const script = <APICharacter>scriptUnit;

    return new Promise((resolve, reject) => {
      ScriptingDispatcher.dispatch(OP.AnimateCharacter, script, resolve);
    });
  }

  @Impl.registerImpl(APICharacter, OP.UpdateCharacter)
  public static op_update(scriptUnit: AVGScriptUnit): Promise<AVGScriptUnit> {
    const script = <APICharacter>scriptUnit;

    return new Promise((resolve, reject) => {
      ScriptingDispatcher.dispatch(OP.UpdateCharacter, script, resolve);
    });
  }

  @Impl.registerImpl(APICharacter, OP.HideCharacter)
  public static op_hide(scriptUnit: AVGScriptUnit): Promise<AVGScriptUnit> {
    const script = <APICharacter>scriptUnit;

    return new Promise((resolve, reject) => {
      ScriptingDispatcher.dispatch(OP.HideCharacter, script, resolve);
    });
  }

  @Impl.registerImpl(APICharacter, OP.SetCharacterFilter)
  public static op_set_character_filter(scriptUnit: AVGScriptUnit): Promise<AVGScriptUnit> {
    const script = <APICharacter>scriptUnit;

    return new Promise((resolve, reject) => {
      ScriptingDispatcher.dispatch(OP.SetCharacterFilter, script, resolve);
    });
  }

  @Impl.registerImpl(APICharacter, OP.ClearCharacterFilter)
  public static op_clear_character_filters(scriptUnit: AVGScriptUnit): Promise<AVGScriptUnit> {
    const script = <APICharacter>scriptUnit;

    return new Promise((resolve, reject) => {
      ScriptingDispatcher.dispatch(OP.ClearCharacterFilter, script, resolve);
    });
  }

}
