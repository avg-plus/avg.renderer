import { TransformConverter } from "engine/core/transform-converter";
import { AnimateTargetType } from "engine/core/graphics/sprite-animate-director";

export class SpriteFilter {
  public name: string;
  public data: any;
}

export class AVGSpriteRenderer {
  public x: number = 0;
  public y: number = 0;
  public width: number = 0;
  public height: number = 0;
  public size: string = "(100%,100%)";
  private _position: { left: string; right: string } = {
    left: "0",
    right: "0"
  };

  public set position(value: string) {
    this._position = TransformConverter.toActualPosition(
      value || `(${this.x || 0}, ${this.y || 0})`,
      AnimateTargetType.Sprite
    );

    // 修正 X, Y
    this.x = +this._position.left;
    this.y = +this._position.right;
  }

  public get position() {
    return `(${this._position.left}, ${this._position.right})`;
  }

  private _scale: number;
  public get scale() {
    return this._scale;
  }

  public set scale(value: number) {
    this.scaleX = value;
    this.scaleY = value;

    this._scale = value;
  }

  public scaleX: number;
  public scaleY: number;
  public skew: number = 0;
  public skewX: number = 0;
  public skewY: number = 0;
  public alpha: number = 1;
  public rotation: number = 0;
  public renderInCamera: boolean = false;
  public renderCameraDepth: boolean = false;
  public cameraDistance: number = 0;
  public stretch: boolean = false;

  public filters: SpriteFilter[] = [];
}
