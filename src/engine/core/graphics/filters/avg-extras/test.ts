import * as PIXI from "pixi.js";

const vert = `
`;

const filterCode = `
precision highp float;
precision highp int;

uniform float scale;
uniform sampler2D noiseImage;
uniform vec2 speed;
uniform float cloudBrightness;
uniform float cloudMorphSpeed;
uniform float cloudMorphDirection;
uniform float cloudCover;

uniform float time;
uniform vec3 color;
varying vec2 vUv;

void main() {
    
    vec4 colorOutput = vec4( 0.0 );
    vec2 elapsed = time * speed * vec2(-1.0, 1.0);
    vec2 uv = ( vUv + elapsed ) * scale;
    
    for( int i = 1; i <= 5; i++ ) {
        float f = float( i );
        
        float divis = pow( 2.0, f );
        float uvPow = pow( 2.0, f - 1.0 );
        
        vec4 computed = texture2D(
            noiseImage, uvPow * ( uv + vec2( 0.1, 0.0 ) + ( time * 0.001 * cloudMorphSpeed ) )
        ) / divis;
        computed += texture2D(
            noiseImage, uvPow * ( uv + vec2( 0.1 ) )
        ) / divis;
        computed += texture2D(
            noiseImage, uvPow * ( uv + vec2( 0.0, 0.1 ) + ( cloudMorphDirection * time * 0.001 * cloudMorphSpeed ) )
        ) / divis;
        
        computed *= 0.25;
        
        colorOutput += computed;
    }
    
    colorOutput = max( colorOutput - ( 1.0 - cloudCover ), 0.0 );
    colorOutput = vec4( 1.0 - pow( ( 1.0 - cloudBrightness ), colorOutput.r * 255.0 ) );
    
    gl_FragColor = vec4( color * colorOutput.rgb, 1.0 );

}
`;

const uniformsData = {
  radius: 2
};

export const TestFilterObj = new PIXI.Filter('', filterCode, uniformsData);
