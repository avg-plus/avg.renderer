import * as $ from "jquery";
import { Dimension } from "../../../../avg.engine/engine/const/model";

export class Utils {
  public static async getImageDimensions(url): Promise<Dimension> {
    const img = new Image();
    img.style.opacity = "1";
    img.src = url;

    return await new Promise<Dimension>((resolve, reject) => {
      $(img).ready(() => {
        setTimeout(() => {
          resolve(new Dimension(img.width, img.height));
        }, 10);
      });
    });
  }

  public static async shuffle<T>(ary: T[]) {
    const r = [...ary];
    let i = r.length;
    while (i) {
      const j = Math.floor(Math.random() * i--);
      [r[i], r[j]] = [r[j], r[i]];
    }
    return r;
  }

  public static async sleep(ms: number) {
    return new Promise<void>(res => setTimeout(res, ms));
  }

  public static async getRandomIntInclusive(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  public static async randomIn<T>(arr: T[]) {
    const min = Math.ceil(0);
    const max = Math.floor(arr.length - 1);
    return arr[Math.floor(Math.random() * (max - min + 1)) + min];
  }
}
