import * as PIXI from "pixi.js";
import * as ExtraFilters from "pixi-filters";
import { FilterBase } from "./filter-base";

class TiltShiftFilter extends FilterBase {
  name: "TiltShiftFilter";

  public instance() {
    return new ExtraFilters.TiltShiftFilter();
  }

  public validate(folder) {}
}

export default new TiltShiftFilter();
