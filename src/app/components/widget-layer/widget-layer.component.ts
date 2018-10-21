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

import * as avg from "avg-engine/engine";
import { ImageWidgetComponent } from "./widget-component/image-widget.component";
import { ScreenWidgetType, i18n } from "avg-engine/engine";
import { AVGEngineError } from "../../../../../avg.engine/engine/core/engine-errors";

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

    ScriptingDispatcher.watch().subscribe((value: { api: avg.AVGScriptUnit; op: string; resolver: any }) => {
      if (value.api instanceof avg.APIScreenSubtitle) {
        const subtitle = (<avg.APIScreenSubtitle>value.api).data;

        switch (value.op) {
          case avg.OP.ShowTextWidget:
            const promise = WidgetLayerService.addWidget(
              subtitle,
              WidgetLayerService.createWidgetComponent<TextWidgetComponent>(TextWidgetComponent),
              avg.ScreenWidgetType.Text,
              value.api.isAsync
            );

            const result = new avg.ScreenSubtitleResult();
            result.id = subtitle.id;

            this.onAsyncResolveHandler(value, promise, result);

            break;
          case avg.OP.UpdateTextWidget:
            WidgetLayerService.updateSubtitle(subtitle.id, subtitle.text);
            value.resolver();
            break;
          case avg.OP.AnimateTextWidget:
            break;
          case avg.OP.RemoveTextWidget:
            {
              if (value.api.data.id === undefined) {
                WidgetLayerService.removeAllWidgets(avg.ScreenWidgetType.Text, value.api.isAsync);
                value.resolver();
                // this.onAsyncResolveHandler(value, promise);
              } else {
                const promise = WidgetLayerService.removeWidget(subtitle, avg.ScreenWidgetType.Text, value.api.isAsync);

                this.onAsyncResolveHandler(value, promise);
              }
            }
            break;
        }
      } else if (value.api instanceof avg.APIScreenImage) {
        const image = (<avg.APIScreenImage>value.api).data;

        switch (value.op) {
          case avg.OP.ShowImageWidget:
            {
              const promise = WidgetLayerService.addWidget(
                image,
                WidgetLayerService.createWidgetComponent<ImageWidgetComponent>(ImageWidgetComponent),
                avg.ScreenWidgetType.Image,
                value.api.isAsync
              );

              const result = new avg.ScreenImageResult();
              result.id = image.id;

              this.onAsyncResolveHandler(value, promise, result);
            }
            break;
          case avg.OP.RemoveImageWidget:
            if (value.api.data.id === undefined) {
              WidgetLayerService.removeAllWidgets(avg.ScreenWidgetType.Image, value.api.isAsync);

              value.resolver();
            } else {
              const promise = WidgetLayerService.removeWidget(image, avg.ScreenWidgetType.Image, value.api.isAsync);
              this.onAsyncResolveHandler(value, promise);
            }

            break;
        }
      } else if (value.api instanceof avg.APIHtmlWidget) {
        switch (value.op) {
          case avg.OP.ShowHtmlWidget:
            const model = (<avg.APIHtmlWidget>value.api).data;

            const promise = WidgetLayerService.addWidget(
              model,
              WidgetLayerService.createWidgetComponent<HtmlWidgetComponent>(HtmlWidgetComponent),
              avg.ScreenWidgetType.Html,
              value.api.isAsync
            );

            const result = new avg.HtmlWidgetResult();
            result.id = model.id;

            this.onAsyncResolveHandler(value, promise, result);
            break;
        }
      }
    });
  }

  private onAsyncResolveHandler(
    value: { api: avg.AVGScriptUnit; op: string; resolver: any },
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
