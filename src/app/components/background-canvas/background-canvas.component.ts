import { LayerOrder } from "engine/core/graphics/layer-order";
import { HookSlots } from "./../../../engine/plugin/hooks/hook-slots";
import { SlotManager } from "engine/plugin/hooks/slot-manager";
import { Sprite, ResizeMode } from "../../../engine/core/graphics/sprite";
import { GameWorld } from "../../../engine/core/graphics/world";
import { Component, OnInit, AfterViewInit, ElementRef, AfterContentInit } from "@angular/core";

import { Effects } from "app/common/effects/effects";

import { AnimationUtils } from "../../common/animations/animation-utils";
import { DomSanitizer } from "@angular/platform-browser";
import { Scene } from "engine/data/scene";
import { Setting } from "engine/core/setting";
import { Effect } from "engine/data/effect";
import { APIScene } from "engine/scripting/api/api-scene";
import { SpriteType } from "engine/const/sprite-type";
import { SpriteWidgetManager } from "engine/core/graphics/sprite-widget-manager";
import { ScreenImage } from "engine/data/screen-image";
import { ResourceData } from "engine/data/resource-data";

class SceneModel {
  public scene: Scene;
  public incommingNewScene: Scene;
  public maskTransitionEffect: string;
  public styles: any;
}

@Component({
  selector: "background-canvas",
  templateUrl: "./background-canvas.component.html",
  styleUrls: ["./background-canvas.component.scss"]
})
export class BackgroundCanvasComponent implements OnInit, AfterViewInit, AfterContentInit {
  // private mainScene: Scene;
  private currentBackgroundSprite: Sprite;

  transitionList = ["iris-in", "iris-out", "wipe", "window-shades", "brush", "brush-down", "crossfade"];

  constructor(private elementRef: ElementRef, public sanitizer: DomSanitizer) {
    // this.stylesheetService.initMaskStylesheets();
  }

  ngOnInit() {}

  ngAfterViewInit() {
    const viewport = this.elementRef.nativeElement.querySelector("#avg-viewport");

    // Init world
    GameWorld.init(viewport, Setting.WindowWidth, Setting.WindowHeight);
  }

  ngAfterContentInit() {}

  public reset() {}

  public async removeBackground(scene: APIScene): Promise<any> {
    const slot = SlotManager.getSlot(HookSlots.SceneLeaveAnimation);
    await SpriteWidgetManager.removeSpriteWidget(scene.name, slot);
  }

  public async setBackground(scene: APIScene): Promise<any> {
    const data = scene.data;

    const image = new ScreenImage();
    image.renderer = data.renderer;
    image.file = ResourceData.from(scene.filename);
    image.spriteType = SpriteType.Scene;
    image.name = scene.name;

    const enterSlot = SlotManager.getSlot(HookSlots.SceneEnterAnimation);
    const leaveSlot = SlotManager.getSlot(HookSlots.SceneLeaveAnimation);

    if (this.currentBackgroundSprite) {
      // 把要设置的图片先放到底层
      const incommingSprite = await SpriteWidgetManager.addSpriteWidget(image, enterSlot, LayerOrder.TopLayer, false);
      await SpriteWidgetManager.removeSpriteWidget(this.currentBackgroundSprite.name, leaveSlot);

      this.currentBackgroundSprite = incommingSprite;
    } else {
      if (scene.isAsync) {
        SpriteWidgetManager.addSpriteWidget(image, enterSlot, LayerOrder.TopLayer, false).then(sprite => {
          this.currentBackgroundSprite = sprite;
        });
      } else {
        this.currentBackgroundSprite = await SpriteWidgetManager.addSpriteWidget(
          image,
          enterSlot,
          LayerOrder.TopLayer,
          true
        );
      }
    }
  }

  public async cssFilter(effect: Effect) {
    effect.duration = effect.duration || 0;
    const elementID = "#avg-viewport";

    await AnimationUtils.animateCssFilter(elementID, effect.effectName, effect.duration, effect.strength);
  }

  // public moveTo(index: number, duration: number, x: number) {
  //   AnimationUtils.to("MoveTo", ".layer-" + index, duration, {
  //     x: x
  //   });
  // }

  rain() {
    Effects.rain();
  }

  snow() {
    Effects.snow();
  }

  sakura() {
    Effects.sakura();
  }

  cloud() {
    Effects.cloud();
  }

  shake() {
    const viewport = this.elementRef.nativeElement.querySelector("#avg-viewport");

    if (viewport) {
      // Effects.shake(viewport);
    }
  }
}
