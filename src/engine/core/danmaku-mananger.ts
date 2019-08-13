import { randomIn, getRandomBetween } from "./utils";

declare var CommentManager: any;

export class DanmakuManager {
  private static CM;
  private static timelineInterval;

  static async initDanmaku() {
    DanmakuManager.CM = new CommentManager(document.getElementById("avg-danmaku"));

    DanmakuManager.CM.options.global.scale = 3.2;
    DanmakuManager.CM.init("canvas"); // 初始化
    DanmakuManager.CM.start();

    const words = [
      "卧槽6666",
      "自带弹幕galgame",
      "宇宙第一黄油引擎",
      "前方高能(*@ο@*)——",
      "怎么是咋做的，太强了",
      "什么鬼",
      "2333333333333",
      "感动",
      "哭了",
      "谜の感动",
      "好心酸啊",
      "相信有爱的galgame玩家们绝对不会忘",
      "有点厉害",
      "迷の感动",
      "因为你而活 无法忘怀 隔阂的存在 对不起",
      "给大家拜年了！",
      "真心的谢谢你们！！TAT",
      "BGM爱的自杀再问供养"
    ];

    // 载入弹幕列表
    var danmakuList = [
      {
        mode: 1,
        text: "卧槽6666",
        stime: 0,
        size: 25,
        color: 0xffffff
      },
      {
        mode: 1,
        text: "自带弹幕的galgame",
        stime: 3000,
        size: 25,
        color: 0xffffff
      },
      {
        mode: 1,
        text: "前方高能(*@ο@*)——",
        stime: 5000,
        size: 25,
        color: 0xffffff
      }
    ];

    for (let i = 0; i < 30; ++i) {
      danmakuList.push({
        mode: randomIn([1, 1, 1, 1, 1, 1, 1, 2]),
        text: randomIn(words),
        stime: getRandomBetween(100, 10000),
        size: getRandomBetween(22, 32),
        color: randomIn([0xffffff, 0xffffff, 0xffffff, 0xffffff, 0xffffff, 0xffffff, 0xff0000])
      });
    }

    DanmakuManager.CM.load(danmakuList);
  }

  static async enableDanmaku() {
    var startTime = 0,
      startTime = Date.now(); // 设定起始时间

    //建立新的定时器
    DanmakuManager.disableDanmaku();
    DanmakuManager.timelineInterval = setInterval(() => {
      var playTime = Date.now() - startTime; // 用起始时间和现在时间的差模拟播放
      DanmakuManager.CM.time(playTime); // 通报播放时间
      if (playTime >= 10000) {
        startTime = Date.now(); // 设定起始时间
      }
    }, 1); // 模拟播放器每 100ms 通报播放时间

    DanmakuManager.CM.start();
  }

  static async disableDanmaku() {
    DanmakuManager.CM.clear();
    DanmakuManager.CM.stop();
    clearInterval(DanmakuManager.timelineInterval);
  }
}
