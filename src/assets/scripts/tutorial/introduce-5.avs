api.showSubtitle(
  "test_id",
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

const img = api.showImage("img1", "assets/graphics/images/小黄图.png", {
  postion: "bottom",
  size: "30%",
  animation: {
    name: "FlyIn",
    options: {
      direction: "Up",
      duration: 3000,
      offset: 300
    }
  }
});

api.wait(3500);

api.removeImage("img1", {
  animation: {
    name: "FlyOut",
    options: {
      offset: 300,
      direction: "Up",
      duration: 3000
    }
  }
});

api.removeSubtitle("test_id", {
  animation: {
    name: "FlyOut",
    options: {
      duration: 3000,
      offset: 300,
      direction: "Down"
    }
  }
});
