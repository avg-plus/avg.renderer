var path = require("path");
var express = require("express");

var DIST_DIR = path.join(__dirname, "");
var PORT = 3111;
var app = express();

//Serving the files on the dist folder
app.use(express.static(DIST_DIR));

//Send index.html when the user access the web
app.get("*", (req, res) => {
  res.sendFile(path.join(DIST_DIR, "index.html"));
});

console.log(`Listen on ${PORT}`);

app.listen(PORT);
