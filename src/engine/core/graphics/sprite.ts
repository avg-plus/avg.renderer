import * as PIXI from "pixi.js";
import { SpriteDebugger } from "./sprite-debugger";
import { SpriteType } from "engine/const/sprite-type";
import { AVGSpriteRenderer } from "engine/data/sprite-renderer";
import { SpriteFilters } from "./sprite-filters";

interface IOrderingSpirte {
  zOrder: number;
  arrivalOrder: number;
}

export enum ResizeMode {
  Default, // 默认大小（原图）
  Stretch, // 强制拉伸到填满画布大小
  KeepRadio, // 拉伸到适合画布大小但保持长宽比
  Custom // 自定义大小
}

export class Sprite extends PIXI.Sprite implements IOrderingSpirte {
  private _distance = 0;
  public static MAX_CAMERA_DISTANCE = 5000;
  public static MIN_CAMERA_DISTANCE = -5000;

  public zOrder = 0;
  public arrivalOrder = 0;
  public spriteType = SpriteType.Normal;

  public spriteDebugger: SpriteDebugger;

  public spriteFilters: SpriteFilters;

  constructor(type: SpriteType, texture: PIXI.Texture, width?: number, height?: number) {
    super(texture);

    this.initialX = 0;
    this.initialY = 0;

    this.spriteType = this.spriteType;
    this.spriteFilters = new SpriteFilters(this);
  }

  public renderer: AVGSpriteRenderer;

  public get scaleX() {
    return super.scale.x;
  }

  public set scaleX(value: number) {
    super.scale.x = value;
  }

  public get scaleY() {
    return super.scale.y;
  }

  public set scaleY(value: number) {
    super.scale.y = value;
  }

  // 缩放模式
  public resizeMode: ResizeMode = ResizeMode.Default;

  // 居中显示
  public center = false;

  // 是否渲染到摄像机中
  public renderInCamera = true;

  /**
   * 是否渲染摄像机深度
   *  - 为 true 时将会受摄像机缩放影响
   * @memberof Sprite
   */
  public renderCameraDepth = true;

  // 平铺瓦片模式
  public isTilingMode = false;

  /**
   * 初始坐标，作为摄像机的移动偏移参考量，只读
   *
   * @memberof Sprite
   */

  public initialX = 0;
  public initialY = 0;

  /**
   * 设置摄像机距离
   *  - 取值 5000 ~ -5000, 数字越大表示距离摄像机越远
   *  - 摄像机位移时的增量和距离有关，距离越远增量越小，反之亦然
   *  - 如距离为负数，则摄像机拉近时会对物体做模糊以及半透明处理
   * @memberof Sprite
   */
  public set distance(value: number) {
    if (value > Sprite.MAX_CAMERA_DISTANCE) {
      value = Sprite.MAX_CAMERA_DISTANCE;
    }

    if (value < Sprite.MIN_CAMERA_DISTANCE) {
      value = Sprite.MIN_CAMERA_DISTANCE;
    }

    this._distance = value;
  }

  /**
   * 获取摄像机距离
   *
   * @type {number}
   * @memberof Sprite
   */
  public get distance(): number {
    return this._distance;
  }
}
