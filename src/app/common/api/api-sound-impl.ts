import * as avg from "avg-engine/engine";
import { Impl } from "./impl";
import { APISound, Sound } from "avg-engine/engine";

export class APISoundImpl extends Impl {
  public static tracks: any = {};

  @Impl.registerImpl(APISound, avg.OP.PlayAudio)
  public static playAudio(scriptUnit: avg.AVGScriptUnit): Promise<avg.AVGScriptUnit> {
    return APISoundImpl._play((<Sound>scriptUnit.data).track, scriptUnit);
  }

  @Impl.registerImpl(APISound, avg.OP.StopAudio)
  public static stopAudio(scriptUnit: avg.AVGScriptUnit): Promise<avg.AVGScriptUnit> {
    return APISoundImpl._stop((<Sound>scriptUnit.data).track, scriptUnit);
  }

  @Impl.registerImpl(APISound, avg.OP.ResumeAudio)
  public static resumeAudio(scriptUnit: avg.AVGScriptUnit): Promise<avg.AVGScriptUnit> {
    return APISoundImpl._resume((<Sound>scriptUnit.data).track, scriptUnit);
  }

  @Impl.registerImpl(APISound, avg.OP.PauseAudio)
  public static pauseAudio(scriptUnit: avg.AVGScriptUnit): Promise<avg.AVGScriptUnit> {
    return APISoundImpl._pause((<Sound>scriptUnit.data).track, scriptUnit);
  }

  @Impl.registerImpl(APISound, avg.OP.GetAllTracks)
  public static getTracks() {
    const tracks = [];
    for (const track in APISoundImpl.tracks) {
      tracks.push(track)
    }

    return tracks;
  }

  @Impl.registerImpl(APISound, avg.OP.SetVolume)
  public static setVolume(scriptUnit: avg.AVGScriptUnit): Promise<avg.AVGScriptUnit> {
    const script = <avg.APISound>scriptUnit;
    const track = script.data.track;

    return new Promise((resolve, reject) => {
      if (track in APISoundImpl.tracks) {
        APISoundImpl.tracks[track].volume = avg.Setting.getVolume(track) / 100;
      }

      resolve();
    });
  }

  private static _play(track: string, scriptUnit: avg.AVGScriptUnit): Promise<avg.AVGScriptUnit> {
    const script = <avg.APISound>scriptUnit;

    return new Promise((resolve, reject) => {
      if (track in APISoundImpl.tracks) {
        APISoundImpl.tracks[track].pause();
        APISoundImpl.tracks[track] = null;
        delete APISoundImpl.tracks[track];
      }

      APISoundImpl.tracks[track] = new Audio();
      APISoundImpl.tracks[track].src = script.data.file.filename;

      APISoundImpl.tracks[track].loop = script.data.loop;
      APISoundImpl.tracks[track].volume = avg.Setting.getVolume(track) / 100;

      APISoundImpl.tracks[track].load();
      APISoundImpl.tracks[track].play();

      resolve();
    });
  }

  private static _pause(track: string, scriptUnit?: avg.AVGScriptUnit): Promise<avg.AVGScriptUnit> {
    const script = <avg.APISound>scriptUnit;

    return new Promise((resolve, reject) => {
      if (track in APISoundImpl.tracks) {
        APISoundImpl.tracks[track].pause();
      }

      resolve();
    });
  }

  private static _resume(track: string, scriptUnit?: avg.AVGScriptUnit): Promise<avg.AVGScriptUnit> {
    const script = <avg.APISound>scriptUnit;

    return new Promise((resolve, reject) => {
      if (track in APISoundImpl.tracks) {
        APISoundImpl.tracks[track].play();
      }

      resolve();
    });
  }

  private static _stop(track: string, scriptUnit?: avg.AVGScriptUnit): Promise<avg.AVGScriptUnit> {
    const script = <avg.APISound>scriptUnit;

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
