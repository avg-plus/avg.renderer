import * as PIXI from "pixi.js";
import * as ExtraFilters from "pixi-filters";
import { FilterBase } from "./filter-base";

class ZoomBlurFilter extends FilterBase {
  name: "ZoomBlurFilter";

  public instance() {
    return new ExtraFilters.ZoomBlurFilter();
  }

  public validate(folder) {
    // folder.add(this, 'strength', 0.01, 0.5);
    // folder.add(this.center, '0', 0, app.initWidth).name('center.x');
    // folder.add(this.center, '1', 0, app.initHeight).name('center.y');
    // folder.add(this, 'innerRadius', 0, app.initWidth / 2);
  }
}

export default new ZoomBlurFilter();
