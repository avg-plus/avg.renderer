import * as PIXI from "pixi.js";
import * as ExtraFilters from "pixi-filters";
import { FilterBase } from "./filter-base";

class BevelFilter extends FilterBase {
  name: "BevelFilter";

  public instance() {
    return new ExtraFilters.BevelFilter();
  }

  public validate(folder) {
    folder.add(this, "rotation", 0, 360);
    folder.add(this, "thickness", 0, 5);
    folder.addColor(this, "lightColor");
    folder.add(this, "lightAlpha", 0, 1);
    folder.addColor(this, "shadowColor");
    folder.add(this, "shadowAlpha", 0, 1);
  }
}

export default new BevelFilter();
