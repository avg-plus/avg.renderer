import {
  Component,
  OnInit,
  OnChanges,
  SimpleChange,
  SimpleChanges,
  AfterViewInit,
  AnimationTransitionEvent,
  ViewChild
} from "@angular/core";

import {
  trigger,
  state,
  style,
  animate,
  transition
} from "@angular/animations";

import * as avg from "avg-engine/engine";
import * as gsap from "gsap";

import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";

// import "app/common/live2d/lib/live2d.min.js";
// import "pixi-live2d";

// import * as gsap from 'gsap';
import "gsap";

// let TimelineLite = new gsap.TimelineLite();

import { UIAnimation } from "../../common/animations/ui-animation";
import { TransitionLayerService } from "../transition-layer/transition-layer.service";

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
export class DialogueBoxComponent implements OnInit, AfterViewInit {
  public dialogueData: avg.Dialogue;

  public animatedText = "";
  public currentStatus = DialogueBoxStatus.None;
  public currentName = "";
  public typewriterHandle = null;
  public autoPlayDelayHandle = null;
  public subject: Subject<DialogueBoxStatus> = new Subject<DialogueBoxStatus>();
  public choicesSubject: Subject<avg.SelectedDialogueChoice> = new Subject<
    avg.SelectedDialogueChoice
  >();

  public dialogueChoices: avg.APIDialogueChoice;

  // Animation constant
  private readonly CHAR_ANIMATION_DURATION = 0.5;
  private readonly CHAR_ANIMATION_OFFSET = -30;

  public character_slot: Array<any>;
  public characters: Array<avg.APICharacter>;

  constructor() {
    this.character_slot = new Array<any>(5);
    this.characters = new Array<avg.APICharacter>(5);

    let width = avg.Setting.WindowWidth / 5;

    for (let i = 0; i < 5; ++i) {
      this.character_slot[i] = {
        width: width + "px",
        left: width * i + "px",
        bottom: "100px"
      };
    }
  }

  ngOnInit() {
    TransitionLayerService.FullScreenClickListener.subscribe(_ => {
      this.updateDialogueStatus();
    });
  }

