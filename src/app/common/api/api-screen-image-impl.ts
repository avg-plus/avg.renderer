import { ScriptingDispatcher } from "app/common/manager/scripting-dispatcher";
import { Impl } from "app/common/api/impl";
import { OP } from "engine/const/op";
import { APIScreenImage, ScreenImageResult } from "engine/scripting/api/api-screen-image";
import { AVGScriptUnit } from "engine/scripting/script-unit";

export class APIScreenImageImpl extends Impl {
  @Impl.registerImpl(APIScreenImage, OP.ShowImageWidget)
  public static op_show_image(scriptUnit: AVGScriptUnit): Promise<ScreenImageResult> {
    const script = <APIScreenImage>scriptUnit;

    return new Promise<ScreenImageResult>((resolve, reject) => {
      ScriptingDispatcher.dispatch(OP.ShowImageWidget, script, resolve);
    });
  }

  @Impl.registerImpl(APIScreenImage, OP.UpdateImageWidget)
  public static op_update_image(scriptUnit: AVGScriptUnit): Promise<AVGScriptUnit> {
    const script = <APIScreenImage>scriptUnit;

    return new Promise((resolve, reject) => {
      ScriptingDispatcher.dispatch(OP.UpdateImageWidget, script, resolve);
    });
  }

  @Impl.registerImpl(APIScreenImage, OP.AnimateImageWidget)
  public static op_animate_image(scriptUnit: AVGScriptUnit): Promise<AVGScriptUnit> {
    const script = <APIScreenImage>scriptUnit;

    return new Promise((resolve, reject) => {
      ScriptingDispatcher.dispatch(OP.AnimateImageWidget, script, resolve);
    });
  }

  @Impl.registerImpl(APIScreenImage, OP.RemoveImageWidget)
  public static op_remove_image(scriptUnit: AVGScriptUnit): Promise<AVGScriptUnit> {
    const script = <APIScreenImage>scriptUnit;

    return new Promise((resolve, reject) => {
      ScriptingDispatcher.dispatch(OP.RemoveImageWidget, script, resolve);
    });
  }
}
