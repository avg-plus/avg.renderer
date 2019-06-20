export enum CameraDirectorLayers {
  All,
  Scenes,
  Characters
}

export class CameraData {
  x?: number;
  y?: number;
  rotation?: number;
  scale?: number = 1;
  skewX?: number;
  skewY?: number;
  blur?: number;
}

export class CameraShakeData {
  horizontal: number = 30;
  vertical: number = 30;
  rotation: number = 6;
  duration: number = 300;
  count: number = 5;
}