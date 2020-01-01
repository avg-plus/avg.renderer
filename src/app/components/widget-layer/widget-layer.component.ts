import { ImageWidgetScriptingHandler } from "./../../scripting-handlers/image-widget-handler";
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
import {
  APIScreenSubtitle,
  ScreenSubtitleResult
} from "engine/scripting/api/api-screen-subtitle";
import {
  APIScreenImage,
  ScreenImageResult
} from "engine/scripting/api/api-screen-image";
import {
  APIHtmlWidget,
  HtmlWidgetResult
} from "engine/scripting/api/api-html-widget";
import { ScriptingContext } from "engine/scripting/scripting-context";
import { HTMLWidgetScriptingHandler } from "app/scripting-handlers/html-widget-handler";

@Component({
  selector: "widget-layer",
  templateUrl: "./widget-layer.component.html",
  entryComponents: [
    TextWidgetComponent,
    // ImageWidgetComponent,
    HtmlWidgetComponent
  ],
  styleUrls: ["./widget-layer.component.scss"]
})
export class WidgetLayerComponent implements OnInit {
  @ViewChild("widgetContainer", { read: ViewContainerRef, static: false })
  container;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private resolver: ComponentFactoryResolver
  ) {}

  ngOnInit() {
    WidgetLayerService.setWidgetLayer(this.resolver, this.container);

    ScriptingDispatcher.watch().subscribe(
      async (scriptingContext: ScriptingContext) => {
        if (scriptingContext.api instanceof APIScreenSubtitle) {
          const subtitle = (<APIScreenSubtitle>scriptingContext.api).data;

          switch (scriptingContext.op) {
            case OP.ShowTextWidget:
              const promise = WidgetLayerService.addWidget(
                subtitle,
                WidgetLayerService.createWidgetComponent<TextWidgetComponent>(
                  TextWidgetComponent
                ),
                ScreenWidgetType.Text,
                scriptingContext.api.isAsync
              );

              const result = new ScreenSubtitleResult();
              result.id = subtitle.name;

              this.onAsyncResolveHandler(scriptingContext, promise, result);

              break;
            case OP.UpdateTextWidget:
              WidgetLayerService.updateSubtitle(subtitle.name, subtitle.text);
              scriptingContext.resolver();
              break;
            case OP.AnimateTextWidget:
              break;
            case OP.RemoveTextWidget:
              {
                if (subtitle.name === undefined) {
                  WidgetLayerService.removeAllWidgets(
                    ScreenWidgetType.Text,
                    scriptingContext.api.isAsync
                  );
                  scriptingContext.resolver();
                  // this.onAsyncResolveHandler(value, promise);
                } else {
                  const promise = WidgetLayerService.removeWidget(
                    subtitle,
                    ScreenWidgetType.Text,
                    scriptingContext.api.isAsync
                  );

                  this.onAsyncResolveHandler(scriptingContext, promise);
                }
              }
              break;
          }
        } else if (scriptingContext.api instanceof APIHtmlWidget) {
          switch (scriptingContext.op) {
            case OP.ShowHtmlWidget:
              HTMLWidgetScriptingHandler.handleAddHTMLWidget(scriptingContext);
              break;
            case OP.RemoveHtmlWidget:
              HTMLWidgetScriptingHandler.handleRemoveHTMLWidget(
                scriptingContext
              );
              break;
          }
        }
      }
    );
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
