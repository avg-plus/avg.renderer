import { Sound } from "./sound";
import { SelectedDialogueChoice } from "engine/scripting/api/api-dialogue-choices";

export class AVGMusicState {
  public sound: Sound;

  public isStop: boolean;

  public constructor(sound: Sound, isStop: boolean) {
    this.sound = sound;
    this.isStop = isStop;
  }
}

export class Runtime {
  // public screenSubtitles: Array<Subtitle> = new Array<Subtitle>();

  // public screenImages: Array<ScreenImage> = new Array<ScreenImage>();

  // public bgm: AVGMusicState;

  // public dialogue: Dialogue;

  // public characters: Array<Character> = new Array<Character>(5);

  public choices: Array<SelectedDialogueChoice> = new Array<SelectedDialogueChoice>();

  public Variables: Map<string, any> = new Map<string, any>();
}
