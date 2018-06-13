const aiName = api.getVariable("aiName")
api.loadScene(0, "tutorial/black.jpg", {
    block: true
})
api.transitionTo("black", 0, 1000);
api.showText([" ok,[c=yellow]${aiName}[/c] 请跟读baseline测试用语", "黑暗虚无于空中旋转"], { name: "测试员" })
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
api.showText("牢房", { name: aiName })

api.showText("你让他失望后 他是否把你关进牢房?牢房", { name: "测试员" })
api.showText("牢房", { name: aiName })

api.showText("连结", { name: "测试员" })
api.showText("连结", { name: aiName })

api.showText("别人牵你手的时候你有爱的感觉吗?连结", { name: "测试员" })
api.showText("连结", { name: aiName })

api.showText("他告诉过你指尖相互触碰式什么感受吗?连结", { name: "测试员" })
api.showText("连结", { name: aiName })

api.showText("你想有一颗心吗?连结", { name: "测试员" })
api.showText("连结", { name: aiName })

api.showText("你想过和某人连结是什么样的吗?连结", { name: "测试员" })
api.showText("连结", { name: aiName })

api.showText("你怀中抱着一个孩子是什么感受?连结", { name: "测试员" })
api.showText("连结", { name: aiName })

api.showText("你有没有感觉若有所失?连结", { name: "测试员" })
api.showText("连结", { name: aiName })

api.showText("设施中牢房连结 重复三遍", { name: "测试员" })
api.showText(["设施中牢房连结,设施中牢房连结,设施中牢房连结"], { name: aiName })
api.showText(["测试结束", "一切正常"], { name: "测试员" })

api.showText("你的名字是什么?", { name: "测试员" })
api.showText("[c=yellow]${aiName}[/c]", { name: aiName })
api.showText("看来没有认知问题", { name: "测试员" })


api.call("tutorial/backToTitle.avs")
