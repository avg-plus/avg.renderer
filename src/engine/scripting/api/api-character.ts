import { AVGScriptUnit } from "../script-unit";
import { Character } from "../../data/character";

export class APICharacter extends AVGScriptUnit {
  public name: string = "";
  public filename: string;
  public data: Character = new Character();
}
