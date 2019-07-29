import * as PIXI from "pixi.js";
import * as ExtraFilters from "pixi-filters";
import { FilterBase } from "./filter-base";

class NoiseFilter extends FilterBase {
  name: "NoiseFilter";

  public instance() {
    return new PIXI.filters.NoiseFilter();
  }

  public validate(folder) {
    folder.add(this, "noise", 0, 1);
    folder.add(this, "seed", 0.01, 0.99);
  }
}

export default new NoiseFilter();
