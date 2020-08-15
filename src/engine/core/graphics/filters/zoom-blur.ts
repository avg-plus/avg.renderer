import * as PIXI from "pixi.js";
import * as ExtraFilters from "pixi-filters";
import { FilterBase } from "./filter-base";
import { Sprite } from "../sprite";

class ZoomBlurFilter extends FilterBase {
  name: "ZoomBlurFilter";

  public instance(parent: Sprite) {
    return new ExtraFilters.ZoomBlurFilter(0, [
      parent.width / 2,
      parent.height / 2
    ]);
  }

  public validate(folder) {
    // folder.add(this, 'strength', 0.01, 0.5);
    // folder.add(this.center, '0', 0, app.initWidth).name('center.x');
    // folder.add(this.center, '1', 0, app.initHeight).name('center.y');
    // folder.add(this, 'innerRadius', 0, app.initWidth / 2);
  }
}

export default new ZoomBlurFilter();
