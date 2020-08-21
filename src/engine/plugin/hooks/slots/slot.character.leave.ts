import { SpriteAnimationMacro } from "engine/core/graphics/sprite-animate-director";
import { SlotFunc } from "../slot-manager";
import { ScreenImage } from "engine/data/screen-image";

const characterLeaveAnimationSlot: SlotFunc = (target: ScreenImage) => {
  return {
    totalDuration: 500,
    timeline: [
      {
        alpha: 0
      }
    ]
  };
};

export default characterLeaveAnimationSlot;
