import { CharacterScriptingHandler } from "./../../scripting-handlers/character-handler";
import { GameWorld } from "engine/core/graphics/world";
import * as fs from "fs";

import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef, ElementRef } from "@angular/core";
import { ScriptingDispatcher } from "app/common/manager/scripting-dispatcher";
import { DialogueBoxComponent, DialogueBoxStatus } from "app/components/dialogue-box/dialogue-box.component";

import { MainSceneService } from "./main-scene.service";

import { Router, ActivatedRoute, NavigationEnd, CanActivate } from "@angular/router";
import { WidgetLayerService } from "../widget-layer/widget-layer.service";
import { TransitionLayerService } from "../transition-layer/transition-layer.service";
import { VariableInputComponent } from "../variable-input-box/variable-input-box.component";
import { CameraDirector } from "../../common/animations/camera-director";
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
import { SceneHandler } from "app/scripting-handlers/scene-handler";
import { DomSanitizer } from "@angular/platform-browser";
import { Setting } from "engine/core/setting";

@Component({
  selector: "app-main-scene",
  templateUrl: "./main-scene.component.html",
  styleUrls: ["./main-scene.component.scss"]
})
export class MainSceneComponent implements OnInit, AfterViewInit {
  @ViewChild(DialogueBoxComponent)
  dialogueBox: DialogueBoxComponent;
  @ViewChild(VariableInputComponent)
  inputBox: VariableInputComponent;

  private currentScript: string;

  constructor(
    private service: MainSceneService,
    private elementRef: ElementRef,
    public sanitizer: DomSanitizer,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // Init
    WidgetLayerService.clearAllSubtitle();
    this.dialogueBox.reset();

    const viewport = this.elementRef.nativeElement.querySelector("#avg-viewport");

    // Init world
    GameWorld.init(viewport, Setting.WindowWidth, Setting.WindowHeight);

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

    ScriptingDispatcher.watch().subscribe(
      async (scriptingContext: { api: AVGScriptUnit; op: string; resolver: any }) => {
        if (scriptingContext.api instanceof APIDialogue) {
          this.dialogueBox.state().subscribe(state => {
            if (state === DialogueBoxStatus.End || state === DialogueBoxStatus.Hidden) {
              scriptingContext.resolver();
            }
          });

          if (scriptingContext.op === OP.ShowText) {
            this.dialogueBox.updateData(<Dialogue>scriptingContext.api.data);
            this.dialogueBox.showBox();
          } else if (scriptingContext.op === OP.HideText) {
            this.dialogueBox.updateData(null);
            this.dialogueBox.hideBox();
          }
        } else if (scriptingContext.api instanceof APIDialogueChoice) {
          if (scriptingContext.op === OP.ShowChioce) {
            this.dialogueBox.showChoices(scriptingContext.api);
            this.dialogueBox.choicesSubject.subscribe(result => {
              scriptingContext.resolver(result);
            });
          }
        } else if (scriptingContext.api instanceof APICharacter) {
          if (scriptingContext.op === OP.ShowCharacter) {
            CharacterScriptingHandler.handleShowCharacter(scriptingContext);
          } else if (scriptingContext.op === OP.UpdateCharacter) {
            CharacterScriptingHandler.handleUpdateCharacter(scriptingContext);
          } else if (scriptingContext.op === OP.HideCharacter) {
            CharacterScriptingHandler.handleHideCharacter(scriptingContext);
          } else if (scriptingContext.op === OP.AnimateCharacter) {
            CharacterScriptingHandler.handleAnimateCharacter(scriptingContext);
          }
        } else if (scriptingContext.api instanceof APIScene) {
          if (scriptingContext.op === OP.LoadScene) {
            await SceneHandler.handleLoadScene(scriptingContext);
          } else if (scriptingContext.op === OP.RemoveScene) {
            await SceneHandler.handleRemoveScene(scriptingContext);
          } else if (scriptingContext.op === OP.SetSceneFilter) {
            await SceneHandler.handleSetSceneFilter(scriptingContext);
          } else if (scriptingContext.op === OP.AnimateScene) {
            await SceneHandler.handleAnimateScene(scriptingContext);
          } else if (scriptingContext.op === OP.ClearSceneFilter) {
            await SceneHandler.handleClearFilters(scriptingContext);
          }
        } else if (scriptingContext.api instanceof APIEffect) {
          // if (scriptingContext.op === OP.PlayEffect) {
          //   const effect = scriptingContext.api.data;
          //   switch (effect.effectName) {
          //     case "shake":
          //       this.backgroundCanvas.shake();
          //       scriptingContext.resolver();
          //       break;
          //     case "rain":
          //       this.backgroundCanvas.rain();
          //       scriptingContext.resolver();
          //       break;
          //     case "snow":
          //       this.backgroundCanvas.snow();
          //       scriptingContext.resolver();
          //       break;
          //     case "cloud":
          //       this.backgroundCanvas.cloud();
          //       scriptingContext.resolver();
          //       break;
          //     case "sakura":
          //       this.backgroundCanvas.sakura();
          //       scriptingContext.resolver();
          //       break;
          //     default:
          //       this.backgroundCanvas.cssFilter(effect).then(scriptingContext.resolver, _ => {});
          //   }
          // }
        } else if (scriptingContext.api instanceof APIGotoTitleView) {
          this.router.navigate(["title-view"]);
          scriptingContext.resolver();
        } else if (scriptingContext.api instanceof APIInputBox) {
          this.inputBox.show(scriptingContext.api.data, (isOk, inputValue) => {
            console.log(isOk, inputValue);

            const result = new InputBoxResult();
            result.isOK = isOk;
            result.value = inputValue;

            scriptingContext.resolver(result);
          });
        } else if (scriptingContext.api instanceof APICameraMove) {
          const director = new CameraDirector();
          const api = <APICameraMove>scriptingContext.api;
          director.moveTo(scriptingContext.api.layer, scriptingContext.api.data, scriptingContext.api.duration || 0);
          scriptingContext.resolver();
        } else if (scriptingContext.api instanceof APICameraShake) {
          const data = <CameraShakeData>scriptingContext.api.data;
          // this.shakeStyle = {
          //   horizontal: data.horizontal, // X 轴震动幅度
          //   vertical: data.vertical, // Y 轴震动幅度
          //   rotation: data.rotation, // 旋转幅度
          //   duration: data.duration, // 每次震动持续时间
          //   quantity: data.count, // 总震动次数
          //   timingFunc: "ease-in-out",
          //   interval: 1,
          //   max: 100,
          //   transformOrigin: "center center",
          //   fixed: true,
          //   fixedStop: false,
          //   freez: false,
          //   active: false,
          //   trigger: ":active",
          //   elem: "div"
          // };

          // this.changeDetectorRef.detectChanges();

          scriptingContext.resolver();
        }
      }
    );
  }
}
