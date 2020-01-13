import * as PIXI from "pixi.js";
import { FilterBase } from "./filter-base";

class FlameFilter extends FilterBase {
    name: "FlameFilter";
    noise: PIXI.Texture;
    perlin: PIXI.Texture;
    vertexShader: string;
    fragmentShader: string;

    distortSpeed: number;
    distortStrength: number;

    filter: PIXI.Filter;

    constructor(width: number, height: number) {
        super();

        this.distortSpeed = 0.05;
        this.distortStrength = 0.005;

        let size = 128;
        let noiseBuffer = new Uint8Array(size * size * 4); // 噪声图分辨率，用来控制uv块的大小。分辨率越低块越大
        for(let i = 0; i < noiseBuffer.length; i++) {
            noiseBuffer[i] = Math.round(Math.random() * 256);
        }
        this.noise = PIXI.Texture.fromBuffer(noiseBuffer, size, size, {wrapMode: PIXI.WRAP_MODES.REPEAT});
        
        // 开始绘制柏林噪声图
        let perlinBuffer = new Uint8Array(width * height * 4);

        // 划分晶格
        let blockSize = 16;
        let horizontalBlockCount = width % blockSize == 0 ? width / blockSize + 1 : Math.floor(width / blockSize) + 2;
        let verticalBlockCount = height % blockSize == 0 ? height / blockSize + 1 : Math.floor(height / blockSize) + 2;

        // 初始化晶格梯度
        const candidates = [[0.0, 1.0], [1.0, 0.0], [0.0, -1.0], [-1.0, 0.0], [1.0, 1.0], [-1.0, 1.0], [-1.0, -1.0], [1.0, -1.0]];
        let gradients = [];
        for(let i = 0; i < horizontalBlockCount; i++) {
            let foo = [];
            for(let j = 0; j < verticalBlockCount; j++) {
                foo.push(candidates[Math.floor(Math.random() * candidates.length)]);
                //foo.push([Math.random() * 2.0 - 1.0, Math.random() * 2.0 - 1.0]);
            }
            gradients.push(foo);
        }
        console.log(gradients);

        // 填充柏林噪声图
        for(let j = 0; j < height; j++) {
            for(let i = 0; i < width; i++) { // OpenGL的数组是列主序
                let minI = Math.floor(i / blockSize);
                let minJ = Math.floor(j / blockSize);
                let deltaI = i / blockSize - minI;
                let deltaJ = j / blockSize - minJ;

                let w00 = this.dot2(gradients[minI][minJ], [deltaI, deltaJ]);
                let w01 = this.dot2(gradients[minI][minJ + 1], [deltaI, deltaJ - 1.0]);
                let w10 = this.dot2(gradients[minI + 1][minJ], [deltaI - 1.0, deltaJ]);
                let w11 = this.dot2(gradients[minI + 1][minJ + 1], [deltaI - 1.0, deltaJ - 1.0]);

                deltaI = this.fade(deltaI);
                deltaJ = this.fade(deltaJ);

                let lerp1 = w00 + (w01 - w00) * deltaJ;
                let lerp2 = w10 + (w11 - w10) * deltaJ;
                let result = lerp1 + (lerp1 - lerp2) * deltaI;

                perlinBuffer[j * width * 4 + i * 4] = Math.floor(result * 64 + 128);
                perlinBuffer[j * width * 4 + i * 4 + 1] = perlinBuffer[j * width * 4 + i * 4];
                perlinBuffer[j * width * 4 + i * 4 + 2] = perlinBuffer[j * width * 4 + i * 4];
                perlinBuffer[j * width * 4 + i * 4 + 3] = 255;
            }
        }
        this.perlin = PIXI.Texture.fromBuffer(perlinBuffer, width, height, {wrapMode: PIXI.WRAP_MODES.REPEAT});

        this.vertexShader = `
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

        this.fragmentShader = `
        precision highp float;
        precision highp int;

        uniform sampler2D uSampler;
        uniform sampler2D noise;
        uniform float distortOffset;
        uniform float distortStrength;

        varying vec2 vUv;
        
        void main() {
            gl_FragColor = texture2D(noise, vUv);
        }`;

        this.filter = new PIXI.Filter(this.vertexShader, this.fragmentShader, {distortStrength: this.distortStrength, distortOffset: 0.0, noise: this.perlin});
    }

  public instance() {
    return this.filter;
  }

  public validate(folder) {}

  public updateUniform() {
    this.filter.uniforms.distortOffset += this.distortSpeed;
  }

    private dot2(v1, v2): number {
        return v1[0] * v2[0] + v1[1] * v2[1];
    }

    private fade(t: number): number {
        return t * t * t * (t * (t * 6 - 15) + 10); // 五次插值函数
    }
}

export default new FlameFilter(256, 256);
