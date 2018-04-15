api.showSubtitle("Title", "[c=red]随机数测试[/c]", {
  position: "Top"
});

api.wait(1000);

let count = 0;
while (true) {
  let number = Math.random();
  let id = "idc" + count;

  api.showSubtitle(id, number.toString(), {
    position: "Center",
    animation: {
      name: "Appear"
    }
  });

  api.wait(400);

  api.hideSubtitle(id, {
    animation: {
      name: "FlyOut",
      options: {
        offset: 80,
        direction: "Up",
        duration: 1
      }
    }
  });
//   api.wait(600);

  count++;

  //   api.updateSubtitle("number", number.toString());
}
