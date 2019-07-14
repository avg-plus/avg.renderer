import { Component, Injector, ChangeDetectorRef, Renderer2, ElementRef, OnInit, AfterViewInit } from "@angular/core";
import { ScreenWidgetComponent } from "./screen-widget.component";
import { DomSanitizer } from "@angular/platform-browser";
import { ScreenWidgetHtml } from "engine/data/screen-widget-html";

@Component({
  selector: "html-widget",
  templateUrl: "./html-widget.component.html",
  styleUrls: ["./html-widget.component.scss"]
})
export class HtmlWidgetComponent extends ScreenWidgetComponent implements OnInit, AfterViewInit {
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
    // super.initShowAnimation();
  }

  public update() {
    this.changeDetectorRef.detectChanges();
  }

  public getWidgetHTMLContent() {
    const htmlModel = <ScreenWidgetHtml>this.data;

    return this.sanitizer.bypassSecurityTrustHtml(htmlModel.html);
  }
}
