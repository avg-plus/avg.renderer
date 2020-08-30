import { AVGSpriteRenderer } from "../../data/sprite-renderer";
import { APIExport, AVGExportedAPI } from "./avg-exported-api";
import { Subtitle } from "../../data/screen-subtitle";
import { APIScreenSubtitle } from "../api/api-screen-subtitle";
import { APIManager } from "../api-manager";
import { OP } from "../../const/op";
import { ScreenImage } from "../../data/screen-image";
import { APIScreenImage } from "../api/api-screen-image";
import { ResourceData } from "../../data/resource-data";
import { ResourcePath } from "../../core/resource";
import { APIHtmlWidget } from "../api/api-html-widget";
import { EngineUtils } from "../../core/engine-utils";
import { Sandbox } from "../../core/sandbox";
import { SpriteAnimationMacro } from "engine/core/graphics/sprite-animate-director";
import { ScreenWidgetHtml } from "engine/data/screen-widget-html";
import { SpriteWidgetManager } from "engine/core/graphics/sprite-widget-manager";

import { GameWorld } from "engine/core/graphics/world";

@APIExport("widget", EngineAPI_Widget)
export class EngineAPI_Widget extends AVGExportedAPI {
  
  public static async image(
    name: string,
    filename: string,
    options: ScreenImage
  ) {
    let model = new APIScreenImage();
    model.isAsync = arguments[arguments.length - 1] === "__async_call__";

    if (!options || !(options instanceof Object)) {
      options = new ScreenImage();
    }

    model.data = options;
    model.name = super.validateImageID(name);
    model.filename = ResourceData.from(
      super.validateFilename(filename),
      ResourcePath.Images
    ).filename;
    model.data.renderer = super.validateRenderer(
      options.renderer || new AVGSpriteRenderer()
    );
    model.data.animation = super.validateSpriteAnimationMacro(
      options.animation
    );

    // // 跳过模式处理，跳过不执行动画
    if (Sandbox.isSkipMode && Sandbox.skipOptions.widgets === true) {
      // model.data.animation.options.duration = 0;
    }

    const proxy = APIManager.Instance.getImpl(
      APIScreenImage.name,
      OP.ShowImageWidget
    );
    return await proxy.runner(<APIScreenImage>model);
  }

  public static async getRenderer(name: string) {
    return SpriteWidgetManager.getSprite(name);
  }

  public static async animateImage(name: string, options: ScreenImage) {
    let model = new APIScreenImage();
    model.isAsync = arguments[arguments.length - 1] === "__async_call__";

    if (!options || !(options instanceof Object)) {
      options = new ScreenImage();
    }

    model.data = options;
    model.data.animation = super.validateSpriteAnimationMacro(
      options.animation
    );

    model.data = options;
    model.name = super.validateImageID(name);
    model.data.renderer = super.validateRenderer(
      options.renderer || new AVGSpriteRenderer()
    );
    model.data.animation = super.validateSpriteAnimationMacro(
      options.animation
    );

    // // 跳过模式处理，跳过不执行动画
    if (Sandbox.isSkipMode && Sandbox.skipOptions.widgets === true) {
      // model.data.animation.options.duration = 0;
    }

    const proxy = APIManager.Instance.getImpl(
      APIScreenImage.name,
      OP.AnimateImageWidget
    );
    return await proxy.runner(<APIScreenImage>model);
  }

  public static async updateImage(name: string, filename: string) {
    let model = new APIScreenImage();
    model.name = super.validateImageID(name);
    model.filename = ResourceData.from(
      super.validateFilename(filename),
      ResourcePath.Images
    ).filename;

    const proxy = APIManager.Instance.getImpl(
      APIScreenImage.name,
      OP.UpdateImageWidget
    );
    proxy && (await proxy.runner(<APIScreenImage>model));
  }

  public static async removeImage(
    name: string | string[],
    animation?: SpriteAnimationMacro
  ) {
    let ids = [];
    if (Array.isArray(name)) {
      ids = name;
    } else {
      ids = [name];
    }

    for (let i = 0; i < ids.length; ++i) {
      const v = ids[i];

      let model = new APIScreenImage();
      model.isAsync = arguments[arguments.length - 1] === "__async_call__";
      model.name = v;
      model.data.animation = super.validateSpriteAnimationMacro(animation);

      const proxy = APIManager.Instance.getImpl(
        APIScreenImage.name,
        OP.RemoveImageWidget
      );
      await proxy.runner(<APIScreenImage>model);
    }
  }

  public static async html(
    name: string,
    html: string,
    styles: string,
    options?: ScreenWidgetHtml
  ) {
    let model = new APIHtmlWidget();
    model.isAsync = arguments[arguments.length - 1] === "__async_call__";

    if (!options || !(options instanceof Object)) {
      options = new ScreenWidgetHtml();
    }

    model.data = Object.assign({}, model.data, options);
    model.data.html = html;
    model.data.styles = styles;
    model.data.name = EngineUtils.makeWidgetID(name);

    const proxy = APIManager.Instance.getImpl(
      APIHtmlWidget.name,
      OP.ShowHtmlWidget
    );
    proxy && (await proxy.runner(<APIHtmlWidget>model));
  }

  static async removeHTML(name: string, animation: SpriteAnimationMacro) {
    let model = new APIHtmlWidget();
    model.isAsync = arguments[arguments.length - 1] === "__async_call__";
    model.data = new ScreenWidgetHtml();
    model.data.name = EngineUtils.makeWidgetID(name);
    model.data.animation = animation;

    const proxy = APIManager.Instance.getImpl(
      APIHtmlWidget.name,
      OP.RemoveHtmlWidget
    );

    proxy && (await proxy.runner(<APIHtmlWidget>model));
  }

  public static updateHTMLWidgetOption() {}
}
