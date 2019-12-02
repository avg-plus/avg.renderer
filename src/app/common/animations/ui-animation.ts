// import {
//   animate,
//   keyframes,
//   state,
//   style,
//   transition,
//   trigger
// } from "@angular/core";

// export class UIAnimation {
//   public static AVGColorFade(
//     name: string,
//     rgb: string = "255,255,255",
//     from: number = 0,
//     to: number = 1,
//     timings: number = 500
//   ) {
//     return trigger(name, [
//       state(
//         "inactive",
//         style({
//           backgroundColor: `rgba(${rgb},${from})`
//         })
//       ),
//       state(
//         "active",
//         style({
//           backgroundColor: `rgba(${rgb},${to})`
//         })
//       ),
//       transition("* => *", [animate(timings + "ms ease")])
//     ]);
//   }

//   public static AVGOpacityFade(
//     name: string,
//     from: number = 0,
//     to: number = 1,
//     timings: number = 500
//   ) {
//     return trigger(name, [
//       state(
//         "inactive",
//         style({
//           opacity: `${from}`
//         })
//       ),
//       state(
//         "active",
//         style({
//           opacity: `${to}`
//         })
//       ),
//       transition("* => *", [animate(timings + "ms ease")])
//     ]);
//   }

//   public static AVGCharacterShow(name: string, timings: number = 500) {
//     return trigger(name, [
//       state(
//         "inactive",
//         style({
//           opacity: "0",
//           transform: "translateX(-20px)"
//         })
//       ),
//       state(
//         "active",
//         style({
//           opacity: "1",
//           transform: "translateX(20px)"
//         })
//       ),
//       transition("* <=> *", [animate(timings + "ms ease")])
//     ]);
//   }
// }
