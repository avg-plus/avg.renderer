import * as PIXI from "pixi.js";
import * as ExtraFilters from "pixi-filters";
import { FilterBase } from "./filter-base";

class BulgePinchFilter extends FilterBase {
  name: "BulgePinchFilter";

  public instance() {
    return new ExtraFilters.BulgePinchFilter();
  }

  public validate(folder) {
    folder.add(this, "radius", 0, 1000);
    folder.add(this, "strength", -1, 1);
    // folder.add(this.center, '0', 0, 1).name('center.x');
    // folder.add(this.center, '1', 0, 1).name('center.y');
  }
}

export default new BulgePinchFilter();
