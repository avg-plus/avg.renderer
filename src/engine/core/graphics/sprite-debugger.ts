import { GameWorld } from "./world";
import * as PIXI from "pixi.js";
import { Sprite } from "./sprite";
import { DebugPanel } from "../../../app/common/debugger/debug-panel";

export class SpriteDebugger {
  private boundingBox: PIXI.Graphics;
  private sprite: Sprite;
  private dragging: any;
  private draggingData: PIXI.interaction.InteractionData;

  constructor(sprite: Sprite) {
    // 初始化调试信息框
    this.boundingBox = new PIXI.Graphics();
    this.boundingBox.lineStyle(1, 0x000000);
    this.boundingBox.interactive = true;

    // 信息
    this.sprite = sprite;
    this.sprite.interactive = true;
    this.sprite.buttonMode = true;
    this.sprite
      .on("pointerdown", this.onDragStart.bind(this))
      .on("pointerup", this.onDragEnd.bind(this))
      .on("pointerupoutside", this.onDragEnd.bind(this))
      .on("pointermove", this.onDragMove.bind(this));

    this.sprite.parent.addChild(this.boundingBox);
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
      var newPosition = this.draggingData.getLocalPosition(this.sprite.parent);
      this.sprite.position.x += newPosition.x - this.dragging.x;
      this.sprite.position.y += newPosition.y - this.dragging.y;
      this.dragging = newPosition;

      DebugPanel.update();
    }
  }

  public update() {
    if (this.boundingBox) {
      this.debugClearInfoBox();

      const anchorX = this.sprite.anchor.x;
      const anchorY = this.sprite.anchor.y;

      this.boundingBox.drawRect(
        this.sprite.x - this.sprite.width * anchorX,
        this.sprite.y - this.sprite.height * anchorY,
        this.sprite.width,
        this.sprite.height
      );

      this.boundingBox.beginFill(0x000000, 0.8);
      this.boundingBox.drawRect(
        this.sprite.x - this.sprite.width * anchorX,
        this.sprite.y - this.sprite.height * anchorY,
        160,
        58
      );
      this.boundingBox.endFill();

      const text = new PIXI.Text(
        `position: (${this.sprite.x.toFixed(2)},${this.sprite.y.toFixed(2)})` +
          "\n" +
          `size: ${this.sprite.width.toFixed(2)}x${this.sprite.height.toFixed(2)}` +
          "\n" +
          `camera: ${this.sprite.renderInCamera ? "是" : "否"}`,
        new PIXI.TextStyle({
          fontFamily: "Arial",
          dropShadowDistance: 1,
          fontWeight: "100",
          dropShadow: true,
          fontSize: 13,
          fill: 0xffffff,
          align: "left"
        })
      );

      text.position.set(this.sprite.x - this.sprite.width * anchorX, this.sprite.y - this.sprite.height * anchorY);
      this.boundingBox.addChild(text);
    }
  }

  public debugClearInfoBox() {
    if (this.boundingBox) {
      this.boundingBox.clear();
      this.boundingBox.removeChildren();
    }
  }
}
