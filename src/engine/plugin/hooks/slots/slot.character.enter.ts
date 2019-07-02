import { AnimationMacro } from "engine/core/graphics/sprite-animate-director";

const slot: AnimationMacro = {
  totalDuration: 1000,
  timeline: [
    {
      alpha: 0.5
    },
    {
      alpha: 1
    }
  ]
};

export default slot;
