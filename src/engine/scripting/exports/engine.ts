import { GameWorld } from "./../../core/graphics/world";
import { HookEvents } from "./../../plugin/hooks/hook-events";
import { HookManager } from "./../../plugin/hooks/hook-manager";
import { APIExport, AVGExportedAPI } from "./avg-exported-api";
import { AVGNativeFS } from "engine/core/native-modules/avg-native-fs";
import { AVGNativePath } from "engine/core/native-modules/avg-native-path";
import { ResourcePath, GameResource } from "engine/core/resource";
import { PluginManager } from "engine/plugin/plugin-manager";
import { SkipOptions } from "engine/data/skip-options";
import { Sandbox } from "engine/core/sandbox";
import { ResourceManager } from "engine/core/resource-manager";
import { DanmakuManager } from "engine/core/danmaku-mananger";
/**
 * 用于扩展和自定义引擎的表现
 *
 * @export
 * @class EngineAPI_Engine
 * @extends {AVGExportedAPI}
 */
@APIExport("engine", EngineAPI_Engine)
export class EngineAPI_Engine extends AVGExportedAPI {
  public static async subscribeHook(event: string, cb: (data: any) => any) {
    return await HookManager.subscribeHook(<HookEvents>event, cb);
  }

  public static async unsubscribeHook(subscription: any) {
    HookManager.unsubscribe(subscription);
  }

  public static async loadPlugin(name: string, filename: string) {
    const scripts = await AVGNativeFS.readFileSync(
      AVGNativePath.join(GameResource.getPath(ResourcePath.Plugins), filename)
    );

    const instance = await PluginManager.loadScripts(scripts);
  }

  public static async unloadPlugin() {}

  public static async enableSkipMode(options?: SkipOptions) {
    Sandbox.isSkipMode = true;
    Sandbox.skipOptions = options || new SkipOptions();
  }

  public static async disableSkipMode() {
    Sandbox.isSkipMode = false;
  }

  public static async enableDanmaku() {
    await DanmakuManager.enableDanmaku();
  }

  public static async disableDanmaku() {
    await DanmakuManager.disableDanmaku();
  }

  public static preload(url: string) {
    ResourceManager.addLoading(url);
  }

  public static getScreenWidth() {
    return GameWorld.worldWidth;
  }

  public static getScreenHeight() {
    return GameWorld.worldHeight;
  }

  public static getMousePosition() {
    var mouse = GameWorld.app.renderer.plugins.interaction.mouse.global;

    return mouse;
  }

  public static getBaseURL() {
    return GameResource.getAssetsRoot();
  }
}
