import * as PIXI from "pixi.js";
import * as ExtraFilters from "pixi-filters";
import { FilterBase } from "./filter-base";
import { Sprite } from "../sprite";

class DisplacementFilter extends FilterBase {
  name: "DisplacementFilter";
  //   args: [displacementSprite, this.initWidth, this.initHeight],
  public instance(displacementSprite: PIXI.Sprite) {
    if (!displacementSprite) {
      return null;
    }
    displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
    const filter = new PIXI.filters.DisplacementFilter(displacementSprite, 1);

    Object.defineProperty(filter, "px", {
      get: function() {
        console.log("get px: ", displacementSprite.position.x);

        return displacementSprite.position.x;
      },
      set: function(value) {
        console.log("set px: ", value);

        displacementSprite.position.x = value;
      }
    });

    Object.defineProperty(filter, "py", {
      get: function() {
        return displacementSprite.position.y;
      },
      set: function(value) {
        displacementSprite.position.y = value;
      }
    });

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
