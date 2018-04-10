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
  ViewContainerRef
} from "@angular/core";
import { NgForOf } from "@angular/common";

import { ScriptingDispatcher } from "app/common/manager/scripting-dispatcher";
import { TextWidgetComponent } from "./widget-component/text-widget.component";
import { WidgetLayerService } from "./widget-layer.service";

import * as avg from "avg-engine/engine";

@Component({
  selector: "widget-layer",
  templateUrl: "./widget-layer.component.html",
  entryComponents: [TextWidgetComponent],
  styleUrls: ["./widget-layer.component.scss"]
})
export class WidgetLayerComponent implements OnInit {
  @ViewChild("widgetContainer", { read: ViewContainerRef })
  container;

  constructor(
    private service: WidgetLayerService,
    private resolver: ComponentFactoryResolver
  ) {}

  createTextWidgetComponent() {
    const factory: ComponentFactory<
      TextWidgetComponent
    > = this.resolver.resolveComponentFactory(TextWidgetComponent);

    let widget: ComponentRef<
      TextWidgetComponent
    > = this.container.createComponent(factory);

    return widget;
  }

  ngOnInit() {
    ScriptingDispatcher.watch().subscribe(
      (value: { api: avg.AVGScriptUnit; op: string; resolver: any }) => {
        if (value.api instanceof avg.APISubtitle) {
          let subtitle = (<avg.APISubtitle>value.api).data;

          switch (value.op) {
            case avg.OP.ShowSubtitle:
              this.service.addSubtitle(
                subtitle,
                this.createTextWidgetComponent()
              );

              value.resolver();
              break;
            case avg.OP.UpdateSubtitle:
              this.service.updateSubtitle(subtitle.id, subtitle.text);
              value.resolver();
              break;
            case avg.OP.AnimateSubtitle:
              break;
            case avg.OP.HideSubtitle:
              this.service.removeSubtitle(subtitle);
              value.resolver();
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
