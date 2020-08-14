import * as PIXI from "pixi.js";
import { FilterBase } from "./filter-base";

class BlurFilter extends FilterBase {
  name: "BlurFilter";

  public instance() {
    return new PIXI.filters.BlurFilter(0);
  }

  //   validate: folder => {
  //     folder.add(this, "blur", 0, 100);
  //     folder.add(this, "quality", 1, 10);
  //   }
}

export default new BlurFilter();
