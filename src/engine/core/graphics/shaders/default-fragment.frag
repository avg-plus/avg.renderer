precision highp float;

uniform sampler2D u_texture;
uniform int u_hasTexture;

varying vec4 v_color;

void main() {
  if ( u_hasTexture == 1 ) {

    gl_FragColor = v_color * texture2D(u_texture, gl_PointCoord);
  } else {
    gl_FragColor = v_color;
  }
}