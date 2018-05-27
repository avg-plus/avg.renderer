import { Injectable } from "@angular/core";
import * as avg from "avg-engine/engine";

@Injectable()
export class BrowserService extends avg.PlatformService {
  constructor() {
    super();
  }
}
