const logo = widget.image("demo/qrcode.jpg", {
  position: "center",
  size: "(100%,100%)",
  scale: 0.8,
  renderer: {
    filter: [
      // { name: "opacity", value: 0 },
      {
        name: "saturate",
        value: 40
      }
    ]
  },
  animation: {
    // name: "flyin",
    options: {
      duration: 1000,
      offset: 120,
      direction: "right"
    }
  }
});

// const text = widget.text("佛挡杀佛", {
//   position: "(30%,50%)"
// });

// const blood = widget.image("demo/camera_bloodstain.png", {
//   position: "(0%, 0%)",
//   // position: "(26%, 11%)",
//   size: "50%",
//   scale: 1,
// });

// character.show("demo/neko-normal.png", {
//   slot: 2,
//   x: 40,
//   y: 50,
//   renderer: {
//     // offset_y: 0,
//     filter: []
//   }
// });

// character.show("demo/space-normal.png", {
//   slot: 1,
//   x: 40,
//   y: 50,
//   renderer: {
//     // offset_x: 0,
//     // offset_y: 0,
//     filter: []
//   }
// });

// // character.show("demo/domo-ask.png", {
// //   slot: 3,
// //   x: 40,
// //   y: 50,
// //   renderer: {
// //     // offset_x: 0,
// //     // offset_y: 0,
// //     filter: []
// //   }
// // });

// character.show("demo/vizee-normal.png", {
//   slot: 4,
//   x: 40,
//   y: 50,
//   renderer: {
//     // offset_x: 0,
//     // offset_y: 0,
//     filter: []
//   }
// });

// character.show("demo/kingwl-normal.png", {
//   slot: 5,
//   x: 40,
//   y: 50,
//   renderer: {
//     // offset_x: 0,
//     // offset_y: 0,
//     filter: []
//   }
// });
