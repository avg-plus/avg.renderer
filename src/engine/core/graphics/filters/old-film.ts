import * as PIXI from "pixi.js";
import * as ExtraFilters from "pixi-filters";
import { FilterBase } from "./filter-base";

class OldFilmFilter extends FilterBase {
  name: "老电影";

  public instance() {
    return new ExtraFilters.OldFilmFilter();
  }

  public validate(folder) {
    // app.events.on("animate", function() {
    //   filter.seed = Math.random();
    // });
    // folder.add(this, "sepia", 0, 1);
    // folder.add(this, "noise", 0, 1);
    // folder.add(this, "noiseSize", 1, 10);
    // folder.add(this, "scratch", -1, 1);
    // folder.add(this, "scratchDensity", 0, 1);
    // folder.add(this, "scratchWidth", 1, 20);
    // folder.add(this, "vignetting", 0, 1);
    // folder.add(this, "vignettingAlpha", 0, 1);
    // folder.add(this, "vignettingBlur", 0, 1);
  }
}

export default new OldFilmFilter();
