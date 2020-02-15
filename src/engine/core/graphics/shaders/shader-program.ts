const defaultVertex = require("./default-vert.frag").default;
const defaultFragment = require("./default-fragment.frag").default;

interface GLBufferData {
  size: number;
  data: any[];
}

interface GLBuffers {
  glBuffer: any;    // For WebGL Buffer

  [key: string]: any;

  // position: GLBufferData;
  // color: GLBufferData;
  // rotation: GLBufferData;
  // size: GLBufferData;
  // speed: GLBufferData;
}


export class ShaderOptions {
  antialias = false;
  depthTest = false;
  mousemove = false;
  autosize = true;
  msaa = 0;
  vertex: string;
  fragment: string;
  uniforms: any;
  buffers: GLBuffers;
  camera: any;
  texture: any;
  // onUpdate: (delta: number) => void;
  // onResize: (w: number, h: number, dpi: number) => void;
}

abstract class ShaderProgram {

  protected programOptions: ShaderOptions;
  protected data: {
    uniforms: any;
    buffers: any;
  } = {
      uniforms: {},
      buffers: null
    };


  gl: WebGLRenderingContext;
  private canvas: HTMLCanvasElement;
  private holder: HTMLElement;
  private program: WebGLProgram;
  private glTexture: WebGLTexture;

  private count: number = 0;
  private width: number = 0;
  private height: number = 0;
  private aspect: number = 0;
  private dpi: number = 0;
  private msaa: number = 0;
  private time: { start: number; old: number } = { start: 0, old: 0 };

  constructor() {
  }

  protected run(options: ShaderOptions, holder: HTMLElement) {
    this.holder = holder;

    this.programOptions = Object.assign(
      {
        antialias: false,
        depthTest: false,
        mousemove: false,
        autosize: true,
        msaa: 0,
        vertex: defaultVertex,
        fragment: defaultFragment,
        uniforms: {},
        buffers: {},
        camera: {},
        texture: null,
        // onUpdate: (delta: number) => { },
        // onResize: (w: number, h: number, dpi: number) => { }
      },
      options
    );

    this.programOptions.uniforms = Object.assign(
      {
        time: { type: "float", value: 0 },
        hasTexture: { type: "int", value: 0 },
        resolution: { type: "vec2", value: [0, 0] },
        mousemove: { type: "vec2", value: [0, 0] },
        projection: { type: "mat4", value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] }
      },
      options.buffers
    );

    console.log("pass in buffers: ", options.buffers)
    this.programOptions.buffers = Object.assign(
      {
        position: { size: 3, data: [] },
        color: { size: 4, data: [] },
        size: { size: 1, data: [] },
        rotation: { size: 3, data: [] },
        speed: { size: 3, data: [] }
      },
      options.buffers
    );
    console.log("merged buffers: ", this.programOptions.buffers)


    this.programOptions.camera = Object.assign(
      {
        fov: 60,
        near: 1,
        far: 10000,
        aspect: 1,
        z: 100,
        perspective: true
      },
      options.camera
    );

    this.canvas = document.createElement("canvas");
    this.gl = this.canvas.getContext("webgl", { antialias: this.programOptions.antialias });

    if (!this.gl) {
      console.error("Initial GL context failed.");
      return;
    }

    this.count = 0;
    // this.gl = gl;
    // this.canvas = canvas;
    // this.camera = camera;
    // this.holder = holder;
    // this.msaa = options.msaa;
    // this.programOptions.onUpdate = options.onUpdate;
    // this.programOptions.onResize = options.onResize;
    // this.data = {};

    this.holder.appendChild(this.canvas);


    this.createProgram(this.programOptions.vertex, this.programOptions.fragment);

    this.createBuffers(this.programOptions.buffers);
    this.createUniforms(this.programOptions.uniforms);

    this.updateBuffers();
    this.updateUniforms();

    this.createTexture(this.programOptions.texture);

