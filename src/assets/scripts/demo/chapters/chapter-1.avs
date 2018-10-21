const vizee = $data.characters.vizee;

widget.text("time", "02:54 A.M", {
  position: "(center,center)",
  animation: {
    name: "fadein",
    duration: 3000
  }
});

api.wait(2000);

widget.removeText("time", {
  animation: {
    name: "fadeout"
  }
});
api.wait(1000);

text.show(["已经快凌晨3点了，关键部分依然毫无头绪，实验室里也仅剩我和${vizee}在坚守。"]);
text.hide();

api.wait(500);
audio.playSE("demo/bedroom-door.mp3");
api.wait(1500);
audio.playSE("demo/footstep.mp3");
api.wait(500);

text.show(["「有你的信件。」"], {
  name: "${vizee}"
});

scene.load(0, "demo/room.png", {
  // transition: "crossfade",
  // duration: 2000
});

text.show("「嗯？这个时候你去翻信箱干什么？」");
text.show("「是老师发来的？」");

// await global.vizee.say("「是的，褚见义教授认为觉得用这种方式传达数据是对科研的尊重。」")

vizee.show();
text.show("「褚见义教授认为觉得用这种方式传达数据是对科研的尊重。」", {
  name: vizee.name
});
text.show(
  "木村长口中的褚见义教授是我的导师。他曾经基因学界的泰山北斗，颇受敬重。我目前的实验室也是他退休后传承给我的。"
);

text.show("「他曾说人对自然和科学要有敬畏之心。科学是逆天而行，探索人类基因的秘密是反自然行为。」", {
  name: vizee.name
});
