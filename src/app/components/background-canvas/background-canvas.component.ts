import { Component, OnInit, AfterViewInit, ElementRef } from "@angular/core";
import { FPSCtrl } from "app/common/fps-ctrl";
import { AnimationUtils } from "app/common/animations/animation-utils";
import { SceneAnimation } from "app/common/animations/scene-animation";
import { Effects } from "app/common/effects/effects";
import { GameDef } from "app/common/game-def";

import * as path from "path";
import * as PIXI from "pixi.js";
import * as particles from "pixi-particles";
import * as avg from "avg-engine/engine";
import * as gsap from "gsap";

class SceneModel {
  public scene: avg.Scene;
  public styles: any;
}

@Component({
  selector: "background-canvas",
  templateUrl: "./background-canvas.component.html",
  styleUrls: ["./background-canvas.component.scss"]
})
export class BackgroundCanvasComponent implements OnInit, AfterViewInit {
  private readonly _duration = 500;
  private readonly ViewportElement = "#avg-viewport";

  public scenes: Array<SceneModel> = new Array<SceneModel>(
    GameDef.MaxBackgroundLayers
  );

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {}

  ngAfterViewInit() {}

  public async setBackground(scene: avg.APIScene): Promise<any> {
    const data = scene.data;
    const transform = data.transform;
    const file = data.file.filename;
    const index = scene.index;
    let duration = data.duration;

    if (index >= GameDef.MaxBackgroundLayers) {
      console.error(
        "Index is greater than MaxBackgroundLayers. Index = " + index
      );
      return;
    }

    duration = duration || this._duration;

    const model = new SceneModel();
    model.scene = data;

    if (transform.stretch) {
      transform.width = "100%";
      transform.height = "100%";
    }

    model.styles =
      transform === undefined
        ? {}
        : {
            width: transform.width,
            height: transform.height,
            left: transform.x,
            top: transform.y
          };

    return new Promise((resolve, reject) => {
      console.log(model);
      this.scenes[index] = model;
      resolve();
    });
  }

  public async setBackgroundAnimation(
    layerIndex: number = 0,
    duration: number,
    animation: any
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        SceneAnimation.fadeTo(".layer-" + layerIndex, 255, 10000);
      }, 1);
    });
  }

  loadParticleEffect() {}

  public blur(index: number, effect: avg.Effect) {
    const blur = effect.strength * 1 + "px";

    console.log("blur strength = " + blur);
    gsap.TweenLite.to(".layer-" + index, 10, {
      css: { filter: "blur(" + blur + ")" }
    });
  }

  public moveTo(index: number, duration: number, x: number) {
    AnimationUtils.to("MoveTo", ".layer-" + index, duration, {
      x: x
    });
  }

  public transparent(index: number, to: number, duration: number) {
    console.log("transparent " + index);
    AnimationUtils.fadeTo(".layer-" + index, duration, to);
  }

  rain() {
    const canvas = this.elementRef.nativeElement.querySelector(
      "#avg-particle-viewport"
    );
    if (canvas) {
      Effects.rain(canvas);
    }
  }

  snow() {
    const canvas = this.elementRef.nativeElement.querySelector(
      "#avg-particle-viewport"
    );
    if (canvas) {
      Effects.snow(canvas);
    }
  }

  shake() {
    const viewport = this.elementRef.nativeElement.querySelector(
      "#avg-viewport"
    );

    if (viewport) {
      Effects.shake(viewport);
    }
  }
}
