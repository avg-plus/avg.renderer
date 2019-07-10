import { HookSlots } from "./hook-slots";
import characterEnterAnimationSlot from "./slots/slot.character.enter";
import sceneEnterAnimationSlot from "./slots/slot.scene.enter";
import characterLeaveAnimationSlot from "./slots/slot.character.leave";
import sceneLeaveAnimationSlot from "./slots/slot.scene.leave";

export class SlotData {
  public defaultSlot: any;
  public userSlot: any;
}

export class SlotManager {
  static slots: Map<HookSlots, SlotData> = new Map<HookSlots, any>();

  public static init() {
    this.initDefaultSlot(HookSlots.CharacterEnterAnimation, characterEnterAnimationSlot);
    this.initDefaultSlot(HookSlots.CharacterLeaveAnimation, characterLeaveAnimationSlot);
    this.initDefaultSlot(HookSlots.SceneEnterAnimation, sceneEnterAnimationSlot);
    this.initDefaultSlot(HookSlots.SceneLeaveAnimation, sceneLeaveAnimationSlot);
  }

  public static getSlot(slotName: HookSlots) {
    const slot = this.slots.get(slotName);
    let slotData = slot ? slot.userSlot || slot.defaultSlot : null;

    return slotData;
  }

  private static initDefaultSlot(slotName: HookSlots, data: any) {
    const slot = {
      defaultSlot: data,
      userSlot: null
    };

    this.slots.set(slotName, slot);
  }

  public static setSlot(slotName: HookSlots, data: any) {
    const slot = {
      defaultSlot: null,
      userSlot: data
    };

    this.slots.set(slotName, slot);
  }
}
