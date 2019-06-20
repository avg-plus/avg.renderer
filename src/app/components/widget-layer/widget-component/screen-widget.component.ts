import { OnInit, AfterViewInit, ChangeDetectorRef, AfterViewChecked, Renderer2, ElementRef } from "@angular/core";
import { AnimationUtils } from "../../../common/animations/animation-utils";
import {
  ScreenWidget,
  WidgetAnimation,
  WidgetAnimationOptions,
  ScreenWidgetAnimation,
  WidgetAnimation_FlyInOptions,
  WidgetAnimation_FlyOutOptions,
  AnimationDirection,
  WidgetAnimation_FadeInOptions,
  WidgetAnimation_FadeOutOptions
} from "engine/data/screen-widget";
import { APIScreenImage } from "engine/scripting/api/api-screen-image";

export class ScreenWidgetComponent implements OnInit, AfterViewInit, AfterViewChecked {
  public api: APIScreenImage;
  private _data: ScreenWidget;

  public onShowAnimationCallback: () => void;
  public onAnimateCallback: () => void;
  public onRemoveAnimationCallback: () => void;

  protected ElementID = "";
  protected WidgetElementID = "";

  constructor(protected changeDetectorRef: ChangeDetectorRef) {}

  public set data(value: ScreenWidget) {
    this._data = value;
  }

  public get data(): ScreenWidget {
    return this._data;
  }

  private lowercaseDataFields(data: ScreenWidget) {
    if (!data) {
      return;
    }

    if (data.animation) {
      data.animation.name = data.animation.name ? data.animation.name.toLowerCase() : "";
    }

    if (data.animation && data.animation.options) {
      data.animation.options["direction"] = data.animation.options["direction"]
        ? data.animation.options["direction"].toLowerCase()
        : "";
    }

    data.position = data.position ? data.position.toLowerCase() : "";
  }

  private initWidgetData(data: ScreenWidget) {
    data.animation = data.animation || new WidgetAnimation();
    data.animation.name = data.animation.name || "";
    data.animation.options = data.animation.options || new WidgetAnimationOptions();
    data.animation.options.duration = data.animation.options.duration || 0;

    return data;
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.ElementID = this.data.name;
    this.WidgetElementID = "#" + this.ElementID;

    this.changeDetectorRef.detectChanges();
  }

  ngAfterViewChecked() {}

  protected showWidget() {
    this.initWidgetData(this.data);
    this.lowercaseDataFields(this.data);

    // if (this.data.xUnit || this.data.yUnit) {
    //   const style = {
    //     position: "fixed",
    //     left: this.data.x,
    //     top: this.data.y,
    //     // width: "100%",
    //     // height: "100%"
    //   };

    //   this.renderer.setProperty(this.element.nativeElement, "style", EngineUtils.cssObjectToStyles(style));

    //   return;
    // }

    // const positions = new Map<string, string>([
    //   [ScreenPosition.TopLeft, "widget-top-left"],
    //   [ScreenPosition.TopRight, "widget-top-right"],
    //   [ScreenPosition.BottomLeft, "widget-bottom-left"],
    //   [ScreenPosition.BottomRight, "widget-bottom-right"],
    //   [ScreenPosition.Top, "widget-top"],
    //   [ScreenPosition.Left, "widget-left"],
    //   [ScreenPosition.Right, "widget-right"],
    //   [ScreenPosition.Bottom, "widget-bottom"],
    //   [ScreenPosition.Center, "widget-center"]
    // ]);

    // const bindingClass = positions.get(this.data.position);
    // if (bindingClass) {
    //   this.renderer.addClass(this.element.nativeElement, bindingClass);
    // }
  }

  protected initShowAnimation() {
    setTimeout(() => {
      switch (this.data.animation.name) {
        case ScreenWidgetAnimation.Enter_FadeIn:
          this.fadeIn(this.data.animation.options);
          break;
        case ScreenWidgetAnimation.Enter_FlyIn:
          this.flyIn(<WidgetAnimation_FlyInOptions>this.data.animation.options);
          break;
        case ScreenWidgetAnimation.Enter_Appear:
          this.appear();
          break;
        case ScreenWidgetAnimation.Enter_ScaleIn:
          break;
        default:
          console.warn("Could not found animation name [%s]", this.data.animation.name);
          this.appear();
          break;
      }
    }, 1);
  }

  public animateWidgetTo(vars: any, duration: number) {
    AnimationUtils.to("animateWidgetTo", this.WidgetElementID, duration, vars, this.onAnimateComplete);
  }

