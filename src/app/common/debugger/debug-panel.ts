import { GameWorld } from "../../../engine/core/graphics/world";
import * as dat from "dat.gui";
import { Sprite, ResizeMode } from "../../../engine/core/graphics/sprite";

export class DebugPanel {
  private static gui = new dat.GUI({ name: "Debug", autoPlace: false });
  private static spriteFolder: dat.GUI;
  private static cameraFolder: dat.GUI;

  private static cameraModel = {
    x: 0,
    y: 0,
    zoom: 1
  };

  public static init(parentElement?: HTMLElement) {
    if (!parentElement) {
      parentElement = <HTMLElement>document.getElementsByTagName("game").item(0);
    }

    this.gui.domElement.style.position = "absolute";
    this.gui.domElement.style.zIndex = "9999";
    this.gui.domElement.style.right = "2px";

    parentElement.appendChild(this.gui.domElement);

    this.initCameraPanel();
  }

  public static initCameraPanel() {
    if (!this.cameraFolder) {
      this.cameraFolder = this.gui.addFolder("摄像机");
      this.cameraFolder.add(this.cameraModel, "x", -2000, 2000, 1).onChange((value: any) => {
        GameWorld.defaultScene.cameraMove(value, this.cameraModel.y, 2000);
      });
      this.cameraFolder.add(this.cameraModel, "y", -2000, 2000, 1).onChange((value: any) => {
        GameWorld.defaultScene.cameraMove(this.cameraModel.x, value, 2000);
      });
      this.cameraFolder.add(this.cameraModel, "zoom", -5000, 5000, 10).onChange((value: any) => {
        GameWorld.defaultScene.cameraZoom(this.cameraModel.zoom, 2000);
      });
    }
  }

  public static setSpritePanel(sprite: Sprite) {
    if (this.spriteFolder) {
      this.gui.removeFolder(this.spriteFolder);
    }

    this.spriteFolder = this.gui.addFolder("精灵");

    this.spriteFolder.add(sprite, "name");

    this.spriteFolder.add(sprite, "x", -500, 2500);
    this.spriteFolder.add(sprite, "y", -500, 2500);
    this.spriteFolder.add(sprite, "width", 0, 6000);
    this.spriteFolder.add(sprite, "height", 0, 6000);
    this.spriteFolder.add(sprite, "rotation", 0, 360, 0.1);
    this.spriteFolder.add(sprite, "alpha", 0, 1, 0.01);

    this.spriteFolder.add(sprite, "distance", -5000, 5000);

    this.spriteFolder.add(sprite, "resizeMode", ["Default", "Stretch", "KeepRadio", "Custom"]).onChange(value => {
      switch (value) {
        case "Default":
          sprite.resizeMode = ResizeMode.Default;
          break;
        case "Stretch":
          sprite.resizeMode = ResizeMode.Stretch;
          break;
        case "KeepRadio":
          sprite.resizeMode = ResizeMode.KeepRadio;
          break;
        case "Custom":
          sprite.resizeMode = ResizeMode.Custom;
          break;
      }
    });
    this.spriteFolder.add(sprite, "center");
    this.spriteFolder.add(sprite, "isTilingMode");
    this.spriteFolder.add(sprite, "renderCameraDepth");

    this.spriteFolder.open();
  }

  public static update() {
    this.gui.updateDisplay();
  }
}
