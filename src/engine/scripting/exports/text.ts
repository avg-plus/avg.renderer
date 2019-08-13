import { Sandbox } from "../../core/sandbox";
import { Dialogue } from "../../data/dialogue";
import { APIDialogue } from "../api/api-dialogue";
import { APIManager } from "../api-manager";
import { OP } from "../../const/op";
import { mergeDeep, paramCompatible } from "../../core/utils";
import { AVGExportedAPI, APIExport } from "./avg-exported-api";
import { Setting } from "engine/core/setting";

@APIExport("text", EngineAPI_Text)
export class EngineAPI_Text extends AVGExportedAPI {
  /**
   * Show dialogue box
   *
   * @export
   * @param {string} text
   * @param {Dialogue} [options]
   */
  public static async show(text: string | Array<string>, options?: Dialogue) {
    if (Sandbox.isSkipMode) {
      return;
    }

    let model = new APIDialogue();

    // if (EngineUtils.isUndefined(options.character.avatar.renderer)) {
    //   options.character.avatar.renderer = new Renderer();
    // }

    options = mergeDeep(new Dialogue(), options);

    let voices = [];
    if (options && options.voice) {
      if (Array.isArray(options.voice)) {
        voices = options.voice.slice(0);
      } else {
        voices = [options.voice];
      }
    }

    const _show = async (content: string, showOptions: Dialogue) => {
      console.log("first model options", model);

      // paramCompatible<APIDialogue, Dialogue>(model, showOptions, {
      //   field: "text",
      //   value: content
      // });

      // model.data.text = content;
      model.data = mergeDeep(model.data, showOptions);
      // Object.assign(model.data, showOptions);

      // if (model.data.character && model.data.character.avatar && model.data.character.avatar.file) {
      //   if (originAvatarFile === "") {
      //     originAvatarFile = model.data.character.avatar.file;
      //   }

      //   const fullpath = ResourceData.from(originAvatarFile, ResourcePath.Characters).filename;

      //   model.data.character.avatar.file = fullpath;
      // }

      console.log("model options", model);

      const proxy = APIManager.Instance.getImpl(APIDialogue.name, OP.ShowText);
      proxy && (await proxy.runner(<APIDialogue>model));
    };
    // options = mergeDeep(new Dialogue(), options);

    if (Array.isArray(text)) {
      for (let i = 0; i < text.length; ++i) {
        let content = text[i];

        options.text = content;
        options.voice = voices[i] || "";

        await _show(content, options);
      }
    } else {
      options.text = text;
      options.voice = voices[0];

      await _show(<string>text, options);
    }
  }

  public static async hide() {
    let model = new APIDialogue();
    paramCompatible<APIDialogue, Dialogue>(model, {});

    const proxy = APIManager.Instance.getImpl(APIDialogue.name, OP.HideText);
    proxy && (await proxy.runner(<APIDialogue>model));
  }

  public static async auto(auto: boolean) {
    Setting.AutoPlay = true;
  }

  public static async textSpeed(value: number) {
    Setting.TextSpeed = value;
  }
}
