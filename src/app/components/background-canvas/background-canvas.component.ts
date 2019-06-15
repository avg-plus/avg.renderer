import { Sprite } from "./../../common/graphics/sprite";
import { LayerOrder } from "./../../common/graphics/layer-order";
import { GameWorld } from "./../../common/graphics/world";
import { Component, OnInit, AfterViewInit, ElementRef, ChangeDetectorRef, AfterContentInit } from "@angular/core";

import { Effects } from "app/common/effects/effects";
import { GameDef } from "app/common/game-def";

// import * as PIXI from "pixi.js";
// import * as particles from "pixi-particles";
import * as avg from "avg-engine/engine";
import { AnimationUtils } from "../../common/animations/animation-utils";
import { DomSanitizer } from "@angular/platform-browser";
import { Setting } from "avg-engine/engine";

class SceneModel {
  public scene: avg.Scene;
  public incommingNewScene: avg.Scene;
  public maskTransitionEffect: string;
  public styles: any;
}

@Component({
  selector: "background-canvas",
  templateUrl: "./background-canvas.component.html",
  styleUrls: ["./background-canvas.component.scss"]
})
export class BackgroundCanvasComponent implements OnInit, AfterViewInit, AfterContentInit {
  private readonly _defaultDuration = 0;
  // private mainScene: Scene;
  private currentBackgroundSprite: Sprite;

  transitionList = ["iris-in", "iris-out", "wipe", "window-shades", "brush", "brush-down", "crossfade"];

  public scenes: Array<SceneModel> = new Array<SceneModel>(GameDef.MaxBackgroundLayers);

  constructor(private elementRef: ElementRef, public sanitizer: DomSanitizer) {
    // this.stylesheetService.initMaskStylesheets();
  }

  ngOnInit() {}

  ngAfterViewInit() {
    const viewport = this.elementRef.nativeElement.querySelector("#avg-viewport");

    // Init world
    GameWorld.init(viewport, Setting.WindowWidth, Setting.WindowHeight);
  }

  ngAfterContentInit() {}

  public reset() {
    this.scenes = [];
    this.scenes = new Array<SceneModel>(GameDef.MaxBackgroundLayers);
  }

  public async removeBackground(): Promise<any> {
    // this.mainScene.removeSprite("scene");
  }

  public async setBackground(scene: avg.APIScene): Promise<any> {
    const data = scene.data;

    const file = data.file.filename;

    const DefaultSceneName = "scene";

    if (this.currentBackgroundSprite) {
      // 把要设置的图片先放到底层
      const incommingSprite = await GameWorld.defaultScene.addFromImage(file, file, LayerOrder.BottomLayer);

      // 开始淡出当前背景图
      await AnimationUtils.animateTo(this.currentBackgroundSprite, 1000, {
        alpha: 0
      });
      GameWorld.defaultScene.removeSprite(DefaultSceneName);

      incommingSprite.name = DefaultSceneName;
      this.currentBackgroundSprite = incommingSprite;
    } else {
      this.currentBackgroundSprite = await GameWorld.defaultScene.addFromImage(
        DefaultSceneName,
        file,
        LayerOrder.TopLayer
      );
    }
  }

  public async cssFilter(effect: avg.Effect) {
    effect.duration = effect.duration || 0;
    const elementID = "#avg-viewport";

    await AnimationUtils.animateCssFilter(elementID, effect.effectName, effect.duration, effect.strength);
  }

  // public moveTo(index: number, duration: number, x: number) {
  //   AnimationUtils.to("MoveTo", ".layer-" + index, duration, {
  //     x: x
  //   });
  // }

  rain() {
    Effects.rain();
  }

  snow() {
    Effects.snow();
  }

  sakura() {
    Effects.sakura();
  }

  cloud() {
    Effects.cloud();
  }

  shake() {
    const viewport = this.elementRef.nativeElement.querySelector("#avg-viewport");

    if (viewport) {
      // Effects.shake(viewport);
    }
  }
}
