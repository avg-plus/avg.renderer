import { ResourcePath } from "engine/core/resource";
import { GameResource } from "./../resource";
import * as PIXI from "pixi.js";
import * as ExtraFilters from "pixi-filters";
// import * as filters from "./filters";

import { Sprite } from "./sprite";
import { ResourceManager } from "../resource-manager";

// export enum FilterType {
//   BlurFilter = "blur",
//   AdjustmentFilter = "adjustment"
// }

export class SpriteFilterObject {
  public instance: PIXI.Filter;
  public data: any = {};
}

export class SpriteFilters {
  private filters = new Map<string, SpriteFilterObject>();
  private sprite: Sprite;

  constructor(sprite: Sprite) {
    this.sprite = sprite;
  }

  public getFilter(type: string) {
    return this.filters.get(type);
  }

  public clearFilters() {
    this.filters.clear();
    this.sprite.filters = this.getFilterList();
  }
  /**
   * 设置滤镜参数
   *
   * @param {FilterType} type
   * @param {*} data
   * @memberof SpriteFilters
   */
  public setFilter(type: string, data: any) {

    console.log("setFilter: ", type, data);

    let filterObject = this.filters.get(type);
    if (!filterObject) {
      filterObject = new SpriteFilterObject();
    }

    if (!filterObject.instance) {
      const filter = require("./filters/" + type).default;

      // 处理特殊参数，部分滤镜需要mapTexture


      let dmap = null;
      if (data && data.map) {
        dmap = GameResource.getPath(ResourcePath.DMaps, data.map);
      }

      filterObject.instance = filter.instance(this.sprite, dmap);
      filterObject.instance.enabled = true;
    }

    filterObject.data = data;
    Object.assign(filterObject.instance, filterObject.data);

    this.filters.set(type, filterObject);
    this.sprite.filters = this.getFilterList();

    return filterObject;
  }

  public getFilterList() {
    let list = [];
    this.filters.forEach((v, k) => {
      if (!v.instance.enabled) return;

      list.push(v.instance);
    });

    return list;
  }
}
