import { SpriteAnimationMacro } from "engine/core/graphics/sprite-animate-director";
import { ScreenWidget, ScreenWidgetType } from "./screen-widget";

export class ScreenWidgetHtml extends ScreenWidget {
  // private _size: string; // (640, 480), (50%, 30%), 50%

  public width: string;
  public height: string;
  public html: string;
  public pointerEvents: boolean = true; // 是否接收鼠标事件
  public styles: string;
  public animation: SpriteAnimationMacro;
  public events: any[];

  // public set size(value: string) {
  //   this._size = value.replace(" ", "");

  //   let regex = /\((\d+),(\d+)\)|(\d+%)/; // (320,160);  50%
  //   let matches = this._size.match(regex);

  //   if (matches && matches.length === 4) {
  //     this.width = matches[1];
  //     this.height = matches[2];
  //   }
  // }

  // public get size(): string {
  //   return this._size;
  // }

  constructor() {
    super(ScreenWidgetType.Html);
  }
}
