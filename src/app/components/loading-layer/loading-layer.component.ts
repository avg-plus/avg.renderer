import { Component, OnInit, AfterViewInit, ElementRef } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LoadingLayerService } from "./loading-layer.service";
import { AVGNativeFS, EngineSettings } from "avg-engine/engine";

declare var ldBar: any;

@Component({
  selector: "loading-layer",
  templateUrl: "./loading-layer.component.html",
  styleUrls: ["./loading-layer.component.scss"]
})
export class LoadingLayerComponent implements OnInit, AfterViewInit {
  service = LoadingLayerService;

  constructor() {}

  ngOnInit() {
    // document.addEventListener("DOMContentLoaded", () => {}, false);
    // LoadingLayerService.hideLoadingScreen();
  }

  ngAfterViewInit() {
  }
}
