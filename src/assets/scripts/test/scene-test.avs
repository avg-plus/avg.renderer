let handle = api.loadScene(0, "large-scene.jpg", {
  block: true,
  transform: {
    stretch: false,
    // width: "100%",
    height: "100%"
    // x: "30%",
    // y: "100px"
  },
  animation: {
    name: "FadeIn",
    options: {
      duration: 10
    }
  }
});

let handle2 = api.loadScene(1, "aircraft.png", {
  block: true,
  transform: {
    stretch: false,
    // width: "100%",
    // height: "100%",
    x: "10%",
    y: "200px"
  },
  animation: {
    name: "FadeIn",
    options: {
      duration: 10
    }
  }
});

api.wait(3000);

// api.sceneEffect(0, "transparent", {
//   strength: 0.4,
//   duration: 5000
// });

api.sceneEffect(0, "moveTo", {
  x: -10000
});

api.showCharacter(
  {
    file: `/demo-char-2.png`,
    scale: 0.5
  },
  1
);

api.showText("我能吞下玻璃而不伤身体");

// api.sceneEffect(1, "transparent", {
//   strength: 0.6,
//   duration: 1000
// });

api.showText("泡面是不是世界上最帅的男人？");

let result = api.showChoices(["是", "是的"]);
if (result.selectedIndex === 0) {
  api.showText("您真有眼光");
  api.hideText();
} else {
  api.showText("说的太对了");
  api.hideText();
}
