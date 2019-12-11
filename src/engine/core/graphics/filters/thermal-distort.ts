import * as PIXI from "pixi.js";
import { FilterBase } from "./filter-base";

class ThermalDistortFilter extends FilterBase {
  name: "ThermalDistortFilter";
  static noise: PIXI.Texture;
  static vertexShader: string;
  static fragmentShader: string;

  distortSpeed: number;
  distortStrength: number;

  filter: PIXI.Filter;

  constructor() {
      super();

      this.distortSpeed = 0.05;
      this.distortStrength = 0.005;

      if(!ThermalDistortFilter.noise) {
        let size = 64;
      	let noiseBuffer = new Uint8Array(size * size * 4); // 噪声图分辨率，用来控制uv块的大小。分辨率越低块越大
        for(let i = 0; i < noiseBuffer.length; i++) {
            noiseBuffer[i] = Math.round(Math.random() * 256);
        }
        ThermalDistortFilter.noise = PIXI.Texture.fromBuffer(noiseBuffer, size, size, {wrapMode: PIXI.WRAP_MODES.REPEAT});
      }


      if(!ThermalDistortFilter.vertexShader) {
        ThermalDistortFilter.vertexShader = `
        precision highp float;
        precision highp int;

        attribute vec2 aVertexPosition;
        attribute vec2 aTextureCoord;

        uniform mat3 projectionMatrix;

        varying vec2 vUv;

        void main() {
            gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
            vUv = aTextureCoord;
        }`;
      }

      if(!ThermalDistortFilter.fragmentShader) { // Offset = 时间 * 速度，是采样噪音的参数；Strength = [0, 1]，是控制扭曲程度的参数
          ThermalDistortFilter.fragmentShader = `
          precision highp float;
          precision highp int;

          uniform sampler2D uSampler;
          uniform sampler2D noise;
          uniform float distortOffset;
          uniform float distortStrength;

          varying vec2 vUv;
          
          void main() {
              vec4 uvOffset = texture2D(noise, vUv - distortOffset) - vec4(0.5, 0.5, 0.0, 0.0);
              gl_FragColor = texture2D(uSampler, vUv - uvOffset.xy * distortStrength);
          }`;
      }

      this.filter = new PIXI.Filter(ThermalDistortFilter.vertexShader, ThermalDistortFilter.fragmentShader, {distortStrength: this.distortStrength, distortOffset: 0.0, noise: ThermalDistortFilter.noise});
  }

  public instance() {
    return this.filter;
  }

  public validate(folder) {}

  public updateUniform() {
    this.filter.uniforms.distortOffset += this.distortSpeed;
  }
}

export default new ThermalDistortFilter();
