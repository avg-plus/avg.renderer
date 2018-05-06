api.showText([
    "当我们希望在屏幕显示一张[c=red]图片[/c]或者[c=red]字幕[/c]时，我们可以通过字幕&图片相关接口完成",
    "需要区分的是，图片和立绘是不同的两个东西，图片允许我们显示在画面中任意一个位置。而立绘有固定的方式显示~ 如果想了解更多，可以观看 [c=red][文本以及立绘相关][/c] 章节的介绍。"
], {
    character: {
        index: 4,
        avatar: {
            file: "tutorial/girl-normal.png"
        }
    }
});



// api.showCharacter(1, "tutorial/boy-normal.png");


let testSubtitleResult = api.showSubtitle(
    "我能吞下玻璃而[c=yellow][rt=bushangshenti]不伤身体[/rt][/c]",
    {
        position: "center",
        animation: {
            name: "flYin",
            options: {
                duration: 1000,
                offset: 200
            }
        }
    }, false
);

api.removeSubtitle(
    testSubtitleResult.id,
    {
        animation: {
            name: "flyout",
            options: {
                duration: 3000,
                offset: 300,
                direction: "Down"
            }
        }
    }, false
);

// const imgResult = api.showImage(
//     "tutorial/xiaohuangtu.png",
//     {
//         position: "(10,10)",
//         size: "30%",
//         animation: {
//             name: "FlyIn",
//             options: {
//                 direction: "Up",
//                 duration: 2000,
//                 offset: 300
//             }
//         }
//     }
// );

// api.removeImage(
//     imgResult.id,
//     {
//         animation: {
//             name: "FlyOut",
//             options: {
//                 offset: 300,
//                 direction: "Up",
//                 duration: 3000
//             }
//         }
//     }, true
// );