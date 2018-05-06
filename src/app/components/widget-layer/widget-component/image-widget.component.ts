import {
  Component,
  Injector,
  ChangeDetectorRef,
  OnInit,
  AfterViewInit,
  Renderer2,
  ElementRef
} from "@angular/core";
import { ScreenWidgetComponent } from "./screen-widget.component";

import * as avg from "avg-engine/engine";
import { DomSanitizer, SafeStyle } from "@angular/platform-browser";
import { AnimationUtils } from "../../../common/animations/animation-utils";

@Component({
  selector: "image-widget",
  templateUrl: "./image-widget.component.html",
  styleUrls: ["./image-widget.component.scss"]
})
export class ImageWidgetComponent extends ScreenWidgetComponent
  implements OnInit, AfterViewInit {
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

  protected showWidget() {
    super.showWidget();
    this.update();
    super.initShowAnimation();
  }

  onclicked() {
    const imageData = <avg.ScreenImage>this.data;

    console.log(imageData);
  }

  public update() {
    const imageData = <avg.ScreenImage>this.data;
    this.bindingImageFile = imageData.file.filename;

    AnimationUtils.to("Init Image", this.WidgetElementID + " .main-img", 0, {
      width: imageData.width,
      height: imageData.height,
      zoom: imageData.scale
    });

    this.changeDetectorRef.detectChanges();
  }
}
