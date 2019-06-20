import { AnimationUtils } from "./animation-utils";
import { TweenMax, TweenLite } from "gsap";
import * as $ from "jquery";
import * as dynamics from "dynamics.js";
import { CameraData } from "engine/data/camera-data";
import { EngineUtils } from "engine/core/engine-utils";

class CameraOptions {
  public restrictedMode = true;
}

export class Camera2D {
  private targets: string[] = [];

  private cameraData: CameraData = new CameraData();

  constructor(targets: string | string[]) {
    this.setTargets(targets);
  }

  public setTargets(targets: string | string[]) {
    if (!Array.isArray(targets)) {
      this.targets = [targets];
    } else {
      this.targets = targets;
    }
  }

  public setCameraData(data: CameraData) {
    this.cameraData = data;
  }

  public async setTranslation(x: number, y: number) {
    this.cameraData.x = x;
    this.cameraData.y = y;
  }

  public setSkewX(skewX: number) {
    this.cameraData.skewX = skewX;
  }

  public setSkewY(skewY: number) {
    this.cameraData.skewY = skewY;
  }

  public async setRotation(angle: number) {
    this.cameraData.rotation = angle;
  }

  public async setScale(scale: number) {
    this.cameraData.scale = scale;
  }

  public async begin(duration: number = 1000) {
    const animationQueue = [];

    const data = {
      translateX: -this.cameraData.x,
      translateY: this.cameraData.y,
      skewX: this.cameraData.skewX,
      skewY: this.cameraData.skewY,
      scale: this.cameraData.scale,
      rotateZ: this.cameraData.rotation === undefined ? undefined : `${this.cameraData.rotation}`
      // filter: `blur(${this.cameraData.blur}px)`
    };

    Object.keys(data).forEach(key => {
      if (EngineUtils.isNullOrUndefined(data[key]) === undefined || isNaN(data[key]) || data[key] === -0) {
        delete data[key];
      }
    });
    console.log("Camera Data:", data);

    for (let i = 0; i < this.targets.length; ++i) {
      animationQueue.push(
        new Promise((resolve, reject) => {
          const e = $(this.targets[i]);
          dynamics.animate(e[0], data, {
            type: dynamics.easeInOut,
            friction: 500,
            duration: duration,
            complete: () => resolve()
          });
        })
      );
    }

    return await Promise.all(animationQueue);

    // TweenMax.to(this.targets[i], 1, {
    //   css: {
    //     // left: `${this.cameraData.translationX}%`,
    //     // top: `${this.cameraData.translationY}%`,
    //     // scale: this.cameraData.scale,
    //     rotation: `${this.cameraData.angle}deg`,
    //     transform: `scale(${this.cameraData.scale})`

    //     // transform: `scale(${this.cameraData.scale}) translate(${this.cameraData.translationX}, ${this.cameraData.translationY})`
    //   },
    //   ease: TweenLite.defaultEase
    // });
    // }
  }
}
