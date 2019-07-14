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
    image.file = ResourceData.from(api.filename);
    image.spriteType = SpriteType.Scene;
    image.name = api.name;

    const enterSlot = SlotManager.getSlot(HookSlots.SceneEnterAnimation);
    const leaveSlot = SlotManager.getSlot(HookSlots.SceneLeaveAnimation);

    if (this.currentBackgroundSprite) {
      // 把要设置的图片先放到底层
      const incommingSprite = await SpriteWidgetManager.addSpriteWidget(image, enterSlot, LayerOrder.TopLayer, false);
      await SpriteWidgetManager.removeSpriteWidget(this.currentBackgroundSprite.name, leaveSlot);

      this.currentBackgroundSprite = incommingSprite;
    } else {
      if (api.isAsync) {
        SpriteWidgetManager.addSpriteWidget(image, enterSlot, LayerOrder.TopLayer, false).then(sprite => {
          this.currentBackgroundSprite = sprite;
        });
      } else {
        this.currentBackgroundSprite = await SpriteWidgetManager.addSpriteWidget(
          image,
          enterSlot,
          LayerOrder.TopLayer,
          true
        );
      }
    }

    scriptingContext.resolver();
  }

  public static async handleRemoveScene(scriptingContext: ScriptingContext) {
    const api = <APIScene>scriptingContext.api;

    const slot = SlotManager.getSlot(HookSlots.SceneLeaveAnimation);
    await SpriteWidgetManager.removeSpriteWidget(api.name, slot);

    scriptingContext.resolver();
  }
}
