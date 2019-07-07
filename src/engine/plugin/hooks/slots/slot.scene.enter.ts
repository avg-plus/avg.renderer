import { AnimationMacro } from "engine/core/graphics/sprite-animate-director";

const sceneEnterAnimationSlot: AnimationMacro = {
  initialFrame: {
    alpha: 0
  },
  timeline: [
    {
      alpha: 1,
      duration: 1400
    }
  ]
};

export default sceneEnterAnimationSlot;