    this.gl.enable(this.gl.BLEND);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE);
    this.gl[this.programOptions.depthTest ? "enable" : "disable"](this.gl.DEPTH_TEST);

    if (this.programOptions.autosize) window.addEventListener("resize", e => this.resize(e), false);
    if (this.programOptions.mousemove) window.addEventListener("mousemove", e => this.mousemove(e), false);

    // 初始进行一次 resize
    // this.resize = this.resize.bind(this);
    this.resize();

    this.update = this.update.bind(this);
    this.time = { start: performance.now(), old: performance.now() };
    this.update();
  }

  private mousemove(e) {
    let x = (e.pageX / this.width) * 2 - 1;
    let y = (e.pageY / this.height) * 2 - 1;

    this.programOptions.uniforms.mousemove = [x, y];
  }

  private resize(e?: UIEvent) {
    const holder = this.holder;
    const canvas = this.canvas;
    const gl = this.gl;

    const width = (this.width = holder.offsetWidth);
    const height = (this.height = holder.offsetHeight);
    const aspect = (this.aspect = width / height);
    const dpi = (this.dpi = Math.max(this.msaa ? 2 : 1, devicePixelRatio));

    canvas.width = width * dpi;
    canvas.height = height * dpi;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";

    gl.viewport(0, 0, width * dpi, height * dpi);
    gl.clearColor(0, 0, 0, 0);

    this.programOptions.uniforms.resolution = [width, height];
    this.programOptions.uniforms.projection = this.setProjection(aspect);

    // this.programOptions.onResize(width, height, dpi);

    // 调用抽象方法
    this.onInit(width, height, dpi);
  }

  private setProjection(aspect) {
    const camera = this.programOptions.camera;

    if (camera.perspective) {
      camera.aspect = aspect;

      const fovRad = camera.fov * (Math.PI / 180);
      const f = Math.tan(Math.PI * 0.5 - 0.5 * fovRad);
      const rangeInv = 1.0 / (camera.near - camera.far);

      const matrix = [
        f / camera.aspect,
        0,
        0,
        0,
        0,
        f,
        0,
        0,
        0,
        0,
        (camera.near + camera.far) * rangeInv,
        -1,
        0,
        0,
        camera.near * camera.far * rangeInv * 2,
        0
      ];

      matrix[14] += camera.z;
      matrix[15] += camera.z;

      return matrix;
    } else {
      return [2 / this.width, 0, 0, 0, 0, -2 / this.height, 0, 0, 0, 0, 1, 0, -1, 1, 0, 1];
    }
  }

  private createShader(type, source) {
    const gl = this.gl;
    const shader = gl.createShader(type);

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      return shader;
    } else {
      console.log(gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
    }
  }

  private createProgram(vertex, fragment) {
    const gl = this.gl;

    const vertexShader = this.createShader(gl.VERTEX_SHADER, vertex);
    const fragmentShader = this.createShader(gl.FRAGMENT_SHADER, fragment);

    const program = gl.createProgram();

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.useProgram(program);
      this.program = program;
    } else {
      console.log(gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
    }
  }

  private createUniforms(data) {
    const gl = this.gl;
    const uniforms = (this.data.uniforms = data);
    const values = (this.programOptions.uniforms = {});

    Object.keys(uniforms).forEach(name => {
      const uniform = uniforms[name];

      uniform.location = gl.getUniformLocation(this.program, "u_" + name);

      Object.defineProperty(values, name, {
        set: value => {
          uniforms[name].value = value;
          this.setUniform(name, value);
        },
        get: () => uniforms[name].value
      });
    });
  }

  private setUniform(name, value) {
    const gl = this.gl;
    const uniform = this.data.uniforms[name];

    uniform.value = value;

    switch (uniform.type) {
      case "int": {
        gl.uniform1i(uniform.location, value);
        break;
      }
      case "float": {
        gl.uniform1f(uniform.location, value);
        break;
      }
      case "vec2": {
        gl.uniform2f(uniform.location, value.x, value.y);
        break;
      }
      case "vec3": {
        gl.uniform3f(uniform.location, value.x, value.y, value.z);
        break;
      }
      case "vec4": {
        gl.uniform4f(uniform.location, value.x, value.y, value.z, value.w);
        break;
      }
      case "mat2": {
        gl.uniformMatrix2fv(uniform.location, false, value);
        break;
      }
      case "mat3": {
        gl.uniformMatrix3fv(uniform.location, false, value);
        break;
      }
      case "mat4": {
        gl.uniformMatrix4fv(uniform.location, false, value);
        break;
      }
    }

    // 类型映射：
    // ivec2       : uniform2i,
    // ivec3       : uniform3i,
    // ivec4       : uniform4i,
    // sampler2D   : uniform1i,
    // samplerCube : uniform1i,
    // bool        : uniform1i,
    // bvec2       : uniform2i,
    // bvec3       : uniform3i,
    // bvec4       : uniform4i,
  }

  private updateUniforms() {
    // const gl = this.gl;
    const uniforms = this.data.uniforms;

    Object.keys(uniforms).forEach(name => {
      const uniform = uniforms[name];

      this.programOptions.uniforms[name] = uniform.value;
    });
  }

  private createBuffers(data: GLBuffers) {
    const buffers = (this.data.buffers = data);

    this.programOptions.buffers = <any>{};
    const values = this.programOptions.buffers;

    console.log("createBuffers", buffers);


    Object.keys(buffers).forEach(name => {
      const buffer = buffers[name];

      buffer.buffer = this.createBuffer("a_" + name, buffer.size);
      // this.setBuffer(name, buffer.buffer);
      Object.defineProperty(values, name, {
        set: data => {

          // console.log("setter ", name)

          // buffers[name].data = data;
          // this.setBuffer(name, data);

          // console.log("setter ", data)
          buffers[name].data = data;
          this.setBuffer(name, data);

          if (name == "position") this.count = buffers.position.data.length / 3;
        },
        get: () => {
          console.log("getter ", name)
          return buffers[name].data
        }
      });

    });

    // console.log("after createBuffers", values["speed"]);
    // const getV = Object.getOwnPropertyDescriptor(values, "speed").get;
    // console.log("GetV", getV());
  }

  private createBuffer(name: string, size: number) {
    const gl = this.gl;
    const program = this.program;

    const index = gl.getAttribLocation(program, name);
    const buffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.enableVertexAttribArray(index);
    gl.vertexAttribPointer(index, size, gl.FLOAT, false, 0, 0);

    return buffer;
  }

  private setBuffer(name?: string, data?: any) {

    const gl = this.gl;
    const buffers = this.data.buffers;

    if (name === null) {
      gl.bindBuffer(gl.ARRAY_BUFFER, null)
      return;
    };

    gl.bindBuffer(gl.ARRAY_BUFFER, buffers[name].buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
  }

  toggleTestBuffer() {
    // const speedBuffer = this.createBuffer("speed", 3);
    // this.setBuffer("speed", [1, 0, 1])

    this.setUniform("speed", 100);

  }


  // private updateUniforms() {
  //   // const gl = this.gl;
  //   const uniforms = this.data.uniforms;

  //   Object.keys(uniforms).forEach(name => {
  //     const uniform = uniforms[name];

  //     this.programOptions.uniforms[name] = uniform.value;
  //   });
  // }

  // private updateBuffers() {
  //   const buffers = this.data.buffers;
  //   Object.keys(buffers).forEach(name => {
  //     const buffer = buffers[name];
  //     // this.programOptions.buffers[name] = buffer.data;
  //     buffers[name] = buffers[name].buffer.data
  //   });  // ?


  //   this.setBuffer(null);
  // }

  private updateBuffers() {
    const buffers = this.programOptions.buffers;

    console.log("updateBuffers", buffers);

    Object.keys(buffers).forEach(name => {
      // buffers[name] = buffers[name].buffer.data;
      // buffers[name] = buffers[name].buffer.data
      const buffer = buffers[name];
      buffers[name] = buffers[name].data;

    });  // ?

    // Object.keys(buffers).forEach(name => (buffers[name] = buffer.data));
    // console.log("updateBuffers", buffers);

    this.setBuffer(null);
  }

  private createTexture(src) {
    const gl = this.gl;
    const texture = gl.createTexture();

    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 0]));

    this.glTexture = texture;

    if (src) {
      this.programOptions.uniforms.hasTexture = 1;
      this.loadTexture(src);
    }
  }

  private loadTexture(src) {
    const gl = this.gl;
    const texture = this.glTexture;

    const textureImage = new Image();

    textureImage.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, texture);

      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureImage);

      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

      // gl.generateMipmap( gl.TEXTURE_2D )
    };

    textureImage.src = src;
  }

  private update() {

    const gl = this.gl;

    const now = performance.now();
    const elapsed = (now - this.time.start) / 5000;
    const delta = now - this.time.old;
    this.time.old = now;

    this.programOptions.uniforms.time = elapsed;

    // test
    // console.log(this.programOptions.buffers);

    if (this.count > 0) {
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.POINTS, 0, this.count);
    }

    // 调用抽象方法
    this.onUpdate(delta);

    // console.log("this.programOptions", this.programOptions);


    requestAnimationFrame(this.update);
  }

  // 子类需要重写以下抽象方法
  protected abstract onUpdate(delta: number): void;
  protected abstract onInit(width: number, height: number, dpi: number): void;

}

export { ShaderProgram };
