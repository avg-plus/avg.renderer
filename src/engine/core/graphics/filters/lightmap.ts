import * as PIXI from "pixi.js";
import * as ExtraFilters from "pixi-filters";
import { FilterBase } from "./filter-base";
import { Sprite } from "../sprite";

class SimpleLightmapFilter extends FilterBase {
  name: "SimpleLightmapFilter";

  public instance(sprite: Sprite) {
    return new ExtraFilters.SimpleLightmapFilter(PIXI.Loader.shared.resources.lightmap.texture, 0x666666);
  }

  public validate(folder) {
    folder.addColor(this, "color");
    folder.add(this, "alpha", 0, 1);
  }
}

export default new SimpleLightmapFilter();
