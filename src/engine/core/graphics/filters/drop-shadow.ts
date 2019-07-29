import * as PIXI from "pixi.js";
import * as ExtraFilters from "pixi-filters";
import { FilterBase } from "./filter-base";

class DropShadowFilter extends FilterBase {
  name: "DropShadowFilter";

  public instance() {
    return new ExtraFilters.DropShadowFilter();
  }

  public validate(folder) {
    folder.add(this, "blur", 0, 20);
    folder.add(this, "quality", 0, 20);
    folder.add(this, "alpha", 0, 1);
    folder.add(this, "distance", 0, 50);
    folder.add(this, "rotation", 0, 360);
    folder.addColor(this, "color");
    folder.add(this, "shadowOnly");
  }
}

export default new DropShadowFilter();
