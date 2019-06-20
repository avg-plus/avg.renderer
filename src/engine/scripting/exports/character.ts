
import * as joi from "joi";
import { Character } from "engine/data/character";
import { ResourceData } from "engine/data/resource-data";
import { ResourcePath } from "engine/core/resource";
import { EngineUtils } from "engine/core/engine-utils";
import { OP } from "engine/const/op";
import { APICharacter } from "../api/api-character";
import { APIManager } from "../api-manager";
import { APIAnimateCharacter } from "../api/api-animate-character";
import { APIExport, AVGExportedAPI } from "./avg-exported-api";

@APIExport("character", EngineAPI_Character)
export class EngineAPI_Character extends AVGExportedAPI {
  public static async show(name: string, filename: string, options?: Character) {
    let model = new APICharacter();
    model.data = options;

    model.name = super.APIParametersValidate(
      joi
        .string()
        .required()
        .min(1)
        .max(255)
        .description("立绘对象标识符"),
      name
    );

    model.filename = ResourceData.from(
      super.APIParametersValidate(
        joi
          .string()
          .required()
          .min(1)
          .max(255),
        filename
      ),
      ResourcePath.Characters
    ).filename;

    model.data = super.APIParametersValidate(
      joi.object().keys({
        x: joi
          .number()
          .optional()
          .description("立绘显示的X坐标"),
        y: joi
          .number()
          .optional()
          .description("立绘显示的Y坐标"),
        width: joi
          .number()
          .optional()
          .description("立绘宽度"),
        height: joi
          .number()
          .optional()
          .description("立绘高度"),
        scale: joi
          .number()
          .optional()
          .description("同时设置x,y轴缩放倍数"),
        scaleX: joi
          .number()
          .optional()
          .description("X轴缩放"),
        scaleY: joi
          .number()
          .optional()
          .description("Y轴缩放"),
        skew: joi
          .number()
          .optional()
          .description("同时设置x,y轴斜率"),
        skewX: joi
          .number()
          .optional()
          .description("X轴斜率"),
        skewY: joi
          .number()
          .optional()
          .description("Y轴斜率"),
        rotation: joi
          .number()
          .optional()
          .description("旋转角度"),
        renderInCamera: joi
          .boolean()
          .optional()
          .default(false)
          .description("是否渲染到摄像机")
      }),
      options
    );

    // model.data.avatar = new Avatar();

    const proxy = APIManager.Instance.getImpl(APICharacter.name, OP.ShowCharacter);
    return await proxy.runner(<APICharacter>model);
  }

  // public static async update(id: string, filename: string, options?: Character) {
  //   let model = new APICharacter();
  //   model.name = EngineUtils.makeWidgetID(id);
  //   model.data.avatar = new Avatar();
  //   model.data = mergeDeep(model.data, options);
  //   model.data.position = options.position;

  //   model.data.avatar.file = ResourceData.from(filename, ResourcePath.Characters).filename;

  //   if (options && options.renderer && options.renderer.filters) {
  //     model.data.avatar.renderer.filters = options.renderer.filters;
  //   }

  //   const proxy = APIManager.getImpl(APICharacter.name, OP.UpdateCharacter);
  //   return await proxy.runner(<APICharacter>model);
  // }

  public static async animate(id: string, animateName: string, options: any) {
    const model = new APIAnimateCharacter();
    model.id = id;
    model.animateName = animateName;

    const proxy = APIManager.Instance.getImpl(APICharacter.name, OP.AnimateCharacter);
    proxy && (await proxy.runner(<APIAnimateCharacter>model));
  }

  public static async hide(id: string | string[]) {
    let ids = [];
    if (Array.isArray(id)) {
      ids = id;
    } else {
      ids = [id];
    }

    ids.map(async v => {
      let model = new APICharacter();
      model.name = EngineUtils.makeWidgetID(v);

      const proxy = APIManager.Instance.getImpl(APICharacter.name, OP.HideCharacter);
      return await proxy.runner(<APICharacter>model);
    });
  }
}
