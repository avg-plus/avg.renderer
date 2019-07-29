import * as PIXI from "pixi.js";
import * as ExtraFilters from "pixi-filters";
import { FilterBase } from "./filter-base";

class RGBSplitFilter extends FilterBase {
  name: "RGBSplitFilter";

  public instance() {
    return new ExtraFilters.RGBSplitFilter();
  }

  public validate(folder) {}
}

export default new RGBSplitFilter();
