import { AVGScriptUnit } from "../scripting/script-unit";
import { AVGData } from "../data/avg-data";

export function isObject(item) {
  return item && typeof item === "object" && !Array.isArray(item);
}

export function isNullOrUndefined(obj) {
  return obj === null || obj === undefined;
}

export function mergeDeep(target, source) {
  let output = Object.assign({}, target);
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target)) Object.assign(output, { [key]: source[key] });
        else output[key] = mergeDeep(target[key], source[key]);
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
}

export function paramCompatible<T extends AVGScriptUnit, U extends AVGData>(
  model: T,
  options?: any,
  keyField?: { field: string; value: any }
) {
  let data = <U>model.data;
  if (keyField) {
    data[keyField.field] = keyField.value;
  }

  if (options && typeof options === "object") {
    Object.assign(model.data, model.data, options);
  }

  return model;
}

export function shuffle<T>(ary: T[]) {
  const r = [...ary];
  let i = r.length;
  while (i) {
    const j = Math.floor(Math.random() * i--);
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
}

export function sleep(ms: number) {
  return new Promise<void>(res => setTimeout(res, ms));
}

export function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomIn<T>(arr: T[]) {
  const min = Math.ceil(0);
  const max = Math.floor(arr.length - 1);
  return arr[Math.floor(Math.random() * (max - min + 1)) + min];
}

export function getExtension(url: string) {
  return url
    .split(/\#|\?/)[0]
    .split(".")
    .pop()
    .trim()
    .toLowerCase();
}
