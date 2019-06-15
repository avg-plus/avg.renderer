import * as PIXI from "pixi.js";
import { SpriteDebugger } from "./sprite-debugger";

interface IOrderingSpirte {
  zOrder: number;
  arrivalOrder: number;
}

export enum SpriteType {
  Normal,
  Scene,
  Character
}

export enum ResizeMode {
  Default, // 默认大小（原图）
  Stretch, // 强制拉伸到填满画布大小
  KeepRadio, // 拉伸到适合画布大小但保持长宽比
  Custom // 自定义大小
}

export class Sprite extends PIXI.TilingSprite implements IOrderingSpirte {
  private _distance = 0;
  public static MAX_CAMERA_DISTANCE = 5000;
  public static MIN_CAMERA_DISTANCE = -5000;

  public zOrder = 0;
  public arrivalOrder = 0;
  public spriteType = SpriteType.Normal;

  public spriteDebugger: SpriteDebugger;

  constructor(type: SpriteType, texture: PIXI.Texture, width?: number, height?: number) {
    super(texture);

    this.spriteType = this.spriteType;

    this.spriteDebugger = new SpriteDebugger(this);
  }

  // 缩放模式
  public resizeMode: ResizeMode = ResizeMode.Stretch;

  // 居中显示
  public center = false;

  // 是否渲染到摄像机中
  public renderInCamera = true;

  // 平铺瓦片模式
  public isTilingMode = false;

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
