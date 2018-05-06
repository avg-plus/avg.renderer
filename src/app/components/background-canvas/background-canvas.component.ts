import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  ChangeDetectorRef,
  AfterContentInit,
  Input
} from "@angular/core";
import { FPSCtrl } from "app/common/fps-ctrl";
// import { SceneAnimation } from "app/common/animations/scene-animation";
import { Effects } from "app/common/effects/effects";
import { GameDef } from "app/common/game-def";

import * as PIXI from "pixi.js";
import * as particles from "pixi-particles";
import * as avg from "avg-engine/engine";
import * as gsap from "gsap";
import * as Parallax from "parallax-js";
import { element } from "protractor";
import { AnimationUtils } from "../../common/animations/animation-utils";

class SceneModel {
  public scene: avg.Scene;
  public incommingNewScene: avg.Scene;
  public styles: any;
}

@Component({
  selector: "background-canvas",
  templateUrl: "./background-canvas.component.html",
  styleUrls: ["./background-canvas.component.scss"]
})
export class BackgroundCanvasComponent
  implements OnInit, AfterViewInit, AfterContentInit {
  private readonly _duration = 500;
  private readonly ViewportElement = "#avg-viewport";

  public scenes: Array<SceneModel> = new Array<SceneModel>(
    GameDef.MaxBackgroundLayers
  );

  constructor(
    private elementRef: ElementRef,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {}

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

    const duration = this._duration;
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
    let duration = data.duration;

    if (!file || file.length === 0) {
      console.warn("Background filename is empty");
    }

    if (index >= GameDef.MaxBackgroundLayers) {
      console.error(
        "Index is greater than MaxBackgroundLayers. Index = " + index
      );
      return;
    }

    duration = duration || this._duration;

    let model = this.scenes[index];
    const hadSceneBefore = model !== undefined;

    if (model === undefined) {
      model = new SceneModel();
      model.scene = data;
    } else {
      model.scene = this.scenes[index].scene; // Keep old scene
    }

    model.incommingNewScene = data;

    if (transform.stretch) {
      transform.width = "100%";
      transform.height = "100%";
    }

    model.styles =
      transform === undefined
        ? {}
        : {
            opacity: 0,
            width: transform.width,
            height: transform.height,
            left: transform.x,
            top: transform.y
          };

    this.changeDetectorRef.detectChanges();

    return new Promise((resolve, reject) => {
      const default_duration = 2000;
      const frontLayerElement = ".layer-" + index;
      const backLayerElement = ".layer-" + index + "-back";

      this.scenes[index] = model;
      this.changeDetectorRef.detectChanges();

      if (hadSceneBefore) {
        // back is incomming scene, set it to opacity 1
        AnimationUtils.fadeTo(backLayerElement, 1, 1, () => {
          // FadeOut front layer
          AnimationUtils.fadeTo(frontLayerElement, default_duration, 0, () => {
            // Set front layer to back layer
            this.scenes[index].scene = this.scenes[index].incommingNewScene;
            this.changeDetectorRef.detectChanges();

            AnimationUtils.fadeTo(
              frontLayerElement,
              default_duration,
              1,
              () => {
                this.scenes[index].incommingNewScene = null;
                this.changeDetectorRef.detectChanges();
              }
            );
          });
        });
      } else {
        AnimationUtils.fadeTo(frontLayerElement, default_duration, 1, () => {
          this.scenes[index].incommingNewScene = null;
          this.changeDetectorRef.detectChanges();
        });
      }

      resolve();
    });
  }

  loadParticleEffect() {}

  public blur(index: number, effect: avg.Effect) {
    effect.duration = effect.duration || 500;
    const blur = effect.strength * 1;

    const element = ".layer-" + index;
    gsap.TweenLite.to(element, effect.duration / 1000, {
      onUpdateParams: ["{self}"],
      onUpdate: tween => {
        gsap.TweenMax.set(element, {
          webkitFilter: "blur(" + tween.progress() * effect.strength + "px)"
        });
        this.changeDetectorRef.detectChanges();
      }
    });
  }

  public hueRotate(index: number, effect: avg.Effect) {
    effect.duration = effect.duration || 500;
    const blur = effect.strength * 1;

    const element = ".layer-" + index;
    gsap.TweenLite.to(element, effect.duration / 1000, {
      onUpdateParams: ["{self}"],
      onUpdate: tween => {
        gsap.TweenMax.set(element, {
          webkitFilter:
            "hue-rotate(" + tween.progress() * effect.strength + "deg)"
        });
        this.changeDetectorRef.detectChanges();
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
