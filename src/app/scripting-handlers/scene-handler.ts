import { ScriptingContext } from "engine/scripting/scripting-context";
import { APIScene } from "engine/scripting/api/api-scene";
import { ResourceData } from "engine/data/resource-data";
import { SpriteType } from "engine/const/sprite-type";
import { SlotManager } from "engine/plugin/hooks/slot-manager";
import { HookSlots } from "engine/plugin/hooks/hook-slots";
import { SpriteWidgetManager } from "engine/core/graphics/sprite-widget-manager";
import { LayerOrder } from "engine/core/graphics/layer-order";
import { ScreenImage } from "engine/data/screen-image";
import { Sprite } from "engine/core/graphics/sprite";

export class SceneHandler {
  private static currentBackgroundSprite: Sprite;

  public static async handleLoadScene(scriptingContext: ScriptingContext): Promise<any> {
    const api = <APIScene>scriptingContext.api;
    const data = api.data;

    const image = new ScreenImage();
    image.renderer = data.renderer;
    image.animation = data.animation;
    image.file = ResourceData.from(api.filename);
    image.spriteType = SpriteType.Scene;
    image.name = api.name;

    const enterSlot = image.animation || SlotManager.getSlot(HookSlots.SceneEnterAnimation);
    // const leaveSlot = image.animation || SlotManager.getSlot(HookSlots.SceneLeaveAnimation);

    const sprite = await SpriteWidgetManager.getSprite(api.name);
    if (sprite) {
      await SpriteWidgetManager.updateSpriteWidget(image.name, image);
    } else {
      await SpriteWidgetManager.addSpriteWidget(image, enterSlot, LayerOrder.TopLayer, !api.isAsync);
    }

    scriptingContext.resolver();
  }

  public static async handleRemoveScene(scriptingContext: ScriptingContext) {
    const api = <APIScene>scriptingContext.api;

    const slot = SlotManager.getSlot(HookSlots.SceneLeaveAnimation);

    if (api.isAsync) {
      SpriteWidgetManager.animateSpriteWidget(api.name, api.data.animation, false).then(() => {
        SpriteWidgetManager.removeSpriteWidget(api.name, slot);
      });
    } else {
      await SpriteWidgetManager.animateSpriteWidget(api.name, api.data.animation, true);
      await SpriteWidgetManager.removeSpriteWidget(api.name, slot);
    }

    scriptingContext.resolver();
  }

  public static async handleSetSceneFilter(scriptingContext: ScriptingContext) {
    const api = <APIScene>scriptingContext.api;

    for (let i = 0; i < api.data.renderer.filters.length; ++i) {
      const filter = api.data.renderer.filters[i];

      await SpriteWidgetManager.setSpriteFilters(api.name, filter.name, filter.data);
    }

    scriptingContext.resolver();
  }

  public static async handleAnimateScene(scriptingContext: ScriptingContext) {
    const api = <APIScene>scriptingContext.api;

    await SpriteWidgetManager.animateSpriteWidget(api.name, api.data.animation, !api.isAsync);

    scriptingContext.resolver();
  }

  public static async handleClearFilters(scriptingContext: ScriptingContext) {
    const api = <APIScene>scriptingContext.api;

    await SpriteWidgetManager.clearSpriteFilters(api.name);

    scriptingContext.resolver();
  }
}
