import { AVGScriptUnit, RunnerFunction } from "./script-unit";
import { AVGArchives } from "../core/game-archives";
import { Sandbox } from "engine/core/sandbox";
import { AVGGame } from "engine/core/game";
import { preExportedSet } from "./exports/avg-exported-api";

export type OP_Runner = { op: string; runner: RunnerFunction };
export type OP_RunnerContainer = Array<OP_Runner>;
export type APITable = Map<string, OP_RunnerContainer>;

export class APIManager {
  private static _instance: APIManager;
  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  private constructor() {}

  private _apis: APITable = new Map<string, OP_RunnerContainer>();

  private _currentAPILine: number = 0;

  private _exportedClasses: Map<string, any> = new Map<string, any>();

  public registerExportClass(name: string, t: any) {
    this._exportedClasses.set(name, t);
  }

  public registeredClasses(): Map<string, any> {
    return this._exportedClasses;
  }

  public injectExports() {
    this.registeredClasses().forEach((value, key) => {
      Sandbox.inject(key, value);
      // Sandbox[key] = global[key] = value;
    });
  }

  public init() {
    preExportedSet.forEach((v: any) => {
      this.registerExportClass(v.name, v.t);
    });

    this.injectExports();
  }

  public extendImpl<T extends AVGScriptUnit>(
    typename: string,
    op: string,
    implRunner: RunnerFunction
  ): void {
    if (!op) {
      throw new Error("Invalid OP or runmer");
    }

    if (!this._apis) {
      this._apis = new Map<string, OP_RunnerContainer>();
    }

    if (!implRunner) {
      implRunner = (): Promise<AVGScriptUnit> => {
        return null;
      };
    }

    let opData = this.tryGetOP(typename, op);
    if (opData) {
      opData.runner = implRunner;
    } else {
      let container = this.tryCreateOPContainer(typename);
      container.push({ op: op, runner: implRunner });

      this._apis.set(typename, container);
    }

    // console.log(`Registered API proxy: ${typename}::${op}`);
  }

  public getImpl(typename: string, op: string): OP_Runner {
    this._currentAPILine++;
    AVGArchives.postAPICall(this._currentAPILine);

    if (AVGGame.isLoading()) {
      return null;
    } else {
      return this.tryGetOP(typename, op);
    }
  }

  private tryCreateOPContainer(typename: string) {
    let container = this._apis.get(typename);
    if (!container) {
      container = new Array<OP_Runner>();
      this._apis.set(typename, container);
    }

    return container;
  }

  private tryGetOP(typename: string, op: string): OP_Runner {
    const container = this._apis.get(typename);
    if (!container) {
      return null;
    }

    for (const opData of container) {
      if (opData.op === op) {
        return opData;
      }
    }

    return null;
  }

  public getCurrentAPILine() {
    return this._currentAPILine;
  }

  public resetCurrentAPILine() {
    this._currentAPILine = 0;
  }
}
