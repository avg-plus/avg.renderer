let mainChar = "";
let secondChar = "";

const vizee = "[c=red][rt=战备通信专家]木村长[/rt][/c]";
const latyas = "[c=red][rt=死肥宅]拉提亚斯[/rt][/c]";

const char_vizee = function(index, suffix) {
  return {
    name: vizee,
    character: {
      index: index,
      avatar: {
        file: `demo/vizee_${suffix}.png`,
        renderer: {
          offset_x: -75,
          offset_y: -220,
          scale: 0.35,
          filter: []
        }
      }
    }
  };
};

api.showText(["「唔……」", "「咦……？[wait]这里是……？」"]);
api.hideText();
api.transitionTo("white", 1, 100);
api.loadScene(0, "demo/demo-tree.png");
api.transitionTo("white", 0, 100);
api.updateSetting("TextSpeed", 100);
api.showText(["「呜哇哇哇哇哇哇！！！！[wait]发生了什么？！」"]);
api.updateSetting("TextSpeed", 80);
api.hideText();
api.wait(1000);
api.showText(["「诶！？[wait=200]这是哪里？我是谁？我为什么突然出现在这个地方？」"], {
  name: "不知名少女"
});
api.hideText();
api.wait(1000);

api.showText(["「哈哈哈哈哈哈哈哈」"], {
  name: "奇怪的笑声"
});
api.hideText();
api.wait(500);
api.showText(["「……？」"], {
  name: "不知名少女"
});
api.hideText();
api.wait(500);
api.showText(["「哈哈哈哈哈哈」"], {
  name: "奇怪的笑声"
});
api.hideText();
api.wait(500);
api.showText(["……", "（……这魔性的笑声怕不是个傻子吧）"], {
  name: "不知名少女"
});
api.hideText();
api.wait(500);

api.playBGM("demo/demo_theme.mp3");
api.wait(1500);

api.showText(["「我，才不是什么傻子！」"], {
  name: "奇怪的人"
});

api.showText(["「诶！？你是谁啊，这是哪里，你怎么知道我在想什么！」"], {
  name: "不知名少女"
});

api.showText(["[s=26][c=red]爆裂吧现实！粉碎吧精神！放逐这个世界！[/c][/s]"], {
  name: "奇怪的人"
});

api.showText(["（……？？？）", "（这是哪来的中二病）", "（不好，我要赶紧弄懂自己为什么在这里。）"], {
  name: "不知名少女"
});
api.hideText();

api.wait(500);

api.showText(["「咳咳。」", "「女人，告诉我，你的名字。我会告诉你这是哪里。」"], {
  name: "奇怪的人"
});

api.showText(
  [
    "（这个人好像能知道我在想什么）",
    "（……太可怕了啊导演。）",
    "（万一，说不定他真的知道呢？为了赶紧离开这里，还是告诉他好了。）"
  ],
  {
    name: "不知名少女"
  }
);

let isOK = false;

while (!isOK) {
  let choice = api.showChoices(["风见", "（手动输入）"]);
  if (choice.selectedIndex === 3) {
    let inputResult = api.showInputBox("我叫什么名字？", {
      inputType: 0,
      minLength: 1,
      maxLength: 5,
      allowCancel: true
    });
    isOK = inputResult.isOK;
    if (!isOK) {
      api.showText(["「唔，还是告诉他名字吧……」"], {
        name: "不知名少女"
      });
    } else {
      api.setVariable("your_name", inputResult.value);
      mainChar = inputResult.value;
    }
  } else {
    isOK = true;
    api.setVariable("your_name", choice.selectedText);
    mainChar = choice.selectedText;
  }
}

api.showText(["「[c=yellow]${your_name}[/c]。」"], {
  name: "${your_name}"
});

api.hideText();
api.wait(500);

if (mainChar.match(/([A-Za-z0-9_])\w+/g)) {
  api.showText(["「[c=yellow]${your_name}[/c] 是什么破名字，乱打的吧？」"], {
    name: "奇怪的人"
  });
} else {
  api.showText(["「唔唔唔，[c=yellow]${your_name}[/c]，听上去真是个好名字。」"], {
    name: "奇怪的人"
  });
}

api.showText(["「女人，你成功引起了我的注意。」"], {
  name: "奇怪的人"
});

api.showText(["（……这是哪抄来的霸道总裁桥段）"], {
  name: "${your_name}"
});

