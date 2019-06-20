import { AVGData } from "./avg-data";
import { i18n } from "../core/i18n";

export enum InputType {
  String,
  Number
}

export class InputBoxResult {
  public isOK: boolean = true;
  public value: string | number = "";
}

export class InputData extends AVGData {
  public title: string = "";
  public inputType: InputType = InputType.String;
  public minLength: number = 0;
  public maxLength: number = 255;
  public allowCancel: boolean = false;
  public okButtonText: string = i18n.lang.INPUT_OK_BUTTON_TEXT;
  public cancelButtonText: string = i18n.lang.INPUT_CANCEL_BUTTON_TEXT;
}
