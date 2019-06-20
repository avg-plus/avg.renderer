import { AVGData } from "./avg-data";
import { ScreenWidget, ScreenWidgetType } from "./screen-widget";
import { Renderer } from "./renderer";

export class Subtitle extends ScreenWidget {
  public name: string;
  public text: string;

  // public mergeToRenderer(renderer: Renderer) {
  //   renderer.x = renderer.x || this.x;
  //   renderer.y = renderer.y || this.y;

  //   return renderer;
  // }

  constructor() {
    super(ScreenWidgetType.Text);
  }
}
