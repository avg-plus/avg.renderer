import * as avg from 'avg-engine/engine';
import { APIDialogueImpl } from './api-dialogue-impl'
import { APISoundImpl } from './api-sound-impl'

export class APIImplManager {
    public static init() {
        console.log(`Register API extend implemention ...`);
        avg.APIManager.extendImpl(avg.APIShowDialogue.name, 'op_show', APIDialogueImpl.op_show);
        avg.APIManager.extendImpl(avg.APIShowDialogue.name, 'op_hide', APIDialogueImpl.op_hide);
        avg.APIManager.extendImpl(avg.APISound.name, 'op_play_bgm', APISoundImpl.op_play_bgm);
    }
}
