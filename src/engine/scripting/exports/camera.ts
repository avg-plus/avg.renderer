import { EngineAPI_Flow } from "./flow";

import { APICameraShake, APICameraTransitionTo } from "../api/api-camera";
import { CameraDirectorLayers, CameraShakeData } from "../../data/camera-data";
import { APIExport, AVGExportedAPI } from "./avg-exported-api";
import { APIManager } from "../api-manager";
import { APICameraMove } from "../api/api-camera";
import { OP } from "../../const/op";
import { CameraData } from "../../data/camera-data";

import * as joi from "joi";
import { Sandbox } from "engine/core/sandbox";
import { paramCompatible } from "engine/core/utils";
import { Effect } from "engine/data/effect";
import { APIEffect } from "../api/api-effect";

@APIExport("camera", EngineAPI_Camera)
export class EngineAPI_Camera extends AVGExportedAPI {
  public static async to(layer: CameraDirectorLayers, data: CameraData, duration: number = 1000) {
    const camera = new APICameraMove();
    camera.layer = layer;
    camera.duration = duration;
    camera.data = data;

    // 跳过模式处理，忽略时间
    if (Sandbox.isSkipMode && Sandbox.skipOptions.cameras === true) {
      camera.duration = 0;
    }

    const proxy = APIManager.Instance.getImpl(APICameraMove.name, OP.MoveCamera);
    proxy && (await proxy.runner(<APICameraMove>camera));
  }

  public static async shake(options: CameraShakeData) {
    const schema = joi.object().keys({
      horizontal: joi
        .number()
        .min(0)
        .default(10),
      vertical: joi
        .number()
        .min(0)
        .default(10),
      rotation: joi
        .number()
        .min(0)
        .default(5),
      duration: joi
        .number()
        .min(1)
        .default(1000)
        .required(),
      count: joi
        .number()
        .allow(["infinite"])
        .min(-1)
        .not(0)
        .max(999999)
        .default(5)
        .required()
    });

    const validateResult = super.APIParametersValidate(schema, options);

    const api = new APICameraShake();
    api.data = validateResult;

    // 跳过模式处理，跳过不执行镜头抖动
    if (Sandbox.isSkipMode && Sandbox.skipOptions.cameras === true) {
      api.data.duration = 0;
      return;
    }

    const proxy = APIManager.Instance.getImpl(APICameraShake.name, OP.ShakeCamera);
    proxy && (await proxy.runner(<APICameraShake>api));
  }

  public static async stopShake() {}

  public static async transitionTo(color: string, opacity: number, duration: number) {
    const api = new APICameraTransitionTo();
    api.color = color || "#FFFFFF";
    api.opacity = opacity;
    api.duration = duration;

    // 跳过模式处理，跳过不执行镜头渐变
    if (Sandbox.isSkipMode && Sandbox.skipOptions.cameras === true) {
      api.duration = 0;
      return;
    }

    const proxy = APIManager.Instance.getImpl(APICameraTransitionTo.name, OP.TransitionTo);
    proxy && (await proxy.runner(<APICameraTransitionTo>api));
  }

  public static async flash(color: string, opacity: number, duration: number, count: number = 1) {
    const schema = joi.object().keys({
      color: joi.string().required(),
      opacity: joi
        .number()
        .min(0)
        .default(255)
        .required(),
      duration: joi
        .number()
        .min(1)
        .default(50)
        .required(),
      count: joi
        .number()
        .allow(["infinite"])
        .min(-1)
        .not(0)
        .max(999999)
        .default(1)
    });

    const validateResult = super.APIParametersValidate(schema, {
      color,
      opacity,
      duration,
      count
    });
    if (validateResult) {
      for (let i = 0; i < validateResult.count; ++i) {
        const timing = validateResult.duration / 4;

        await this.transitionTo(validateResult.color, validateResult.opacity, timing);
        await EngineAPI_Flow.wait(timing);
        await this.transitionTo(validateResult.color, 0, timing);
        await EngineAPI_Flow.wait(timing);
      }
    }
  }

  public static async effect(effectName: string, options: any) {
    let model = new APIEffect();
    model.data.effectName = effectName;

    paramCompatible<APIEffect, Effect>(model, options);

    // 跳过模式处理，忽略时间
    if (Sandbox.isSkipMode && Sandbox.skipOptions.cameras === true) {
      if (model.data && model.data.duration) {
        model.data.duration = 0;
      }
    }

    const proxy = APIManager.Instance.getImpl(APIEffect.name, OP.PlayEffect);
    proxy && (await proxy.runner(<APIEffect>model));
  }

  public static async stopEffect() {}
}
