export class EngineSettings {
  private static settings: any;

  public static init(content: string) {
    this.settings = JSON.parse(content);
  }

  public static isDefined(key: string): boolean {

    if (!this.settings || this.settings === {}) {
      return false;
    }

    if (!this.settings[key]) {
      return false;
    }

    return true;
  }

  public static get(key: string): string | number | boolean {
    if (this.isDefined(key)) {
      return this.settings[key];
    }

    return null;
  }


}