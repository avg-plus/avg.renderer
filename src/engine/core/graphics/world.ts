import * as PIXI from "pixi.js";

import { Sprite } from "./sprite";
import { Scene } from "./scene";
import { DebugPanel } from "app/common/debugger/debug-panel";
import { HookManager } from "engine/plugin/hooks/hook-manager";
import { HookEvents } from "engine/plugin/hooks/hook-events";
import { DropFlakeParticle } from "./shaders/drop-flake/drop-flake";
import { AVGNativePath } from "../native-modules/avg-native-path";
import { GameResource } from "../resource";
import { ScalingAdaptor } from "./scaling-adaptor";

class World {
  scenes: Scene[] = [];
  public app: PIXI.Application;
  _defaultScene: Scene;

  parentElement: HTMLElement;
  worldWidth: number;
  worldHeight: number;

  adaptor: ScalingAdaptor;

  async init(
    parentElement: HTMLElement,
    width: number = 1920,
    height: number = 1080
  ) {
    // [16: 9] - 800x450, 1024x576, 1280x760, 1920x1080

    this.worldWidth = width;
    this.worldHeight = height;

    this.parentElement = parentElement;

    this.app = new PIXI.Application({
      width,
      height,
      antialias: false,
      preserveDrawingBuffer: true,
      transparent: true,
      backgroundColor: 0,
      resizeTo: this.parentElement,
      resolution: 1
    });

    console.log("webGLVersion", this.app.renderer.context.webGLVersion) 


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

  public get defaultScene() {
    return this._defaultScene;
  }

  public addScene(scene: Scene) {
    this.scenes.push(scene);
    this.parentElement.appendChild(scene.getView());
  }

  public transitionTo(scene: Scene, scene2: Sprite, effect?: number) { }
}

export const GameWorld = new World();
