import {
  OnInit,
  Component,
  Input,
  AfterViewInit,
  OnDestroy,
  Injector,
  ChangeDetectorRef,
  AfterViewChecked,
  Renderer2,
  ElementRef
} from "@angular/core";
import { NgForOf } from "@angular/common";
import {
  Subtitle,
  Setting,
  MeasurementUnitPart,
  AVGMeasurementUnit,
  UnitType,
  Renderer,
  EngineUtils
} from "avg-engine/engine";

import * as avg from "avg-engine/engine";
import * as $ from "jquery";

import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
// import { AnimationUtils } from "../../../common/animations/animation-utils";
import { ScreenWidgetComponent } from "./screen-widget.component";

@Component({
  selector: "text-widget",
  templateUrl: "./text-widget.component.html",
  styleUrls: ["./text-widget.component.scss"]
})
export class TextWidgetComponent extends ScreenWidgetComponent implements OnInit, AfterViewInit, AfterViewChecked {
  private customPositionStyle: any;

  public bindingSubtitleSafeHtml: SafeHtml;

  constructor(private sanitizer: DomSanitizer, private injector: Injector) {
    super(injector.get(ChangeDetectorRef), injector.get(Renderer2), injector.get(ElementRef));
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();

    this.showWidget();
  }

  ngAfterViewChecked() { }

  protected showWidget() {
    super.showWidget();
    this.update();
    super.initShowAnimation();

    this.changeDetectorRef.detectChanges();
  }

  public updateText() {
    const subtitleData = <avg.Subtitle>this.data;

    subtitleData.text = avg.DialogueParserPlugin.parseContent(subtitleData.text);
    this.bindingSubtitleSafeHtml = this.sanitizer.bypassSecurityTrustHtml(subtitleData.text);

    this.changeDetectorRef.detectChanges();
  }

  public update() {
    const subtitleData = <avg.Subtitle>this.data;

    const renderer = new Renderer();

    renderer.x = subtitleData.x;
    renderer.y = subtitleData.y;

    // Update and parse content
    subtitleData.text = avg.DialogueParserPlugin.parseContent(subtitleData.text);
    this.bindingSubtitleSafeHtml = this.sanitizer.bypassSecurityTrustHtml(subtitleData.text);
    this.changeDetectorRef.detectChanges();

    const elementWidth = $(this.WidgetElementID).width();
    const elementHeight = $(this.WidgetElementID).height();

    // Get user specified image size
    const xUnitPart = new MeasurementUnitPart(this.data.x);
    const yUnitPart = new MeasurementUnitPart(this.data.y);

    const actualWidth = elementWidth;
    const actualHeight = elementHeight;
    const screenWidth = avg.Setting.WindowWidth;
    const screenHeight = avg.Setting.WindowHeight;
    const relativeWidth = actualWidth / screenWidth;
    const relativeHeight = actualHeight / screenHeight;

    // Get image demension
    renderer.x = xUnitPart.getValue();
    renderer.y = yUnitPart.getValue();

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
            renderer.x = 0 + PADDING + UnitType.Percent;
            break;
          }
          case "right": {
            renderer.x = (100 - (relativeWidth * 100) - PADDING) + UnitType.Percent;
            break;
          }
          case "center": {
            renderer.x = (100 / 2 - (relativeWidth * 100) / 2) + UnitType.Percent;
            break;
          }
        }
      }

      if (right.isCustomUnit()) {
        // y-axis position
        switch (right.getValue()) {
          case "top": {
            renderer.y = 0 + PADDING + UnitType.Percent;
            break;
          }
          case "center": {
            renderer.y = (100 / 2 - (relativeHeight * 100) / 2) + UnitType.Percent;
            break;
          }
          case "bottom": {
            renderer.y = (100 - (relativeHeight * 100) - PADDING) + UnitType.Percent;
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
