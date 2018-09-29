import * as avg from "avg-engine/engine";
import { ScriptingDispatcher } from "app/common/manager/scripting-dispatcher";
import { Impl } from "app/common/api/impl";
import { APICamera } from "avg-engine/engine";

export class APICameraImpl extends Impl {
  @Impl.registerImpl(APICamera, avg.OP.MoveCamera)
  public static op_move(scriptUnit: avg.AVGScriptUnit): Promise<avg.AVGScriptUnit> {
    const script = <APICamera>scriptUnit;

    return new Promise((resolve, reject) => {
      ScriptingDispatcher.dispatch(avg.OP.MoveCamera, script, resolve);
    });
  }
}
