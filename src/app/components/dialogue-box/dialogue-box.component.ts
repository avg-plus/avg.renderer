
import {
  Component, OnInit, OnChanges, SimpleChange, SimpleChanges,
  AfterViewInit, AnimationTransitionEvent, ViewChild
} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

import * as avg from 'avg-engine/engine';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

export enum DialogueBoxStatus {
  None,
  Typing,
  Complete,
  End,
  Hidden
}

@Component({
  selector: 'dialogue-box',
  templateUrl: './dialogue-box.component.html',
  styleUrls: ['./dialogue-box.component.scss'],
  animations: [
    trigger('dialogueBoxState', [
      state('inactive', style({
        backgroundColor: 'rgba(255,255,255,0)',
      })),
      state('active', style({
        backgroundColor: 'rgba(255,255,255,0.5)',
      })),
      transition('inactive => active', animate('300ms ease-in')),
      transition('active => inactive', animate('300ms ease-out'))
    ]),
    trigger('textState', [
      state('inactive', style({
        opacity: '0',
      })),
      state('active', style({
        opacity: '1'
      })),
      transition('inactive => active', animate('300ms ease-in')),
      transition('active => inactive', animate('300ms ease-out'))
    ]),
    trigger('characterState', [
      state('inactive', style({
        opacity: '0',
        transform: 'translateX(-20px)'

      })),
      state('active', style({
        opacity: '1',
        transform: 'translateX(20px)'
      })),
      transition('inactive => active', animate('500ms ease')),
      transition('active => inactive', animate('500ms ease'))
    ])
  ]
})
export class DialogueBoxComponent implements OnInit, AfterViewInit, OnChanges {
  private dialogueData: avg.Dialogue;
  private dialogueBoxState = 'inactive';
  private textState = 'inactive';
  private characterState = 'inactive';

  private animatedText = '';
  private currentStatus = DialogueBoxStatus.None;
  private typewriterHandle = null;
  private autoPlayDelayHandle = null;
  private subject: Subject<DialogueBoxStatus> = new Subject<DialogueBoxStatus>();

  // private charIndexes: Array<{styles: any, avatar: any}> = new Array<any>(5);

  private character_slot: Array<any>;
  private characters: Array<any>;
  private currentCharacter: avg.Character;

  constructor() {
    this.character_slot = new Array<any>(5);
    this.characters = new Array<any>(5);

    let width = avg.Setting.WindowWidth / 5;

    for (let i = 0; i < 5; ++i) {
      this.character_slot[i] = {
        width: width + 'px',
        left: width * i + 'px',
        bottom: '100px'
      };
    }

  }

  ngOnInit() {

  }

  ngAfterViewInit() {
  }

  ngOnChanges(changes: SimpleChanges) {

  }


  public showBox() {
    this.dialogueBoxState = 'active';
    this.textState = 'active';
    this.characterState = 'inactive';
  }

  public hideBox() {
    this.dialogueBoxState = 'inactive';
    this.textState = 'inactive';
    this.characterState = 'inactive';
    this.currentStatus = DialogueBoxStatus.Hidden;
    this.subject.next(DialogueBoxStatus.Hidden);
  }

  public updateData(data: avg.Dialogue) {


    this.dialogueData = data;
    this.animatedText = '';

    this.characters = [];

    if (!this.dialogueData) {
      return;
    }

    avg.PluginManager.on(avg.PluginEvents.OnBeforeDialogue, data);

    this.currentCharacter = this.dialogueData.character;

    if (this.currentCharacter) {
      this.loadCharacterToViewport(this.currentCharacter, 2);
      // this.loadCharacterToViewport(this.currentCharacter, Math.floor((Math.random() * 4) + 1));
    }

    if (data) {
      this.startTypewriter();
    }

    console.log(`Update dialogue data:`, data);
  }

  public loadCharacterToViewport(character: avg.Character, index: number = 1) {
    // this.characters[0] = character;
    // this.characters[1] = character;
    // this.characters[2] = character;
    // this.characters[3] = character;
    // this.characters[4] = character;

    this.characters[index] = character;

    // let char = this.characters[index];


    this.characters[index].state = 'inactive';
    setTimeout(() => {
      this.characters[index].state = 'inactive';
    }, 1);

    setTimeout(() => {
      this.characters[index].state = 'active';
    }, 200);
  }

  public state(): Observable<DialogueBoxStatus> {
    return this.subject.asObservable();
  }

  private startTypewriter(speed: number = 30) {
    let count = 0;
    this.animatedText = '';
    this.currentStatus = DialogueBoxStatus.Typing;

    let parsingBuffer = '';
    let resultBuffer = '';
    let blockRanges = [];
    const spanTrimRegex = /<font [a-z]+=[a-zA-Z0-9#]+\>|<\/font>|<img.*?\/>|\<b\>|<\/b>|<i>|<\/i>|<del>|<\/del>/g;

    if (avg.Setting.TextSpeed > 0) {

      let match = null;
      while ((match = spanTrimRegex.exec(this.dialogueData.text)) !== null) {
        blockRanges.push({ index: match.index, block: match[0] })
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

  animationDone($event: AnimationTransitionEvent) {

  }

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
      this.characterState = active ? 'active' : 'inactive';
    }, 1);
  }

}
