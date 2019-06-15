import { Sprite } from "./sprite";
import { Scene } from "./scene";
import { LayerOrder } from "./layer-order";

class World {
  scenes: Scene[] = [];
  _defaultScene: Scene;

  parentElement: HTMLElement;
  worldWidth: number;
  worldHeight: number;

  init(parentElement: HTMLElement, width: number = 1920, height: number = 1080) {
    this.worldWidth = width;
    this.worldHeight = height;

    this.parentElement = parentElement;

    this._defaultScene = new Scene(this.worldWidth, this.worldHeight);
    this.addScene(this._defaultScene);

    window.onresize = () => {
      this.scenes.map(scene => {
        scene.onResize();
        scene.renderer.resize(window.innerWidth, window.innerHeight);
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
