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

  ngAfterViewChecked() {}

  protected showWidget() {
    super.showWidget();
    this.update();
    super.initShowAnimation();

    this.changeDetectorRef.detectChanges();
  }

  public update() {
    const subtitleData = <avg.Subtitle>this.data;

    // Update and parse content
    subtitleData.text = avg.DialogueParserPlugin.parseContent(subtitleData.text);
    this.bindingSubtitleSafeHtml = this.sanitizer.bypassSecurityTrustHtml(subtitleData.text);

    this.changeDetectorRef.detectChanges();
  }
}
