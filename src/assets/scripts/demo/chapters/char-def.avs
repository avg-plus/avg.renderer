// global.player = {
//   name: "",
//   say: async content => {
//     text.show(content);
//   }
// };

$data.characters = {
  vizee: {
    name: "木村",
    show: async () => {
      return await character.show("demo/vizee-normal.png");
    }
  }
};
// api.setVariable("vizee", { name: "木村" });
