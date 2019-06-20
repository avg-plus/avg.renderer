import { APIExport, AVGExportedAPI } from "./avg-exported-api";
import { Subtitle } from "../../data/screen-subtitle";
import { APIScreenSubtitle, ScreenSubtitleResult } from "../api/api-screen-subtitle";
import { IDGenerator } from "../../core/id-generator";
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
import { APIScreenImage, ScreenImageResult } from "../api/api-screen-image";
import { ResourceData } from "../../data/resource-data";
import { ResourcePath } from "../../core/resource";
import { paramCompatible } from "../../core/utils";
import { APIHtmlWidget, HtmlWidgetResult } from "../api/api-html-widget";
import { EngineUtils } from "../../core/engine-utils";
import { Sandbox } from "../../core/sandbox";

@APIExport("widget", EngineAPI_Widget)
export class EngineAPI_Widget extends AVGExportedAPI {
  public static async text(id: string, text: string, options?: Subtitle, isAsync: boolean = false) {
    let model = new APIScreenSubtitle();
    model.isAsync = isAsync;
    model.data = new Subtitle();
    Object.assign(model.data, options);

    // model.data.id = "Text_" + IDGenerator.generate();
    model.data.name = EngineUtils.makeWidgetID(id);

    model.data.text = text;
    model.data.position = options.position || ScreenPosition.Center;
    model.data.animation = options.animation || new WidgetAnimation();
    model.data.animation.name = model.data.animation.name || ScreenWidgetAnimation.Enter_Appear;
    model.data.animation.options = model.data.animation.options || new WidgetAnimation_FadeInOptions();

    // if (!model.data) {
    //     model.data.animation.name = ScreenWidgetAnimation.Enter_Appear;
    // }

    // paramCompatible<APIScreenSubtitle, Subtitle>(model, options);

    // 跳过模式处理，跳过不执行动画
    if (Sandbox.isSkipMode && Sandbox.skipOptions.widgets === true) {
      model.data.animation.options.duration = 0;
    }

    return <ScreenSubtitleResult>(
      await APIManager.Instance.getImpl(APIScreenSubtitle.name, OP.ShowTextWidget).runner(<APIScreenSubtitle>model)
    );
  }

  public static async animateText(id: string, animation: WidgetAnimation) {
    let model = new APIScreenSubtitle();
    model.data.name = EngineUtils.makeWidgetID(id);

    const proxy = APIManager.Instance.getImpl(APIScreenSubtitle.name, OP.AnimateTextWidget);
    proxy && (await proxy.runner(<APIScreenSubtitle>model));
  }

  public static async updateText(id: string, text: string) {
    let model = new APIScreenSubtitle();
    model.data.name = EngineUtils.makeWidgetID(id);
    model.data.text = text;

    const proxy = APIManager.Instance.getImpl(APIScreenSubtitle.name, OP.UpdateTextWidget);

    proxy && (await proxy.runner(<APIScreenSubtitle>model));
  }

  public static async image(id: string, file: string, options: ScreenImage, isAsync: boolean = false) {
    let model = new APIScreenImage();
    model.isAsync = isAsync;
    model.data = new ScreenImage();
    Object.assign(model.data, options);

    // model.data.id = "Image_" + IDGenerator.generate();
    model.data.name = EngineUtils.makeWidgetID(id);

    model.data.file = ResourceData.from(file, ResourcePath.Images);
    model.data.position = options.position || ScreenPosition.Center;
    model.data.size = options.size || "100%";
    model.data.animation = model.data.animation || new WidgetAnimation();
    model.data.animation.name = model.data.animation.name || ScreenWidgetAnimation.Enter_Appear;
    model.data.animation.options = model.data.animation.options || new WidgetAnimation_FadeInOptions();

    // 跳过模式处理，跳过不执行动画
    if (Sandbox.isSkipMode && Sandbox.skipOptions.widgets === true) {
      model.data.animation.options.duration = 0;
    }

    // paramCompatible<APIScreenImage, ScreenImage>(model, options);

    return <ScreenImageResult>(
      await APIManager.Instance.getImpl(APIScreenImage.name, OP.ShowImageWidget).runner(<APIScreenImage>model)
    );
  }

