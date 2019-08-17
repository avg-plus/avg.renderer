import { AVGMeasurementUnit, UnitType } from "./measurement-unit";
import { GameWorld } from "./graphics/world";

export class TransformConverter {
  /**
   * 把坐标/尺寸描述结构转换为实际的游戏屏幕坐标/尺寸
   *
   * @static
   * @param {(AVGMeasurementUnit | string)} position
   * @param {(AVGMeasurementUnit | string)} [referSize] 用于修正位置
   * @returns
   * @memberof TransformConverter
   */
  static toActual(position: AVGMeasurementUnit | string) {
    const values: number[] = [];

    let positionUnit: AVGMeasurementUnit;
    if (position && typeof position === "string") {
      positionUnit = AVGMeasurementUnit.fromString(position);
    }

    const left = positionUnit.getLeft();
    const right = positionUnit.getRight();

    // 把单位换算为世界坐标
    if (left.isPixel()) {
      values.push(left.getNumbericValue());
    } else if (left.isPercent()) {
      const actualX = GameWorld.worldWidth * (left.getNumbericValue() / 100);
      values.push(actualX);
    } else if (left.isCustomUnit()) {
      let value = 0;
      switch (left.getValue()) {
        case "center": // 计算居中位置
          value = GameWorld.worldWidth / 2;
          break;
        case "left":
          value = 0;
          break;
        case "right":
          value = GameWorld.worldWidth;
          break;
        default:
          value = 0;
          break;
      }

      values.push(value);
    }

    if (right.isPixel()) {
      values.push(right.getNumbericValue());
    } else if (right.isPercent()) {
      const actualY = GameWorld.worldHeight * (right.getNumbericValue() / 100);
      values.push(actualY);
    } else if (right.isCustomUnit()) {
      let value = 0;

      switch (right.getValue()) {
        case "center":
          value = GameWorld.worldHeight / 2;
          break;
        case "top":
          value = 0;
          break;
        case "bottom":
          value = GameWorld.worldHeight;
          break;
        default:
          value = 0;
          break;
      }

      values.push(value);
    }

    console.log(`toActual [${position}] => [${values}]`);

    return values;
  }
}
