import { ScriptingDispatcher } from "app/common/manager/scripting-dispatcher";
import { Impl } from "app/common/api/impl";
import { OP } from "engine/const/op";
import { APIScreenSubtitle, ScreenSubtitleResult } from "engine/scripting/api/api-screen-subtitle";
import { AVGScriptUnit } from "engine/scripting/script-unit";

export class APIScreenSubtitleImpl extends Impl {
  @Impl.registerImpl(APIScreenSubtitle, OP.ShowTextWidget)
  public static op_show_subtitle(scriptUnit: AVGScriptUnit): Promise<ScreenSubtitleResult> {
    const script = <APIScreenSubtitle>scriptUnit;

    return new Promise<ScreenSubtitleResult>((resolve, reject) => {
      ScriptingDispatcher.dispatch(OP.ShowTextWidget, script, resolve);
    });
  }

  @Impl.registerImpl(APIScreenSubtitle, OP.UpdateTextWidget)
  public static op_update_subtitle(scriptUnit: AVGScriptUnit): Promise<AVGScriptUnit> {
    const script = <APIScreenSubtitle>scriptUnit;

    return new Promise((resolve, reject) => {
      ScriptingDispatcher.dispatch(OP.UpdateTextWidget, script, resolve);
    });
  }

  @Impl.registerImpl(APIScreenSubtitle, OP.AnimateTextWidget)
  public static op_animate_subtitle(scriptUnit: AVGScriptUnit): Promise<AVGScriptUnit> {
    const script = <APIScreenSubtitle>scriptUnit;

    return new Promise((resolve, reject) => {
      ScriptingDispatcher.dispatch(OP.AnimateTextWidget, script, resolve);
    });
  }

  @Impl.registerImpl(APIScreenSubtitle, OP.RemoveTextWidget)
  public static op_hide_subtitle(scriptUnit: AVGScriptUnit): Promise<AVGScriptUnit> {
    const script = <APIScreenSubtitle>scriptUnit;

    return new Promise((resolve, reject) => {
      ScriptingDispatcher.dispatch(OP.RemoveTextWidget, script, resolve);
    });
  }
}
