// // const api = require("./libs/avg-engine").api;

const api = window["api"];

// // // 等待 1 秒
// api.wait(1000);

// // // 播放音效
// api.playSE("assets/audio/se/tutorial/knock.mp3");
// api.wait(2000);

// // // 显示文本对白
// api.showText("……[wait=1000][br]是谁啊，一大早扰人清梦");
// api.hideText();
// api.wait(2000);

// api.showText("你个混蛋，还不赶紧开门！", {
//   character: {
//     name: "震耳欲聋的声音"
//   }
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

// api.loadScene(0, "assets/graphics/backgrounds/tutorial/bedroom-1.bmp");
// api.wait(2500);
api.loadScene(0, "assets/graphics/backgrounds/tutorial/bedroom-1-day.bmp");
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
//     character: {
//       name: "风见"
//     }
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
//   "哼！[wait=1000][br]某人昨天还一脸严肃地约我今天过来，果然不是什么大事，信了你的邪。",
//   {
//     character: {
//       name: "风见"
//     }
//   }
// );

// api.hideCharacter();

// api.showText("姑奶奶您别生气，我这不是有事要告诉你嘛。");

// api.showCharacter(
//   {
//     file: "assets/graphics/characters/tutorial/girl-ask.png"
//   },
//   2
// );

// api.showText("说吧。我很忙的。理由要是不能让我满意，头给你打烂！", {
//   character: {
//     name: "风见"
//   }
// });

// api.hideCharacter();

// api.showText(
//   "你最近不是在做AVG嘛，我刚好开发了一个超级强大的制作工具，想安利给你用一下。可以让你的剧本表现效果更好。"
// );

// api.showCharacter(
//   {
//     file: "assets/graphics/characters/tutorial/girl-surprise.png"
//   },
//   2
// );

// api.showText("诶？！[wait]真的吗？有多厉害，我一直在为这个发愁呢。", {
//   character: {
//     name: "风见"
//   }
// });

api.hideCharacter();
api.showText(
  "唔……那我就开始给你介绍一下。首先是基础的对话和立绘处理部分，就是你见到的样子了。"
);

api.showCharacter(
  {
    file: "assets/graphics/characters/tutorial/girl-ask.png"
  },
  2
);

api.showText("这不是很常规的功能嘛，有什么特殊的地方。", {
  character: {
    name: "风见",
    avatar: {
      file: "assets/graphics/characters/tutorial/girl-ask.png"
    }
  }
});

api.hideCharacter();
api.showText(
  "显示对话里可以随意改变[c=red]文字的颜色啦[/c]，另外你还能改变字的大小，比如[s=20]这样[/s]，[s=26]这样[/s]，[s=30]还有这样！[/s]"
);
