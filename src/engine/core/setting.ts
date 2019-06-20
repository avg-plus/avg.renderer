import { Screen } from '../const/model';
import { EngineUtils } from './engine-utils';

export class Setting {
    private static settings: any = {
        screen: {
            width: 1366,
            height: 768,
            fullscreen: false,
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

    public static get TextSpeed(): number { return this.settings.game.text_speed; }
    public static set TextSpeed(value: number) {
        EngineUtils.NumericRange(value, 0, 100);
        this.settings.game.text_speed = value;
    }
    public static get AutoPlay(): boolean { return this.settings.game.auto_play; }
    public static set AutoPlay(value: boolean) { this.settings.game.auto_play = value; }
    public static get AutoPlaySpeed(): number { return this.settings.game.auto_play_speed; }
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

    public static setVolume(track: string = "default", value: number) {

        EngineUtils.NumericRange(value, 0, 100);
        this.settings.game.sound[track] = value;        
        // this.settings.game.sound.bgm = value;
    }

    // public static get BGMVolume(): number { return this.settings.game.sound.bgm; }
    // public static set BGMVolume(value: number) {
    //     EngineUtils.NumericRange(value, 0, 100);
    //     this.settings.game.sound.bgm = value;
    // }
    // public static get BGSVolume(): number { return this.settings.game.sound.bgs; }
    // public static set BGSVolume(value: number) {
    //     EngineUtils.NumericRange(value, 0, 100);
    //     this.settings.game.sound.bgs = value;

    // }
    // public static get SEVolume(): number { return this.settings.game.sound.se; }
    // public static set SEVolume(value: number) {
    //     EngineUtils.NumericRange(value, 0, 100);
    //     this.settings.game.sound.se = value;
    // }
    // public static get VoiceVolume(): number { return this.settings.game.sound.voice; }
    // public static set VoiceVolume(value: number) {
    //     EngineUtils.NumericRange(value, 0, 100);
    //     this.settings.game.sound.voice = value;
    // }
    public static get WindowWidth(): number { return this.settings.screen.width; }
    public static set WindowWidth(value: number) { this.settings.screen.width = value }
    public static get WindowHeight(): number { return this.settings.screen.height; }
    public static set WindowHeight(value: number) { this.settings.screen.height = value }
    public static get FullScreen(): boolean { return this.settings.screen.fullscreen; }
    public static set FullScreen(value: boolean) { this.settings.screen.fullscreen = value }

    public static parseFromSettings(settings: string) {
        try {
            Setting.settings = JSON.parse(settings);
            console.log(`Loaded settings: `, this.settings);
        } catch (err) {
            console.error(`Load settings failed:`, err);
        }
    }


}