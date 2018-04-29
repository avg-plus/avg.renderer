import {
  OnInit,
  Component,
  Input,
  AfterViewInit,
  OnDestroy,
  Injector,
  ChangeDetectorRef
} from "@angular/core";
import { NgForOf } from "@angular/common";
import { Subtitle, Setting } from "avg-engine/engine";

import * as gsap from "gsap";
import * as avg from "avg-engine/engine";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { AnimationUtils } from "../../../common/animations/animation-utils";
import { ScreenWidgetComponent } from "./screen-widget.component";

@Component({
  selector: "text-widget",
  templateUrl: "./text-widget.component.html",
  styleUrls: ["./text-widget.component.scss"]
})
export class TextWidgetComponent extends ScreenWidgetComponent
  implements OnInit, AfterViewInit {
  private customPositionStyle: any;

  private bindingSubtitleSafeHtml: SafeHtml;

  constructor(private sanitizer: DomSanitizer, private injector: Injector) {
    super(injector.get(ChangeDetectorRef));
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

  public update() {
    const subtitleData = <avg.Subtitle>this.data;

    // Update and parse content
    subtitleData.text = avg.DialogueParserPlugin.parseContent(
      subtitleData.text
    );

    this.bindingSubtitleSafeHtml = this.sanitizer.bypassSecurityTrustHtml(
      subtitleData.text
    );
  }
}
