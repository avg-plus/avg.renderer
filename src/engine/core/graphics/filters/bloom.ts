import * as PIXI from "pixi.js";
import * as ExtraFilters from "pixi-filters";
import { FilterBase } from "./filter-base";

class BloomFilter extends FilterBase {
  name: "BloomFilter";

  public instance() {
    return new ExtraFilters.BloomFilter();
  }

  public validate(folder) {
    folder.add(this, "blur", 0, 20);
    folder.add(this, "blurX", 0, 20);
    folder.add(this, "blurY", 0, 20);
  }
}

export default new BloomFilter();
