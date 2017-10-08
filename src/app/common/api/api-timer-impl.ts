import * as avg from 'avg-engine/engine';
import { ScriptingDispatcher } from 'app/common/manager/scripting-dispatcher';
import { Impl } from 'app/common/api/impl';

export class APITimerImpl extends Impl {
    @Impl.printAPIDetail
    public static op_wait(scriptUnit: avg.AVGScriptUnit): Promise<avg.AVGScriptUnit> {
        const script = <avg.APITimer>scriptUnit;

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, script.data.time);
        });
    }
}
