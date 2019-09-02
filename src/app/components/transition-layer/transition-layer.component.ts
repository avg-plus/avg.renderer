import { Component, OnInit, AfterViewInit, ElementRef } from "@angular/core";

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
