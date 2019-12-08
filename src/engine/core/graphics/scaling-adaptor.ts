import * as PIXI from "pixi.js";
import { GameWorld } from "./world";

/**
 * Scaling adaptor which is used to auto-adapt the screen size by offscreen rendering
 *
 * @class
 */

export class ScalingAdaptor {
  frameBuffer: PIXI.RenderTexture;
  preStage: PIXI.Container;
  postStage: PIXI.Sprite;

  constructor() {
    this.frameBuffer = PIXI.RenderTexture.create({ width: GameWorld.worldWidth, height: GameWorld.worldHeight });
    this.preStage = GameWorld.app.stage;
    this.postStage = new PIXI.Sprite(this.frameBuffer);
  }

  beginBuffer() {
    GameWorld.app.stage = this.preStage;
  }

  endBuffer() {
    GameWorld.app.renderer.render(GameWorld.app.stage, this.frameBuffer);
    GameWorld.app.stage = this.postStage;
  }

  resize(width: number, height: number, method: ScalingMethod = ScalingMethod.AUTO) {
    let baseWidth = GameWorld.worldWidth;
    let baseHeight = GameWorld.worldHeight;

    if (method === ScalingMethod.AUTO) {
      if (width / height > baseWidth / baseHeight) {
        method = ScalingMethod.ACCORDING_TO_WIDTH;
      } else {
        method = ScalingMethod.ACCORDING_TO_HEIGHT;
      }
    }

    let edgeRatio = 0;
    switch (method) {
      case ScalingMethod.ACCORDING_TO_WIDTH:
        edgeRatio = width / baseWidth;
        break;
      case ScalingMethod.ACCORDING_TO_HEIGHT:
        edgeRatio = height / baseHeight;
        break;
      default:
      // TODO: throw exception
    }

    this.postStage.scale = new PIXI.Point(edgeRatio, edgeRatio);
  }
}

export const enum ScalingMethod {
  AUTO,                                       // 保证显示完全的前提下自动选择
  ACCORDING_TO_WIDTH,                         // 按照宽度确定缩放比例
  ACCORDING_TO_HEIGHT                         // 按照高度确定缩放比例
}