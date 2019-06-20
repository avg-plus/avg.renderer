import { AVGScriptUnit } from '../script-unit';
import { Sandbox } from '../../core/sandbox';
import { Variable } from '../../data/variable';

export class APIVariable extends AVGScriptUnit {
    public static set(name: string, value: any) {
        Sandbox.runtime.Variables.set(name, value);
    }

    public static get(name: string): any {
        if (Sandbox.runtime.Variables.has(name)) {
            return Sandbox.runtime.Variables.get(name);
        }

        return undefined;
    }
}
