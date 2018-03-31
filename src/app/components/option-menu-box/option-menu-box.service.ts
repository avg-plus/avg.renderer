import { Injectable } from "@angular/core";
import { AVGService } from "../../common/avg-service";

@Injectable()
export class OptionMenuBoxService extends AVGService {
  public options: Array<any> = new Array<any>();
}
