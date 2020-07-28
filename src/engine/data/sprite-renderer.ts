export class SpriteFilter {
  public name: string;
  public data: any;
}

export class AVGSpriteRenderer {
  public x: number = 0;
  public y: number = 0;
  public width: number = 0;
  public height: number = 0;
  public size: string = "(100%,100%)";
  public position: string = "(0%,0%)";
  public scale: number;
  public scaleX: number;
  public scaleY: number;
  public skew: number = 0;
  public skewX: number = 0;
  public skewY: number = 0;
  public alpha: number = 1;
  public rotation: number = 0;
  public renderInCamera: boolean = false;
  public renderCameraDepth: boolean = false;
  public cameraDistance: number = 0;
  public stretch: boolean = false;

  public filters: SpriteFilter[] = [];
}
