import { Injectable } from "@angular/core";
import { PlatformService } from "engine/core/platform/platform-service";

@Injectable()
export class BrowserService extends PlatformService {
  constructor() {
    super();
  }
}
