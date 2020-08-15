import { ResourcePath } from "engine/core/resource";
import { GameResource } from "./../resource";
import * as PIXI from "pixi.js";
import * as ExtraFilters from "pixi-filters";
// import * as filters from "./filters";

import { Sprite } from "./sprite";
import { ResourceManager } from "../resource-manager";
import { SpriteFilter } from "engine/data/sprite-renderer";
import { FilterBase } from "./filters/filter-base";

// export enum FilterType {
//   BlurFilter = "blur",
//   AdjustmentFilter = "adjustment"
// }

export class SpriteFilterObject {
  constructor(
    public type: string,
    public instance: PIXI.Filter,
    public data: any
  ) {}
}

export class SpriteFilters {
  // private filters = new Map<string, SpriteFilterObject>();
  private filters: SpriteFilterObject[] = [];
  private sprite: Sprite;

  constructor(sprite: Sprite) {
    this.sprite = sprite;
  }

  public getFilter(type: string) {
    return this.filters.find(v => {
      return v.type === type;
    });
  }

  public clearFilters() {
    this.filters = [];
    this.render();
  }

  public createFilter(type: string, data: any) {}

  /**
   * 设置滤镜参数
   *
   * @param {FilterType} type
   * @param {*} data
   * @memberof SpriteFilters
   */
  public setFilter(type: string, data: any) {
    let filterObject = this.getFilter(type);
    if (!filterObject) {
      // 动态加载滤镜
      const filter = require("./filters/" + type).default as FilterBase;

      // 处理特殊参数，部分滤镜需要mapTexture
      let dmap = null;
      if (data && data.map) {
        dmap = GameResource.getPath(ResourcePath.DMaps, data.map);
      }

      const pixiFilterInstance = filter.instance(this.sprite, dmap);
      pixiFilterInstance.enabled = true;

      // 创建滤镜对象
      filterObject = new SpriteFilterObject(type, pixiFilterInstance, data);

      // 添加滤镜
      this.filters.push(filterObject);
    }

    filterObject.data = data;
    Object.assign(filterObject.instance, filterObject.data);

    return filterObject;
  }

  public render() {
    this.sprite.filters = this.filters.map(v => {
      if (v.instance.enabled) {
        return v.instance;
      }
    });
  }
}
