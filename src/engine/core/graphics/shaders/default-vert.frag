precision highp float;

attribute vec4 a_position;
attribute vec4 a_color;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mousemove;
uniform mat4 u_projection;

varying vec4 v_color;

void main() {

  gl_Position = u_projection * a_position;
  gl_PointSize = (10.0 / gl_Position.w) * 100.0;

  v_color = a_color;

}