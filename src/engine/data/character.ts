import { AVGData } from "./avg-data";
import { Avatar } from "./avatar";
import { Renderer } from "./renderer";
import { ScreenImage } from "./screen-image";

export class Character extends Renderer {
  public renderInCamera: boolean = false;
  public avatar: Avatar = new Avatar();
}
