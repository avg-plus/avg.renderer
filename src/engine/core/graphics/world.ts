import * as PIXI from "pixi.js";

import { Sprite } from "./sprite";
import { Scene } from "./scene";

class World {
  scenes: Scene[] = [];
  _defaultScene: Scene;

  parentElement: HTMLElement;
  worldWidth: number;
  worldHeight: number;

  init(parentElement: HTMLElement, width: number = 1920, height: number = 1080) {
    // [16: 9] - 800x450, 1024x576, 1280x760, 1920x1080

    this.worldWidth = width;
    this.worldHeight = height;

    this.parentElement = parentElement;

    const app = new PIXI.Application({
      width,
      height,
      antialias: false,
      transparent: false,
      resolution: 1
    });

    this._defaultScene = new Scene(app, this.worldWidth, this.worldHeight);
    this.addScene(this._defaultScene);

    window.onresize = () => {
      this.scenes.map(scene => {
        scene.onResize();
        app.renderer.resize(window.innerWidth, window.innerHeight);
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
