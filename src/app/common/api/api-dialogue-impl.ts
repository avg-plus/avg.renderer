import * as avg from 'avg-engine/engine';

export class APIDialogueImpl {
    public static op_show(scriptUnit: avg.AVGScriptUnit): Promise<avg.AVGScriptUnit> {
        const script = <avg.APIShowDialogue>scriptUnit;
        console.log(`API '${avg.APIShowDialogue.name}' Called:`, script);

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // console.log(`API '${avg.APIShowDialogue.name}::${this.op_show.name}' Finished:`, script);
                resolve();
            }, 4000);
        });
    }

    public static op_hide(scriptUnit: avg.AVGScriptUnit): Promise<avg.AVGScriptUnit> {
        const script = <avg.APIShowDialogue>scriptUnit;
        console.log(`API '${avg.APIShowDialogue.name}::${this.op_hide.name}' Called:`, script);

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // console.log(`API '${avg.APIShowDialogue.name}::${this.op_hide.name}' Finished:`, script);
                resolve();
            }, 4000);
        });
    }
}
