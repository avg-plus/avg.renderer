
import { Character } from './character';
import { AVGData } from './avg-data';
import { AVGScriptUnit } from '../scripting/script-unit';
import { Avatar } from './avatar';

export class Dialogue extends AVGData {
    public text: string = "";
    public voice?: string | Array<string> = "";
    public name?: string = "";
    public character?: Character = new Character();
}

