import { GameWorld } from "./world";
import * as PIXI from "pixi.js";
import { Sprite } from "./sprite";
import { DebugPanel } from "../../../app/common/debugger/debug-panel";

export class SpriteDebugger {
  private graphics: PIXI.Graphics;
  private sprite: Sprite;
  private dragging: any;
  private draggingData: PIXI.interaction.InteractionData;

  constructor(sprite: Sprite) {
    // 初始化调试信息框
    this.graphics = new PIXI.Graphics();
    this.graphics.lineStyle(1, 0xff0000);
    this.graphics.interactive = true;

    // 信息
    this.sprite = sprite;
    this.sprite.interactive = true;
    this.sprite.buttonMode = true;
    this.sprite
      .on("pointerdown", this.onDragStart.bind(this))
      .on("pointerup", this.onDragEnd.bind(this))
      .on("pointerupoutside", this.onDragEnd.bind(this))
      .on("pointermove", this.onDragMove.bind(this));

    this.sprite.addChild(this.graphics);
  }

  private onDragStart(event) {
    this.draggingData = event.data;

    // this.sprite.alpha = 0.8;
    this.dragging = this.draggingData.getLocalPosition(this.sprite.parent);
    DebugPanel.setSpritePanel(this.sprite);
  }

  private onDragEnd() {
    // this.sprite.alpha = 1;
    this.draggingData = null;
    this.dragging = false;
  }

  private onDragMove() {
    if (this.dragging) {
      // const newPosition = this.draggingData.getLocalPosition(this.sprite.parent);

      // this.sprite.x = newPosition.x;
      // this.sprite.y = newPosition.y;

      var newPosition = this.draggingData.getLocalPosition(this.sprite.parent);
      this.sprite.position.x += newPosition.x - this.dragging.x;
      this.sprite.position.y += newPosition.y - this.dragging.y;
      this.dragging = newPosition;

      DebugPanel.update();
    }
  }

  public update() {
    if (this.graphics) {
      this.debugClearInfoBox();
      this.graphics.drawRect(0, 0, this.sprite.width, this.sprite.height);

      this.graphics.beginFill(0xff0000);
      this.graphics.drawRect(0, 0, 320, 22);
      this.graphics.endFill();

      let text = new PIXI.Text(
        `position (${this.sprite.x.toFixed(2)},${this.sprite.y.toFixed(2)}), [${this.sprite.width.toFixed(2)}x${this.sprite.height.toFixed(2)}]`,
        new PIXI.TextStyle({
          fontFamily: "Arial",
          dropShadowDistance: 1,
          fontWeight: "200",
          // dropShadow: true,
          fontSize: 18,
          fill: 0xffffff,
          align: "center"
        })
      );

      this.graphics.addChild(text);
    }
  }

  public debugClearInfoBox() {
    if (this.graphics) {
      this.graphics.clear();
      this.graphics.removeChildren();
    }
  }
}
