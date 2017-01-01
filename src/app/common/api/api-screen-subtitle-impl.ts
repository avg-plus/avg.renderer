import * as avg from "avg-engine/engine";
import { ScriptingDispatcher } from "app/common/manager/scripting-dispatcher";
import { Impl } from "app/common/api/impl";

export class APIScreenSubtitleImpl extends Impl {
  @Impl.printAPIDetail
  public static op_show_subtitle(
    scriptUnit: avg.AVGScriptUnit
  ): Promise<avg.ScreenSubtitleResult> {
    const script = <avg.APIScreenSubtitle>scriptUnit;

    return new Promise<avg.ScreenSubtitleResult>((resolve, reject) => {
      ScriptingDispatcher.dispatch(avg.OP.ShowSubtitle, script, resolve);
    });
  }

  @Impl.printAPIDetail
  public static op_update_subtitle(
    scriptUnit: avg.AVGScriptUnit
  ): Promise<avg.AVGScriptUnit> {
    const script = <avg.APIScreenSubtitle>scriptUnit;

    return new Promise((resolve, reject) => {
      ScriptingDispatcher.dispatch(avg.OP.UpdateSubtitle, script, resolve);
    });
  }

  @Impl.printAPIDetail
  public static op_animate_subtitle(
    scriptUnit: avg.AVGScriptUnit
  ): Promise<avg.AVGScriptUnit> {
    const script = <avg.APIScreenSubtitle>scriptUnit;

    return new Promise((resolve, reject) => {
      ScriptingDispatcher.dispatch(avg.OP.AnimateSubtitle, script, resolve);
    });
  }

  @Impl.printAPIDetail
  public static op_hide_subtitle(
    scriptUnit: avg.AVGScriptUnit
  ): Promise<avg.AVGScriptUnit> {
    const script = <avg.APIScreenSubtitle>scriptUnit;

    return new Promise((resolve, reject) => {
      ScriptingDispatcher.dispatch(avg.OP.HideSubtitle, script, resolve);
    });
  }
}
