import { APIExport, AVGExportedAPI } from "./avg-exported-api";
import { Sound } from "../../data/sound";
import { APISound } from "../api/api-sound";
import { SoundTrack } from "../../const/model";
import { paramCompatible } from "../../core/utils";
import { ResourceData } from "../../data/resource-data";
import { ResourcePath } from "../../core/resource";
import { APIManager } from "../api-manager";
import { OP } from "../../const/op";
import { Setting } from "engine/core/setting";

@APIExport("audio", EngineAPI_Audio)
export class EngineAPI_Audio extends AVGExportedAPI {
  public static async play(track: string, filename: string, options?: Sound) {
    let model = new APISound();
    model.data = new Sound();
    model.data.track = track;

    paramCompatible<APISound, Sound>(model, options, {
      field: "file",
      value: ResourceData.from(filename, ResourcePath.Audio)
    });

    const proxy = APIManager.Instance.getImpl(APISound.name, OP.PlayAudio);
    proxy && (await proxy.runner(<APISound>model));
  }

  public static async stop(track: string) {
    let model = new APISound();
    model.data = new Sound();
    model.data.track = track;

    paramCompatible<APISound, Sound>(model, null);

    const proxy = APIManager.Instance.getImpl(APISound.name, OP.StopAudio);
    proxy && (await proxy.runner(<APISound>model));
  }

  public static async pause(track: string) {
    let model = new APISound();
    model.data = new Sound();
    model.data.track = track;

    paramCompatible<APISound, Sound>(model, null);

    const proxy = APIManager.Instance.getImpl(APISound.name, OP.PauseAudio);
    proxy && (await proxy.runner(<APISound>model));
  }

  public static async resume(track: string) {
    let model = new APISound();
    model.data = new Sound();
    model.data.track = track;

    paramCompatible<APISound, Sound>(model, null);

    const proxy = APIManager.Instance.getImpl(APISound.name, OP.ResumeAudio);
    proxy && (await proxy.runner(<APISound>model));
  }

  public static async getTracks(): Promise<string[]> {
    let model = new APISound();

    const proxy = APIManager.Instance.getImpl(APISound.name, OP.GetAllTracks);
    return <string[]>await proxy.runner(<APISound>model);
  }

  public static async setVolume(track: string, value: number) {
    Setting.setVolume(track, value);

    let model = new APISound();
    model.data = new Sound();
    model.data.track = track;

    const proxy = APIManager.Instance.getImpl(APISound.name, OP.SetVolume);
    proxy && (await proxy.runner(<APISound>model));
  }

  public static async getVolume(track: string) {
    return Setting.getVolume(track);
  }

  public static async mute() {
    let model = new APISound();
    model.data = new Sound();

    const proxy = APIManager.Instance.getImpl(APISound.name, OP.MuteAudio);
    proxy && (await proxy.runner(<APISound>model));
  }

  public static async unmute() {
    const proxy = APIManager.Instance.getImpl(APISound.name, OP.UnmuteAudio);
    proxy.runner(new APISound());
  }
}
