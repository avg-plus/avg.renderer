import * as gsap from "gsap";
import { Sprite } from "./sprite";
import { Scene } from "./scene";
import { isNullOrUndefined } from "../utils";
import { SpriteFilter } from "engine/data/sprite-renderer";

import * as $ from "jquery";

export enum AnimateTargetType {
  Camera,
  Sprite,
  HTMLElement
}

class MacroFrame {
  duration?: number = 0;
}

class SpriteMacroFrame extends MacroFrame {
  [key: string]: any;
  filters?: SpriteFilter[] = [];
}

class CSSMacroFrame extends MacroFrame {
  [key: string]: any;
}

class CameraMacroFrame extends MacroFrame {
  x: number = 0;
  y: number = 0;
  zoom: number = 1;
}

class AnimationMacro {
  // 播放进度回调
  onProgress?: (progress: number) => void;

  // 时间轴总播放时长（如指定该参数，则忽略帧内的duration）
  totalDuration?: number;

  // 重复次数（0 或者为空表示不重复，默认播放一次，-1为无限重复）
  repeat?: number = 0;
}
/**
 * 精灵的动画帧结构
 *
 * @export
 * @class SpriteAnimationMacro
 * @extends {AnimationMacro}
 */
export class SpriteAnimationMacro extends AnimationMacro {
  // 初始关键帧
  initialFrame?: SpriteMacroFrame | CameraMacroFrame;

  // 时间轴
  timeline: Array<SpriteMacroFrame | CameraMacroFrame>;
}
/**
 * CSS 样式动画帧结构
 *
 * @export
 * @class HTMLAnimationMacro
 * @extends {AnimationMacro}
 */
export class CSSAnimationMacro extends AnimationMacro {
  // 初始关键帧
  initialFrame?: CSSMacroFrame;

  // 时间轴
  timeline: Array<CSSMacroFrame>;
}

export class SpriteAnimateDirector {
  public static async playAnimationMacro(
    type: AnimateTargetType,
    target: Sprite | Scene | HTMLElement,
    macroObject: SpriteAnimationMacro | CSSAnimationMacro,
    waitingForFinished: boolean = false
  ) {
    if (!macroObject) {
      return;
    }

    const frames = macroObject.timeline || [];

    let timeline: gsap.TimelineMax;

    if (type === AnimateTargetType.Sprite) {
      const sprite = target as Sprite;
      timeline = this.animateSprite(sprite, macroObject);
    } else if (type === AnimateTargetType.Camera) {
      const scene = target as Scene;
      timeline = this.animateCamera(scene, macroObject);
    } else if (type === AnimateTargetType.HTMLElement) {
      const element = target as HTMLDivElement;
      timeline = this.animateHTMLElement(element, macroObject);
    }

    timeline.eventCallback("onUpdate", () => {
      if (macroObject.onProgress) {
        macroObject.onProgress(timeline.totalProgress());
      }
    });

    timeline.play();

    return new Promise((resolve, reject) => {
      // 异步模式或时间轴为空的情况下直接返回
      if (!waitingForFinished || frames.length === 0) {
        resolve();
        return;
      }

      // 播放结束回调
      timeline.eventCallback("onComplete", () => {
        resolve();
      });
    });
  }

  private static animateCamera(
    target: Scene,
    macroObject: SpriteAnimationMacro
  ) {
    let initialFrame = macroObject.initialFrame;
    const frames = macroObject.timeline || [];

    const timeline = new gsap.TimelineMax();
    timeline.pause();
    if (!isNullOrUndefined(macroObject.repeat)) {
      timeline.repeat(macroObject.repeat);
    }

    initialFrame = <SpriteMacroFrame>initialFrame;

    const cameraInitialFrame = initialFrame as CameraMacroFrame;

    // 初始关键帧
    //  - 如初始关键帧为 null, 则从对象当前状态开始
    if (cameraInitialFrame) {
      target.cameraMove(cameraInitialFrame.x, cameraInitialFrame.y, 0.00001);
    }

    // 播放时间轴
    for (let i = 0; i < frames.length; ++i) {
      const frame = frames[i] as CameraMacroFrame;

      // duration 不需要转换单位
      target.cameraMove(frame.x, frame.y, frame.duration);
      target.cameraZoom(frame.zoom, frame.duration);
    }

    return timeline;
  }

