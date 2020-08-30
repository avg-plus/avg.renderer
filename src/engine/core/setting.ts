import { EngineUtils } from "./engine-utils";

export class Setting {
  private static settings: any = {
    screen: {
      width: 1366,
      height: 768,
      fullscreen: false
    },
    game: {
      text_speed: 80,
      auto_play: false,
      auto_play_speed: 1,
      sound: {
        bgm: 40,
        bgs: 100,
        se: 100,
        voice: 100
      }
    }
  };

  public static get TextSpeed(): number {
    return this.settings.game.text_speed;
  }
  public static set TextSpeed(value: number) {
    EngineUtils.NumericRange(value, 0, 100);
    this.settings.game.text_speed = value;
  }
  public static get AutoPlay(): boolean {
    return this.settings.game.auto_play;
  }
  public static set AutoPlay(value: boolean) {
    this.settings.game.auto_play = value;
  }
  public static get AutoPlaySpeed(): number {
    return this.settings.game.auto_play_speed;
  }
  public static set AutoPlaySpeed(value: number) {
    EngineUtils.NumericRange(value, 0, 100);
    this.settings.game.auto_play_speed = value;
  }

  public static getVolume(track: string = "default"): number {
    let v = 100;
    if (!this.settings.game.sound[track]) {
      v = 100;
    } else {
      v = this.settings.game.sound[track];
    }

    return v;
  }

  public static setVolume(track: string, value: number) {
    this.settings.game.sound[track] = EngineUtils.NumericRange(value, 0, 100);
  }
  
  public static get WindowWidth(): number {
    return this.settings.screen.width;
  }
  public static set WindowWidth(value: number) {
    this.settings.screen.width = value;
  }
  public static get WindowHeight(): number {
    return this.settings.screen.height;
  }
  public static set WindowHeight(value: number) {
    this.settings.screen.height = value;
  }
  public static get FullScreen(): boolean {
    return this.settings.screen.fullscreen;
  }
  public static set FullScreen(value: boolean) {
    this.settings.screen.fullscreen = value;
  }

  public static parseFromSettings(settings: any) {
    try {
      Setting.settings = settings;
      console.log(`Loaded settings: `, this.settings);
    } catch (err) {
      console.error(`Load settings failed:`, err);
    }
  }
}
