import { Hook, APIHook } from "./avg-hooks";

@APIHook("character.enter", new Hook_CharacterAnimationEnter())
class Hook_CharacterAnimationEnter implements Hook {
  public defaultImpl(data: any) {
    // 实现默认的淡入效果
    return {
      duration: 1000,
      frames: [
        {
          opacity: 0,
          x: data.character.x - 50
        },
        {
          opacity: 1,
          x: data.character.x
        }
      ]
    };
  }
}
