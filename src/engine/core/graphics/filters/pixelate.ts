import * as PIXI from "pixi.js";
import * as ExtraFilters from "pixi-filters";
import { FilterBase } from "./filter-base";

class PixelateFilter extends FilterBase {
  name: "PixelateFilter";

  public instance() {
    return new ExtraFilters.PixelateFilter();
  }

  public validate(folder) {
    // folder.add(this.size, '0', 4, 40).name('size.x');
    // folder.add(this.size, '1', 4, 40).name('size.y');
  }
}

export default new PixelateFilter();
