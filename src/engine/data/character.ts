import { Avatar } from "./avatar";
import { AVGSpriteRenderer } from "./sprite-renderer";
import { SpriteAnimationMacro } from "engine/core/graphics/sprite-animate-director";

export class Character {
  public animation?: SpriteAnimationMacro;
  public renderer?: AVGSpriteRenderer = new AVGSpriteRenderer();
}
