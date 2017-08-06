import { Component, OnInit, AfterViewInit, AnimationTransitionEvent } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'dialogue-box',
  templateUrl: './dialogue-box.component.html',
  styleUrls: ['./dialogue-box.component.scss'],
  animations: [
    trigger('dialogueBoxState', [
      state('inactive', style({
        backgroundColor: 'rgba(255,255,255,0)',
        // opacity: '0'
      })),
      state('active', style({
        backgroundColor: 'rgba(255,255,255,0.4)',
        // opacity: '0.6'
      })),
      transition('inactive => active', animate('200ms ease-in')),
      transition('active => inactive', animate('200ms ease-out'))
    ])
  ]
})
export class DialogueBoxComponent implements OnInit, AfterViewInit {
  private text = `
我与父亲不相见已二年余了，我最不能忘记的是他的背影。 那年冬天，祖母死了，父亲的差使也交卸了，正是祸不单行的日子。我从北京到徐州，打算跟着父亲奔丧2回家。到徐州见着父亲，看见满院狼藉的东西，又想起祖母，不禁簌簌地流下眼泪。父亲说：“事已如此，不必难过，好在天无绝人之路！”
回家变卖典质，父亲还了亏空；又借钱办了丧事。这些日子，家中光景很是惨澹，一半为了丧事，一半为了父亲赋闲。丧事完毕，父亲要到南京谋事，我也要回北京念书，我们便同行。
  `

  private dialogueBoxState = 'inactive';
  private animatedText: string;
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.dialogueBoxState = 'active';
    }, 1000);

  }

  private startTypewriter(speed: number = 30) {
    let count = 0;
    let handle = setInterval(() => {
      if (count === this.text.length) {
        clearInterval(handle);
        return;
      }
      this.animatedText = this.text.substr(0, count);
      count++;
    }, speed);
  }

  animationDone($event: AnimationTransitionEvent) {
    if ($event.toState === 'active') {
      // console.log(`Animation done`, $event);
      this.startTypewriter();
    }
  }

}
