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
import { WidgetLayerService } from "./widget-layer.service";

import * as avg from "avg-engine/engine";
import { ImageWidgetComponent } from "./widget-component/image-widget.component";
import { ScreenWidgetType } from "avg-engine/engine";

@Component({
  selector: "widget-layer",
  templateUrl: "./widget-layer.component.html",
  entryComponents: [TextWidgetComponent, ImageWidgetComponent],
  styleUrls: ["./widget-layer.component.scss"]
})
export class WidgetLayerComponent implements OnInit {
  @ViewChild("widgetContainer", { read: ViewContainerRef })
  container;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private resolver: ComponentFactoryResolver
  ) { }

  createTextWidgetComponent<T>(type: Type<T>) {
    const factory: ComponentFactory<T> = this.resolver.resolveComponentFactory(
      type
    );

    const widget: ComponentRef<T> = this.container.createComponent(factory);

    return widget;
  }

  ngOnInit() {
    ScriptingDispatcher.watch().subscribe(
      (value: { api: avg.AVGScriptUnit; op: string; resolver: any }) => {
        if (value.api instanceof avg.APIScreenSubtitle) {
          const subtitle = (<avg.APIScreenSubtitle>value.api).data;

          switch (value.op) {
            case avg.OP.ShowSubtitle:
              const promise = WidgetLayerService.addWidget(
                subtitle,
                this.createTextWidgetComponent<TextWidgetComponent>(
                  TextWidgetComponent
                ),
                avg.ScreenWidgetType.Text,
                value.api.isAsync
              );

              const result = new avg.ScreenSubtitleResult();
              result.id = subtitle.id;

              this.onAsyncResolveHandler(value, promise, result);

              break;
            case avg.OP.UpdateSubtitle:
              WidgetLayerService.updateSubtitle(subtitle.id, subtitle.text);
              value.resolver();
              break;
            case avg.OP.AnimateSubtitle:
              break;
            case avg.OP.HideSubtitle:
              {
                if (value.api.data.id === undefined) {
                  WidgetLayerService.removeAllWidgets(avg.ScreenWidgetType.Text, value.api.isAsync);
                  value.resolver();
                  // this.onAsyncResolveHandler(value, promise);
                } else {
                  const promise = WidgetLayerService.removeWidget(
                    subtitle,
                    avg.ScreenWidgetType.Text,
                    value.api.isAsync
                  );

                  this.onAsyncResolveHandler(value, promise);
                }
              }
              break;
          }
        } else if (value.api instanceof avg.APIScreenImage) {
          const image = (<avg.APIScreenImage>value.api).data;

          switch (value.op) {
            case avg.OP.ShowImage:
              {
                const promise = WidgetLayerService.addWidget(
                  image,
                  this.createTextWidgetComponent<ImageWidgetComponent>(
                    ImageWidgetComponent
                  ),
                  avg.ScreenWidgetType.Image,
                  value.api.isAsync
                );

                const result = new avg.ScreenImageResult();
                result.id = image.id;

                this.onAsyncResolveHandler(value, promise, result);
              }
              break;
            case avg.OP.RemoveImage:
              if (value.api.data.id === "All") {
                WidgetLayerService.removeAllWidgets(avg.ScreenWidgetType.Image, value.api.isAsync);

                value.resolver();
                // this.onAsyncResolveHandler(value, promise);
              } else {
                const promise = WidgetLayerService.removeWidget(
                  image,
                  avg.ScreenWidgetType.Image,
                  value.api.isAsync
                );
                this.onAsyncResolveHandler(value, promise);

              }


              break;
          }
        }
      }
    );
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
        _ => { }
      );
    }
  }

  onWidgetChanged(index, item) {
    console.log("OnWidgetChanged: ", index, item);

    return index;
  }
}
