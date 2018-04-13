import * as avg from "avg-engine/engine";
import { APIDialogueImpl } from "./api-dialogue-impl";
import { APISoundImpl } from "./api-sound-impl";
import { APISceneImpl } from "./api-scene-impl";
import { APITimerImpl } from "./api-timer-impl";
import { APIEffectImpl } from "./api-effect-impl";
import { APIGotoTitleViewImpl } from "./api-goto-titleview-impl";
import { APISubtitleImpl } from "./api-subtitle-impl";
import { APICharacterImpl } from "./api-character-impl";

export class APIImplManager {
  public static init() {
    console.log(`Register API extend implemention ...`);

    let OP = avg.OP;

    avg.APIManager.extendImpl(
      avg.APIDialogue.name,
      OP.ShowText,
      APIDialogueImpl.op_show
    );
    avg.APIManager.extendImpl(
      avg.APIDialogue.name,
      OP.HideText,
      APIDialogueImpl.op_hide
    );
    avg.APIManager.extendImpl(
      avg.APICharacter.name,
      OP.ShowCharacter,
      APICharacterImpl.op_show
    );
    avg.APIManager.extendImpl(
      avg.APICharacter.name,
      OP.HideCharacter,
      APICharacterImpl.op_show
    );
    avg.APIManager.extendImpl(
      avg.APISound.name,
      OP.PlayBGM,
      APISoundImpl.op_play_bgm
    );
    avg.APIManager.extendImpl(
      avg.APISound.name,
      OP.StopBGM,
      APISoundImpl.op_stop_bgm
    );
    avg.APIManager.extendImpl(
      avg.APISound.name,
      OP.PauseBGM,
      APISoundImpl.op_pause_bgm
    );
    avg.APIManager.extendImpl(
      avg.APISound.name,
      OP.ResumeBGM,
      APISoundImpl.op_resume_bgm
    );
    avg.APIManager.extendImpl(
      avg.APISound.name,
      OP.PlayVoice,
      APISoundImpl.op_play_voice
    );
    avg.APIManager.extendImpl(
      avg.APISound.name,
      OP.PlayBGS,
      APISoundImpl.op_play_bgs
    );
    avg.APIManager.extendImpl(
      avg.APISound.name,
      OP.PlaySE,
      APISoundImpl.op_play_se
    );
    avg.APIManager.extendImpl(
      avg.APIScene.name,
      OP.LoadScene,
      APISceneImpl.op_load_scene
    );
    avg.APIManager.extendImpl(avg.APITimer.name, OP.Wait, APITimerImpl.op_wait);
    avg.APIManager.extendImpl(
      avg.APIEffect.name,
      OP.PlayEffect,
      APIEffectImpl.op_play_effect
    );
    avg.APIManager.extendImpl(
      avg.APIGotoTitleView.name,
      OP.GotoTitleView,
      APIGotoTitleViewImpl.op_go_to_title_view
    );
    avg.APIManager.extendImpl(
      avg.APISubtitle.name,
      OP.ShowSubtitle,
      APISubtitleImpl.op_show_subtitle
    );

    avg.APIManager.extendImpl(
      avg.APISubtitle.name,
      OP.UpdateSubtitle,
      APISubtitleImpl.op_update_subtitle
    );

    avg.APIManager.extendImpl(
      avg.APISubtitle.name,
      OP.AnimateSubtitle,
      APISubtitleImpl.op_animate_subtitle
    );
    avg.APIManager.extendImpl(
      avg.APISubtitle.name,
      OP.HideSubtitle,
      APISubtitleImpl.op_hide_subtitle
    );
  }
}