api.setVariable("AngryPowman", "安格瑞·鲍尔曼");

api.showText(
  ["「这是一个虚拟的世界，它的创作者就是我。我是创世神——[c=red][rt=Angry Powman]${AngryPowman}[/rt][/c]。」"],
  {
    name: "${AngryPowman}"
  }
);

api.showText(["（真难听的名字！）"], {
  name: "${your_name}"
});

api.showText(["「女人，我知道你在想什么，你这是在玩火！」"], {
  name: "${AngryPowman}"
});

api.showText(["「喂，你把我带到这个奇怪的地方想干什么！」"], {
  name: "${your_name}"
});

api.showText(["「难道你没发现这个世界有什么问题吗？」"], {
  name: "${AngryPowman}"
});

api.showText(["(这个世界唯一的问题就是你吧……）"], {
  name: "${your_name}"
});

api.showText(["「这个世界，由 [c=red]脚本[/c] 组成，你所看到的所有元素，都是可以执行的代码单元。」"], {
  name: "${AngryPowman}"
});

api.showText(["「……明白了，但是我要反抗，离开这里！」"], {
  name: "${your_name}"
});

api.showText(
  ["「在某种情况下，你可能带有随机元素，但是你自以为可以反抗的自我意识，其实也被安排的明明白白。懂我意思吧？」"],
  {
    name: "${AngryPowman}"
  }
);

api.showText(["「不懂……所以我什么时候可以回去。」"], {
  name: "${your_name}"
});

api.showText(["「那么除了我们，这个世界不存在其他人了吗？」"], {
  name: "${your_name}"
});

api.showText(["「当然是存在的。看我——」", "「[c=red]禁术 · 大传送术！[/c]」"], {
  name: "${AngryPowman}"
});

api.hideText();
api.wait(300);

api.playSE("demo/clap.mp3");
api.loadScene(0, "");
api.wait(400);
api.playSE("demo/clap.mp3");
api.loadScene(0, "demo/cave.jpg");

api.wait(600);
api.playBGM("demo/demo_theme_2.mp3");
api.wait(600);

api.showText(["「！！！」", "「这是什么鬼地方！」"], {
  name: "${your_name}"
});

api.showText(["「我已经用失传很久的禁术把你传送到这里了。」", "「想学啊？我教你啊。」"], {
  name: "${AngryPowman}"
});

api.showText(["（不就是换了个场景么……不对我为什么会知道这个。）", "「没没没，我一点都不想学。」"], {
  name: "${your_name}"
});

api.showText(["「还从来没有人会这么无视我，很好，你成功的勾起了我的兴趣，女人。」"], {
  name: "${AngryPowman}"
});

api.showText(["「请你让开！像你这么有钱长的又帅的男人我是不会喜欢的。」"], {
  name: "${your_name}"
});

api.hideText();
api.wait(300);

api.showText(["「？？？」", "「等等，我为什么会说出这种话。混蛋，凑不要脸！」"], {
  name: "${your_name}"
});

api.showText(["「你跟外面那些妖艳的贱货完全不一样，有点意思。」"], {
  name: "${AngryPowman}"
});

api.showText(["（你到底是有多不会写剧本啊，就算不会也别抄霸道总裁啊！！）"], {
  name: "${your_name}"
});

// api.hideText();
// api.wait(600);

// api.showText(["「咳咳，妹妹，出来吧！」"], {
//   name: "${AngryPowman}"
// });

// api.hideText();
// api.wait(600);

// api.showText(["「哥哥，你找我吗？」"], {
//   name: "妹妹"
// });

// api.showText(["「诶？！好可爱的妹妹(*╹▽╹*)！」", "「不过为什么妹妹的画风和你完全不一样。」"], {
//   name: "${your_name}"
// });

// api.showText(["「因为……这是 Live2D，比起不会动的我们。我的妹妹不仅会自己动，还会改变姿势。」"], {
//   name: "${AngryPowman}"
// });

// api.showText(["「糟糕的对白！」"], {
//   name: "${your_name}"
// });

api.showText(["「是不是很厉害。」"], {
  name: "${AngryPowman}"
});

api.showText(["（一点都不！）"], {
  name: "${your_name}"
});

// api.showImage("demo/qrcode.jpg", {
//   size: "50%",
//   position: "(42%,20%)",
//   animation: {
//     name: "fadein"
//   }
// });

