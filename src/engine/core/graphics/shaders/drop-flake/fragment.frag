precision highp float;

uniform sampler2D u_texture;

varying vec4 v_color;
varying float v_rotation;
varying vec2 vTextureCoord;

void main() {

    vec2 rotated = vec2(
    cos(v_rotation) * (gl_PointCoord.x - 0.5) + sin(v_rotation) * (gl_PointCoord.y - 0.5) + 0.5,
    cos(v_rotation) * (gl_PointCoord.y - 0.5) - sin(v_rotation) * (gl_PointCoord.x - 0.5) + 0.5
    );

    vec4 texture = texture2D(u_texture, rotated);

    gl_FragColor =  vec4(texture.rgb, texture.a * v_color.a);

}