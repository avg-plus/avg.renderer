import * as gsap from "gsap";

export class AnimationUtils {
  public static fadeTo(
    target: string,
    duration: number = 200,
    to: number = 1,
    complete?: () => void
  ) {
    AnimationUtils.to("fadeTo", target, duration, { opacity: to }, complete);
  }

  public static moveTo(
    target: string,
    duration: number = 200,
    x: number,
    y: number,
    complete?: () => void
  ) {
    AnimationUtils.to("MoveTo", target, duration, { x: x, y: y }, complete);
  }

  public static to(
    name: string,
    target: string,
    duration: number = 200,
    vars: any,
    complete?: () => void
  ) {
    gsap.TweenLite.to(target, duration / 1000, vars).eventCallback(
      "onComplete",
      () => {
        if (complete) {
          complete();
        }
        console.log("[Animation] %s animation completed.", name);
      }
    );
  }
}
