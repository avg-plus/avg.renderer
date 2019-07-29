import * as PIXI from "pixi.js";
import * as ExtraFilters from "pixi-filters";
import { FilterBase } from "./filter-base";

class EmbossFilter extends FilterBase {
  name: "EmbossFilter";

  public instance() {
    return new ExtraFilters.EmbossFilter();
  }

  public validate(folder) {
    folder.add(this, "strength", 0, 20);
  }
}

export default new EmbossFilter();
