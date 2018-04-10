import * as particlesJS from "particles.js";

export class ParticleEffect {
  static snow() {
    const snowData = require("./data/effect-snow.json");

    particlesJS.load("particles-js", "./data/effect-snow.json", () => {
      console.log("callback - particles.js config loaded");
    });
  }
}
