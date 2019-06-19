import * as PIXI from "pixi.js";
import * as Loader from "resource-loader";

import { LayerOrder } from "./layer-order";
import { Sprite, ResizeMode } from "./sprite";
import * as gsap from "gsap";
import { findFilter } from "./pixi-utils";
import { isNullOrUndefined } from "util";
import { PIXIGif } from "./pixi-gif/pixi-gif";
import { SpriteType } from "avg-engine/engine/const/sprite-type";

export class Scene {
  isTilingMode = false;
  focalVisibility = 0;
  enabledCamera = false;

  public app: PIXI.Application;
  public stage: PIXI.Container;
  public renderer: PIXI.Renderer;
  public view: HTMLCanvasElement;

  protected gameAreaContainer: PIXI.Container = new PIXI.Container();
  protected backBufferingContainer: PIXI.Container = new PIXI.Container();
  protected mainContainer: PIXI.Container = new PIXI.Container();

  private resourceLoader = new Loader.Loader();

  constructor(private width: number, private height: number, resolution: number = 1) {
    // [16: 9] - 800x450, 1024x576, 1280x760, 1920x1080

    const w = this.width || 1280;
    const h = this.height || 760;

    this.resourceLoader.concurrency = 10;

    this.app = new PIXI.Application({
      width: w,
      height: h,
      antialias: false,
      transparent: false,
      resolution
    });

    this.stage = this.app.stage;
    this.view = this.app.view;
    this.renderer = this.app.renderer;

    this.view.style.position = "absolute";
    this.view.style.display = "block";
    this.view.style.overflow = "scroll";
    this.renderer.backgroundColor = 0;

    this.stage.filters = [];

    this.stage.addChild(this.mainContainer);

    this.app.ticker.add(() => {
      // 图层排序
      this.sortChildren();

      this.children().map(sprite => {
        const xRadio = this.renderer.width / sprite.texture.width;
        const yRadio = this.renderer.height / sprite.texture.height;

        // 拉伸图像
        switch (sprite.resizeMode) {
          case ResizeMode.Stretch: {
            sprite.scale.x = xRadio;
            sprite.scale.y = yRadio;
            break;
          }
          case ResizeMode.KeepRadio: {
            const ratio = Math.min(xRadio, yRadio);
            sprite.scale.x = sprite.scale.y = ratio;
            break;
          }
          case ResizeMode.Default: {
            sprite.scale.set(1, 1);
            break;
          }
          case ResizeMode.Custom: {
            break;
          }
        }

        // 处理居中
        if (sprite.center) {
          const actualWidth = (sprite.width * sprite.scale.x) / 2;
          const actualHeight = (sprite.height * sprite.scale.y) / 2;

          const x = this.renderer.width / 2 - actualWidth;
          const y = this.renderer.height / 2 - actualHeight;
          sprite.position.set(x, y);
        }

        // 处理镜头焦距
        if (this.enabledCamera) {
          const zoom = sprite.scale.x;

          // 模糊系数
          if (this.focalVisibility && sprite.renderInCamera && zoom > 2.2) {
            // 透明系数
            sprite.alpha = 1 - zoom * 0.02;

            let blurFilter = <PIXI.filters.BlurFilter>findFilter(sprite, "BlurFilter");

            const blurRatio = zoom * this.focalVisibility;

            if (blurFilter) {
              blurFilter.blur = blurRatio;
            } else {
              blurFilter = new PIXI.filters.BlurFilter(0);
              blurFilter.blur = blurRatio;
              sprite.filters.push(blurFilter);
            }
          } else {
            sprite.filters = [];
          }
        }

        sprite.spriteDebugger.update();
      });
    });
  }

  /**
   * 触发尺寸变更事件，由 World 主动调用，用于调整图形比例
   *
   * @memberof Scene
   */
  public onResize() {
    const xRatio = window.innerWidth / this.renderer.width;
    const yRatio = window.innerHeight / this.renderer.width;

    this.children().map(sprite => {
      // 计算立绘的坐标
      if (sprite.spriteType === SpriteType.Character) {
        sprite.x = sprite.x * xRatio;
        sprite.spriteDebugger.update();
      }
    });
  }

  /**
   * 开启摄像机
   *
   * @memberof Scene
   */
  public enableCamera() {
    this.enabledCamera = true;
  }

  /**
   * 设置焦距视觉效果
   *
   * @param {number} value
   *    该值越大镜头拉近时精灵的模糊程度和透明程度越高
   * @memberof Scene
   */
  public setCameraFocalVisibility(value: number) {
    this.focalVisibility = value;
  }

  public cameraMove(x: number, y: number, duration: number = 2000) {
    this.children().map(sprite => {
      if (!sprite.renderInCamera) {
        return;
      }

      const moveVector = 3000;

      // 取镜头距离差值转换为正整数
      const distanceDiff = Sprite.MAX_CAMERA_DISTANCE - Sprite.MIN_CAMERA_DISTANCE;
      const spriteDistance = sprite.distance + distanceDiff / 2;

      const compensation = 0.5; // 移动补偿，防止最远距离的移动倍率为0
      const moveRatio = ((distanceDiff + sprite.distance) / (distanceDiff / 2)) * (spriteDistance / distanceDiff);

      const moveX = x * moveRatio + compensation;
      const moveY = y * moveRatio + compensation;

      if (sprite.isTilingMode) {
        gsap.TweenLite.to(sprite.tilePosition, duration / 1000, {
          x: -moveX,
          y: -moveY
        });
      } else {
        gsap.TweenLite.to(sprite.position, duration / 1000, {
          x: -moveX,
          y: -moveY
        });
      }
    });
  }

