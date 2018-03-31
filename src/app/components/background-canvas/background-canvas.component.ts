import { Component, OnInit, AfterViewInit, ElementRef } from "@angular/core";
import { FPSCtrl } from "app/common/fps-ctrl";
import { AnimationUtils } from "app/common/animations/animation-utils";
import { SceneAnimation } from "app/common/animations/scene-animation";
import { Effects } from "app/common/effects/effects";
import { GameDef } from "app/common/game-def";

import * as path from "path";
import * as particles from "pixi-particles";
import * as avg from "avg-engine/engine";
import * as gsap from "gsap";

@Component({
  selector: "background-canvas",
  templateUrl: "./background-canvas.component.html",
  styleUrls: ["./background-canvas.component.scss"]
})
export class BackgroundCanvasComponent implements OnInit, AfterViewInit {
  private _background: PIXI.Sprite = new PIXI.Sprite();
  private _mask: PIXI.Sprite = new PIXI.Sprite();
  private _effectContainer: PIXI.particles.ParticleContainer = new PIXI.particles.ParticleContainer();

  private _app: PIXI.Application = null;
  private readonly _duration = 500;

  public backgroundImages: Array<string> = new Array<string>(
    GameDef.MaxBackgroundLayers
  );

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {}

  ngAfterViewInit() {
    // const element = this.elementRef.nativeElement.querySelector('#avg-viewport');
    // if (this._app !== null) {
    //   this._app.destroy(true);
    // }
    // this._app = new PIXI.Application(1366, 768, {
    //   backgroundColor: 0x000000
    // });
    // element.appendChild(this._app.view);
    // this._background.interactive = true;
    // this._background.width = this._app.renderer.width;
    // this._background.height = this._app.renderer.height;
    // this._background.alpha = 1;
    // this._app.stage.addChild(this._background);
    // let maskImage = path.join(avg.Resource.getPath(avg.ResourcePath.Masks), '/circle-transition.bak.png');
    // this._mask = PIXI.Sprite.fromImage(maskImage);
    // this._mask.alpha = 255;
    // this._mask.width = this._app.renderer.width;
    // this._mask.height = this._app.renderer.width;
    // this._mask.scale = new PIXI.Point(1.5, 1.5);
    // this._mask = new PIXI.Graphics();
    // this._mask.beginFill(0x105050, 0.4);
    // this._mask.drawCircle(this._app.renderer.width * 0.25, this._app.renderer.height * 0.25, 200);
    // this._mask.drawRect(this._app.renderer.width * 0.25, this._app.renderer.height * 0.25,
    // this._app.renderer.width / 2, this._app.renderer.height / 2);
    // this._mask.endFill();
    // this._app.stage.addChild(this._mask);
    // this._mask = this._background;
    // this._background.mask = this._mask;
  }

  public async setBackground(
    file: string,
    duration?: number,
    layerIndex: number = 0,
    to?: any
  ): Promise<any> {
    if (layerIndex >= GameDef.MaxBackgroundLayers) {
      return;
    }

    duration = duration || this._duration;

    return new Promise((resolve, reject) => {
      // if (this._background.texture) {

      console.log(layerIndex);
      this.backgroundImages[layerIndex] = file;
      resolve();

      // gsap.TweenLite.to('#background-image', 10, { 'opacity': 1 });

      // let fadeOut = AnimationUtils.fadeIn(this._background, duration, () => {

      //   const newTexture = PIXI.Texture.fromImage(file);
      //   this._background.texture = newTexture;

      // AnimationUtils.fadeIn(this._background, duration, resolve);
      // });
      // } else {
      // const newTexture = PIXI.Texture.fromImage(file);
      // this._background.texture = newTexture;

      // gsap.TweenLite.to('#avg-viewport', 1, { 'opacity': 1 });

      // AnimationUtils.fadeIn(this._background, duration, resolve);
      // }
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
