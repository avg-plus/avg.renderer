import { OnInit, AfterViewInit, Component } from "@angular/core";
import { GameToolbarService } from "./main-scene.service";
import { api, Sandbox, Setting, AVGArchives, AVGGame } from "avg-engine/engine";

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

  async onResetClicked() {
    await AVGGame.getInstance().resetGame();
  }

  async onSkipClicked() {

    if (!Sandbox.isSkipMode) {
      await api.startSkip();
    } else {
      await api.stopSkip();
    }
  }

  onSaveClicked() {
    AVGArchives.saveArchive(0, "");
  }
}
