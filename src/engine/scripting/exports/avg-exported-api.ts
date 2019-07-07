import * as joi from "joi";
import { AVGEngineError } from "../../core/engine-errors";
import { i18n } from "../../core/i18n";
import { Renderer } from "engine/data/renderer";

// 暂存导出的类，APIManager 加载后会取走
export const preExportedSet = new Set();

export function APIExport(name: string, t: any) {
  console.log("APIExport " + name);
  return function(constructor: Function) {
    preExportedSet.add({ name, t });
  };
}

export class AVGExportedAPI {
  protected static APIParametersValidate(schema, data: any) {
    const validateResult = schema.validate(data);
    if (validateResult.error) {
      AVGEngineError.emit(
        i18n.lang.SCRIPTING_API_IVALID_ARGUMENTS,
        validateResult.error.message,
        validateResult.error.stack
      );
      return null;
    }

    return validateResult.value;
  }

  /**
   * 校验资源文件路径
   *
   * @protected
   * @static
   * @param {string} filename
   * @returns
   * @memberof AVGExportedAPI
   */
  protected static validateFilename(filename: string) {
    return this.APIParametersValidate(
      joi
        .string()
        .required()
        .min(1)
        .max(255),
      filename
    );
  }

  protected static validateImageID(id: string) {
    return this.APIParametersValidate(
      joi
        .string()
        .required()
        .min(1)
        .max(255)
        .description("立绘对象标识符"),
      id
    );
  }

  protected static validateRenderer(renderer: Renderer) {
    return this.APIParametersValidate(
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
        filters: joi
          .array()
          .optional()
          .description("滤镜"),
        alpha: joi
          .number()
          .min(0)
          .max(1)
          .optional()
          .description("透明度"),
        renderInCamera: joi
          .boolean()
          .optional()
          .default(false)
          .description("是否渲染到摄像机")
      }),
      renderer
    );
  }
}
