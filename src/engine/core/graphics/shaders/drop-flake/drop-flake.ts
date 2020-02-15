import * as $ from "jquery";

import { ShaderProgram, ShaderOptions } from "../shader-program.js";
import { getRandomBetween } from "engine/core/utils";
import { AVGNativeFS } from "engine/core/native-modules/avg-native-fs";
const vertex = require("./vertex.frag").default;
const fragment = require("./fragment.frag").default;

export class DropFlakeParams {
  count?= 5000; // 粒子数量
  alpha?= 0; // 透明系数
  depth?= 30; // 镜头深度
  gravity?= 100; // 下坠重力
  rotation?= {
    enabled: false,
    randomize: true,
    angle: 2,
    speed: 10
  };
  wind?= {
    enabled: false,
    force: 0.1, // 风力
    min: 0.1,
    max: 0.3,
    easing: 0.01
  };
}

export class DropFlakeParticle extends ShaderProgram {

  currentForce = 0;
  currentWindForce = 0;
  currentDirection = 0;

  texture: string;
  params: DropFlakeParams;


  constructor(
    texture: string,
    params: DropFlakeParams,
    enterDuration: number = 1000) {

    // super(cNode as HTMLElement);
    super();

    this.texture = texture;
    this.params = params;

    this.currentForce = this.params.wind.force;
  }

  start() {

    const parent = document.getElementById("avg-particle-viewport");

    var cNode = parent.cloneNode(false);
    parent.parentNode.replaceChild(cNode, parent);


    // console.log("Loading Texture: ", texture);
    // const flakeTexture = await AVGNativeFS.readFileSync(texture, { encoding: "base64" });
    // console.log("Texture: ", flakeTexture);

    // delete DropFlakeParticle.program;

    const options: any = {
      depthTest: false, //打开镜头深度调试，不同深度的粒子会互相覆盖
      // texture: `data:image/png;base64,${flakeTexture}`,
      texture: this.texture,
      uniforms: {
        worldSize: { type: "vec3", value: [0, 0, 0] },
        gravity: { type: "float", value: this.params.gravity },
        wind: { type: "float", value: 0 }
      },
      buffers: {
        size: { size: 1, data: [] },
        rotation: { size: 3, data: [] },
        speed: { size: 3, data: [] }
      },
      vertex: vertex,
      fragment: fragment,
      // onUpdate: this.onUpdate
    };

    // $(<Element>cNode).fadeTo(0, 0);
    // $(<Element>cNode).fadeTo(enterDuration, 1);

    // DropFlakeParticle.program = new ShaderProgram(cNode as HTMLElement, options);

    this.run(options, cNode as HTMLElement);

  }

  onUpdate(delta: number) {

    const wind = this.params.wind;

    if (wind.enabled) {
      // wind.direction = getRandomBetween(wind.min, wind.max); //  wind.min + Math.random() * (wind.max - wind.min);
      this.currentDirection = (wind.min + Math.random() * (wind.max - wind.min)) * (Math.random() > 0.5 ? -1 : 1);
    }

    this.currentForce += (this.currentDirection - wind.force) * wind.easing;
    this.currentWindForce += wind.force * (delta * 0.2);


    this.programOptions.uniforms.wind = this.currentWindForce;
    this.programOptions.uniforms.gravity = this.params.gravity;

    // console.log(`onUpdate: ${delta} - `, this.programOptions)
    // this.programOptions.uniforms.wind = this.currentWindForce * 2;
    // this.programOptions.uniforms.gravity = this.params.gravity * 2;
    // this.programOptions.uniforms.wind = this.currentWindForce * 2;
    // this.programOptions.uniforms.gravity += 111;//this.params.gravity * 2;


  }

  onResize(w: number, h: number, dpi: number) {

    const position = [],
      color = [],
      size = [],
      rotation = [],
      speed = [];

    // z in range from -80 to 80, camera distance is 100
    // max height at z of -80 is 110
    const height = 110;
    const width = (w / h) * height;

    Array.from({ length: (w / h) * this.params.count }, snowflake => {
      position.push(
        -width + Math.random() * width * 2,
        -height + Math.random() * height * 2,
        Math.random() * this.params.depth * 2
      );

      speed.push(
        // 0, 0, 0 )
        1 + Math.random(),
        1 + Math.random(),
        Math.random() * 100
      ); // x, y, sinusoid

      const r = this.params.rotation;

      if (r.enabled) {
        rotation.push(
          (r.randomize ? Math.random() : 0.5) * r.angle * Math.PI,
          (r.randomize ? Math.random() : 0.5) * r.speed,
          0
        ); // angle, speed, sinusoid
        // rotation.push(0, 0, 0); // angle, speed, sinusoid
      } else {
        rotation.push(0, 0, 0);
      }

      color.push(1, 1, 1, Math.random() * this.params.alpha);

      size.push(5 * Math.random() * 5 * ((h * dpi) / 1000));
    });


    this.programOptions.uniforms.worldSize = [width, height, this.params.depth];

    this.programOptions.buffers.position = position;
    this.programOptions.buffers.color = color;
    this.programOptions.buffers.rotation = rotation;
    this.programOptions.buffers.size = size;
    this.programOptions.buffers.speed = speed;
    // this.programOptions.uniforms.wind = currentWindForce;
  }

  public static async start(
    texture: string,
    params: DropFlakeParams = new DropFlakeParams(),
    enterDuration: number = 1000
  ) {
  }

  public stop() {
    const parent = document.getElementById("avg-particle-viewport");
    var cNode = parent.cloneNode(false);
    parent.parentNode.replaceChild(cNode, parent);

    // delete DropFlakeParticle.program;
  }

  public setParams(params: any) {
    // this.params.alpha += 0.01;
    this.params = params;
  }
}
