import * as PIXI from "pixi.js";
import * as ExtraFilters from "pixi-filters";
import { FilterBase } from "./filter-base";

class AdjustmentFilter extends FilterBase {
  // name: "调整图片";

  public instance() {
    return new ExtraFilters.AdjustmentFilter();
  }

  public validate(folder) {
    folder.add(this, "gamma", 0, 5);
    folder.add(this, "saturation", 0, 5);
    folder.add(this, "contrast", 0, 5);
    folder.add(this, "brightness", 0, 5);
    folder.add(this, "red", 0, 5);
    folder.add(this, "green", 0, 5);
    folder.add(this, "blue", 0, 5);
    folder.add(this, "alpha", 0, 1);
  }
}

export default new AdjustmentFilter();
