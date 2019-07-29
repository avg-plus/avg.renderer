// const fragment = require("./fragment.frag").default;
// import { vertex } from "../tools";
// import * as PIXI from "pixi.js";

import { ShaderProgram } from "../shader-program.js";
import { getRandomBetween } from "engine/core/utils";
import { AVGNativeFS } from "engine/core/native-modules/avg-native-fs";
const vertex = require("./vertex.frag").default;
const fragment = require("./fragment.frag").default;

export class DropFlakeParams {
  count? = 5000; // 粒子数量
  alpha? = 0.6; // 透明系数
  depth? = 30; // 镜头深度
  gravity? = 100; // 下坠重力
  autoWind? = false;
  wind? = {
    force: 0.1, // 风力
    min: 0.1,
    max: 0.3,
    easing: 0.01
  };
}

export class DropFlakeParticle {
  public static params: DropFlakeParams;
  private static program: ShaderProgram;

  public static async init(params: DropFlakeParams = new DropFlakeParams(), texture: string, element: string = "") {
    DropFlakeParticle.params = params;

    let currentForce = 0;
    let currentWindForce = 0;
    let currentDirection = 0;

    const flakeTexture = await AVGNativeFS.readFileSync(texture, { encoding: "base64" });
    this.program = null;

    this.program = new ShaderProgram(document.getElementById(element || "avg-particle-viewport"), {
      depthTest: false, //打开镜头深度调试，不同深度的粒子会互相覆盖
      texture: `data:image/png;base64,${flakeTexture}`,
      params: DropFlakeParticle.params,
      uniforms: {
        worldSize: { type: "vec3", value: [0, 0, 0] },
        gravity: { type: "float", value: DropFlakeParticle.params.gravity },
        wind: { type: "float", value: 0 }
      },
      buffers: {
        size: { size: 1, data: [] },
        rotation: { size: 3, data: [] },
        speed: { size: 3, data: [] }
      },
      vertex: vertex,
      fragment: fragment,
      onResize(w, h, dpi) {
        const position = [],
          color = [],
          size = [],
          rotation = [],
          speed = [];

        // z in range from -80 to 80, camera distance is 100
        // max height at z of -80 is 110
        const height = 110;
        const width = (w / h) * height;

        Array.from({ length: (w / h) * DropFlakeParticle.params.count }, snowflake => {
          position.push(
            -width + Math.random() * width * 2,
            -height + Math.random() * height * 2,
            Math.random() * DropFlakeParticle.params.depth * 2
          );

          speed.push(
            // 0, 0, 0 )
            1 + Math.random(),
            1 + Math.random(),
            Math.random() * 100
          ); // x, y, sinusoid

          rotation.push(Math.random() * 2 * Math.PI, Math.random() * 10, 0); // angle, speed, sinusoid
          // rotation.push(0, 0, 0); // angle, speed, sinusoid

          color.push(1, 1, 1, 0.1 + Math.random() * DropFlakeParticle.params.alpha);

          size.push(5 * Math.random() * 5 * ((h * dpi) / 1000));
        });

        this.uniforms.worldSize = [width, height, DropFlakeParticle.params.depth];

        this.buffers.position = position;
        this.buffers.color = color;
        this.buffers.rotation = rotation;
        this.buffers.size = size;
        this.buffers.speed = speed;
        this.uniforms.wind = currentWindForce;
      },
      onUpdate(delta) {
        const wind = DropFlakeParticle.params.wind;

        if (DropFlakeParticle.params.autoWind) {
          // wind.direction = getRandomBetween(wind.min, wind.max); //  wind.min + Math.random() * (wind.max - wind.min);
          currentDirection = (wind.min + Math.random() * (wind.max - wind.min)) * (Math.random() > 0.5 ? -1 : 1);
        }

        currentForce += (currentDirection - wind.force) * wind.easing;
        currentWindForce += wind.force * (delta * 0.2);

        this.uniforms.wind = currentWindForce;
        this.uniforms.gravity = DropFlakeParticle.params.gravity;
      }
    });
  }

  public static async setTexture(filename: string) {
    this.init(this.params, filename);
  }

  public static update(params: any) {
    Object.assign(DropFlakeParticle.params, params);
  }
}
