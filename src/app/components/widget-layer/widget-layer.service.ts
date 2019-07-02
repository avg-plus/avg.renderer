import {
  Injectable,
  ComponentRef,
  ChangeDetectorRef,
  ComponentFactory,
  Type,
  ComponentFactoryResolver
} from "@angular/core";

import { AVGService } from "../../common/avg-service";
import { TextWidgetComponent } from "./widget-component/text-widget.component";
import { ImageWidgetComponent } from "./widget-component/image-widget.component";
import { ScreenWidgetComponent } from "./widget-component/screen-widget.component";
import { HtmlWidgetComponent } from "./widget-component/html-widget.component";
import { ScreenWidget, ScreenWidgetType } from "engine/data/screen-widget";
import { ScreenWidgetHtml } from "engine/data/screen-widget-html";
import { Subtitle } from "engine/data/screen-subtitle";
import { ScreenImage } from "engine/data/screen-image";

export class WidgetModel {
  public inAnimation = true;
  public shouldRemoveAfterShow = false;
  public shouldRemoveData: ScreenWidget;

  public onShowAnimationFinished: () => void;
  public onRemoveAnimationFinished: () => void;
}

export class TextWidgetModel extends WidgetModel {
  public data: Subtitle;
  public component: ComponentRef<TextWidgetComponent>;

  constructor(widgetModel: Subtitle, component: ComponentRef<TextWidgetComponent>) {
    super();
    this.data = widgetModel;
    this.component = component;
  }
}

export class ImageWidgetModel extends WidgetModel {
  public data: ScreenImage;
  public component: ComponentRef<ImageWidgetComponent>;

  constructor(widgetModel: ScreenImage, component: ComponentRef<ImageWidgetComponent>) {
    super();
    this.data = widgetModel;
    this.component = component;
  }
}

export class HtmlWidgetModel extends WidgetModel {
  public data: ScreenWidgetHtml;
  public component: ComponentRef<HtmlWidgetComponent>;

  constructor(widgetModel: ScreenWidgetHtml, component: ComponentRef<HtmlWidgetComponent>) {
    super();
    this.data = widgetModel;
    this.component = component;
  }
}

@Injectable()
export class WidgetLayerService extends AVGService {
  public static textWidgets: TextWidgetModel[] = new Array<TextWidgetModel>();
  public static imageWidgets: ImageWidgetModel[] = new Array<ImageWidgetModel>();
  public static htmlWdigets: HtmlWidgetModel[] = new Array<HtmlWidgetModel>();

  private static _resolver: ComponentFactoryResolver;
  private static _container: any;

  public static clearAllSubtitle() {
    WidgetLayerService.textWidgets.forEach(widget => {
      widget.component.destroy();
    });

    WidgetLayerService.textWidgets = [];
  }

  public static createWidgetComponent<T>(type: Type<T>) {
    const factory: ComponentFactory<T> = this._resolver.resolveComponentFactory(type);

    const widget: ComponentRef<T> = this._container.createComponent(factory);

    return widget;
  }

  public static setWidgetLayer(resolver: ComponentFactoryResolver, container: any) {
    this._resolver = resolver;
    this._container = container;
  }

  public static addWidget(
    data: ScreenWidget,
    component: ComponentRef<ScreenWidgetComponent>,
    widgetType: ScreenWidgetType = ScreenWidgetType.Text,
    isAsync: boolean = true
  ) {
    const isTextWidgetExists = (id: string) => {
      this.textWidgets.forEach(v => {
        if (v.data.name === data.name) {
          return true;
        }
      });

      return false;
    };

    const isImageWidgetExists = (id: string) => {
      this.imageWidgets.forEach(v => {
        if (v.data.name === id) {
          return true;
        }
      });

      return false;
    };

    return new Promise(async (resolve, reject) => {
      let model: WidgetModel;

      if (isTextWidgetExists(data.name) || isImageWidgetExists(data.name)) {
        reject(`Widget already exists: \n  -> id: ${data.name}`);
        return;
      }

      if (widgetType === ScreenWidgetType.Text) {
        const textWidgetComponent = <ComponentRef<TextWidgetComponent>>component;

        model = new TextWidgetModel(<Subtitle>data, textWidgetComponent);

        component.instance.data = data;
        component.changeDetectorRef.detectChanges();

        WidgetLayerService.textWidgets.push(<TextWidgetModel>model);
      } else if (widgetType === ScreenWidgetType.Image) {
        const imageWidgetComponent = <ComponentRef<ImageWidgetComponent>>component;

        model = new ImageWidgetModel(<ScreenImage>data, imageWidgetComponent);

        component.instance.data = data;
        // await imageWidgetComponent.instance.update();

        // resolve();
        // component.changeDetectorRef.detectChanges();

        // WidgetLayerService.imageWidgets.push(<ImageWidgetModel>model);
      } else if (widgetType === ScreenWidgetType.Html) {
        const htmlWidgetComponent = <ComponentRef<HtmlWidgetComponent>>component;

        model = new HtmlWidgetModel(<ScreenWidgetHtml>data, htmlWidgetComponent);

        component.instance.data = data;
        component.changeDetectorRef.detectChanges();

        WidgetLayerService.htmlWdigets.push(<HtmlWidgetModel>model);
      }

      // component.instance.onShowAnimationCallback = () => {
      //   model.inAnimation = false;

      //   // Remove if call remove operation in async mode after show animation is done
      //   if (model.shouldRemoveAfterShow) {
      //     // Destroy component
      //     component.instance.onRemoveAnimationCallback = () => {
      //       component.destroy();
      //       component = null;

      //       resolve();
      //     };

      //     component.instance.hideWidget(model.shouldRemoveData);
      //   }

      //   if (!isAsync) {
      //     resolve();
      //   }
      // };

      if (isAsync) {
        resolve();
      }
    });
  }