  public static async updateImage(id: string, file: string, options: ScreenImage, isAsync: boolean = false) {
    let model = new APIScreenImage();
    model.isAsync = isAsync;
    model.data = new ScreenImage();
    Object.assign(model.data, options);

    // model.data.id = "Image_" + IDGenerator.generate();
    model.data.name = EngineUtils.makeWidgetID(id);

    model.data.file = ResourceData.from(file, ResourcePath.Images);
    model.data.position = options.position || ScreenPosition.Center;
    model.data.size = options.size || "100%";
    model.data.animation = model.data.animation || new WidgetAnimation();
    model.data.animation.name = model.data.animation.name || ScreenWidgetAnimation.Enter_Appear;
    model.data.animation.options = model.data.animation.options || new WidgetAnimation_FadeInOptions();

    // 跳过模式处理，跳过不执行动画
    if (Sandbox.isSkipMode && Sandbox.skipOptions.widgets === true) {
      model.data.animation.options.duration = 0;
    }

    // paramCompatible<APIScreenImage, ScreenImage>(model, options);

    return <ScreenImageResult>(
      await APIManager.Instance.getImpl(APIScreenImage.name, OP.UpdateImageWidget).runner(<APIScreenImage>model)
    );
  }

  public static async removeText(id: string, options?: { animation?: WidgetAnimation }, isAsync: boolean = false) {
    let model = new APIScreenSubtitle();

    if (id) {
      model.isAsync = isAsync;
      model.data.name = EngineUtils.makeWidgetID(id) || undefined;
      model.data.animation = options ? options.animation || undefined : undefined;
    }

    // 跳过模式处理，跳过不执行动画
    if (Sandbox.isSkipMode && Sandbox.skipOptions.widgets === true) {
      if (options && options.animation && options.animation.options) {
        model.data.animation.options.duration = 0;
      }
    }

    const proxy = APIManager.Instance.getImpl(APIScreenSubtitle.name, OP.RemoveTextWidget);
    proxy && (await proxy.runner(<APIScreenSubtitle>model));
  }

  public static async removeImage(id: string, options: ScreenImage, isAsync: boolean = false) {
    let model = new APIScreenImage();

    if (id) {
      model.isAsync = isAsync;
      model.data.name = EngineUtils.makeWidgetID(id);

      model.data.animation = new WidgetAnimation();
      model.data.animation.name = ScreenWidgetAnimation.Leave_Hide;

      if (!model.data.animation.options) {
        model.data.animation.options = new WidgetAnimation_HideOptions();
      }
    }

    paramCompatible<APIScreenImage, ScreenImage>(model, options);

    // 跳过模式处理，跳过不执行动画
    if (Sandbox.isSkipMode && Sandbox.skipOptions.widgets === true) {
      if (options && options.animation && options.animation.options) {
        model.data.animation.options.duration = 0;
      }
    }

    const proxy = APIManager.Instance.getImpl(APIScreenImage.name, OP.RemoveImageWidget);
    proxy && (await proxy.runner(<APIScreenImage>model));
  }

  public static async html(id: string, html: string) {
    let model = new APIHtmlWidget();
    model.data.html = html;
    model.data.name = EngineUtils.makeWidgetID(id);

    const proxy = APIManager.Instance.getImpl(APIHtmlWidget.name, OP.ShowHtmlWidget);
    proxy && (await proxy.runner(<APIHtmlWidget>model));

    // return <HtmlWidgetResult>(
    //   await APIManager.getImpl(APIHtmlWidget.name, OP.ShowHtmlWidget).runner(<APIHtmlWidget>model)
    // );
  }
}
