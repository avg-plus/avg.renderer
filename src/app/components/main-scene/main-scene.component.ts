import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { transition } from 'app/common/manager/transition';
import { BackgroundCanvasComponent } from 'app/components/background-canvas/background-canvas.component';

@Component({
  selector: 'app-main-scene',
  templateUrl: './main-scene.component.html',
  styleUrls: ['./main-scene.component.scss']
})
export class MainSceneComponent implements OnInit, AfterViewInit {
  @ViewChild(BackgroundCanvasComponent) backgroundCanvas: BackgroundCanvasComponent;

  constructor() { }

  ngOnInit() {
    transition.fadeLeave(0, 1000, () => {
      // this.service.startGame();
    })
  }

  ngAfterViewInit() {
    this.backgroundCanvas.loadImageToViewport('assets/graphics/backgrounds/demo-tree.png');
  }

}
