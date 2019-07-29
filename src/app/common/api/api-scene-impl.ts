import { ScriptingDispatcher } from "app/common/manager/scripting-dispatcher";
import { Impl } from "app/common/api/impl";
import { OP } from "engine/const/op";
import { APIScene, SceneHandle } from "engine/scripting/api/api-scene";
import { AVGScriptUnit } from "engine/scripting/script-unit";

export class APISceneImpl extends Impl {
  @Impl.registerImpl(APIScene, OP.LoadScene)
  public static op_load_scene(scriptUnit: AVGScriptUnit): Promise<SceneHandle> {
    const script = <APIScene>scriptUnit;

    return new Promise<SceneHandle>((resolve, reject) => {
      ScriptingDispatcher.dispatch(OP.LoadScene, script, resolve);
    });
  }

  @Impl.registerImpl(APIScene, OP.RemoveScene)
  public static op_remove_scene(scriptUnit: AVGScriptUnit): Promise<AVGScriptUnit> {
    const script = <APIScene>scriptUnit;

    return new Promise((resolve, reject) => {
      ScriptingDispatcher.dispatch(OP.RemoveScene, script, resolve);
    });
  }

  @Impl.registerImpl(APIScene, OP.AnimateScene)
  public static op_animate_scene(scriptUnit: AVGScriptUnit): Promise<AVGScriptUnit> {
    const script = <APIScene>scriptUnit;

    return new Promise((resolve, reject) => {
      ScriptingDispatcher.dispatch(OP.AnimateScene, script, resolve);
    });
  }


  @Impl.registerImpl(APIScene, OP.ClearSceneFilter)
  public static op_clear_scene_filters(scriptUnit: AVGScriptUnit): Promise<AVGScriptUnit> {
    const script = <APIScene>scriptUnit;

    return new Promise((resolve, reject) => {
      ScriptingDispatcher.dispatch(OP.ClearSceneFilter, script, resolve);
    });
  }

  @Impl.registerImpl(APIScene, OP.SetSceneFilter)
  public static op_set_scene_filter(scriptUnit: AVGScriptUnit): Promise<AVGScriptUnit> {
    const script = <APIScene>scriptUnit;

    return new Promise((resolve, reject) => {
      ScriptingDispatcher.dispatch(OP.SetSceneFilter, script, resolve);
    });
  }
}
