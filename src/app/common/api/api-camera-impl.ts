import { ScriptingDispatcher } from "app/common/manager/scripting-dispatcher";
import { Impl } from "app/common/api/impl";
import { TransitionLayerService } from "../../components/transition-layer/transition-layer.service";
import { OP } from "engine/const/op";
import { APICameraMove, APICameraShake, APICameraTransitionTo } from "engine/scripting/api/api-camera";
import { AVGScriptUnit } from "engine/scripting/script-unit";
import { SceneHandle } from "engine/scripting/api/api-scene";

export class APICameraImpl extends Impl {
  @Impl.registerImpl(APICameraMove, OP.MoveCamera)
  public static op_move(scriptUnit: AVGScriptUnit): Promise<AVGScriptUnit> {
    const script = <APICameraMove>scriptUnit;

    return new Promise((resolve, reject) => {
      ScriptingDispatcher.dispatch(OP.MoveCamera, script, resolve);
    });
  }

  @Impl.registerImpl(APICameraShake, OP.ShakeCamera)
  public static op_shake(scriptUnit: AVGScriptUnit): Promise<AVGScriptUnit> {
    const script = <APICameraShake>scriptUnit;

    return new Promise((resolve, reject) => {
      ScriptingDispatcher.dispatch(OP.ShakeCamera, script, resolve);
    });
  }

  @Impl.registerImpl(APICameraTransitionTo, OP.TransitionTo)
  public static op_transition_to(scriptUnit: AVGScriptUnit): Promise<SceneHandle> {
    const script = <APICameraTransitionTo>scriptUnit;

    return new Promise<SceneHandle>((resolve, reject) => {
      TransitionLayerService.transitionTo(script.color, script.opacity, script.duration).then(
        () => {
          resolve();
        },
        _ => {}
      );
    });
  }
}
