import * as avg from "avg-engine/engine";
import { ScriptingDispatcher } from "app/common/manager/scripting-dispatcher";
import { Impl } from "app/common/api/impl";
import { APICameraMove, APICameraShake, APICameraTransitionTo } from "avg-engine/engine";
import { TransitionLayerService } from "../../components/transition-layer/transition-layer.service";

export class APICameraImpl extends Impl {
  @Impl.registerImpl(APICameraMove, avg.OP.MoveCamera)
  public static op_move(scriptUnit: avg.AVGScriptUnit): Promise<avg.AVGScriptUnit> {
    const script = <APICameraMove>scriptUnit;

    return new Promise((resolve, reject) => {
      ScriptingDispatcher.dispatch(avg.OP.MoveCamera, script, resolve);
    });
  }

  @Impl.registerImpl(APICameraShake, avg.OP.ShakeCamera)
  public static op_shake(scriptUnit: avg.AVGScriptUnit): Promise<avg.AVGScriptUnit> {
    const script = <APICameraShake>scriptUnit;

    return new Promise((resolve, reject) => {
      ScriptingDispatcher.dispatch(avg.OP.ShakeCamera, script, resolve);
    });
  }

  @Impl.registerImpl(APICameraTransitionTo, avg.OP.TransitionTo)
  public static op_transition_to(
    scriptUnit: avg.AVGScriptUnit
  ): Promise<avg.SceneHandle> {
    const script = <avg.APICameraTransitionTo>scriptUnit;

    return new Promise<avg.SceneHandle>((resolve, reject) => {
      TransitionLayerService.transitionTo(script.color, script.opacity, script.duration).then(() => {
        resolve();
      }, _ => { });
    });
  }
}
