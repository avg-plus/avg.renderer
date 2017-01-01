// let api = api;

while (true) {
  api.showText("问你最后一个问题");
  api.showText("如果给你一次机会，你会再和我一起战斗吗？");

  let c = api.showChoices(["赴汤蹈火，万死不辞", "我再考虑下吧"]);

  if (c.selectedIndex === 0) {
    api.hideText();

    api.showCharacter(
      {
        file: `/cat-normal.png`
      },
      2
    );
    api.showText("老夫果然没有看错人。");
  } else {
    api.hideText();
    api.showText("去死吧！！！");
  }

  api.hideText();
  api.hideCharacter();
}
