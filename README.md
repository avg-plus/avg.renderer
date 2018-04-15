![Demo](https://user-images.githubusercontent.com/1910783/38559871-bda9093a-3d06-11e8-9697-8cc93f9fe0df.png)

## Getting Started
`avg.renderer` dependent on `avg.engine`.

First of all, clone engine project from:
```shell
git clone https://github.com/AngryPowman/avg.engine
```

And make it to a local package for dependency with `yarn`:
```shell
$ cd avg.engine
$ yarn link
```
The console shows `success Registered "avg-engine` if link well.

## Development
Get renderer source and run the following shell in `avg.renderer` folder:
```shell
git clone https://github.com/AngryPowman/avg.renderer
cd avg.renderer
yarn
yarn link "avg-engine"
yarn run build
yarn start
yarn run electron:test
```

You will get the world.
