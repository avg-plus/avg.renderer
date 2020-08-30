import { Impl } from "./impl";
import { Sound } from "engine/data/sound";
import { Setting } from "engine/core/setting";
import { OP } from "engine/const/op";
import { APISound } from "engine/scripting/api/api-sound";
import { AVGScriptUnit } from "engine/scripting/script-unit";
import { Howl, Howler } from "howler";

// 自动解锁浏览器的音频保护
// The AudioContext was not allowed to start. It must be resumed (or created) after a user gesture on the page. https://goo.gl/7K7WLu
Howler.autoUnlock = true;
Howler.autoSuspend = false;

export class APISoundImpl extends Impl {
  public static tracks: {
    [track: string]: Howl;
  } = {};

  @Impl.registerImpl(APISound, OP.PlayAudio)
  public static playAudio(scriptUnit: AVGScriptUnit): Promise<AVGScriptUnit> {
    return APISoundImpl._play((<Sound>scriptUnit.data).track, scriptUnit);
  }

  @Impl.registerImpl(APISound, OP.MuteAudio)
  public static mute(scriptUnit: AVGScriptUnit) {
    const tracks = APISoundImpl.tracks;

    Object.keys(tracks).map(t => {
      tracks[t].mute(true);
    });
  }

  @Impl.registerImpl(APISound, OP.UnmuteAudio)
  public static unmute(scriptUnit: AVGScriptUnit) {
    const tracks = APISoundImpl.tracks;

    Object.keys(tracks).map(t => {
      tracks[t].mute(false);
    });
  }

  @Impl.registerImpl(APISound, OP.StopAudio)
  public static stopAudio(scriptUnit: AVGScriptUnit) {
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
        console.log(Setting.getVolume(track));

        APISoundImpl.tracks[track].volume(Setting.getVolume(track) / 100);
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

      var sound = new Howl({
        src: [script.data.file.filename],
        autoplay: true,
        loop: script.data.loop,
        volume: Setting.getVolume(track) / 100,
        onend: () => {
          console.log("Sound play finished");
        }
      });

      APISoundImpl.tracks[track] = sound;
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
