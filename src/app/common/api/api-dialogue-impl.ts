import * as avg from 'avg-engine/engine';
import { ScriptingDispatcher } from 'app/common/manager/scripting-dispatcher';
import { Impl } from 'app/common/api/impl';

export class APIDialogueImpl extends Impl {
    public static op_show(scriptUnit: avg.AVGScriptUnit): Promise<avg.AVGScriptUnit> {
        const script = <avg.APIDialogue>scriptUnit;

        return new Promise((resolve, reject) => {
            ScriptingDispatcher.dispatch(avg.OP.ShowText, script, resolve);
        });
    }

    public static op_hide(scriptUnit: avg.AVGScriptUnit): Promise<avg.AVGScriptUnit> {
        const script = <avg.APIDialogue>scriptUnit;

        return new Promise((resolve, reject) => {
            ScriptingDispatcher.dispatch(avg.OP.HideText, script, resolve);
        });
    }
}
