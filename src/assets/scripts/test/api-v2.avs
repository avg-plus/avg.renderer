const handle = scene.load(0, "demo/room.png");

character.show(3, "demo/space-normal.png", {
  renderer: {
    offset_x: 0,
    offset_y: -10,
    filter: []
  }
});

text.show("这是V2版本的API ~");
text.show("下面将演示新增的摄像机变换效果。", {
  name: "空格"
});

dialog.choices(["开始演示", "没什么好看的老铁"]);


// character.show(2, "demo/vizee-normal.png");

// dialog.choices(["选项1", "[c=red]选项2[/c]", "第三个选项"]);

// const result = dialog.input("我叫什么名字？", {
//   inputType: 0,
//   minLength: 1,
//   maxLength: 5,
//   allowCancel: true
// });

api.wait(2000);

// scene.load(0, "demo/demo-tree.png", {
//   duration: 1500,
//   transition: "crossfade"
// });

// api.wait(2000);

// scene.remove(0);

// console.log(result);

// audio.playBGM("demo/demo_theme.mp3");

// api.showImage("demo/camera_bloodstain.png", {
//   size: "300%",
//   position: "(-10%,0%)",
//   animation: {
//     duration: 3000,
//     name: "fadein"
//   }
// });
