import * as avg from 'avg-engine/engine';

export class APISoundImpl {
    public static op_play_bgm(scriptUnit: avg.AVGScriptUnit): Promise<avg.AVGScriptUnit> {
        const script = <avg.APISound>scriptUnit;
        console.log(`API '${avg.APISound.name}' Called:`, script);

        return new Promise((resolve, reject) => {
            const audio = new Audio();
            audio.src = script.data.filename; //'assets/audio/bgm/title.mp3';
            audio.load();
            audio.play();

            console.log(`API '${avg.APISound.name}' Finished:`, script);
        });
    }
}
