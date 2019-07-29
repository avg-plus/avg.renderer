import * as PIXI from "pixi.js";
import * as ExtraFilters from "pixi-filters";
import { FilterBase } from "./filter-base";

class DotFilter extends FilterBase {
  name: "DotFilter";

  public instance() {
    return new ExtraFilters.DotFilter();
  }

  public validate(folder) {
    folder.add(this, "scale", 0.3, 1);
    folder.add(this, "angle", 0, 5);
  }
}

export default new DotFilter();
