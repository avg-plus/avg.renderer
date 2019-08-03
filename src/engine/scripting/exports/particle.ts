import { APIExport, AVGExportedAPI } from "./avg-exported-api";
import { DropFlakeParams, DropFlakeParticle } from "engine/core/graphics/shaders/drop-flake/drop-flake";
import { AVGNativePath } from "engine/core/native-modules/avg-native-path";
import { GameResource } from "engine/core/resource";

@APIExport("particle", EngineAPI_Particle)
export class EngineAPI_Particle extends AVGExportedAPI {
  public static async snow(params: DropFlakeParams) {
    const snowParams = Object.assign(
      {},
      {
        count: 5000, // 粒子数量
        alpha: 0.6, // 透明系数
        depth: 80, // 镜头深度
        gravity: 40, // 下坠重力
        rotation: {
          enabled: true,
          randomize: true,
          angle: 2,
          speed: 10
        },
        wind: {
          enabled: true,
          force: -0.05, // 风力
          min: -0.2,
          max: 0.1,
          easing: 0.1
        }
      },
      params
    );

    await DropFlakeParticle.start(
      AVGNativePath.join(GameResource.getDataRoot(), "./effects/flake-texture/snow.png"),
      snowParams
    );
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

    await DropFlakeParticle.start(
      AVGNativePath.join(GameResource.getDataRoot(), "./effects/flake-texture/rain.png"),
      snowParams
    );
  }
}
