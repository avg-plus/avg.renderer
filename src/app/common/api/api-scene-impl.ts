import * as avg from "avg-engine/engine";
import { ScriptingDispatcher } from "app/common/manager/scripting-dispatcher";
import { Impl } from "app/common/api/impl";

export class APISceneImpl extends Impl {
  @Impl.printAPIDetail
  public static op_load_scene(
    scriptUnit: avg.AVGScriptUnit
  ): Promise<avg.AVGScriptUnit> {
    const script = <avg.APIScene>scriptUnit;

    return new Promise((resolve, reject) => {
      ScriptingDispatcher.dispatch(avg.OP.LoadScene, script, resolve);
    });
  }
}
