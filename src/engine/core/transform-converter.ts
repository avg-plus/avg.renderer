import { AVGMeasurementUnit } from "./measurement-unit";
import { GameWorld } from "./graphics/world";

export class TransformConverter {
  static toActual(vec: AVGMeasurementUnit | string) {
    const values = [];

    let unit;
    if (typeof vec === "string") {
      unit = AVGMeasurementUnit.fromString(vec);
    }

    const left = unit.getLeft();
    const right = unit.getRight();

    // 把单位换算为世界坐标
    if (left.isPixel() || left.isCustomUnit()) {
      values.push(left.getNumbericValue());
    } else if (left.isPercent()) {
      const actualX = GameWorld.worldWidth * (left.getNumbericValue() / 100);
      values.push(actualX);
    }

    if (right.isPixel() || right.isCustomUnit()) {
      values.push(right.getNumbericValue());
    } else if (right.isPercent()) {
      const actualY = GameWorld.worldHeight * (right.getNumbericValue() / 100);
      values.push(actualY);
    }

    return values;
  }

  static toActualHeight(unit: string) {}
}
