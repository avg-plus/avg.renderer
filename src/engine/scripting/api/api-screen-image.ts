import { AVGScriptUnit } from "../script-unit";
import { ScreenImage } from "../../data/screen-image";
import { ScriptingResult } from "../../data/scripting-result";

export class ScreenImageResult extends ScriptingResult {}

export class APIScreenImage extends AVGScriptUnit {
    public onClicked: (data: ScreenImage) => void;
    public onHover: (data: ScreenImage) => void;
    public data: ScreenImage = new ScreenImage();
}
