import { SpriteType } from "engine/const/sprite-type";
import { ScreenImage } from "engine/data/screen-image";
import { GameWorld } from "./world";
import { LayerOrder } from "./layer-order";
import { ResizeMode } from "./sprite";

export class SpriteWidgetManager {
  public static async addSpriteWidget(image: ScreenImage) {
    const sprite = await GameWorld.defaultScene.addFromImage(image.name, image.file.filename, LayerOrder.TopLayer);

    let renderer = image.renderer;

    sprite.spriteType = image.spriteType;
    sprite.width = renderer.width || sprite.texture.width;
    sprite.height = renderer.height || sprite.texture.height;
    sprite.x = renderer.x;
    sprite.y = renderer.y;
    sprite.scale.x = renderer.scaleX || renderer.scale || 1;
    sprite.scale.y = renderer.scaleY || renderer.scale || 1;
    sprite.skew.x = renderer.skewX || renderer.skew || 0;
    sprite.skew.y = renderer.skewY || renderer.skew || 0;
    sprite.alpha = renderer.alpha || renderer.alpha || 1;
    sprite.rotation = renderer.rotation || 0;

    // 锁死立绘比例
    if (sprite.spriteType === SpriteType.Character) {
      sprite.resizeMode = ResizeMode.KeepRadio;
    } else {
      sprite.resizeMode = ResizeMode.Custom;
    }
  }

  public static async removeSpriteWidget(id: string) {
    GameWorld.defaultScene.removeSprite(id);
  }
}
