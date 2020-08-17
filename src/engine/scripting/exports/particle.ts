import {
  DropFlakeParams,
  DropFlakeParticle
} from "./../../core/graphics/shaders/drop-flake/drop-flake";
import { APIExport, AVGExportedAPI } from "./avg-exported-api";
import { GameResource, ResourcePath } from "../../core/resource";
import { AVGNativePath } from "../../core/native-modules/avg-native-path";
import { AVGNativeFS } from 'engine/core/native-modules/avg-native-fs';

@APIExport("particle", EngineAPI_Particle)
export class EngineAPI_Particle extends AVGExportedAPI {
  public static async snow(params: DropFlakeParams & { texture: string }) {
    const snowParams = Object.assign(
      {},
      {
        count: 5000, // 粒子数量
        alpha: 0.6, // 透明系数
        depth: 80, // 镜头深度
        gravity: 140, // 下坠重力
        rotation: {
          enabled: true,
          randomize: true,
          angle: 2,
          speed: 10
        },
        wind: {
          enabled: true,
          force: 0.05, // 风力
          min: -0.2,
          max: 1.1,
          easing: 0.1
        }
      },
      params
    );

    const defaultSnowTexture = AVGNativePath.join(
      GameResource.getEngineDataRoot(),
      "effects/flake-texture/snow.png"
    );

    if (!params.texture) {
      // 默认用内置材质
      snowParams.texture = defaultSnowTexture;
    }

    await DropFlakeParticle.start(snowParams.texture, snowParams);
  }

  public static async stop() {
    await DropFlakeParticle.stop();
  }

  public static async rain(params: DropFlakeParams) {
    const snowParams = Object.assign(
      {},
      {
        count: 16000, // 粒子数量
        alpha: 0.6, // 透明系数
        depth: 40, // 镜头深度
        gravity: 480, // 下坠重力
        rotation: {
          enabled: false,
          randomize: true,
          angle: 2,
          speed: 10
        },
        wind: {
          enabled: false,
          force: 0, // 风力
          min: -0.2,
          max: 0.1,
          easing: 0.1
        }
      },
      params
    );

    console.log(
      "particle texture: ",
      AVGNativePath.join(
        GameResource.getEngineDataRoot(),
        "./effects/flake-texture/snow.png"
      )
    );

    await DropFlakeParticle.start(
      AVGNativePath.join(
        GameResource.getEngineDataRoot(),
        "effects/flake-texture/rain.png"
      ),
      snowParams
    );
  }

  public static async sakura(params: DropFlakeParams) {
    const snowParams = Object.assign(
      {},
      {
        count: 1000, // 粒子数量
        alpha: 0.6, // 透明系数
        depth: 40, // 镜头深度
        gravity: 480, // 下坠重力
        rotation: {
          enabled: false,
          randomize: true,
          angle: 2,
          speed: 10
        },
        wind: {
          enabled: false,
          force: 0, // 风力
          min: -0.2,
          max: 0.1,
          easing: 0.1
        }
      },
      params
    );

    console.log(
      "particle texture: ",
      AVGNativePath.join(
        GameResource.getEngineDataRoot(),
        "./effects/flake-texture/sakura.png"
      )
    );

    await DropFlakeParticle.start(
      AVGNativePath.join(
        GameResource.getEngineDataRoot(),
        "effects/flake-texture/sakura.png"
      ),
      snowParams
    );
  }
}
