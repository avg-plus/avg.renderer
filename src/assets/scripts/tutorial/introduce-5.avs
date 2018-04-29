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

api.showImage("img1", "assets/graphics/images/小黄图.png", {
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
