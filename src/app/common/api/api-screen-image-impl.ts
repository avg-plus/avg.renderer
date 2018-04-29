import * as avg from "avg-engine/engine";
import { ScriptingDispatcher } from "app/common/manager/scripting-dispatcher";
import { Impl } from "app/common/api/impl";

export class APIScreenImageImpl extends Impl {
  @Impl.printAPIDetail
  public static op_show_image(
    scriptUnit: avg.AVGScriptUnit
  ): Promise<avg.AVGScriptUnit> {
    const script = <avg.APIScreenImage>scriptUnit;

    return new Promise((resolve, reject) => {
      ScriptingDispatcher.dispatch(avg.OP.ShowImage, script, resolve);
    });
  }

  @Impl.printAPIDetail
  public static op_update_image(
    scriptUnit: avg.AVGScriptUnit
  ): Promise<avg.AVGScriptUnit> {
    const script = <avg.APIScreenImage>scriptUnit;

    return new Promise((resolve, reject) => {
      ScriptingDispatcher.dispatch(avg.OP.UpdateImage, script, resolve);
    });
  }

  @Impl.printAPIDetail
  public static op_animate_image(
    scriptUnit: avg.AVGScriptUnit
  ): Promise<avg.AVGScriptUnit> {
    const script = <avg.APIScreenImage>scriptUnit;

    return new Promise((resolve, reject) => {
      ScriptingDispatcher.dispatch(avg.OP.AnimateImage, script, resolve);
    });
  }

  @Impl.printAPIDetail
  public static op_hide_image(
    scriptUnit: avg.AVGScriptUnit
  ): Promise<avg.AVGScriptUnit> {
    const script = <avg.APIScreenImage>scriptUnit;

    return new Promise((resolve, reject) => {
      ScriptingDispatcher.dispatch(avg.OP.HideImage, script, resolve);
    });
  }
}
