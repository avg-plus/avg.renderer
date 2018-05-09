![Demo1](https://user-images.githubusercontent.com/1910783/39823101-d7e1fd22-53de-11e8-9bb2-b4db1ad04292.png)

---

**AVGPlus** is an cross-platform engine that aims to AVG/ADV, Galgame, Audiobooks, etc. It provides a way to quickly build games for Windows and macOS, completely in JavaScript. You will get many simple APIs to build power game that had better performance from the engine.

## Getting Started
`avg.renderer` dependent on `avg.engine`.

First of all, clone engine project from:
```shell
git clone https://github.com/AngryPowman/avg.engine
```

And make it to a local package for dependency with `npm`:
```shell
$ cd avg.engine
$ npm link
```

## Development
Get renderer source and run the following shell in `avg.renderer` folder:
```shell
git clone https://github.com/AngryPowman/avg.renderer
cd avg.renderer
npm install
npm link "avg-engine"
npm start
```

Open another terminal session to launch game window:
```shell
npm run electron:test
```

You will get the world.

## Features & Todo
- [x] Text & Characters
- [x] Input Handle & Variables
- [x] Backgrounds
- [x] Image Widgets & Text Widgets (Subtitle)
- [x] Sounds (BGM, BGS, SE, Voice)
- [x] Game Flow Control & Clock Handle
- [x] Scripting
- [ ] Advanced Animations (In Progress)
- [ ] Camera Effects & Particle Effects (In Progress)
- [ ] Archive (In Progress)


## Known Bugs
- Please link `avg.engine` again when you add or remove NPM packages.
