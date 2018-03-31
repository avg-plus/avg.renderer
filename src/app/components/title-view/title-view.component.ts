import { ElementRef, Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as PIXI from 'pixi.js';
import * as avg from 'avg-engine/engine';
import { transition } from 'app/common/manager/transition';
import { UIAnimation } from 'app/common/animations/ui-animation';

import { TitleViewService, TitleMenuEvent } from './title-view.service';
import { BackgroundCanvasComponent } from 'app/components/background-canvas/background-canvas.component';

import * as gsap from 'gsap';

@Component({
  selector: 'title-view',
  templateUrl: './title-view.component.html',
  styleUrls: ['./title-view.component.scss'],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '(document:keydown)': 'service.handleKeyboardEvents($event)'
  },
  animations: [
    UIAnimation.AVGOpacityFade('delayShowMenunState', 0, 1, 1500),
  ]
})
export class TitleViewComponent implements OnInit, AfterViewInit {
  @ViewChild(BackgroundCanvasComponent) backgroundCanvas: BackgroundCanvasComponent;

  public delayShowMenunState = 'inactive';
  constructor(public service: TitleViewService, private router: Router, private elementRef: ElementRef) {
    avg.api.playBGM('assets/audio/bgm/title.mp3', null);
  }


  ngOnInit() {

    this.delayShowMenunState = 'active';

    // Init transition
    // transition.fadeLeave(0x0, 0);

    // Start listen
    this.service.menuEvent().subscribe(index => {

      switch (index) {
        case TitleMenuEvent.Start:
          avg.api.stopBGM(null);
          this.router.navigate(['main-scene']);
          break;
      }
    });

  }

  ngAfterViewInit() {
    this.backgroundCanvas.setBackground('assets/graphics/backgrounds/demo-tree.png', 1000, 0);
    // this.backgroundCanvas.setBackground('assets/graphics/backgrounds/m0.png', 10000, 0);
    this.backgroundCanvas.setBackgroundAnimation(0, 1000,
      { 'top': '-100', repeat: -1, 'opacity': 1, yoyo: true, ease: gsap.Linear.easeInOut });

    // this.backgroundCanvas.setBackground('assets/graphics/backgrounds/m1.png', 12000, 1,
      // { 'bottom': '-400', repeat: -1, 'opacity': 1, yoyo: true, ease: gsap.Linear.easeInOut });
    // this.backgroundCanvas.setBackground('assets/graphics/backgrounds/m2.png', 10000, 2);
    setTimeout(() => {
      this.backgroundCanvas.snow();
    }, 1);

  }


}
