import { OnInit, AfterViewInit, Component } from "@angular/core";
import { GameToolbarService } from "./main-scene.service";
import { Sandbox, Setting, AVGArchives, AVGGame, EngineAPI_Flow } from "avg-engine/engine";

@Component({
  selector: "game-toolbar",
  templateUrl: "./game-toolbar.component.html",
  styleUrls: ["./game-toolbar.component.scss"],
  animations: []
})
export class GameToolbarComponent implements OnInit, AfterViewInit {
  private service = GameToolbarService;
  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {}

  async onResetClicked() {
    await AVGGame.getInstance().resetGame();
  }

  // async onSkipClicked() {
  //   if (!Sandbox.isSkipMode) {
  //     await EngineAPI_Flow.startSkip();
  //   } else {
  //     await api.stopSkip();
  //   }
  // }

  onSaveClicked() {
    AVGArchives.saveArchive(0, "");
  }
}
