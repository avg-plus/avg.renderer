import { SpriteAnimationMacro } from "engine/core/graphics/sprite-animate-director";

const characterEnterAnimationSlot: SpriteAnimationMacro = {
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
