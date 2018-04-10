import { AVGService } from "../../common/avg-service";
import { Injectable } from "@angular/core";
import * as avg from "avg-engine/engine";

export class WidgetModel {
    public shouldBeRemoved = false;
}

export class TextWidgetModel extends WidgetModel {
    public data: avg.Subtitle;

    constructor(subtitle: avg.Subtitle) {
        super();
        this.data = subtitle;
    }
}

@Injectable()
export class WidgetLayerService extends AVGService {
  public textWidgets: TextWidgetModel[] = [];

  public addSubtitle(data: avg.Subtitle) {
    this.textWidgets.push(new TextWidgetModel(data));
  }

  public updateSubtitle(id: string, text: string) {
    for (let i = 0; i < this.textWidgets.length; ++i) {
      if (this.textWidgets[i].data.id === id) {
        this.textWidgets[i].data.text = text;
      }
    }
  }

  public removeSubtitle(id: string) {
    for (let i = 0; i < this.textWidgets.length; ++i) {
      if (this.textWidgets[i].data.id === id) {
        this.textWidgets.splice(i, 1);
      }
    }
  }
}
