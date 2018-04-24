import * as fs from "fs";

import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef
} from "@angular/core";
import { transition } from "app/common/manager/transition";
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
  RouteReuseStrategy
} from "@angular/router";
import { SceneHandle } from "avg-engine/engine";
import { DebugingService } from "app/common/debuging-service";
import { WidgetLayerService } from "../widget-layer/widget-layer.service";
import { TransitionLayerService } from "../transition-layer/transition-layer.service";
import { AARouteReuseStrategy } from "../../common/route-reuse-strategy";
import { VariableInputComponent } from "../variable-input-box/variable-input-box.component";

@Component({
  selector: "app-main-scene",
  templateUrl: "./main-scene.component.html",
  styleUrls: ["./main-scene.component.scss"],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: AARouteReuseStrategy
    }
  ]
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
  }

  private async enterGameProcess() {
    const game = new avg.AVGGame();
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
            } else {
              this.backgroundCanvas.setBackground(value.api);

              const scenHandle = new avg.SceneHandle();
              scenHandle.index = 0;
              value.resolver(scenHandle);
            }
          }
        } else if (value.api instanceof avg.APIEffect) {
          if (value.op === avg.OP.PlayEffect) {
            const effect = value.api.data;

            if (effect.effectName === "shake") {
              this.backgroundCanvas.shake();
            } else if (effect.effectName === "rain") {
              this.backgroundCanvas.rain();
            } else if (effect.effectName === "snow") {
              this.backgroundCanvas.snow();
            } else if (effect.effectName === "blur") {
              this.backgroundCanvas.blur(value.api.index, effect);
            } else if (effect.effectName === "hue") {
              this.backgroundCanvas.hueRotate(value.api.index, effect);
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
