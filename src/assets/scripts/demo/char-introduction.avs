// const logo = widget.image("demo/qrcode.jpg", {
//   position: "(right, bottom)", // '(42%,50%)', '(10%,50px)', '(42px,50px)', '(center,top), center, top, left-top'
//   size: "(100%,100%)",
//   scale: 1,
//   renderer: {
//     filter: [
//       // { name: "opacity", value: 0 },
//       {
//         name: "saturate",
//         value: 40
//       }
//     ]
//   },
//   animation: {
//     name: "flyin",
//     options: {
//       duration: 1000,
//       offset: 120,
//       direction: "right"
//     }
//   }
// });

camera.to(
  1,
  {
    x: 0,
    scale: 1.4,
    rotation: 55
  },
  5000
);

api.wait(5000);

camera.to(
  1,
  {
    x: 4,
    // rotation: 0,
    // scale: 1.8,
    y: 50
  },
  3000
);

const text = widget.text("[s=36]制作\n[c=red]AVGPlus Studio[/c][/s]", {
  position: "(10%,80%)",
  size: "",
  animation: {
    name: "fadein",
    options: {
      duration: 12000,
      offset: 50,
      direction: "left"
    }
  }
});

widget.removeText(
  text.id,
  {
    animation: {
      name: "fadeout",
      options: {
        duration: 12000,
        offset: 50,
        direction: "left"
      }
    }
  },
  true
);

const blood = widget.image("demo/camera_bloodstain.png", {
  position: "(0%, 0%)",
  // position: "(26%, 11%)",
  size: "50%",
  scale: 1
});

character.show("demo/neko-normal.png", {
  slot: 2,
  x: 40,
  y: 50,
  renderer: {
    // offset_y: 0,
    filter: []
  }
});

character.show("demo/space-normal.png", {
  slot: 1,
  x: 40,
  y: 50,
  renderer: {
    // offset_x: 0,
    // offset_y: 0,
    filter: []
  }
});

// character.show("demo/domo-ask.png", {
//   slot: 3,
//   x: 40,
//   y: 50,
//   renderer: {
//     // offset_x: 0,
//     // offset_y: 0,
//     filter: []
//   }
// });

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
