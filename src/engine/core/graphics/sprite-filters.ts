import * as PIXI from "pixi.js";
import * as ExtraFilters from "pixi-filters";

import { Sprite } from "./sprite";

export enum FilterType {
  BlurFilter = "BlurFilter",
  AdjustmentFilter = "AdjustmentFilter"
}

export class SpriteFilterObject {
  public instance: PIXI.Filter;
  public data: any = {};
}

export class SpriteFilters {
  private filters = new Map<FilterType, SpriteFilterObject>();
  private sprite: Sprite;

  constructor(sprite: Sprite) {
    this.sprite = sprite;
  }

  /**
   * 设置滤镜参数
   *
   * @param {FilterType} type
   * @param {*} data
   * @memberof SpriteFilters
   */
  public setFilter(type: FilterType, data: any) {
    let filterObject = this.filters.get(type);
    if (!filterObject) {
      filterObject = new SpriteFilterObject();
      filterObject.data = data;
    }

    if (!filterObject.instance) {
      switch (type) {
        case FilterType.BlurFilter: {
          filterObject.instance = new PIXI.filters.BlurFilter();
          break;
        }
        case FilterType.AdjustmentFilter: {
          filterObject.instance = <any>new ExtraFilters.AdjustmentFilter();
          break;
        }
      }

      filterObject.instance.enabled = true;
    }

    Object.assign(filterObject.instance, filterObject.data);

    this.filters.set(type, filterObject);

    this.sprite.filters = this.getFilterList();
  }

  private getFilterList() {
    const list = [];
    this.filters.forEach((v, k) => {
      if (!v.instance.enabled) return;

      list.push(v.instance);
    });

    return list;
  }
}