// api.showText(["「扫描屏幕上方的二维码，给我打钱。」"], {
//   name: "${AngryPowman}"
// });

// api.showText(["（这钱要的猝不及防！有人会给你钱才怪！）"], {
//   name: "${your_name}"
// });
// api.hideText();
// api.wait(400);

// const tuhao = ["誅诺", "黑娘", "王文璐", "章思源", "村长", "小安", "74", "胡大头"];
// for (let i = 0; i < tuhao.length; ++i) {
//   api.playSE("demo/coin.mp3");
//   api.showSubtitle(
//     `[s=22][c=yellow]${tuhao[i]}[/c] 支付了 $` + (Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000).toString(),
//     {
//       position: "(60%, " + (20 + i * 5).toString() + "%)",
//       animation: {
//         name: "flyIn",
//         options: {
//           direction: "left",
//           offset: 50,
//           duration: 200
//         }
//       }
//     }
//   );
//   api.wait(300);
// }

// api.wait(1000);
// api.showText(["「……」", "「居然还真的有人打钱了，这些人到底是有多有钱啊喂！」"], {
//   name: "${your_name}"
// });

// api.showText(["「咳咳，Please don't mind the detail.」"], {
//   name: "${AngryPowman}"
// });

// api.showText(["「收起你奇怪的英语！体育老师教的吧？！」"], {
//   name: "${your_name}"
// });

// api.hideText();
// api.wait(600);

// api.showText(["「哥哥你怎么不理我？」"], {
//   name: "妹妹"
// });

// api.showText(["「妹妹等我跟这个女人解释一下我英文为什么那么好。」"], {
//   name: "${AngryPowman}"
// });

// api.showText(["「哼╭(╯^╰)╮！」"], {
//   name: "妹妹"
// });

// api.showText(["[emoji=n2.jpg]"], {
//   name: "妹妹"
// });

// api.showText(["[s=30]男人没一个好东西！"], {
//   name: "妹妹"
// });

// api.showText(["[emoji=n1.jpg] [s=42]不理你惹！"], {
//   name: "妹妹"
// });

// api.hideText();
// api.wait(600);

// api.showText(["「……!!！」", "「妹妹等等我！」"], {
//   name: "${AngryPowman}"
// });

// api.hideText();
// api.wait(600);

// api.showText(["「？？？？」", "「喂你们两个算闹哪样，等……等等我。」"], {
//   name: "${your_name}"
// });

api.hideText();
api.wait(600);

api.transitionTo("black", 0, 0);
api.transitionTo("black", 1, 1000);

api.removeImage();
api.removeSubtitle();
api.wait(600);

api.loadScene(0, "demo/room.png");

api.transitionTo("black", 0, 1000);

api.showText(["「嗨，木村先生，我来看望您了。」"], {
  name: "${AngryPowman}"
});

api.showText(["「咳咳……」"]);

api.showText(
  ["「请称呼我的全名——[c=yellow]木村长[/c]。」", "「另外，据说有人原本打算今天要发一个很厉害的科幻短篇故事来着？」"],
  char_vizee(1, "normal")
);

api.hideCharacter(1);

api.showText(["「嘿嘿嘿，其实这个是有原因的。这不是画师跳票了嘛。看在只有你有立绘的份上……不提这事儿。」"], {
  name: "${AngryPowman}"
});

api.showText(["「哦？可是我听说你是因为沉迷游戏才导致跳票的。」"], char_vizee(1, "normal"));

api.hideCharacter(1);

api.showText(["「没……没有这回事，游戏制作人的事，能叫跳票吗？」"], {
  name: "${AngryPowman}"
});

api.showText(["「我认为得你在逃避跳票的责任。」", "「后面打算做一款什么样的游戏？」"], char_vizee(1, "normal"));
api.hideCharacter(1);
api.hideText();

api.showText(["「你也看到了，这都跳票了，我怎么知道是什么游戏。」"], {
  name: "${AngryPowman}"
});

api.showText(["「没有事先计划吗？」"], char_vizee(1, "normal"));

api.showText(["「有是有的，可这[rt=AVGPlus]引擎[/rt]部分完工都太久了。做一款正式正式的游戏太难了。」"], {
  name: "${AngryPowman}"
});

api.showText(["「哦？是什么游戏来着？」"], char_vizee(1, "normal"));
