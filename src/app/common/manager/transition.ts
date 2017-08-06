import * as avg from 'avg-engine/engine';
import * as PIXI from 'pixi.js';
import { FPSCtrl, Frame } from '../fps-ctrl';

export class Transition implements avg.Transition {

    private _transitionScreen: PIXI.Application;
    private _element: any;
    private _graphics: PIXI.Graphics;
    private _isInit = false;

    public init(element: any) {
        if (this._isInit) {
            console.log(`Transition has been initialized.`);
            return;
        }

        if (!element) {
            throw new Error('Transition element could not be NULL');
        }

        this._element = element;

        const screen = avg.game.getResolution();

        // Create pixi handle
        this._transitionScreen = new PIXI.Application(screen.width, screen.height, { antialias: true, transparent: true });

        // Draw backdrop
        this._graphics = new PIXI.Graphics();
        this._graphics.beginFill(0x00, 1);
        this._graphics.drawRect(0, 0, screen.width, screen.height);

        this._transitionScreen.stage.addChild(this._graphics);

        // Append to canvas element
        element.appendChild(this._transitionScreen.view);
    }

    public fadeEnter(color: number, duration?: number, callback?: () => void) {

        duration = duration || 1000;

        this._graphics.beginFill(color, 1);
        this._graphics.drawRect(0, 0, screen.width, screen.height);

        let fade = new FPSCtrl(duration, (frame: Frame) => {
            console.log(frame);
            if (this._graphics.alpha >= 1) {
                fade.pause();

                if (callback) {
                    callback()
                }

                return;
            }

            this._graphics.alpha += 1 / (duration / fade.frameRate());
        });

        fade.start();
    }

    public fadeLeave(color: number, duration?: number, callback?: () => void) {
        duration = duration || 1000;

        this._graphics.beginFill(color, 1);
        this._graphics.drawRect(0, 0, screen.width, screen.height);

        let fade = new FPSCtrl(duration, (frame: Frame) => {
            // console.log(frame);

            if (this._graphics.alpha <= 0) {
                fade.pause();
                if (callback) {
                    callback()
                }

                return;
            }

            this._graphics.alpha -= 1 / (duration / fade.frameRate());
        });

        fade.start();
    }
}

export const transition = new Transition();
