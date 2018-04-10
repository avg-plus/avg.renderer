import { Injectable, Output } from "@angular/core";
import { AVGService } from "../../common/avg-service";
import { EventEmitter } from "events";
import { SceneAnimation } from "app/common/animations/scene-animation";

@Injectable()
export class TransitionLayerService extends AVGService {
  @Output() change: EventEmitter = new EventEmitter();

  public static fadeTo(
    to: number = 1,
    duration: number = 500,
    complete?: () => void
  ) {
    SceneAnimation.fadeTo("#transition-container", to, duration, complete);
  }
}
