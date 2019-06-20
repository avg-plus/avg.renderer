import { APIExport, AVGExportedAPI } from "./avg-exported-api";
/**
 * 用于扩展和自定义引擎的表现
 *
 * @export
 * @class EngineAPI_Engine
 * @extends {AVGExportedAPI}
 */
@APIExport("engine", EngineAPI_Engine)
export class EngineAPI_Engine extends AVGExportedAPI {
  public static async hook(name: string, func: (data: any) => any) {
    
  }
}
