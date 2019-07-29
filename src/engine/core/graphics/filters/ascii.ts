import * as PIXI from "pixi.js";
import * as ExtraFilters from "pixi-filters";
import { FilterBase } from "./filter-base";

class AsciiFilter extends FilterBase {
  name: "透明度";

  public instance() {
    return new ExtraFilters.AsciiFilter();
  }

  public validate(folder) {
    folder.add(this, "size", 2, 20);
  }
}

export default new AsciiFilter();
