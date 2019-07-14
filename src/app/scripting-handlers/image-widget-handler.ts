import { ResourcePath } from "engine/core/resource";
import { LayerOrder } from "engine/core/graphics/layer-order";
import { APIScreenImage } from "engine/scripting/api/api-screen-image";
import { ScriptingContext } from "engine/scripting/scripting-context";
import { SpriteWidgetManager } from "engine/core/graphics/sprite-widget-manager";
import { ResourceData } from "engine/data/resource-data";
import { SpriteType } from "engine/const/sprite-type";

export class ImageWidgetScriptingHandler {
  public static async handleShowImageWidget(scriptingContext: ScriptingContext) {
    const api = <APIScreenImage>scriptingContext.api;
    const image = api.data;
    image.name = api.name;
    image.spriteType = SpriteType.ImageWidget;
    image.file = ResourceData.from(api.filename);

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

    await SpriteWidgetManager.removeSpriteWidget(api.name, null);

    scriptingContext.resolver();
  }
}
