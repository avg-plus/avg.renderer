import * as PIXI from "pixi.js";
import * as ExtraFilters from "pixi-filters";
import { FilterBase } from "./filter-base";

class TwistFilter extends FilterBase {
  name: "TwistFilter";

  public instance() {
    return new ExtraFilters.TwistFilter();
  }

  public validate(folder) {
    // this.offset = new PIXI.Point(app.initWidth / 2, app.initHeight / 2);
    // folder.add(this, "angle", -10, 10);
    // folder.add(this, "radius", 0, app.initWidth);
    // folder.add(this.offset, "x", 0, app.initWidth);
    // folder.add(this.offset, "y", 0, app.initHeight);
  }
}

export default new TwistFilter();
