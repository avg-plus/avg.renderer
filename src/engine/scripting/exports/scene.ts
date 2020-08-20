import * as joi from "joi";

import { APIExport, AVGExportedAPI } from "./avg-exported-api";
import { APIScene, SceneHandle } from "../api/api-scene";
import { SceneSprite } from "../../data/scene";
import { ResourcePath } from "../../core/resource";
import { ResourceData } from "../../data/resource-data";
import { APIManager } from "../api-manager";
import { OP } from "../../const/op";
import { SpriteFilter } from "engine/data/sprite-renderer";
import { SpriteAnimationMacro } from "engine/core/graphics/sprite-animate-director";

@APIExport("scene", EngineAPI_Scene)
export class EngineAPI_Scene extends AVGExportedAPI {
  /**
   * Load scene with image filename
   *
   * @export
   * @param {string} filename The background image file of scene
   * @param {SceneSprite} [options]
   */
  public static async load(
    id: string,
    filename: string,
    options?: SceneSprite
  ): Promise<SceneHandle> {
    let model = new APIScene();
    model.isAsync = arguments[arguments.length - 1] === "__async_call__";

    model.name = super.validateImageID(id);
    model.filename = ResourceData.from(
      super.validateFilename(filename),
      ResourcePath.Backgrounds
    ).filename;

    if (!options || !(options instanceof Object)) {
      options = new SceneSprite();
    }

    model.data = options;
    model.data.renderer = super.validateRenderer(model.data.renderer);
    model.data.animation = super.validateSpriteAnimationMacro(
      options.animation
    );

    // 跳过模式处理，忽略时间
    // if (Sandbox.isSkipMode && Sandbox.skipOptions.scenes === true) {
    //   model.data.duration = 0;
    // }

    let proxy = APIManager.Instance.getImpl(APIScene.name, OP.LoadScene);
    if (proxy) {
      return <SceneHandle>await proxy.runner(<APIScene>model);
    } else {
      return null;
    }
  }

  public static async filter(name: string, filters: SpriteFilter[]) {
    let model = new APIScene();
    model.name = name;
    model.data.renderer.filters = super.validateFilterList(filters);

    let proxy = APIManager.Instance.getImpl(APIScene.name, OP.SetSceneFilter);

    return <SceneHandle>await proxy.runner(<APIScene>model);
  }

  public static async clearFilters(name: string) {
    let model = new APIScene();
    model.name = name;

    let proxy = APIManager.Instance.getImpl(APIScene.name, OP.ClearSceneFilter);

    await proxy.runner(<APIScene>model);
  }

  // public static async remove(name: string): Promise<SceneHandle> {
  //   let model = new APIScene();
  //   model.name = super.validateImageID(name);

  //   // model.index = index;

  //   return <SceneHandle>await APIManager.Instance.getImpl(APIScene.name, OP.RemoveScene).runner(<APIScene>model);
  // }

  public static async remove(
    name: string | string[],
    animation?: SpriteAnimationMacro
  ) {
    let ids = [];
    if (Array.isArray(name)) {
      ids = name;
    } else {
      ids = [name];
    }

    ids.map(async v => {
      let model = new APIScene();
      model.isAsync = arguments[arguments.length - 1] === "__async_call__";
      model.name = super.validateImageID(v);
      model.data.animation = super.validateSpriteAnimationMacro(animation);

      await APIManager.Instance.getImpl(APIScene.name, OP.RemoveScene).runner(
        <APIScene>model
      );
    });
  }

  public static async animate(name: string, animation: SpriteAnimationMacro) {
    const model = new APIScene();
    model.isAsync = arguments[arguments.length - 1] === "__async_call__";

    model.name = super.validateImageID(name);
    model.data.animation = super.validateSpriteAnimationMacro(animation);

    const proxy = APIManager.Instance.getImpl(APIScene.name, OP.AnimateScene);
    proxy && (await proxy.runner(<APIScene>model));
  }
}
