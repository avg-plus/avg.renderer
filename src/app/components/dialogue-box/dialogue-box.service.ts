import { Injectable } from '@angular/core';
import { AVGService } from '../../common/avg-service';

@Injectable()
export class DialogueBoxService extends AVGService {

    private readonly CHAR_COUNT: number = 5;

    public characters: Array<any> = new Array<any>(this.CHAR_COUNT);
}
