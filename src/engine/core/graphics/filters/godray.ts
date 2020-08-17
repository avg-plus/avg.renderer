// import * as PIXI from "pixi.js";
import * as ExtraFilters from "pixi-filters";
import { FilterBase } from "./filter-base";

class GodrayFilter extends FilterBase {
  name: "GodrayFilter";

  public instance() {
    const instance =  new ExtraFilters.GodrayFilter();
    instance.parallel = false;

    return instance;
  }

  public validate(folder) {
    // folder.add(this, 'animating').name('(animating)');
    // folder.add(this, 'time', 0, 1);
    // folder.add(this, 'gain', 0, 1);
    // folder.add(this, 'lacunarity', 0, 5);
    // folder.add(this, 'parallel');
    // folder.add(this, 'angle', -60, 60);
    // folder.add(this.center, 'x', -100, app.initWidth + 100).name('center.x');
    // folder.add(this.center, 'y', -1000, -100).name('center.y');
  }
}

export default new GodrayFilter();
