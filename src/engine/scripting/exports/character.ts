import * as joi from "joi";
import { AnimationMacro } from "./../../core/graphics/sprite-animate-director";
import { Character } from "engine/data/character";
import { ResourceData } from "engine/data/resource-data";
import { ResourcePath } from "engine/core/resource";
import { OP } from "engine/const/op";
import { APICharacter } from "../api/api-character";
import { APIManager } from "../api-manager";
import { APIExport, AVGExportedAPI } from "./avg-exported-api";
import { SpriteWidgetManager } from "engine/core/graphics/sprite-widget-manager";

@APIExport("character", EngineAPI_Character)
export class EngineAPI_Character extends AVGExportedAPI {
  public static async show(name: string, filename: string, options?: Character) {
    let model = new APICharacter();
    model.isAsync = arguments[arguments.length - 1] === "__async_call__";

    if (!options || !(options instanceof Object)) {
      options = new Character();
    }

    model.data = options;
    model.name = super.validateImageID(name);
    model.filename = ResourceData.from(super.validateFilename(filename), ResourcePath.Characters).filename;
    model.data.animation = super.validateSpriteAnimationMacro(options.animation);
    model.data.renderer = super.validateRenderer(options.renderer);

    const proxy = APIManager.Instance.getImpl(APICharacter.name, OP.ShowCharacter);
    return await proxy.runner(<APICharacter>model);
  }

  public static async update(name: string, filename: string) {
    let model = new APICharacter();
    model.name = super.validateImageID(name);
    model.filename = ResourceData.from(super.validateFilename(filename), ResourcePath.Characters).filename;

    const proxy = APIManager.Instance.getImpl(APICharacter.name, OP.UpdateCharacter);
    proxy && (await proxy.runner(<APICharacter>model));
  }

  public static async animate(name: string, animation: AnimationMacro) {
    const model = new APICharacter();
    model.isAsync = arguments[arguments.length - 1] === "__async_call__";

    model.name = super.validateImageID(name);
    model.data.animation = super.validateSpriteAnimationMacro(animation);

    const proxy = APIManager.Instance.getImpl(APICharacter.name, OP.AnimateCharacter);
    proxy && (await proxy.runner(<APICharacter>model));
  }

  public static async getRenderer(name: string) {
    return SpriteWidgetManager.getSprite(name);
  }

  public static async hide(name: string | string[], animation?: AnimationMacro) {
    let ids = [];
    if (Array.isArray(name)) {
      ids = name;
    } else {
      ids = [name];
    }

    ids.map(async v => {
      let model = new APICharacter();
      model.isAsync = arguments[arguments.length - 1] === "__async_call__";
      model.name = super.validateImageID(v);
      model.data.animation = super.validateSpriteAnimationMacro(animation);

      const proxy = APIManager.Instance.getImpl(APICharacter.name, OP.HideCharacter);
      await proxy.runner(<APICharacter>model);
    });
  }

  public static async setFilter(name: string, filterType: string, data: any) {
    SpriteWidgetManager.setSpriteFilters(name, filterType, data);
  }
}
