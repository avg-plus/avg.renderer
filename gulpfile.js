"use strict";

const gulp = require("gulp");
const electron = require("electron-connect").server.create();

import * as fs from "fs";

console.log(`Starting watch files ...`, electron);
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

gulp.task("avgplus-release", () => {
  const releasePath = "../avgplus-release";

  // 创建 .engine

  // 创建资源目录

  // 创建配置文件


  fs.rmdirSync()
});
