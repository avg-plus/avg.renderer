import { Component, OnInit, OnDestroy, AfterViewInit, ChangeDetectorRef } from "@angular/core";

import * as avg from "avg-engine/engine";

import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";

import { TransitionLayerService } from "../transition-layer/transition-layer.service";
import { AnimationUtils } from "../../common/animations/animation-utils";
import { DomSanitizer } from "@angular/platform-browser";

import {
  ScreenWidgetType,
  ScreenImage,
  ResourceData,
  WidgetAnimation_FlyInOptions,
  WidgetAnimation_FlyOutOptions,
  Sandbox,
  Character,
  Renderer
} from "avg-engine/engine";
import { WidgetLayerService } from "../widget-layer/widget-layer.service";
import { ImageWidgetComponent } from "../widget-layer/widget-component/image-widget.component";
import { SpriteType } from "app/common/graphics/sprite";

export enum DialogueBoxStatus {
  None,
  Typing,
  Complete,
  End,
  Hidden,

  ChoiceCallback
}

@Component({
  selector: "dialogue-box",
  templateUrl: "./dialogue-box.component.html",
  styleUrls: ["./dialogue-box.component.scss"]
})
export class DialogueBoxComponent implements OnInit, AfterViewInit, OnDestroy {
  public dialogueData: avg.Dialogue;

  public animatedText = "";
  public currentStatus = DialogueBoxStatus.None;
  public currentName = "";
  public typewriterHandle = null;
  public autoPlayDelayHandle = null;
  public subject: Subject<DialogueBoxStatus> = new Subject<DialogueBoxStatus>();
  public choicesSubject: Subject<avg.SelectedDialogueChoice> = new Subject<avg.SelectedDialogueChoice>();

  public dialogueChoices: avg.APIDialogueChoice;
  private isWaitingInput = false;
  private waitingInputTimeoutHandle = undefined;

  private readonly DIALOGUE_BOX_SHOW_DURATION = 300;
  private readonly DIALOGUE_BOX_HIDE_DURATION = 250;

  private readonly MAX_CHARS = 5;

  public character_slot: Array<any>;
  public characters: Array<avg.Character>;

  // @ViewChild("characterContainer") characterContainer: ElementRef;

  constructor(public changeDetectorRef: ChangeDetectorRef, public sanitizer: DomSanitizer) {
    this.character_slot = new Array<any>(5);
    this.characters = new Array<avg.Character>(5);

    this.dialogueData = null;
    // const width = avg.Setting.WindowWidth / 5;

    // for (let i = 0; i < 5; ++i) {
    //   this.character_slot[i] = {
    //     width: width + "px",
    //     left: width * i + "px",
    //     bottom: "100px"
    //   };
    // }
  }

  public reset() {
    this.dialogueData = null;

    this.animatedText = "";
    this.currentStatus = DialogueBoxStatus.None;
    this.currentName = "";
    clearInterval(this.typewriterHandle);
    clearInterval(this.autoPlayDelayHandle);
    this.typewriterHandle = null;
    this.autoPlayDelayHandle = null;

    this.subject = new Subject<DialogueBoxStatus>();
    this.choicesSubject = new Subject<avg.SelectedDialogueChoice>();

    this.dialogueChoices = new avg.APIDialogueChoice();
    TransitionLayerService.FullScreenClickListener.observers = [];
  }

  ngOnInit() {
    TransitionLayerService.FullScreenClickListener.subscribe(_ => {
      // Cancel auto play when click
      avg.Setting.AutoPlay = false;

      this.updateDialogueStatus();
    });
  }

