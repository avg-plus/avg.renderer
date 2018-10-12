import { Component, Injector, ChangeDetectorRef, OnInit, AfterViewInit, Renderer2, ElementRef } from "@angular/core";
import { ScreenWidgetComponent } from "./screen-widget.component";

import * as avg from "avg-engine/engine";
import * as $ from "jquery";
import { DomSanitizer, SafeStyle } from "@angular/platform-browser";
import { AnimationUtils } from "../../../common/animations/animation-utils";
import { EngineUtils, MeasurementNumeric, Dimension, AVGGame, UnitType } from "avg-engine/engine";
import { Utils } from "../../../common/utils";

@Component({
  selector: "image-widget",
  templateUrl: "./image-widget.component.html",
  styleUrls: ["./image-widget.component.scss"]
})
export class ImageWidgetComponent extends ScreenWidgetComponent implements OnInit, AfterViewInit {
  private bindingImageFile = "";
  private bindingStyle: SafeStyle;

  constructor(private sanitized: DomSanitizer, private injector: Injector) {
    super(injector.get(ChangeDetectorRef), injector.get(Renderer2), injector.get(ElementRef));
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();

    this.showWidget();
  }

  protected async showWidget() {
    super.showWidget();
    await this.update();
    super.initShowAnimation();
  }

  onclicked() {
    const imageData = <avg.ScreenImage>this.data;

    console.log(imageData);
  }

  public async update() {
    const imageData = <avg.ScreenImage>this.data;
    this.bindingImageFile = imageData.file.filename;

    let imageRenderer = imageData.renderer;
    imageRenderer.x = imageRenderer.x || imageData.x;
    imageRenderer.y = imageRenderer.y || imageData.y;
    imageRenderer.width = imageRenderer.width || imageData.width;
    imageRenderer.height = imageRenderer.height || imageData.height;
    imageRenderer.scale = imageRenderer.scale;
    const filter = imageRenderer.filter || [];

    imageRenderer = imageData.mergeToRenderer(imageRenderer);

    const dimension: Dimension = await Utils.getImageDimensions(this.bindingImageFile);

    // Get user specified image size
    const widthNumberic = new MeasurementNumeric(imageRenderer.width);
    const heightNumberic = new MeasurementNumeric(imageRenderer.height);
    const xNumberic = new MeasurementNumeric(imageRenderer.x);
    const yNumberic = new MeasurementNumeric(imageRenderer.y);

    // 1. Get screen solution in pixels
    // 2. Get actual size in pixel with user specified percent
    // 3. Calculating percentage in screen pixels
    if (widthNumberic.isPercent()) {
      const actualWidth = dimension.width * (widthNumberic.getValue() / 100);

      const screenWidth = avg.Setting.WindowWidth;
      const relativeWidth = actualWidth / screenWidth;
      imageRenderer.width = relativeWidth * 100 + UnitType.Percent;
    }

    if (heightNumberic.isPercent()) {
      const actualHeight = dimension.height * (heightNumberic.getValue() / 100);

      const screenHeight = avg.Setting.WindowHeight;
      const relativeHeight = actualHeight / screenHeight;
      imageRenderer.height = relativeHeight * 100 + UnitType.Percent;
    }

    if (widthNumberic.isPixel()) {
      imageRenderer.width = widthNumberic.getStringValue();
    }

    if (heightNumberic.isPixel()) {
      imageRenderer.height = heightNumberic.getStringValue();
    }

    imageRenderer.x = xNumberic.getStringValue();
    imageRenderer.y = yNumberic.getStringValue();

    const positions = new Map<string, string>([
      [avg.ScreenPosition.TopLeft, "widget-top-left"],
      [avg.ScreenPosition.TopRight, "widget-top-right"],
      [avg.ScreenPosition.BottomLeft, "widget-bottom-left"],
      [avg.ScreenPosition.BottomRight, "widget-bottom-right"],
      [avg.ScreenPosition.Top, "widget-top"],
      [avg.ScreenPosition.Left, "widget-left"],
      [avg.ScreenPosition.Right, "widget-right"],
      [avg.ScreenPosition.Bottom, "widget-bottom"],
      [avg.ScreenPosition.Center, "widget-center"]
    ]);

    const bindingClass = positions.get(this.data.position);

    const style = {
      // "transform-origin": "top left",
      transform: imageRenderer.scale ? `scale(${imageRenderer.scale})` : "",
      width: imageRenderer.width,
      height: imageRenderer.height,
      // scale: imageRenderer.scale,
      opacity: 1,
      // left: imageRenderer.x,
      // top: imageRenderer.y,
      "background-image": `url(${this.bindingImageFile})`,
      "background-repeat": "no-repeat",
      "background-size": `100% 100%`
    };

    const styles = EngineUtils.cssObjectToStyles(style);
    const element = $(this.WidgetElementID + " .main-img")[0];

    AnimationUtils.applyFilters(this.WidgetElementID + " .main-img", 0, filter);
    element.setAttribute("style", EngineUtils.cssObjectToStyles(style));

    this.changeDetectorRef.detectChanges();

    console.log("Updated image widget styles");
  }
}
