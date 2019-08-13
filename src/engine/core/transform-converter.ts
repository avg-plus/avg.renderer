import { AVGMeasurementUnit, UnitType } from "./measurement-unit";
import { GameWorld } from "./graphics/world";

export class TransformConverter {
  static toActual(vec: AVGMeasurementUnit | string) {
    const values = [];

    let unit: AVGMeasurementUnit;
    if (typeof vec === "string") {
      unit = AVGMeasurementUnit.fromString(vec);
    }

    const left = unit.getLeft();
    const right = unit.getRight();

    // 把单位换算为世界坐标
    if (left.isPixel()) {
      values.push(left.getNumbericValue() + UnitType.Pixel);
    } else if (left.isPercent()) {
      const actualX = GameWorld.worldWidth * (left.getNumbericValue() / 100);
      values.push(actualX + UnitType.Pixel);
    } else {
      values.push(left.getValue());
    }

    if (right.isPixel()) {
      values.push(right.getNumbericValue() + UnitType.Pixel);
    } else if (right.isPercent()) {
      const actualY = GameWorld.worldHeight * (right.getNumbericValue() / 100);
      values.push(actualY + UnitType.Pixel);
    } else {
      values.push(right.getValue());
    }

    return values;
  }
}
