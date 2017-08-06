import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'character-box',
  templateUrl: './character-box.component.html',
  styleUrls: ['./character-box.component.scss']
})
export class CharacterBoxComponent implements OnInit, AfterViewInit {

  private _character: PIXI.Sprite;

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
  }

  ngAfterViewInit() {

  }

  loadCharacterToViewport(file: string) {

    const scale = 1.5;

    const element = this.elementRef.nativeElement.querySelector('#avg-character-viewport');
    const app = new PIXI.Application(242 * scale, 600 * scale, {
      backgroundColor: 0x000000,
      transparent: true
    });

    element.appendChild(app.view);

    if (this._character) {
      app.stage.removeChild(this._character);
    }

    this._character = PIXI.Sprite.fromImage(file);
    this._character.width = app.renderer.width;
    this._character.height = app.renderer.height;

    console.log(this._character)

    app.stage.addChild(this._character);
  }


}
