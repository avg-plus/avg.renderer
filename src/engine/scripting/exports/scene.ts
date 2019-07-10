import * as joi from "joi";

import { APIExport, AVGExportedAPI } from "./avg-exported-api";
import { APIScene, SceneHandle } from "../api/api-scene";
import { Scene } from "../../data/scene";
import { mergeDeep, paramCompatible } from "../../core/utils";
import { ResourcePath } from "../../core/resource";
import { ResourceData } from "../../data/resource-data";
import { APIManager } from "../api-manager";
import { OP } from "../../const/op";
import { Sandbox } from "engine/core/sandbox";

@APIExport("scene", EngineAPI_Scene)
export class EngineAPI_Scene extends AVGExportedAPI {
  /**
   * Load scene with image filename
   *
   * @export
   * @param {string} filename The background image file of scene
   * @param {Scene} [options]
   */
  public static async load(id: string, filename: string, options: Scene): Promise<SceneHandle> {
    let model = new APIScene();
    model.isAsync = arguments[arguments.length - 1] === "__async_call__";

    model.name = super.validateImageID(id);
    model.filename = ResourceData.from(super.validateFilename(filename), ResourcePath.Backgrounds).filename;

    if (!options || !(options instanceof Object)) {
      options = new Scene();
    }

    model.data = options;
    model.data.renderer = super.validateRenderer(model.data.renderer);

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

  public static async remove(id: string): Promise<SceneHandle> {
    let model = new APIScene();
    model.name = super.validateImageID(id);

    // model.index = index;

    return <SceneHandle>await APIManager.Instance.getImpl(APIScene.name, OP.RemoveScene).runner(<APIScene>model);
  }

  public static async animate(index: number, animateName: string, options: any) {}
}
