import { GameWorld } from "engine/core/graphics/world";
import * as fs from "fs";

import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { ScriptingDispatcher } from "app/common/manager/scripting-dispatcher";
import { BackgroundCanvasComponent } from "app/components/background-canvas/background-canvas.component";
import { DialogueBoxComponent, DialogueBoxStatus } from "app/components/dialogue-box/dialogue-box.component";

import { MainSceneService } from "./main-scene.service";

import { Router, ActivatedRoute, NavigationEnd, CanActivate } from "@angular/router";
import { WidgetLayerService } from "../widget-layer/widget-layer.service";
import { TransitionLayerService } from "../transition-layer/transition-layer.service";
import { VariableInputComponent } from "../variable-input-box/variable-input-box.component";
import { CameraDirector } from "../../common/animations/camera-director";
import { ShakeStyle } from "../../common/effects/shake/interface/shake";
import { AVGPlusIPC } from "../../common/manager/avgplus-ipc";
import { AVGGame, GameStatus } from "engine/core/game";

import { OP } from "engine/const/op";
import { InputBoxResult } from "engine/data/input-data";
import { CameraShakeData } from "engine/data/camera-data";
import { Dialogue } from "engine/data/dialogue";
import { AVGScriptUnit } from "engine/scripting/script-unit";
import { APIDialogue } from "engine/scripting/api/api-dialogue";
import { APIDialogueChoice } from "engine/scripting/api/api-dialogue-choices";
import { APICharacter } from "engine/scripting/api/api-character";
import { APIScene, SceneHandle } from "engine/scripting/api/api-scene";
import { APIEffect } from "engine/scripting/api/api-effect";
import { APIGotoTitleView } from "engine/scripting/api/api-title-view";
import { APIInputBox } from "engine/scripting/api/api-input-box";
import { APICameraMove, APICameraShake } from "engine/scripting/api/api-camera";
import { SpriteAnimateDirector, AnimateTargetType } from "engine/core/graphics/sprite-animate-director";
import { APIAnimateCharacter } from "engine/scripting/api/api-animate-character";

@Component({
  selector: "app-main-scene",
  templateUrl: "./main-scene.component.html",
  styleUrls: ["./main-scene.component.scss"]
})
export class MainSceneComponent implements OnInit, AfterViewInit {
  @ViewChild(BackgroundCanvasComponent)
  backgroundCanvas: BackgroundCanvasComponent;

  @ViewChild(DialogueBoxComponent)
  dialogueBox: DialogueBoxComponent;
  @ViewChild(VariableInputComponent)
  inputBox: VariableInputComponent;

  private currentScript: string;

  shakeStyle: ShakeStyle = null;

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

    AVGGame.setGameStatus(GameStatus.Loaded);
    AVGPlusIPC.onGameEngineLoaded();
  }

  private async enterGameProcess() {
    const game = AVGGame.getInstance();
    game.start(this.currentScript);

    // game.start(this.currentScript);

    ScriptingDispatcher.watch().subscribe(async (value: { api: AVGScriptUnit; op: string; resolver: any }) => {
      if (value.api instanceof APIDialogue) {
        this.dialogueBox.state().subscribe(state => {
          if (state === DialogueBoxStatus.End || state === DialogueBoxStatus.Hidden) {
            value.resolver();
          }
        });

        if (value.op === OP.ShowText) {
          this.dialogueBox.updateData(<Dialogue>value.api.data);
          this.dialogueBox.showBox();
        } else if (value.op === OP.HideText) {
          this.dialogueBox.updateData(null);
          this.dialogueBox.hideBox();
        }
      } else if (value.api instanceof APIDialogueChoice) {
        if (value.op === OP.ShowChioce) {
          this.dialogueBox.showChoices(value.api);
          this.dialogueBox.choicesSubject.subscribe(result => {
            value.resolver(result);
          });
        }
      } else if (value.api instanceof APICharacter) {
        if (value.op === OP.ShowCharacter) {
          await this.dialogueBox.showCharacter(value.api);
          value.resolver();
        } else if (value.op === OP.UpdateCharacter) {
          this.dialogueBox.showCharacter(value.api, true);
          value.resolver();
        } else if (value.op === OP.HideCharacter) {
          this.dialogueBox.hideCharacter(value.api).then(
            () => {
              value.resolver();
            },
            _ => {}
          );
        }
      } else if (value.api instanceof APIAnimateCharacter) {
        if (value.op === OP.AnimateCharacter) {
          SpriteAnimateDirector.playAnimationMacro(
            AnimateTargetType.Sprite,
            GameWorld.defaultScene.getSpriteByName(value.api.id),
            value.api.animation
          );

          value.api.animation;

          value.resolver();
        }
      } else if (value.api instanceof APIScene) {
        if (value.op === OP.LoadScene) {
          // Load scene didn't support sync mode anymore
          this.backgroundCanvas.setBackground(value.api).then(
            () => {
              const scenHandle = new SceneHandle();
              scenHandle.index = 0;
              value.resolver(scenHandle);
            },
            _ => {}
          );
        } else if (value.op === OP.RemoveScene) {
          const index = value.api.index;
          this.backgroundCanvas.removeBackground();

          value.resolver();
        }
      } else if (value.api instanceof APIEffect) {
        if (value.op === OP.PlayEffect) {
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
              this.backgroundCanvas.cssFilter(effect).then(value.resolver, _ => {});
          }
        }
      } else if (value.api instanceof APIGotoTitleView) {
        this.router.navigate(["title-view"]);
        value.resolver();
      } else if (value.api instanceof APIInputBox) {
        this.inputBox.show(value.api.data, (isOk, inputValue) => {
          console.log(isOk, inputValue);

          const result = new InputBoxResult();
          result.isOK = isOk;
          result.value = inputValue;

          value.resolver(result);
        });
      } else if (value.api instanceof APICameraMove) {
        const director = new CameraDirector();
        const api = <APICameraMove>value.api;
        director.moveTo(value.api.layer, value.api.data, value.api.duration || 0);
        value.resolver();
      } else if (value.api instanceof APICameraShake) {
        const data = <CameraShakeData>value.api.data;
        this.shakeStyle = {
          horizontal: data.horizontal, // X 轴震动幅度
          vertical: data.vertical, // Y 轴震动幅度
          rotation: data.rotation, // 旋转幅度
          duration: data.duration, // 每次震动持续时间
          quantity: data.count, // 总震动次数
          timingFunc: "ease-in-out",
          interval: 1,
          max: 100,
          transformOrigin: "center center",
          fixed: true,
          fixedStop: false,
          freez: false,
          active: false,
          trigger: ":active",
          elem: "div"
        };

        this.changeDetectorRef.detectChanges();

        value.resolver();
      }
    });
  }
}
