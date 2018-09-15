import * as gsap from "gsap";
import * as $ from "jquery";
import * as avg from "avg-engine/engine";
import { EngineUtils } from "avg-engine/engine";

export class AnimationUtils {
  public static fadeTo(target: string, duration: number = 200, to: number = 1, complete?: () => void) {
    AnimationUtils.to("FadeTo", target, duration, { opacity: to }, complete);
  }

  public static moveTo(target: string, duration: number = 200, x: number, y: number, complete?: () => void) {
    AnimationUtils.to("MoveTo", target, duration, { x: x, y: y }, complete);
  }

  // Set transform origin anchor of the target
  public static setAnchor(target: string, anchor: string = "center center") {
    AnimationUtils.to(
      "scaleTo",
      target,
      0,
      {
        "transform-origin": anchor
      },
      () => {
      }
    );
  }

  /**
   *  animateCssFilter
   *
   * @static
   * @param {string} target
   * @param {string} filterProperty
   * @param {number} normalizationValue: normalize to 1 - 100
   * @returns
   * @memberof AnimationUtils
   */
  public static animateCssFilter(target: string, filterProperty: string, duration: number, strength: number) {
    return new Promise((resolve, reject) => {
      const FILTERS = new Map([
        ["blur", "px"],
        ["brightness", "%"],
        ["contrast", "%"],
        ["grayscale", "%"],
        ["hue-rotate", "deg"],
        ["invert", "%"],
        ["opacity", "%"],
        ["saturate", "%"],
        ["sepia", "%"]
      ]);

      FILTERS.forEach((v, k) => {
        if (v === filterProperty) {
          console.warn("Effect Name {0} not found.", filterProperty);
          return;
        }
      });

      let value = (strength || 0) * 1;
      value = EngineUtils.NumericRange(value, 0, 100);

      if (filterProperty === "hue-rotate") {
        value = value * (360 / 100); // normalize to 360
      } else if (filterProperty === "blur") {
        value = value / 10; // blur max = 10px
      }

      const elementID = target;
      const e = $(elementID);
      if (e.length === 0) {
        console.error(`Target ${target} not exists`);
        resolve();
      }

      let currentFilters = e.css("filter");
      let filters = EngineUtils.parseCSSFilters(currentFilters);

      // Get the value of current effectName
      let currentEffectValue = filters.get(filterProperty);
      if (currentEffectValue) {
        if (filterProperty === "hue-rotate") {
          currentEffectValue = currentEffectValue.replace("deg", "");
        } else if (filterProperty === "blur") {
          currentEffectValue = currentEffectValue.replace("px", "");
        }
      }

      console.log("currentEffectValue", currentEffectValue);

      let startValue = 0;
      if (currentEffectValue) {
        startValue = Number(currentEffectValue);
      } else {
        // opacity's initial value is 100%
        if (filterProperty === "opacity" || filterProperty === "brightness") {
          startValue = 100;
        }
      }

      EngineUtils.countTo(
        startValue,
        value,
        duration,
        v => {
          // console.log(v);
          // Set exist filters
          currentFilters = e.css("filter");
          filters = EngineUtils.parseCSSFilters(currentFilters);
          e.css("filter", currentFilters);

          // Apply new filters value
          const filterValue = v + FILTERS.get(filterProperty);
          filters.set(filterProperty, filterValue);

          const newFilters = EngineUtils.toCSSFilter(filters);

          e.css("filter", newFilters);
        },
        resolve
      );
    });
  }

  public static applyFilters(target: string, duration: number, filter: avg.Filter[]) {
    if (!EngineUtils.isUndefined(filter) && Array.isArray(filter)) {
      filter.forEach(v => {
        AnimationUtils.animateCssFilter(target, v.name, duration, v.strength);
      });
    }
  }

  public static scaleTo(target: string, duration: number = 200, ratio: number, complete?: () => void) {
    AnimationUtils.to(
      "scaleTo",
      target,
      duration,
      {
        transform: `scale(${ratio})`
      },
      complete
    );
  }

  public static rotateTo(target: string, duration: number = 200, angle: number, complete?: () => void) {
    AnimationUtils.to(
      "rotateTo",
      target,
      duration,
      {
        transform: `rotate(${angle}deg)`
      },
      complete
    );
  }

  public static to(name: string, target: string, duration: number = 200, vars: any, complete?: () => void) {
    duration = duration === 0 ? 1 : duration;

    // gsap.TweenLite.killTweensOf(target, true);

    setTimeout(() => {
      // Be sure DOM was created
      gsap.TweenLite.to(target, duration / 1000, vars).eventCallback("onComplete", () => {
        if (complete) {
          complete();
        }
        // console.log(
        //   "[Animation] %s animation completed. (target=%s, duration=%d)",
        //   name,
        //   target,
        //   duration
        // );
      });
    }, 0);
  }
}
