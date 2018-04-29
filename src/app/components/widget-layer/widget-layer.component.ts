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
  Type
} from "@angular/core";
import { NgForOf } from "@angular/common";

import { ScriptingDispatcher } from "app/common/manager/scripting-dispatcher";
import { TextWidgetComponent } from "./widget-component/text-widget.component";
import { WidgetLayerService } from "./widget-layer.service";

import * as avg from "avg-engine/engine";
import { ImageWidgetComponent } from "./widget-component/image-widget.component";

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
    // private service: WidgetLayerService,
    private resolver: ComponentFactoryResolver
  ) {}

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
              WidgetLayerService.addSubtitle(
                subtitle,
                this.createTextWidgetComponent<TextWidgetComponent>(
                  TextWidgetComponent
                )
              );

              value.resolver();
              break;
            case avg.OP.UpdateSubtitle:
              WidgetLayerService.updateSubtitle(subtitle.id, subtitle.text);
              value.resolver();
              break;
            case avg.OP.AnimateSubtitle:
              break;
            case avg.OP.HideSubtitle:
              WidgetLayerService.removeSubtitle(subtitle);
              value.resolver();
              break;
          }
        } else if (value.api instanceof avg.APIScreenImage) {
          const image = (<avg.APIScreenImage>value.api).data;

          switch (value.op) {
            case avg.OP.ShowImage:
              WidgetLayerService.addImageWidget(
                image,
                this.createTextWidgetComponent<ImageWidgetComponent>(
                  ImageWidgetComponent
                )
              );
              break;
          }
        }
      }
    );
  }

  onWidgetChanged(index, item) {
    console.log("OnWidgetChanged: ", index, item);

    return index;
  }
}
