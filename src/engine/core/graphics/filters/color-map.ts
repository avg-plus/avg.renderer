import * as PIXI from "pixi.js";
import * as ExtraFilters from "pixi-filters";
import { FilterBase } from "./filter-base";

class ColorMapFilter extends FilterBase {
  name: "ColorMapFilter";

  public instance() {
    return new ExtraFilters.ColorMapFilter();
  }

  public validate(folder) {
    // folder.add(this, 'mix', 0, 1);
    // folder.add(this, 'nearest');
    // this._noop = function(){};
    // folder.add(this, '_noop').name('<img src="./images/colormap.png" width="220" height="13">');
  }
}

export default new ColorMapFilter();
