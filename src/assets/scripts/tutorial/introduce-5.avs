/* 图片 & 字幕相关 */

api.removeScene();
api.hideCharacter();
api.playBGM("tutorial/Sunburst.mp3");
api.wait(1200);
api.transitionTo("black", 0, 1000);

api.effect("snow");
// api.effect("cloud");
// api.effect(0, "rain");

api.loadScene(0, "tutorial/avg-scene-forest.jpg", {});

api.showText(
  [
    "当我们希望在屏幕显示一张[c=red]图片[/c]或者[c=red]字幕[/c]时，我们可以通过字幕&图片相关接口完成。",
    "需要区分的是，图片和立绘是不同的两个东西，图片允许我们显示在画面中任意一个位置。而立绘有固定的方式显示~ 如果想了解更多，可以观看 [c=red][文本以及立绘相关][/c] 章节的介绍。"
  ],
  {
    voice: ["tutorial/tutorial-5-0.wav", "tutorial/tutorial-5-1.wav"],
    character: {
      index: 2,
      avatar: {
        file: "tutorial/avg-char-1.png",
        renderer: {
          scale: 0.7,
          offset_y: -30
        }
      }
    }
  }
);

api.showText(
  [
    "我们先说字幕吧~ 字幕允许我们在屏幕上任意一个地方打印一行文本，我们可以用来作为剧情提示、章节显示等等，当然，你也可以通过这个方式来制作游戏的开场 Logo.",
    "下面是在预设的九个角落显示字幕~ "
  ],
  {
    voice: ["tutorial/tutorial-5-2.wav", "tutorial/tutorial-5-3.wav"],
    character: {
      index: 2,
      avatar: {
        file: "tutorial/avg-char-1.png"
      }
    }
  }
);

api.hideText();

api.removeScene(0);
api.wait(2000);

const positions = [
  ["左上", "topleft", undefined],
  ["右上", "topright", undefined],
  ["左下", "bottomleft", undefined],
  ["右下", "bottomright", undefined],
  ["上", "top", undefined],
  ["左", "left", undefined],
  ["右", "right", undefined],
  ["下", "bottom", undefined],
  ["居中", "center", undefined]
];

for (let i = 0; i < positions.length; ++i) {
  positions[i][2] = api.showSubtitle(
    positions[i][0],
    {
      position: positions[i][1],
      animation: {
        name: "flyin",
        options: {
          duration: 1300
        }
      }
    },
    true
  );
}

api.wait(3000);

api.removeSubtitle();

api.showText(
  [
    "这就是我们看到的所有在预设位置显示字幕的效果，当然我们也可以通过[b]指定具体坐标或坐标百分比[/b]的方式显示字幕。 比如：[br][br][c=yellow](100, 50) [br] (50%, 30%) [/c]"
  ],
  {
    voice: ["tutorial/tutorial-5-4.wav"],
    character: {
      index: 2,
      avatar: {
        file: "tutorial/avg-char-1.png"
      }
    }
  }
);

let s1 = [];
for (let i = 0; i < 7; ++i) {
  const x = i * 120;
  const y = i * 100 + 30;
  s1.push(
    api.showSubtitle("按绝对坐标 [c=yellow](" + x + ", " + y + ")[/c] 的字幕", {
      position: "(" + x + ", " + y + ")",
      animation: {
        name: "flyIn",
        options: {
          direction: "left",
          offset: 50,
          duration: 400
        }
      }
    })
  );
}

api.wait(1500);

for (let i = 0; i < s1.length; ++i) {
  api.removeSubtitle(
    s1[i].id,
    {
      animation: {
        name: "flyout",
        options: {
          offset: 300,
          duration: 300,
          direction: "right"
        }
      }
    },
    false
  );
}

let s2 = [];
for (let i = 0; i < 7; ++i) {
  const x = i * 10;
  const y = i * 10;
  s2.push(
    api.showSubtitle("按屏幕坐标比例 [c=red](" + x + "%, " + y + "%)[/c] 的字幕", {
      position: "(" + x + "%, " + y + "%)",
      animation: {
        name: "flyIn",
        options: {
          direction: "left",
          offset: 50,
          duration: 400
        }
      }
    })
  );
}

api.wait(1500);

