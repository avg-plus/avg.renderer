import { ResourcePath } from "engine/core/resource";
import { LayerOrder } from "engine/core/graphics/layer-order";
import { APIScreenImage } from "engine/scripting/api/api-screen-image";
import { ScriptingContext } from "engine/scripting/scripting-context";
import { SpriteWidgetManager } from "engine/core/graphics/sprite-widget-manager";
import { ResourceData } from "engine/data/resource-data";
import { SpriteType } from "engine/const/sprite-type";
import { AVGSpriteRenderer } from "engine/data/sprite-renderer";
import { Sandbox } from "engine/core/sandbox";

export class ImageWidgetScriptingHandler {
  public static async handleShowImageWidget(scriptingContext: ScriptingContext) {
    const api = <APIScreenImage>scriptingContext.api;
    const image = api.data;
    image.name = api.name;
    image.spriteType = SpriteType.ImageWidget;
    image.file = ResourceData.from(api.filename);

    // 跳过模式处理，忽略时间
    if (Sandbox.isSkipMode && Sandbox.skipOptions.widgets === true) {
      if (image.animation) {
        image.animation.totalDuration = 0;
      }
    }

    await SpriteWidgetManager.addSpriteWidget(image, image.animation, LayerOrder.TopLayer, !api.isAsync);

    scriptingContext.resolver();
  }

  public static async handleUpdateImageWidget(scriptingContext: ScriptingContext) {
    const api = <APIScreenImage>scriptingContext.api;
    const image = api.data;
    image.name = api.name;
    image.spriteType = SpriteType.ImageWidget;
    image.file = ResourceData.from(api.filename);

    await SpriteWidgetManager.updateSpriteWidget(api.name, image);

    scriptingContext.resolver();
  }

  public static async handleRemoveImageWidget(scriptingContext: ScriptingContext) {
    const api = <APIScreenImage>scriptingContext.api;

    // 跳过模式处理，忽略时间
    if (Sandbox.isSkipMode && Sandbox.skipOptions.widgets === true) {
      api.data.animation.totalDuration = 0;
    }

    await SpriteWidgetManager.removeSpriteWidget(api.name, api.data.animation);

    scriptingContext.resolver();
  }

  public static async handleAnimateImageWidget(scriptingContext: ScriptingContext) {
    const api = <APIScreenImage>scriptingContext.api;

    // 跳过模式处理，忽略时间
    if (Sandbox.isSkipMode && Sandbox.skipOptions.widgets === true) {
      api.data.animation.totalDuration = 0;
    }

    await SpriteWidgetManager.animateSpriteWidget(api.name, api.data.animation, !api.isAsync);

    scriptingContext.resolver();
  }
}
