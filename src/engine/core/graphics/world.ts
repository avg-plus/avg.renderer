import * as PIXI from "pixi.js";

import { Sprite } from "./sprite";
import { Scene } from "./scene";
import { HookManager } from "engine/plugin/hooks/hook-manager";
import { HookEvents } from "engine/plugin/hooks/hook-events";
import { ScalingAdaptor } from "./scaling-adaptor";

export class GameWorld {
  static scenes: Scene[] = [];
  public static app: PIXI.Application;
  static _defaultScene: Scene;

  static parentElement: HTMLElement;
  static worldWidth: number;
  static worldHeight: number;

  static adaptor: ScalingAdaptor;

  static init(
    parentElement: HTMLElement,
    width: number = 1920,
    height: number = 1080
  ) {
    // [16: 9] - 800x450, 1024x576, 1280x760, 1920x1080

    console.log("Init game world instance ");
    

    this.worldWidth = width;
    this.worldHeight = height;

    this.parentElement = parentElement;

    this.app = new PIXI.Application({
      width,
      height,
      forceFXAA: true,
      antialias: true,
      preserveDrawingBuffer: true,
      transparent: true,
      backgroundColor: 0,
      resizeTo: this.parentElement,
      resolution: 1
    });


    this.adaptor = new ScalingAdaptor();

    // Show FPSPanel
    // const fpsElement = document.getElementById("fps");
    this.app.ticker.add(() => {
      //   fpsElement.innerHTML = GameWorld.app.ticker.FPS.toPrecision(2) + " fps";
      this.adaptor.beginBuffer();
      HookManager.triggerHook(HookEvents.GameUpdate);
      this.adaptor.endBuffer();
    });

    this._defaultScene = new Scene(this.app, this.worldWidth, this.worldHeight);
    this.addScene(this._defaultScene);
    window.onresize = () => {
      this.adaptor.resize(this.parentElement.clientWidth, this.parentElement.clientHeight);
    }
    /*window.onresize = () => {
      this.app.resize();
      
      this.scenes.map(scene => {
        scene.onResize();
      });
    };*/

    // DebugPanel.init();
  }

  public static get defaultScene() {
    return this._defaultScene;
  }

  public static addScene(scene: Scene) {
    this.scenes.push(scene);
    this.parentElement.appendChild(scene.getView());
  }

  public transitionTo(scene: Scene, scene2: Sprite, effect?: number) { }
}
