import { AVGScriptUnit } from "../script-unit";
import { Timer } from "engine/data/timer";

export class APITimer extends AVGScriptUnit {
  public data: Timer = new Timer();
}
