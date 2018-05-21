import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  ChangeDetectorRef,
  AfterContentInit,
  Input
} from "@angular/core";

import { Effects } from "app/common/effects/effects";
import { GameDef } from "app/common/game-def";

import * as PIXI from "pixi.js";
import * as particles from "pixi-particles";
import * as avg from "avg-engine/engine";
import * as gsap from "gsap";
import * as Parallax from "parallax-js";
import { element } from "protractor";
import { AnimationUtils } from "../../common/animations/animation-utils";
import { DomSanitizer } from "@angular/platform-browser";
import * as $ from "jquery";
import { EngineUtils } from "avg-engine/engine";

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
export class BackgroundCanvasComponent
  implements OnInit, AfterViewInit, AfterContentInit {
  private readonly _defaultDuration = 1000;
  private readonly ViewportElement = "#avg-viewport";

  transitionList = [
    "iris-in",
    "iris-out",
    "wipe",
    "window-shades",
    "brush",
    "brush-down",
    "crossfade"
  ];

  public scenes: Array<SceneModel> = new Array<SceneModel>(
    GameDef.MaxBackgroundLayers
  );

  constructor(
    private elementRef: ElementRef,
    private changeDetectorRef: ChangeDetectorRef,
    public sanitizer: DomSanitizer
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    // ParticleEffect.snow();
  }

  ngAfterContentInit() {}

  public reset() {
    this.scenes = [];
    this.scenes = new Array<SceneModel>(GameDef.MaxBackgroundLayers);
  }

  public async removeBackground(index: number): Promise<any> {
    const model = this.scenes[index];
    if (!model || model === undefined) {
      console.log("Remove failed, model is undefined.");
      return;
    }

    const duration = this._defaultDuration || 1000;
    const frontLayerElement = ".layer-" + index;

    return new Promise((resolve, reject) => {
      AnimationUtils.fadeTo(frontLayerElement, duration, 0, () => {
        this.scenes[index] = undefined;
        this.changeDetectorRef.detectChanges();
        resolve();
      });
    });
  }

  public async setBackground(scene: avg.APIScene): Promise<any> {
    const data = scene.data;

    const transform = data.transform;
    const file = data.file.filename;
    const index = scene.index;
    const duration = data.duration || this._defaultDuration;
    const transitionName = data.transition || "crossfade";

    if (!file || file.length === 0) {
      console.warn("Background filename is empty");
    }

    if (index >= GameDef.MaxBackgroundLayers) {
      console.error(
        "Index is greater than MaxBackgroundLayers. Index = " + index
      );
      return;
    }

    let model = this.scenes[index];
    const hadSceneBefore = model !== undefined || model === null;

    if (hadSceneBefore) {
      model.scene = this.scenes[index].scene; // Keep old scene
      model.incommingNewScene = data;
    } else {
      model = new SceneModel();
      model.scene = data;
      model.incommingNewScene = data;
    }

    if (transform.stretch) {
      transform.width = "100%";
      transform.height = "100%";
    }

    const cacheImage = async imgFile => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = imgFile;
        img.onload = () => {
          setTimeout(() => {
            resolve();
          }, 100);
        };
      });
    };

    await cacheImage(model.scene.file.filename);
    await cacheImage(model.incommingNewScene.file.filename);

    const background = "url(" + model.scene.file.filename + ")";
    const incommingBackground =
      "url(" + model.incommingNewScene.file.filename + ")";

    return new Promise((resolve, reject) => {
      const backgroundID = "background-layer-" + index;
      const maskID = "mask-layer-" + index;

      this.scenes[index] = model;
      this.changeDetectorRef.detectChanges();

      const maskElement = document.getElementById(maskID);
      const backgroundElenent = document.getElementById(backgroundID);

      maskElement.style.width = transform.width;
      maskElement.style.height = transform.height;
      maskElement.style.left = transform.x;
      maskElement.style.top = transform.y;
      maskElement.style.background = background;

      // Set animtion duration
      maskElement.style.animationDuration = duration / 1000 + "s";

      backgroundElenent.style.width = transform.width;
      backgroundElenent.style.height = transform.height;
      backgroundElenent.style.left = transform.x;
      backgroundElenent.style.top = transform.y;
      backgroundElenent.style.background = incommingBackground;

      const animationTokens = ["scene-mask-transition", transitionName];

      maskElement.classList.add(animationTokens[0], animationTokens[1]);

      // Waiting animation finished
      setTimeout(() => {
        maskElement.classList.remove(animationTokens[0], animationTokens[1]);

        maskElement.style.background = incommingBackground;
        model.scene = data;
        this.changeDetectorRef.detectChanges();

        resolve();
      }, duration + 100);
    });
  }

  public colorBlend(effect: avg.Effect) {
    effect.duration = effect.duration || 1000;
    const blur = (effect.strength || 4) * 1;

    const backgroundID = ".background-image";
    const maskID = ".mask-image";

    $(backgroundID).css("backgroundColor", "red");
    $(maskID).css("backgroundColor", "red");
  }

  public cssFilter(effect: avg.Effect) {
    effect.duration = effect.duration || 1000;

    const FILTERS = new Map([
      ["blur", "px"],
      ["brightness", "%"],
      ["contrast", "%"],
      ["grayscale", "%"],
      ["hue-rotate", "deg"],
      ["invert", "%"],
      ["opacity", "%"],
      ["saturate", "%"],
      ["sepia", "%"]
    ]);

    FILTERS.forEach((v, k) => {
      if (v === effect.effectName) {
        console.warn("Effect Name {0} not found.", effect.effectName);
        return;
      }
    });

    let value = (effect.strength || 0) * 1;
    value = EngineUtils.NumericRange(value, 0, 100);

    if (effect.effectName === "hue-rotate") {
      value = value * (360 / 100); // normalize to 360
    }

    const element = "#avg-viewport";
    AnimationUtils.to("filter:" + effect.effectName, element, effect.duration, {
      onUpdateParams: ["{self}"],
      onUpdate: tween => {
        $(element).css(
          "filter",
          effect.effectName +
            "(" +
            tween.progress() * value +
            FILTERS.get(effect.effectName) +
            ")"
        );
      }
    });
  }

  public blur(effect: avg.Effect) {
    effect.duration = effect.duration || 1000;
    const blur = (effect.strength || 4) * 1;

    const element = "#avg-viewport";
    AnimationUtils.to("blur", element, effect.duration, {
      onUpdateParams: ["{self}"],
      onUpdate: tween => {
        $(element).css("filter", "blur(" + tween.progress() * blur + "px)");
      }
    });
  }

  public hueRotate(effect: avg.Effect) {
    effect.duration = effect.duration || 1000;
    const hue = (effect.strength || 50) * 1;

    const element = "#avg-viewport";
    AnimationUtils.to("hueRotate", element, effect.duration, {
      onUpdateParams: ["{self}"],
      onUpdate: tween => {
        $(element).css(
          "filter",
          "hue-rotate(" + tween.progress() * hue + "deg)"
        );
      }
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
    const viewport = this.elementRef.nativeElement.querySelector(
      "#avg-viewport"
    );

    if (viewport) {
      // Effects.shake(viewport);
    }
  }
}