  public hideWidget(data: ScreenWidget) {
    if (!data.animation) {
      this.hide();
      return;
    }

    this.initWidgetData(data);
    this.lowercaseDataFields(data);

    setTimeout(() => {
      switch (data.animation.name) {
        case ScreenWidgetAnimation.Leave_FadeOut:
          this.fadeOut(data.animation.options);
          break;
        case ScreenWidgetAnimation.Leave_FlyOut:
          this.flyOut(<WidgetAnimation_FlyOutOptions>data.animation.options);
          break;
        case ScreenWidgetAnimation.Leave_Hide:
          this.hide();
          break;
        case ScreenWidgetAnimation.Leave_ScaleOut:
          break;
        default:
          console.warn("Could not found animation name [%s]", data.animation.name);
          this.hide();
          break;
      }
    }, 1);
  }

  protected appear() {
    AnimationUtils.fadeTo(this.WidgetElementID, 0, 1, () => {
      this.onShowAnimationComplete();
    });
  }

  protected hide() {
    AnimationUtils.fadeTo(this.WidgetElementID, 0, 0, () => {
      this.onHideAnimationComplete();
    });
  }

  protected flyAnimation_calc(options: WidgetAnimation_FlyInOptions | WidgetAnimation_FlyOutOptions) {
    let offsetX = 0,
      offsetY = 0;

    if (options.direction === undefined || !options.direction) {
      options.direction = AnimationDirection.FromLeft;
    }

    if (
      options.direction !== AnimationDirection.FromLeft &&
      options.direction !== AnimationDirection.FromRight &&
      options.direction !== AnimationDirection.FromDown &&
      options.direction !== AnimationDirection.FromUp
    ) {
      options.direction = AnimationDirection.FromLeft;
    }

    if (options.offset === null || options.offset === undefined || options.offset < 0) {
      options.offset = 20;
    }

    if (options.direction === AnimationDirection.FromLeft) {
      offsetX = -options.offset;
    } else if (options.direction === AnimationDirection.FromRight) {
      offsetX = options.offset;
    } else if (options.direction === AnimationDirection.FromUp) {
      offsetY = -options.offset;
    } else if (options.direction === AnimationDirection.FromDown) {
      offsetY = options.offset;
    }

    return { options, offsetX, offsetY };
  }

  protected flyIn(options: WidgetAnimation_FlyInOptions) {
    const calcData = this.flyAnimation_calc(options);

    const offsetX = calcData.offsetX,
      offsetY = calcData.offsetY;
    options = calcData.options;

    AnimationUtils.to("FlyIn::Initialize()", this.WidgetElementID, 0, {
      opacity: 0,
      x: offsetX,
      y: offsetY
    });

    AnimationUtils.to(
      "FlyIn::Animate()",
      this.WidgetElementID,
      options.duration,
      {
        opacity: 1,
        x: 0,
        y: 0
      },
      () => {
        this.onShowAnimationComplete();
      }
    );
  }

  protected flyOut(options: WidgetAnimation_FlyOutOptions) {
    const calcData = this.flyAnimation_calc(options);

    const offsetX = calcData.offsetX,
      offsetY = calcData.offsetY;
    options = calcData.options;

    AnimationUtils.to("flyOut", this.WidgetElementID, 0, {
      x: 0,
      y: 0
    });

    AnimationUtils.to(
      "flyOut",
      this.WidgetElementID,
      options.duration,
      {
        opacity: 0,
        x: offsetX,
        y: offsetY
      },
      () => {
        this.onHideAnimationComplete();
      }
    );
  }

  protected fadeIn(options: WidgetAnimation_FadeInOptions) {
    AnimationUtils.fadeTo(this.WidgetElementID, options.duration, 1, () => {
      this.onShowAnimationComplete();
    });
  }

  protected fadeOut(options: WidgetAnimation_FadeOutOptions) {
    AnimationUtils.fadeTo(this.WidgetElementID, options.duration, 0, () => {
      this.onHideAnimationComplete();
    });
  }

  protected onShowAnimationComplete(): void {
    // console.log("[Widget: Show Animation] completed.");

    if (this.onShowAnimationCallback) {
      this.onShowAnimationCallback();
    }
  }

  protected onAnimateComplete(): void {
    // console.log("[Widget: Show Animation] completed.");

    if (this.onAnimateCallback) {
      this.onAnimateCallback();
    }
  }

  protected onHideAnimationComplete(): void {
    // console.log("[Widget: Hide Animation] completed.");

    // Notify manager to destroy
    if (this.onRemoveAnimationCallback) {
      this.onRemoveAnimationCallback();
    }
  }
}
