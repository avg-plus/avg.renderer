import { AVGData } from "../data/avg-data";

export type RunnerFunction = (scriptUnit?: AVGScriptUnit) => Promise<AVGData>;
export class AVGScriptUnit {
  public data: AVGData;
  private _runner: RunnerFunction;
  private _isAsync: boolean = true;

  constructor(async: boolean = true) {
    this.isAsync = async;
  }

  public get isAsync(): boolean {
    return this._isAsync;
  }

  public set isAsync(value: boolean) {
    this._isAsync = value;
  }

  public get runner(): RunnerFunction {
    console.log("Execute API Runner:", this);
    return this._runner;
  }

  public set runner(value: RunnerFunction) {
    this._runner = value;
  }
}
