import { ScreenWidgetType } from "./../data/screen-widget";
import { AVGMeasurementUnit, UnitType } from "./measurement-unit";
import { GameWorld } from "./graphics/world";
import { AnimateTargetType } from "engine/core/graphics/sprite-animate-director";

export class TransformConverter {
  /**
   * 把坐标/尺寸描述结构转换为实际的游戏屏幕坐标/尺寸
   *
   * @static
   * @param {(AVGMeasurementUnit | string)} position
   * @returns
   * @memberof TransformConverter
   */
  static toActualPosition(
    position: AVGMeasurementUnit | string,
    target: AnimateTargetType
  ): { left: string; right: string } {
    // const values: any[] = [];

    const result = {
      left: "",
      right: ""
    };

    let positionUnit: AVGMeasurementUnit;
    if (position && typeof position === "string") {
      positionUnit = AVGMeasurementUnit.fromString(position);
    }

    const left = positionUnit.getLeft();
    const right = positionUnit.getRight();

    // 把单位换算为世界坐标
    if (left.isPixel()) {
      result.left = left.getNumbericValue().toString();
      if (target === AnimateTargetType.HTMLElement) {
        result.left += UnitType.Pixel;
      }
    } else if (left.isPercent()) {
      let actualX = (
        GameWorld.worldWidth *
        (left.getNumbericValue() / 100)
      ).toString();

      if (target === AnimateTargetType.HTMLElement) {
        actualX = left.getValue();
      }
      result.left = actualX;
    } else if (left.isCustomUnit()) {
      switch (left.getValue()) {
        case "center": // 计算居中位置
          result.left = (GameWorld.worldWidth / 2).toString();
          if (target === AnimateTargetType.HTMLElement) {
            result.left += UnitType.Pixel;
          }
          break;
        case "left":
          result.left = "0";

          if (target === AnimateTargetType.HTMLElement) {
            result.left += UnitType.Pixel;
          }
          break;
        case "right":
          result.left = GameWorld.worldWidth.toString();
          if (target === AnimateTargetType.HTMLElement) {
            result.left += UnitType.Pixel;
          }
          break;
        default:
          result.left = right.getValue();
          break;
      }
    }

    if (right.isPixel()) {
      result.right = right.getNumbericValue().toString();

      if (target === AnimateTargetType.HTMLElement) {
        result.right += UnitType.Pixel;
      }
    } else if (right.isPercent()) {
      result.right = (
        GameWorld.worldHeight *
        (right.getNumbericValue() / 100)
      ).toString();

      if (target === AnimateTargetType.HTMLElement) {
        result.right = right.getValue();
      }
    } else if (right.isCustomUnit()) {
      switch (right.getValue()) {
        case "center":
          result.right = `${GameWorld.worldHeight / 2}`;
          if (target === AnimateTargetType.HTMLElement) {
            result.right += UnitType.Percent;
          }
          break;
        case "top":
          result.right = `0`;
          if (target === AnimateTargetType.HTMLElement) {
            result.right += UnitType.Pixel;
          }
          break;
        case "bottom":
          result.right = `${GameWorld.worldHeight}`;
          if (target === AnimateTargetType.HTMLElement) {
            result.right += UnitType.Pixel;
          }
          break;
        default:
          result.right = right.getValue();
          break;
      }
    }

    console.log(`toActual [${position}] => `, result);

    return result;
  }

  /**
   * 把尺寸描述结构转换为实际的游戏屏幕尺寸
   *
   * @static
   * @param {(AVGMeasurementUnit | string)} size
   * @param {(AVGMeasurementUnit | string)} [referSize] 用于修正位置
   * @returns
   * @memberof TransformConverter
   */
  static toActualSzie(
    size: AVGMeasurementUnit | string,
    target: AnimateTargetType,
    referWidth?: number,
    referHeight?: number
  ) {
    referWidth = referWidth || GameWorld.worldWidth;
    referHeight = referHeight || GameWorld.worldHeight;

    const result = {
      left: "",
      right: ""
    };

    let positionUnit: AVGMeasurementUnit;
    if (size && typeof size === "string") {
      positionUnit = AVGMeasurementUnit.fromString(size);
    }

    const left = positionUnit.getLeft();
    const right = positionUnit.getRight();

    // 把单位换算为世界坐标
    if (left.isPixel()) {
      result.left = left.getNumbericValue().toString();
      if (target === AnimateTargetType.HTMLElement) {
        result.left += UnitType.Pixel;
      }
    } else if (left.isPercent()) {
      let actualX = (referWidth * (left.getNumbericValue() / 100)).toString();

      if (target === AnimateTargetType.HTMLElement) {
        actualX = left.getValue();
      }

      result.left = actualX;
    } else if (left.isCustomUnit()) {
      result.left = left.getValue();
    }

    if (right.isPixel()) {
      result.right = right.getNumbericValue().toString();
      if (target === AnimateTargetType.HTMLElement) {
        result.right += UnitType.Pixel;
      }
    } else if (right.isPercent()) {
      let actualY = (referHeight * (right.getNumbericValue() / 100)).toString();

      if (target === AnimateTargetType.HTMLElement) {
        actualY = right.getValue();
      }

      result.right = actualY;
    } else if (right.isCustomUnit()) {
      result.right = right.getValue();
    }

    console.log(`toActualSzie [${size}] => `, result);

    return result;
  }
}
