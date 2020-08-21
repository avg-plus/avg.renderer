import { ScreenImage } from "engine/data/screen-image";
import { SlotFunc } from "../slot-manager";
import { isNullOrUndefined } from "engine/core/utils";

const sceneEnterAnimationSlot: SlotFunc = (target: ScreenImage) => {
  // 默认的效果 Hook 应该检查调用时传入的相关属性，如果涉及到相关字段，应该不再执行
  let slot = {
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

  if (target && target.renderer && !isNullOrUndefined(target.renderer.alpha)) {
    return null;
  }

  return slot;
};

export default sceneEnterAnimationSlot;
