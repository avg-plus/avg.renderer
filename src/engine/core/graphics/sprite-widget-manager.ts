import { UnitType } from "engine/core/measurement-unit";
import { ResourceManager } from "./../resource-manager";
import { ScreenImage } from "engine/data/screen-image";
import { GameWorld } from "./world";
import { LayerOrder } from "./layer-order";
import { ResizeMode, Sprite } from "./sprite";
import {
  SpriteAnimateDirector,
  AnimateTargetType,
  SpriteAnimationMacro
} from "./sprite-animate-director";
import { AVGSpriteRenderer } from "engine/data/sprite-renderer";
import { isNullOrUndefined } from "../utils";
import { Texture } from "pixi.js";
import { SpriteType } from "engine/const/sprite-type";
import { TransformConverter } from "engine/core/transform-converter";

export class SpriteWidgetManager {
  public static async addSpriteWidget(
    image: ScreenImage,
    animationMacro: SpriteAnimationMacro,
    layerOrder: number | LayerOrder = LayerOrder.TopLayer,
    waitForAnimation: boolean = false
  ): Promise<Sprite> {
    const sprite = await GameWorld.defaultScene.loadFromImage(
      image.name,
      image.file.filename
    );

    const renderer = image.renderer || new AVGSpriteRenderer();
    const position = TransformConverter.toActualPosition(
      renderer.position || `(${renderer.x || 0}, ${renderer.y || 0})`,
      AnimateTargetType.Sprite
    );
    const size = TransformConverter.toActualSzie(
      renderer.size || "(100%, 100%)",
      AnimateTargetType.Sprite,
      sprite.texture.width,
      sprite.texture.height
    );

    sprite.spriteType = image.spriteType;
    sprite.resizeMode = ResizeMode.Custom;
    sprite.renderInCamera = renderer.renderInCamera;

    sprite.scale.x = renderer.scale || renderer.scaleX || 1;
    sprite.scale.y = renderer.scale || renderer.scaleY || 1;
    sprite.width =
      renderer.width || Number.parseInt(size.left) || sprite.texture.width;
    sprite.height =
      renderer.height || Number.parseInt(size.right) || sprite.texture.height;

    sprite.x = Number.parseInt(position.left) || renderer.x || 0;
    sprite.y = Number.parseInt(position.right) || renderer.y || 0;
    sprite.skew.x = renderer.skew || renderer.skewX || 0;
    sprite.skew.y = renderer.skew || renderer.skewY || 0;
    sprite.angle = renderer.angle || 0; // 使用角度作为旋转单位
    sprite.distance = renderer.cameraDistance || 0;
    sprite.renderCameraDepth = renderer.renderCameraDepth || false;
    sprite.alpha = renderer.alpha;

    // 初始关键帧赋值
    if (animationMacro && animationMacro.initialFrame) {
      Object.assign(sprite, animationMacro.initialFrame);
    }

    if (sprite.spriteType === SpriteType.Scene) {
      sprite.anchor.set(0.5, 0.5);

      if (!renderer.position) {
        sprite.center = true;
        GameWorld.defaultScene.centerSprite(sprite);
      }
    } else if (sprite.spriteType === SpriteType.Character) {
      sprite.anchor.set(0.5, 0.5);
    } else if (sprite.spriteType === SpriteType.ImageWidget) {
      sprite.anchor.set(0.5, 0.5);
    }

    if (renderer.stretch) {
      sprite.width = GameWorld.worldWidth;
      sprite.height = GameWorld.worldHeight;
    }

    GameWorld.defaultScene.addSprite(image.name, sprite, layerOrder);

    // 渲染滤镜
    if (renderer.filters) {
      renderer.filters.map(filter => {
        sprite.spriteFilters.setFilter(filter.name, filter.data);
      });

      sprite.spriteFilters.render();
    }

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
   * @param {string} name
   * @param {ScreenImage} newSpriteImage
   * @returns
   * @memberof SpriteWidgetManager
   */
  public static async updateSpriteWidget(
    name: string,
    newSpriteImage: ScreenImage
  ) {
    const sprite = GameWorld.defaultScene.getSpriteByName(name);
    if (!sprite) {
      return;
    }

    ResourceManager.addLoading(newSpriteImage.file.filename, resource => {
      sprite.texture = Texture.from(resource.data);
    });
  }

  public static async getSprite(name: string) {
    return GameWorld.defaultScene.getSpriteByName(name);
  }

  public static async setSpriteFilters(
    name: string,
    filterType: string,
    data: any
  ) {
    const sprite = GameWorld.defaultScene.getSpriteByName(name);
    if (!sprite) {
      return;
    }

    sprite.spriteFilters.setFilter(filterType, data);

    // 渲染滤镜
    sprite.spriteFilters.render();
  }

  public static async clearSpriteFilters(name: string) {
    const sprite = GameWorld.defaultScene.getSpriteByName(name);
    if (!sprite) {
      return;
    }

    sprite.spriteFilters.clearFilters();

    // 渲染滤镜
    sprite.spriteFilters.render();
  }

  public static async animateSpriteWidget(
    name: string,
    animationMacro: SpriteAnimationMacro,
    waitForAnimation: boolean = false
  ) {
    const sprite = GameWorld.defaultScene.getSpriteByName(name);
    if (!sprite) {
      return;
    }

    return new Promise<Sprite>(resolve => {
      if (animationMacro) {
        SpriteAnimateDirector.playAnimationMacro(
          AnimateTargetType.Sprite,
          sprite,
          animationMacro,
          waitForAnimation
        ).then(() => {
          resolve();
        });
      } else {
        resolve();
      }
    });
  }

  public static async removeSpriteWidget(
    name: string,
    animationMacro: SpriteAnimationMacro,
    waitForAnimation: boolean = false
  ) {
    await this.animateSpriteWidget(name, animationMacro, waitForAnimation);

    this.clearSpriteFilters(name);
    await GameWorld.defaultScene.removeSprite(name);

    console.log("Removed Sprite Widget: ", name, waitForAnimation);
  }
}
