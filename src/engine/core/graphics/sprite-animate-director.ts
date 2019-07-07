import * as gsap from "gsap";
import { Sprite } from "./sprite";
import { Scene } from "./scene";
import { isNullOrUndefined } from "../utils";

export enum AnimateTargetType {
  Camera,
  Sprite
}

class MacroFrame {
  duration?: number = 0;
}

class SpriteMacroFrame extends MacroFrame {
  [key: string]: any;
}

class CameraMacroFrame extends MacroFrame {
  x: number = 0;
  y: number = 0;
  zoom: number = 1;
}

export class AnimationMacro {
  // 时间轴总播放时长（如指定该参数，则忽略帧内的duration）
  totalDuration?: number;

  // 初始关键帧
  initialFrame?: SpriteMacroFrame | CameraMacroFrame;

  // 重复次数（0 或者为空表示不重复，默认播放一次，-1为无限重复）
  repeat?: number = 0;

  // 时间轴
  timeline: Array<SpriteMacroFrame | CameraMacroFrame>;
}

export class SpriteAnimateDirector {
  /**
   * 为一个对象创建动画timeline
   *
   * @static
   * @param {{}} target
   * @param {number} duration
   * @param {{}} vars
   * @param {*} [position]
   * @returns
   * @memberof SpriteAnimateDirector
   */
  public static to(target: {}, duration: number, vars: {}, position?: any) {
    const timeline = new gsap.TimelineMax();
    return timeline.to(target, duration / 1000, vars, position);
  }

  public static playAnimationMacro(
    type: AnimateTargetType,
    target: Sprite | Scene,
    macroObject: AnimationMacro,
    waitingForFinished: boolean = false
  ) {
    if (!macroObject) {
      return;
    }

    let initialFrame = macroObject.initialFrame;
    const frames = macroObject.timeline;
    if (!frames || frames.length === 0) {
      return;
    }

    const timeline = new gsap.TimelineMax();
    if (!isNullOrUndefined(macroObject.repeat)) {
      timeline.repeat(macroObject.repeat);
    }

    if (type === AnimateTargetType.Sprite) {
      // 初始关键帧
      //  - 如初始关键帧为 null, 则从对象当前状态开始
      if (initialFrame) {
        timeline.to(target, 1 / 1000, initialFrame, 0);
      }

      // 播放时间轴
      for (let i = 0; i < frames.length; ++i) {
        const frame = frames[i] as SpriteMacroFrame;
        const lastFrame = frames[i - 1] as SpriteMacroFrame;

        const { duration, ...vars } = frame;
        vars.ease = null;

        const position = lastFrame ? `+=${lastFrame.duration / 1000}` : null;
        timeline.to(target, (duration || 1) / 1000, vars);
      }

      // 设置时间轴的总时间
      if (macroObject.totalDuration) {
        timeline.duration(macroObject.totalDuration / 1000);
      }
    } else if (type === AnimateTargetType.Camera) {
      const scene = target as Scene;
      const cameraInitialFrame = initialFrame as CameraMacroFrame;

      // 初始关键帧
      //  - 如初始关键帧为 null, 则从对象当前状态开始
      if (cameraInitialFrame) {
        scene.cameraMove(cameraInitialFrame.x, cameraInitialFrame.y, 0.00001);
      }

      // 播放时间轴
      for (let i = 0; i < frames.length; ++i) {
        const frame = frames[i] as CameraMacroFrame;

        // duration 不需要转换单位
        scene.cameraMove(frame.x, frame.x, frame.duration);
        scene.cameraZoom(frame.zoom, frame.duration);
      }
    }

    return new Promise((resolve, reject) => {
      if (!waitingForFinished) {
        resolve();
        return;
      }

      // 播放结束回调
      timeline.eventCallback("onComplete", () => {
        resolve();
      });
    });
  }
}
