import * as PIXI from "pixi.js";
import * as particles from "pixi-particles";
import { FPSCtrl } from "../fps-ctrl";
import { AnimationUtils } from "../animations/animation-utils";
declare var particlesJS: any;

// const rain_json = require("./data/effect-rain.json");

export class Effects {
  private static DEAULT_EFFECT_CANVAS = "avg-particle-viewport";

  static snow() {
    AnimationUtils.fadeTo("#avg-particle-viewport", 0, 0);
    particlesJS.load(this.DEAULT_EFFECT_CANVAS, "data/effects/effect-snow.json", () => {
      AnimationUtils.fadeTo("#avg-particle-viewport", 2000, 1);
    });
  }

  public static rain() {

    const count = 300;
    const dropSpeed = 20;
    const opacity = 0.8;

    console.log(document.getElementById(this.DEAULT_EFFECT_CANVAS + "-canvas"));
    const canvas = <HTMLCanvasElement>document.getElementById(this.DEAULT_EFFECT_CANVAS + "-canvas");
    if (!canvas) {
      console.error("Effect canvas not found");
      return;
    }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    if (canvas.getContext) {
      let ctx = canvas.getContext("2d");
      let w = canvas.width;
      let h = canvas.height;
      ctx.strokeStyle = "rgba(174,194,224," + opacity + ")";
      ctx.lineWidth = 1.5;
      //  ctx.lineCap = 'round';

      let init = [];
      let maxParts = count;
      for (let a = 0; a < maxParts; a++) {
        init.push({
          x: Math.random() * w,
          y: Math.random() * h,
          l: Math.random() * 1,
          xs: -4 + Math.random() * 4 + 2,
          ys: Math.random() * 10 + 10
        });
      }

      let particles = [];
      for (let b = 0; b < maxParts; b++) {
        particles[b] = init[b];
      }

      const draw = () => {
        ctx.clearRect(0, 0, w, h);
        for (let c = 0; c < particles.length; c++) {
          let p = particles[c];
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + p.l * p.xs, p.y + p.l * p.ys);
          ctx.stroke();
        }
        move();
      };

      const move = () => {
        for (let b = 0; b < particles.length; b++) {
          let p = particles[b];
          p.x += p.xs;
          p.y += p.ys;
          if (p.x > w || p.y > h) {
            p.x = Math.random() * w;
            p.y = -10;
          }
        }
      };

      setInterval(draw, dropSpeed);
    }
  }

}
