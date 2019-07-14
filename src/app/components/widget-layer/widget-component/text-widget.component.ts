import { DialogueParserPlugin } from "./../../../../engine/plugin/internal/dialogue-parser-plugin";
import { OnInit, Component, AfterViewInit, Injector, ChangeDetectorRef, AfterViewChecked } from "@angular/core";
import * as $ from "jquery";

import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
// import { AnimationUtils } from "../../../common/animations/animation-utils";
import { ScreenWidgetComponent } from "./screen-widget.component";
import { Subtitle } from "engine/data/screen-subtitle";
import { MeasurementUnitPart, AVGMeasurementUnit, UnitType } from "engine/core/measurement-unit";
import { Setting } from "engine/core/setting";
import { EngineUtils } from "engine/core/engine-utils";
import { AVGSpriteRenderer } from "engine/data/sprite-renderer";

@Component({
  selector: "text-widget",
  templateUrl: "./text-widget.component.html",
  styleUrls: ["./text-widget.component.scss"]
})
export class TextWidgetComponent extends ScreenWidgetComponent implements OnInit, AfterViewInit, AfterViewChecked {
  public bindingSubtitleSafeHtml: SafeHtml;

  constructor(private sanitizer: DomSanitizer, injector: Injector) {
    super(injector.get(ChangeDetectorRef));
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();

    this.showWidget();
  }

  ngAfterViewChecked() {}

  protected showWidget() {
    super.showWidget();
    this.update();
    // super.initShowAnimation();

    this.changeDetectorRef.detectChanges();
  }

  public updateText() {
    const subtitleData = <Subtitle>this.data;

    subtitleData.text = DialogueParserPlugin.parseContent(subtitleData.text);
    this.bindingSubtitleSafeHtml = this.sanitizer.bypassSecurityTrustHtml(subtitleData.text);

    this.changeDetectorRef.detectChanges();
  }

  public update() {
    const subtitleData = <Subtitle>this.data;

    const renderer = new AVGSpriteRenderer();

    // renderer.x = subtitleData.x;
    // renderer.y = subtitleData.y;

    // Update and parse content
    subtitleData.text = DialogueParserPlugin.parseContent(subtitleData.text);
    this.bindingSubtitleSafeHtml = this.sanitizer.bypassSecurityTrustHtml(subtitleData.text);
    this.changeDetectorRef.detectChanges();

    const elementWidth = $(this.WidgetElementID).width();
    const elementHeight = $(this.WidgetElementID).height();

    // Get user specified image size
    const xUnitPart = new MeasurementUnitPart(this.data.xUnit);
    const yUnitPart = new MeasurementUnitPart(this.data.yUnit);

    const actualWidth = elementWidth;
    const actualHeight = elementHeight;
    const screenWidth = Setting.WindowWidth;
    const screenHeight = Setting.WindowHeight;
    const relativeWidth = actualWidth / screenWidth;
    const relativeHeight = actualHeight / screenHeight;

    // 1. Get screen solution in pixels
    // 2. Get actual size in pixel with user specified percent
    // 3. Calculating percentage in screen pixels
    const position = this.data.position;
    if (position) {
      const positionUnits = AVGMeasurementUnit.fromString(position);
      const left = positionUnits.getLeft();
      const right = positionUnits.getRight();

      const PADDING = 1;

      if (left.isCustomUnit()) {
        // x-axis position
        switch (left.getValue()) {
          case "left": {
            break;
          }
          case "right": {
            break;
          }
          case "center": {
            break;
          }
        }
      }

      if (right.isCustomUnit()) {
        // y-axis position
        switch (right.getValue()) {
          case "top": {
            break;
          }
          case "center": {
            break;
          }
          case "bottom": {
            break;
          }
        }
      }
    }

    const element = $(this.WidgetElementID)[0];
    element.setAttribute(
      "style",
      EngineUtils.cssObjectToStyles({
        left: renderer.x,
        top: renderer.y
      })
    );

    this.changeDetectorRef.detectChanges();
  }
}
