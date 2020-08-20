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
  .option("-i, --identifier [identifier]", "版本后缀", "alpha")
  .option("-o, --output-directory [output]", "输出目录")
  .option("-d, --remote-dir [remoteDir]", "SFTP 上传的远程路径")
  .option("-k, --key [sshkey]", "SFTP 使用的私钥");
  

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
  program.buildVersion = "prepatch";
}

// 创建输出目录
fs.mkdirpSync(program.output);

const buildingPlatforms: string[] = [];

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

// 更新版本信息，不放进循环内，防止多平台同时打包时多次递增版本
let packageInfo = readPackageInfo();
const originalVersion = `v${packageInfo.version}`;

console.log("[!] 更新版本信息 ... ");
const newVersion = semver.inc(
  packageInfo.version,
  program.buildVersion,
  program.identifier
);

packageInfo.version = newVersion;
fs.writeJSONSync(PackageFile, packageInfo, { spaces: 2 });

const newVersionWithTag = `v${newVersion}`;

// ------------------------------------------------------------
// 构建阶段
// ------------------------------------------------------------
const preparedPlatforms: {
  path: string;
  platform: string;
  awaiter: Promise<void>;
}[] = [];

buildingPlatforms.forEach((platform: string) => {
  console.log(`[!] 开始构建 ${platform} => ${newVersionWithTag} ...`);
  const buildOutputDir = path.resolve(__dirname, `../dist/${platform}`);

  const buildingData = {
    path: buildOutputDir,
    platform,
    awaiter: null
  };
  preparedPlatforms.push(buildingData);

  const cmd = exec(`yarn build:${platform}`);
  // const cmd = exec(`echo a`);
  cmd.stdout.on("data", data => {
    console.log(data);
  });

  cmd.stderr.on("data", data => {
    console.error(data);
  });

  buildingData.awaiter = new Promise(resolve => {
    cmd.on("exit", async (code: number) => {
      if (code !== 0) {
        console.log(`[X] ${platform} 构建失败`);
        throw "";
      }

      console.log(
        `[!] 构建版本号：${newVersionWithTag}   (${originalVersion} -> ${newVersionWithTag})`
      );

      resolve();
    });
  });
});

Promise.all(preparedPlatforms.map(v => v.awaiter)).then(() => {
  // ------------------------------------------------------------
  // 开始打包
  // ------------------------------------------------------------

  const releaseDir = `../package-release`;

  // 创建临时目录
  console.log("[!] 创建临时目录 ... ", preparedPlatforms);
  const tempDir = path.resolve(__dirname, `${releaseDir}/.temp`);
  fs.removeSync(tempDir);
  fs.mkdirpSync(tempDir);

  const bundleDir = path.join(tempDir, `bundle`);

  // 拷贝构建出来的文件到 bundle 目录
  for (const build of preparedPlatforms) {
    console.log(`[!] 正在处理平台 ${build.platform} ... `);
    console.log("[!] 更新引擎配置文件 ... ");

    const engineConfig = path.resolve(build.path, `engine.json`);

    // 写入默认地址
    const engineInfo = require(engineConfig);
    engineInfo.game_assets_root = "http://localhost:2336";
    engineInfo.version = packageInfo.version;

    fs.writeFileSync(engineConfig, JSON.stringify(engineInfo, null, 2), {
      encoding: "utf8"
    });

    console.log("[!] 复制到打包目录...");

    // 创建对应的bundle目录
    const platformBundleDir = path.join(bundleDir, build.platform);
    fs.ensureDirSync(platformBundleDir);

    // 拷贝到 bundle 目录
    fs.copySync(build.path, platformBundleDir);
  }

  // 开始打包工作
  const bundleInfo = {
    type: "engine",
    name: `AVGPlus Engine Core (${newVersion})`,
    version: newVersion
  };

  fs.writeJSONSync(path.join(tempDir, "bundle-info.json"), bundleInfo);

  // 打包 ZIP 文件
  const outputFile = path.resolve(
    __dirname,
    `${releaseDir}/AVGPlus-v${packageInfo.version}.zip`
  );

  const zip = new AdmZip();
  zip.addLocalFolder(tempDir);
  zip.writeZip(outputFile);
  console.log(`[!] 发布文件路径：${outputFile}`);

  console.log(`\n[√] ✨ 版本 ${newVersionWithTag} 发布完成！`);
});
