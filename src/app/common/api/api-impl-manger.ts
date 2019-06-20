import { APIManager } from "./../../../engine/scripting/api-manager";

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
import "./api-widget-html-impl";
import "./api-camera-impl";
import "./api-system-impl";

export class APIImplManager {
  public static init() {
    console.log(`Register API extend implemention ...`);
    APIManager.Instance.init();

    // const OP = OP;

    // APIManager.extendImpl(APIDialogue.name, OP.ShowText, APIDialogueImpl.op_show);
    // APIManager.extendImpl(APIDialogue.name, OP.HideText, APIDialogueImpl.op_hide);
    // APIManager.extendImpl(APICharacter.name, OP.ShowCharacter, APICharacterImpl.op_show);
    // APIManager.extendImpl(APICharacter.name, OP.HideCharacter, APICharacterImpl.op_hide);
    // APIManager.extendImpl(APIDialogueChoice.name, OP.ShowChioce, APIDialogueChoicesImpl.op_show);
    // APIManager.extendImpl(APISound.name, OP.PlayBGM, APISoundImpl.op_play_bgm);
    // APIManager.extendImpl(APISound.name, OP.StopBGM, APISoundImpl.op_stop_bgm);
    // APIManager.extendImpl(APISound.name, OP.PauseBGM, APISoundImpl.op_pause_bgm);
    // APIManager.extendImpl(APISound.name, OP.ResumeBGM, APISoundImpl.op_resume_bgm);
    // APIManager.extendImpl(APISound.name, OP.PlayVoice, APISoundImpl.op_play_voice);
    // APIManager.extendImpl(APISound.name, OP.PlayBGS, APISoundImpl.op_play_bgs);
    // APIManager.extendImpl(APISound.name, OP.PlaySE, APISoundImpl.op_play_se);

    // APIManager.extendImpl(APIScene.name, OP.LoadScene, APISceneImpl.op_load_scene);

    // APIManager.extendImpl(APIScene.name, OP.RemoveScene, APISceneImpl.op_remove_scene);

    // APIManager.extendImpl(APIAnimateScene.name, OP.AnimateScene, APIAnimateSceneImpl.op_animate);
    // APIManager.extendImpl(APITimer.name, OP.Wait, APITimerImpl.op_wait);
    // APIManager.extendImpl(APIEffect.name, OP.PlayEffect, APIEffectImpl.op_play_effect);
    // APIManager.extendImpl(APIGotoTitleView.name, OP.GotoTitleView, APIGotoTitleViewImpl.op_go_to_title_view);
    // APIManager.extendImpl(APIScreenSubtitle.name, OP.ShowTextWidget, APIScreenSubtitleImpl.op_show_subtitle);

    // APIManager.extendImpl(
    //   APIScreenSubtitle.name,
    //   OP.UpdateTextWidget,
    //   APIScreenSubtitleImpl.op_update_subtitle
    // );

    // APIManager.extendImpl(
    //   APIScreenSubtitle.name,
    //   OP.AnimateTextWidget,
    //   APIScreenSubtitleImpl.op_animate_subtitle
    // );
    // APIManager.extendImpl(APIScreenSubtitle.name, OP.RemoveTextWidget, APIScreenSubtitleImpl.op_hide_subtitle);
    // APIManager.extendImpl(APIInputBox.name, OP.ShowInputBox, APIInputBoxImpl.op_show);
    // APIManager.extendImpl(APIScreenImage.name, OP.ShowImageWidget, APIScreenImageImpl.op_show_image);
    // APIManager.extendImpl(APIScreenImage.name, OP.RemoveImageWidget, APIScreenImageImpl.op_remove_image);

    // APIManager.extendImpl(APITransitionTo.name, OP.TransitionTo, APITransitionToImpl.op_transition_to);
  }
}
