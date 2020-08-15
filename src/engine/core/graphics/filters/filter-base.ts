import { Sprite } from "../sprite";

export class FilterBase {
  public instance(parent?: Sprite, mapFile?: string): PIXI.Filter {
    return null;
  }
}
