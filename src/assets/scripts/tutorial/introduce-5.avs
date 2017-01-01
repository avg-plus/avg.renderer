let testSubtitleResult = api.showSubtitle(
  "我能吞下玻璃而[c=yellow][rt=bushangshenti]不伤身体[/rt][/c]",
  {
    postion: "center",
    animation: {
      name: "FlyIn",
      options: {
        duration: 1000,
        offset: 200
      }
    }
  }
);

const imgResult = api.showImage("assets/graphics/images/小黄图.png", {
  position: "(10,10)",
  size: "30%",
  animation: {
    name: "FlyIn",
    options: {
      direction: "Up",
      duration: 2000,
      offset: 300
    }
  }
});

console.log("Result:", testSubtitleResult, imgResult);

api.wait(2400);

api.removeImage(imgResult.id, {
  animation: {
    name: "FlyOut",
    options: {
      offset: 300,
      direction: "Up",
      duration: 3000
    }
  }
});

api.removeSubtitle(testSubtitleResult.id, {
  animation: {
    name: "FlyOut",
    options: {
      duration: 3000,
      offset: 300,
      direction: "Down"
    }
  }
});
