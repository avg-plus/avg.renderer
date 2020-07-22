import * as joi from "joi";
import { SpriteAnimationMacro } from "./../../core/graphics/sprite-animate-director";
import { Character } from "engine/data/character";
import { ResourceData } from "engine/data/resource-data";
import { ResourcePath } from "engine/core/resource";
import { OP } from "engine/const/op";
import { APICharacter } from "../api/api-character";
import { APIManager } from "../api-manager";
import { APIExport, AVGExportedAPI } from "./avg-exported-api";
import { SpriteWidgetManager } from "engine/core/graphics/sprite-widget-manager";
import { SpriteFilter } from 'engine/data/sprite-renderer';

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

  public static async animate(name: string, animation: SpriteAnimationMacro) {
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

  public static async hide(name: string | string[], animation?: SpriteAnimationMacro) {
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
      if (animation) {
        model.data.animation = super.validateSpriteAnimationMacro(animation);
      }

      const proxy = APIManager.Instance.getImpl(APICharacter.name, OP.HideCharacter);
      await proxy.runner(<APICharacter>model);
    });
  }

  // public static async setFilter(name: string, filterType: string, data: any) {
  //   SpriteWidgetManager.setSpriteFilters(name, filterType, data);
  // }

  public static async filter(name: string, filters: SpriteFilter[]) {
    let model = new APICharacter();
    model.name = name;
    model.data.renderer.filters = super.validateFilterList(filters);

    let proxy = APIManager.Instance.getImpl(APICharacter.name, OP.SetCharacterFilter);

    await proxy.runner(<APICharacter>model);
  }

  public static async clearFilters(name: string) {
    let model = new APICharacter();
    model.name = name;

    let proxy = APIManager.Instance.getImpl(APICharacter.name, OP.ClearCharacterFilter);

    await proxy.runner(<APICharacter>model);
  }
}
