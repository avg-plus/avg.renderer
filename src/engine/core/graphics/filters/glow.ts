import * as PIXI from "pixi.js";
import * as ExtraFilters from "pixi-filters";
import { FilterBase } from "./filter-base";

class GlowFilter extends FilterBase {
  name: "GlowFilter";

  public instance() {
    return new ExtraFilters.GlowFilter();
  }

  public validate(folder) {
    folder.add(this, "innerStrength", 0, 20);
    folder.add(this, "outerStrength", 0, 20);
    folder.add(this, "distance", 10, 20);
    folder.addColor(this, "color");
  }
}

export default new GlowFilter();
