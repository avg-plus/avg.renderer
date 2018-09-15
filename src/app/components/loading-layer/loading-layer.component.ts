import { AfterViewInit, Component, OnInit } from "@angular/core";
import { LoadingLayerService } from "./loading-layer.service";

declare var ldBar: any;

@Component({
  selector: "loading-layer",
  templateUrl: "./loading-layer.component.html",
  styleUrls: ["./loading-layer.component.scss"]
})
export class LoadingLayerComponent implements OnInit, AfterViewInit {
  service = LoadingLayerService;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }
}
