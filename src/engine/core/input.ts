

export enum InputKeys {
  ArrowUp = "INPUT_KEY_UP",
  ArrowDown = "INPUT_KEY_DOWN",
  ArrowLeft = "INPUT_KEY_LEFT",
  ArrowRight = "INPUT_KEY_RIGHT",
  Ok = "INPUT_KEY_OK",
  Cancel = "INPUT_KEY_CANCEL",
  Menu = "INPUT_KEY_MENU",
}

export class Input {
  private KeyMap: Map<InputKeys, { keys: string, callback: () => void }> = new Map<InputKeys, { keys: string, callback: () => void }>(
    [
      [InputKeys.ArrowUp, { keys: "up", callback: null }],
      [InputKeys.ArrowDown, { keys: "down", callback: null }],
      [InputKeys.Ok, { keys: "space,enter", callback: null }],
      [InputKeys.Cancel, { keys: "esc", callback: null }],
    ]
  );

  public init() {

    // hotkeys("*", (e) => {
    //   console.log("all key", e);
    // })


    // hotkeys("space", (e) => {
    //   console.log("space", e);
    // })

    // Binding default
  }

  public addKeyMapping(binding: InputKeys, keys: string, cb: () => void) {
    this.KeyMap.set(binding, { keys, callback: cb });
  }

  public removeKeyMapping(binding: InputKeys, key: string) {
    this.KeyMap.set(binding, null);
  }

  public isGamepadConnected(): boolean {
    return false;
  }

  // public is(input: InputKeys, key: string): boolean {
  //     const values = this.KeyMap.get(input);
  //     for (const k of values) {
  //         if (k === key) {
  //             return true;
  //         }
  //     }

  //     return false;
  // }
}



export let input = new Input();
