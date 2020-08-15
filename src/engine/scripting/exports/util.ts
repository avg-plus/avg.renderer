import { APIExport, AVGExportedAPI } from ".";

@APIExport("util", EngineAPI_Util)
export class EngineAPI_Util extends AVGExportedAPI {
  public static randomBetween(min: number, max: number) {
    return Math.random() * (max - min + 1) + min;
  }

  public static randomBetweenInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