  ngAfterViewInit() {
    // const renderer = new PIXI.WebGLRenderer(800, 600);
    // document.getElementById("#character-box").appendChild(renderer.view);
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
    // live2dSprite.x = -105;
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
    //     live2dSprite.playSound("星のカケラ.mp3", "sound/");
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

  public showBox() {
    gsap.TweenLite.to(".dialogue-box", 1, {
      opacity: 1
    });

    if (this.currentName && this.currentName.length > 0) {
      gsap.TweenLite.to(".name-box", 1, {
        opacity: 1
      });
    }
  }

  private initOpacity(index: number): gsap.TweenLite {
    let elementID = "#character-index-" + index;

    return gsap.TweenLite.to(elementID, 0, {
      opacity: 0,
      x: this.CHAR_ANIMATION_OFFSET
    });
  }

  private onCharacterEnter(
    index: number,
    character: avg.APICharacter
  ): gsap.TweenLite {
    let elementID = "#character-index-" + character.index;

    console.log(index, character);

    return gsap.TweenLite.to(elementID, this.CHAR_ANIMATION_DURATION, {
      opacity: 1,
      x: 0
    });
  }

  private onCharacterLeave(index: number): gsap.TweenLite {
    let elementID = "#character-index-" + index;

    return gsap.TweenLite.to(elementID, this.CHAR_ANIMATION_DURATION, {
      opacity: 0,
      x: this.CHAR_ANIMATION_OFFSET
    });
  }

  public showCharacter(character: avg.APICharacter) {
    if (
      this.characters[character.index] === null ||
      this.characters[character.index] === undefined
    ) {
      this.initOpacity(character.index);
      this.characters[character.index] = character;
      this.onCharacterEnter(character.index, character);
    } else {
      this.onCharacterLeave(character.index).eventCallback("onComplete", () => {
        this.characters[character.index] = character;
        this.onCharacterEnter(character.index, character);
      });
    }
  }

  public hideCharacter(character: avg.APICharacter) {
    if (character.index === -1) {
      for (let i = 0; i < this.characters.length; ++i) {
        this.onCharacterLeave(i);
      }
    } else {
      this.onCharacterLeave(character.index);
    }
  }

  public hideBox() {
    // this.dialogueBoxState = "inactive";
    // this.textState = "inactive";
    // this.characterState = "inactive";

    gsap.TweenLite.to(".dialogue-box", 1, {
      opacity: 0
    });

    gsap.TweenLite.to(".name-box", 1, {
      opacity: 0
    });

    this.currentStatus = DialogueBoxStatus.Hidden;
    this.subject.next(DialogueBoxStatus.Hidden);
  }

  public updateData(data: avg.Dialogue) {
    this.dialogueData = data;
    this.animatedText = "";

    if (!this.dialogueData) {
      return;
    }

    if (data.character && data.character.name) {
      this.currentName = data.character.name;
    }

    avg.PluginManager.on(avg.PluginEvents.OnBeforeDialogue, data);

    if (data) {
      this.startTypewriter();
    }
    console.log(`Update dialogue data:`, data);
  }

  public showChoices(data: avg.APIDialogueChoice) {
    TransitionLayerService.lockPointerEvents();
    this.dialogueChoices = data;
  }

  public onChoiceClicked(index: number, choice: avg.DialogueChoice) {
    let result = new avg.SelectedDialogueChoice();
    result.selectedIndex = index;
    result.selectedTitle = choice.title;
    this.choicesSubject.next(result);

    this.dialogueChoices = null;

    TransitionLayerService.releasePointerEvents();
  }

  public state(): Observable<DialogueBoxStatus> {
    return this.subject.asObservable();
  }

  private startTypewriter(speed: number = 30) {
    let count = 0;
    this.animatedText = "";
    this.currentStatus = DialogueBoxStatus.Typing;

    let parsingBuffer = "";
    let resultBuffer = "";
    let blockRanges = [];
    const spanTrimRegex = /<font [a-z]+=[a-zA-Z0-9#]+\>|<\/font>|<img.*?\/>|\<b\>|<\/b>|<i>|<\/i>|<del>|<\/del>/g;

    if (avg.Setting.TextSpeed > 0) {
      let match = null;
      while ((match = spanTrimRegex.exec(this.dialogueData.text)) !== null) {
        blockRanges.push({ index: match.index, block: match[0] });
      }

      this.typewriterHandle = setInterval(() => {
        let inSpan = false;
        let inSpanStartPos = -1;
        parsingBuffer = this.dialogueData.text.substr(0, count);

        blockRanges.forEach((value: any) => {
          if (value.index === count) {
            parsingBuffer += value.block;
            count += value.block.length;
            return;
          }
        });

        this.animatedText = parsingBuffer;
        count++;

        if (count === this.dialogueData.text.length + 1) {
          this.currentStatus = DialogueBoxStatus.Complete;
          this.animatedText = this.dialogueData.text;

          clearInterval(this.typewriterHandle);

          this.onAutoPlay();

          return;
        }
      }, (100 - avg.Setting.TextSpeed) * 2 || 1);
    } else {
      this.currentStatus = DialogueBoxStatus.Complete;
      this.animatedText = this.dialogueData.text;

      this.onAutoPlay();
    }
  }

  animationDone($event: AnimationTransitionEvent) {}

  onBoxClicked($event) {
    this.updateDialogueStatus();
  }

  updateDialogueStatus() {
    if (this.currentStatus === DialogueBoxStatus.Complete) {
      this.subject.next(DialogueBoxStatus.End);
    } else if (this.currentStatus === DialogueBoxStatus.Typing) {
      this.currentStatus = DialogueBoxStatus.Complete;
      clearInterval(this.typewriterHandle);
      this.animatedText = this.dialogueData.text;

      this.onAutoPlay();
    }
  }

  private onAutoPlay() {
    if (avg.Setting.AutoPlay) {
      clearTimeout(this.autoPlayDelayHandle);
      this.autoPlayDelayHandle = null;

      this.autoPlayDelayHandle = setTimeout(() => {
        this.updateDialogueStatus();
      }, (100 - avg.Setting.AutoPlaySpeed) * 30 || 1);
    }
  }
}
