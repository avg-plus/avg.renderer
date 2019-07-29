import * as PIXI from "pixi.js";
import * as ExtraFilters from "pixi-filters";
import { FilterBase } from "./filter-base";

class ShockwaveFilter extends FilterBase {
  name: "RGBSplitFilter";

  public instance() {
    return new ExtraFilters.ShockwaveFilter();
  }

  public validate(folder) {}
}

export default new ShockwaveFilter();
