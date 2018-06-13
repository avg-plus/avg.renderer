import * as fs from "fs";

import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef
} from "@angular/core";
import { ScriptingDispatcher } from "app/common/manager/scripting-dispatcher";
import { BackgroundCanvasComponent } from "app/components/background-canvas/background-canvas.component";
import {
  DialogueBoxComponent,
  DialogueBoxStatus
} from "app/components/dialogue-box/dialogue-box.component";

import { MainSceneService } from "./main-scene.service";

import * as avg from "avg-engine/engine";
import {
  Router,
  ActivatedRoute,
  NavigationEnd,
  CanActivate
} from "@angular/router";
import { SceneHandle } from "avg-engine/engine";
import { DebugingService } from "app/common/debuging-service";
import { WidgetLayerService } from "../widget-layer/widget-layer.service";
import { TransitionLayerService } from "../transition-layer/transition-layer.service";
import { VariableInputComponent } from "../variable-input-box/variable-input-box.component";

@Component({
  selector: "app-main-scene",
  templateUrl: "./main-scene.component.html",
  styleUrls: ["./main-scene.component.scss"]
})
export class MainSceneComponent implements OnInit, AfterViewInit {
  @ViewChild(BackgroundCanvasComponent)
  backgroundCanvas: BackgroundCanvasComponent;

  @ViewChild(DialogueBoxComponent) dialogueBox: DialogueBoxComponent;
  @ViewChild(VariableInputComponent) inputBox: VariableInputComponent;

  private currentScript: string;
  constructor(
    private service: MainSceneService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // Init
    WidgetLayerService.clearAllSubtitle();

    this.dialogueBox.reset();
    this.backgroundCanvas.reset();

    this.activatedRoute.params.subscribe(params => {
      console.log("Received Params:", params);
      this.currentScript = params["script"];
    });
  }

  ngAfterViewInit() {
    this.enterGameProcess();

    for (let i = 0; i < document.styleSheets.length; i++) {
      const sheet = document.styleSheets[i] as CSSStyleSheet;
      console.log(document.styleSheets[i]);

      if (sheet && sheet.cssRules) {
        const rules = sheet.cssRules;
        for (let s = 0; s < rules.length; s++) {
          // if (rules[s] instanceof CSSStyleRule) {
            // console.log(rules[s]);
          // }
        }
      }

      // console.log(sheet);
      // if (sheet.title === "unique_title") {
      // return sheet;
      // }
    }
  }

  private async enterGameProcess() {
    const game = avg.game;
    game.start(this.currentScript);
    // avg.game.start(this.currentScript);

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
            this.dialogueBox.showCharacter(value.api.data);
            value.resolver();
          } else if (value.op === avg.OP.HideCharacter) {
            this.dialogueBox.hideCharacter(value.api.data).then(
              () => {
                value.resolver();
              },
              _ => {}
            );
          }
        } else if (value.api instanceof avg.APIScene) {
          if (value.op === avg.OP.LoadScene) {
            // Load scene didn't support sync mode anymore
            this.backgroundCanvas.setBackground(value.api).then(
              () => {
                const scenHandle = new avg.SceneHandle();
                scenHandle.index = 0;
                value.resolver(scenHandle);
              },
              _ => {}
            );
          } else if (value.op === avg.OP.RemoveScene) {
            const index = value.api.index;
            this.backgroundCanvas.removeBackground(index);

            value.resolver();
          }
        } else if (value.api instanceof avg.APIEffect) {
          if (value.op === avg.OP.PlayEffect) {
            const effect = value.api.data;

            switch (effect.effectName) {
              case "shake":
                this.backgroundCanvas.shake();
                value.resolver();

                break;
              case "rain":
                this.backgroundCanvas.rain();
                value.resolver();

                break;
              case "snow":
                this.backgroundCanvas.snow();
                value.resolver();

                break;
              case "cloud":
                this.backgroundCanvas.cloud();
                value.resolver();

                break;
              case "sakura":
                this.backgroundCanvas.sakura();
                value.resolver();

                break;
              default:
                this.backgroundCanvas
                  .cssFilter(effect)
                  .then(value.resolver, _ => {});
            }
          }
        } else if (value.api instanceof avg.APIGotoTitleView) {
          this.router.navigate(["title-view"]);
          value.resolver();
        } else if (value.api instanceof avg.APIInputBox) {
          this.inputBox.show(value.api.data, (isOk, inputValue) => {
            console.log(isOk, inputValue);

            const result = new avg.InputBoxResult();
            result.isOK = isOk;
            result.value = inputValue;

            value.resolver(result);
          });
        }
      }
    );
  }
}
