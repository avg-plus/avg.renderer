import { AVGScriptUnit } from "../script-unit";
import { CharacterSprite } from "../../data/character";

export class APICharacter extends AVGScriptUnit {
  public name: string = "";
  public filename: string;
  public data: CharacterSprite = new CharacterSprite();
}
