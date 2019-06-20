import { DialogueChoice } from "../../data/dialogue-choice";
import { AVGData } from "../../data/avg-data";
import { AVGScriptUnit } from "../script-unit";

export class SelectedDialogueChoice extends AVGData {
  public selectedIndex = -1;
  public selectedText = "";
}

export class APIDialogueChoice extends AVGScriptUnit {
  public choices: Array<DialogueChoice> = new Array<DialogueChoice>();
  public onEnter: (index: number) => void;
  public onLeave: (index: number) => void;
}