  ngAfterViewInit() {
    // const renderer = new PIXI.WebGLRenderer(800, 600, { transparent: true });
    // // document.getElementById("dialogue-container").appendChild(renderer.view);
    // const stage = new PIXI.Container();
    // const modelHaru = require("app/common/live2d/sample/sampleApp1/assets/live2d/shizuku/shizuku.model.json");
    // const sprite = new PIXI.Sprite(); // PIXI.Sprite.fromImage('assets/graphics/characters/live2d/7_room2_a.jpg');
    // stage.addChild(sprite);
    // const live2dSprite = new PIXI["Live2DSprite"](modelHaru, {
    //   debugLog: true,
    //   randomMotion: true,
    //   eyeBlink: true
    //   // audioPlayer: (...args) => console.log(...args)
    // });
    // stage.addChild(live2dSprite);
    // // live2dSprite.x = -105;
    // // live2dSprite.y = -150;
    // live2dSprite.adjustScale(0, 0, 0.7);
    // live2dSprite.adjustTranslate(0.4, 0);
    // live2dSprite.startRandomMotion("idle");
    // live2dSprite.on("click", evt => {
    //   const point = evt.data.global;
    //   if (live2dSprite.hitTest("body", point.x, point.y)) {
    //     live2dSprite.startRandomMotionOnce("tap_body");
    //   }
    //   if (live2dSprite.hitTest("head", point.x, point.y)) {
    //     // live2dSprite.playSound("星のカケラ.mp3", "sound/");
    //   }
    // });
    // live2dSprite.on("mousemove", evt => {
    //   const point = evt.data.global;
    //   live2dSprite.setViewPoint(point.x, point.y);
    // });
    // function animate() {
    //   requestAnimationFrame(animate);
    //   renderer.render(stage);
    // }
    // animate();
  }

  ngOnDestroy() {
    this.reset();
  }

  public showBox() {
    // Show character
    // if (this.dialogueData.character && this.dialogueData.character.avatar && this.dialogueData.character.avatar.file) {
    //   this.showCharacter(this.dialogueData.character);
    // }

    // Play voice
    if (this.dialogueData.voice && this.dialogueData.voice.length > 0) {
      avg.EngineAPI_Audio.play("_voice", <string>this.dialogueData.voice);
    }

    AnimationUtils.fadeTo(".dialogue-text-box", this.DIALOGUE_BOX_SHOW_DURATION, 1);

    if (this.currentName && this.currentName.length > 0) {
      AnimationUtils.fadeTo(".name-box", this.DIALOGUE_BOX_SHOW_DURATION, 1);
    } else {
      AnimationUtils.fadeTo(".name-box", 0, 0);
    }
  }

  public hideBox() {
    AnimationUtils.fadeTo(".dialogue-text-box", this.DIALOGUE_BOX_HIDE_DURATION, 0, () => {
      this.currentStatus = DialogueBoxStatus.Hidden;
      this.subject.next(DialogueBoxStatus.Hidden);
    });
    AnimationUtils.fadeTo(".name-box", this.DIALOGUE_BOX_HIDE_DURATION, 0);
  }

  // private onCharacterEnter(index: number, character: avg.Character) {
  //   const elementID = "#character-index-" + character.slot;

  //   AnimationUtils.to(
  //     "OnCharacterEnter",
  //     elementID,
  //     this.CHAR_ANIMATION_DURATION,
  //     {
  //       opacity: 1
  //     },
  //     () => {
  //       this.changeDetectorRef.detectChanges();
  //     }
  //   );
  // }

  // private onCharacterLeave(index: number) {
  //   const elementID = "#character-index-" + index;

  //   return new Promise((resolve, reject) => {
  //     AnimationUtils.to(
  //       "CharacterLeaveAnimation",
  //       elementID,
  //       this.CHAR_ANIMATION_DURATION,
  //       {
  //         opacity: 0
  //         // x: this.CHAR_ANIMATION_OFFSET
  //       },
  //       () => {
  //         this.characters[index] = undefined;
  //       }
  //     );

  //     resolve();
  //   });
  // }

