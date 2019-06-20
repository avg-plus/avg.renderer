import { AVGData } from "./avg-data";
import { AVGMeasurementUnit } from "../core/measurement-unit";

export class ScreenPosition {
  public static TopLeft = "topleft"; // 左上
  public static TopRight = "topright"; // 右上
  public static BottomLeft = "bottomleft"; // 左下
  public static BottomRight = "bottomright"; // 右下
  public static Top = "top"; // 顶部
  public static Left = "left"; // 左
  public static Right = "right"; // 右
  public static Bottom = "bottom"; // 下
  public static Center = "center"; // 居中
}

export enum ScreenWidgetType {
  Image,
  Text,
  Html
}

export class ScreenWidgetAnimation {
  public static Enter_Appear = "appear";
  public static Enter_FadeIn = "fadein";
  public static Enter_FlyIn = "flyin";
  public static Enter_ScaleIn = "scalein";
  public static Leave_Hide = "hide";
  public static Leave_FadeOut = "fadeout";
  public static Leave_FlyOut = "flyout";
  public static Leave_ScaleOut = "scaleout";
}

export class AnimationDirection {
  public static FromLeft = "left";
  public static FromRight = "right";
  public static FromUp = "up";
  public static FromDown = "down";
}

/* Animations */
export class WidgetAnimationOptions {
  public duration: number = 0;
}

export class WidgetAnimation_FadeInOptions extends WidgetAnimationOptions {}
export class WidgetAnimation_FadeOutOptions extends WidgetAnimationOptions {}
export class WidgetAnimation_FlyInOptions extends WidgetAnimationOptions {
  public offset: number = 10;
  public _direction: string = AnimationDirection.FromLeft;

  public set direction(value: string) {
    this._direction = value.toString().toLowerCase();
  }

  public get direction(): string {
    return this._direction;
  }
}

export class WidgetAnimation_FlyOutOptions extends WidgetAnimation_FlyInOptions {}
export class WidgetAnimation_HideOptions extends WidgetAnimationOptions {}

export class WidgetAnimation {
  private _name: string;

  public set name(value: string) {
    this._name = value.trim().toLowerCase();
    console.log("set animation name", this.name);
  }

  public get name(): string {
    return this._name;
  }

  public options:
    | WidgetAnimation_FadeInOptions
    | WidgetAnimation_FadeOutOptions
    | WidgetAnimation_FlyInOptions
    | WidgetAnimation_FlyOutOptions;
}

export class ScreenWidget {
  private _widgetType: ScreenWidgetType;
  private _position: string = new AVGMeasurementUnit("0%", "0%").getValue();

  public name: string;
  private x: number;
  private y: number;
  public xUnit: string;
  public yUnit: string;

  public get position() {
    return this._position;
  }

  public set position(value: string) {
    const units = AVGMeasurementUnit.fromString(value);

    if (units) {
      this.xUnit = units.getLeft() ? units.getLeft().getValue() : "0%";
      this.yUnit = units.getRight() ? units.getRight().getValue() : "0%";

      // If not a pair, make it a pair
      if (!units.isPairUnit()) {
        this._position = new AVGMeasurementUnit(
          units.getLeft().getValue(),
          "0%"
        ).getValue();
      } else {
        this._position = units.getValue();
      }
    }

    // // Ignore spaces
    // this._position = value.replace(" ", "").toLowerCase();

    // // If custom position
    // let regex = /\((\d+%?),(\d+%?)\)/;
    // let matches = this._position.match(regex);

    // if (matches) {
    //   this.x = matches[1] + (matches[1].substr(-1) === "%" ? "" : "px");
    //   this.y = matches[2] + (matches[2].substr(-1) === "%" ? "" : "px");
    // }
  }

  public animation: WidgetAnimation = new WidgetAnimation();

  constructor(type: ScreenWidgetType) {
    this._widgetType = type;
  }
}
