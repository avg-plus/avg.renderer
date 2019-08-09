export class HTMLWidgetManager {
  static shadow: ShadowRoot;
  static init() {
    if (!this.shadow) {
      this.shadow = document.querySelector("#avg-widget-layer").attachShadow({ mode: "open" });
    }
  }

  static getShadowRoot() {
    return this.shadow;
  }
}
