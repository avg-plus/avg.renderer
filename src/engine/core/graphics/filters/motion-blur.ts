import * as PIXI from "pixi.js";
import * as ExtraFilters from "pixi-filters";
import { FilterBase } from "./filter-base";

class MotionBlurFilter extends FilterBase {
  name: "MotionBlurFilter";

  public instance() {
    const filter = new ExtraFilters.MotionBlurFilter([0, 0], 0);

    Object.defineProperty(filter, "velocityX", {
      get: function() {
        console.log("velocityX", this);

        return this.velocity.x;
      },
      set: function(value) {
        this.velocity.x = value;

        console.log(value);
      }
    });

    Object.defineProperty(filter, "velocityY", {
      get: function() {
        return this.velocity.y;
      },
      set: function(value) {
        this.velocity.y = value;
      }
    });

    return filter;
  }

  public validate(folder) {
    // folder.add(filter.velocity, 'x', -90, 90).name('velocity.x');
    // folder.add(filter.velocity, 'y', -90, 90).name('velocity.y');
    // folder.add(filter, 'kernelSize', [3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25]).name('kernelSize');
    // folder.add(filter, 'offset', -150, 150).name('offset');
  }
}

export default new MotionBlurFilter();
