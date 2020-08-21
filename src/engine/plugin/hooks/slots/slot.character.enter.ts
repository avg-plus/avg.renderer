import { SpriteAnimationMacro } from "engine/core/graphics/sprite-animate-director";
import { SlotFunc } from "../slot-manager";
import { ScreenImage } from "engine/data/screen-image";
import { isNullOrUndefined } from "engine/core/utils";

const characterEnterAnimationSlot: SlotFunc = (target: ScreenImage) => {
  const slot = {
    totalDuration: 500,
    initialFrame: {
      alpha: 0
    },
    timeline: [
      {
        alpha: 1
      }
    ]
  };

  if (target && target.renderer && !isNullOrUndefined(target.renderer.alpha)) {
    return null;
  }

  return slot;
};

export default characterEnterAnimationSlot;
