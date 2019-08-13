import { AnimateTargetType } from "./../../engine/core/graphics/sprite-animate-director";
import { EngineAPI_Text } from "./../../engine/scripting/exports/text";
import { HTMLWidgetManager } from "./../common/manager/html-widget-manager";
import { AVGEngineError } from "./../../engine/core/engine-errors";
import Sass from "sass.js/dist/sass.sync";
import { ScriptingContext } from "engine/scripting/scripting-context";
import { ScreenWidgetHtml } from "engine/data/screen-widget-html";
import { TransformConverter } from "engine/core/transform-converter";
import { TransitionLayerService } from "app/components/transition-layer/transition-layer.service";
import { SpriteAnimateDirector } from "engine/core/graphics/sprite-animate-director";

export class HTMLWidgetScriptingHandler {
  public static handleAddHTMLWidget(scriptingContext: ScriptingContext) {
    const data = <ScreenWidgetHtml>scriptingContext.api.data;

    const name = data.name;
    const html = data.html;
    let styles = data.styles;

    const position = TransformConverter.toActual(data.position || "(0%, 0%)");
    const size = TransformConverter.toActual(data.size || "(100%, 100%)");

    // "(100%, 100%)")
    // 尝试编译 styles

    Sass.compile(styles, async result => {
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
          pointer-events: ${data.pointerEvents ? "auto" : "none"};
          left: ${position[0]};
          top: ${position[1]};
          width: ${size[0]};
          height: ${size[1]};
        }

      ${styles}
      </style>
      
      <div id="${name}">
      ${html}
      </div>`;

      console.log(shadow.getElementById(name));

      if (data.events) {
        Object.keys(data.events).map(k => {
          const target = data.events[k];

          const selector = `#${name} ${k}`;
          const elements = shadow.querySelectorAll(selector);

          Array.from(elements).forEach((v, k, parent) => {
            v.addEventListener(target.event, event => {
              // 延时防止瞬间触发全屏点击事件，导致下一次点击操作被响应
              setTimeout(() => {
                target.callback(event, v);
              }, 0);
            });
          });
        });
      }

      // 处理动画
      // await SpriteAnimateDirector.playAnimationMacro(
      //   AnimateTargetType.HTMLElement,
      //   shadow.getElementById(name),
      //   data.animation
      // );
    });

    scriptingContext.resolver();
  }
}
