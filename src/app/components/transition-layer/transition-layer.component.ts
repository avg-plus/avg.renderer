import { Component, OnInit, AfterViewInit, ElementRef } from "@angular/core";
import * as PIXI from "pixi.js";
import { transition } from "app/common/manager/transition";
import { UIAnimation } from "../../common/animations/ui-animation";
import { TransitionLayerService } from "./transition-layer.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
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

  ngAfterViewInit() {
    const times = [];
    let fps;

    function refreshLoop() {
      window.requestAnimationFrame(function() {
        const now = performance.now();
        while (times.length > 0 && times[0] <= now - 1000) {
          times.shift();
        }
        times.push(now);
        fps = times.length;
        refreshLoop();
      });
    }
    const fpsOut = document.getElementById("fps");

    // setInterval(() => {
    // refreshLoop();
    // fpsOut.innerHTML = fps + " fps";
    // }, 1);
    // refreshLoop();
  }

  onTransitionLayerClicked() {
    console.log(
      "Transition Layer Clicked: ",
      TransitionLayerService.isLockPointerEvents()
    );

    if (!TransitionLayerService.isLockPointerEvents()) {
      TransitionLayerService.FullScreenClickListener.next();
    }
  }
}
