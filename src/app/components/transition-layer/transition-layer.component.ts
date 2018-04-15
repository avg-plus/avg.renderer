import { Component, OnInit, AfterViewInit, ElementRef } from "@angular/core";
import * as PIXI from "pixi.js";
import { transition } from "app/common/manager/transition";
import { UIAnimation } from "../../common/animations/ui-animation";
import { TransitionLayerService } from "./transition-layer.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SceneAnimation } from "app/common/animations/scene-animation";
import { Subject } from "rxjs/Subject";

@Component({
  selector: "transition-layer",
  templateUrl: "./transition-layer.component.html",
  styleUrls: ["./transition-layer.component.scss"],
  animations: [
    // UIAnimation.AVGOpacityFade("transitionState", 0, 1, 2000)
  ]
})
export class TransitionLayerComponent implements OnInit, AfterViewInit {
  private animations: any[];
  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {}

  onTransitionLayerClicked() {
    if (!TransitionLayerService.isLockPointerEvents()) {
      TransitionLayerService.FullScreenClickListener.next();
    }
  }
}
