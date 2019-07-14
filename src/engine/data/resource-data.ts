import { AVGNativePath } from "../core/native-modules/avg-native-path";
import { ResourcePath, GameResource } from "engine/core/resource";

export class ResourceData {
  public filename: string;

  constructor(filename?: string, dir?: ResourcePath) {
    this.filename = "";
    if (dir !== undefined) {
      this.filename = AVGNativePath.join(GameResource.getPath(dir), filename);
    } else {
      this.filename = filename;
    }
  }

  public static from(filename: string, dir?: ResourcePath) {
    return new ResourceData(filename, dir);
  }
}
