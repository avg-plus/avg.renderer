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

// import * as PIXI from "pixi.js";
// import * as particles from "pixi-particles";
import * as avg from "avg-engine/engine";
import * as Parallax from "parallax-js";
import { element } from "protractor";
import { AnimationUtils } from "../../common/animations/animation-utils";
import { DomSanitizer } from "@angular/platform-browser";
import * as $ from "jquery";
import { EngineUtils } from "avg-engine/engine";
import { StylesheetService } from "../../common/stylesheet-service";
import { Camera2D } from "app/common/animations/camera2d";
import { CameraDirector, DirectLayers } from "../../common/animations/camera-director";

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
  private readonly ViewportElement = "#avg-viewport";

  transitionList = ["iris-in", "iris-out", "wipe", "window-shades", "brush", "brush-down", "crossfade"];

  public scenes: Array<SceneModel> = new Array<SceneModel>(GameDef.MaxBackgroundLayers);

  constructor(
    private elementRef: ElementRef,
    private changeDetectorRef: ChangeDetectorRef,
    public sanitizer: DomSanitizer,
    private stylesheetService: StylesheetService
  ) {
    this.stylesheetService.initMaskStylesheets();
  }

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

    // const transform = data.transform;
    const renderer = data.renderer;
    const file = data.file.filename;
    const index = scene.index;
    const duration = data.duration || this._defaultDuration;
    let transitionName = data.transition || "crossfade";
    // if (!transitionName) {
    //   duration = 0;
    // }

    if (transitionName === "random") {
      // const randomIndex = Math.floor(Math.random() * (this.transitionList.length - 0 + 1)) + 0;
      const randomIndex = EngineUtils.getRandom(this.transitionList.length);

      transitionName = this.transitionList[randomIndex];

      console.log("Random transition: ", randomIndex, transitionName);
    }

    if (!file || file.length === 0) {
      console.warn("Background filename is empty");
    }

    if (index >= GameDef.MaxBackgroundLayers) {
      console.error("Index is greater than MaxBackgroundLayers. Index = " + index);
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

    // if (transform.stretch) {
    //   transform.width = "100%";
    //   transform.height = "100%";
    // }

    const background = "url(" + model.scene.file.filename + ")";
    const incommingBackground = "url(" + model.incommingNewScene.file.filename + ")";

    return new Promise((resolve, reject) => {
      const backgroundID = "background-layer-" + index;
      const maskID = "mask-layer-" + index;

      this.scenes[index] = model;
      this.changeDetectorRef.detectChanges();

      const maskElement = document.getElementById(maskID);
      const backgroundElenent = document.getElementById(backgroundID);

      maskElement.style.width = `${renderer.width || 100}%`;
      maskElement.style.height = `${renderer.height || 100}%`;
      maskElement.style.left = `${renderer.x + renderer.offset_x}%`;
      maskElement.style.top = `${renderer.y + renderer.offset_y}%`;
      maskElement.style.transform = renderer.scale ? `scale(${renderer.scale})` : "";

      maskElement.style.background = background;

      // Set animtion duration
      maskElement.style.animationDuration = duration / 1000 + "s";

      backgroundElenent.style.width = `${renderer.width || 100}%`;
      backgroundElenent.style.height = `${renderer.height || 100}%`;
      backgroundElenent.style.left = `${renderer.x + renderer.offset_x}%`;
      backgroundElenent.style.top = `${renderer.y + renderer.offset_y}%`;
      backgroundElenent.style.transform = renderer.scale ? `scale(${renderer.scale})` : "";
      backgroundElenent.style.background = incommingBackground;

      const filter = renderer.filter || [];
      // filter.forEach(v => {
      //   AnimationUtils.animateCssFilter(`#${maskID}`, v.name, 0, v.strength);
      //   AnimationUtils.animateCssFilter(`#${backgroundID}`, v.name, 0, v.strength);
      // });

      AnimationUtils.applyFilters(`#${maskID}`, 0, filter);
      AnimationUtils.applyFilters(`#${backgroundID}`, 0, filter);

      const animationTokens = ["scene-mask-transition", transitionName];

      maskElement.classList.add(animationTokens[0], animationTokens[1]);
      this.changeDetectorRef.detectChanges();

      // Waiting animation finished
      setTimeout(() => {
        maskElement.classList.remove(animationTokens[0], animationTokens[1]);

        maskElement.style.background = incommingBackground;
        model.scene = data;
        this.changeDetectorRef.detectChanges();

        resolve();
      }, duration + 10);

      setTimeout(async () => {
        const director = new CameraDirector();
        await director.moveTo(
          DirectLayers.Characters,
          {
            translationX: 600,
            skewX: 6,
            scale: 1.5
          },
          4200
        );

        // const elms = ["#background-layer-0", "#avg-viewport"];
        // const elms = ["#avg-viewport"];
        // const char_elms1 = ["#character-box"]
        // const char_elms1 = ["#character"];
        // const char_elms1 = [
        //   "#character-index-1",
        //   "#character-index-2",
        //   "#character-index-3",
        //   "#character-index-4",
        //   "#character-index-5"
        // ];
        // const elms = ["#mask-layer-0"];
        // for (let i = 0; i < this.scenes.length; ++i) {
        //   elms.push(`#mask-layer-${i}`);
        //   elms.push(`#background-layer-${i}`);
        // }

        // const camera = new Camera2D(elms, 1000);
        // camera.setRotation(-2);
        // camera.setScale(1.5);
        // camera.setTranslation(-15, 0);
        // camera.begin();

        // const camera2 = new Camera2D(char_elms1, 1000);
        // camera2.setRotation(-2);
        // camera2.setScale(1.3);
        // camera2.setTranslation(-500, 250);
        // camera2.begin();
      }, 3000);
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

  public async cssFilter(effect: avg.Effect) {
    effect.duration = effect.duration || 1000;
    const elementID = "#avg-viewport";

    await AnimationUtils.animateCssFilter(elementID, effect.effectName, effect.duration, effect.strength);
  }

  public moveTo(index: number, duration: number, x: number) {
    AnimationUtils.to("MoveTo", ".layer-" + index, duration, {
      x: x
    });
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
    const viewport = this.elementRef.nativeElement.querySelector("#avg-viewport");

    if (viewport) {
      // Effects.shake(viewport);
    }
  }
}
