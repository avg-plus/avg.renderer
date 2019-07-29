import * as PIXI from "pixi.js";
import * as ExtraFilters from "pixi-filters";
import { FilterBase } from "./filter-base";
import { Sprite } from "../sprite";

class DisplacementFilter extends FilterBase {
  name: "DisplacementFilter";
  //   args: [displacementSprite, this.initWidth, this.initHeight],
  public instance(sprite: Sprite) {
    sprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
    const filter = new PIXI.filters.DisplacementFilter(sprite, 1);

    Object.defineProperty(filter, "scaleX", {
      get: function() {
        return this.scale.x;
      },
      set: function(value) {
        this.scale.x = value;
      }
    });

    Object.defineProperty(filter, "scaleY", {
      get: function() {
        return this.scale.y;
      },
      set: function(value) {
        this.scale.y = value;
      }
    });

    return filter;
  }

  public validate(folder) {
    // this.scale.x = 50;
    // this.scale.y = 50;
    // folder.add(this.scale, "x", 1, 200).name("scale.x");
    // folder.add(this.scale, "y", 1, 200).name("scale.y");
    // app.events.on("resize", (width, height) => {
    //   displacementSprite.width = width;
    //   displacementSprite.height = height;
    // });
  }
}

export default new DisplacementFilter();
