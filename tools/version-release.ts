import * as program from "commander";
import { execSync, exec } from "child_process";
import * as fs from "fs-extra";
import * as path from "path";
import * as AdmZip from "adm-zip";
import * as semver from "semver";

enum Platform {
  All = "all",
  Browser = "browser",
  Desktop = "desktop"
}

const PackageFile = path.resolve(__dirname, "../package.json");

export function sleep(ms: number) {
  return new Promise<void>(res => setTimeout(res, ms));
}

function readPackageInfo() {
  return JSON.parse(fs.readFileSync(PackageFile).toString("utf8"));
}

program
  .option("-p, --platform [platform]", "要编译的平台")
  .option("-v, --version [buildVersion]", "发布的版本，在不同的版本标记上递增")
  .description(
    `可选： major, premajor, minor, preminor, patch, prepatch, prerelease`
  )
  .option("-o, --output-directory [output]", "输出目录");

program.parse(process.argv);

console.log("[!] 构建平台: ", program.platform);

// 设置默认参数
if (!program.platform) {
  program.platform = Platform.All;
}

if (!program.output) {
  program.output = path.join(__dirname, "../package-release");
}

if (!program.buildVersion) {
  program.buildVersion = "patch";
}

// 创建输出目录
fs.mkdirpSync(program.output);

const buildingPlatforms = [];

if (program.platform === Platform.Browser) {
  buildingPlatforms.push(Platform.Browser);
}

if (program.platform === Platform.Desktop) {
  buildingPlatforms.push(Platform.Desktop);
}

if (program.platform === Platform.All) {
  buildingPlatforms.push(Platform.Browser);
  buildingPlatforms.push(Platform.Desktop);
}

buildingPlatforms.forEach(platform => {
  console.log(`[!] 开始构建 ${platform} ...`);

  // const cmd = exec(`yarn build:${platform}`);
  const cmd = exec(`echo a`);
  cmd.stdout.on("data", data => {
    console.log(data);
  });

  cmd.stderr.on("data", data => {
    console.error(data);
  });

  cmd.on("exit", async (code: number) => {
    if (code !== 0) {
      console.log(`[X] ${platform} 构建失败`);
      return;
    }

    let packageInfo = readPackageInfo();
    const originalVersion = `v${packageInfo.version}`;

    console.log("[!] 更新版本信息 ... ");
    const newVersion = semver.inc(packageInfo.version, program.buildVersion);
    packageInfo.version = newVersion;
    fs.writeJSONSync(PackageFile, packageInfo, { spaces: 2 });

    const newVersionWithTag = `v${newVersion}`;

    console.log(
      `[!] 打包版本号：${newVersionWithTag}   (${originalVersion} -> ${newVersionWithTag})`
    );

    console.log("[!] 更新引擎配置文件 ... ");
    const buildOutputDir = path.resolve(__dirname, `../dist/${platform}`);
    const engineConfig = path.resolve(buildOutputDir, `engine.json`);
    const engineInfo = require(engineConfig);
    engineInfo.game_assets_root = "http://localhost:2336";
    engineInfo.version = packageInfo.version;

    fs.writeFileSync(engineConfig, JSON.stringify(engineInfo, null, 2), {
      encoding: "utf8"
    });

    console.log("[!] 开始打包...");

    const releaseDir = `../package-release`;
    const tempDir = path.resolve(__dirname, `${releaseDir}/.temp`);
    const outputFile = path.resolve(
      __dirname,
      `${releaseDir}/AVGPlus-${platform}-v${packageInfo.version}_alpha.zip`
    );

    // 创建临时目录
    fs.removeSync(tempDir);
    fs.mkdirpSync(tempDir);

    // 准备要打包的目录文件
    fs.copySync(buildOutputDir, path.join(tempDir, "engine"));

    // 生成注释
    const bundleInfo = {
      type: "engine",
      version: newVersion,
      platform
    };

    fs.writeJSONSync(path.join(tempDir, "bundle-info.json"), bundleInfo);

    // 打包 ZIP 文件
    const zip = new AdmZip();
    zip.addLocalFolder(tempDir);
    zip.writeZip(outputFile);
    console.log(`[!] 发布文件路径：${outputFile}`);

    const zip2 = new AdmZip(outputFile);
    const json  = zip2.getEntry("bundle-info.json").getData().toString("utf-8")
    console.log("get bundle info: ", json);

    console.log(`\n[√] ✨ 版本 ${newVersionWithTag} 发布完成！`);
  });
});