for (let i = 0; i < s2.length; ++i) {
  api.removeSubtitle(
    s2[i].id,
    {
      animation: {
        name: "flyout",
        options: {
          offset: 300,
          duration: 300,
          direction: "down"
        }
      }
    },
    false
  );
}

api.showText(
  [
    "接下来是更加好玩的字幕相关接口，我们可以在已显示的字幕基础上，对它的文本进行更新~",
    "我们可以通过延时功能，在循环里不断更新字幕，比如说做一个计数器 ——"
  ],
  {
    name: "风见",
    voice: ["tutorial/tutorial-5-5.wav", "tutorial/tutorial-5-6.wav"],
    character: {
      index: 2,
      avatar: {
        file: "tutorial/avg-char-1.png"
      }
    }
  }
);

api.hideText();

api.removeScene(0);
api.wait(1000);

const updateTitle = api.showSubtitle("[c=red][s=32]0[/s][/c]", {
  position: "center"
});

for (let i = 1; i <= 1024; ++i) {
  api.updateSubtitle(updateTitle.id, "[c=red][s=32]" + i + "[/s][/c]");
  api.wait(2);
}

api.showText("怎么样，其实我们可以玩出很多花样呢，我们甚至可以通过更新字幕的样式，做更多花样。", {
  name: "风见",
  voice: ["tutorial/tutorial-5-7.wav"],
  character: {
    index: 2,
    avatar: {
      file: "tutorial/avg-char-1.png"
    }
  }
});

api.hideText();
api.wait(1000);

api.updateSubtitle(updateTitle.id, "[s=30]AVGPlus 是个好东西[/s]");
api.wait(1000);

for (let i = 30; i < 50; ++i) {
  api.updateSubtitle(updateTitle.id, "[s=" + i + "]AVGPlus 是个好东西[/s]");
  api.wait(100);
}

api.showText("甚至我们还能开一下脑洞，做一个纯文本的进度条动画~", {
  name: "风见",
  voice: ["tutorial/tutorial-5-8.wav"],
  character: {
    index: 2,
    avatar: {
      file: "tutorial/avg-char-1.png"
    }
  }
});

for (let i = 0; i < 40; ++i) {
  api.updateSubtitle(updateTitle.id, "[" + "-".repeat(i) + "_".repeat(40 - i - 1) + "]");
  api.wait(100);
}

api.wait(500);
api.removeSubtitle();

api.showText(
  [
    "这就差不多是字幕的大致功能啦。其中字幕的进场、退场都是可以配置动画以及详细的动画参数的。",
    "合理配置动画效果可以让游戏的演出效果更好。",
    "接下来介绍图片的显示功能，图片的显示和字幕非常类似，因为它们之间的坐标描述、动画效果都是统一的。",
    "换句话说，如果你已经掌握了字幕的基础使用方法，那么对于图片系列API的使用也会游刃有余。"
  ],
  {
    name: "风见",
    voice: [
      "tutorial/tutorial-5-9.wav",
      "tutorial/tutorial-5-10.wav",
      "tutorial/tutorial-5-11.wav",
      "tutorial/tutorial-5-12.wav"
    ],
    character: {
      index: 2,
      avatar: {
        file: "tutorial/avg-char-1.png"
      }
    }
  }
);

api.hideText();

const imgResult = api.showImage("tutorial/xiaohuangtu.png", {
  position: "(0%,10%)",
  size: "50%",
  animation: {
    name: "FlyIn",
    options: {
      direction: "Down",
      duration: 3000,
      offset: 300
    }
  }
});

api.removeImage(imgResult.id, {
  animation: {
    name: "FlyOut",
    options: {
      offset: 800,
      direction: "Up",
      duration: 4000
    }
  }
});

const m1 = api.showImage("tutorial/Monika_in_Valentines_Day.png", {
  size: "40%",
  position: "center",
  animation: {
    name: "flyin",
    options: {
      direction: "up",
      duration: 3000
    }
  }
});

api.removeImage(m1.id, {
  animation: { name: "flyout" }
});

const m2 = api.showImage("tutorial/Doki_Doki_Literature_Club!_char.png", {
  size: "100%",
  position: "center",
  animation: {
    name: "flyin",
    options: {
      direction: "up",
      duration: 5000
    }
  }
});

api.removeImage(m2.id, {
  animation: { name: "flyout", options: { direction: "right" } }
});
