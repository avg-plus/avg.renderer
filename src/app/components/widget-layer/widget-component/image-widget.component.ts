import { Component, Injector, ChangeDetectorRef, OnInit, AfterViewInit, Renderer2, ElementRef } from "@angular/core";
import { ScreenWidgetComponent } from "./screen-widget.component";

import * as avg from "avg-engine/engine";
import * as $ from "jquery";
import { DomSanitizer, SafeStyle } from "@angular/platform-browser";
import { AnimationUtils } from "../../../common/animations/animation-utils";
import { EngineUtils, MeasurementUnitPart, Dimension, AVGGame, UnitType, AVGMeasurementUnit } from "avg-engine/engine";
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

  public async updateImage() {
    const imageData = <avg.ScreenImage>this.data;
    const filters = imageData.renderer.filters || [];
    this.bindingImageFile = imageData.file.filename;
    console.log("filters", filters);

    const dimension: Dimension = await Utils.getImageDimensions(this.bindingImageFile);

    const element = $(this.WidgetElementID + " .main-img")[0];
    element.style.setProperty("background-image", `url(${this.bindingImageFile})`);

    AnimationUtils.applyFilters(this.WidgetElementID + " .main-img", 0, filters);

    this.changeDetectorRef.detectChanges();
  }

  public async update() {
    const imageData = <avg.ScreenImage>this.data;
    this.bindingImageFile = imageData.file.filename;

    let imageRenderer = imageData.renderer;
    const filter = imageRenderer.filters || [];

    imageRenderer.width = imageRenderer.width || imageData.width || "100%";
    imageRenderer.height = imageRenderer.height || imageData.height || "100%";
    imageRenderer.scale = imageRenderer.scale || 1;

    imageRenderer = imageData.mergeToRenderer(imageRenderer);

    const dimension: Dimension = await Utils.getImageDimensions(this.bindingImageFile);

    this.changeDetectorRef.detectChanges();

    // Get user specified image size
    const widthUnitPart = new MeasurementUnitPart(imageRenderer.width);
    const heightUnitPart = new MeasurementUnitPart(imageRenderer.height);
    const xUnitPart = new MeasurementUnitPart(imageRenderer.x);
    const yUnitPart = new MeasurementUnitPart(imageRenderer.y);

    // Get image demension
    let actualWidth = 0;
    let actualHeight = 0;

    if (widthUnitPart.isPercent()) {
      actualWidth = dimension.width * (widthUnitPart.getNumbericValue() / 100);
    } else if (widthUnitPart.isPixel()) {
      actualWidth = widthUnitPart.getNumbericValue();
    }

    if (heightUnitPart.isPercent()) {
      actualHeight = dimension.height * (heightUnitPart.getNumbericValue() / 100);
    } else if (heightUnitPart.isPixel()) {
      actualHeight = heightUnitPart.getNumbericValue();
    }

    const screenWidth = avg.Setting.WindowWidth;
    const screenHeight = avg.Setting.WindowHeight;
    const relativeWidth = actualWidth / screenWidth;
    const relativeHeight = actualHeight / screenHeight;

    imageRenderer.x = xUnitPart.getValue();
    imageRenderer.y = yUnitPart.getValue();

    // 1. Get screen solution in pixels
    // 2. Get actual size in pixel with user specified percent
    // 3. Calculating percentage in screen pixels
    if (widthUnitPart.isPercent()) {
      imageRenderer.width = relativeWidth * 100 + UnitType.Percent;
    }

    if (heightUnitPart.isPercent()) {
      imageRenderer.height = relativeHeight * 100 + UnitType.Percent;
    }

    if (widthUnitPart.isPixel()) {
      imageRenderer.width = widthUnitPart.getValue();
    }

    if (heightUnitPart.isPixel()) {
      imageRenderer.height = heightUnitPart.getValue();
    }

    const position = imageData.position;
    if (position) {
      const positionUnits = AVGMeasurementUnit.fromString(position);
      const left = positionUnits.getLeft();
      const right = positionUnits.getRight();
      if (left.isCustomUnit()) {
        // x-axis position
        switch (left.getValue()) {
          case "left": {
            imageRenderer.x = 0 + UnitType.Percent;
            break;
          }
          case "right": {
            imageRenderer.x = 100 - relativeWidth * 100 + UnitType.Percent;
            break;
          }
          case "center": {
            imageRenderer.x = 100 / 2 - (relativeWidth * 100) / 2 + UnitType.Percent;
            break;
          }
        }
      } else {
        imageRenderer.x = left.getValue();
      }

      if (right.isCustomUnit()) {
        // y-axis position
        switch (right.getValue()) {
          case "top": {
            imageRenderer.y = 0 + UnitType.Percent;
            break;
          }
          case "center": {
            imageRenderer.y = 100 / 2 - (relativeHeight * 100) / 2 + UnitType.Percent;
            break;
          }
          case "bottom": {
            imageRenderer.y = 100 - relativeHeight * 100 + UnitType.Percent;
            break;
          }
        }
      } else {
        imageRenderer.y = right.getValue();
      }
    }

    const style = {
      // "transform-origin": "top left",
      // transform: imageRenderer.scale ? `scale(${imageRenderer.scale})` : "",
      width: imageRenderer.width,
      height: imageRenderer.height,
      // width: "100%",
      // height: "100%",
      // scale: imageRenderer.scale,
      // opacity: 1,
      // left: imageRenderer.x,
      // top: imageRenderer.y,
      "background-image": `url(${this.bindingImageFile})`,
      "background-repeat": "no-repeat",
      "background-size": `100% 100%`
    };

    const parentElement = $(this.WidgetElementID)[0];
    parentElement.setAttribute(
      "style",
      EngineUtils.cssObjectToStyles({
        position: "fixed",
        transform: imageRenderer.scale ? `scale(${imageRenderer.scale})` : "",
        width: "100%",
        height: "100%",
        // opacity: 1,
        left: imageRenderer.x,
        top: imageRenderer.y
      })
    );

    const styles = EngineUtils.cssObjectToStyles(style);
    const element = $(this.WidgetElementID + " .main-img")[0];

    AnimationUtils.applyFilters(this.WidgetElementID + " .main-img", 0, filter);
    element.setAttribute("style", EngineUtils.cssObjectToStyles(style));

    this.changeDetectorRef.detectChanges();

    console.log("Updated image widget styles");
  }
}
