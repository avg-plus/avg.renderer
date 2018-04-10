import * as gsap from "gsap";

export class SceneAnimation {

  public static fadeTo(
    target: string,
    to: number = 1,
    duration: number = 200,
    complete?: () => void
  ) {
    gsap.TweenLite.to(target, duration / 1000, { opacity: to }).eventCallback(
      "onComplete",
      () => {
        if (complete) {
          complete();
        }
        console.log("[Animation] FadeTo animation completed.");
      }
    );
  }
}
