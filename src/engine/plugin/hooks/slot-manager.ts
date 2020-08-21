import { HookSlots } from "./hook-slots";
import characterEnterAnimationSlot from "./slots/slot.character.enter";
import sceneEnterAnimationSlot from "./slots/slot.scene.enter";
import characterLeaveAnimationSlot from "./slots/slot.character.leave";
import sceneLeaveAnimationSlot from "./slots/slot.scene.leave";
import { SpriteAnimationMacro } from "engine/core/graphics/sprite-animate-director";
import { ScreenSprite } from "engine/data/screen-sprite";

export type SlotFunc = (target: ScreenSprite) => SpriteAnimationMacro;

export class SlotData {
  public defaultSlot: SlotFunc;
  public userSlot: SlotFunc;
}

export class SlotManager {
  static slots: Map<HookSlots, SlotData> = new Map<HookSlots, SlotData>();

  public static init() {
    this.initDefaultSlot(
      HookSlots.CharacterEnterAnimation,
      characterEnterAnimationSlot
    );
    this.initDefaultSlot(
      HookSlots.CharacterLeaveAnimation,
      characterLeaveAnimationSlot
    );
    this.initDefaultSlot(
      HookSlots.SceneEnterAnimation,
      sceneEnterAnimationSlot
    );
    this.initDefaultSlot(
      HookSlots.SceneLeaveAnimation,
      sceneLeaveAnimationSlot
    );
  }

  private static initDefaultSlot(
    slotName: HookSlots,
    func: SlotFunc
  ) {
    const slot = {
      defaultSlot: func,
      userSlot: null
    };

    this.slots.set(slotName, slot);
  }

  public static getSlot(
    slotName: HookSlots,
    target: ScreenSprite
  ): SpriteAnimationMacro {
    const slot = this.slots.get(slotName);

    let slotFunc = slot ? slot.userSlot || slot.defaultSlot : null;

    return slotFunc(target);
  }

  public static setSlot(slotName: HookSlots, func: SlotFunc) {
    const slot = {
      defaultSlot: null,
      userSlot: func
    };

    this.slots.set(slotName, slot);
  }
}
