import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as avg from 'avg-engine/engine';

export class ScriptingDispatcher {
    public static subject = new Subject<any>();

    public static dispatch(op: string, scriptUnit: avg.AVGScriptUnit, resolver?: any) {
        this.subject.next({
            api: scriptUnit,
            op: op,
            resolver: resolver
        });
    }

    public static watch(): Observable<any> {
        return this.subject.asObservable();
    }
}
