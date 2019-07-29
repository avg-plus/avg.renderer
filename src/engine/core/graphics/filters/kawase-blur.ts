import * as PIXI from "pixi.js";
import * as ExtraFilters from "pixi-filters";
import { FilterBase } from "./filter-base";

class KawaseBlurFilter extends FilterBase {
  name: "KawaseBlurFilter";

  public instance() {
    return new ExtraFilters.KawaseBlurFilter();
  }

  public validate(folder) {
    // folder.add(this, "blur", 0, 20);
    // folder.add(this, "quality", 1, 20);
    // folder.add(this.pixelSize, "x", 0, 10).name("pixelSize.x");
    // folder.add(this.pixelSize, "y", 0, 10).name("pixelSize.y");
  }
}

export default new KawaseBlurFilter();
