import * as PIXI from "pixi.js";
import * as ExtraFilters from "pixi-filters";
import { FilterBase } from "./filter-base";

class ColorReplaceFilter extends FilterBase {
  name: "ColorReplaceFilter";

  public instance() {
    return new ExtraFilters.ColorReplaceFilter();
  }

  public validate(folder) {
    folder.addColor(this, "originalColor");
    folder.addColor(this, "newColor");
    folder.add(this, "epsilon", 0, 1);
  }
}

export default new ColorReplaceFilter();
