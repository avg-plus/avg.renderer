import * as dat from "dat.gui";
import { Sprite, ResizeMode } from "../graphics/sprite";

export class DebugPanel {
  private static gui = new dat.GUI({ name: "Debug", autoPlace: false });
  private static spriteFolder: dat.GUI;
  public static init(parentElement?: HTMLElement) {
    if (!parentElement) {
      parentElement = <HTMLElement>document.getElementsByTagName("game").item(0);
    }

    this.gui.domElement.style.position = "absolute";
    this.gui.domElement.style.zIndex = "9999";
    this.gui.domElement.style.right = "2px";

    parentElement.appendChild(this.gui.domElement);
  }

  public static setSpritePanel(sprite: Sprite) {
    if (this.spriteFolder) {
      this.gui.removeFolder(this.spriteFolder);
    }

    this.spriteFolder = this.gui.addFolder("精灵");

    this.spriteFolder.add(sprite, "name");

    this.spriteFolder.add(sprite, "x", -500, 2500);
    this.spriteFolder.add(sprite, "y", -500, 2500);
    this.spriteFolder.add(sprite, "width", 0, 2500);
    this.spriteFolder.add(sprite, "height", 0, 2500);
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

    this.spriteFolder.open();
  }

  public static update() {
    this.gui.updateDisplay();
  }
}
