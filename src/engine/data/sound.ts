import { AVGData } from './avg-data';
import { ResourceData } from './resource-data';

export class Sound extends AVGData {
    public file: ResourceData;
    public loop: boolean = false;    
    public track: string = "default";
}