/* 场景操作与特效 */
api.transitionTo("black", 0, 1000);

api.loadScene(0, "tutorial/avg-scene-forest.jpg", {
  transition: "brush"
});
// api.wait(1000);

while (true) {
  api.effect("blur", { duration: 3000, strength: 6 });
  api.wait(3000);
  api.effect("blur", { duration: 3000, strength: 0 });
  api.wait(3000);
}

// api.effect("blur", { duration: 3000 });
// api.effect("hue-rotate", { duration: 3000, strength: 23 });
// api.effect("brightness", { duration: 3000, strength: 23 });
// api.effect("contrast", { duration: 3000, strength: 50 });
// api.effect("grayscale", { duration: 3000, strength: 50 });
// api.effect("invert", { duration: 3000, strength: 80 });
// api.effect("sepia", { duration: 6000, strength: 80 });

// while (true) {
//   api.loadScene(0, "tutorial/bedroom-1.bmp", {
//     transition: "crossfade",
//     duration: 1000
//   });
//   api.wait(1000);

//   api.loadScene(0, "tutorial/bedroom-1-day.bmp", {
//     transition: "wipe"
//   });
//   api.wait(1000);

//   api.loadScene(0, "tutorial/avg-scene-house.jpg", {
//     transition: "brush-down"
//   });
//   api.wait(1000);

//   api.loadScene(0, "tutorial/avg-scene-forest.jpg", {
//     transition: "brush"
//   });
//   api.wait(1000);

//   api.loadScene(0, "tutorial/demo-bg-1.jpg", {
//     transition: "window-shades"
//   });
//   api.wait(1000);

//   api.loadScene(0, "tutorial/bedroom-1-day.bmp", {
//     transition: "iris-in"
//   });
//   api.wait(1000);

//   api.loadScene(0, "tutorial/avg-scene-house.jpg", {
//     transition: "iris-out"
//   });
//   api.wait(1000);
// }
// api.loadScene(0, "tutorial/avg-scene-forest.jpg");
api.wait(150000);

// api.showText("下面演示一下场景的加载 ~");

// api.loadScene(0, "tutorial/s3.png");
// api.wait(1000);
// api.loadScene(1, "tutorial/s2.png");
// api.wait(1000);
// api.loadScene(2, "tutorial/s1.png");

// api.wait(3000);

// api.removeScene(0);
// api.wait(1000);

// api.removeScene(1);
// api.wait(1000);

// api.removeScene(2);
