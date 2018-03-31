import { Component, OnInit, AfterViewInit, ElementRef } from "@angular/core";
import * as PIXI from "pixi.js";
import { transition } from "app/common/manager/transition";
import { UIAnimation } from "../../common/animations/ui-animation";
import { TransitionCanvasService } from "./transition-canvas.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@Component({
  selector: "transition-canvas",
  templateUrl: "./transition-canvas.component.html",
  styleUrls: ["./transition-canvas.component.scss"],
  animations: [UIAnimation.AVGOpacityFade("transitionState", 0, 1, 2000)]
})
export class TransitionCanvasComponent implements OnInit, AfterViewInit {
  public transitionState = "inactive";
  private animations: any[];

  constructor(private service: TransitionCanvasService) {}

  ngOnInit() {
    let annotations = Reflect.getMetadata("annotations", this.constructor);
    // let componentMetadata = annotations.find(annotation => {
    //   return annotation;
    // });
    console.log("annotations", annotations[0].animations);
    annotations[0].animations.push(
      UIAnimation.AVGOpacityFade("transitionState2", 0, 1, 2000)
    );

    // this.animations = [];
    // this.animations = componentMetadata.animations;
    // componentMetadata.animations = [];
    // console.log("componentMetadata", componentMetadata);

    Reflect.defineMetadata("annotations", [annotations], this.constructor);

    this.service.change.on("fadeTo", (from, to, timings) => {
      // this.animations.push(UIAnimation.AVGOpacityFade("transitionState", 0, 1, 12000));
      this.transitionState = "active";
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      // this.transitionState = "active";
      this.service.fadeTo(0, 1, 3000);
      console.log("Start transition ... ");
    }, 2000);
  }
}
