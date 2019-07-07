import { ScreenImage } from "engine/data/screen-image";
import { GameWorld } from "./world";
import { LayerOrder } from "./layer-order";
import { ResizeMode, Sprite } from "./sprite";
import { SpriteAnimateDirector, AnimateTargetType, AnimationMacro } from "./sprite-animate-director";
import { Renderer } from "engine/data/renderer";
import { isNullOrUndefined } from "../utils";

export class SpriteWidgetManager {
  public static async addSpriteWidget(
    image: ScreenImage,
    animationMacro: AnimationMacro,
    layerOrder: LayerOrder = LayerOrder.TopLayer
  ): Promise<Sprite> {
    const sprite = await GameWorld.defaultScene.loadFromImage(image.name, image.file.filename);

    // Merge properties of initial frame into sprite
    if (animationMacro && animationMacro.initialFrame) {
      Object.assign(sprite, animationMacro.initialFrame);
    }

    let renderer = image.renderer || new Renderer();

    sprite.spriteType = image.spriteType;
    sprite.resizeMode = ResizeMode.Custom;
    sprite.renderInCamera = image.renderer.renderInCamera;

    sprite.width = renderer.width || sprite.texture.width;
    sprite.height = renderer.height || sprite.texture.height;
    sprite.x = isNullOrUndefined(renderer.x) ? 0 : renderer.x;
    sprite.y = isNullOrUndefined(renderer.y) ? 0 : renderer.y;
    sprite.scale.x = renderer.scaleX || renderer.scale || 1;
    sprite.scale.y = renderer.scaleY || renderer.scale || 1;
    sprite.skew.x = renderer.skewX || renderer.skew || 0;
    sprite.skew.y = renderer.skewY || renderer.skew || 0;
    sprite.alpha = 1;
    sprite.rotation = renderer.rotation || 0;

    GameWorld.defaultScene.addSprite(sprite.name, sprite, layerOrder);

    // 设置初始坐标，给摄像机提供坐标参考
    sprite.initialX = renderer.x;
    sprite.initialY = renderer.y;

    return new Promise<Sprite>(resolve => {
      if (animationMacro) {
        SpriteAnimateDirector.playAnimationMacro(AnimateTargetType.Sprite, sprite, animationMacro).then(() => {
          resolve(sprite);
        });
      } else {
        resolve(sprite);
      }
    });
  }

  public static async removeSpriteWidget(id: string) {
    GameWorld.defaultScene.removeSprite(id);
  }
}
