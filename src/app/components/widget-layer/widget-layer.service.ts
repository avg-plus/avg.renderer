import { Injectable, ComponentRef } from "@angular/core";

import * as avg from "avg-engine/engine";

import { AVGService } from "../../common/avg-service";
import { TextWidgetComponent } from "./widget-component/text-widget.component";

export class WidgetModel {
  public shouldBeRemoved = false;
}

export class TextWidgetModel extends WidgetModel {
  public data: avg.Subtitle;
  public component: ComponentRef<TextWidgetComponent>;

  constructor(
    subtitle: avg.Subtitle,
    component: ComponentRef<TextWidgetComponent>
  ) {
    super();
    this.data = subtitle;
    this.component = component;
  }
}

@Injectable()
export class WidgetLayerService extends AVGService {
  public static textWidgets: TextWidgetModel[] = [];

  public static clearAllSubtitle() {
    this.textWidgets.forEach(widget => {
      widget.component.destroy();
    });

    this.textWidgets = [];
  }

  public static addSubtitle(
    data: avg.Subtitle,
    component: ComponentRef<TextWidgetComponent>
  ) {
    component.instance.data = data;
    component.instance.showWidget();
    component.changeDetectorRef.detectChanges();

    this.textWidgets.push(new TextWidgetModel(data, component));
  }

  public static updateSubtitle(id: string, text: string) {
    for (let i = 0; i < this.textWidgets.length; ++i) {
      if (this.textWidgets[i].data.id === id) {
        this.textWidgets[i].data.text = text;
      }
    }
  }

  public static removeSubtitle(data: avg.Subtitle) {
    console.log("Remove subtitle %s", data.id);
    for (let i = 0; i < this.textWidgets.length; ++i) {
      if (this.textWidgets[i].data.id === data.id) {
        let component = this.textWidgets[i].component;

        // Destroy component
        component.instance.registerFinishedCallback(() => {
          component.destroy();
          component = null;

          console.log("TextWidget [%s] destroyed.", data.id);
        });

        // Play hide animations
        component.instance.hideWidget(data);

        // Remove component
        this.textWidgets.splice(i, 1);
      }
    }
  }
}
