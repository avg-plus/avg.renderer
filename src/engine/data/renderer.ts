export class Filter {
  public name: string = "";
  public value: number;
}

export class Renderer {
  // public width;
  // public height;
  // public x: string = "0%";
  // public y: string = "0%";
  // public scale: number = 1;
  public x: number;
  public y: number;
  public width: number;
  public height: number;
  public scale: number;
  public scaleX: number;
  public scaleY: number;
  public skew: number;
  public skewX: number;
  public skewY: number;
  public rotation: number;

  public filters: Filter[] = [];
}
