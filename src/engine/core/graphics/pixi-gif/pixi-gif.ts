import * as PIXI from "pixi.js";
import omggif from "./lib/omggif";
import { Sprite } from "../sprite";
import { SpriteType } from "engine/const/sprite-type";

export class PIXIGif {
  private temp: any;
  private __attr;
  private __status;

  ticker: PIXI.Ticker = new PIXI.Ticker();
  sprite: Sprite;
  textures: any;
  framesDelay: any;
  spriteType: SpriteType;

  static getExtension(filePath) {
    let aList = filePath.split(".");
    return aList[aList.length - 1];
  }

  constructor(spriteType: SpriteType, private esource, private resources) {
    this.spriteType = spriteType;
    this.temp = {
      // 临时数据
      loop: 0, // 保存当前需要播放的次数
      tickerIsAdd: undefined, // 保存轮循执行器是否添加
      events: {} // 用于存放事件
    };

    // 属性
    this.__attr = {
      autoPlay: true, // 默认自动播放
      loop: 0 // 默认无限次播放
    };

    // 状态
    this.__status = {
      status: "init", // 状态，默认初始化（init、playing、played、pause、stop）
      frame: 0, // 当前帧数
      loops: 0, // 连续循环播放次数，停止播放会清0
      time: 0
    };

    // 循环执行器
    this.ticker.stop();

    // 精灵
    this.sprite = this.createSprite(this.esource, this.resources);
  }

  // 播放
  play(loop?, callback?) {
    // 没有纹理材质时抛出错误
    if (!this.textures.length) {
      throw new Error("没有可用的textures");
    }

    // 纹理材质只有一帧时不往下执行
    if (this.textures.length === 1) {
      return;
    }

    let status = this.__status,
      attr = this.__attr,
      time = 0;

    // 当状态是停止的时候，将播放次数清0
    if (status.status === "stop") {
      status.loops = 0;
    }

    // 设置循环参数
    loop = typeof loop === "number" ? loop : attr.loop;
    this.temp.loop = loop;
    attr.loop = loop;

    // 为轮循执行器添加一个操作
    if (!this.temp.tickerIsAdd) {
      this.ticker.add(() => {
        let elapsed = PIXI.Ticker.shared.elapsedMS;
        time += elapsed;

        // 当帧停留时间已达到间隔帧率时播放下一帧
        if (time > this.framesDelay[status.frame]) {
          status.frame++;

          // 修改状态为执行中
          status.status = "playing";

          // 当一次播放完成，将播放帧归0，并记录播放次数
          if (status.frame > this.textures.length - 1) {
            status.frame = 0;
            status.loops++;

            // 当指定了有效的播放次数并且当前播放次数达到指定次数时，执行回调则停止播放
            if (this.temp.loop > 0 && status.loops >= this.temp.loop) {
              if (typeof callback === "function") {
                callback(status);
              }
              // 修改状态为执行完成并停止
              status.status = "played";
              this.runEvent("played", status);
              this.stop();
            }
          }

          // 记录缩放和坐标
          const scale = this.sprite.scale.clone();

          // 修改精灵纹理材质与当前的帧率相匹配
          this.sprite.texture = this.textures[status.frame];
          time = 0;

          // 因为更换texture之后会导致scale变为1，因此重新赋值坐标和缩放
          this.sprite.scale = scale;

          this.runEvent("playing", status);
        }
      });
      this.temp.tickerIsAdd = true;
    }

    // 让轮循执行器开始执行
    this.ticker.start();
  }

  // 暂停
  pause() {
    const status = this.__status;
    this.ticker.stop();
    status.status = "pause";
    this.runEvent("pause", status);
  }

  // 停止播放并跳至第一帧
  stop() {
    const status = this.__status;
    this.ticker.stop();
    status.status = "stop";
    this.runEvent("stop", status);
  }

