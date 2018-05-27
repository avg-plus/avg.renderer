import { Component, OnInit, AfterViewInit, ElementRef } from "@angular/core";
import * as PIXI from "pixi.js";
import { UIAnimation } from "../../common/animations/ui-animation";
import { TransitionLayerService } from "./transition-layer.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Subject } from "rxjs/Subject";
import { EngineUtils } from "avg-engine/engine";

@Component({
  selector: "transition-layer",
  templateUrl: "./transition-layer.component.html",
  styleUrls: ["./transition-layer.component.scss"],
  animations: []
})
export class TransitionLayerComponent implements OnInit, AfterViewInit {
  private animations: any[];
  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    const times = [];
    let fps;
    const fpsOut = document.getElementById("fps");

    // EngineUtils.countTo(200, 100, 13000, value => {
    //   fpsOut.innerHTML = "countdown: " + value;
    // });

    let last = 0;
    function refreshLoop() {
      window.requestAnimationFrame(function() {
        const now = performance.now();

        while (times.length > 0 && times[0] <= now - 1000) {
          times.shift();
        }
        times.push(now);
        fps = times.length;

        if (now - last > 100) {
          fpsOut.innerHTML = fps + " fps";
          last = now;
        }

        refreshLoop();
      });
    }

    refreshLoop();
  }

  onTransitionLayerClicked() {
    // console.log(
    //   "Transition Layer Clicked: ",
    //   TransitionLayerService.isLockPointerEvents()
    // );

    if (!TransitionLayerService.isLockPointerEvents()) {
      TransitionLayerService.FullScreenClickListener.next();
    }
  }
}
