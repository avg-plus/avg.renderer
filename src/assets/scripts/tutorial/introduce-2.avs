// if (1) { 

api.transitionTo("", 0, 1000);
api.showText("test");

api.showChoices(["去音乐会", "去新年参拜", "sdfsdfadf"],
  index => {
    api.showText("onEnter callback");
  }, index => {
    api.showText("onLeave callback");
  }
);
// }
// if (wa2.selectedIndex === 0) {
//   // api.showText("404 NOT FOUND");
//   // api.loadScene(0, "tutorial/avg-scene-forest.jpg");

// } else {
//   // api.showText("丸户老贼！！！");
//   // api.loadScene(0, "tutorial/avg-scene-forest.jpg");

// }