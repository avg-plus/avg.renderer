import { Injectable, Output } from "@angular/core";
import { AVGService } from "../../common/avg-service";
import { EventEmitter } from "events";

@Injectable()
export class TransitionCanvasService extends AVGService {
  @Output() change: EventEmitter = new EventEmitter();

  public fadeTo(from: number = 0, to: number = 1, timings: number = 500) {
    this.change.emit("fadeTo", from, to, timings);
  };
}
