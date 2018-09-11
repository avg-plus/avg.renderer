"use strict";
// import { AVGPlugin } from "../avg-plus/plugin";
Object.defineProperty(exports, "__esModule", { value: true });
function activate(context) {
  console.log("sample plugin loaded.");
  return new SamplePlugin(context);
}
exports.activate = activate;
var SamplePlugin = /** @class */ (function() {
  function SamplePlugin(context) {
    // super();
  }
  SamplePlugin.prototype.pluginInfo = function() {
    return {
      name: "AVGPlus.SamplePlugin",
      version: "1.0",
      author: "AVGPlus",
      description: "Sample plugin of AVGPlus."
    };
  };
  SamplePlugin.prototype.myPluginMethod = function() {
    console.log("myPluginMethod running.");
  };
  SamplePlugin.prototype.onRenderUI = function() {
    console.log("Rendering UI...");
  };
  SamplePlugin.prototype.onBeforeShowDialogue = function(dialogue) {
    console.log("onBeforeShowDialogue called");
  };
  return SamplePlugin;
})();
