import {
  OnInit,
  Component,
  Input,
  AfterViewInit,
  OnDestroy,
  HostBinding
} from "@angular/core";
import { NgForOf } from "@angular/common";
import { Subtitle } from "avg-engine/engine";

import * as gsap from "gsap";
import * as avg from "avg-engine/engine";

@Component({
  selector: "text-widget",
  templateUrl: "./text-widget.component.html",
  styleUrls: ["./text-widget.component.scss"]
})
export class TextWidgetComponent implements OnInit, AfterViewInit {
  @Input() data: Subtitle;

  @HostBinding("class.widget-top-left") isTopLeft = false;
  @HostBinding("class.widget-top-right") isTopRight = false;
  @HostBinding("class.widget-bottom-left") isBottomLeft = false;
  @HostBinding("class.widget-bottom-right") isBottomRight = false;
  @HostBinding("class.widget-top") isTop = false;
  @HostBinding("class.widget-left") isLeft = false;
  @HostBinding("class.widget-right") isRight = false;
  @HostBinding("class.widget-bottom") isBottom = false;
  @HostBinding("class.widget-center") isCentered = false;

  private readonly WidgetElementID = "#text-widget-container";
  private finishedCallback: () => void;

  constructor() {}

  ngOnInit() {
    this.isTopLeft = this.data.position === avg.ScreenPosition.TopLeft;
    this.isTopRight = this.data.position === avg.ScreenPosition.TopRight;
    this.isBottomLeft = this.data.position === avg.ScreenPosition.BottomLeft;
    this.isBottomRight = this.data.position === avg.ScreenPosition.BottomRight;
    this.isTop = this.data.position === avg.ScreenPosition.Top;
    this.isLeft = this.data.position === avg.ScreenPosition.Left;
    this.isRight = this.data.position === avg.ScreenPosition.Right;
    this.isBottom = this.data.position === avg.ScreenPosition.Bottom;
    this.isCentered = this.data.position === avg.ScreenPosition.Center;
  }

  ngAfterViewInit() {}

  public showWidget() {
    switch (this.data.animation.name) {
      case avg.ScreenWidgetAnimation.Enter_FadeIn:
        this.fadeIn(this.data.animation.options);
        break;
      case avg.ScreenWidgetAnimation.Enter_FlyIn:
        this.flyIn(<avg.WidgetAnimation_FlyInOptions>this.data.animation
          .options);
        break;
      case avg.ScreenWidgetAnimation.Enter_Appear:
        this.appear();
        break;
    }
  }

  public hideWidget(data: avg.Subtitle) {
    switch (data.animation.name) {
      case avg.ScreenWidgetAnimation.Leave_FadeOut:
        this.fadeOut(data.animation.options);
        break;
      case avg.ScreenWidgetAnimation.Leave_FlyOut:
        this.flyOut(<avg.WidgetAnimation_FlyOutOptions>data.animation.options);
        break;
      case avg.ScreenWidgetAnimation.Leave_Hide:
        this.hide();
        break;
      case avg.ScreenWidgetAnimation.Leave_ScaleOut:
        break;
    }
  }

  public registerFinishedCallback(callback: () => void) {
    if (callback) {
      this.finishedCallback = callback;
    }
  }

  private appear() {
    gsap.TweenLite.to(this.WidgetElementID, 0, {
      opacity: 1
    }).eventCallback("onComplete", () => {
      this.onShowAnimationComplete();
    });
  }

  private hide() {
    gsap.TweenLite.to(this.WidgetElementID, 0, {
      opacity: 0
    }).eventCallback("onComplete", () => {
      this.onHideAnimationComplete();
    });
  }

  private flyAnimation_calc(
    options:
      | avg.WidgetAnimation_FlyInOptions
      | avg.WidgetAnimation_FlyOutOptions
  ) {
    let offsetX = 0,
      offsetY = 0;
    if (
      options.direction !== avg.AnimationDirection.FromLeft &&
      options.direction !== avg.AnimationDirection.FromRight &&
      options.direction !== avg.AnimationDirection.FromDown &&
      options.direction !== avg.AnimationDirection.FromUp
    ) {
      options.direction = avg.AnimationDirection.FromLeft;
    }

    if (options.offset < 0) {
      options.offset = 20;
    }

    if (options.direction === avg.AnimationDirection.FromLeft) {
      offsetX = -options.offset;
    } else if (options.direction === avg.AnimationDirection.FromRight) {
      offsetX = options.offset;
    } else if (options.direction === avg.AnimationDirection.FromUp) {
      offsetY = -options.offset;
    } else if (options.direction === avg.AnimationDirection.FromDown) {
      offsetY = options.offset;
    }

    return { options, offsetX, offsetY };
  }

  private flyIn(options: avg.WidgetAnimation_FlyInOptions) {
    let calcData = this.flyAnimation_calc(options);

    let offsetX = calcData.offsetX,
      offsetY = calcData.offsetY;
    options = calcData.options;

    gsap.TweenLite.to(this.WidgetElementID, 0, {
      x: offsetX,
      y: offsetY
    });

    gsap.TweenLite.to(this.WidgetElementID, options.duration, {
      opacity: 1,
      x: 0,
      y: 0
    }).eventCallback("onComplete", () => {
      this.onShowAnimationComplete();
    });
  }

  private flyOut(options: avg.WidgetAnimation_FlyOutOptions) {
    let calcData = this.flyAnimation_calc(options);

    let offsetX = calcData.offsetX,
      offsetY = calcData.offsetY;
    options = calcData.options;

    gsap.TweenLite.to(this.WidgetElementID, 0, {
      x: 0,
      y: 0
    });

    gsap.TweenLite.to(this.WidgetElementID, options.duration, {
      opacity: 0,
      x: offsetX,
      y: offsetY
    }).eventCallback("onComplete", () => {
      this.onHideAnimationComplete();
    });
  }

  private fadeIn(options: avg.WidgetAnimation_FadeInOptions) {
    gsap.TweenLite.to(this.WidgetElementID, options.duration, {
      opacity: 1
    }).eventCallback("onComplete", () => {
      this.onShowAnimationComplete();
    });
  }

  private fadeOut(options: avg.WidgetAnimation_FadeOutOptions) {
    gsap.TweenLite.to(this.WidgetElementID, options.duration, {
      opacity: 0
    }).eventCallback("onComplete", () => {
      this.onHideAnimationComplete();
    });
  }

  private onShowAnimationComplete(): void {
    console.log("[TextWidget: Show Animation] completed.");
  }

  private onHideAnimationComplete(): void {
    console.log("[TextWidget: Show Animation] completed.");

    // Notify manager to destroy
    this.finishedCallback();
  }
}
