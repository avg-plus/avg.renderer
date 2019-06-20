import { AVGScriptUnit } from '../script-unit';
import { Effect } from '../../data/effect';

export class APIEffect extends AVGScriptUnit {
    public index: number = 0;
    public data: Effect = new Effect();
}