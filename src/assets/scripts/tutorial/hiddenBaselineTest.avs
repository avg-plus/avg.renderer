const aiName = api.getVariable("aiName")
api.loadScene(0, "tutorial/black.jpg", {
    block: true
})
api.transitionTo("black", 0, 1000);
api.showText("你的名字是什么?", { name: "测试员" })
api.showText("[c=yellow]${aiName}[/c]", { name: aiName })
api.showText(["看来没有认知问题", "说起来之前你们把这个ai叫什么"], { name: "测试员" })
api.showText("额..demo0.1.13...", { name: "研究员" })
api.showText("就没有什么浪漫点的名字吗?浪漫?", { name: "测试员" })
api.showText("额..没有", { name: "研究员" })
api.showText("所以说你们这些理工男..", { name: "测试员" })
api.showText("也许博士起过什么名字吧,你去问问我们老大?", { name: "研究员" })
api.showText("算了 也许问她来的快一点", { name: "测试员" })
api.showChoices(["提问名字"])
api.showText("在这之前,你的名字是什么?", { name: "测试员" })
api.showText("[c=yellow]${aiName}[/c]", { name: aiName })
api.showChoices(["提问名字"])
api.showText(["额...怎么说呢", "我想知道,你爸爸给你起了名字是什么?"], { name: "测试员" })
api.showText(["爸爸...", "名字...", "E..."], { name: aiName })
api.showText(["哦好吧,估计这么问也不是个头", "算了算了下一项.."], { name: "测试员" })
api.showChoices(["做baseline测试"])
api.showText([" [c=yellow]${aiName}[/c],请跟读baseline测试用语", "黑暗虚无于空中旋转"], { name: "测试员" })
api.showText("黑暗虚无于空中旋转", { name: aiName })

api.showText("设施中牢房连结, 牢房连结, 牢房连结", { name: "测试员" })
api.showText("设施中牢房连结, 牢房连结, 牢房连结", { name: aiName })

api.showText("惊恐地站在黑暗之前,一座又白又高的喷泉", { name: "测试员" })
api.showText("惊恐地站在黑暗之前,一座又白又高的喷泉", { name: aiName })

api.showText("牢房", { name: "测试员" })
api.showText("牢房", { name: aiName })

api.showText("此机构你可曾到访过? 牢房", { name: "测试员" })
api.showText("牢房", { name: aiName })

api.showText("他是否把你关进 牢房? 牢房", { name: "测试员" })
api.showText(["...", "牢房"], { name: aiName })

api.showText("你让他失望后 他是否把你关进牢房?牢房", { name: "测试员" })
api.showText(["...", "...牢房"], { name: aiName })

api.showText("连结", { name: "测试员" })
api.showText("连结", { name: aiName })

api.showText("别人牵你手的时候你有爱的感觉吗?连结", { name: "测试员" })
api.showText(["...", "连结"], { name: aiName })

api.showText("他告诉过你指尖相互触碰式什么感受吗?连结", { name: "测试员" })
api.showText(["...", "连结"], { name: aiName })

api.showText("你想有一颗心吗?连结", { name: "测试员" })
api.showText("...连结", { name: aiName })

api.showText("你想过和某人连结是什么样的吗?连结", { name: "测试员" })
api.showText(["...", "连结"], { name: aiName })


api.showText("你怀中抱着一个孩子是什么感受?连结", { name: "测试员" })
api.showText("...连结", { name: aiName })

api.showText("你有没有感觉若有所失?连结", { name: "测试员" })
api.showText("...连...连结", { name: aiName })

api.showText("设施中牢房连结 重复三遍", { name: "测试员" })
api.showText(["设施中牢房连结...", "设施中牢房连结...", "设施中牢房连结..."], { name: aiName })

api.showText(["测试结束", "察觉到有异常情绪波动...", "这是...怎么回事?[c=yellow]${aiName}[/c]"], { name: "测试员" })
api.showText("我想起来了...", { name: aiName })
api.showText("嗯?", { name: "测试员" })
api.showText(["Elaine", "我的名字是...", "Elaine"], { name: "Elaine" })

api.call("tutorial/backToTitle.avs")
