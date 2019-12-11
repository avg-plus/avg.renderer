const path = require("path");

module.exports = {
  module: {
    rules: [
      {
        test: /\.(glsl|vs|fs|frag|vert)$/,
        loader: "ts-shader-loader",
      },
    ],
  },
  plugins: [],
  node: {
    fs: "empty",
    global: true,
    crypto: "empty",
    tls: "empty",
    net: "empty",
    process: true,
    module: false,
    __dirname: false,
    __filename: false
  },
  target: "web"
};
