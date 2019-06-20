export class Dimension {
  constructor(width: number = 0, height: number = 0) {
    this.width = width;
    this.height = height;
  }
  public width: number = 0;
  public height: number = 0;
}

export class Position {
  public x: number = 0;
  public y: number = 0;
}

export class ImageTransform {
  private _isStretch = true;

  public get stretch() {
    return this._isStretch;
  }

  public set stretch(value: boolean) {
    if (value) {
      this.width = "100%";
      this.height = "100%";
    }

    this._isStretch = value;
  }

  public width = "100%";
  public height = "100%";
  public x = "0px";
  public y = "0px";
}

export class Screen extends Dimension {}

export enum SoundTrack {
  BGM, // Background Music
  BGS, // Background Sound
  SE, // Sound Effect
  Voice, // CV Voice

  MAX
}
