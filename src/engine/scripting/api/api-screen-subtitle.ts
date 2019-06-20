import { AVGScriptUnit } from "../script-unit";
import { ScriptingResult } from "../../data/scripting-result";
import { Subtitle } from "engine/data/screen-subtitle";

export class ScreenSubtitleResult extends ScriptingResult {}

export class APIScreenSubtitle extends AVGScriptUnit {
    public data: Subtitle = new Subtitle();
}
