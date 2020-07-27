// import * as PIXI from "pixi.js";

// const fragment = require("./flakes.frag").default;
// const vertex = require("./vertex.vert").default;

// class FlakesFilter {
//   name: "FlakesFilter";

//   private filter: PIXI.Filter;
//   uniforms = {
//     u_worldSize: new Float32Array(3),
//     u_gravity: new Float32Array(1),
//     u_wind: 50,
//     u_time: 0,
//     u_resolution: new Float32Array(2),
//     u_projection: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],

//     a_position: new Float32Array(4),
//     a_color: new Float32Array(4),
//     a_rotation: new Float32Array(3),
//     a_speed: new Float32Array(3),
//     a_size: 10

//   }

//   constructor() {
//     this.filter = new PIXI.Filter(vertex, fragment, {});
//   }

//   public instance() {
//     return this.filter;
//   }
// }

// export default new FlakesFilter();
