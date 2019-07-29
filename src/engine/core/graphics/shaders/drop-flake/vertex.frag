precision highp float;

attribute vec4 a_position;
attribute vec4 a_color;
attribute vec3 a_rotation;
attribute vec3 a_speed;
attribute float a_size;

uniform float u_time;
uniform vec2 u_mousemove;
uniform vec2 u_resolution;
uniform mat4 u_projection;
uniform vec3 u_worldSize;
uniform float u_gravity;
uniform float u_minGravity;
uniform float u_maxGravity;
uniform float u_wind;

varying vec4 v_color;
varying float v_rotation;

void main() {
    v_color = a_color;
    v_rotation = a_rotation.x + u_time * a_rotation.y;

    vec3 pos = a_position.xyz;

    pos.x = mod(pos.x + u_time + u_wind * a_speed.x, u_worldSize.x * 2.0) - u_worldSize.x;
    pos.y = mod(pos.y - u_time * a_speed.y * u_gravity, u_worldSize.y * 2.0) - u_worldSize.y;

    pos.x += sin(u_time * a_speed.z) * a_rotation.z;
    pos.z += cos(u_time * a_speed.z) * a_rotation.z;

    gl_Position = u_projection * vec4( pos.xyz, a_position.w );
    gl_PointSize = ( a_size / gl_Position.w ) * 100.0;

}