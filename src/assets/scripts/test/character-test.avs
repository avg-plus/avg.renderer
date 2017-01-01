api.showText("澳门最大赌场上线啦！性格荷官[s=22][c=red]在线发牌[/c][/s]！", {
  character: {
    name: "系统消息"
  }
});

api.showCharacter(
  {
    file: `demo-char-2.png`,
    scale: 0.5
  },
  1
);

api.wait(1000);

api.showCharacter(
  {
    file: `demo-char-3.jpg`
  },
  3
);

api.wait(1000);

api.showCharacter(
  {
    file: `demo-char-5.jpg`
  },
  4
);

api.wait(1000);

api.showCharacter(
  {
    file: `demo-char-4.jpg`
  },
  0
);

api.wait(1000);

api.showCharacter(
  {
    file: `demo-char-1.png`
  },
  1
);

api.wait(1000);

api.showCharacter(
  {
    file: `demo-girl.png`
  },
  2
);

// api.wait(2000);
api.hideText();
api.hideCharacter();
// api.hideCharacter(1);
// api.hideCharacter(3);
// api.hideCharacter(4);
