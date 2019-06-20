export type BFSOneArgCallback = (e?: any | null) => any;
export type BFSCallback<T> = (e: any | null | undefined, rv?: T) => any;

export interface AVGNativeFSInterface {
  isFileSystemOK(): boolean;
  initFileSystem();

  writeFile(
    filename: string,
    data: any,
    options?: {
      encoding?: string;
      mode?: string | number;
      flag?: string;
    },
    cb?: BFSOneArgCallback
  ): void;
  writeFileSync(
    filename: string,
    data: any,
    options?: {
      encoding?: string;
      mode?: number | string;
      flag?: string;
    }
  ): void;

  readFile(
    filename: string,
    options: {
      encoding: string;
      flag?: string;
    },
    callback: BFSCallback<string>
  ): void;

  readFileSync(
    filename: string,
    options: {
      encoding: string;
      flag?: string;
    }
  ): string;

  readLocalStorage(
    filename: string,
    options?: {
      encoding?: string;
      flag?: string;
    }
  );

  writeLocalStorage(
    filename: string,
    options?: {
      encoding?: string;
      flag?: string;
    }
  );
}

export class AVGNativeFS {
  public static __dirname = ".";

  public static isFileSystemOK(): boolean {
    throw new Error("Method not implemented.");
  }

  public static initFileSystem() {
    throw new Error("Method not implemented.");
  }
  public static writeFile(
    filename: string,
    data: any,
    options?: { encoding?: string; mode?: string | number; flag?: string },
    cb?: BFSOneArgCallback
  ): void {
    throw new Error("Method not implemented.");
  }
  public static writeFileSync(
    filename: string,
    data: any,
    options?: { encoding?: string; mode?: string | number; flag?: string }
  ): void {
    throw new Error("Method not implemented.");
  }
  public static readFile(
    filename: string,
    options: { encoding?: string; flag?: string },
    callback: BFSCallback<string>
  ): void {
    throw new Error("Method not implemented.");
  }
  public static readFileSync(
    filename: string,
    options?: { encoding?: string; flag?: string }
  ): string {
    throw new Error("Method not implemented.");
  }

  public static readLocalStorage(
    filename: string,
    options?: {
      encoding?: string;
      flag?: string;
    }
  ) {
    throw new Error("Method not implemented.");
  }

  public static writeLocalStorage(
    filename: string,
    options?: {
      encoding?: string;
      flag?: string;
    }
  ) {
    throw new Error("Method not implemented.");
  }
}
