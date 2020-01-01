import { Env } from "./env";
import { AVGNativePath } from "./native-modules/avg-native-path";
import { AVGNativeFS } from "./native-modules/avg-native-fs";

export enum ResourcePath {
  // Audio
  Audio,
  BGM,
  BGS,
  SE,
  Voice,

  // Graphics
  Backgrounds,
  DMaps,
  Images,
  Characters,
  Masks,
  UI,
  Icons,
  Effects,

  // Plugins
  Plugins,

  // Data
  Data,

  // Script
  Scripts
}

export class GameResource {
  private static _paths: Map<ResourcePath, string>;
  private static _assetsRoot: string;
  private static _dataRoot: string;

  public static init(assetsRoot: string, dataRoot: string) {
    if (!assetsRoot || !dataRoot) {
      return;
    }

    this._assetsRoot = assetsRoot;
    this._dataRoot = dataRoot;

    /* 
            To use initialize paths, you should create the following directory structure:
            
            Root
            ├── audio
            │   ├── bgm
            │   ├── bgs
            │   ├── voice
            │   └── se
            ├── data
            ├── graphics
            │   ├── backgrounds
            │   ├── images
            │   ├── characters
            │   ├── effects
            │   ├── masks
            │   ├── icons
            │   └── ui
            ├── plugins
            └── scripts
        */

    this._paths = new Map<ResourcePath, string>([
      [ResourcePath.BGM, AVGNativePath.join(this._assetsRoot, "audio/bgm")],
      [ResourcePath.BGS, AVGNativePath.join(this._assetsRoot, "audio/bgs")],
      [ResourcePath.SE, AVGNativePath.join(this._assetsRoot, "audio/se")],
      [ResourcePath.Voice, AVGNativePath.join(this._assetsRoot, "audio/voice")],
      [
        ResourcePath.Backgrounds,
        AVGNativePath.join(this._assetsRoot, "graphics/backgrounds")
      ],
      [
        ResourcePath.Images,
        AVGNativePath.join(this._assetsRoot, "graphics/images")
      ],
      [
        ResourcePath.DMaps,
        AVGNativePath.join(this._assetsRoot, "graphics/d-maps")
      ],
      [
        ResourcePath.Characters,
        AVGNativePath.join(this._assetsRoot, "graphics/characters")
      ],
      [ResourcePath.Scripts, AVGNativePath.join(this._assetsRoot, "scripts")],
      [ResourcePath.Audio, AVGNativePath.join(this._assetsRoot, "audio")],

      // Data
      [ResourcePath.Masks, AVGNativePath.join(this._dataRoot, "masks")],
      //   [ResourcePath.UI, "graphics/ui"],
      [ResourcePath.Icons, AVGNativePath.join(this._dataRoot, "icons")],
      [ResourcePath.Effects, AVGNativePath.join(this._dataRoot, "effects")],
      [ResourcePath.Plugins, AVGNativePath.join(this._dataRoot, "plugins")],
      [ResourcePath.Data, this._dataRoot]
    ]);

    console.log(`Initialize resource root folder: ${this._assetsRoot}`);
  }

  public static getAssetsRoot(): string {
    return this._assetsRoot;
  }

  public static getDataRoot(): string {
    return this._dataRoot;
  }

  public static getPath(dir: ResourcePath, joinPath: string = ""): string {
    let dirPath = this._paths.get(dir);
    if (!dirPath) {
      return undefined;
    }

    // if (Env.isRunStandalone()) {
    // Run in node.js
    // dirPath = AVGNativePath.join(this._assetsRoot, dirPath, joinPath);
    dirPath = AVGNativePath.join(dirPath, joinPath);

    // }

    return dirPath;
  }
}
