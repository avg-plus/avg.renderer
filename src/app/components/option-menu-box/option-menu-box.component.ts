import {
  Component,
  OnInit,
  OnChanges,
  SimpleChange,
  SimpleChanges,
  AfterViewInit,
  AnimationTransitionEvent,
  ViewChild
} from "@angular/core";

import {
  trigger,
  state,
  style,
  animate,
  transition
} from "@angular/animations";

import * as avg from "avg-engine/engine";
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";

import "gsap";

let TimelineLite = new gsap.TimelineLite();

import { UIAnimation } from "../../common/animations/ui-animation";

@Component({
  selector: "option-menu-box",
  templateUrl: "./option-menu-box.component.html",
  styleUrls: ["./option-menu-box.component.scss"],
  animations: []
})
export class OptionMenuBoxComponent implements OnInit, AfterViewInit {
  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {}
}
