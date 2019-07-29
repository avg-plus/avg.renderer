import * as PIXI from "pixi.js";

import { Sprite } from "./sprite";
import { Scene } from "./scene";
import { DebugPanel } from "app/common/debugger/debug-panel";
import { HookManager } from "engine/plugin/hooks/hook-manager";
import { HookEvents } from "engine/plugin/hooks/hook-events";
import { DropFlakeParticle } from "./shaders/drop-flake/drop-flake";
import { AVGNativePath } from "../native-modules/avg-native-path";
import { GameResource } from "../resource";

class World {
  scenes: Scene[] = [];
  public app: PIXI.Application;
  _defaultScene: Scene;

  parentElement: HTMLElement;
  worldWidth: number;
  worldHeight: number;

  async init(parentElement: HTMLElement, width: number = 1920, height: number = 1080) {
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

    // Show FPSPanel
    const fpsElement = document.getElementById("fps");
    this.app.ticker.add(() => {
      fpsElement.innerHTML = GameWorld.app.ticker.FPS.toPrecision(2) + " fps";

      HookManager.triggerHook(HookEvents.GameUpdate);
    });

    this._defaultScene = new Scene(this.app, this.worldWidth, this.worldHeight);
    this.addScene(this._defaultScene);

    console.log(AVGNativePath.join(GameResource.getDataRoot(), "./effects/flake-texture/rain.png"));
    
    await DropFlakeParticle.init(
      {
        count: 5000, // 粒子数量
        alpha: 0.6, // 透明系数
        depth: 60, // 镜头深度
        gravity: 60, // 下坠重力
        autoWind: true,
        wind: {
          force: 0.1, // 风力
          min: -0.2,
          max: 0.1,
          easing: 0.1
        }
      },
      AVGNativePath.join(GameResource.getDataRoot(), "./effects/flake-texture/rain.png")
    );

    // setInterval(() => {
    //   DropFlakeParticle.update({
    //     count: 5000, // 粒子数量
    //     alpha: 0.6, // 透明系数
    //     depth: 60, // 镜头深度
    //     gravity:  1100, // 下坠重力
    //     autoWind: true,
    //     wind: {
    //       force: 0.01, // 风力
    //       min: 0,
    //       max: 0,
    //       easing: 0.01
    //     }
    //   });
    // }, 2000);

    window.onresize = () => {
      this.scenes.map(scene => {
        this.app.renderer.resize(window.innerWidth, window.innerHeight);
        scene.onResize();
      });
    };

    DebugPanel.init();
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
