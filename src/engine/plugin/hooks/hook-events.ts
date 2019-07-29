/*
  关于引擎事件机制，可以监听引擎发生的事件，单一事件可以有多个监听，并且每个监听的返回值必须符合协议
 */

export enum HookEvents {
  // 系统
  GameUpdate = "hook.game_update", // 立绘显示前

  // 立绘相关
  CharacterBeforeEnter = "hook.character_before_enter", // 立绘显示前
  CharacterAfterEnter = "hook.character_before_enter", // 立绘显示后
  // CharacterBeforeLeave = "hook.character_before_leave", // 立绘消失前
  // CharacterAfterLeave = "hook.character_after_leave", // 立绘消失后
  // CharacterChanged = "hook.character_changed", // 立绘更新

  // // 对话框相关
  DialogueShow = "hook.dialogue_show", // 对话框显示
  // DialogueHide = "hook.dialogue_hide", // 对话框消失前

  MAX = "MAX"
}