  public static updateSubtitle(id: string, text: string) {
    for (let i = 0; i < WidgetLayerService.textWidgets.length; ++i) {
      if (WidgetLayerService.textWidgets[i].data.name === id) {
        WidgetLayerService.textWidgets[i].data.text = text;
        WidgetLayerService.textWidgets[i].component.instance.updateText();
      }
    }
  }

  public static async updateImage(id: string, data: ScreenImage) {
    for (let i = 0; i < WidgetLayerService.imageWidgets.length; ++i) {
      if (WidgetLayerService.imageWidgets[i].data.name === id) {
        WidgetLayerService.imageWidgets[i].data = data;
        // WidgetLayerService.imageWidgets[i].data.file.filename = data.file.filename;
        // WidgetLayerService.imageWidgets[i].data.position = data.position;
        // WidgetLayerService.imageWidgets[i].data.size = data.size;
        // WidgetLayerService.imageWidgets[i].data.renderer = data.renderer;
        await WidgetLayerService.imageWidgets[i].component.instance.update();
      }
    }
  }

  public static removeAllWidgets(widgetType: ScreenWidgetType, isAsync: boolean = true) {
    if (widgetType === ScreenWidgetType.Text) {
      for (let i = this.textWidgets.length - 1; i >= 0; i--) {
        this.removeWidget(this.textWidgets[i].data, widgetType, isAsync);
      }
    } else {
      for (let i = this.imageWidgets.length - 1; i >= 0; i--) {
        this.removeWidget(this.imageWidgets[i].data, widgetType, isAsync);
      }
    }
  }

  public static removeWidget(
    data: ScreenWidget,
    widgetType: ScreenWidgetType = ScreenWidgetType.Text,
    isAsync: boolean = true
  ) {
    return new Promise((resolve, reject) => {
      const widgetContainer =
        widgetType === ScreenWidgetType.Text ? WidgetLayerService.textWidgets : WidgetLayerService.imageWidgets;

      let isWidgetFound = false;
      for (let i = 0; i < widgetContainer.length; ++i) {
        const widget =
          widgetType === ScreenWidgetType.Text
            ? <TextWidgetModel>widgetContainer[i]
            : <ImageWidgetModel>widgetContainer[i];

        if (widget.data.name === data.name) {
          isWidgetFound = true;
          let component = widget.component;

          // Destroy component
          component.instance.onRemoveAnimationCallback = () => {
            component.destroy();
            component = null;

            if (!isAsync) {
              resolve();
            }
          };

          if (widget.inAnimation) {
            widget.shouldRemoveAfterShow = true;
            widget.shouldRemoveData = data;
            resolve();
            return;
          }

          // Play hide animations
          if (widgetType === ScreenWidgetType.Text) {
            component.instance.hideWidget(<Subtitle>data);
            WidgetLayerService.textWidgets.splice(i, 1);
          } else {
            component.instance.hideWidget(<ScreenImage>data);
            WidgetLayerService.imageWidgets.splice(i, 1);
          }
        }
      }

      if (!isWidgetFound) {
        // Not found
        reject(`Widget Not Found: \n  -> id: ${data.name}`);
      } else {
        if (isAsync) {
          resolve();
        }
      }
    });
  }
}
