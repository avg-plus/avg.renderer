import { AnimationMacro } from "engine/core/graphics/sprite-animate-director";

const sceneEnterAnimationSlot: AnimationMacro = {
  initialFrame: {
    alpha: 1
  },
  timeline: [
    {
      alpha: 1,
      duration: 0
    }
  ]
};

export default sceneEnterAnimationSlot;
