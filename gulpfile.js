"use strict";

var gulp = require("gulp");
var electron = require("electron-connect").server.create();

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
