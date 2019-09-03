![Demo1](https://user-images.githubusercontent.com/1910783/39823101-d7e1fd22-53de-11e8-9bb2-b4db1ad04292.png)

---

**AVGPlus** is an cross-platform engine that aims to AVG/ADV, Galgame, Audiobooks, etc. It provides a way to quickly build games for Windows, Linux and macOS, completely in JavaScript. You will get many simple APIs to build power game that had better performance from the engine.

## NOTICE: At an early stage of development

For now, the engine project's accomplishments are not bad, but it's still at an early stage of development, and it's **not recommended** for any new formal game due to the scripting system bring many new features each day and changing quickly.

## Getting Started

Get renderer source and run the following shell in `avg.renderer` folder:

```shell
git clone https://github.com/avg-plus/avg.renderer
cd avg.renderer
yarn
yarn start  # Watch mode to compile code
```

Open another terminal session to launch game window:

```shell
yarn electron:test # Launch game in desktop mode
```

## Setup game assets server
During you can launch game, you should setup a project of game assets that provide access for your game.

### 1. Modify `env.avd`


## Features & Todo

- [x] Text & Characters
- [x] Input Handle & Variables
- [x] Backgrounds
- [x] Image Widgets & Text Widgets (Subtitle)
- [x] Sounds (BGM, BGS, SE, Voice)
- [x] Game Flow Control & Clock Handle
- [x] Scripting
- [x] Advanced Animations
- [x] Plugins & Rendering Extensions
- [x] Archive
- [x] Camera Effects & Particle Effects
- [x] WebGL Support
