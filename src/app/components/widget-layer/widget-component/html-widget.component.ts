import { Component, Injector, ChangeDetectorRef, Renderer2, ElementRef, OnInit, AfterViewInit } from "@angular/core";
import { ScreenWidgetComponent } from "./screen-widget.component";
import { DomSanitizer } from "@angular/platform-browser";

import * as avg from "avg-engine/engine";

@Component({
  selector: "html-widget",
  templateUrl: "./html-widget.component.html",
  styleUrls: ["./html-widget.component.scss"]
})
export class HtmlWidgetComponent extends ScreenWidgetComponent implements OnInit, AfterViewInit {
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

  protected showWidget() {
    super.showWidget();
    this.update();
    super.initShowAnimation();
  }

  public update() {
    this.changeDetectorRef.detectChanges();
  }

  public getWidgetHTMLContent() {
    const htmlModel = <avg.ScreenWidgetHtml>this.data;

    return this.sanitizer.bypassSecurityTrustHtml(htmlModel.html);

    // `
    //   <div style="width: 300px; height: 300px; background: red">
    //   </div>
    // `
  }
}
