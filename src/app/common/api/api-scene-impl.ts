import * as avg from "avg-engine/engine";
import { ScriptingDispatcher } from "app/common/manager/scripting-dispatcher";
import { Impl } from "app/common/api/impl";
import { APIScene } from "avg-engine/engine";

export class APISceneImpl extends Impl {
  @Impl.registerImpl(APIScene, avg.OP.LoadScene)
  public static op_load_scene(scriptUnit: avg.AVGScriptUnit): Promise<avg.SceneHandle> {
    const script = <avg.APIScene>scriptUnit;

    return new Promise<avg.SceneHandle>((resolve, reject) => {
      ScriptingDispatcher.dispatch(avg.OP.LoadScene, script, resolve);
    });
  }

  @Impl.registerImpl(APIScene, avg.OP.RemoveScene)
  public static op_remove_scene(scriptUnit: avg.AVGScriptUnit): Promise<avg.AVGScriptUnit> {
    const script = <avg.APIScene>scriptUnit;

    return new Promise((resolve, reject) => {
      ScriptingDispatcher.dispatch(avg.OP.RemoveScene, script, resolve);
    });
  }
}
