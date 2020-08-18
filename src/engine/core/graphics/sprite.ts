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

export type AnimatedPropertyKeys =
  | "scale"
  | "scaleX"
  | "scaleY"
  | "skew"
  | "skewX"
  | "skewY"
  | "x"
  | "y"
  | "angle";

export class Sprite extends PIXI.Sprite implements IOrderingSpirte {
  private _distance = 0;
  public static MAX_CAMERA_DISTANCE = 5000;
  public static MIN_CAMERA_DISTANCE = -5000;

  public zOrder = 0;
  public arrivalOrder = 0;
  public spriteType = SpriteType.Normal;

  public spriteDebugger: SpriteDebugger;
  public spriteFilters: SpriteFilters;

  constructor(
    type: SpriteType,
    texture: PIXI.Texture,
    width?: number,
    height?: number
  ) {
    super(texture);

    this.initialX = 0;
    this.initialY = 0;

    this.spriteType = this.spriteType;
    this.spriteFilters = new SpriteFilters(this);
  }

  public renderer: AVGSpriteRenderer;

  setProperty(key: AnimatedPropertyKeys, value: number) {
    switch (key) {
      case "x":
        super.position.x = value;
        break;
      case "y":
        super.position.y = value;
        break;
      case "scale":
        super.scale.set(value, value);
        break;
      case "scaleX":
        super.scale.x = value;
        break;
      case "scaleY":
        super.scale.y = value;
        break;
      case "skew":
        super.skew.set(value, value);
        break;
      case "skewX":
        super.scale.x = value;
        break;
      case "skewY":
        super.scale.y = value;
        break;
      case "angle":
        super.angle = value;
        break;
    }
  }

  getProperty(key: AnimatedPropertyKeys) {
    switch (key) {
      case "x":
        return super.position.x;
      case "y":
        return super.position.y;
      case "scale":
        return super.scale;
      case "scaleX":
        return super.scale.x;
      case "scaleY":
        return super.scale.y;
      case "skew":
        return super.skew;
      case "skewX":
        return super.scale.x;
      case "skewY":
        return super.scale.y;
      case "angle":
        return super.angle;
    }
  }

  public get angle() {
    return super.angle;
  }

  public set angle(value: number) {
    super.angle = value;
  }

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

  public get skewX() {
    return super.skew.x;
  }

  public set skewX(value: number) {
    super.skew.x = value;
  }

  public get skewY() {
    return super.skew.y;
  }

  public set skewY(value: number) {
    super.skew.y = value;
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
   *  - 取值 5000 ~ -5000, 数字越小表示距离摄像机越远
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
