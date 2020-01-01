import { ScriptingDispatcher } from "app/common/manager/scripting-dispatcher";
import { Impl } from "app/common/api/impl";
import { Sandbox } from "engine/core/sandbox";
import { OP } from "engine/const/op";
import { APICallScript } from "engine/scripting/api/api-call-script";
import { AVGScriptUnit } from "engine/scripting/script-unit";
import { AVGStory } from "engine/scripting/story";

export class APISystemImpl extends Impl {
  @Impl.registerImpl(APICallScript, OP.CallScript)
  public static async callScript(scriptUnit: AVGScriptUnit): Promise<any> {
    const script = <APICallScript>scriptUnit;

    const story = new AVGStory();
    await story.loadFromFile(script.scriptFile);

    // Sandbox.storyQueue.push(story);
    const result = await story.run();
    console.log("result:", result);

    // return await new Promise<any>((resolve, reject) => {
    // ScriptingDispatcher.dispatch(OP.PlayEffect, script, resolve);

    // setTimeout(() => {
    // resolve("aiaiaiaia");
    // }, 1000);
    // });
  }

  @Impl.registerImpl(APICallScript, OP.ExecuteScript)
  public static async executeScript(scriptUnit: AVGScriptUnit): Promise<any> {
    const script = <APICallScript>scriptUnit;

    const story = new AVGStory();
    await story.loadFromString(script.code);

    const result = await story.run();
    console.log("result:", result);
  }
}
