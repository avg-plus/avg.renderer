import * as avg from "avg-engine/engine";
import { ScriptingDispatcher } from "app/common/manager/scripting-dispatcher";
import { Impl } from "app/common/api/impl";
import { APIAnimateScene } from "avg-engine/engine";

export class APIAnimateSceneImpl extends Impl {
  @Impl.registerImpl(APIAnimateScene, avg.OP.AnimateScene)
  public static op_animate(scriptUnit: avg.AVGScriptUnit): Promise<avg.AVGScriptUnit> {
    const script = <avg.APIAnimateScene>scriptUnit;

    return new Promise((resolve, reject) => {
      ScriptingDispatcher.dispatch(avg.OP.AnimateScene, script, resolve);
    });
  }
}
