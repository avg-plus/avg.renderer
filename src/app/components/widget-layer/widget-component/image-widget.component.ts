import { Component, Injector, ChangeDetectorRef, OnInit, AfterViewInit, Renderer2, ElementRef } from "@angular/core";
import { ScreenWidgetComponent } from "./screen-widget.component";

import { DomSanitizer } from "@angular/platform-browser";
import { GameWorld } from "engine/core/graphics/world";
import { LayerOrder } from "engine/core/graphics/layer-order";
import { ResizeMode } from "engine/core/graphics/sprite";
import { ScreenImage } from "engine/data/screen-image";
import { SpriteType } from "engine/const/sprite-type";

@Component({
  selector: "image-widget",
  templateUrl: "./image-widget.component.html",
  styleUrls: ["./image-widget.component.scss"]
})
export class ImageWidgetComponent extends ScreenWidgetComponent implements OnInit, AfterViewInit {
  constructor(injector: Injector) {
    super(injector.get(ChangeDetectorRef));
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();

    this.showWidget();
  }

  protected async showWidget() {
    // super.showWidget();
    await this.update();
    // super.initShowAnimation();
  }

  onclicked() {
    const imageData = <ScreenImage>this.data;

    console.log(imageData);
  }

  public async update() {
    // const imageData = <ScreenImage>this.data;

    // const sprite = await GameWorld.defaultScene.addFromImage(
    //   imageData.name,
    //   imageData.file.filename,
    //   LayerOrder.TopLayer
    // );

    // let renderer = imageData.renderer;

    // sprite.spriteType = imageData.spriteType;
    // sprite.width = renderer.width || sprite.texture.width;
    // sprite.height = renderer.height || sprite.texture.height;
    // sprite.x = renderer.x;
    // sprite.y = renderer.y;
    // sprite.scale.x = renderer.scaleX || renderer.scale || 1;
    // sprite.scale.y = renderer.scaleY || renderer.scale || 1;
    // sprite.skew.x = renderer.skewX || renderer.skew || 0;
    // sprite.skew.y = renderer.skewY || renderer.skew || 0;
    // sprite.alpha = renderer.alpha || renderer.alpha || 1;
    // sprite.rotation = renderer.rotation || 0;

    // // 锁死立绘比例
    // if (sprite.spriteType === SpriteType.Character) {
    //   sprite.resizeMode = ResizeMode.KeepRadio;
    // } else {
    //   sprite.resizeMode = ResizeMode.Custom;
    // }
  }
}
