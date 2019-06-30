import * as $ from "jquery";
import { Dimension } from "../../engine/const/model";

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
}
