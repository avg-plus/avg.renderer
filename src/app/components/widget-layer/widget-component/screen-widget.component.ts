import {
  OnInit,
  AfterViewInit,
  HostBinding,
  Input,
  Injector,
  ChangeDetectorRef,
  AfterViewChecked,
  Renderer2,
  ElementRef
} from "@angular/core";
import * as avg from "avg-engine/engine";
import { AnimationUtils } from "../../../common/animations/animation-utils";
import { WidgetModel } from "../widget-layer.service";
import { Subject } from "rxjs/Subject";

export class ScreenWidgetComponent implements OnInit, AfterViewInit, AfterViewChecked {
  // @HostBinding("class.widget-top-left") isTopLeft = false;
  // @HostBinding("class.widget-top-right") isTopRight = false;
  // @HostBinding("class.widget-bottom-left") isBottomLeft = false;
  // @HostBinding("class.widget-bottom-right") isBottomRight = false;
  // @HostBinding("class.widget-top") isTop = false;
  // @HostBinding("class.widget-left") isLeft = false;
  // @HostBinding("class.widget-right") isRight = false;
  // @HostBinding("class.widget-bottom") isBottom = false;
  // @HostBinding("class.widget-center") isCentered = false;

  public api: avg.APIScreenImage;
  private _data: avg.ScreenWidget;
  private _subject: Subject<any> = new Subject<any>();

  public onShowAnimationCallback: () => void;
  public onRemoveAnimationCallback: () => void;

  protected ElementID = "";
  protected WidgetElementID = "";

  constructor(protected changeDetectorRef: ChangeDetectorRef, private renderer: Renderer2, private element: ElementRef) { }

  public set data(value: avg.ScreenWidget) {
    this._data = value;
  }

  public get data(): avg.ScreenWidget {
    return this._data;
  }

  private lowercaseDataFields(data: avg.ScreenWidget) {

    if (!data) {
      return;
    }

    if (data.animation) {
      data.animation.name = data.animation.name
        ? data.animation.name.toLowerCase()
        : "";
    }

    if (data.animation && data.animation.options) {

      data.animation.options["direction"] = data.animation.options[
        "direction"
      ]
        ? data.animation.options["direction"].toLowerCase()
        : "";
    }

    data.position = data.position
      ? data.position.toLowerCase()
      : "";

  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.ElementID = this.data.id;
    this.WidgetElementID = "#" + this.ElementID;

    this.changeDetectorRef.detectChanges();
  }

  ngAfterViewChecked() {

  }

  protected showWidget() {
    this.lowercaseDataFields(this.data);

    if (this.data.x || this.data.y) {
      AnimationUtils.to("showWidget Initialize", this.WidgetElementID, 0, {
        opacity: 0,
        position: "fixed",
        left: this.data.x,
        top: this.data.y
      });

      return;
    }

    const positions = new Map<string, string>([
      [avg.ScreenPosition.TopLeft, "widget-top-left"],
      [avg.ScreenPosition.TopRight, "widget-top-right"],
      [avg.ScreenPosition.BottomLeft, "widget-bottom-left"],
      [avg.ScreenPosition.BottomRight, "widget-bottom-right"],
      [avg.ScreenPosition.Top, "widget-top"],
      [avg.ScreenPosition.Left, "widget-left"],
      [avg.ScreenPosition.Right, "widget-right"],
      [avg.ScreenPosition.Bottom, "widget-bottom"],
      [avg.ScreenPosition.Center, "widget-center"]
    ]);

    const bindingClass = positions.get(this.data.position);
    if (bindingClass) {
      this.renderer.addClass(this.element.nativeElement, bindingClass);
    }
  }

  protected initShowAnimation() {
    setTimeout(() => {
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
        case avg.ScreenWidgetAnimation.Enter_ScaleIn:
          break;
        default:
          console.warn("Could not found animation name [%s]", this.data.animation.name);
          this.appear();
          break;
      }
    }, 0);
  }

  public hideWidget(data: avg.ScreenWidget) {

    if (!data.animation) {
      this.hide();
      return;
    }

    this.lowercaseDataFields(data);

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
      default:
        console.warn("Could not found animation name [%s]", data.animation.name);
        this.hide();
        break;
    }
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

  protected flyAnimation_calc(
    options:
      | avg.WidgetAnimation_FlyInOptions
      | avg.WidgetAnimation_FlyOutOptions
  ) {
    let offsetX = 0,
      offsetY = 0;

    if (options.direction === undefined || !options.direction) {
      options.direction = avg.AnimationDirection.FromLeft;
    }

    if (
      options.direction !== avg.AnimationDirection.FromLeft &&
      options.direction !== avg.AnimationDirection.FromRight &&
      options.direction !== avg.AnimationDirection.FromDown &&
      options.direction !== avg.AnimationDirection.FromUp
    ) {
      options.direction = avg.AnimationDirection.FromLeft;
    }

    if (!options.offset || options.offset === undefined || options.offset < 0) {
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

  protected flyIn(options: avg.WidgetAnimation_FlyInOptions) {
    const calcData = this.flyAnimation_calc(options);

    const offsetX = calcData.offsetX,
      offsetY = calcData.offsetY;
    options = calcData.options;

    AnimationUtils.to("FlyIn::Initialize()", this.WidgetElementID, 0, {
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

  protected flyOut(options: avg.WidgetAnimation_FlyOutOptions) {
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

  protected fadeIn(options: avg.WidgetAnimation_FadeInOptions) {
    AnimationUtils.fadeTo(this.WidgetElementID, options.duration, 1, () => {
      this.onShowAnimationComplete();
    });
  }

  protected fadeOut(options: avg.WidgetAnimation_FadeOutOptions) {
    AnimationUtils.fadeTo(this.WidgetElementID, options.duration, 0, () => {
      this.onHideAnimationComplete();
    });
  }

  protected onShowAnimationComplete(): void {
    console.log("[Widget: Show Animation] completed.");

    if (this.onShowAnimationCallback) {
      this.onShowAnimationCallback();
    }
  }

  protected onHideAnimationComplete(): void {
    console.log("[Widget: Hide Animation] completed.");

    // Notify manager to destroy
    if (this.onRemoveAnimationCallback) {
      this.onRemoveAnimationCallback();
    }
  }
}
