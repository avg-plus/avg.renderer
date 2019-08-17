const path = require("path");
const webpack = require("webpack");
const ProgressPlugin = require("webpack/lib/ProgressPlugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require("autoprefixer");
const postcssUrl = require("postcss-url");
var glob = require("glob");
const CompressionPlugin = require("compression-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const {
  NoEmitOnErrorsPlugin,
  LoaderOptionsPlugin,
  DefinePlugin,
  HashedModuleIdsPlugin,
  ProvidePlugin
} = require("webpack");
const { GlobCopyWebpackPlugin, BaseHrefWebpackPlugin } = require("@angular/cli/plugins/webpack");
// const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CommonsChunkPlugin } = require("webpack").optimize;
const { AotPlugin } = require("@ngtools/webpack");

const nodeModules = path.join(process.cwd(), "node_modules");
const entryPoints = ["inline", "polyfills", "styles", "vendor", "main"];
const baseHref = "";
const deployUrl = "";

const isProd = process.env.NODE_ENV === "production";
const isBrowser = process.env.GAME_PLATFORM === "browser";
const isDesktop = process.env.GAME_PLATFORM === "desktop";

let outputPath;
let distTarget;

if (isBrowser) {
  outputPath = path.join(process.cwd(), "dist/web");
  distTarget = "web";
} else {
  outputPath = path.join(process.cwd(), "dist/desktop");
  distTarget = "node-webkit";
}

console.log("isProd", isProd);
console.log("process.env.GAME_PLATFORM", process.env.GAME_PLATFORM);

function getPlugins() {
  var plugins = [];

  // Always expose NODE_ENV to webpack, you can now use `process.env.NODE_ENV`
  // inside your code for any environment checks; UglifyJS will automatically
  // drop any unreachable code.
  plugins.push(
    new DefinePlugin({
      "process.env.NODE_ENV": '"production"'
    })
  );

  plugins.push(new NoEmitOnErrorsPlugin());
  // plugins.push(new BundleAnalyzerPlugin());
  plugins.push(
    new CompressionPlugin({
      deleteOriginalAssets: false
    })
  );

  plugins.push(
    new GlobCopyWebpackPlugin({
      patterns: ["data", "favicon.ico", "env.avd", "manifest.json", "loader.js", "libs"],
      globOptions: {
        cwd: process.cwd() + "/src",
        dot: true,
        ignore: "**/.gitkeep"
      }
    })
    // new CopyWebpackPlugin(["src/assets", "src/data", "src/favicon.ico", "src/manifest.json", "src/loader.js"], {
    //   ignore: "**/.gitkeep",
    //   // cwd: process.cwd() + "/src",
    //   dot: true
    // })
  );

  plugins.push(new ProgressPlugin());

  plugins.push(
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
      hash: false,
      inject: false,
      compile: true,
      favicon: false,
      minify: true,
      cache: true,
      showErrors: true,
      chunks: "all",
      excludeChunks: [],
      title: "Webpack App",
      xhtml: true,
      chunksSortMode: function sort(left, right) {
        let leftIndex = entryPoints.indexOf(left.names[0]);
        let rightindex = entryPoints.indexOf(right.names[0]);
        if (leftIndex > rightindex) {
          return 1;
        } else if (leftIndex < rightindex) {
          return -1;
        } else {
          return 0;
        }
      }
    })
  );

  plugins.push(new BaseHrefWebpackPlugin({}));

  plugins.push(
    new CommonsChunkPlugin({
      name: "inline",
      minChunks: null
    })
  );

  plugins.push(
    new CommonsChunkPlugin({
      name: "vendor",
      minChunks: module => module.resource && module.resource.startsWith(nodeModules),
      chunks: ["main"]
    })
  );

  plugins.push(
    new ExtractTextPlugin({
      filename: "[name].bundle.css",
      disable: true
    })
  );

  plugins.push(
    new LoaderOptionsPlugin({
      sourceMap: false,
      options: {
        postcss: [
          autoprefixer(),
          postcssUrl({
            url: obj => {
              // Only convert root relative URLs, which CSS-Loader won't process into require().
              if (!obj.url.startsWith("/") || obj.url.startsWith("//")) {
                return obj.url;
              }
              if (deployUrl.match(/:\/\//)) {
                // If deployUrl contains a scheme, ignore baseHref use deployUrl as is.
                return `${deployUrl.replace(/\/$/, "")}${obj.url}`;
              } else if (baseHref.match(/:\/\//)) {
                // If baseHref contains a scheme, include it as is.
                return baseHref.replace(/\/$/, "") + `/${deployUrl}/${obj.url}`.replace(/\/\/+/g, "/");
              } else {
                // Join together base-href, deploy-url and the original URL.
                // Also dedupe multiple slashes into single ones.
                return `/${baseHref}/${deployUrl}/${obj.url}`.replace(/\/\/+/g, "/");
              }
            }
          })
        ],
        sassLoader: {
          sourceMap: false,
          includePaths: []
        },
        lessLoader: {
          sourceMap: false
        },
        context: ""
      }
    })
  );

  if (isProd) {
    // plugins.push(
    //   new HashedModuleIdsPlugin({
    //     hashFunction: "md5",
    //     hashDigest: "base64",
    //     hashDigestLength: 4
    //   })
    // );

    plugins.push(
      new AotPlugin({
        mainPath: "main.ts",
        hostReplacementPaths: {
          "environments/index.ts": "environments/index.prod.ts"
        },
        exclude: [],
        tsConfigPath: "src/tsconfig.app.json",
        skipCodeGeneration: true
      })
    );

    // plugins.push(
    //   new UglifyJsPlugin({
    //     test: /\.js($|\?)/i
    //   })
    // );
  } else {
    plugins.push(
      new AotPlugin({
        mainPath: "main.ts",
        hostReplacementPaths: {
          "environments/index.ts": "environments/index.ts"
        },
        exclude: [],
        tsConfigPath: "src/tsconfig.app.json",
        skipCodeGeneration: true
      })
    );
  }

  return plugins;
}

module.exports = {
  devtool: "cheap-module-source-map",
  watch: true,
  externals: {
    electron: "require('electron')"
  },
  resolve: {
    extensions: [".ts", ".js", ".scss", ".json", ".avs"],
    aliasFields: [],
    alias: {
      environments: isProd
        ? path.resolve(__dirname, "src/environments/index.prod.ts")
        : path.resolve(__dirname, "src/environments/index.ts")
    },
    modules: ["./node_modules"]
  },
  resolveLoader: {
    modules: ["./node_modules"]
  },
  entry: {
    loader: ["./src/loader.js"],
    libs: glob.sync("./src/libs/*.js"),
    main: ["./src/main.ts"],
    polyfills: ["./src/polyfills.ts"],
    styles: ["./src/styles.scss"]
  },
  output: {
    path: outputPath,
    filename: "[name].bundle.js",
    chunkFilename: "[id].chunk.js"
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.(js|ts)$/,
        loader: "source-map-loader",
        exclude: [/\/node_modules\//, path.join(__dirname, "node_modules", "@angular/compiler")]
      },
      {
        test: /\.html$/,
        loader: "html-loader"
      },
      {
        test: /\.(eot|svg)$/,
        loader: "file-loader?name=[name].[hash:20].[ext]"
      },
      {
        // Pack fonts
        test: /\.(ttf|woff|woff2)$/,
        // loader: "url-loader?name=[name].aaa[ext]"
        loader: "url-loader?name=[name].[hash:20].[ext]&limit=10000"
      },
      {
        test: /\.(jpg|png|gif|otf|cur|ani|svg)$/,
        // loader: "url-loader?name=[name].[hash:20].[ext]&limit=10000"
        loader: "url-loader?name=[name].[ext]"
        // loader: "null-loader"
      },
      {
        test: /\.(glsl|vs|fs|frag|vert)$/,
        loader: "ts-shader-loader"
      },
      {
        exclude: [path.join(process.cwd(), "src/styles.scss")],
        test: /\.css$/,
        loaders: [
          "exports-loader?module.exports.toString()",
          'css-loader?{"sourceMap":false,"importLoaders":1}',
          "postcss-loader"
        ]
      },
      {
        exclude: [path.join(process.cwd(), "src/styles.scss")],
        test: /\.scss$|\.sass$/,
        loaders: [
          "exports-loader?module.exports.toString()",
          'css-loader?{"sourceMap":false,"importLoaders":1}',
          "postcss-loader",
          "sass-loader"
        ]
      },
      {
        exclude: [path.join(process.cwd(), "src/styles.scss")],
        test: /\.less$/,
        loaders: [
          "exports-loader?module.exports.toString()",
          'css-loader?{"sourceMap":false,"importLoaders":1}',
          "postcss-loader",
          "less-loader"
        ]
      },
      {
        exclude: [path.join(process.cwd(), "src/styles.scss")],
        test: /\.styl$/,
        loaders: [
          "exports-loader?module.exports.toString()",
          'css-loader?{"sourceMap":false,"importLoaders":1}',
          "postcss-loader",
          'stylus-loader?{"sourceMap":false,"paths":[]}'
        ]
      },
      {
        include: [path.join(process.cwd(), "src/styles.scss")],
        test: /\.css$/,
        loaders: ExtractTextPlugin.extract({
          use: ['css-loader?{"sourceMap":false,"importLoaders":1}', "postcss-loader"],
          fallback: "style-loader",
          publicPath: ""
        })
      },
      {
        include: [path.join(process.cwd(), "src/styles.scss")],
        test: /\.scss$|\.sass$/,
        loaders: ExtractTextPlugin.extract({
          use: ['css-loader?{"sourceMap":false,"importLoaders":1}', "postcss-loader", "sass-loader"],
          fallback: "style-loader",
          publicPath: ""
        })
      },
      {
        include: [path.join(process.cwd(), "src/styles.scss")],
        test: /\.less$/,
        loaders: ExtractTextPlugin.extract({
          use: ['css-loader?{"sourceMap":false,"importLoaders":1}', "postcss-loader", "less-loader"],
          fallback: "style-loader",
          publicPath: ""
        })
      },
      {
        include: [path.join(process.cwd(), "src/styles.scss")],
        test: /\.styl$/,
        loaders: ExtractTextPlugin.extract({
          use: [
            'css-loader?{"sourceMap":false,"importLoaders":1}',
            "postcss-loader",
            'stylus-loader?{"sourceMap":false,"paths":[]}'
          ],
          fallback: "style-loader",
          publicPath: ""
        })
      },
      {
        test: /\.ts$/,
        loader: "@ngtools/webpack"
      },
      {
        test: /\.json$/,
        loader: "json-loader"
      }
    ]
  },
  plugins: getPlugins(),
  node: {
    fs: "empty",
    global: true,
    crypto: "empty",
    tls: "empty",
    net: "empty",
    process: true,
    module: false,
    // clearImmediate: false,
    // setImmediate: false,
    __dirname: false,
    __filename: false
  },
  target: distTarget,
  devServer: {
    disableHostCheck: true
  }
};
