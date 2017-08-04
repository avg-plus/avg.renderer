import { ElementRef, Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as PIXI from 'pixi.js';
import * as avg from 'avg-engine/engine';
import { transition } from 'app/common/manager/transition';

import { TitleViewService, TitleMenuEvent } from './title-view.service';
import { BackgroundCanvasComponent } from 'app/components/background-canvas/background-canvas.component';

@Component({
  selector: 'title-view',
  templateUrl: './title-view.component.html',
  styleUrls: ['./title-view.component.scss'],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '(document:keydown)': 'service.handleKeyboardEvents($event)'
  }
})
export class TitleViewComponent implements OnInit, AfterViewInit {
  @ViewChild(BackgroundCanvasComponent) backgroundCanvas: BackgroundCanvasComponent;

  constructor(private service: TitleViewService, private router: Router, private elementRef: ElementRef) {

  }

  ngOnInit() {
    const audio = new Audio();
    audio.src = 'assets/audio/bgm/title.mp3';
    // audio.load();
    // audio.play();

    // Init transition
    transition.fadeLeave(0x0, 1500);

    // Start listen
    this.service.menuEvent().subscribe(index => {

      switch (index) {
        case TitleMenuEvent.Start:

          transition.fadeEnter(0, 1000, () => {
            this.router.navigate(['main-scene']);
          })
          break;
      }
    });

  }

  ngAfterViewInit() {
    this.backgroundCanvas.loadImageToViewport('assets/graphics/backgrounds/title.png');
    this.backgroundCanvas.loadParticleEffect();
  }


}
