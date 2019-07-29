import * as PIXI from "pixi.js";
import * as ExtraFilters from "pixi-filters";
import { FilterBase } from "./filter-base";

class MultiColorReplaceFilter extends FilterBase {
  name: "MultiColorReplaceFilter";

  public instance() {
    return new ExtraFilters.MultiColorReplaceFilter([[3238359, 16711680], [938417, 65280], [1464209, 16776960]], 2);
  }

  public validate(folder) {
    // const refresh = this.refresh.bind(this);
    // folder.addColor(replacements[0], '0').name('original 0').onChange(refresh);
    // folder.addColor(replacements[0], '1').name('target 0').onChange(refresh);
    // folder.addColor(replacements[1], '0').name('original 1').onChange(refresh);
    // folder.addColor(replacements[1], '1').name('target 1').onChange(refresh);
    // folder.addColor(replacements[2], '0').name('original 2').onChange(refresh);
    // folder.addColor(replacements[2], '1').name('target 2').onChange(refresh);
    // folder.add(this, 'epsilon', 0, 1);
  }
}

export default new MultiColorReplaceFilter();
