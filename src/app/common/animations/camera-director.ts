import { Camera2D } from "app/common/animations/camera2d";
import { CameraData } from "avg-engine/engine";

export enum DirectLayers {
  All,
  Scenes,
  Characters
}

export class CameraDirector {
  private camera: Camera2D = new Camera2D([]);

  public async moveTo(applyLayers: DirectLayers, cameraData: CameraData, duration: number = 1000) {
    switch (applyLayers) {
      case DirectLayers.All:
        this.camera.setTargets(["#avg-camera-viewport", "#character-box"]);
        break;
      case DirectLayers.Scenes:
        this.camera.setTargets(["#avg-viewport"]);
        break;
      case DirectLayers.Characters:
        this.camera.setTargets(["#character-box"]);
        break;
    }

    this.camera.setCameraData(cameraData);
    return await this.camera.begin(duration);
  }

  public async focusToCharacter() {}
}
