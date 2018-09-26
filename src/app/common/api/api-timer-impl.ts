import * as avg from "avg-engine/engine";
import { ScriptingDispatcher } from "app/common/manager/scripting-dispatcher";
import { Impl } from "app/common/api/impl";
import { APITimer } from "avg-engine/engine";

export class APITimerImpl extends Impl {
  @Impl.registerImpl(APITimer, avg.OP.Wait)
  public static op_wait(scriptUnit: avg.AVGScriptUnit): Promise<avg.AVGScriptUnit> {
    const script = <avg.APITimer>scriptUnit;

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, script.data.time);
    });
  }
}
