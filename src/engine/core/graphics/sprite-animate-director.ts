import * as gsap from "gsap";
import { Sprite } from "./sprite";
import { Scene } from "./scene";
import { isNullOrUndefined } from "../utils";
import { SpriteFilter } from "engine/data/sprite-renderer";

export enum AnimateTargetType {
  Camera,
  Sprite
}

class MacroFrame {
  duration?: number = 0;
}

class SpriteMacroFrame extends MacroFrame {
  [key: string]: any;
  filters?: SpriteFilter[] = [];
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

  public static async playAnimationMacro(
    type: AnimateTargetType,
    target: Sprite | Scene,
    macroObject: AnimationMacro,
    waitingForFinished: boolean = false
  ) {
    if (!macroObject) {
      return;
    }

    let initialFrame = macroObject.initialFrame;
    const frames = macroObject.timeline || [];

    const timeline = new gsap.TimelineMax();
    if (!isNullOrUndefined(macroObject.repeat)) {
      timeline.repeat(macroObject.repeat);
    }

    if (type === AnimateTargetType.Sprite) {
      const sprite = target as Sprite;
      initialFrame = <SpriteMacroFrame>initialFrame;

      // 初始关键帧
      //  - 如初始关键帧为 null, 则从对象当前状态开始
      if (initialFrame) {
        if (!initialFrame.filters) {
          initialFrame.filters = [];
        }

        timeline.to(sprite, 1 / 1000, initialFrame, 0);
        initialFrame.filters.map(v => {
          console.log("Initial filter : ", v);

          sprite.spriteFilters.setFilter(v.name, v.data);
        });
      }

      // 记录时间轴的播放位置
      let timelineCursorTime = 0;

      // 播放时间轴
      for (let i = 0; i < frames.length; ++i) {
        const frame = frames[i] as SpriteMacroFrame;
        let duration = (frame.duration || 1) / 1000;

        const { ...vars } = frame;
        vars.ease = vars.ease || gsap.Power0.easeNone;

        timeline.add(gsap.TweenLite.to(target, duration, vars), timelineCursorTime);

        // 处理滤镜动画
        if (frame && frame.filters && Array.isArray(frame.filters)) {
          for (let i = 0; i < frame.filters.length; ++i) {
            const v = frame.filters[i];
            // 创建一个空的滤镜
            const obj = await sprite.spriteFilters.setFilter(v.name, null);

            // 直接把值写到滤镜实例里
            // const tl = ;

            // 两边都有同一属性的情况下才能开始过渡
            timeline.add(
              gsap.TweenLite.to(obj.instance, duration, { ease: v.data.ease || gsap.Power0.easeNone, ...v.data }),
              timelineCursorTime
            );
          }
        }

        // 累加当前关键帧的时间
        timelineCursorTime += frame.duration / 1000;
      }

      // 设置时间轴的总时间
      if (macroObject.totalDuration) {
        timeline.duration(macroObject.totalDuration / 1000);
      }

      timeline.play();
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
}
