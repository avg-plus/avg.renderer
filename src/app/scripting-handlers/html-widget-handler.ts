import { UnitType } from "engine/core/measurement-unit";
const Sass  = require("sass.js");
import * as $ from "jquery";

import { AnimateTargetType } from "./../../engine/core/graphics/sprite-animate-director";
import { EngineAPI_Text } from "./../../engine/scripting/exports/text";
import { HTMLWidgetManager } from "./../common/manager/html-widget-manager";
import { AVGEngineError } from "./../../engine/core/engine-errors";
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

    const position = TransformConverter.toActualPosition(
      data.position || "(0%, 0%)",
      AnimateTargetType.HTMLElement
    );

    const size = TransformConverter.toActualSzie(
      data.size || "(auto, auto)",
      AnimateTargetType.HTMLElement
    );

    // "(100%, 100%)")
    // 尝试编译 styles

    console.log(Sass.compile);
     
    Sass.compile(styles, async result => {
      console.log("Sass Compiled: ", result);

      if (result.status !== 0) {
        AVGEngineError.emit("HTML 加载错误", "样式编译失败。", {
          name,
          html,
          styles,
          result
        });
        return;
      }

      styles = result.text;

      var shadow = HTMLWidgetManager.getShadowRoot();
      var save = $(shadow)
        .children()
        .detach();

      shadow.innerHTML = `
      <style id="${name}-style">
        #${name} {
          position: absolute;
          pointer-events: ${data.pointerEvents ? "all" : "none"};
          left: ${position.left};
          top: ${position.right};
          width: ${size.left};
          height: ${size.right};
        }

      ${styles}
      </style>
      
      <div id="${name}">
      ${html}
      </div>`;

      $(shadow).append(save);

      if (data.events) {
        data.events.map(e => {
          const selector = `#${name} ${e.selector}`;
          const elements = shadow.querySelectorAll(selector);
          // const target = e.selector;

          Array.from(elements).forEach((v, k, parent) => {
            v.addEventListener(e.event, event => {
              // 延时防止瞬间触发全屏点击事件，导致下一次点击操作被响应
              setTimeout(() => {
                e.callback(event, v);
              }, 0);
            });
          });
        });
      }

      // 处理动画
      await SpriteAnimateDirector.playAnimationMacro(
        AnimateTargetType.HTMLElement,
        shadow.getElementById(name),
        data.animation,
        !scriptingContext.api.isAsync
      );
    });

    scriptingContext.resolver();
  }

  public static async handleRemoveHTMLWidget(
    scriptingContext: ScriptingContext
  ) {
    const data = <ScreenWidgetHtml>scriptingContext.api.data;
    const name = data.name;

    var shadow = HTMLWidgetManager.getShadowRoot();

    // 处理动画
    await SpriteAnimateDirector.playAnimationMacro(
      AnimateTargetType.HTMLElement,
      shadow.getElementById(name),
      data.animation,
      !scriptingContext.api.isAsync
    );

    const t = $(shadow).find(`#${name}`);
    t.remove();
    const s = $(shadow).find(`#${name}-style`);
    s.remove();

    scriptingContext.resolver();
  }
}
