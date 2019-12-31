import { SkipOptions } from "../data/skip-options";
import { AVGEngineError } from "./engine-errors";
import { Runtime } from "../data/runtime";
import { AVGStory } from "../scripting/story";
import { SelectedDialogueChoice } from "engine/scripting/api/api-dialogue-choices";

export class Sandbox {
  public static console = console;

  public $data = (global["$data"] = {});
  // public $global = (global["$global"] = {});
  public AVGEngineError = (global["AVGEngineError"] = AVGEngineError);
  public game = global["game"];

  public done: () => void;

  public static inject(name: string, t: any) {
    Sandbox[name] = global[name] = t;
    console.log(`Inject ${name} ...`);
  }

  /*
    - API Exports
  */
  public static isSkipMode: boolean = false; // Will skip all dialogues
  public static skipOptions: SkipOptions = {};

  public static runtime: Runtime = new Runtime();

  public static recordChoice(selected: SelectedDialogueChoice) {
    this.runtime.choices.push(selected);
  }
}

// const registeredClasses = AVGExportedAPI.registeredClasses();

// for (let i = 0; i < registeredClasses.size; ++i) {
//   const className = registeredClasses.;
// }