  public async showCharacter(api: avg.APICharacter, isUpdate = false) {
    const character = <Character>api.data;

    const image = new ScreenImage();
    image.file = ResourceData.from(api.filename);
    image.renderer = <Renderer>character;
    image.spriteType = SpriteType.Character;
    image.name = api.name;

    if (isUpdate === false) {
      image.animation.name = "flyin";

      const options = new WidgetAnimation_FlyInOptions();
      options.direction = "left";
      options.duration = 500;
      options.offset = 40;
      image.animation.options = options;

      // 跳过模式处理，忽略时间
      if (Sandbox.isSkipMode && Sandbox.skipOptions.dialogues === true) {
        options.duration = 0;
      }
    }

    if (isUpdate) {
      // Remove first
      // await WidgetLayerService.removeWidget(image, avg.ScreenWidgetType.Image, false);
      await WidgetLayerService.updateImage(image.name, image);
    } else {
      WidgetLayerService.addWidget(
        image,
        WidgetLayerService.createWidgetComponent<ImageWidgetComponent>(ImageWidgetComponent),
        avg.ScreenWidgetType.Image,
        false
      );
    }
  }

  public async updateCharacter(api: avg.APICharacter) {
    // const character = api.data;

    await this.showCharacter(api, true);

    // const image = new ScreenImage();
    // image.file = ResourceData.from(character.avatar.file);
    // image.renderer = character.renderer;
    // image.position = character.position;
    // image.id = api.id;

    // const promise = await WidgetLayerService.updateImage(
    //   image.id, image
    // );
  }

  public async hideCharacter(api: avg.APICharacter): Promise<any> {
    const image = new ScreenImage();
    image.name = api.name;
    image.animation.name = "flyout";

    const options = new WidgetAnimation_FlyOutOptions();
    options.direction = "left";
    options.duration = 500;
    options.offset = 40;
    image.animation.options = options;

    // 跳过模式处理，忽略时间
    if (Sandbox.isSkipMode && Sandbox.skipOptions.dialogues === true) {
      options.duration = 0;
    }

    WidgetLayerService.removeWidget(image, ScreenWidgetType.Image, api.isAsync);
  }

  public getTrustedName() {
    return this.sanitizer.bypassSecurityTrustHtml(this.currentName);
  }

  public getTrustedAnimatedText() {
    return this.sanitizer.bypassSecurityTrustHtml(this.animatedText);
  }

  public updateData(data: avg.Dialogue) {
    this.dialogueData = data;
    this.animatedText = "";

    this.changeDetectorRef.detectChanges();

    if (!this.dialogueData) {
      return;
    }

    // @Plugin: OnBeforeShowDialogue
    avg.PluginManager.on(avg.AVGPluginHooks.OnBeforeShowDialogue, data);

    if (data.character && data.name) {
      this.currentName = data.name;
    } else {
      this.currentName = "";
    }

    if (data) {
      this.startTypewriter();
    }
    console.log(`Update dialogue data:`, data);
  }

  public showChoices(api: avg.APIDialogueChoice) {
    // @Plugin: OnBeforeShowChoices
    avg.PluginManager.on(avg.AVGPluginHooks.OnBeforeShowChoices, api);

    this.dialogueChoices = api;
    this.changeDetectorRef.detectChanges();
    TransitionLayerService.lockPointerEvents();
  }

  public onChoiceClicked(index: number, choice: avg.DialogueChoice) {
    const result = new avg.SelectedDialogueChoice();
    result.selectedIndex = index;
    result.selectedText = choice.title;
    this.choicesSubject.next(result);

    this.dialogueChoices = null;
    this.changeDetectorRef.detectChanges();
    TransitionLayerService.releasePointerEvents();
  }

  public onChoiceEnter(index: number) {
    if (this.dialogueChoices.onEnter) {
      setTimeout(
        function() {
          this.dialogueChoices.onEnter(index);
        }.bind(this),
        0
      );
    }
  }

