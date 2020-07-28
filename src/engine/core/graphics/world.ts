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

import { Button } from "./ui/button";
import { SpriteType } from 'engine/const/sprite-type';

class World {
  scenes: Scene[] = [];
  public app: PIXI.Application;
  _defaultScene: Scene;

  parentElement: HTMLElement;
  worldWidth: number;
  worldHeight: number;

  method : ScalingMethod;
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
      antialias: true,
      preserveDrawingBuffer: true,
      transparent: true,
      backgroundColor: 0,
      resizeTo: this.parentElement,
      resolution: 1
    });

    //this.adaptor = new ScalingAdaptor();
    this.method = ScalingMethod.AUTO;

    // Show FPSPanel
    // const fpsElement = document.getElementById("fps");
    this.app.ticker.add(() => {
      //   fpsElement.innerHTML = GameWorld.app.ticker.FPS.toPrecision(2) + " fps";
      //this.adaptor.beginBuffer();
      HookManager.triggerHook(HookEvents.GameUpdate);
      //this.adaptor.endBuffer();
    });

    this._defaultScene = new Scene(this.app, this.worldWidth, this.worldHeight);
    this.addScene(this._defaultScene);
    window.onresize = () => {
      let m = this.method;
      if (m === ScalingMethod.AUTO) {
        if (this.parentElement.clientWidth / this.parentElement.clientHeight > this.worldWidth / this.worldHeight) {
          m = ScalingMethod.ACCORDING_TO_HEIGHT;
        } else {
          m = ScalingMethod.ACCORDING_TO_WIDTH;
        }
      }

      let edgeRatio = 0;
      switch (m) {
        case ScalingMethod.ACCORDING_TO_WIDTH:
          edgeRatio = this.parentElement.clientWidth / this.worldWidth;
          break;
        case ScalingMethod.ACCORDING_TO_HEIGHT:
          edgeRatio = this.parentElement.clientHeight / this.worldHeight;
          break;
        default:
        // TODO: throw exception
      }
      this.app.stage.scale.x = this.app.stage.scale.y = edgeRatio;
      
      this.app.stage.x = (this.parentElement.clientWidth - this.app.stage.width) / 2.0;
      this.app.stage.y = (this.parentElement.clientHeight - this.app.stage.height) / 2.0;
      //this.adaptor.resize(this.parentElement.clientWidth, this.parentElement.clientHeight);
    }

    let foo = new Button({
      x : 50,
      y : 50,
      width: 200,
      height: 200,
      images: {
        normal : './data/icons/ufo-2.png',
        hover : './data/icons/ufo-1.png'
      }
    });
    this._defaultScene.addSprite("Button1", foo, 999);
    foo.onClick(function() {
      console.log(this);
    });



    
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

  public transitionTo(scene: Scene, scene2: Sprite, effect?: number) {}
}

export const enum ScalingMethod {
  AUTO,                                       // 保证显示完全的前提下自动选择
  ACCORDING_TO_WIDTH,                         // 按照宽度确定缩放比例
  ACCORDING_TO_HEIGHT                         // 按照高度确定缩放比例
}

export const GameWorld = new World();
global["GameWorld"] = GameWorld;
