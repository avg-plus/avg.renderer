api.setVariable("主角名字", "？？？");

api.showSubtitle("time", "09:20 AM");

api.wait(3000);
api.hideSubtitle("time", {
  animation: {
    name: "FadeOut",
    options: {
      duration: 300
    }
  }
});

api.loadScene(0, "assets/graphics/backgrounds/nogame/bedroom-1.bmp", {
  block: true
});
api.wait(1);

api.sceneEffect(0, "transparent", {
  strength: 0.4,
  duration: 0
});

api.wait(3000);

api.showText("嗯……？");
api.showText("看来，目数学和计算机技术的发展速度还是相对正常。");

api.showText(
  "人工智能？社会关注的焦点果然还是这个。对于普通人来说， 也许没有比这种充满未来感的憧憬更能让人兴奋的事了。"
);

api.showText(
  "还有……这个，区块链，我想，政党会非常不喜欢这种东西呢。对于他们而言，还有什么事能比脱离了控制更难受？"
);
api.hideText();

api.wait(3000);
api.showText("嗯……");
api.hideText();

api.wait(2000);
api.playBGM("assets/audio/bgm/BeautifulHawaii.mp3");

api.sceneEffect(0, "transparent", {
  strength: 1,
  duration: 1000
});

api.wait(1000);
api.loadScene(1, "assets/graphics/backgrounds/nogame/bedroom-1-day.bmp", {
  block: true,
  animation: {
    name: "FadeIn",
    options: {
      duration: 4000
    }
  }
});

api.wait(2000);

api.showText(
  "说起来，一周前我回到这个被我称之为乌托邦的世界，这种平凡的日子比想象中更容易适应。"
);

api.showText(
  "尽管还不习惯这样的生活节奏，但这大概是必须要要做的事了吧。为了能更好融入这里的生活，是时候去找一份这里工作了。"
);

api.showText(
  "庆幸的是，在老家找到的以前的证件居然还能用，也省掉了伪造身份的麻烦了。"
);

api.showText("对了……不知不觉又一夜未睡，老毛病又犯了。有点疲倦了，先休息吧。");
api.hideText();

api.wait(3000);
api.playSE("assets/audio/se/knock.mp3");
api.wait(1500);

api.showText("嗯？是谁？");
api.showText("……");
api.hideText();
api.wait(2000);
api.playSE("assets/audio/se/knock.mp3");

api.wait(500);
api.showText("「我是邮政公司的！有你的记名信件！出来拿一下，要签名。」", {
  character: {
    name: "快递员"
  }
});
api.hideText();

api.wait(2000);

api.showText("……");
api.showText("信件？我想大概是哪里的推广信件或者搞错地址了吧。");
api.showText("……");
api.showText(
  "不管怎样，先拿了吧。省得被打扰了睡眠。说起来这物管也够偷懒的，居然让他们直接就敲住户的门，真是没脾气了。"
);
api.hideText();

api.wait(1000);

let name = api.getVariable("主角名字");

api.showText("「来了。」", {
  character: {
    name: name
  }
});
api.hideText();

api.playSE("assets/audio/se/footstep.mp3");
api.wait(2000);
api.playSE("assets/audio/se/bedroom-door.mp3");
api.wait(1500);

api.showCharacter(
  {
    file: "assets/graphics/characters/nogame/postman.png"
  },
  2
);
api.showText("「早上好，有一封你的记名信件，是重要邮件，必须要本人签收。」", {
  character: {
    name: "快递员"
  }
});
api.showText("「我的重要信件？谁会给我寄这种东西。」", {
  character: {
    name: name
  }
});
api.showText("在这里我可没有任何认识的人，更别说知道我的联系方式了。");
api.showText(
  "「416号是不是你这里？是的话就没错了。为了核对一下身份，麻烦说一下你的名字。」",
  {
    character: {
      name: "快递员"
    }
  }
);

api.setVariable("主角名字", "李狗蛋");
name = api.getVariable("主角名字");

api.showText("「[c=red]${主角名字}。[/c]」", {
  character: {
    name: name
  }
});
api.hideText();
api.wait(600);

api.showText("「没错，这就是你的信件。麻烦签个字，然后就可以拿走了。」", {
  character: {
    name: "快递员"
  }
});
api.hideText();
api.hideCharacter();
api.wait(600);

api.showText("我签完字之后，快递员利索地把邮件递给我就走了。剩下我楞在门口。");
api.hideText();
api.wait(1000);

api.showText(
  "被打扰睡眠可以说是十分让人难受。我可不希望因为拆开这封奇怪的信，然后上面写着“游泳健身了解一下”，要真是那样，我可要抓狂了。"
);
api.showText(
  "起初我以为是谁不小心把门牌号写错了，但这信件上的签收人正是我的名字。"
);
api.showText(
  "知道我真实姓名的人并不多，知道我真实姓名并且同时知道我住在这里的人，不可能存在。"
);
api.showText(
  "算了，大概睡觉更重要吧，这信我也懒得撕。留个悬念吧？要不要现在就拆掉看看呢？"
);
api.showChoices(["拆掉信封", "先去睡觉"]);

api.hideText();
