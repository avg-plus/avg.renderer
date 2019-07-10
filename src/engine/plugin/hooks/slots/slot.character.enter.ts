import { AnimationMacro } from "engine/core/graphics/sprite-animate-director";

const characterEnterAnimationSlot: AnimationMacro = {
  totalDuration: 800,
  initialFrame: {
    alpha: 0
  },
  timeline: [
    {
      alpha: 1
    }
  ]
};

export default characterEnterAnimationSlot;
