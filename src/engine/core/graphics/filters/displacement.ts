import { GameWorld } from "./../world";
import * as PIXI from "pixi.js";
import { FilterBase, IFilterArgs } from "./filter-base";
import { Sprite } from "../sprite";
import { ResourcePath, GameResource } from "engine/core/resource";
import { AVGNativePath } from "engine/core/native-modules/avg-native-path";

interface IDisplacementFilterArgs extends IFilterArgs {
  dmap: {
    file: string;
    scaleX?: number;
    scaleY?: number;
  };
  animate?: boolean;
  onUpdate?: (dmapSprite: PIXI.Sprite) => void;
}

class DisplacementFilter extends FilterBase {
  name: "DisplacementFilter";
  public instance(parent: Sprite, args: IDisplacementFilterArgs) {
    if (!args || !args.dmap || !args.dmap.file) {
      const defulatMap = AVGNativePath.join(
        GameResource.getEngineDataRoot(),
        "d-maps/default-dmap.jpg"
      );

      args = {
        dmap: {
          file: defulatMap
        }
      };
    } else {
      args.dmap.file = super.bindFileField(args.dmap.file, ResourcePath.DMaps);
    }

    const texture = PIXI.Texture.from(args.dmap.file);
    const displacementSprite = new PIXI.Sprite(texture);

    const filter = new PIXI.filters.DisplacementFilter(displacementSprite);
    filter.scale.x = args.dmap.scaleX || 10;
    filter.scale.y = args.dmap.scaleY || 20;

    displacementSprite.position = parent.position;
    displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;

    parent.addChild(displacementSprite);

    // 绑定属性
    super.bindGetSet<PIXI.filters.DisplacementFilter>(
      "scaleX",
      filter,
      obj => {
        return obj.scale.x;
      },
      (obj, value) => {
        obj.scale.x = value;
      }
    );

    super.bindGetSet<PIXI.filters.DisplacementFilter>(
      "scaleY",
      filter,
      obj => {
        return obj.scale.y;
      },
      (obj, value) => {
        obj.scale.y = value;
      }
    );

    if (args.animate) {
      // 是否自动动画
      GameWorld.app.ticker.add(() => {
        if (args.onUpdate) {
          args.onUpdate(displacementSprite);
          parent.spriteFilters.render()
        } else {
          // 默认动画
          displacementSprite.x += 1;
        }
      });
    }

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
