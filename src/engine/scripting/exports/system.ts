import { ResourceManager } from "./../../core/resource-manager";
import { SkipOptions } from "../../data/skip-options";
import { APIExport, AVGExportedAPI } from "./avg-exported-api";
import { Sandbox } from "../../core/sandbox";

@APIExport("system", EngineAPI_System)
export class EngineAPI_System extends AVGExportedAPI {
  public static async enabledSkipMode(options?: SkipOptions) {
    Sandbox.isSkipMode = true;
    Sandbox.skipOptions = options || new SkipOptions();
  }

  public static async disabledSkipMode() {
    Sandbox.isSkipMode = false;
  }

  public static preload(url: string) {
    ResourceManager.addLoading(url);
  }

  public static async saveArchive() {}
}
