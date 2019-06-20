import { Camera2D } from "app/common/animations/camera2d";
import { CameraDirectorLayers, CameraData } from "engine/data/camera-data";

export class CameraDirector {
  private camera: Camera2D = new Camera2D([]);

  public async moveTo(applyLayers: CameraDirectorLayers, cameraData: CameraData, duration: number = 1000) {
    switch (applyLayers) {
      case CameraDirectorLayers.All:
        this.camera.setTargets(["#avg-camera-viewport", "#widget-layer"]);
        break;
      case CameraDirectorLayers.Scenes:
        this.camera.setTargets(["#avg-camera-viewport"]);
        break;
      case CameraDirectorLayers.Characters:
        this.camera.setTargets(["#widget-layer"]);
        break;
    }

    this.camera.setCameraData(cameraData);
    return await this.camera.begin(duration);
  }

  public async focusToCharacter() {}
}
