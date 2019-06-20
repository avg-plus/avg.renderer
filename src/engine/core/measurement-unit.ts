import { EngineUtils } from "./engine-utils";

export enum UnitType {
  Percent = "%",
  Pixel = "px",
  Custom = ""
}

// Match Rules:
// '(33,60)', '(42%,50%)', '(10%,50px)', '(42px,50px)', '(center, top)' ...
const VectorRegex = /^(\(([+-]?[0-9]*[.]?[0-9]+(?:%|px)?|(?:[a-z]+)),([+-]?[0-9]*[.]?[0-9]+(?:%|px)?|(?:[a-z]+))\))$/;

// Match Rules:
// '96', '42%', '35px', 'center' ..
const ScalarRegex = /^(?:([+-]?[0-9]*[.]?[0-9]+)(%|px)?|^([a-z]+)$)$/;

export class MeasurementUnitPart {
  private value: string = "";
  private unit: UnitType = UnitType.Percent;

  constructor(value: string) {
    if (!value) {
      return null;
    }
    const matches = value.match(ScalarRegex);
    if (!EngineUtils.isNullOrUndefined(matches)) {
      // Is custom
      if (matches[3]) {
        this.value = matches[3];
        this.unit = UnitType.Custom;
      } else {
        this.value = matches[1];
        switch (matches[2]) {
          case "%":
            this.unit = UnitType.Percent;
            break;
          case "px":
            this.unit = UnitType.Percent;
            break;
          default:
            this.unit = UnitType.Custom;
            break;
        }

        // this.unit = matches[2] === "%" ? UnitType.Percent : UnitType.Pixel;
      }
    }
  }

  public getNumbericValue() {
    return Number.parseInt(this.value);
  }

  public getValue() {
    return this.value + this.unit;
  }

  public isPercent() {
    return this.unit === UnitType.Percent;
  }

  public isPixel() {
    return this.unit === UnitType.Pixel;
  }

  public isCustomUnit() {
    return !this.isPercent() && !this.isPixel();
  }
}

export class AVGMeasurementUnit {
  private left: MeasurementUnitPart;
  private right: MeasurementUnitPart;

  constructor(left: string, right?: string) {
    if (left) {
      left = left || left.trim();
      this.left = new MeasurementUnitPart(left);
    }

    if (right) {
      right = right.trim();
      this.right = new MeasurementUnitPart(right);
    }
  }

  public static fromString(value: string) {
    if (!value) {
      return null;
    }

    value = value.replace(" ", "");

    let matches = value.match(VectorRegex);
    if (!EngineUtils.isNullOrUndefined(matches)) {
      return new AVGMeasurementUnit(matches[2], matches[3]);
    } else {
      if (ScalarRegex.test(value)) {
        return new AVGMeasurementUnit(value);
      }
    }

    return null;
  }

  public static isValidPair(value: string) {
    return this.fromString(value) !== null;
  }

  public isPairUnit() {
    return this.left && this.right;
  }

  public getValue() {
    if (this.isPairUnit()) {
      return `(${this.left.getValue()},${this.right.getValue()})`;
    }

    return this.left.getValue();
  }

  public getLeft() {
    return this.left;
  }

  public getRight() {
    return this.right;
  }
}
