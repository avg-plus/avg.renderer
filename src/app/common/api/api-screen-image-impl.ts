import * as avg from "avg-engine/engine";
import { ScriptingDispatcher } from "app/common/manager/scripting-dispatcher";
import { Impl } from "app/common/api/impl";
import { APIScreenImage } from "avg-engine/engine";

export class APIScreenImageImpl extends Impl {
  @Impl.registerImpl(APIScreenImage, avg.OP.ShowImageWidget)
  public static op_show_image(scriptUnit: avg.AVGScriptUnit): Promise<avg.ScreenImageResult> {
    const script = <avg.APIScreenImage>scriptUnit;

    return new Promise<avg.ScreenImageResult>((resolve, reject) => {
      ScriptingDispatcher.dispatch(avg.OP.ShowImageWidget, script, resolve);
    });
  }

  @Impl.registerImpl(APIScreenImage, avg.OP.UpdateImageWidget)
  public static op_update_image(scriptUnit: avg.AVGScriptUnit): Promise<avg.AVGScriptUnit> {
    const script = <avg.APIScreenImage>scriptUnit;

    return new Promise((resolve, reject) => {
      ScriptingDispatcher.dispatch(avg.OP.UpdateImageWidget, script, resolve);
    });
  }

  @Impl.registerImpl(APIScreenImage, avg.OP.AnimateImageWidget)
  public static op_animate_image(scriptUnit: avg.AVGScriptUnit): Promise<avg.AVGScriptUnit> {
    const script = <avg.APIScreenImage>scriptUnit;

    return new Promise((resolve, reject) => {
      ScriptingDispatcher.dispatch(avg.OP.AnimateImageWidget, script, resolve);
    });
  }

  @Impl.registerImpl(APIScreenImage, avg.OP.RemoveImageWidget)
  public static op_remove_image(scriptUnit: avg.AVGScriptUnit): Promise<avg.AVGScriptUnit> {
    const script = <avg.APIScreenImage>scriptUnit;

    return new Promise((resolve, reject) => {
      ScriptingDispatcher.dispatch(avg.OP.RemoveImageWidget, script, resolve);
    });
  }
}
