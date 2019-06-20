import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";
import { AVGScriptUnit } from "engine/scripting/script-unit";

export class ScriptingDispatcher {
  public static subject = new Subject<any>();

  public static dispatch(
    op: string,
    scriptUnit: AVGScriptUnit,
    resolver?: any
  ) {
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
