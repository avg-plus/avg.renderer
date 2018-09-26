import * as avg from "avg-engine/engine";
import "./api-dialogue-impl";
import "./api-sound-impl";
import "./api-scene-impl";
import "./api-timer-impl";
import "./api-effect-impl";
import "./api-goto-titleview-impl";
import "./api-screen-subtitle-impl";
import "./api-character-impl";
import "./api-dialogue-choices-impl";
import "./api-animate-scene-impl";
import "./api-input-box-impl";
import "./api-screen-image-impl";
import "./api-transition-to-impl";
import "./api-widget-html-impl";

export class APIImplManager {
  public static init() {
    console.log(`Register API extend implemention ...`);

    const OP = avg.OP;

    // avg.APIManager.extendImpl(avg.APIDialogue.name, OP.ShowText, APIDialogueImpl.op_show);
    // avg.APIManager.extendImpl(avg.APIDialogue.name, OP.HideText, APIDialogueImpl.op_hide);
    // avg.APIManager.extendImpl(avg.APICharacter.name, OP.ShowCharacter, APICharacterImpl.op_show);
    // avg.APIManager.extendImpl(avg.APICharacter.name, OP.HideCharacter, APICharacterImpl.op_hide);
    // avg.APIManager.extendImpl(avg.APIDialogueChoice.name, OP.ShowChioce, APIDialogueChoicesImpl.op_show);
    // avg.APIManager.extendImpl(avg.APISound.name, OP.PlayBGM, APISoundImpl.op_play_bgm);
    // avg.APIManager.extendImpl(avg.APISound.name, OP.StopBGM, APISoundImpl.op_stop_bgm);
    // avg.APIManager.extendImpl(avg.APISound.name, OP.PauseBGM, APISoundImpl.op_pause_bgm);
    // avg.APIManager.extendImpl(avg.APISound.name, OP.ResumeBGM, APISoundImpl.op_resume_bgm);
    // avg.APIManager.extendImpl(avg.APISound.name, OP.PlayVoice, APISoundImpl.op_play_voice);
    // avg.APIManager.extendImpl(avg.APISound.name, OP.PlayBGS, APISoundImpl.op_play_bgs);
    // avg.APIManager.extendImpl(avg.APISound.name, OP.PlaySE, APISoundImpl.op_play_se);

    // avg.APIManager.extendImpl(avg.APIScene.name, OP.LoadScene, APISceneImpl.op_load_scene);

    // avg.APIManager.extendImpl(avg.APIScene.name, OP.RemoveScene, APISceneImpl.op_remove_scene);

    // avg.APIManager.extendImpl(avg.APIAnimateScene.name, OP.AnimateScene, APIAnimateSceneImpl.op_animate);
    // avg.APIManager.extendImpl(avg.APITimer.name, OP.Wait, APITimerImpl.op_wait);
    // avg.APIManager.extendImpl(avg.APIEffect.name, OP.PlayEffect, APIEffectImpl.op_play_effect);
    // avg.APIManager.extendImpl(avg.APIGotoTitleView.name, OP.GotoTitleView, APIGotoTitleViewImpl.op_go_to_title_view);
    // avg.APIManager.extendImpl(avg.APIScreenSubtitle.name, OP.ShowTextWidget, APIScreenSubtitleImpl.op_show_subtitle);

    // avg.APIManager.extendImpl(
    //   avg.APIScreenSubtitle.name,
    //   OP.UpdateTextWidget,
    //   APIScreenSubtitleImpl.op_update_subtitle
    // );

    // avg.APIManager.extendImpl(
    //   avg.APIScreenSubtitle.name,
    //   OP.AnimateTextWidget,
    //   APIScreenSubtitleImpl.op_animate_subtitle
    // );
    // avg.APIManager.extendImpl(avg.APIScreenSubtitle.name, OP.RemoveTextWidget, APIScreenSubtitleImpl.op_hide_subtitle);
    // avg.APIManager.extendImpl(avg.APIInputBox.name, OP.ShowInputBox, APIInputBoxImpl.op_show);
    // avg.APIManager.extendImpl(avg.APIScreenImage.name, OP.ShowImageWidget, APIScreenImageImpl.op_show_image);
    // avg.APIManager.extendImpl(avg.APIScreenImage.name, OP.RemoveImageWidget, APIScreenImageImpl.op_remove_image);

    // avg.APIManager.extendImpl(avg.APITransitionTo.name, OP.TransitionTo, APITransitionToImpl.op_transition_to);
  }
}
