import { OnInit, AfterViewInit, Component } from "@angular/core";
import { GameToolbarService } from "./main-scene.service";
import { api, Sandbox, Setting, AVGArchives } from "avg-engine/engine";

@Component({
  selector: "game-toolbar",
  templateUrl: "./game-toolbar.component.html",
  styleUrls: ["./game-toolbar.component.scss"],
  animations: []
})
export class GameToolbarComponent implements OnInit, AfterViewInit {
  private service = GameToolbarService;
  constructor() { }

  ngOnInit() { }

  ngAfterViewInit() { }

  onSkipClicked() {
    console.log("On skip clicked");

    // if (!Sandbox.isSkipMode) {
    //   api.startSkip();
    // } else {
    //   api.stopSkip();
    // }
  }

  onSaveClicked() {
    AVGArchives.saveArchive(0, "");
  }
}
