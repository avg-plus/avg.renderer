import * as path from "path";
import * as fs from "fs";

import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { transition } from "app/common/manager/transition";
import { ScriptingDispatcher } from "app/common/manager/scripting-dispatcher";
import { BackgroundCanvasComponent } from "app/components/background-canvas/background-canvas.component";
import {
  DialogueBoxComponent,
  DialogueBoxStatus
} from "app/components/dialogue-box/dialogue-box.component";

import { MainSceneService } from "./main-scene.service";

import * as avg from "avg-engine/engine";
import { Router } from "@angular/router";
import { SceneHandle } from "avg-engine/engine";

@Component({
  selector: "app-main-scene",
  templateUrl: "./main-scene.component.html",
  styleUrls: ["./main-scene.component.scss"]
})
export class MainSceneComponent implements OnInit, AfterViewInit {
  @ViewChild(BackgroundCanvasComponent)
  backgroundCanvas: BackgroundCanvasComponent;
  @ViewChild(DialogueBoxComponent) dialogueBox: DialogueBoxComponent;

  constructor(private service: MainSceneService, private router: Router) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.enterGameProcess();
  }

  private async enterGameProcess() {
    // start game for test
    const entryScript =
      avg.Resource.getPath(avg.ResourcePath.Scripts) + "/story.avs";
    // const entryScript =
    // avg.Resource.getPath(avg.ResourcePath.Scripts) + "/subtitle-test.avs";
    avg.game.start(entryScript);
    // =======

    ScriptingDispatcher.watch().subscribe(
      (value: { api: avg.AVGScriptUnit; op: string; resolver: any }) => {
        if (value.api instanceof avg.APIDialogue) {
          this.dialogueBox.state().subscribe(state => {
            if (
              state === DialogueBoxStatus.End ||
              state === DialogueBoxStatus.Hidden
            ) {
              value.resolver();
            }
          });

          if (value.op === avg.OP.ShowText) {
            this.dialogueBox.updateData(value.api.data);
            this.dialogueBox.showBox();
          } else if (value.op === avg.OP.HideText) {
            this.dialogueBox.updateData(null);
            this.dialogueBox.hideBox();
          }
        } else if (value.api instanceof avg.APIDialogueChoice) {
          if (value.op === avg.OP.ShowChioce) {
            this.dialogueBox.showChoices(value.api);
            this.dialogueBox.choicesSubject.subscribe(result => {
              value.resolver(result);
            });
          }
        } else if (value.api instanceof avg.APICharacter) {
          if (value.op === avg.OP.ShowCharacter) {
            this.dialogueBox.showCharacter(value.api);
          } else if (value.op === avg.OP.HideCharacter) {
            this.dialogueBox.hideCharacter(value.api);
          }

          value.resolver();
        } else if (value.api instanceof avg.APIScene) {
          if (value.op === avg.OP.LoadScene) {
            if (value.api.data.block) {
              this.backgroundCanvas.setBackground(value.api).then(
                () => {
                  const scenHandle = new avg.SceneHandle();
                  scenHandle.index = 0;
                  value.resolver(scenHandle);
                },
                _ => {}
              );

              // this.backgroundCanvas.loadParticleEffect();
            } else {
              this.backgroundCanvas.setBackground(value.api);

              let scenHandle = new avg.SceneHandle();
              scenHandle.index = 0;
              value.resolver(scenHandle);
            }
          }
        } else if (value.api instanceof avg.APIEffect) {
          if (value.op === avg.OP.PlayEffect) {
            const effect = value.api.data;

            console.log("current effect:", effect);
            if (effect.effectName === "shake") {
              this.backgroundCanvas.shake();
            } else if (effect.effectName === "rain") {
              this.backgroundCanvas.rain();
            } else if (effect.effectName === "snow") {
              this.backgroundCanvas.snow();
            } else if (effect.effectName === "blur") {
              this.backgroundCanvas.blur(value.api.index, effect);
            } else if (effect.effectName === "transparent") {
              this.backgroundCanvas.transparent(
                value.api.index,
                effect.strength,
                effect.duration
              );
            } else if (effect.effectName === "moveTo") {
              this.backgroundCanvas.moveTo(value.api.index, 10000, -10000);
            }
            value.resolver();
          }
        } else if (value.api instanceof avg.APIGotoTitleView) {
          this.router.navigate(["title-view"]);
          value.resolver();
        }
      }
    );
  }
}
