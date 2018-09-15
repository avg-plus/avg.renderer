import * as avg from "avg-engine/engine";
import { Impl } from "./impl";

export class APISoundImpl extends Impl {
  public static tracks: Array<any> = new Array<avg.SoundTrack>(
    avg.SoundTrack.MAX
  );

  @Impl.printAPIDetail
  public static op_play_bgm(scriptUnit: avg.AVGScriptUnit): Promise<avg.AVGScriptUnit> {
    return APISoundImpl.play(avg.SoundTrack.BGM, scriptUnit);
  }

  @Impl.printAPIDetail
  public static op_play_bgs(scriptUnit: avg.AVGScriptUnit): Promise<avg.AVGScriptUnit> {
    return APISoundImpl.play(avg.SoundTrack.BGS, scriptUnit);
  }

  @Impl.printAPIDetail
  public static op_play_voice(scriptUnit: avg.AVGScriptUnit): Promise<avg.AVGScriptUnit> {
    return APISoundImpl.play(
      APISoundImpl.tracks[avg.SoundTrack.Voice],
      scriptUnit
    );
  }

  @Impl.printAPIDetail
  public static op_play_se(scriptUnit: avg.AVGScriptUnit): Promise<avg.AVGScriptUnit> {
    return APISoundImpl.play(avg.SoundTrack.SE, scriptUnit);
  }

  @Impl.printAPIDetail
  public static op_pause_bgm(scriptUnit: avg.AVGScriptUnit): Promise<avg.AVGScriptUnit> {
    return APISoundImpl.pause(avg.SoundTrack.BGM, scriptUnit);
  }

  @Impl.printAPIDetail
  public static op_stop_bgm(scriptUnit: avg.AVGScriptUnit): Promise<avg.AVGScriptUnit> {
    return APISoundImpl.stop(avg.SoundTrack.BGM, scriptUnit);
  }

  @Impl.printAPIDetail
  public static op_resume_bgm(scriptUnit: avg.AVGScriptUnit): Promise<avg.AVGScriptUnit> {
    return APISoundImpl.resume(avg.SoundTrack.BGM, scriptUnit);
  }

  private static play(track: avg.SoundTrack,
                      scriptUnit: avg.AVGScriptUnit): Promise<avg.AVGScriptUnit> {
    const script = <avg.APISound>scriptUnit;

    return new Promise((resolve, reject) => {
      if (APISoundImpl.tracks[track]) {
        APISoundImpl.tracks[track].pause();
        APISoundImpl.tracks[track] = null;
      }

      APISoundImpl.tracks[track] = new Audio();
      APISoundImpl.tracks[track].src = script.data.file.filename;

      switch (script.data.track) {
        case avg.SoundTrack.BGM:
          const bgmData = <avg.SoundBGM>script.data;
          APISoundImpl.tracks[track].loop = bgmData.loop;
          APISoundImpl.tracks[track].volume = avg.Setting.BGMVolume / 100;
          break;

        case avg.SoundTrack.BGS:
          APISoundImpl.tracks[track].loop = true;
          APISoundImpl.tracks[track].volume = avg.Setting.BGSVolume / 100;
          break;

        case avg.SoundTrack.SE:
          APISoundImpl.tracks[track].loop = false;
          APISoundImpl.tracks[track].volume = avg.Setting.SEVolume / 100;
          break;
        case avg.SoundTrack.Voice:
          APISoundImpl.tracks[track].loop = false;
          APISoundImpl.tracks[track].volume = avg.Setting.VoiceVolume / 100;
          break;
      }

      APISoundImpl.tracks[track].load();
      APISoundImpl.tracks[track].play();

      resolve();
    });
  }

  private static pause(track: avg.SoundTrack,
                       scriptUnit: avg.AVGScriptUnit): Promise<avg.AVGScriptUnit> {
    const script = <avg.APISound>scriptUnit;

    return new Promise((resolve, reject) => {
      if (APISoundImpl.tracks[track]) {
        APISoundImpl.tracks[track].pause();
      }

      resolve();
    });
  }

  private static resume(track: avg.SoundTrack,
                        scriptUnit: avg.AVGScriptUnit): Promise<avg.AVGScriptUnit> {
    const script = <avg.APISound>scriptUnit;

    return new Promise((resolve, reject) => {
      if (APISoundImpl.tracks[track]) {
        APISoundImpl.tracks[track].play();
      }

      resolve();
    });
  }

  private static stop(track: avg.SoundTrack,
                      scriptUnit: avg.AVGScriptUnit): Promise<avg.AVGScriptUnit> {
    const script = <avg.APISound>scriptUnit;

    return new Promise((resolve, reject) => {
      if (APISoundImpl.tracks[track]) {
        APISoundImpl.tracks[track].pause();
        APISoundImpl.tracks[track] = null;
      }

      resolve();
    });
  }
}
