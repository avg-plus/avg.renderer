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
  @HostBinding("class.widget-center") center = true;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.showWidget();
  }

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

  public hideWidget() {
    switch (this.data.animation.name) {
      case avg.ScreenWidgetAnimation.Leave_FadeOut:
        this.fadeOut(this.data.animation.options);
        break;
    }
  }

  private appear() {
    gsap.TweenLite.to("#text-widget-container", 0, {
      opacity: 1
    });
  }

  private flyIn(options: avg.WidgetAnimation_FlyInOptions) {
    let offsetX = 0,
      offsetY = 0;
    if (options.direction === avg.AnimationDirection.FromLeft) {
      offsetX = -options.offset;
    } else if (options.direction === avg.AnimationDirection.FromRight) {
      offsetX = options.offset;
    } else if (options.direction === avg.AnimationDirection.FromUp) {
      offsetY = -options.offset;
    } else if (options.direction === avg.AnimationDirection.FromDown) {
      offsetY = options.offset;
    }

    gsap.TweenLite.to("#text-widget-container", 0, {
      x: offsetX,
      y: offsetY
    });

    gsap.TweenLite.to("#text-widget-container", options.duration, {
      opacity: 1,
      x: 0,
      y: 0
    });
  }

  private fadeIn(options: avg.WidgetAnimation_FadeInOptions) {
    gsap.TweenLite.to("#text-widget-container", options.duration, {
      opacity: 1
    }).eventCallback("onComplete", () => {
      console.log("[Text Animation] FadeTo animation completed.");
    });
  }

  private fadeOut(options: avg.WidgetAnimation_FadeOutOptions) {
    gsap.TweenLite.to("#text-widget-container", options.duration, {
      opacity: 0
    }).eventCallback("onComplete", () => {
      console.log("[Text Animation] FadeOut animation completed.");
    });
  }
}
