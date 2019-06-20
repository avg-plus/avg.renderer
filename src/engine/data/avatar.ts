import { AVGData } from "./avg-data";
import { Renderer } from "./renderer";

export class Avatar extends AVGData {
  public file: string = "";
  public renderer?: Renderer = new Renderer;
}
