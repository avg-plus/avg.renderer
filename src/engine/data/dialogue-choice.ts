import { AVGData } from "./avg-data";

export class DialogueChoice extends AVGData {
  public title: string;

  constructor(text: string) {
    super();

    this.title = text;
  }
}
