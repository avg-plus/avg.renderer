api.transitionTo("black", 0, 1000);
api.hideCharacter()
api.hideText()
api.stopBGM()
const titleResult = api.showSubtitle(
    "演示结束",
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
api.removeScene(0)
api.updateSubtitle(titleResult.id, "回到主菜单")
api.removeSubtitle(titleResult.id)
api.callTitleView()