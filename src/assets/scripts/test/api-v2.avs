text.show("这是一个新的 API 啦 ~");
text.show("我连命名都改掉了，但是看起来比之前清爽多了呢！", {
  name: "小黑"
});

character.show(3, "demo/space-normal.png", {
  renderer: {
    offset_x: 0,
    offset_y: -10,
    filter: []
  }
});
character.show(2, "demo/vizee-normal.png", {});

dialog.choices(["选项1", "[c=red]选项2[/c]"]);

const result = dialog.input("我叫什么名字？", {
  inputType: 0,
  minLength: 1,
  maxLength: 5,
  allowCancel: true
});

// console.log(result);