import { APIExport, AVGExportedAPI } from "./avg-exported-api";
import { Sandbox } from "../../core/sandbox";
import { APITimer } from "../api/api-timer";
import { APIManager } from "../api-manager";
import { OP } from "../../const/op";
import * as joi from "joi";
import { ResourceData } from "engine/data/resource-data";
import { ResourcePath } from "engine/core/resource";
import { APICallScript } from "../api/api-call-script";

@APIExport("flow", EngineAPI_Flow)
export class EngineAPI_Flow extends AVGExportedAPI {
  private static intervalTables: any = {};
  private static timeoutTables: any = {};

  /**
   * 延时（串行）
   *
   * @static
   * @param {number} time
   * @returns
   * @memberof EngineAPI_Flow
   */
  public static async wait(time: number /*, options: Timer*/) {
    if (Sandbox.isSkipMode) {
      return;
    }

    let model = new APITimer();
    model.data.time = time;
    // paramCompatible<APITimer, Timer>(model, {}, {
    //   field: "time",
    //   value: time
    // });

    const proxy = APIManager.Instance.getImpl(APITimer.name, OP.Wait);
    await proxy.runner(<APITimer>model);
  }

  /**
   * 创建周期定时器
   *
   * @static
   * @param {string} id
   * @param {() => void} handler
   * @param {number} ms
   * @memberof EngineAPI_Flow
   */
  public static setInterval(id: string, handler: () => void, ms: number) {
    const schema = joi.object().keys({
      id: joi.string().required(),
      handler: joi.func().required(),
      ms: joi
        .number()
        .min(1)
        .required()
    });

    const result = super.APIParametersValidate(schema, { id, handler, ms });

    this.clearInterval(result.id);

    this.intervalTables[result.id] = setInterval(handler, result.ms);

    return this.intervalTables[result.id];
  }
  /**
   * 清除周期定时器
   *
   * @static
   * @param {string} id
   * @memberof EngineAPI_Flow
   */
  public static async clearInterval(id: string) {
    const schema = joi.object().keys({
      id: joi.string().required()
    });

    const result = super.APIParametersValidate(schema, { id });

    if (this.intervalTables[result.id]) {
      clearInterval(this.intervalTables[result.id]);
      delete this.intervalTables[result.id];
    }
  }

  /**
   * 创建延时定时器
   *
   * @static
   * @param {string} id
   * @param {() => void} handler
   * @param {number} ms
   * @memberof EngineAPI_Flow
   */
  public static async setTimeout(id: string, handler: () => void, ms: number) {
    const schema = joi.object().keys({
      id: joi.string().required(),
      handler: joi.func().required(),
      ms: joi
        .number()
        .min(1)
        .required()
    });

    const result = super.APIParametersValidate(schema, { id, handler, ms });

    this.clearTimeout(result.id);
    this.timeoutTables[result.id] = setTimeout(handler, result.ms);

    return this.timeoutTables[result.id];
  }

  /**
   * 清除延时定时器
   *
   * @static
   * @param {string} id
   * @memberof EngineAPI_Flow
   */
  public static async clearTimeout(id: string) {
    const schema = joi.object().keys({
      id: joi.string().required()
    });

    const result = super.APIParametersValidate(schema, { id });

    if (this.timeoutTables[result.id]) {
      clearTimeout(this.timeoutTables[result.id]);
      delete this.timeoutTables[result.id];
    }
  }

  public static async clearAllIntervals() {
    for (const v in this.intervalTables) {
      clearInterval(this.intervalTables[v]);
    }
  }

  public static async clearAllTimeouts() {
    for (const v in this.intervalTables) {
      clearInterval(this.timeoutTables[v]);
    }
  }

  public static async call(file: string) {
    let model = new APICallScript();
    model.scriptFile = ResourceData.from(file, ResourcePath.Scripts).filename;

    const r = await APIManager.Instance.getImpl(APICallScript.name, OP.CallScript).runner(<APICallScript>model);

    return r;
  }
}
