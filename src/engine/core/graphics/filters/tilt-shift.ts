import * as PIXI from "pixi.js";
import * as ExtraFilters from "pixi-filters";
import { FilterBase, IFilterArgs } from "./filter-base";
import { Sprite } from "../sprite";

interface ITiltShiftFilterArgs extends IFilterArgs {
  blur: number;
  end: PIXI.Point;
  gradientBlur: number;
  start: PIXI.Point;
}

class TiltShiftFilter extends FilterBase {
  name: "TiltShiftFilter";

  public instance(parent: Sprite, args: ITiltShiftFilterArgs) {
    const data = Object.assign(
      {},
      {
        blur: 100,
        gradientBlur: 500,
        start: null,
        end:null,
      },
      args
    );

    return new ExtraFilters.TiltShiftFilter(
      data.blur,
      data.gradientBlur,
      data.start,
      data.end
    );
  }

  public validate(folder) {}
}

export default new TiltShiftFilter();
