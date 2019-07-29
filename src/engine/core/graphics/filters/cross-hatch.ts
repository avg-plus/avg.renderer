import * as PIXI from "pixi.js";
import * as ExtraFilters from "pixi-filters";
import { FilterBase } from "./filter-base";

class CrossHatchFilter extends FilterBase {
  name: "CrossHatchFilter";

  public instance() {
    return new ExtraFilters.CrossHatchFilter();
  }
}

export default new CrossHatchFilter();
