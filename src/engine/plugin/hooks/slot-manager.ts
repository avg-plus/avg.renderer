import { HookSlots } from "./hook-slots";

export class SlotManager {
  slots: Map<HookSlots, any> = new Map<HookSlots, any>();

  getSlot(slotName: HookSlots) {
    return this.slots.get(slotName);
  }
}
