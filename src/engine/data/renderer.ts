export class Filter {
  public name: string = "";
  public value: number;
}

export class Renderer {
  public x: number = 0;
  public y: number = 0;
  public width: number = 0;
  public height: number = 0;
  public scale: number = 1;
  public scaleX: number = 1;
  public scaleY: number = 1;
  public skew: number = 0;
  public skewX: number = 0;
  public skewY: number = 0;
  public alpha: number = 1;
  public rotation: number = 0;
  public renderInCamera: boolean = false;

  public filters: Filter[] = [];
}
