import { AnimationUtils } from "./animation-utils";
import { TweenMax, TweenLite } from "gsap";
import { EngineUtils } from "../../../../../avg.engine/engine/core";
import * as $ from "jquery";
import * as dynamics from "dynamics.js";

class CameraOptions {
  public restrictedMode = true;
}

class CameraData {
  public translationX = 0;
  public translationY = 0;
  public angle = 0;
  public scale = 1;
}

export class Camera2D {
  private targets: string | string[] = [];
  private duration;

  private cameraData: CameraData = new CameraData();

  constructor(targets: string | string[], duration: number = 1000) {
    this.targets = targets;
    this.duration = duration;
  }

  public async setTranslation(x: number, y: number) {
    this.cameraData.translationX = x;
    this.cameraData.translationY = y;
  }
  public async setRotation(angle: number) {
    this.cameraData.angle = angle;
  }

  public async setScale(scale: number) {
    this.cameraData.scale = scale;
  }

  public begin() {
    for (let i = 0; i < this.targets.length; ++i) {
      const e = $(this.targets[i]);
      dynamics.animate(
        e[0],
        {
          translateX: this.cameraData.translationX,
          translateY: this.cameraData.translationY,
          // x: `${this.cameraData.translationX}%`,
          // y: `${this.cameraData.translationY}%`,
          scale: this.cameraData.scale,
          rotation: `${this.cameraData.angle}deg`
        },
        {
          type: dynamics.easeInOut,
          friction: 500
        }
      );

      // TweenMax.to(this.targets[i], 1, {
      //   // transform: "scale(1.2) translateX(-200)",
      //   // transform: `translate(}, ${this.cameraData.translationY})`,
      //   css: {
      //     x: `${this.cameraData.translationX}%`,
      //     y: `${this.cameraData.translationY}%`,
      //     scale: this.cameraData.scale,
      //     rotation: `${this.cameraData.angle}deg`
      //   },
      //   ease: TweenLite.defaultEase
      // });
    }
  }
}
