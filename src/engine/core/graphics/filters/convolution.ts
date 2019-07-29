import * as PIXI from "pixi.js";
import * as ExtraFilters from "pixi-filters";
import { FilterBase } from "./filter-base";

class ConvolutionFilter extends FilterBase {
  name: "ConvolutionFilter";

  public instance() {
    return new ExtraFilters.ConvolutionFilter([0, 0.5, 0, 0.5, 1, 0.5, 0, 0.5, 0], 300, 300);
  }

  public validate(folder) {
    folder.add(this, "width", 0, 500);
    folder.add(this, "height", 0, 500);
    // for (let i = 0; i < this.matrix.length; i++) {
    //     folder.add(this.matrix, i, 0, 1, 0.01).name(`matrix[${i}]`);
    // }
  }
}

export default new ConvolutionFilter();
