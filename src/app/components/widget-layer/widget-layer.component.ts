import {
  Component,
  OnInit,
  Input,
  DoCheck,
  IterableDiffers,
  ViewChild,
  ComponentRef,
  ComponentFactoryResolver,
  ComponentFactory,
  HostBinding,
  ViewContainerRef,
  Type,
  ChangeDetectorRef
} from "@angular/core";
import { NgForOf } from "@angular/common";

import { ScriptingDispatcher } from "app/common/manager/scripting-dispatcher";
import { TextWidgetComponent } from "./widget-component/text-widget.component";
import { HtmlWidgetComponent } from "./widget-component/html-widget.component";

import { WidgetLayerService } from "./widget-layer.service";

import { ImageWidgetComponent } from "./widget-component/image-widget.component";

import { OP } from "engine/const/op";
import { ScreenWidgetType } from "engine/data/screen-widget";
import { AVGEngineError } from "engine/core/engine-errors";
import { i18n } from "engine/core/i18n";
import { AVGScriptUnit } from "engine/scripting/script-unit";
import { APIScreenSubtitle, ScreenSubtitleResult } from "engine/scripting/api/api-screen-subtitle";
import { APIScreenImage, ScreenImageResult } from "engine/scripting/api/api-screen-image";
import { APIHtmlWidget, HtmlWidgetResult } from "engine/scripting/api/api-html-widget";

@Component({
  selector: "widget-layer",
  templateUrl: "./widget-layer.component.html",
  entryComponents: [TextWidgetComponent, ImageWidgetComponent, HtmlWidgetComponent],
  styleUrls: ["./widget-layer.component.scss"]
})
export class WidgetLayerComponent implements OnInit {
  @ViewChild("widgetContainer", { read: ViewContainerRef })
  container;

  constructor(private changeDetectorRef: ChangeDetectorRef, private resolver: ComponentFactoryResolver) {}

  ngOnInit() {
    WidgetLayerService.setWidgetLayer(this.resolver, this.container);

    ScriptingDispatcher.watch().subscribe((value: { api: AVGScriptUnit; op: string; resolver: any }) => {
      if (value.api instanceof APIScreenSubtitle) {
        const subtitle = (<APIScreenSubtitle>value.api).data;

        switch (value.op) {
          case OP.ShowTextWidget:
            const promise = WidgetLayerService.addWidget(
              subtitle,
              WidgetLayerService.createWidgetComponent<TextWidgetComponent>(TextWidgetComponent),
              ScreenWidgetType.Text,
              value.api.isAsync
            );

            const result = new ScreenSubtitleResult();
            result.id = subtitle.name;

            this.onAsyncResolveHandler(value, promise, result);

            break;
          case OP.UpdateTextWidget:
            WidgetLayerService.updateSubtitle(subtitle.name, subtitle.text);
            value.resolver();
            break;
          case OP.AnimateTextWidget:
            break;
          case OP.RemoveTextWidget:
            {
              if (subtitle.name === undefined) {
                WidgetLayerService.removeAllWidgets(ScreenWidgetType.Text, value.api.isAsync);
                value.resolver();
                // this.onAsyncResolveHandler(value, promise);
              } else {
                const promise = WidgetLayerService.removeWidget(subtitle, ScreenWidgetType.Text, value.api.isAsync);

                this.onAsyncResolveHandler(value, promise);
              }
            }
            break;
        }
      } else if (value.api instanceof APIScreenImage) {
        const image = (<APIScreenImage>value.api).data;

        switch (value.op) {
          case OP.ShowImageWidget:
            {
              const promise = WidgetLayerService.addWidget(
                image,
                WidgetLayerService.createWidgetComponent<ImageWidgetComponent>(ImageWidgetComponent),
                ScreenWidgetType.Image,
                value.api.isAsync
              );

              const result = new ScreenImageResult();
              result.id = image.name;

              this.onAsyncResolveHandler(value, promise, result);
            }
            break;
          case OP.UpdateImageWidget:
            const updatePromise = WidgetLayerService.updateImage(image.name, image);

            // const result = new ScreenImageResult();
            // result.id = image.id;

            // this.onAsyncResolveHandler(value, null, result);
            break;
          case OP.RemoveImageWidget:
            if (value.api.data.name === undefined) {
              WidgetLayerService.removeAllWidgets(ScreenWidgetType.Image, value.api.isAsync);

              value.resolver();
            } else {
              const promise = WidgetLayerService.removeWidget(image, ScreenWidgetType.Image, value.api.isAsync);
              this.onAsyncResolveHandler(value, promise);
            }

            break;
        }
      } else if (value.api instanceof APIHtmlWidget) {
        switch (value.op) {
          case OP.ShowHtmlWidget:
            const model = (<APIHtmlWidget>value.api).data;

            const promise = WidgetLayerService.addWidget(
              model,
              WidgetLayerService.createWidgetComponent<HtmlWidgetComponent>(HtmlWidgetComponent),
              ScreenWidgetType.Html,
              value.api.isAsync
            );

            const result = new HtmlWidgetResult();
            result.id = model.name;

            this.onAsyncResolveHandler(value, promise, result);
            break;
        }
      }
    });
  }

  private onAsyncResolveHandler(
    value: { api: AVGScriptUnit; op: string; resolver: any },
    promise: Promise<any>,
    returnedResult?: any
  ) {
    if (value.api.isAsync) {
      value.resolver(returnedResult);
    } else {
      promise.then(
        () => {
          value.resolver(returnedResult);
        },
        _ => {
          AVGEngineError.emit(i18n.lang.SCRIPTING_API_IVALID_ARGUMENTS, _);
        }
      );
    }
  }

  onWidgetChanged(index, item) {
    console.log("OnWidgetChanged: ", index, item);

    return index;
  }
}
