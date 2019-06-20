import { ScriptingDispatcher } from "app/common/manager/scripting-dispatcher";
import { Impl } from "app/common/api/impl";
import { OP } from "engine/const/op";
import { APITimer } from "engine/scripting/api/api-timer";
import { AVGScriptUnit } from "engine/scripting/script-unit";

export class APITimerImpl extends Impl {
  @Impl.registerImpl(APITimer, OP.Wait)
  public static op_wait(scriptUnit: AVGScriptUnit): Promise<AVGScriptUnit> {
    const script = <APITimer>scriptUnit;

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, script.data.time);
    });
  }
}