  public cameraZoom(distance: number, duration: number = 2000) {
    const distanceDiff = Sprite.MAX_CAMERA_DISTANCE - Sprite.MIN_CAMERA_DISTANCE;

    this.children().map(sprite => {
      if (!sprite.renderInCamera) {
        return;
      }

      const spriteDistance = sprite.distance + distanceDiff / 2;
      const zoomDistance = distance + distanceDiff / 2;

      let zoom = spriteDistance / zoomDistance;

      console.log(zoom);

      if (zoom <= 0 || zoom === Infinity) {
        zoom = 0;
      }

      gsap.TweenLite.to(sprite.scale, duration / 1000, {
        x: zoom,
        y: zoom
      });
    });
  }

  public get(orderOrIndex: number | LayerOrder = LayerOrder.TopLayer): Sprite {
    return <Sprite>this.stage.children[this.orderToIndex(orderOrIndex)];
  }

  public getSpriteByName(name: string): Sprite {
    return this.children().find((sprite, index) => {
      return sprite.name === name;
    });
  }

  public addSprite(name: string, sprite: Sprite, zOrder: number | LayerOrder = LayerOrder.TopLayer) {
    sprite.zOrder = this.orderToIndex(zOrder);
    sprite.name = name;

    // 设置为原图大小
    sprite.width = sprite.texture.width;
    sprite.height = sprite.texture.height;

    // 初始化滤镜为空
    sprite.filters = [];

    // 添加到主容器
    this.mainContainer.addChild(sprite);
  }

  public static to(target: {}, duration: number, vars: {}, position?: any) {
    const timeline = new gsap.TimelineMax();
    return timeline.to(target, duration / 1000, vars, position);
  }

  public addFilter(...filters: Array<PIXI.Filter>) {
    filters.map(filter => {
      this.stage.filters.push(filter);
    });
  }

  public children() {
    return <Sprite[]>this.mainContainer.children || [];
  }

  public clear() {
    this.app.stage.removeChildren();
  }

  private orderToIndex(zOrder: number | LayerOrder = LayerOrder.TopLayer) {
    let insertPosition = this.mainContainer.children.length;
    if (typeof zOrder === "number") {
      insertPosition = zOrder;
    } else {
      if (zOrder === LayerOrder.BottomLayer) {
        insertPosition = 0;
      } else if (zOrder === LayerOrder.TopLayer) {
        insertPosition = this.mainContainer.children.length + 1;
      }
    }
    return insertPosition;
  }

  public getView() {
    return this.app.view;
  }

  public getApp() {
    return this.app;
  }

  public getStage() {
    return this.app.stage;
  }

  private sortChildren() {
    const children: Sprite[] = <Sprite[]>this.mainContainer.children;

    const len = children.length;
    let i, j, tmp;

    for (i = 1; i < len; i++) {
      tmp = children[i];
      j = i - 1;
      while (j >= 0) {
        if (tmp.zOrder < children[j].zOrder) {
          children[j + 1] = children[j];
        } else if (tmp.zOrder === children[j].zOrder && tmp.arrivalOrder < children[j].arrivalOrder) {
          children[j + 1] = children[j];
        } else {
          break;
        }

        j--;
      }

      children[j + 1] = tmp;
    }
  }

  public setTilingMode(value: boolean) {
    this.isTilingMode = value;

    this.children().map(sprite => {
      const texture = sprite.texture;
    });

    console.log("Enabled tiling mode: ", this.children());
  }

  public async addFromImage(
    name: string,
    url: string,
    zOrder: number | LayerOrder = LayerOrder.TopLayer,
    type: SpriteType = SpriteType.Normal
  ): Promise<Sprite> {
    return new Promise<Sprite>((resolve, reject) => {
      const isGif = () => {
        return url.endsWith(".gif");
      };

      try {
        const resource = this.resourceLoader.resources[name];
        let loadOptions;
        let sprite: Sprite;

        if (resource) {
          if (isGif()) {
            loadOptions = {
              loadType: "arraybuffer",
              xhrType: "arraybuffer",
              crossOrigin: ""
            };

            sprite = new PIXIGif(type, url, resource).sprite;
          } else {
            sprite = new Sprite(type, PIXI.Texture.from(resource.data));
          }

          this.addSprite(name, sprite, zOrder);
          resolve(sprite);
        } else {
          if (isGif()) {
            loadOptions = {
              loadType: "arraybuffer",
              xhrType: "arraybuffer",
              crossOrigin: ""
            };
          }
          this.resourceLoader.add(name, url, loadOptions).load((progress, resources) => {
            // const texture = resources[name].data;

            if (isGif()) {
              sprite = new PIXIGif(type, url, resources).sprite;
            } else {
              const texture = PIXI.Texture.from(resources[name].data);

              sprite = new Sprite(type, texture);
            }

            this.addSprite(name, sprite, zOrder);
            resolve(sprite);
          });
        }
      } catch (error) {
        console.log("PIXI loader failed: ", error);
      }
    });
  }

  public removeSprite(name: string) {
    this.children().map((sprite, index) => {
      if (sprite.name === name) {
        this.mainContainer.removeChild(sprite);
      }
    });
  }

  public hasSprite(name: string) {
    const sprite = this.children().find(s => {
      return s.name === name;
    });

    return !isNullOrUndefined(sprite);
  }
}
