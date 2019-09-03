const fs = require("fs");
const config =
  "node_modules/@angular-devkit/build-angular/src/angular-cli-files/models/webpack-configs/browser.js";

fs.readFile(config, "utf8", (err, data) => {
  if (err) {
    return console.log(err);
  }

  const result = data.replace(
    /node: false/g,
    "node: { crypto: true, fs: 'empty', net: 'empty' }"
  );

  fs.writeFile(config, result, "utf8", function(err) {
    if (err) return console.log(err);
  });
});
