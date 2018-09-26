import * as avg from "avg-engine/engine";
import { OP } from "avg-engine/engine";
import { APIDialogueImpl } from "app/common/api/api-dialogue-impl";

export class Impl {
  public static initlialize() {
    /*Call this empty function to ensure the module initialize. */
  }

  protected static printAPIDetail(target: Function, key: string, value: any) {
    return {
      value: function(...args: any[]) {
        const result = value.value.apply(this, args);
        console.log(`API ${args[0].constructor.name}::${key} => `, args[0]);
        return result;
      }
    };
  }

  protected static registerImpl<T>(type: new () => T, op: string) {
    return (target: any, key: string, descriptor: PropertyDescriptor) => {
      // console.log(target.name, key, descriptor);

      const originalMethod = descriptor.value;

      descriptor.value = function(...args: any[]) {
        const result = originalMethod.apply(this, args);
        console.log(`Register API ${args[0].constructor.name}::${key} => `, args[0]);
        return result;
      };

      avg.APIManager.extendImpl(type.name, op, descriptor.value);
    };

    // return {
    //   value: function(...args: any[]) {
    //     const result = value.value.apply(this, args);
    //     const r = JSON.stringify(result);
    //     console.log(`API ${args[0].constructor.name}::${key} => `, args[0]);
    //     return result;
    //   }
    // };
  }
}
