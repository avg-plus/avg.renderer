import { Injectable } from "@angular/core";
import { TitleMenuModel } from "../../common/models/title-menu-model";
import * as avg from "avg-engine/engine";
import { AVGService } from "../../common/avg-service";

export enum TitleMenuEvent {
  Start,
  Load,
  Exit
}

@Injectable()
export class TitleViewService extends AVGService {
  public menuItems: Array<TitleMenuModel> = [
    { text: "开始游戏" },
    { text: "继续游戏" },
    { text: "辣鸡不玩了" }
  ];

  public currentMenuIndex: number;
  private titleMenuEvent: TitleMenuEvent;

  constructor() {
    super();

    this.setMenuIndex(0);
  }

  public handleKeyboardEvents($event: KeyboardEvent) {
    console.log(`Keyboard Event:`, $event);

    if (avg.input.is(avg.core.InputKeys.ArrowUp, $event.code)) {
      this.lastMenuItem();
      return;
    }

    if (avg.input.is(avg.core.InputKeys.ArrowDown, $event.code)) {
      this.nextMenuItem();
      return;
    }

    if (avg.input.is(avg.core.InputKeys.Ok, $event.code)) {
      const currentIndex = <TitleMenuEvent>this.currentMenuIndex;
      this.subject.next(currentIndex);

      return;
    }
  }

  public async startGame(): Promise<any> {
  }

  public menuEvent() {
    return this.subject;
  }

  public lastMenuItem() {
    const last = --this.currentMenuIndex;
    this.setMenuIndex(last < 0 ? this.menuItems.length - 1 : last);
  }

  public nextMenuItem() {
    const next = ++this.currentMenuIndex;
    this.setMenuIndex(next >= this.menuItems.length ? 0 : next);
  }

  public setMenuIndex(index: number) {
    this.currentMenuIndex = index;
    for (const item of this.menuItems) {
      item.highlight = false;
    }

    console.log(`Set menu index: ${index}`);
    this.menuItems[index].highlight = true;
  }
}
