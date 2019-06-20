import { AVGData } from './avg-data';

export class Effect extends AVGData {
    public effectName: string;
    public duration?: number;
    public strength?: number;
}

export class SnowEffect extends Effect {
    
}
