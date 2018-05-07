api.hideCharacter();

api.showText([
    "当我们希望在屏幕显示一张[c=red]图片[/c]或者[c=red]字幕[/c]时，我们可以通过字幕&图片相关接口完成。",
    "需要区分的是，图片和立绘是不同的两个东西，图片允许我们显示在画面中任意一个位置。而立绘有固定的方式显示~ 如果想了解更多，可以观看 [c=red][文本以及立绘相关][/c] 章节的介绍。"
], {
        character: {
            index: 4,
            avatar: {
                file: "tutorial/girl-normal.png"
            }
        }
    });

api.showText([
    "我们先说字幕吧~ 字幕允许我们在屏幕上任意一个地方打印一行文本，我们可以用来作为剧情提示、章节显示等等。",
    "下面是在不同方位显示字幕的演示。"
], {
        character: {
            index: 4,
            avatar: {
                file: "tutorial/girl-angry.png"
            }
        }
    });

api.removeScene(0);

const positions = [
    ["左上", "topleft"],
    ["右上", "topright"],
    ["左下", "bottomleft"],
    ["右下", "bottomright"],
    ["上", "top"],
    ["左", "left"],
    ["右", "right"],
    ["下", "bottom"],
    ["居中", "center"],
]

for (let i = 0; i < positions.length; ++i) {
    api.showSubtitle(positions[i][0], {
        position: positions[i][1],
        animation: {
            name: "fadeIn",
            options: {
                duration: 400
            }
        }
    });
}

api.showText(
    [
        "这就是我们看到的所有在预设位置显示字幕的效果，当然我们也可以通过指定具体坐标或坐标百分比的方式显示字幕。 如：[br][br][c=yellow](100, 50) [br] (50%, 30%) [/c]",
        "我们来看看效果。"
    ],
    {
        character: {
            index: 4,
            avatar: {
                file: "tutorial/girl-normal.png"
            }
        }
    });

api.removeSubtitle();

api.wait(1000);


api.showSubtitle("一行在坐标 (30%, 50%) 显示的字幕", {
    position: "(30%,50%)",
    animation: {
        name: "flyIn",
        options: {
            direction: "left",
            offset: 50,
            duration: 400
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