import { Component, OnInit, AfterViewInit, ElementRef } from "@angular/core";
import * as PIXI from "pixi.js";
import { UIAnimation } from "../../common/animations/ui-animation";
import { TransitionLayerService } from "./transition-layer.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Subject } from "rxjs";

import * as $ from "jquery";

@Component({
  selector: "transition-layer",
  templateUrl: "./transition-layer.component.html",
  styleUrls: ["./transition-layer.component.scss"],
  animations: []
})
export class TransitionLayerComponent implements OnInit, AfterViewInit {
  private animations: any[];
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
   

  }

  onTransitionLayerClicked() {
    // console.log(
    //   "Transition Layer Clicked: ",
    //   TransitionLayerService.isLockPointerEvents()
    // );
  }
}
