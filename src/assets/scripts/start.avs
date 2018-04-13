let main = {
  character: {
    name: "主角",
    avatar: {
      file: "assets/graphics/characters/cat-normal.png",
      scale: 0.5
    }
  }
};

let dragon = {
  character: {
    name: "龙人",
    avatar: {
      file: "assets/graphics/characters/cat-normal.png",
      scale: 0.5
    }
  }
};

function mainChar(emotion, scale = 0.2) {
  return {
    character: {
      name: "主角",
      avatar: {
        file: `assets/graphics/characters/boy-${emotion}.png`,
        scale: scale
      }
    }
  };
}

function dragonChar(emotion, scale = 0.5) {
  return {
    character: {
      name: "龙人",
      avatar: {
        file: `assets/graphics/characters/cat-${emotion}.png`,
        scale: 0.5
      }
    }
  };
}

// api.showSubtitle("这是一个关于孤独与成长的故事");

api.setVariable("主角名字", "Variables");

api.playSE("assets/audio/bgs/snow.mp3");

api.showText(
  "[c=orange]${主角名字}！[/c][c=yellow][del]快起来[/del][/c]！[i]现在[/i]不是[color=red]装死[/color]的时候了！",
  dragonChar("angry")
);
api.showText(
  "[emoji=mh-cold.gif][size=12][c=#332FCD]天降正义[/c][/size]！！",
  mainChar("laugh")
);

api.showCharacter(
  {
    file: `assets/graphics/characters/demo-char-2.png`,
    scale: 0.5
  },
  1
);

api.wait(4500);

api.showCharacter(
  {
    file: `assets/graphics/characters/demo-char-1.png`,
    scale: 0.5
  },
  1
);

// api.showCharacter(
//   {
//     file: `assets/graphics/characters/cat-normal.png`,
//     scale: 0.5
//   },
//   3
// );

// api.showCharacter(
//   {
//     file: `assets/graphics/characters/boy-think.png`,
//     scale: 0.5
//   },
//   4
// );




// api.hideText();
// api.wait(1500);
// api.playBGM("assets/audio/bgm/cave-theme.mp3");
// api.wait(500);

// api.showText("……恩？", mainChar("think"));
// api.showText("……这是？", mainChar("think"));
// api.showText("哇！！！等……", mainChar("surprise"));
// api.showText("你是鸵鸟吗！！！", dragonChar("angry"));
// api.showText("~~咦？活过来了啊。", dragonChar("normal"));
// api.showText("呼……还好没死掉。", mainChar("normal"));
// api.showText("龙人可不会说谎！", dragonChar("angry"));
// api.showText("为什么要强调自己是龙…人…", mainChar("think"));
// api.showText("（……难道真的是吗？！）", mainChar("surprise"));
// api.showText(
//   "真是稀奇了，堂堂勇者大人也有走眼的时候呢。",
//   dragonChar("amazed")
// );
// api.showText("明明就没有尊敬我的意思……", mainChar("normal"));
// api.showText("说起来这是哪来着。", mainChar("angry"));
// api.showText("说你无防备还真是有够令人担忧的！", dragonChar("sad"));
// api.hideText();
// api.loadScene("assets/graphics/backgrounds/cave.jpg", {
//   duration: 0,
//   block: true
// });

// api.playEffect("shake");

// api.playSE("assets/audio/se/cave-explode.mp3");
// api.wait(1000);
// api.showText("天降正义！", dragonChar("normal"));
// api.hideText();
// api.wait(1000);

// api.playEffect("shake");
// api.playSE("assets/audio/se/cave-explode.mp3");
// api.wait(1000);

// api.showText("天降正义！", dragonChar("angry"));
// api.hideText();
// api.wait(1000);
// api.showText("……？（这是怎么了……）", mainChar("surprise"));
// api.showText("（王八念经叨叨叨）", dragonChar("sad"));
// api.showText("……？（这是怎么了……）", mainChar("angry"));
// api.hideText();
// api.wait(1000);
// api.playEffect("shake");
// api.playSE("assets/audio/se/cave-explode.mp3");
// api.wait(1000);
// api.playEffect("rain");
// api.showText("怎、怎么了！", mainChar("surprise"));
// api.hideText();
// api.wait(1200);
// api.playEffect("shake");
// api.playSE("assets/audio/se/cave-explode.mp3");
// api.wait(1000);
// api.showText(
//   "好好的怎么突然地震了！？你干了什么……好……事……咦？",
//   mainChar("surprise")
// );
// api.showText(
//   `（转过身去时，原本在那自顾自念叨的${dragon.character.name}竟已不知去向……）`
// );
// api.showText("咦~~~？！", mainChar("surprise"));
// api.showText(
//   `（而在那通道的尽头处伴随着地板轰隆的震颤中，陆续出现了一只只的非人生物）`
// );
// api.showText(
//   `（只一愣神的时间里，那些生物便溢满了不算宽敞的通道，尽管相互推攘显得混乱不堪，但那一双双猩红得发亮的眼睛在数量的积累下显得愈发渗人，而越发增强的那股地震也激得人心神不宁……）`
// );
// api.showText("这……战还是逃？", mainChar("think"));
// // 选择.

// api.hideText();
// api.wait(1200);
// api.showText(
//   `（我不知道怀着怎样一股信念，以正气凛然的姿态立在通道正中央，然而怪物们依然以不可阻挡的速度往这边滚滚压来，这令人动摇的数量面前很难会没有一丝恐惧，相信在一瞬间之后我便会消失在这个世界上，恐怕连一丁点都不会剩下吧，心中默念着无所谓念头的时候，终于整个人都扎进了这丑陋之物的海洋之中……）`
// );
// api.showText(
//   `（这时候的唯一念头便是——地震停歇了。而我非但没死，竟然还以原来的姿势毫发无伤地立在原处——怪物们组成了墙壁和屋顶，密实地将四周围了起来。）`
// );
// api.showText(`（究竟陷入了一种什么样的超现实境地之中啊！？）`);

// api.hideText();

// api.loadScene("");
