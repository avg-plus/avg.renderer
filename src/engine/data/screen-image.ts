import { SpriteType } from "../const/sprite-type";
import { ScreenWidget, ScreenWidgetType } from "./screen-widget";
import { AVGMeasurementUnit } from "../core/measurement-unit";
import { ResourceData } from "./resource-data";
import { AVGSpriteRenderer } from "./renderer";

export class ScreenImage extends ScreenWidget {
  public file: ResourceData;

  private _size?: string; // (640, 480), (50%, 30%), 50%

  public widthUnit?: string;
  public heightUnit?: string;

  public spriteType: SpriteType;
  public renderer?: AVGSpriteRenderer = new AVGSpriteRenderer();

  // public mergeToRenderer?(renderer: Renderer) {
  //   renderer.x = renderer.x || this.x;
  //   renderer.y = renderer.y || this.y;
  //   renderer.width = renderer.width || this.width;
  //   renderer.height = renderer.height || this.height;
  //   renderer.scale = renderer.scale || this.scale || 1;

  //   return renderer;
  // }

  public set size(value: string) {
    const units = AVGMeasurementUnit.fromString(value);

    if (units) {
      if (units.getLeft()) {
        this.widthUnit = units.getLeft().getValue();
      }

      if (units.getRight()) {
        this.heightUnit = units.getRight().getValue();
      }

      this._size = units.getValue();
    }
  }

  public get size(): string {
    return this._size;
  }

  constructor() {
    super(ScreenWidgetType.Image);

    this.size = "(100%,100%)";
  }
}
