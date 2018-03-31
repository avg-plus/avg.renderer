import { FPSCtrl } from '../fps-ctrl';

export class AnimationUtils {

    public static fadeOut(sprite: PIXI.Sprite, duration: number = 300, callback?: () => void) {
        let fade = new FPSCtrl(duration, (frame) => {
            if (sprite.alpha <= 0) {
                fade.pause();

                if (callback !== null) {
                    callback();
                }
                return;
            }

            sprite.alpha -= 1 / (duration / fade.frameRate());
        });

        fade.start();
    }

    public static fadeIn(sprite: PIXI.Sprite, duration: number = 300, callback?: () => void) {
        let fade = new FPSCtrl(duration, (frame) => {
            if (sprite.alpha >= 1) {
                fade.pause();
                if (callback !== null) {
                    callback();
                }
                return;
            }

            sprite.alpha += 1 / (duration / fade.frameRate());
        });

        fade.start();
    }
}
