/* 文本以及立绘相关剧情 */
api.playBGM("tutorial/text-theme.mp3");
api.loadScene(0, "tutorial/bedroom-1.bmp", {
  block: true
});

api.wait(1000);

api.transitionTo("black", 0, 1000);

api.wait(3000);
api.loadScene(0, "tutorial/bedroom-1-day.bmp", {
  block: true,
  animation: {
    name: "fadein",
    options: {
      duration: 2000,
    }
  }
});
api.wait(1000);

const titleResult = api.showSubtitle("[c=yellow]普通文本对话[/c]", {
  position: "Top",
  animation: {
    name: "FlyIn",
    options: {
      direction: "Up",
      duration: 1000
    }
  }
}, true);

api.showCharacter(2, "tutorial/boy-normal.png");

api.showText([
  "如你所见，文本对白是AVG的核心功能，因此我们也支持了大量样式，丰富演出效果~",
  "这里是基本的对话演示，可以通过以下 API 显示一段文本：[br][br][c=red] api.showText(text, [options]) [/c]"
]);

api.wait(100);
api.updateSubtitle(titleResult.id, "[c=yellow]字体样式[/c]");
api.showText(
  `以及还可以在文本里面加入一些基础文本样式，比如说：[br][br]` +
  `[b]文本加粗[/b]，[i]斜体[/i]，[c=#FF0000]更改文本颜色[/c]，改变[s=30]文本大小[/s]，` +
  `甚至是... [del]删除线[/del]。几乎把 Markdown 的语法都支持了一次。`
);

api.updateSubtitle(titleResult.id, "[c=yellow]多国语言/Unicode支持[/c]");

api.showText(
  "而且为了满足多语言也做了 Unicode 支持，我们可以用多国语言说”你好“：[br][br]" +
  "[c=red]你好[/c], [c=yellow]Hello[/c]," +
  "[br][c=green]こんにちは[/c], [c=purple]안녕하세요[/c]," +
  "[br][c=orange]привет[/c], مرحبًا ... 喵呜！"
);

api.updateSubtitle(titleResult.id, "[c=yellow]emoji/图片混排支持[/c]");
api.showText([
  "在一些场合，我们可能也希望在文本里插入emoji以及图片，其实也很简单啦~",
  "不仅仅可以显示静态的图片…… [emoji=xixi.jpg]",
  "还可以插入动态的 Gif 作为表情包 [emoji=dance.gif]"
]);

api.hideText();
api.wait(1000);

api.updateSubtitle(titleResult.id, "[c=yellow]注音[/c]");

api.showText([
  "如果上面的特性都只是常规操作，那我还做了一个可能比较少用到，但非常有用的功能。那就是[c=red]注音[/c]。",
  "在一些场合，如果我们需要对某个名词进行注解的话，我们可以用到[c=red]注音[/c]，比如这样：[br][br]" +
  "[c=red][rt=阿鲁斯]巨神兽[/rt][/c]是世界上可怕的生物之一。" +
  "[br]这一切都是[c=yellow][rt=Steins;Gate]命运石之门[/rt][/c]的选择。"
]);

api.updateSubtitle(titleResult.id, "[c=yellow]文本延迟[/c]");

api.showText(
  "如果要模拟角色对话犹豫，表达话里停顿的效果，可以通过[c=red] wait [/c]标签来模拟。比如说需要等待下一次输入（点击）时继续……" +
  "[wait]显示文本。当然也可以指定若干秒之后自动继续……，比如3秒后……[wait=3000]显示剩下的内容。"
);

api.removeSubtitle(titleResult.id);

api.hideText();
api.hideCharacter();

api.updateSubtitle(titleResult.id, "[c=yellow]选项和文本输入[/c]");

api.showText(["在某些情况下我们可以接受玩家的选项输入和文本输入……", "比如……你愿意告诉我你的名字吗？"], {
  name: "风见",
  character: {
    index: 4,
    avatar: {
      file: "tutorial/girl-normal.png"
    }
  }
});

let choice = api.showChoices(["我愿意", "不愿意"]);
if (choice.selectedIndex === 0) {

  let isOK = false;

  while (!isOK) {
    let inputResult = api.showInputBox("输入你的名字", {
      inputType: 0,
      minLength: 2,
      maxLength: 5,
      allowCancel: true
    });

    isOK = inputResult.isOK;
    if (!isOK) {
      api.showText("要告诉我你的名字哦。。。", {
        name: "风见",
        character: {
          index: 4,
          avatar: {
            file: "tutorial/girl-angry.png"
          }
        }
      });
    } else {
      api.setVariable("your_name", inputResult.value);
    }
  }

}

api.showText("唔……[wait=1000][c=yellow]${your_name}[/c]真是个好名字呢！", {
  name: "风见",
  character: {
    index: 4,
    avatar: {
      file: "tutorial/girl-smile.png"
    }
  }
});

api.updateSubtitle(titleResult.id, "");

api.hideText();
api.wait(1400);
api.showText(
  "好了，对话相关介绍就到这里了，其实还有很多特性尚未一一演示，可以参考我们的文档了解更多。", {
    name: "风见",
    character: {
      index: 4,
      avatar: {
        file: "tutorial/girl-normal.png"
      }
    }
  }
);
api.hideText();
api.wait(1000);