  public onChoiceLeave(index: number) {
    if (this.dialogueChoices.onLeave) {
      this.dialogueChoices.onLeave(index);
    }
  }

  public state(): Observable<DialogueBoxStatus> {
    return this.subject.asObservable();
  }

  private startTypewriter() {
    clearInterval(this.typewriterHandle);
    this.typewriterHandle = null;

    let count = 0;
    this.animatedText = "";
    this.currentStatus = DialogueBoxStatus.Typing;

    let parsingBuffer = "";
    const blockRanges = [];
    // const waitInputIcon = `<img src="data/icons/wait-input.gif" />`;
    const spanTrimRegex = /<ruby>(.*)?<\/ruby>|<span [a-z]+="[0-9a-zA-Z-:!#; ]+"\>|<\/span>|<img.*?\/>|\<b\>|<\/b>|<i>|<\/i>|<del>|<\/del>|<br>|<wait( time="(\d+)")? ?\/>/g;

    if (avg.Setting.TextSpeed > 0) {
      let match = null;
      while ((match = spanTrimRegex.exec(this.dialogueData.text)) !== null) {
        const block = {
          index: match.index,
          block: match[0],
          control_type: "",
          control_value: undefined
        };

        const waitMatch = /<wait( time="(\d+)")? ?\/>/g.exec(match[0]);
        if (waitMatch !== null) {
          block.control_type = "wait";
          block.control_value = 0; // 0 means wait until next input

          // Get wait time
          if (waitMatch[2]) {
            block.control_value = +waitMatch[2];
          }
        }

        blockRanges.push(block);
      }

      this.typewriterHandle = setInterval(() => {
        if (this.isWaitingInput) {
          return;
        }

        if (!this.dialogueData.text) {
          return;
        }

        parsingBuffer = this.dialogueData.text.substr(0, count);

        blockRanges.forEach((value: any) => {
          if (value.index === count) {
            if (value.control_type === "wait") {
              this.isWaitingInput = true;
              if (value.control_value !== 0) {
                this.waitingInputTimeoutHandle = setTimeout(() => {
                  this.isWaitingInput = false;
                }, value.control_value);
              }
            }

            parsingBuffer += value.block;
            count += value.block.length;
            return;
          }
        });

        this.animatedText = parsingBuffer;
        count++;

        this.changeDetectorRef.detectChanges();

        if (count === this.dialogueData.text.length + 1) {
          this.currentStatus = DialogueBoxStatus.Complete;
          this.animatedText = this.dialogueData.text;
          this.changeDetectorRef.detectChanges();

          clearInterval(this.typewriterHandle);

          this.onAutoPlay();
        }
      }, (100 - avg.Setting.TextSpeed) * 2 || 1);
    } else {
      this.currentStatus = DialogueBoxStatus.Complete;
      this.animatedText = this.dialogueData.text;
      this.changeDetectorRef.detectChanges();

      this.onAutoPlay();
    }
  }

  updateDialogueStatus() {
    if (this.currentStatus === DialogueBoxStatus.Complete) {
      this.subject.next(DialogueBoxStatus.End);
    } else if (this.currentStatus === DialogueBoxStatus.Typing) {
      clearTimeout(this.waitingInputTimeoutHandle);
      if (this.isWaitingInput) {
        this.isWaitingInput = false;
        return;
      }
      this.currentStatus = DialogueBoxStatus.Complete;
      clearInterval(this.typewriterHandle);
      this.animatedText = this.dialogueData.text;

      this.onAutoPlay();
    }

    this.changeDetectorRef.detectChanges();
  }

  public onAutoPlay() {
    if (avg.Setting.AutoPlay) {
      clearTimeout(this.autoPlayDelayHandle);
      this.autoPlayDelayHandle = null;

      this.autoPlayDelayHandle = setTimeout(() => {
        this.updateDialogueStatus();
      }, (100 - avg.Setting.AutoPlaySpeed) * 30 || 500);
    }
  }
}
