import { Sprite } from "./sprite";

export function findFilter<T extends PIXI.Filter>(sprite: Sprite, filterName: string): T | undefined {
  const filter = sprite.filters.find(value => {
    return value.constructor.name === filterName;
  });

  return filter ? <T>filter : undefined;
}
