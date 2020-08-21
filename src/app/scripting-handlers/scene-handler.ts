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
import { Sandbox } from "engine/core/sandbox";

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

    const enterSlot = image.animation || SlotManager.getSlot(HookSlots.SceneEnterAnimation, data);

    // 跳过模式处理，忽略时间
    if (Sandbox.isSkipMode && Sandbox.skipOptions.widgets === true) {
      if (image.animation) {
        image.animation.totalDuration = 0;
      }
    }

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
    const animation = api.data.animation;

    const slot = animation || SlotManager.getSlot(HookSlots.SceneLeaveAnimation, api.data);

    // 跳过模式处理，忽略时间
    if (Sandbox.isSkipMode && Sandbox.skipOptions.widgets === true) {
      if (animation) {
        animation.totalDuration = 0;
      }
    }

    if (api.isAsync) {
      SpriteWidgetManager.animateSpriteWidget(api.name, animation, false).then(() => {
        SpriteWidgetManager.removeSpriteWidget(api.name, slot);
      });
    } else {
      await SpriteWidgetManager.animateSpriteWidget(api.name, animation, true);
      await SpriteWidgetManager.removeSpriteWidget(api.name, slot);
    }

    scriptingContext.resolver();
  }


  public static async handleAnimateScene(scriptingContext: ScriptingContext) {
    const api = <APIScene>scriptingContext.api;
    const animation = api.data.animation;

    // 跳过模式处理，忽略时间
    if (Sandbox.isSkipMode && Sandbox.skipOptions.scenes === true) {
      if (animation) {
        animation.totalDuration = 0;
      }
    }

    await SpriteWidgetManager.animateSpriteWidget(api.name, animation, !api.isAsync);

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

  public static async handleClearSceneFilters(scriptingContext: ScriptingContext) {
    const api = <APIScene>scriptingContext.api;

    await SpriteWidgetManager.clearSpriteFilters(api.name);

    scriptingContext.resolver();
  }
}
