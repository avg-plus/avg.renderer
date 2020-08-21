import { SpriteAnimationMacro } from "engine/core/graphics/sprite-animate-director";
import { SlotFunc } from "../slot-manager";
import { ScreenImage } from "engine/data/screen-image";

const sceneLeaveAnimationSlot: SlotFunc = (target: ScreenImage) => {
  return {
    timeline: [
      {
        alpha: 0,
        duration: 600
      }
    ]
  };
};

export default sceneLeaveAnimationSlot;
