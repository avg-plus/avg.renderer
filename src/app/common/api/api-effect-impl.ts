import * as avg from 'avg-engine/engine';
import { ScriptingDispatcher } from 'app/common/manager/scripting-dispatcher';
import { Impl } from 'app/common/api/impl';

export class APIEffectImpl extends Impl {
    @Impl.printAPIDetail
    public static op_play_effect(scriptUnit: avg.AVGScriptUnit): Promise<avg.AVGScriptUnit> {
        const script = <avg.APIEffect>scriptUnit;

        return new Promise((resolve, reject) => {
            ScriptingDispatcher.dispatch(avg.OP.PlayEffect, script, resolve);
        });
    }
}
