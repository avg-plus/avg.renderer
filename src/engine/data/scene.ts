import { ResourceData } from "./resource-data";
import { WidgetAnimation } from "./screen-widget";
import { ImageTransform } from "../const/model";
import { AVGSpriteRenderer } from "./sprite-renderer";
import { AnimationMacro } from "../core/graphics/sprite-animate-director";

export class Scene {
  public animation?: AnimationMacro;
  public renderer?: AVGSpriteRenderer = new AVGSpriteRenderer();
}
