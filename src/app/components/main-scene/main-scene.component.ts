import * as path from 'path';
import * as fs from 'fs';

import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { transition } from 'app/common/manager/transition';
import { ScriptingDispatcher } from 'app/common/manager/scripting-dispatcher';
import { BackgroundCanvasComponent } from 'app/components/background-canvas/background-canvas.component';
import { DialogueBoxComponent, DialogueBoxStatus } from 'app/components/dialogue-box/dialogue-box.component';

import { MainSceneService } from './main-scene.service';

import * as avg from 'avg-engine/engine';

@Component({
  selector: 'app-main-scene',
  templateUrl: './main-scene.component.html',
  styleUrls: ['./main-scene.component.scss']
})
export class MainSceneComponent implements OnInit, AfterViewInit {
  @ViewChild(BackgroundCanvasComponent) backgroundCanvas: BackgroundCanvasComponent;
  @ViewChild(DialogueBoxComponent) dialogueBox: DialogueBoxComponent;

  constructor(private service: MainSceneService) {

  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    let json = require('../../common/effects/data/effect-rain.json');
    console.log(json);

    transition.fadeLeave(0, 200, () => {
      this.enterGameProcess();
    })
  }

  private async enterGameProcess() {

    // start game for test
    const entryScript = avg.Resource.getPath(avg.ResourcePath.Scripts) + '/start.avs';
    avg.game.start(entryScript);
    // =======


    ScriptingDispatcher.watch().subscribe((value: { api: avg.AVGScriptUnit, op: string, resolver: any }) => {

      if (value.api instanceof avg.APIDialogue) {

        this.dialogueBox.state().subscribe((state) => {
          if (state === DialogueBoxStatus.End || state === DialogueBoxStatus.Hidden) {
            value.resolver();
          }
        });

        if (value.op === avg.OP.ShowText) {
          this.dialogueBox.showBox();
          this.dialogueBox.updateData(value.api.data);
        } else if (value.op === avg.OP.HideText) {
          this.dialogueBox.updateData(null);
          this.dialogueBox.hideBox();
        }
      } else if (value.api instanceof avg.APIScene) {
        if (value.op === avg.OP.LoadScene) {
          if (value.api.data.block) {
            this.backgroundCanvas.setBackground(value.api.data.file.filename, value.api.data.duration)
              .then(value.resolver, _ => { });

            this.backgroundCanvas.loadParticleEffect();

          } else {
            this.backgroundCanvas.setBackground(value.api.data.file.filename, value.api.data.duration);
            value.resolver();
          }

        }

      } else if (value.api instanceof avg.APIEffect) {

        if (value.op === avg.OP.PlayEffect) {
          console.log(value.api.data);

          if (value.api.data.effectName === 'shake') {
            this.backgroundCanvas.shake();
          } else if (value.api.data.effectName === 'rain') {
            this.backgroundCanvas.rain();

          } else if (value.api.data.effectName === 'snow') {
            this.backgroundCanvas.snow();

          }
          value.resolver();

        }


      }
    });

  }

}
