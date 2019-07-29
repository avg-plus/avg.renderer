import * as PIXI from "pixi.js";
import { FilterBase } from "./filter-base";

class AVGAlphaFilter extends FilterBase {
  name: "透明度";

  public instance() {
    return new PIXI.filters.AlphaFilter();
  }

  public validate(folder) {
    folder.add(this, "alpha", 0, 1);
  }
}

export default new AVGAlphaFilter();
