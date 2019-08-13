import { AVGSpriteRenderer } from "../../data/sprite-renderer";
import { APIExport, AVGExportedAPI } from "./avg-exported-api";
import { Subtitle } from "../../data/screen-subtitle";
import { APIScreenSubtitle, ScreenSubtitleResult } from "../api/api-screen-subtitle";
import {
  ScreenPosition,
  WidgetAnimation,
  ScreenWidgetAnimation,
  WidgetAnimation_FadeInOptions,
  WidgetAnimation_HideOptions
} from "../../data/screen-widget";
import { APIManager } from "../api-manager";
import { OP } from "../../const/op";
import { ScreenImage } from "../../data/screen-image";
import { APIScreenImage } from "../api/api-screen-image";
import { ResourceData } from "../../data/resource-data";
import { ResourcePath } from "../../core/resource";
import { paramCompatible } from "../../core/utils";
import { APIHtmlWidget } from "../api/api-html-widget";
import { EngineUtils } from "../../core/engine-utils";
import { Sandbox } from "../../core/sandbox";
import { SpriteAnimationMacro } from "engine/core/graphics/sprite-animate-director";
import { TransformConverter } from "engine/core/transform-converter";
import { ScreenWidgetHtml } from "engine/data/screen-widget-html";

@APIExport("widget", EngineAPI_Widget)
export class EngineAPI_Widget extends AVGExportedAPI {
  // public static async text(id: string, text: string, options?: Subtitle, isAsync: boolean = false) {
  //   let model = new APIScreenSubtitle();
  //   model.isAsync = isAsync;
  //   model.data = new Subtitle();
  //   Object.assign(model.data, options);

  //   // model.data.id = "Text_" + IDGenerator.generate();
  //   model.data.name = EngineUtils.makeWidgetID(id);

  //   model.data.text = text;
  //   model.data.position = options.position || ScreenPosition.Center;
  //   // model.data.animation = options.animation || new WidgetAnimation();
  //   // model.data.animation.name = model.data.animation.name || ScreenWidgetAnimation.Enter_Appear;
  //   // model.data.animation.options = model.data.animation.options || new WidgetAnimation_FadeInOptions();

  //   // if (!model.data) {
  //   //     model.data.animation.name = ScreenWidgetAnimation.Enter_Appear;
  //   // }

  //   // paramCompatible<APIScreenSubtitle, Subtitle>(model, options);

  //   // 跳过模式处理，跳过不执行动画
  //   if (Sandbox.isSkipMode && Sandbox.skipOptions.widgets === true) {
  //     // model.data.animation.options.duration = 0;
  //   }

  //   return <ScreenSubtitleResult>(
  //     await APIManager.Instance.getImpl(APIScreenSubtitle.name, OP.ShowTextWidget).runner(<APIScreenSubtitle>model)
  //   );
  // }

  // public static async animateText(id: string) {
  //   let model = new APIScreenSubtitle();
  //   model.data.name = EngineUtils.makeWidgetID(id);

  //   const proxy = APIManager.Instance.getImpl(APIScreenSubtitle.name, OP.AnimateTextWidget);
  //   proxy && (await proxy.runner(<APIScreenSubtitle>model));
  // }

  // public static async updateText(id: string, text: string) {
  //   let model = new APIScreenSubtitle();
  //   model.data.name = EngineUtils.makeWidgetID(id);
  //   model.data.text = text;

  //   const proxy = APIManager.Instance.getImpl(APIScreenSubtitle.name, OP.UpdateTextWidget);

  //   proxy && (await proxy.runner(<APIScreenSubtitle>model));
  // }

