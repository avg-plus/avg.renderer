import { Sprite } from "../sprite";
import { SpriteType } from 'engine/const/sprite-type';

export class UIBase extends Sprite {
    constructor(type: SpriteType, texture: PIXI.Texture, width?: number, height?: number) {
        super(type, texture, width, height);
    }
}