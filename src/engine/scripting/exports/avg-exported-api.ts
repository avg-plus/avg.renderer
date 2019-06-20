import { AVGEngineError } from "../../core/engine-errors";
import { i18n } from "../../core/i18n";

export const preExportedSet = new Set();

export function APIExport(name: string, t: any) {
  console.log("APIExport " + name);
  return function(constructor: Function) {
    preExportedSet.add({ name, t });
    // APIManager.Instance.registerExportClass(name, t);
  };
}

export class AVGExportedAPI {
  protected static APIParametersValidate(schema, data: any) {
    console.log("Validate API Input: ", schema, data);

    const validateResult = schema.validate(data);
    if (validateResult.error) {
      AVGEngineError.emit(
        i18n.lang.SCRIPTING_API_IVALID_ARGUMENTS,
        validateResult.error.message,
        validateResult.error.stack
      );
      return null;
    }

    return validateResult.value;
  }
}
