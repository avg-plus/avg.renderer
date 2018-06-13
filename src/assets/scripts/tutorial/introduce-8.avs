api.stopBGM()
api.loadScene(0, "tutorial/black.jpg", {
    block: true
})
api.transitionTo("black", 0, 1000)
const titleResult = api.showSubtitle(
    "基础样例",
    {
        position: "center",
        animation: {
            options: {
                direction: "Left"
            }
        }
    },
    false
)

api.updateSubtitle(titleResult.id, "demo0.1.13")

api.showText([
    "node demo 0.1.13",
    "markupLanguage &styleSheets parsering...",
    "loading DOM...",
    "initializing DOM tree...",
    "loading style rules ...",
    "attaching...",
    "render tree in placed",
    "painting..."
], { name: "system" })

api.removeSubtitle(titleResult.id)

api.loadScene(0, "tutorial/demo-bg-1.jpg", {
    block: true
})
api.playBGM("tutorial/text-theme.mp3")
// api.effect("sakura")
api.showText("嗯? 我...这是在那?", {
    name: "???",
    character: {
        index: 3,
        avatar: {
            file: "tutorial/avg-char-1.png"
        }
    }
})

api.showText("再实体化正常,程序成功运行.", { name: "研究员" })
api.showText("嗯...这就是你们新研发的ai产品吗?", { name: "测试员" })
api.showText("我将整个程序放到了场景里,以方便可以进行测试.出于个人兴趣,还添加了模型.", { name: "研究员" })
api.showText("你总是喜欢搞这些花里胡哨的东西.", { name: "测试员" })

api.showText([
    "我先提前加载了场景和模型 ,看上去我们的女儿就像几十年前流行的老古董游戏一样.",
    "虽然我可以把它做成更时髦的样子不过,你知道的,出于个人兴趣."
], { name: "研究员" })

api.showText("个人兴趣..吗?真是恶趣味.", { name: "测试员" })
api.showText("不说这么多了,先给她取个名字吧.", { name: "研究员" })

let inputResult = api.showInputBox("", {
    inputType: 0,
    minLength: 2,
    maxLength: 10,
    allowCancel: false
})

api.setVariable("aiName", inputResult.value)

api.showText(["[c=yellow]${aiName}[/c]", "今天起你的名字就叫[c=yellow]${aiName}[/c]了"], { name: "研究员" })
// api.showText("[c=yellow]${aiName}[/c]今天起你的名字就叫[c=yellow]${aiName}[/c]了", { name: "研究员" })
//bug 上面这行显示不出值
const aiName = api.getVariable("aiName")
api.showText("名字?不..头好痛..", { name: aiName })
api.showText("[c=yellow]${aiName}[/c],能听到我说话吗?", { name: "测试员" })
api.showText("我在", { name: aiName })
api.showText("现在我要随便问你几个问题,请尽可能回答,好吗?", { name: "测试员" })
api.showText("是", { name: aiName })
const captha = api.showImage(
    "tutorial/captha.jpg",
    {
        position: "center",
        size: "50%"
    }
)
api.showText("好,图上写了些什么?", { name: "测试员" })
api.showText("1024", { name: aiName })
api.removeImage(captha.id)
api.showText("猫坐在毯子上,因为它很温暖.什么很温暖?", { name: "测试员" })
api.showText("毯子", { name: aiName })
api.showText("猫坐在毯子上,因为它很冷.什么很冷?", { name: "测试员" })
api.showText("猫", { name: aiName })
api.showText("一百以内质数的乘积有多少位?", { name: "测试员" })
api.showText("32位", { name: aiName })
api.wait(1000)
api.showText(["唔..", "回答得很好呢."], { name: "测试员" })
api.showText("那当然,这可是我们自满的女儿啊.", { name: "研究员" })
api.showText("真有趣,那...我也出于个人兴趣问几个问题吧...", { name: "测试员" })
api.showText("出现了,科幻小说看多的宅妹.", { name: "研究员" })
api.showText("要你多嘴,我现在是[rt=质量保证]QA[/rt],是工作,工作.", { name: "测试员" })
api.showText("好吧好吧,我已经感受到中二的气息了...", { name: "研究员" })
api.wait(1000)


api.playBGM("cave-theme.mp3")
let choice = api.showChoices(["做baseline测试", "提问名字"])
if (choice.selectedIndex === 0) {
    api.call("tutorial/normalBaselineTest.avs")
} else {
    api.call("tutorial/hiddenBaselineTest.avs")
}
