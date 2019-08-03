import { GameWorld } from "./../world";
import * as PIXI from "pixi.js";
import { FilterBase } from "./filter-base";
import { Sprite } from "../sprite";

class DisplacementFilter extends FilterBase {
  name: "DisplacementFilter";
  //   args: [displacementSprite, this.initWidth, this.initHeight],
  public instance(parent: Sprite, mapFile: string) {
    const texture = PIXI.Texture.from(mapFile);
    const displacementSprite = new PIXI.Sprite(texture);
    if (!displacementSprite) {
      return null;
    }
    displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;

    const filter = new PIXI.filters.DisplacementFilter(displacementSprite);
    // filter.padding = 10;

    displacementSprite.anchor.set(0.5, 0.5);
    // displacementSprite.width = 1000000;
    // displacementSprite.tileScale.x = 10;
    // GameWorld.app.stage.addChild(displacementSprite);
    parent.addChild(displacementSprite);

    Object.defineProperty(filter, "angle", {
      get: function() {
        return displacementSprite.angle;
      },
      set: function(value) {
        displacementSprite.angle = value;
      }
    });

    // GameWorld.app.ticker.add(() => {
    //   // Offset the sprite position to make vFilterCoord update to larger value. Repeat wrapping makes sure there's still pixels on the coordinates.
    //   // displacementSprite.angle += 2;
    //   // Reset x to 0 when it's over width to keep values from going to very huge numbers.
    //   displacementSprite.tilePosition.x += 1;
    //   // displacementSprite.tileTransform.position.x += 1;
    //   // displacementSprite.y += 1;
    // });

    // let count = 0;

    // GameWorld.app.ticker.add(() => {
    //   count += 0.005;

    //   displacementSprite.tileScale.x = 2 + Math.sin(count);
    //   displacementSprite.tileScale.y = 2 + Math.cos(count);

    //   displacementSprite.tilePosition.x += 1;
    //   displacementSprite.tilePosition.y += 1;
    // });

    // setInterval(() => {
    //   displacementSprite.alpha = 1;
    //   displacementSprite.tileScale.x += 0.01;
    //   displacementSprite.tileScale.y += 0.01;

    //   console.log(displacementSprite);
    // }, 10);

    // Object.defineProperty(filter, "px", {
    //   get: function() {
    //     console.log("get px: ", displacementSprite.position.x);

    //     return displacementSprite.tilePosition.x;
    //   },
    //   set: function(value) {
    //     console.log("set px: ", value);

    //     displacementSprite.tilePosition.x = value;
    //   }
    // });

    // Object.defineProperty(filter, "py", {
    //   get: function() {
    //     return displacementSprite.tilePosition.y;
    //   },
    //   set: function(value) {
    //     displacementSprite.tilePosition.y = value;
    //   }
    // });

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