  private static animateSprite(
    target: Sprite,
    macroObject: SpriteAnimationMacro
  ) {
    let initialFrame = macroObject.initialFrame;
    const frames = macroObject.timeline || [];

    const timeline = new gsap.TimelineMax();
    timeline.pause();
    if (!isNullOrUndefined(macroObject.repeat)) {
      timeline.repeat(macroObject.repeat);
    }

    initialFrame = <SpriteMacroFrame>initialFrame;

    // 初始关键帧
    //  - 如初始关键帧为 null, 则从对象当前状态开始
    if (initialFrame) {
      if (!initialFrame.filters) {
        initialFrame.filters = [];
      }

      timeline.to(target, 1 / 1000, initialFrame, 0);
      initialFrame.filters.map(v => {
        console.log("Initial filter : ", v);

        target.spriteFilters.setFilter(v.name, v.data);
      });
    }

    // 记录时间轴的播放位置
    // 时间轴比0大一点，防止后续序列帧的播放位置覆盖初始化帧
    let timelineCursorTime = 0.00001;

    // 播放时间轴
    for (let i = 0; i < frames.length; ++i) {
      const frame = frames[i] as SpriteMacroFrame;
      let duration = (frame.duration || 1) / 1000;

      const { ...vars } = frame;
      vars.ease = vars.ease || gsap.Power0.easeNone;

      timeline.add(
        gsap.TweenLite.to(target, duration, vars),
        timelineCursorTime
      );

      // 处理滤镜动画
      if (frame && frame.filters && Array.isArray(frame.filters)) {
        for (let i = 0; i < frame.filters.length; ++i) {
          const v = frame.filters[i];
          // 创建一个空的滤镜
          const obj = target.spriteFilters.setFilter(v.name, null);

          // 两边都有同一属性的情况下才能开始过渡
          timeline.add(
            gsap.TweenLite.to(obj.instance, duration, {
              ease: v.data.ease || gsap.Power0.easeNone,
              ...v.data
            }),
            timelineCursorTime
          );
        }
      }

      // 累加当前关键帧的时间
      timelineCursorTime += frame.duration / 1000;
    }

    // 设置时间轴的总时间
    if (macroObject.totalDuration !== undefined) {
      timeline.duration(macroObject.totalDuration / 1000 || 0.01);
    }

    return timeline;
  }

  private static animateHTMLElement(
    targetElment: HTMLElement,
    macroObject: CSSAnimationMacro
  ) {
    let initialFrame = macroObject.initialFrame;
    const target = $(targetElment);

    const timeline = new gsap.TimelineMax();
    timeline.pause();
    if (!isNullOrUndefined(macroObject.repeat)) {
      timeline.repeat(macroObject.repeat);
    }

    initialFrame = <CSSMacroFrame>initialFrame;
    const frames = macroObject.timeline || [];

    target.change((...args) => {
      console.log("HTML Widget changed", args);
    });
    timeline.eventCallback("onUpdate", () => {});

    // 初始关键帧
    //  - 如初始关键帧为 null, 则从对象当前状态开始
    if (initialFrame) {
      timeline.to(target, 0.000001, { css: { ...initialFrame } }, 0);
    }

    // 记录时间轴的播放位置
    // 时间轴比0大一点，防止后续序列帧的播放位置覆盖初始化帧
    let timelineCursorTime = 0.00001;

    // 播放时间轴
    for (let i = 0; i < frames.length; ++i) {
      const frame = frames[i] as CSSMacroFrame;
      let duration = (frame.duration || 1) / 1000;

      const { ...vars } = frame;
      let ease = vars.ease || gsap.Power0.easeNone;

      timeline.add(
        gsap.TweenLite.to(target, duration, { ease, css: { ...vars } }),
        timelineCursorTime
      );

      // 累加当前关键帧的时间
      timelineCursorTime += duration;
    }

    // 设置时间轴的总时间
    if (macroObject.totalDuration !== undefined) {
      timeline.duration(macroObject.totalDuration / 1000 || 0.01);
    }

    return timeline;
  }
}
