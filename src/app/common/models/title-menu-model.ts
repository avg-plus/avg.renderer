export class TitleMenuModel {
  public text: string;
  public highlight?: boolean = false;
  public disabled?: boolean = true;
  public callback?: () => void;
}
