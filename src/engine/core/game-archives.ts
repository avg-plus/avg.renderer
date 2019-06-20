import { Archive } from "../data/archive";
import { AVGGame, GameRunningType } from "./game";
import { APIManager } from "../scripting/api-manager";
import { Sandbox } from "./sandbox";
import { AVGNativePath } from "./native-modules/avg-native-path";

export class AVGArchives {
  private static _archiveFilePath: string = "./archives";

  private static _archives: Array<Archive>;
  private static _selectedArchive: number;
  private static _isLoading: boolean = false;

  public static loadChoiceCount: number = 0;

  private static getIndexFromFilename(filename: string): number {
    return Number.parseInt(filename.split(".")[0]);
  }

  private static appendArchive(index: number, archiveString: string) {
    let archiveJson: any = JSON.parse(archiveString);
    let archive: Archive = new Archive(archiveJson);
    this._archives[index] = archive;
  }

  public static saveArchive(index: number, thumb: string) {
    let archive: Archive = new Archive();
    archive.timestamp = new Date().getTime();
    archive.progressAt = APIManager.Instance.getCurrentAPILine();
    archive.thumbnail = thumb;
    archive.runtime = Sandbox.runtime;

    console.log(archive.runtime);
    // this._archives[index] = archive;
    // this.saveToFile(index, archive);
  }

  public static loadArchive(index: number) {
    if (this._archives[index] == undefined) {
      return false;
    }

    this._selectedArchive = index;
    this._isLoading = true;
    this.loadChoiceCount = 0;
    AVGGame.setRunningType(GameRunningType.Loading);
    Sandbox.runtime = this._archives[index].runtime;
    return true;
  }

  public static postAPICall(line: number) {
    if (this._isLoading) {
      if (line > this._archives[this._selectedArchive].progressAt) {
        this._isLoading = false;
        AVGGame.setRunningType(GameRunningType.Normal);
      }
    }
  }

  public static getList(): any {
    return this._archives;
  }

  public static async saveToFile(index: number, archive: Archive) {
    return new Promise((resolve, reject) => {
      let filePathAndName: string = AVGNativePath.join(this._archiveFilePath, index + ".te");
      try {
        // AVGNativeFS.writeFileSync(filePathAndName, JSON.stringify(archive), { flag: "w" });
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }

  public static async syncArchiveFromFile() {
    return new Promise((resolve, reject) => {
      // fs.readdir(this._archiveFilePath, (err, files) => {
      //     if (err) {
      //         reject(err);
      //         return;
      //     }
      //     files.forEach((filename) => {
      //         let filePathAndName = path.join(this._archiveFilePath, filename);
      //         fs.stat(filePathAndName, (err, stats) => {
      //             if (err) {
      //                 reject(err);
      //                 return;
      //             }
      //             if (stats.isFile()) {
      //                 fs.readFile(filePathAndName, "utf8", (err, data) => {
      //                     if (err) {
      //                         reject(err);
      //                         return;
      //                     }
      //                     this.appendArchive(this.getIndexFromFilename(filename), data);
      //                     resolve();
      //                 });
      //             }
      //         });
      //     });
      // });
    });
  }
}
