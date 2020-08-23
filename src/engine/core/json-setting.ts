export class JSONSettings {
  private settings: any;

  public init(content: any) {
    this.settings = content;
  }

  public isDefined(key: string): boolean {

    if (!this.settings || this.settings === {}) {
      return false;
    }

    if (!this.settings[key]) {
      return false;
    }

    return true;
  }

  public get(key: string): string | number | boolean {
    if (this.isDefined(key)) {
      return this.settings[key];
    }

    return null;
  }

}