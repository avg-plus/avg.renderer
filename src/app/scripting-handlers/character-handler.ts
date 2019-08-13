import { SpriteAnimationMacro } from "engine/core/graphics/sprite-animate-director";
import { APICharacter } from "engine/scripting/api/api-character";
import { Character } from "engine/data/character";
import { ScreenImage } from "engine/data/screen-image";
import { ResourceData } from "engine/data/resource-data";
import { AVGSpriteRenderer } from "engine/data/sprite-renderer";
import { SpriteType } from "engine/const/sprite-type";
import { SlotManager } from "engine/plugin/hooks/slot-manager";
import { HookSlots } from "engine/plugin/hooks/hook-slots";
import { HookManager } from "engine/plugin/hooks/hook-manager";
import { HookEvents } from "engine/plugin/hooks/hook-events";
import { Sandbox } from "engine/core/sandbox";
import { SpriteWidgetManager } from "engine/core/graphics/sprite-widget-manager";
import { LayerOrder } from "engine/core/graphics/layer-order";
import { ScriptingContext } from "engine/scripting/scripting-context";

export class CharacterScriptingHandler {
  private static currentCharacter = null;

  public static async handleShowCharacter(scriptingContext: ScriptingContext) {
    const api = <APICharacter>scriptingContext.api;
    const character = api.data;

    const image = new ScreenImage();
    image.file = ResourceData.from(api.filename);
    image.renderer = <AVGSpriteRenderer>character.renderer;
    image.spriteType = SpriteType.Character;
    image.name = api.name;
    image.animation = character.animation;

    let slot = SlotManager.getSlot(HookSlots.CharacterEnterAnimation);

    const hookContext = {
      name: image.name,
      filename: api.filename,
      renderer: image.renderer,
      animation: image.animation || slot
    };

    // @ Hook 触发 CharacterBeforeEnter
    const hookResult = await HookManager.triggerHook(HookEvents.CharacterBeforeEnter, hookContext);

    // 重置数据
    if (hookResult) {
      image.name = hookResult.name;
      image.file = ResourceData.from(hookResult.filename);
      image.renderer = hookResult.renderer;
      slot = hookResult.animation;
    }

    // 跳过模式处理，忽略时间
    if (Sandbox.isSkipMode && Sandbox.skipOptions.characters === true) {
      slot.totalDuration = 0;
    }

    CharacterScriptingHandler.currentCharacter = hookContext;
    if (api.isAsync) {
      SpriteWidgetManager.addSpriteWidget(image, slot, LayerOrder.TopLayer, false);
    } else {
      await SpriteWidgetManager.addSpriteWidget(image, slot, LayerOrder.TopLayer, true);
    }

    // @ Hook 触发 CharacterAfterEnter
    await HookManager.triggerHook(HookEvents.CharacterAfterEnter);

    scriptingContext.resolver();
  }

  public static async handleUpdateCharacter(scriptingContext: ScriptingContext) {
    const api = <APICharacter>scriptingContext.api;
    const image = new ScreenImage();
    image.file = ResourceData.from(api.filename);

    await SpriteWidgetManager.updateSpriteWidget(api.name, image);

    // @ Hook 触发 CharacterChanged
    await HookManager.triggerHook(HookEvents.CharacterChanged);

    scriptingContext.resolver();
  }

  public static async handleHideCharacter(scriptingContext: ScriptingContext) {
    const api = <APICharacter>scriptingContext.api;
    let data = api.data;

    let slot = SlotManager.getSlot(HookSlots.CharacterLeaveAnimation);

    let hookContext = {
      animation: data.animation || slot
    };

    // @ Hook 触发 CharacterBeforeLeave
    let hookResult = await HookManager.triggerHook(HookEvents.CharacterBeforeLeave, hookContext);
    let animation = data.animation || hookResult.animation; // 优先使用指定的animation

    // 跳过模式处理，忽略时间
    if (Sandbox.isSkipMode && Sandbox.skipOptions.characters === true) {
      slot.totalDuration = 0;
    }

    await SpriteWidgetManager.removeSpriteWidget(api.name, animation, !api.isAsync);

    // @ Hook 触发 CharacterChanged
    await HookManager.triggerHook(HookEvents.CharacterAfterLeave);

    scriptingContext.resolver();
  }

  public static async handleAnimateCharacter(scriptingContext: ScriptingContext) {
    const api = <APICharacter>scriptingContext.api;
    const animation = api.data.animation;

    // 跳过模式处理，忽略时间
    if (Sandbox.isSkipMode && Sandbox.skipOptions.characters === true) {
      animation.totalDuration = 0;
    }

    await SpriteWidgetManager.animateSpriteWidget(api.name, animation, !api.isAsync);
    scriptingContext.resolver();
  }

  // public static async hideCharacter(scriptingContext: ScriptingContext) {
  //   const api = <APICharacter>scriptingContext.api;
  //   const animation = <AnimationMacro>api.data;

  //   const slot = api.data.animation || SlotManager.getSlot(HookSlots.CharacterLeaveAnimation);

  //   // 跳过模式处理，忽略时间
  //   if (Sandbox.isSkipMode && Sandbox.skipOptions.characters === true) {
  //     slot.totalDuration = 0;
  //   }

  //   await SpriteWidgetManager.removeSpriteWidget(api.name, slot, !api.isAsync);
  //   scriptingContext.resolver();
  // }
}
