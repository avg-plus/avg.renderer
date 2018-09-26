import * as avg from "avg-engine/engine";
import { ScriptingDispatcher } from "app/common/manager/scripting-dispatcher";
import { Impl } from "app/common/api/impl";
import { APIScreenSubtitle } from "avg-engine/engine";

export class APIScreenSubtitleImpl extends Impl {
  @Impl.registerImpl(APIScreenSubtitle, avg.OP.ShowTextWidget)
  public static op_show_subtitle(scriptUnit: avg.AVGScriptUnit): Promise<avg.ScreenSubtitleResult> {
    const script = <avg.APIScreenSubtitle>scriptUnit;

    return new Promise<avg.ScreenSubtitleResult>((resolve, reject) => {
      ScriptingDispatcher.dispatch(avg.OP.ShowTextWidget, script, resolve);
    });
  }

  @Impl.registerImpl(APIScreenSubtitle, avg.OP.UpdateTextWidget)
  public static op_update_subtitle(scriptUnit: avg.AVGScriptUnit): Promise<avg.AVGScriptUnit> {
    const script = <avg.APIScreenSubtitle>scriptUnit;

    return new Promise((resolve, reject) => {
      ScriptingDispatcher.dispatch(avg.OP.UpdateTextWidget, script, resolve);
    });
  }

  @Impl.registerImpl(APIScreenSubtitle, avg.OP.AnimateTextWidget)
  public static op_animate_subtitle(scriptUnit: avg.AVGScriptUnit): Promise<avg.AVGScriptUnit> {
    const script = <avg.APIScreenSubtitle>scriptUnit;

    return new Promise((resolve, reject) => {
      ScriptingDispatcher.dispatch(avg.OP.AnimateTextWidget, script, resolve);
    });
  }

  @Impl.registerImpl(APIScreenSubtitle, avg.OP.RemoveTextWidget)
  public static op_hide_subtitle(scriptUnit: avg.AVGScriptUnit): Promise<avg.AVGScriptUnit> {
    const script = <avg.APIScreenSubtitle>scriptUnit;

    return new Promise((resolve, reject) => {
      ScriptingDispatcher.dispatch(avg.OP.RemoveTextWidget, script, resolve);
    });
  }
}
