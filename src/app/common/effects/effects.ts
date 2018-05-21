import * as PIXI from "pixi.js";
import * as particles from "pixi-particles";
import { AnimationUtils } from "../animations/animation-utils";

const sakura = require("./effect-sakura");


const cloudgen = require("../3rd/cloudgen").cloudgen;
// import * as cloudgen from "../3rd/cloudgen";

declare var particlesJS: any;
declare var $cloudgen: any;

// const rain_json = require("./data/effect-rain.json");

export class Effects {
  private static DEAULT_EFFECT_CANVAS = "avg-particle-viewport";

  public static snow() {
    AnimationUtils.fadeTo("#avg-particle-viewport", 0, 0);
    particlesJS.load(this.DEAULT_EFFECT_CANVAS, "data/effects/effect-snow.json", () => {
      AnimationUtils.fadeTo("#avg-particle-viewport", 2000, 1);
    });
  }

  public static sakura() {
    sakura.load();
  }

  public static cloud() {
    const canvas = <HTMLCanvasElement>document.getElementById(this.DEAULT_EFFECT_CANVAS + "-canvas");
    const context = canvas.getContext("2d");

    var cloudGrid = [
      [0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
      [1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0],
      [1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
      [0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0]];


    // console.log(cloudgen);

    const rows = 200;

    let grid = [];
    for (let i = 0; i < 1; ++i) {
      const row = Math.floor(Math.random() * Math.floor(rows)) + 1;
      const parts = [];
      for (let j = 0; j < row; j++) {
        parts.push(Math.floor(Math.random() * Math.floor(2)));  // generate 0 or 1
      }

      grid.push(parts);
    }

    console.log("grid", grid);
    // cloudgen.drawCloudGroup(canvas.getContext("2d"), cloudGrid, 50, 60, 19, { r: 255, g: 255, b: 255 }, 0.2, 30);

    setInterval(() => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      cloudgen.drawCloudGroup(context, grid, 100, 0, 100, { r: 255, g: 255, b: 255 }, 0.01, 30);
    }, 1)
  }

  public static rain() {

    const count = 300;
    const dropSpeed = 20;
    const opacity = 0.8;

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
