import { OnInit, AfterViewInit, Component } from "@angular/core";
import { GameToolbarService } from "./main-scene.service";
import { AVGGame } from "engine/core/game";
import { AVGArchives } from "engine/core/game-archives";

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
