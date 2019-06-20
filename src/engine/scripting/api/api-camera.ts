import { CameraShakeData, CameraDirectorLayers, CameraData } from "../../data/camera-data";
import { AVGScriptUnit } from "../script-unit";

export class APICameraMove extends AVGScriptUnit {
  public layer: CameraDirectorLayers = CameraDirectorLayers.All;
  public duration: number = 1000;
  public data: CameraData = new CameraData();
}

export class APICameraShake extends AVGScriptUnit {
  public data: CameraShakeData = new CameraShakeData();
}

export class APICameraTransitionTo extends AVGScriptUnit {
  public color: string = "#FFFFFF";
  public opacity: number = 1;
  public duration: number = 1000;
}
