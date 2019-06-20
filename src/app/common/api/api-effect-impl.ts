import { ScriptingDispatcher } from "app/common/manager/scripting-dispatcher";
import { Impl } from "app/common/api/impl";
import { OP } from "engine/const/op";
import { APIEffect } from "engine/scripting/api/api-effect";
import { AVGScriptUnit } from "engine/scripting/script-unit";

export class APIEffectImpl extends Impl {
  @Impl.registerImpl(APIEffect, OP.PlayEffect)
  public static op_play_effect(scriptUnit: AVGScriptUnit): Promise<AVGScriptUnit> {
    const script = <APIEffect>scriptUnit;

    return new Promise((resolve, reject) => {
      ScriptingDispatcher.dispatch(OP.PlayEffect, script, resolve);
    });
  }
}
