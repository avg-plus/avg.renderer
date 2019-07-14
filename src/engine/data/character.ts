import { Avatar } from "./avatar";
import { AVGSpriteRenderer } from "./sprite-renderer";
import { AnimationMacro } from "engine/core/graphics/sprite-animate-director";

export class Character {
  public animation?: AnimationMacro;
  public renderer?: AVGSpriteRenderer = new AVGSpriteRenderer();
}
