import { Impl } from "./impl";
import { Sound } from "engine/data/sound";
import { Setting } from "engine/core/setting";
import { OP } from "engine/const/op";
import { APISound } from "engine/scripting/api/api-sound";
import { AVGScriptUnit } from "engine/scripting/script-unit";

export class APISoundImpl extends Impl {
  public static tracks: any = {};

  @Impl.registerImpl(APISound, OP.PlayAudio)
  public static playAudio(scriptUnit: AVGScriptUnit): Promise<AVGScriptUnit> {
    return APISoundImpl._play((<Sound>scriptUnit.data).track, scriptUnit);
  }

  @Impl.registerImpl(APISound, OP.StopAudio)
  public static stopAudio(scriptUnit: AVGScriptUnit): Promise<AVGScriptUnit> {
    return APISoundImpl._stop((<Sound>scriptUnit.data).track, scriptUnit);
  }

  @Impl.registerImpl(APISound, OP.ResumeAudio)
  public static resumeAudio(scriptUnit: AVGScriptUnit): Promise<AVGScriptUnit> {
    return APISoundImpl._resume((<Sound>scriptUnit.data).track, scriptUnit);
  }

  @Impl.registerImpl(APISound, OP.PauseAudio)
  public static pauseAudio(scriptUnit: AVGScriptUnit): Promise<AVGScriptUnit> {
    return APISoundImpl._pause((<Sound>scriptUnit.data).track, scriptUnit);
  }

  @Impl.registerImpl(APISound, OP.GetAllTracks)
  public static getTracks() {
    const tracks = [];
    for (const track in APISoundImpl.tracks) {
      tracks.push(track);
    }

    return tracks;
  }

  @Impl.registerImpl(APISound, OP.SetVolume)
  public static setVolume(scriptUnit: AVGScriptUnit): Promise<AVGScriptUnit> {
    const script = <APISound>scriptUnit;
    const track = script.data.track;

    return new Promise((resolve, reject) => {
      if (track in APISoundImpl.tracks) {
        APISoundImpl.tracks[track].volume = Setting.getVolume(track) / 100;
      }

      resolve();
    });
  }

  private static _play(track: string, scriptUnit: AVGScriptUnit): Promise<AVGScriptUnit> {
    const script = <APISound>scriptUnit;

    return new Promise((resolve, reject) => {
      if (track in APISoundImpl.tracks) {
        APISoundImpl.tracks[track].pause();
        APISoundImpl.tracks[track] = null;
        delete APISoundImpl.tracks[track];
      }

      APISoundImpl.tracks[track] = new Audio();
      APISoundImpl.tracks[track].src = script.data.file.filename;

      APISoundImpl.tracks[track].loop = script.data.loop;
      APISoundImpl.tracks[track].volume = Setting.getVolume(track) / 100;

      APISoundImpl.tracks[track].load();
      APISoundImpl.tracks[track].play();

      resolve();
    });
  }

  private static _pause(track: string, scriptUnit?: AVGScriptUnit): Promise<AVGScriptUnit> {
    const script = <APISound>scriptUnit;

    return new Promise((resolve, reject) => {
      if (track in APISoundImpl.tracks) {
        APISoundImpl.tracks[track].pause();
      }

      resolve();
    });
  }

  private static _resume(track: string, scriptUnit?: AVGScriptUnit): Promise<AVGScriptUnit> {
    const script = <APISound>scriptUnit;

    return new Promise((resolve, reject) => {
      if (track in APISoundImpl.tracks) {
        APISoundImpl.tracks[track].play();
      }

      resolve();
    });
  }

  private static _stop(track: string, scriptUnit?: AVGScriptUnit): Promise<AVGScriptUnit> {
    const script = <APISound>scriptUnit;

    return new Promise((resolve, reject) => {
      if (track in APISoundImpl.tracks) {
        APISoundImpl.tracks[track].pause();
        APISoundImpl.tracks[track] = null;
        delete APISoundImpl.tracks[track];
      }

      resolve();
    });
  }
}
