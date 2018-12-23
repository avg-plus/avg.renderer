import * as PIXI from "pixi.js";
// import * as particles from "pixi-particles";
import { AnimationUtils } from "../animations/animation-utils";

const sakura = require("./effect-sakura");

const cloudgen = require("../3rd/cloudgen").cloudgen;

declare const particlesJS: any;
declare const $cloudgen: any;

export class Effects {
  private static DEAULT_EFFECT_CANVAS = "avg-particle-viewport";

  public static snow() {
    require("../3rd/particles");

    // AnimationUtils.fadeTo("#avg-particle-viewport", 0, 0);
    particlesJS.load(
      this.DEAULT_EFFECT_CANVAS,
      "data/effects/effect-snow.json",
      () => {
        // AnimationUtils.fadeTo("#avg-particle-viewport", 2000, 1);
      }
    );
  }

  public static sakura() {
    sakura.load();
  }

  public static cloud() {
    const canvas = <HTMLCanvasElement>document.getElementById(
      this.DEAULT_EFFECT_CANVAS + "-canvas"
    );
    const context = canvas.getContext("2d");

    const cloudGrid = [
      [
        0,
        1,
        1,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0
      ],
      [
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      [
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        1,
        1,
        0,
        0,
        0,
        1,
        0,
        0,
        1,
        0,
        0,
        1,
        1,
        1,
        0,
        0,
        1,
        1,
        1,
        0,
        0,
        1,
        1,
        1,
        0,
        0,
        1,
        1,
        1,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        1,
        1
      ],
      [
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        1,
        0,
        0,
        1,
        0,
        0,
        1,
        0,
        0,
        1,
        0,
        0,
        1,
        0,
        1,
        0,
        0,
        1,
        0,
        1,
        0,
        0,
        1,
        1,
        1,
        0,
        0,
        1,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        1,
        0
      ],
      [
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        1,
        0,
        0,
        1,
        0,
        0,
        1,
        0,
        0,
        1,
        0,
        0,
        1,
        0,
        1,
        0,
        0,
        1,
        0,
        1,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1
      ],
      [
        0,
        1,
        1,
        0,
        0,
        1,
        0,
        0,
        0,
        1,
        1,
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        0,
        0,
        1,
        1,
        1,
        0,
        0,
        1,
        1,
        1,
        0,
        0,
        1,
        1,
        1,
        0,
        0,
        1,
        0,
        0,
        1,
        0,
        0,
        1,
        0,
        0,
        1,
        0,
        0,
        1,
        1,
        1
      ],
      [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0
      ],
      [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0
      ],
      [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        1,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        1,
        0,
        0,
        0,
        0,
        0
      ]
    ];

    // console.log(cloudgen);

    const rows = 200;

    let grid = [];
    for (let i = 0; i < 1; ++i) {
      const row = Math.floor(Math.random() * Math.floor(rows)) + 1;
      const parts = [];
      for (let j = 0; j < row; j++) {
        parts.push(Math.floor(Math.random() * Math.floor(2))); // generate 0 or 1
      }

      grid.push(parts);
    }

    console.log("grid", grid);
    // cloudgen.drawCloudGroup(canvas.getContext("2d"), cloudGrid, 50, 60, 19, { r: 255, g: 255, b: 255 }, 0.2, 30);

    setInterval(() => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      cloudgen.drawCloudGroup(
        context,
        grid,
        100,
        0,
        100,
        { r: 255, g: 255, b: 255 },
        0.01,
        30
      );
    }, 1);
  }

