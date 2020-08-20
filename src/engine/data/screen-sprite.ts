import { SpriteAnimationMacro } from "engine/core/graphics/sprite-animate-director";
import { AVGSpriteRenderer } from "./sprite-renderer";

export class ScreenSprite {
  public animation?: SpriteAnimationMacro;
  public renderer?: AVGSpriteRenderer = new AVGSpriteRenderer();
}
