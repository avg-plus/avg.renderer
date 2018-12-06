import * as avg from "avg-engine/engine";
import { ScriptingDispatcher } from "app/common/manager/scripting-dispatcher";
import { Impl } from "app/common/api/impl";
import { APICallScript, AVGStory, Sandbox } from "avg-engine/engine";

export class APISystemImpl extends Impl {
  @Impl.registerImpl(APICallScript, avg.OP.CallScript)
  public static async callScript(scriptUnit: avg.AVGScriptUnit): Promise<any> {
    const script = <avg.APICallScript>scriptUnit;

    const story = new AVGStory();
    await story.loadFromFile(script.scriptFile);

    Sandbox.storyQueue.push(story);
    const result = await story.run();
    console.log("result:", result);

    // return await new Promise<any>((resolve, reject) => {
      // ScriptingDispatcher.dispatch(avg.OP.PlayEffect, script, resolve);

      // setTimeout(() => {
        // resolve("aiaiaiaia");
      // }, 1000);
    // });
  }
}