  public static rain2() {
    const count = 300;
    const dropSpeed = 20;
    const opacity = 0.8;

    const canvas = <HTMLCanvasElement>document.getElementById(
      this.DEAULT_EFFECT_CANVAS + "-canvas"
    );
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

      const init = [];
      const maxParts = count;
      for (let a = 0; a < maxParts; a++) {
        init.push({
          x: Math.random() * w,
          y: Math.random() * h,
          l: Math.random() * 1,
          xs: -4 + Math.random() * 4 + 2,
          ys: Math.random() * 10 + 10
        });
      }

      const particles = [];
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




  public static rain() {
    const count = 300;
    const dropSpeed = 20;
    const opacity = 0.8;

    const canvas = <HTMLCanvasElement>document.getElementById(
      this.DEAULT_EFFECT_CANVAS + "-canvas"
    )


    const FIXED_STEP = 16;

    // Wind
    const WIND_VELOCITY = 0; // Determines how slanted the rain drops fall, 0 = straight down

    // Drop settings
    const DROP_COUNT = 200; // Adjust for more/less rain drops
    const DROP_WIDTH = .2; // Increase for thicker rain
    const DROP_X_BUFFER = 50; // How far to the sides of the screen drops will spawn
    const DROP_COLOR = "lightblue";
    const DROP_MIN_VELOCITY = 0.2;
    const DROP_MAX_VELOCITY = 0.3;
    const DROP_MIN_LENGTH = 3;
    const DROP_MAX_LENGTH = 5;
    const DROP_MIN_ALPHA = 0.8;
    const DROP_MAX_ALPHA = 1;

    // Math helpers
    const math = {
      // Random integer between min and max
      randomInteger: function (min, max) {
        return Math.round((Math.random() * (max - min)) + min);
      },
      // Linear Interpolation
      lerp: function (a, b, n) {
        return a + ((b - a) * n);
      },
      scaleVector: function (v, s) {
        v.x *= s;
        v.y *= s;
      },
      normalizeVector: function (v) {
        const m = Math.sqrt(v.x * v.x + v.y * v.y);
        math.scaleVector(v, 1 / m);
      }
    };

    // Initialize our canvas
    // const  stage = document.createElement("canvas");
    const stage = canvas;

    // stage.width = 500;
    // stage.height = 300;
    // document.body.appendChild(stage);
    const ctx = stage.getContext("2d");

    let lastTime = 0;

    // Collection of rain drops
    const drops = [];

    const initDrops = function () {
      for (let i = 0; i < DROP_COUNT; i++) {
        const drop: any = {};
        resetDrop(drop);
        drop.y = math.randomInteger(0, stage.height);
        drops.push(drop);
      }
    };

    // Reset a drop to the top of the canvas
    const resetDrop = function (drop) {
      const scale = Math.random();
      drop.x = math.randomInteger(-DROP_X_BUFFER, stage.width + DROP_X_BUFFER);
      drop.vx = WIND_VELOCITY;
      drop.vy = math.lerp(DROP_MIN_VELOCITY, DROP_MAX_VELOCITY, scale);
      drop.l = math.lerp(DROP_MIN_LENGTH, DROP_MAX_LENGTH, scale);
      drop.a = math.lerp(DROP_MIN_ALPHA, DROP_MAX_ALPHA, scale);
      drop.y = math.randomInteger(-drop.l, 0);
    };

    const updateDrops = function (dt) {
      for (let i = drops.length - 1; i >= 0; --i) {
        const drop = drops[i];
        drop.x += drop.vx * dt;
        drop.y += drop.vy * dt;

        if (
          drop.y > stage.height + drop.l
        ) {
          resetDrop(drop);
        }
      }
    };

    const renderDrops = (ctx: any) => {
      ctx.save();
      ctx.strokeStyle = DROP_COLOR;
      ctx.lineWidth = DROP_WIDTH;
      ctx.compositeOperation = "lighter";

      for (let i = 0; i < drops.length; ++i) {
        const drop = drops[i];

        const x1 = Math.round(drop.x);
        const y1 = Math.round(drop.y);

        const v = { x: drop.vx, y: drop.vy };
        math.normalizeVector(v);
        math.scaleVector(v, -drop.l);

        const x2 = Math.round(x1 + v.x);
        const y2 = Math.round(y1 + v.y);

        ctx.globalAlpha = drop.a;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.closePath();
      }
      ctx.restore();
    };

    const render = function () {
      ctx.fillStyle = "rgba(0,0,0,0)";
      ctx.clearRect(0, 0, stage.width, stage.height);
      ctx.fillRect(0, 0, stage.width, stage.height);
      renderDrops(ctx);
    }

    const update = function (time) {
      let dt = time - lastTime;
      lastTime = time;
      if (dt > 100) { dt = FIXED_STEP; }

      while (dt >= FIXED_STEP) {
        updateDrops(FIXED_STEP);
        dt -= FIXED_STEP;
      }

      render();
      requestAnimationFrame(update);

    };

    initDrops();
    requestAnimationFrame(update);
  }
}
