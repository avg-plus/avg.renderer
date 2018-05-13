import { Injectable } from "@angular/core";
import { AVGService } from "../../common/avg-service";

@Injectable()
export class GameToolbarService extends AVGService {

  private static _visible: boolean = true;

  public static show() {
    this._visible = true;
  }

  public static hide() {
    this._visible = false;
  }

  public static isVisible(): boolean {
    return this._visible;
  }

  public static auto() {
    // setInterval(() => {
    //   this.isShow = false;
    // }, 5000);
  }
}
