// // // const api = require("./libs/avg-engine").api;

// const api = window["api"];

// api.wait(1000);

// api.playSE("assets/audio/se/tutorial/knock.mp3");
// api.wait(2000);

// api.showText("……[wait=1000][br]是谁啊，一大早扰人清梦");
// api.hideText();
// api.wait(2000);

// api.showText("你个混蛋，还不赶紧开门！", {
//   name: "震耳欲聋的声音",
//   character: {}
// });
// api.hideText();

// api.wait(1000);

// api.showText("……");
// api.showText("坏了！忘记约了这姑奶奶今天过来的，居然睡过头了。");
// api.hideText();

// api.wait(1000);
// api.showText("来……来了！");
// api.hideText();

// api.wait(500);

// // api.loadScene(0, "assets/graphics/backgrounds/tutorial/bedroom-1.bmp");
// // api.wait(2500);
// api.loadScene(0, "assets/graphics/backgrounds/tutorial/bedroom-1-day.bmp");
// api.wait(3000);

// api.playSE("assets/audio/se/tutorial/footstep.mp3");
// api.wait(2000);
// api.playSE("assets/audio/se/tutorial/bedroom-door.mp3");
// api.wait(1500);

// api.playBGM("assets/audio/bgm/tutorial/BeautifulHawaii.mp3");

// api.showCharacter(
//   {
//     file: "assets/graphics/characters/tutorial/girl-angry.png"
//   },
//   2
// );

// api.showText(
//   "你这混蛋真好意思呢，大清早把我叫过来，结果你还在睡觉。好好的周末就被你打乱了！",
//   {
//     name: "风见",
//     character: {}
//   }
// );

// api.hideCharacter();
// api.showText("姑奶奶我错了，您消消气！");

// api.showCharacter(
//   {
//     file: "assets/graphics/characters/tutorial/girl-sad.png"
//   },
//   2
// );
// api.showText(
//   "哼！[wait=1000][br]某人昨天还一脸严肃地约我今天过来，信了你的邪。",
//   {
//     character: {
//       name: "风见"
//     }
//   }
// );

// api.showText(
//   "开始吧，今天给我介绍一下 [b]AVGPlus[/b] 第一个版本的一些基础特性吧~",
//   {
//     character: {
//       name: "风见"
//     }
//   }
// );

// api.hideCharacter();

// api.showText(
//   "啊……这个，其实作为一个以表现效果为主的 AVG 开发框架，我在细节上下了更多功夫呢，希望可以提供更多定制化的特性。"
// );

// api.showCharacter(
//   {
//     file: "assets/graphics/characters/tutorial/girl-surprise.png"
//   },
//   2
// );

// api.showText(
//   "诶？！[wait]真的吗？好像很厉害的样子。（这条5毛，写在脚本上时删掉右边括号",
//   {
//     character: {
//       name: "风见"
//     }
//   }
// );

// api.hideCharacter();
// api.showText(
//   "唔……那我就开始给你介绍一下。首先是基础的对话和立绘处理部分，就是你见到的样子了。"
// );

// api.showCharacter(
//   {
//     file: "assets/graphics/characters/tutorial/girl-ask.png"
//   },
//   2
// );

// api.showText("这不是很常规的功能嘛，有什么特殊的地方。", {
//   character: {
//     name: "风见",
//     avatar: {
//       file: "assets/graphics/characters/tutorial/girl-ask.png"
//     }
//   }
// });

// console.log(api);

// +(async() => {
// await api.hideCharacter();//CallExpression

//  api.hideCharacter();
// });

// api.hideCharacter();

api.showSubtitle("tips", "", {
  position: "Top",
  animation: {
    name: "FlyIn",
    options: {
      direction: "Left",
      duration: 300
    }
  }
});

while (true) {
  api.loadScene(0, "assets/graphics/backgrounds/tutorial/bedroom-1-day.bmp", {
    block: true
  });
  api.wait(1600);
  api.showCharacter(
    {
      file: "assets/graphics/characters/tutorial/girl-ask.png"
    },
    2
  );

  api.showText("那么，你还有什么想要了解的呢？", {
    name: "风见",
    character: {
      avatar: {
        file: "assets/graphics/characters/tutorial/girl-ask.png"
      }
    }
  });


  const choice = api.showChoices(
    [
      "对话/立绘/文本输入处理",
      "场景操作/特效",
      "镜头效果",
      "音效/音乐",
      "存档变量操作",
      "字幕和图片显示",
      "游戏流程和延时控制",
      "插件机制说明"
    ],
    index => {  // onEnter
      const tips = [
        "介绍剧本对白、对话样式；立绘显示与隐藏、立绘效果以及变量输入处理。",
        "场景加载、过渡效果、场景粒子特效、多层场景以及景深效果演示。",
        "介绍镜头效果，包括全屏色调变化、全屏过渡以及镜头震动等特效。",
        "背景音乐、背景音效、音效的播放和停止。",
        "存档变量的设置与读取。",
        "字幕、图片的显示与动画介绍。",
        "介绍标题菜单、读/存档界面呼出、语言级流程控制语法、跳转到另一个脚本文件以及定时器处理。",
        "自定义游戏插件说明（高级）"
      ];

      api.updateSubtitle("tips", tips[index]);
    },
    index => {
      api.updateSubtitle("tips", "");
    }
  );

  api.updateSubtitle("tips", "");
  api.call("tutorial/introduce-" + choice.selectedIndex + ".avs");
}

// // if (choice.selectedIndex === 0) {
// //   api.call("tutorial/introduce-1.avs");
// // }

// // api.showText("Text after call ...");
// // const choice2 = api.showChoices([
// //   "对话和立绘",
// //   "场景操作与特效",
// //   "镜头效果",
// //   "音效/音乐",
// //   "变量操作",
// //   "字幕和图片显示",
// //   "流程和延时控制",
// //   "插件机制说明"
// // ]);
// // api.call("test/call-test.avs");
