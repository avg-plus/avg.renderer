import { AVGScriptUnit } from "../script-unit";
import { SceneSprite } from "engine/data/scene";

export class SceneHandle {
  public index: number = 0;
}

export class APIScene extends AVGScriptUnit {
  public name: string = "";
  public filename: string;
  public data: SceneSprite = new SceneSprite();
}
