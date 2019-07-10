import { ResourceManager } from "./../resource-manager";
import { ScreenImage } from "engine/data/screen-image";
import { GameWorld } from "./world";
import { LayerOrder } from "./layer-order";
import { ResizeMode, Sprite } from "./sprite";
import { SpriteAnimateDirector, AnimateTargetType, AnimationMacro } from "./sprite-animate-director";
import { AVGSpriteRenderer } from "engine/data/renderer";
import { isNullOrUndefined } from "../utils";
import { Texture } from "pixi.js";
import { SpriteType } from "engine/const/sprite-type";

export class SpriteWidgetManager {
  public static async addSpriteWidget(
    image: ScreenImage,
    animationMacro: AnimationMacro,
    layerOrder: LayerOrder = LayerOrder.TopLayer,
    waitForAnimation: boolean = false
  ): Promise<Sprite> {
    const sprite = await GameWorld.defaultScene.loadFromImage(image.name, image.file.filename);

    // Merge properties of initial frame into sprite
    if (animationMacro && animationMacro.initialFrame) {
      Object.assign(sprite, animationMacro.initialFrame);
    }

    let renderer = image.renderer || new AVGSpriteRenderer();

    sprite.spriteType = image.spriteType;
    sprite.resizeMode = ResizeMode.Custom;
    sprite.renderInCamera = image.renderer.renderInCamera;

    sprite.scale.x = renderer.scaleX || renderer.scale || 1;
    sprite.scale.y = renderer.scaleY || renderer.scale || 1;
    sprite.width = renderer.width || sprite.texture.width;
    sprite.height = renderer.height || sprite.texture.height;
    sprite.x = isNullOrUndefined(renderer.x) ? 0 : renderer.x;
    sprite.y = isNullOrUndefined(renderer.y) ? 0 : renderer.y;
    sprite.skew.x = renderer.skewX || renderer.skew || 0;
    sprite.skew.y = renderer.skewY || renderer.skew || 0;
    // sprite.alpha = 1;
    sprite.rotation = renderer.rotation || 0;

    if (sprite.spriteType === SpriteType.Scene) {
      sprite.resizeMode = ResizeMode.Stretch;
    } else if (sprite.spriteType === SpriteType.Character) {
      sprite.anchor.set(0.5, 0.5);
    }

    GameWorld.defaultScene.addSprite(sprite.name, sprite, layerOrder);

    // 设置初始坐标，给摄像机提供坐标参考
    sprite.initialX = renderer.x;
    sprite.initialY = renderer.y;

    sprite.renderer = renderer;

    return new Promise<Sprite>(resolve => {
      if (animationMacro) {
        SpriteAnimateDirector.playAnimationMacro(
          AnimateTargetType.Sprite,
          sprite,
          animationMacro,
          waitForAnimation
        ).then(() => {
          resolve(sprite);
        });
      } else {
        resolve(sprite);
      }
    });
  }

  /**
   * 更新sprite的纹理（不支持gif）
   *
   * @static
   * @param {string} id
   * @param {ScreenImage} newSpriteImage
   * @returns
   * @memberof SpriteWidgetManager
   */
  public static async updateSpriteWidget(id: string, newSpriteImage: ScreenImage) {
    const sprite = GameWorld.defaultScene.getSpriteByName(id);
    if (!sprite) {
      return;
    }

    ResourceManager.addLoading(id, newSpriteImage.file.filename, resource => {
      sprite.texture = Texture.from(resource.data);
    });
  }

  public static async getSprite(name: string) {
    return GameWorld.defaultScene.getSpriteByName(name);
  }

  public static async removeSpriteWidget(
    id: string,
    animationMacro: AnimationMacro,
    waitForAnimation: boolean = false
  ) {
    const sprite = GameWorld.defaultScene.getSpriteByName(id);
    if (!sprite) {
      return;
    }

    return new Promise<Sprite>(resolve => {
      if (animationMacro) {
        SpriteAnimateDirector.playAnimationMacro(AnimateTargetType.Sprite, sprite, animationMacro, true).then(() => {
          GameWorld.defaultScene.removeSprite(id);
          resolve();
        });
      } else {
        GameWorld.defaultScene.removeSprite(id);
        resolve();
      }
    });
  }
}
