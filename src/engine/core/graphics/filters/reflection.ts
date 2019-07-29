import * as PIXI from "pixi.js";
import * as ExtraFilters from "pixi-filters";
import { FilterBase } from "./filter-base";

class ReflectionFilter extends FilterBase {
  name: "ReflectionFilter";

  public instance() {
    return new ExtraFilters.ReflectionFilter();
  }

  public validate(folder) {}
}

export default new ReflectionFilter();
