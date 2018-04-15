// api.showSubtitle("TopLeft", "左上", {position: 0});
// api.showSubtitle("TopRight", "右上", {position: 1});
// api.showSubtitle("BottomLeft", "左下", {position: 2});
// api.showSubtitle("BottomRight", "右下", {position: 3});
// api.showSubtitle("Top", "上", {position: 4});
// api.showSubtitle("Left", "左", {position: 5});
// api.showSubtitle("Right", "右", {position: 6});
// api.showSubtitle("Bottom", "下", {position: 7});
// api.showSubtitle("Center", "中间", {position: 8});

let subtitle = '"Birth certificate, Death certificate. One pen."';

api.showSubtitle(
  "TestTitle",
  "冷静，缜密，萧凉，孤独，看似不悲不喜，更如一曲悲歌[br]循而往复，却再也[c=red][s=22]无法回头[/c]",
  {
    // position: "Center",
    // position: "(300, 500)",
    position: "(10%, 50)",
    animation: {
      name: "FlyIn",
      options: {
        offset: 50,
        direction: "Down",
        duration: 3
      }
    }
  }
);

api.wait(4000);

// api.hideSubtitle("TestTitle", {
//   animation: {
//     name: "FlyOut",
//     options: {
//       offset: 50,
//       direction: "Left",
//       duration: 3
//     }
//   }
// });

api.showText("……恩？");
api.showText("……这是？");
api.showText("哇！！！等……");
api.showText("你是鸵鸟吗！！！");
api.hideText();

// api.showSubtitle("MainTitle", "", { position: "Center" });

// let showText = "";

// api.playBGS("assets/audio/se/type-writer-15s.mp3");
// for (let i = 0; i < subtitle.length; ++i) {
//   api.wait((Math.random() + 0.2) * 200);
//   showText += subtitle[i];
//   api.updateSubtitle("MainTitle", showText + "_");
// }

// api.stopBGS();

// api.wait(1000);

// typewriter(subtitle, api);

// api.showSubtitle("MainTitle", "2_");
// api.wait(200);
// api.updateSubtitle("MainTitle", "20_");
// api.wait(1000);
// api.updateSubtitle("MainTitle", "206_");
// api.wait(200);
// api.updateSubtitle("MainTitle", "2068_");
// api.wait(200);

// api.showSubtitle("MainTitle", "这是一个关于孤独与成长的故事", {
//     position: 8,
//     animation: {
//         name: "FlyIn",
//         options: {
//             duration: 10,
//             direction: "Up",
//             offset: 200
//         }
//     }
// });

// api.wait(2000);

// api.showSubtitle("MainTitle 2", "这是一个关于孤独与成长的故事", {
//     position: 5,
//     animation: {
//         name: "FadeIn",
//         options: {
//             duration: 10
//         }
//     }
// });

// api.playBGM("assets/audio/bgm/subtitle-screen.mp3");
// api.wait(200);

// let g1 = [
//   "责任",
//   "命运",
//   "羁绊",
//   "逃离",
//   "相遇",
//   "邂逅",
//   "认知",
//   "悸动",
//   "嫉妒",
//   "窝囊",
//   "委屈",
//   "焦虑"
// ];
// api.wait(800);
// api.showSubtitle("key", g1[0]);

// for (let i = 1; i < g1.length; ++i) {
//   api.wait(800);
//   api.updateSubtitle("key", g1[i]);
// }

// // api.hideSubtitle("1");
// // api.hideSubtitle("2");
// // api.hideSubtitle("3");
// // api.hideSubtitle("4");

// api.wait(600);
// api.hideSubtitle("key");
// api.showSubtitle("5", "澳门最大赌场上线啦！美女荷官在线发牌！");

// api.loadScene("");

// // api.wait(1000);
// // api.showSubtitle("1", "责任");
// // api.wait(800);
// // api.showSubtitle("2", "命运");
// // api.wait(800);
// // api.showSubtitle("3", "羁绊");
// // api.wait(800);
// // api.showSubtitle("4", "逃离");
// // api.wait(800);
// // api.showSubtitle("5", "这是一个关于孤独与成长的故事");
// // api.wait(800);
