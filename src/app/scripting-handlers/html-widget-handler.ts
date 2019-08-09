import { HTMLWidgetManager } from "./../common/manager/html-widget-manager";
import { AVGEngineError } from "./../../engine/core/engine-errors";
import Sass from "sass.js";
import { ScriptingContext } from "engine/scripting/scripting-context";
import { ScreenWidgetHtml } from "engine/data/screen-widget-html";
import { TransformConverter } from "engine/core/transform-converter";

export class HTMLWidgetScriptingHandler {
  public static handleAddHTMLWidget(scriptingContext: ScriptingContext) {
    const data = <ScreenWidgetHtml>scriptingContext.api.data;

    const name = data.name;
    const html = data.html;
    let styles = data.styles;

    // 转换坐标
    // console.log();

    const position = TransformConverter.toActual(data.position);

    // "(100%, 100%)")
    // 尝试编译 styles
    Sass.compile(styles, result => {
      console.log("Sass Compiled: ", result);

      if (result.status !== 0) {
        AVGEngineError.emit("HTML 加载错误", "样式编译失败。", { name, html, styles, result });
        return;
      }

      styles = result.text;

      var shadow = HTMLWidgetManager.getShadowRoot();

      shadow.innerHTML += `
      <style>
        #${name} {
          position: absolute;
          left: ${position[0]}px;
          top: ${position[1]}px;
        }

      ${styles}
      </style>
      
      <div id="${name}">
      ${html}
      </div>
          `;

      console.timeEnd("load");
    });

    scriptingContext.resolver();
  }
}
