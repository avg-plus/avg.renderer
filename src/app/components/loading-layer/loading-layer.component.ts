import { Component, OnInit, AfterViewInit, ElementRef } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@Component({
  selector: "loading-layer",
  templateUrl: "./loading-layer.component.html",
  styleUrls: ["./loading-layer.component.scss"]
})
export class LoadingLayerComponent implements OnInit, AfterViewInit {
  isInLoading = true;

  constructor() {}

  ngOnInit() {
    document.addEventListener(
      "DOMContentLoaded",
      () => {
        this.isInLoading = false;
      },
      false
    );
  }

  ngAfterViewInit() {}
}
