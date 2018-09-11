// api.showChoices(["去音乐会", "去新年参拜", "sdfsdfadf"],
//   index => {
//     // api.showText("onEnter callback");
//     console.log("dfadsf")
//     api.asdadasdfsdf("onLeave callback");

//   }, index => {
//     console.log("dfadsf")

//     api.asdadasdfsdf("onLeave callback");
//   })

api.playBGM("tutorial/BeautifulHawaii.mp3");

while (true) {
  api.hideCharacter();
  api.hideText();

  const titleResult = api.showSubtitle(
    "",
    {
      position: "Top",
      animation: {
        options: {
          direction: "Left"
        }
      }
    },
    false
  );

  api.loadScene(0, "tutorial/avg-scene-forest.jpg", {
    transition: "crossfade",
    renderer: {
      // scale: 0.7,
      width: 100,
      height: 100,
      x: 0,
      y: 0,
      offset_x: 0,
      offset_y: 0,
      filter: [
        // {
        //   name: "sepia",
        //   strength: 40
        // },
        // {
        //   name: "hue-rotate",
        //   strength: 40
        // },
        // {
        //   name: "blur",
        //   strength: 50
        // }
      ]
    }
  });

  api.transitionTo("black", 0, 1000);

  // api.effect("sepia", { duration: 1000, strength: 80 });
  // api.effect("blur", { duration: 1, strength: 20 });

  //   api.wait(1000);
  // api.effect("sakura");
  api.showCharacter(1, "cat-normal.png", {
    renderer: {
      scale: 0.7,
      filter: []
    }
  });
  // api.showCharacter(2, "tutorial/girl-angry.png", {});
  // api.showCharacter(3, "tutorial/girl-ask.png", {});
  // api.showCharacter(4, "tutorial/girl-sad.png", {});
  // api.showCharacter(5, "tutorial/girl-smile.png", {});

  api.showText("少年，你想知道什么呢？", {
    name: "风见",
    character: {
      index: 2,
      avatar: {
        file: "tutorial/girl-normal.png",
        renderer: {
          offset_x: 0,
          offset_y: -33,
          scale: 0.7,
          filter: [
            // {
            //   name: "sepia",
            //   strength: 20
            // }
          ]
        }
      }
    }
  });

  // api.hideText();

  const choice = api.showChoices(
    [
      "对话/立绘/文本输入处理",
      "场景操作/特效",
      "镜头效果",
      "音效/音乐",
      "存档变量操作",
      "字幕和图片显示",
      "游戏流程和延时控制",
      "千万不要点这里",
      "demo"
    ],
    index => {
      const tips = [
        "介绍剧本对白、对话样式；立绘显示与隐藏、立绘效果以及变量输入处理。",
        "场景加载、过渡效果、场景粒子特效、多层场景以及景深效果演示。",
        "介绍镜头效果，包括全屏色调变化、全屏过渡以及镜头震动等特效。",
        "背景音乐、背景音效、音效的播放和停止。",
        "存档变量的设置与读取。",
        "字幕、图片的显示与动画介绍。",
        "介绍标题菜单、读/存档界面呼出、语言级流程控制语法、跳转到另一个脚本文件以及定时器处理。",
        "千万不要点这里",
        "demo"
      ];

      api.updateSubtitle(titleResult.id, tips[index]);
    },
    index => {
      api.updateSubtitle(titleResult.id, "");
    }
  );

  api.removeSubtitle(titleResult.id);

  // api.transitionTo("black", 1, 500);

  api.hideCharacter();
  api.hideText();
  // api.loadScene(0, "");

  // if (choice.selectedIndex === 0) {
  //   api.call("tutorial/introduce-0.avs");
  // } else if (choice.selectedIndex === 1) {
  //   api.call("tutorial/introduce-5.avs");
  // } else if (choice.selectedIndex === 2) {
  //   api.call("tutorial/introduce-7.avs");
  // }

  api.call("tutorial/introduce-" + choice.selectedIndex + ".avs");
}