  // 跳至指定的帧数
  jumpToFrame(frameIndex) {
    const textures = this.textures;

    // 没有纹理材质时抛出错误
    if (!textures.length) {
      throw new Error("没有可用的textures");
    }

    let status = this.__status;

    frameIndex = frameIndex < 0 ? 0 : frameIndex > textures.length - 1 ? textures.length - 1 : frameIndex;

    if (typeof frameIndex === "number") {
      this.sprite.texture = textures[frameIndex];
      status.frame = frameIndex;
    }
  }

  // 获取总播放时长
  getDuration() {
    this.framesDelay = this.framesDelay;

    // 没有帧时间时抛出错误
    if (!this.framesDelay.length) {
      throw new Error("未找到图片帧时间");
    }

    let time = 0;

    for (let i = 0, len = this.framesDelay.length; i < len; i++) {
      time += this.framesDelay[i];
    }
    return time;
  }

  // 获取总帧数
  getFramesLength() {
    // 没有纹理材质时抛出错误
    if (!this.textures.length) {
      throw new Error("没有可用的textures");
    }
    return this.textures.length;
  }

  // 事件
  on(type, fun) {
    switch (type) {
      case "playing":
      case "played":
      case "pause":
      case "stop":
        this.temp.events[type] = fun;
        break;
      default:
        throw new Error("无效的事件");
    }
  }

  runEvent(type, status) {
    let temp = this.temp;
    if (typeof temp.events[type] === "function") {
      temp.events[type](status);
    }
  }

  /**
   * 创建精灵
   * @param  {array:string}} imgSrc 图片资源路径
   * @param  {object} resources 已经加载的缓存资源
   * @return {object} 返回精灵
   */
  createSprite(esource, resources) {
    const imgSrc = esource;
    let exeName = PIXIGif.getExtension(imgSrc.toLocaleLowerCase());

    // 文件扩展名为gif或png则返回对应的名称，其它反返回other
    exeName = exeName === "gif" ? exeName : "other";

    let gifDecodeData = this.gifResourceToTextures(resources);
    this.textures = gifDecodeData.textures;
    this.framesDelay = gifDecodeData.delayTimes;
    this.play();

    // 返回精灵并将纹理材质设置为第一帧图像
    return new Sprite(SpriteType.Normal, this.textures[0]);
  }

  /**
   * 将gif缓存资源转换为纹理材质
   * @param  {object} resource    缓存资源
   * @return {object} 返回一个对象，包括apng的每帧时长及解码出来材质
   */
  gifResourceToTextures(resource) {
    let obj: any = {
      delayTimes: [],
      textures: []
    };
    let buf = new Uint8Array(resource.data);
    let gif = new omggif(buf);
    let gifWidth = gif.width;
    let gifHeight = gif.height;
    let gifFramesLen = gif.numFrames();
    let gifFrameInfo;
    let spriteSheet;
    let canvas: HTMLCanvasElement;
    let ctx;
    let imageData;

    for (let i = 0; i < gifFramesLen; i++) {
      //得到每帧的信息并将帧延迟信息保存起来
      gifFrameInfo = gif.frameInfo(i);
      obj.delayTimes.push(gifFrameInfo.delay * 10);

      canvas = document.createElement("canvas");
      canvas.width = gifWidth;
      canvas.height = gifHeight;
      ctx = canvas.getContext("2d");

      //创建一块空白的ImageData对象
      imageData = ctx.createImageData(gifWidth, gifHeight);

      //将第一帧转换为RGBA值，将赋予到图像区
      gif.decodeAndBlitFrameRGBA(i, imageData.data);

      //将上面创建的图像数据放回到画面上
      ctx.putImageData(imageData, 0, 0);

      spriteSheet = PIXI.BaseTexture.from(canvas);
      obj.textures.push(new PIXI.Texture(spriteSheet, new PIXI.Rectangle(0, 0, gifWidth, gifHeight)));
    }
    return obj;
  }
}
