import { APIExport, AVGExportedAPI } from "./avg-exported-api";
import { APIDialogueChoice, SelectedDialogueChoice } from "../api/api-dialogue-choices";
import { DialogueChoice } from "../../data/dialogue-choice";
import { isNull, paramCompatible } from "../../core/utils";
import { AVGGame } from "../../core/game";
import { APIManager } from "../api-manager";
import { OP } from "../../const/op";
import { Sandbox } from "../../core/sandbox";
import { AVGArchives } from "../../core/game-archives";
import { InputData, InputBoxResult } from "../../data/input-data";
import { APIInputBox } from "../api/api-input-box";

@APIExport("dialog", EngineAPI_Dialog)
export class EngineAPI_Dialog extends AVGExportedAPI {
  public static async choices(
    choices: Array<string>,
    onEnter: (index: number) => void,
    onLeave: (index: number) => void
  ) {
    let model = new APIDialogueChoice();
    choices.forEach(s => {
      model.choices.push(new DialogueChoice(s));
    });

    model.onEnter = onEnter;
    model.onLeave = onLeave;

    let result: SelectedDialogueChoice;
    const proxy = APIManager.Instance.getImpl(APIDialogueChoice.name, OP.ShowChioce);
    if (isNull(proxy) && AVGGame.isLoading()) {
      result = Sandbox.runtime.choices[AVGArchives.loadChoiceCount++];
    } else {
      result = <SelectedDialogueChoice>await proxy.runner(<APIDialogueChoice>model);
      Sandbox.recordChoice(result);
    }

    return result;
  }

  public static async input(title: string, options: InputData): Promise<InputBoxResult> {
    let model = new APIInputBox();

    paramCompatible<APIInputBox, InputData>(model, options, {
      field: "title",
      value: title
    });

    return <InputBoxResult>await APIManager.Instance.getImpl(APIInputBox.name, OP.ShowInputBox).runner(<APIInputBox>model);
  }
}
