import { ScriptingDispatcher } from "app/common/manager/scripting-dispatcher";
import { Impl } from "app/common/api/impl";
import { OP } from "engine/const/op";
import { APIAnimateScene } from "engine/scripting/api/api-animate-scene";
import { AVGScriptUnit } from "engine/scripting/script-unit";

export class APIAnimateSceneImpl extends Impl {
  @Impl.registerImpl(APIAnimateScene, OP.AnimateScene)
  public static op_animate(scriptUnit: AVGScriptUnit): Promise<AVGScriptUnit> {
    const script = <APIAnimateScene>scriptUnit;

    return new Promise((resolve, reject) => {
      ScriptingDispatcher.dispatch(OP.AnimateScene, script, resolve);
    });
  }
}
