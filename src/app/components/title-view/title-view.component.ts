import { ElementRef, Component, OnInit, AfterViewInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";

import { TitleViewService, TitleMenuEvent } from "./title-view.service";
import { BackgroundCanvasComponent } from "app/components/background-canvas/background-canvas.component";

import { AnimationUtils } from "../../common/animations/animation-utils";
import { Resource, ResourcePath } from "engine/core/resource";
import { ResourceData } from "engine/data/resource-data";
import { APIScene } from "engine/scripting/api/api-scene";

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
  constructor(public service: TitleViewService, private router: Router) {}

  ngOnInit() {
    // Start listen
    this.service.menuEvent().subscribe(index => {
      switch (index) {
        case TitleMenuEvent.Start:
          // api.pauseBGM();
          const entryScript = Resource.getPath(ResourcePath.Scripts) + "/tutorial/new.avs";
          this.router.navigate(["main-scene", { script: entryScript }]).then(() => {
            // TransitionLayerService.fadeTo(0, 1000);
          });
          // TransitionLayerService.fadeTo(1, 1000, () => {

          // });
          break;
      }
    });
  }

  ngAfterViewInit() {
    // api.playBGM("title.mp3", undefined);

    AnimationUtils.to("[Animate Title Menu]", "#avg-title-menu-layer", 3000, {
      opacity: 1,
      y: 30
    });

    this.titleViewBackgroundCanvas.snow();
  }
}
