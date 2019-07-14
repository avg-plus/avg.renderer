import * as PIXI from "pixi.js";

import { Sprite } from "./sprite";
import { Scene } from "./scene";
import { DebugPanel } from "app/common/debugger/debug-panel";

class World {
  scenes: Scene[] = [];
  app: PIXI.Application;
  _defaultScene: Scene;

  parentElement: HTMLElement;
  worldWidth: number;
  worldHeight: number;

  init(parentElement: HTMLElement, width: number = 1920, height: number = 1080) {
    // [16: 9] - 800x450, 1024x576, 1280x760, 1920x1080

    this.worldWidth = width;
    this.worldHeight = height;

    this.parentElement = parentElement;

    this.app = new PIXI.Application({
      width,
      height,
      antialias: false,
      transparent: false,
      resolution: 1
    });
    GameWorld.app.ticker.speed = 2;

    // Show FPSPanel
    const fpsElement = document.getElementById("fps");
    this.app.ticker.add(() => {
      fpsElement.innerHTML = GameWorld.app.ticker.FPS.toPrecision(2) + " fps";
    });

    DebugPanel.init();

    this._defaultScene = new Scene(this.app, this.worldWidth, this.worldHeight);
    this.addScene(this._defaultScene);

    window.onresize = () => {
      this.scenes.map(scene => {
        this.app.renderer.resize(window.innerWidth, window.innerHeight);
        scene.onResize();
      });
    };
  }

  public get defaultScene() {
    return this._defaultScene;
  }

  public addScene(scene: Scene) {
    this.scenes.push(scene);
    this.parentElement.appendChild(scene.getView());
  }

  public transitionTo(scene: Scene, scene2: Sprite, effect?: number) {}
}

export const GameWorld = new World();
