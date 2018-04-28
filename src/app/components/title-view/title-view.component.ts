import {
  ElementRef,
  Component,
  OnInit,
  AfterViewInit,
  ViewChild
} from "@angular/core";
import { Router } from "@angular/router";
import * as PIXI from "pixi.js";
import * as avg from "avg-engine/engine";
import { transition } from "app/common/manager/transition";
import { UIAnimation } from "app/common/animations/ui-animation";

import { TitleViewService, TitleMenuEvent } from "./title-view.service";
import { BackgroundCanvasComponent } from "app/components/background-canvas/background-canvas.component";

import * as gsap from "gsap";
import { TransitionLayerService } from "../transition-layer/transition-layer.service";
import { ParticleEffect } from "../../common/effects/effect-snow";
import { AnimationUtils } from "../../common/animations/animation-utils";

@Component({
  selector: "title-view",
  templateUrl: "./title-view.component.html",
  styleUrls: ["./title-view.component.scss"],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    "(document:keydown)": "service.handleKeyboardEvents($event)"
  }
})
export class TitleViewComponent implements OnInit, AfterViewInit {
  @ViewChild(BackgroundCanvasComponent)
  titleViewBackgroundCanvas: BackgroundCanvasComponent;
  constructor(
    public service: TitleViewService,
    private router: Router,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    // Start listen
    this.service.menuEvent().subscribe(index => {
      switch (index) {
        case TitleMenuEvent.Start:
          avg.api.stopBGM(null);
          TransitionLayerService.fadeTo(1, 1000, () => {
            const entryScript =
              avg.Resource.getPath(avg.ResourcePath.Scripts) + "/tutorial.avs";
            this.router
              .navigate(["main-scene", { script: entryScript }])
              .then(result => {
                TransitionLayerService.fadeTo(0, 1000);
              });
          });
          break;
      }
    });
  }

  ngAfterViewInit() {
    avg.api.playBGM("assets/audio/bgm/title.mp3", null);

    // AnimationUtils.fadeTo("#avg-title-menu-layer", 3000, 1);
    AnimationUtils.to("[Animate Title Menu]", "#avg-title-menu-layer", 3000, {
      opacity: 1,
      y: 30
    });

    const titleScene = new avg.APIScene();
    titleScene.data.file = avg.ResourceData.from(
      "assets/graphics/backgrounds/forest-2.jpg"
    );
    titleScene.index = 1;
    this.titleViewBackgroundCanvas.setBackground(titleScene);

    this.titleViewBackgroundCanvas.snow();
  }
}
