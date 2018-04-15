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

@Component({
  selector: "background-canvas",
  templateUrl: "./background-canvas.component.html",
  styleUrls: ["./background-canvas.component.scss"]
})
export class BackgroundCanvasComponent implements OnInit, AfterViewInit {
  private readonly _duration = 500;

  private readonly ViewportElement = "#avg-viewport";

  public backgroundImages: Array<string> = new Array<string>(
    GameDef.MaxBackgroundLayers
  );

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {}

  ngAfterViewInit() {}

  public async setBackground(scene: avg.APIScene): Promise<any> {
    let data = scene.data;

    let file = data.file.filename;
    let duration = data.duration;
    let layerIndex = scene.index;

    if (layerIndex >= GameDef.MaxBackgroundLayers) {
      return;
    }

    duration = duration || this._duration;

    return new Promise((resolve, reject) => {
      this.backgroundImages[layerIndex] = file;
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

  public blur(strength: number, duration: number = 1000) {
    let blur = strength * 1 + "px";

    console.log("blur strength = " + blur);
    gsap.TweenLite.to(this.ViewportElement, 10, {
      css: { filter: "blur(" + blur + ")" }
    });
  }

  public transparent(duration: number) {
    gsap.TweenLite.to("target", duration, {

    });
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
