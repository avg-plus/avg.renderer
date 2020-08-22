import { Sprite } from "../sprite";
import { ResourcePath, GameResource } from "engine/core/resource";
import { Filter } from "pixi.js";

export interface IFilterArgs {}

export abstract class FilterBase {
  public abstract instance(parent?: Sprite, data?: IFilterArgs): PIXI.Filter;

  public bindFileField(file: string, resourcePath: ResourcePath) {
    return GameResource.getPath(resourcePath, file);
  }

  public bindGetSet<T extends PIXI.Filter>(
    property: string,
    filter: T,
    getter: (obj: T) => number,
    setter: (obj: T, value: number) => void
  ) {
    Object.defineProperty(filter, property, {
      get: function() {
        return getter(this);
      },
      set: function(value) {
        setter(this, value);
      }
    });
  }
}
