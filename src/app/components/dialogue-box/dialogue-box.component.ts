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
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";

// import "app/common/live2d/lib/live2d.min.js";
// import "pixi-live2d";

// import * as gsap from 'gsap';
import "gsap";

// let TimelineLite = new gsap.TimelineLite();

import { UIAnimation } from "../../common/animations/ui-animation";

export enum DialogueBoxStatus {
  None,
  Typing,
  Complete,
  End,
  Hidden
}

@Component({
  selector: "dialogue-box",
  templateUrl: "./dialogue-box.component.html",
  styleUrls: ["./dialogue-box.component.scss"],
  animations: [
    UIAnimation.AVGColorFade("dialogueBoxState", "255,255,255", 0, 0.5, 200),
    UIAnimation.AVGOpacityFade("textState", 0, 1, 200),
    UIAnimation.AVGCharacterShow("characterState", 500)
  ]
})
export class DialogueBoxComponent implements OnInit, AfterViewInit {
  public dialogueData: avg.Dialogue;
  public dialogueBoxState = "inactive";
  public textState = "inactive";
  public characterState = "inactive";

  public animatedText = "";
  public currentStatus = DialogueBoxStatus.None;
  public typewriterHandle = null;
  public autoPlayDelayHandle = null;
  public subject: Subject<DialogueBoxStatus> = new Subject<DialogueBoxStatus>();

  // private charIndexes: Array<{styles: any, avatar: any}> = new Array<any>(5);

  public character_slot: Array<any>;
  public characters: Array<any>;
  public currentCharacter: avg.Character;

  constructor() {
    this.character_slot = new Array<any>(5);
    this.characters = new Array<any>(5);

    let width = avg.Setting.WindowWidth / 5;

    for (let i = 0; i < 5; ++i) {
      this.character_slot[i] = {
        width: width + "px",
        left: width * i + "px",
        bottom: "100px"
      };
    }
  }

  ngOnInit() {}

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
    this.dialogueBoxState = "active";
    this.textState = "active";
    this.characterState = "inactive";
  }

  public hideBox() {
    this.dialogueBoxState = "inactive";
    this.textState = "inactive";
    this.characterState = "inactive";
    this.currentStatus = DialogueBoxStatus.Hidden;
    this.subject.next(DialogueBoxStatus.Hidden);
  }

  public updateData(data: avg.Dialogue) {
    this.dialogueData = data;
    this.animatedText = "";

    this.characters = [];

    if (!this.dialogueData) {
      return;
    }

    avg.PluginManager.on(avg.PluginEvents.OnBeforeDialogue, data);

    this.currentCharacter = this.dialogueData.character;

    if (this.currentCharacter) {
      this.loadCharacterToViewport(this.currentCharacter, 2);
    }

    if (data) {
      this.startTypewriter();
    }

    console.log(`Update dialogue data:`, data);
  }

  public loadCharacterToViewport(character: avg.Character, index: number = 1) {
    if (this.characters[index] === null) {
      this.characters[index] = character;
    } else {
      if (
        this.characters[index] &&
        this.characters[index].avatar !== character.avatar
      ) {
        this.characters[index] = character;
      } else {
        this.characters[index] = character;
        console.log("Same avatar");
        return;
      }
    }

    console.log(this.characters[index].avatar, character.avatar);

    this.characters[index].state = "inactive";
    setTimeout(() => {
      this.characters[index].state = "inactive";
    }, 1);

    setTimeout(() => {
      this.characters[index].state = "active";
    }, 200);
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

  private updateAnimation(state: string, active: boolean) {
    setTimeout(() => {
      this.characterState = active ? "active" : "inactive";
    }, 1);
  }
}