  public static async image(name: string, filename: string, options: ScreenImage) {
    let model = new APIScreenImage();
    model.isAsync = arguments[arguments.length - 1] === "__async_call__";

    if (!options || !(options instanceof Object)) {
      options = new ScreenImage();
    }

    model.data = options;
    model.name = super.validateImageID(name);
    model.filename = ResourceData.from(super.validateFilename(filename), ResourcePath.Images).filename;
    model.data.renderer = super.validateRenderer(options.renderer || new AVGSpriteRenderer());
    model.data.animation = super.validateSpriteAnimationMacro(options.animation);

    // // 跳过模式处理，跳过不执行动画
    if (Sandbox.isSkipMode && Sandbox.skipOptions.widgets === true) {
      // model.data.animation.options.duration = 0;
    }

    const proxy = APIManager.Instance.getImpl(APIScreenImage.name, OP.ShowImageWidget);
    return await proxy.runner(<APIScreenImage>model);
  }

  public static async animateImage(name: string, options: ScreenImage) {
    let model = new APIScreenImage();
    model.isAsync = arguments[arguments.length - 1] === "__async_call__";

    if (!options || !(options instanceof Object)) {
      options = new ScreenImage();
    }

    model.data = options;
    model.data.animation = super.validateSpriteAnimationMacro(options.animation);

    model.data = options;
    model.name = super.validateImageID(name);
    model.data.renderer = super.validateRenderer(options.renderer || new AVGSpriteRenderer());
    model.data.animation = super.validateSpriteAnimationMacro(options.animation);

    // // 跳过模式处理，跳过不执行动画
    if (Sandbox.isSkipMode && Sandbox.skipOptions.widgets === true) {
      // model.data.animation.options.duration = 0;
    }

    const proxy = APIManager.Instance.getImpl(APIScreenImage.name, OP.AnimateImageWidget);
    return await proxy.runner(<APIScreenImage>model);
  }

  public static async updateImage(name: string, filename: string) {
    let model = new APIScreenImage();
    model.name = super.validateImageID(name);
    model.filename = ResourceData.from(super.validateFilename(filename), ResourcePath.Images).filename;

    const proxy = APIManager.Instance.getImpl(APIScreenImage.name, OP.UpdateImageWidget);
    proxy && (await proxy.runner(<APIScreenImage>model));
  }

  // public static async removeText(id: string, options?: { animation?: WidgetAnimation }, isAsync: boolean = false) {
  //   let model = new APIScreenSubtitle();

  //   if (id) {
  //     model.isAsync = isAsync;
  //     model.data.name = EngineUtils.makeWidgetID(id) || undefined;
  //     // model.data.animation = options ? options.animation || undefined : undefined;
  //   }

  //   // 跳过模式处理，跳过不执行动画
  //   if (Sandbox.isSkipMode && Sandbox.skipOptions.widgets === true) {
  //     if (options && options.animation && options.animation.options) {
  //       // model.data.animation.options.duration = 0;
  //     }
  //   }

  //   const proxy = APIManager.Instance.getImpl(APIScreenSubtitle.name, OP.RemoveTextWidget);
  //   proxy && (await proxy.runner(<APIScreenSubtitle>model));
  // }

  public static async removeImage(name: string | string[], animation?: SpriteAnimationMacro) {
    let ids = [];
    if (Array.isArray(name)) {
      ids = name;
    } else {
      ids = [name];
    }

    ids.map(async v => {
      let model = new APIScreenImage();
      model.isAsync = arguments[arguments.length - 1] === "__async_call__";
      model.name = v;
      model.data.animation = super.validateSpriteAnimationMacro(animation);

      const proxy = APIManager.Instance.getImpl(APIScreenImage.name, OP.RemoveImageWidget);
      return await proxy.runner(<APIScreenImage>model);
    });
  }

  public static async html(name: string, html: string, styles: string, options?: ScreenWidgetHtml) {
    let model = new APIHtmlWidget();
    model.isAsync = arguments[arguments.length - 1] === "__async_call__";

    if (!options || !(options instanceof Object)) {
      options = new ScreenWidgetHtml();
    }

    model.data = Object.assign({}, model.data, options);
    model.data.html = html;
    model.data.styles = styles;
    model.data.name = EngineUtils.makeWidgetID(name);

    const proxy = APIManager.Instance.getImpl(APIHtmlWidget.name, OP.ShowHtmlWidget);
    proxy && (await proxy.runner(<APIHtmlWidget>model));
  }

  public static updateHTMLWidgetOption(name: string) {}
}
