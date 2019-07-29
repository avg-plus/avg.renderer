import * as PIXI from "pixi.js";
import * as ExtraFilters from "pixi-filters";
import { FilterBase } from "./filter-base";

class OutlineFilter extends FilterBase {
  name: "OutlineFilter";

  public instance() {
    return new ExtraFilters.OutlineFilter();
  }

  public validate(folder) {
    // this.padding = this.thickness + 4;
    // folder.add(this, 'thickness', 0, 10).onChange((value) => {
    //     this.padding = value + 4;
    // });
    // folder.addColor(this, 'color');
  }
}

export default new OutlineFilter();
