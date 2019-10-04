import * as PIXI from "pixi.js";

const filterCode = `
void main(){
  gl_FragColor = vec4(1.0, 1.0, 1.0, 0.2);
}`;

const uniformsData = {
  magic: {
    type: 'float',
    value: 1
  }
};

export const TestFilterObj = new PIXI.Filter('', filterCode, uniformsData);
