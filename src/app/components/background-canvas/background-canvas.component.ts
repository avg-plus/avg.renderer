import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { FPSCtrl } from 'app/common/fps-ctrl';
import { AnimationUtils } from 'app/common/animation-utils';
import { Effects } from 'app/common/effects/effects';
import * as particles from 'pixi-particles';

@Component({
  selector: 'background-canvas',
  templateUrl: './background-canvas.component.html',
  styleUrls: ['./background-canvas.component.scss']
})
export class BackgroundCanvasComponent implements OnInit, AfterViewInit {

  private _background: PIXI.Sprite = new PIXI.Sprite();
  private _effectContainer: PIXI.particles.ParticleContainer = new PIXI.particles.ParticleContainer();

  private _app: PIXI.Application = null;
  private readonly _duration = 500;

  constructor(private elementRef: ElementRef) {

  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const element = this.elementRef.nativeElement.querySelector('#avg-viewport');
    if (this._app !== null) {
      this._app.destroy(true);
    }

    this._app = new PIXI.Application(1366, 768, {
      backgroundColor: 0x000000
    });

    element.appendChild(this._app.view);

    this._background.width = this._app.renderer.width;
    this._background.height = this._app.renderer.height;

    this._app.stage.addChild(this._background);
  }

  public async setBackground(file: string, duration?: number): Promise<any> {

    duration = duration || this._duration;

    return new Promise((resolve, reject) => {
      if (this._background.texture) {
        let fadeOut = AnimationUtils.fadeOut(this._background, duration, () => {

          const newTexture = PIXI.Texture.fromImage(file);
          this._background.texture = newTexture;

          AnimationUtils.fadeIn(this._background, duration, resolve);
        });
      } else {
        const newTexture = PIXI.Texture.fromImage(file);
        this._background.texture = newTexture;

        AnimationUtils.fadeIn(this._background, duration, resolve);
      }

    })

  }

  loadParticleEffect() {


  }

  rain() {
    const canvas = this.elementRef.nativeElement.querySelector('#avg-particle-viewport');
    if (canvas) {
      Effects.rain(canvas);
    }
  }

  snow() {
    const canvas = this.elementRef.nativeElement.querySelector('#avg-particle-viewport');
    if (canvas) {
      Effects.snow(canvas);
    }
  }

  shake() {
    const viewport = this.elementRef.nativeElement.querySelector('#avg-viewport');

    if (viewport) {
      Effects.shake(viewport);
    }
  }




}
