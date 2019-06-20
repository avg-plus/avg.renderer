import { AVGScriptUnit } from "../scripting/script-unit";
import { AVGData } from "../data/avg-data";

export function isObject(item) {
  return item && typeof item === "object" && !Array.isArray(item);
}

export function isNull(obj) {
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
