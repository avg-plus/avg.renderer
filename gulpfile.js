"use strict";

const gulp = require("gulp");
var watch = require("gulp-watch");
const electron = require("electron-connect").server.create();

// import * as fs from "fs";
// import * as path from "path";
// const path = require("path");
const path = require("path");

// console.log(`Starting watch files ...`, electron);
gulp.task("serve-electron-connect", () => {
  // Start browser process
  electron.start();

  // Restart browser process
  //   gulp.watch(['electron.main.ts'], () => {
  //     console.log('electron.main.ts changed, compiling ...')
  //     shelljs.exec('tsc electron.main.ts --outDir ./dist');
  //   });

  //   gulp.watch(['dist/electron.main.js'], () => {
  //     console.log('electron.main.js updated, restarting electron ...')
  //     electron.restart();
  //   });

  // Reload renderer process
  gulp.watch(["dist/*.js", "dist/*.css", "dist/index.html"], electron.reload);
});

gulp.task("assets-watcher", () => {
  var sources = ["./src/assets", "./src/data"],
    destinations = ["./dist/desktop/assets", "./dist/desktop/data"];

  for (let i = 0; i < sources.length; ++i) {
    const source = sources[i];
    const destination = destinations[i];

    gulp
      .src(source + "/**/*", { base: source })
      .pipe(watch(source, { base: source }))
      .pipe(gulp.dest(destination));
  }

  // console.log("Copy '" + source + "' to " + destination + " ...");
});

// gulp.task("avs-watcher", () => {
//   const full = "/Users/angrypowman/Workspace/Programming/Revisions/avg-plus/avg.renderer/src/assets/scripts/";

//   const src = "./src/assets/**/*.avs";
//   const dest = "./dist/desktop/assets/scripts/";

//   // gulp.src(src).pipe(gulp.dest(dest));

//   const watcher = gulp.watch(src);
//   watcher.on("change", event => {
//     const short = event.path.replace(
//       "/Users/angrypowman/Workspace/Programming/Revisions/avg-plus/avg.renderer/src/assets/scripts/",
//       ""
//     );

//     const destFile = dest + short;
//     // gulp.del(destFile);
//     const destDir = path.dirname(destFile);

//     console.log("Copy '" + event.path + "' to " + destDir + " ...");

//     gulp.src(event.path).pipe(gulp.dest(destDir));
//   });
// });

gulp.task("avgplus-release", () => {
  const releasePath = "../avgplus-release";

  // 创建 .engine

  // 创建资源目录

  // 创建配置文件

  // fs.rmdirSync();
});
