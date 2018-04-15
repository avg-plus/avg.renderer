let handle = api.loadScene("assets/graphics/backgrounds/demo-bg-1.jpg", {
  index: 0,
  duration: 10,
  block: true
});

// api.sceneEffect(handle.index, "snow", {
//   strength: 10
// });

api.showCharacter(
  {
    file: `assets/graphics/characters/demo-char-2.png`,
    scale: 0.5
  },
  1
);

api.showText("我能吞下玻璃而不伤身体");

api.sceneEffect(handle.index, "blur", {
  strength: 4,
  duration: 5000
});

api.showText("泡面是不是世界上最帅的男人？");

let result = api.showChoices(["是", "是的"]);
if (result.selectedIndex === 0) {
  api.showText("您真有眼光");
  api.hideText();
} else {
  api.showText("说的太对了");
  api.hideText();
}
