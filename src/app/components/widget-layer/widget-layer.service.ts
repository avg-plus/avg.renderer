import { Injectable, ComponentRef, ChangeDetectorRef } from "@angular/core";

import * as avg from "avg-engine/engine";

import { AVGService } from "../../common/avg-service";
import { TextWidgetComponent } from "./widget-component/text-widget.component";
import { ImageWidgetComponent } from "./widget-component/image-widget.component";
import { ScreenWidgetComponent } from "./widget-component/screen-widget.component";
import { Subtitle } from "avg-engine/engine";

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

export class ImageWidgetModel extends WidgetModel {
  public data: avg.ScreenImage;
  public component: ComponentRef<ImageWidgetComponent>;

  constructor(
    image: avg.ScreenImage,
    component: ComponentRef<ImageWidgetComponent>
  ) {
    super();
    this.data = image;
    this.component = component;
  }
}

@Injectable()
export class WidgetLayerService extends AVGService {
  public static textWidgets: TextWidgetModel[] = new Array<TextWidgetModel>();
  public static imageWdigets: ImageWidgetModel[] = new Array<
    ImageWidgetModel
  >();

  public static clearAllSubtitle() {
    WidgetLayerService.textWidgets.forEach(widget => {
      widget.component.destroy();
    });

    WidgetLayerService.textWidgets = [];
  }

  public static addSubtitle(
    data: avg.Subtitle,
    component: ComponentRef<TextWidgetComponent>
  ) {
    component.instance.data = data;
    component.changeDetectorRef.detectChanges();

    this.textWidgets.push(new TextWidgetModel(data, component));
  }

  // public static addImageWidget(
  //   data: avg.ScreenImage,
  //   component: ComponentRef<ImageWidgetComponent>
  // ) {
  //   component.instance.data = <avg.ScreenImage>data;
  //   component.changeDetectorRef.detectChanges();

  //   this.imageWdigets.push(new ImageWidgetModel(data, component));
  // }

  public static addWidget(
    data: avg.ScreenWidget,
    component: ComponentRef<ScreenWidgetComponent>,
    widgetType: avg.ScreenWidgetType = avg.ScreenWidgetType.Text
  ) {
    if (widgetType === avg.ScreenWidgetType.Text) {
      const textWidgetComponent = <ComponentRef<TextWidgetComponent>>component;

      component.instance.data = data;
      component.changeDetectorRef.detectChanges();

      const model = new TextWidgetModel(
        <avg.Subtitle>data,
        textWidgetComponent
      );
      WidgetLayerService.textWidgets.push(model);

      console.log("addtext::", WidgetLayerService.textWidgets);
    } else if (widgetType === avg.ScreenWidgetType.Image) {
      const imageWidgetComponent = <ComponentRef<
        ImageWidgetComponent
      >>component;

      component.instance.data = data;
      component.changeDetectorRef.detectChanges();

      const model = new ImageWidgetModel(
        <avg.ScreenImage>data,
        imageWidgetComponent
      );
      WidgetLayerService.imageWdigets.push(model);
    }
  }

  public static updateSubtitle(id: string, text: string) {
    for (let i = 0; i < WidgetLayerService.textWidgets.length; ++i) {
      if (WidgetLayerService.textWidgets[i].data.id === id) {
        WidgetLayerService.textWidgets[i].data.text = text;
        WidgetLayerService.textWidgets[i].component.instance.update();
      }
    }
  }

  public static updateImage(id: string, file: string) {
    for (let i = 0; i < WidgetLayerService.textWidgets.length; ++i) {
      if (WidgetLayerService.imageWdigets[i].data.id === id) {
        WidgetLayerService.imageWdigets[i].data.file = avg.ResourceData.from(
          file
        );
        WidgetLayerService.imageWdigets[i].component.instance.update();
      }
    }
  }

  public static removeWidget(
    data: avg.ScreenWidget,
    widgetType: avg.ScreenWidgetType = avg.ScreenWidgetType.Text
  ) {
    console.log("Remove widget, type =", widgetType.toString());

    const widgetContainer =
      widgetType === avg.ScreenWidgetType.Text
        ? WidgetLayerService.textWidgets
        : WidgetLayerService.imageWdigets;

    console.log("this.textWidgets", WidgetLayerService.textWidgets);

    for (let i = 0; i < widgetContainer.length; ++i) {
      const widget =
        widgetType === avg.ScreenWidgetType.Text
          ? <TextWidgetModel>widgetContainer[i]
          : <ImageWidgetModel>widgetContainer[i];

      if (widget.data.id === data.id) {
        let component = widget.component;

        // Destroy component
        component.instance.registerFinishedCallback(() => {
          component.destroy();
          component = null;
        });

        // Play hide animations
        if (widgetType === avg.ScreenWidgetType.Text) {
          component.instance.hideWidget(<avg.Subtitle>data);
        } else {
          component.instance.hideWidget(<avg.ScreenImage>data);
        }

        // Remove component
        WidgetLayerService.textWidgets.splice(i, 1);
      }
    }
  }
}
